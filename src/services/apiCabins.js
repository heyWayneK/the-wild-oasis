import toast from "react-hot-toast";
import supabase from "./supabase";

import { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase
    .from("cabins")
    .select("*");

  if (error) {
    // console.log(`error`, error);
    toast.error("Cabins could not be loaded");
    throw new error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  if (!id) return console.log("ERROR: no id");
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id);

  if (error) {
    toast.error(error.message);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

export async function createEditCabin(newCabin, id = "") {
  console.log(newCabin, id);
  // Boolean - is this an image object or an image url
  const hasImagePath =
    newCabin.image?.startsWith?.(supabaseUrl);
  console.log(`hasImagePath `, hasImagePath);

  const imageName = `${Math.random()}-${
    newCabin.image.name
  }`.replaceAll("/", "");
  const fullImagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit Cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id)
    query = query.insert([
      { ...newCabin, image: fullImagePath },
    ]);

  // B) UPDATE
  if (id)
    query = query
      .update({ ...newCabin, image: fullImagePath })
      .eq("id", id)
      .select();

  const { data, error: errorInsertCabin } = await query;
  //   .insert([{ ...newCabin, image: fullImagePath }])
  //   .select();

  if (errorInsertCabin) {
    toast.error(errorInsertCabin.message);
    throw new Error("Cabin could not be created/Inserted");
  }

  // 2. Upload Image
  if (hasImagePath) return data;
  const { error: errorUploadImage } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if image never uploaded
  if (errorUploadImage) {
    await query.delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

/** DATA EXAMPLE
  descriptions: formData.descriptions,
  discount: formData.discount,
  image: formData.image,
  maxCapacity: formData.maxCapacity,
  name: formData.name,
  regularPrice: formData.regularPrice,
  */
