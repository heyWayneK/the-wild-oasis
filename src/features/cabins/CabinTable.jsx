import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isPending, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;

  const filterValue = searchParams.get("discount") || "all";
  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  let filteredCabins;

  switch (filterValue) {
    case "no-discount":
      filteredCabins = cabins.filter((cabin) => !cabin.discount);
      break;
    case "with-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount);
      break;
    default:
      // "all"
      filteredCabins = cabins;
  }

  // SORT
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  // filteredCabins.sort((a, b) => a[sortOn].localeCompare(b[sortOn]));

  if (!cabins.length) return <Empty resourceName={"Cabins"} />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        {/* Render Props Pattern */}
        <Table.Body
          data={sortedCabins}
          // data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
