import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking as updateBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckout } = useMutation({
    mutationFn: (bookingId) =>
      updateBookingApi(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({
        // queryKey: ["bookings", "booking"],
        active: true,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { checkout, isCheckout };
}
export default useCheckout;
