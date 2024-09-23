import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PAGE_SIZE } from "../../utils/constants";

function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  //filter
  const filterValue = searchParams?.get("status") ?? "all";
  const filter =
    filterValue === "all" ? null : { field: "status", value: filterValue };

  //sort
  const sortByRaw = searchParams?.get("sortBy") ?? "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //pagination
  const page = searchParams.get("page") ? Number(searchParams?.get("page")) : 1;

  const {
    data: { data: bookings, count } = {},
    isPending,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const pageCount = Math.ceil(page / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { bookings, isPending, error, count };
}

export default useBookings;
