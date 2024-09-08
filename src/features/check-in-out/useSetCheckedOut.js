import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

// updateBooking(id, obj)
export function useSetCheckedOut() {
  const QueryClient = useQueryClient();
  const navigate = useNavigate();
  // Mutate function, in this case checkin
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    // mutationFn can only accept one object hence {}
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      // New toast notification
      toast.success(`Booking #${data.id} Successfuly Checkedout`);
      // Marks all active queries as invalid/stale with active:true
      QueryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (err) =>
      toast.error(`There was an error while Checking Out ${err.message}`),
  });

  // pass checkin function ()
  return { checkout, isCheckingOut };
}

export default useSetCheckedOut;
