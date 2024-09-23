import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({
        // queryKey: ["booking"],
        active: true,
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { checkout, isCheckingout };
}

export default useCheckout;
