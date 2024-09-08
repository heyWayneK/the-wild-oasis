import styled from "styled-components";

import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBooking } from "../bookings/useGetBooking";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";
import useSetCheckedIn from "./useSetCheckedIn";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteBooking } from "../bookings/useDeleteBooking";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking, isLoading, isError } = useGetBooking();
  const [confirmPaid, setConfirmPaid] = useState(booking?.isPaid ?? false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { checkin, isCheckingIn } = useSetCheckedIn();
  const moveBack = useMoveBack();
  const { deleteThisBooking, isDeleting } = useDeleteBooking();

  useEffect(() => setConfirmPaid(booking?.isPaid), [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;
  if (isError || !booking) return <div>Error - not loaded</div>;

  const {
    id: bookingId,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    guests: { fullName },
  } = booking;

  const optionalBreakfastPrice = settings?.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} key={bookingId} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid(!confirmPaid)}
          id="hasPaid"
        >
          I confirm that {fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )}) `}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={isDeleting} onClick={() => deleteThisBooking(bookingId)}>
          Delete Booking #{bookingId}
        </Button>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
