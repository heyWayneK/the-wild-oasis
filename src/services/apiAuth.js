import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: `` } },
  });

  if (error) throw new Error(`Authentication failed ${error.message}`);

  return data.user;
}

export async function login({ email, password }) {
  console.log(`-->>`, email, password);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) throw new Error(`Authentication failed ${error.message}`);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(`Authentication failed ${error.message}`);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(`Authentication failed ${error.message}`);
}

export async function userUpdate({ password, fullName, avatar }) {
  // 1. Update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(`Authentication failed ${error.message}`);
  if (!avatar) return data;

  // 2. Update the avatar image
  // Avatar image data comes from
  // <FileInput id="avatar" accept="image/*"onChange={(e) => setAvatar(e.target.files[0])} />
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: updatedUser, error: error2 } = supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}./storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message);

  return updatedUser;
}
