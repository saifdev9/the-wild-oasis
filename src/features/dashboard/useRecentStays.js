import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last") || Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isPending, data: stays } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmStays = stays?.filter(
    (stay) => stay.status === "checked-out" || stay.status === "checked-in"
  );

  return { isPending, stays, confirmStays, numDays };
}

export default useRecentStays;
