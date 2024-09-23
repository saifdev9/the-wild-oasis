import styled from "styled-components";
import useRecentBooking from "./useRecentBooking";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "../dashboard/DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isPending } = useRecentBooking();
  const { isPending: isPend, confirmStays, numDays } = useRecentStays();

  const { cabins, isLoading } = useCabins();

  if (isPending || isPend || isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        numDays={numDays}
        cabinCount={cabins.length}
        bookings={bookings}
        confirmStays={confirmStays}
      />
      <TodayActivity />
      <DurationChart confirmStays={confirmStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
