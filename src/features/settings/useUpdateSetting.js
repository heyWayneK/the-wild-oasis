import toast from "react-hot-toast";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  // React query to manage freshness/swtaleness
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } =
    useMutation({
      // mutationFn can only accept one object hence {}
      mutationFn: updateSettingApi,
      onSuccess: () => {
        // New toast notification
        toast.success("Setting Successfully Edited");
        // Use react-query to invalidate session freshness
        queryClient.invalidateQueries({
          queryKey: ["settings"],
        });
        //reset form fields
        // reset();
      },
      onError: (err) => toast.error(err.message),
    });

  return { isUpdating, updateSetting };
}
