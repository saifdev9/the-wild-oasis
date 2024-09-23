import { useEffect, useState } from "react";
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import { useMoveBack } from "../../hooks/useMoveBack";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import useBooking from "../bookings/useBooking";
import { useSettings } from "../settings/useSettings";
import useChecking from "./useChecking";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const moveBack = useMoveBack();
  const { booking = {}, isPending } = useBooking();
  const { id, guest, totalPrice, numGuests, hasBreakfast, numNights } = booking;
  const {
    settings: { breakfastPrice },
    isLoading,
  } = useSettings();
  const addtionCharge = breakfastPrice * numNights * numGuests;

  useEffect(() => {
    setConfirmPaid(booking?.isPaid || false);
  }, [booking]);

  const { checkin, isCheckingIn } = useChecking();

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        id,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: addtionCharge,
          totalPrice: totalPrice + addtionCharge,
        },
      });
    } else {
      checkin({ id, breakfast: {} });
    }
  }

  if (isPending || isCheckingIn || isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setConfirmPaid(false);
              setAddBreakfast((add) => !add);
            }}
            id="breakfast"
            disabled={confirmPaid || isCheckingIn}
          >
            Want to add breakfast for {addtionCharge}
            {formatCurrency(totalPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guest.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : formatCurrency(totalPrice) + formatCurrency(addtionCharge)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>
          Check in booking #{id}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
