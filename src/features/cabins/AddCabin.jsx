import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";

import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;

{
  /* // Modal 2 */
}
{
  /* <Modal.Open opens="table">
        <Button>Add New Table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window> */
}
