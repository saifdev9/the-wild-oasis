import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking as updateBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckin } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBookingApi(bookingId, {
        // hasBreakfast: breakfast.breakfast === "true",
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({
        queryKey: ["bookings", "booking"],
        // active: true,
      });
      navigate("/");
    },
    onError: (err) => toast.error(err.message),
  });

  return { checkin, isCheckin };
}
export default useCheckin;
