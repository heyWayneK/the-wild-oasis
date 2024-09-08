import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

function useRecentBookings() {
  const [searchparams] = useSearchParams();
  const last = searchparams?.get("last");

  const numDays = !last ? 7 : Number(last);
  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isLoading,
    isError,
    data: bookings,
    isPending,
  } = useQuery({
    queryKey: ["bookings", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  return { isLoading, bookings, isPending, isError };
}

export default useRecentBookings;
