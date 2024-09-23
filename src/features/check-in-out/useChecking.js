import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useChecking() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({
        // queryKey: ["booking"],
        active: true,
      });
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { checkin, isCheckingIn };
}

export default useChecking;
