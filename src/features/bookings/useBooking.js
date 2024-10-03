import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

function useBooking() {
  const { bookingId } = useParams();
  const {
    error,
    isPending,
    data: booking,
  } = useQuery({
    queryKey: ["booking", bookingId],
    //       ⬇️ more than 1 params pass obj
    queryFn: () => getBooking(bookingId),
    retry: false,
  });
  return { error, booking, isPending };
}

export default useBooking;
