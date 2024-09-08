import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ onCloseModal, cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    // validate form data
    if (isEditSession)
      editCabin(
        {
          newCabinData: { ...data, image },
          id: editId,
        },
        {
          onSuccess: () => {
            // onSuccess: (data) => {
            reset();
            console.log(`should close MODAL`);
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => {
            // onSuccess: (data) => {
            reset();
          },
        }
      );
  }

  function onError(error) {
    console.log(error);
    // future functionality
  }

  return (
    // Form Styled Component will recieve props.type
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow error={errors?.name?.message} label="name">
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow error={errors?.maxCapacity?.message} label="Maximum Capacity">
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Enter great than 0",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.regularPrice?.message} label="Regular Price">
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Enter great than 0",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors?.discount?.message} label="Discount">
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= +getValues().regularPrice ||
              `Discount (${value}) should be less than regular price of ${
                getValues().regularPrice
              }`,
          })}
        />
      </FormRow>

      <FormRow error={errors?.description?.message} label="Description">
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow error={errors?.image?.message} label="Image">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This is required",
          })}
        />
      </FormRow>

      <FormRow error="" label="">
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isWorking}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isWorking
            ? "Saving..."
            : isEditSession
            ? "Update Cabin"
            : "Add new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

/** DATA EXAMPLE
  descriptions: formData.descriptions,
  discount: formData.discount,
  image: formData.image,
  maxCapacity: formData.maxCapacity,
  name: formData.name,
  regularPrice: formData.regularPrice,
  */
