import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

// updateBooking(id, obj)
export function useSetCheckedIn() {
  const QueryClient = useQueryClient();
  const navigate = useNavigate();
  // Mutate function, in this case checkin
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    // mutationFn can only accept one object hence {}
    mutationFn: ({ bookingId, breakfast = {} }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      // New toast notification
      toast.success(`Booking #${data.id} Successfuly Updated`);
      // Marks all active queries as invalid/stale with active:true
      QueryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (err) =>
      toast.error(`There was an error while updating ${err.message}`),
  });

  // pass checkin function ()
  return { checkin, isCheckingIn };
}

export default useSetCheckedIn;
