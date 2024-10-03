import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useTodayActivity() {
  const { data: activities, isPending } = useQuery({
    queryKey: ["today"],
    queryFn: getStaysTodayActivity,
  });
  return { activities, isPending };
}

export default useTodayActivity;
