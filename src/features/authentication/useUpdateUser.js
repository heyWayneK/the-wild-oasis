import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userUpdate } from "../../services/apiAuth";

export function useUpdateUser() {
  // React query to manage freshness/staleness
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isLoading: isUpdating,
    error: updateUserError,
    reset,
    isPending,
  } = useMutation({
    // mutationFn can only accept one object hence {}
    mutationFn: userUpdate,
    onSuccess: (user) => {
      // New toast notification
      toast.success("User Successfuly Updated");
      // Use react-query to invalidate session freshness
      queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      //reset form fields
      // reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateUser, updateUserError, reset, isPending };
}
