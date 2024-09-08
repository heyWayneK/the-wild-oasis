import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  // React query to manage freshness/staleness
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } =
    useMutation({
      //  CreateCabin from "../../services/apiCabins"
      mutationFn: createEditCabin,
      onSuccess: () => {
        // New toast notification
        toast.success("Cabin Successfuly Added");
        // Use react-query to invalidate session freshness
        queryClient.invalidateQueries({
          queryKey: ["cabins"],
        });
        //reset form fields
        // reset();
      },
      onError: (err) => toast.error(err.message),
    });

  return { isCreating, createCabin };
}
