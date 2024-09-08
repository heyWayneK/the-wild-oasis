import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export function useEditCabin() {
  // React query to manage freshness/staleness
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } =
    useMutation({
      // mutationFn can only accept one object hence {}
      mutationFn: ({ newCabinData, id }) =>
        createEditCabin(newCabinData, id),
      onSuccess: () => {
        // New toast notification
        toast.success("Cabin Successfuly Edited");
        // Use react-query to invalidate session freshness
        queryClient.invalidateQueries({
          queryKey: ["cabins"],
        });
        //reset form fields
        // reset();
      },
      onError: (err) => toast.error(err.message),
    });

  return { isEditing, editCabin };
}
