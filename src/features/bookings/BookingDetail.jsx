import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBooking } from "./useGetBooking";
import Spinner from "../../ui/Spinner";

import useSetCheckedOut from "../check-in-out/useSetCheckedOut";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import { HiPencil } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  // const [searchParams, setSearchParams] = useSearchParams();
  const { bookingId } = useParams();
  const { booking = {}, isLoading, isError } = useGetBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useSetCheckedOut();

  const { isDeleting, deleteThisBooking } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading || !booking) return <Spinner />;
  if (isError) return <Empty resourceName="Booking" />;

  const { status, id } = booking;

  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal.Open opens="delete">
          <Button icon={<HiPencil />} variation="danger">
            Delete #{bookingId}
          </Button>
        </Modal.Open>

        <Modal.Window name="delete">
          <ConfirmDelete
            onConfirm={() =>
              deleteThisBooking(bookingId, { onSettled: () => navigate(-1) })
            }
            resourceName="booking"
            disabled={isDeleting}
          />
        </Modal.Window>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        {status === "checked-in" && (
          <Button disabled={isCheckingOut} onClick={() => checkout(bookingId)}>
            Check Out
          </Button>
        )}
      </ButtonGroup>
    </Modal>
  );
}

export default BookingDetail;
