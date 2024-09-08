import Button from "../../ui/Button";
import useSetCheckedOut from "./useSetCheckedOut";

function CheckedOutButton({ bookingId }) {
  const { isCheckingOut, checkout } = useSetCheckedOut();
  return (
    <Button
      size="small"
      variation="primary"
      disabled={isCheckingOut}
      onClick={() => checkout(bookingId)}
    >
      Check Out
    </Button>
  );
}

export default CheckedOutButton;
