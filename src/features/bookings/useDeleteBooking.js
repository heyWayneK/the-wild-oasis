import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking(bookingId) {
  const navigate = useNavigate();
  // to make session stale, to reload
  const queryClient = useQueryClient();

  console.log(`should delete`, bookingId);

  const { isLoading: isDeleting, mutate: deleteThisBooking } = useMutation({
    mutationFn: (bookingId) =>
      deleteBooking(bookingId, { onSettled: () => navigate(-1) }),
    // onSuccess: (data) => {
    onSuccess: () => {
      // console.log("Cabin Successfuly Data", data);
      toast.success(`Booking Successfuly Deleted`);

      // NAVIGATE IS BEING DONE ON THE BUTTON IN THIS CASE
      // USING onSettled e.g. deleteBooking(bookingId, {onSettled: ()  => navigate(-1)})
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteThisBooking };
}
