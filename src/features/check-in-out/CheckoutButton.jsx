/* eslint-disable react/prop-types */
import Button from "../../ui/Button";
import useCheckout from "./useCheckout.js";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckout } = useCheckout();
  return (
    <Button
      disabled={isCheckout}
      onClick={() => checkout(bookingId)}
      variation="primary"
      size="small"
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
