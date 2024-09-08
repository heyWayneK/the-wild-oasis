import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useTodayActivity() {
  const {
    data: activities,
    isLoading,
    isPending,
  } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { activities, isLoading, isPending };
}

export default useTodayActivity;
