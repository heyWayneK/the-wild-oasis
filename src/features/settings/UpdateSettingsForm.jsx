import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import { useForm } from "react-hook-form";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerRoom,
      breakfastPrice,
    } = {},
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  const { formState } = useForm({
    defaultValues: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerRoom,
      breakfastPrice,
    },
  });
  // {defaultValues: settings,}

  function handleUpdate(e, fieldToUpdate) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [fieldToUpdate]: value });
  }

  const { errors } = formState;
  // console.log("LOADING", isLoading);
  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          defaultValue={minBookingLength}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          defaultValue={maxBookingLength}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerRoom")}
          defaultValue={maxGuestsPerRoom}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          defaultValue={minBookingLength}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
