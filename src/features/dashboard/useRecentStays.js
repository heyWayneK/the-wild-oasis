import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

function useRecentStays() {
  const [searchparams] = useSearchParams();
  const last = searchparams?.get("last");

  const numDays = !last ? 7 : Number(last);

  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isLoading,
    isError,
    data: stays,
    isPending,
  } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { isLoading, confirmedStays, stays, isPending, isError, numDays };
}

export default useRecentStays;
