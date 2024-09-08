import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;
  const totalSales = bookings.reduce((acc, cur) => (acc += cur.totalPrice), 0);
  const totalCheckings = confirmedStays.length;
  const occupancy = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0);

  const occupancyRate =
    ((occupancy / (numDays * cabinCount)) * 100).toFixed(2) + "%";

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={totalCheckings}
      />
      <Stat
        title="Occupancy Rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={occupancyRate}
      />
    </>
  );
}

export default Stats;
