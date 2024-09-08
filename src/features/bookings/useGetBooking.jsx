import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useGetBooking() {
  const { bookingId } = useParams();

  // QUERY
  const {
    isLoading,
    isError,
    data: booking,
  } = useQuery({
    // [] is like dependencies for query to reload based on changed
    queryKey: [`bookings`, bookingId],
    queryFn: () => getBooking(bookingId),
    // reactQuery retries a query 3 times. We only need one try.
    retry: false,
  });

  // console.log(`useGetBooking-->`, booking, isLoading, isError);
  return { isLoading, isError, booking };
}
