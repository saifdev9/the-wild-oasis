import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isPending, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  const filterVal = searchParams?.get("discount") ?? "all";
  const sortBy = searchParams?.get("sortBy") ?? "";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  //filter
  let filteredcabin;
  if (filterVal === "all") filteredcabin = cabins;
  if (filterVal === "no-discount")
    filteredcabin = cabins.filter((cabin) => cabin.discount === 0);
  if (filterVal === "with-discount")
    filteredcabin = cabins.filter((cabin) => cabin.discount > 0);

  //sort
  let sortedCabin = filteredcabin
    ?.slice()
    ?.sort((a, b) => (a[field] - b[field]) * modifier);

  if (isPending) return <Spinner />;
  if (!cabins?.length) return <Empty resource="cabins" />;

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

        <Table.Body
          // data={filteredcabin}
          data={sortedCabin}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
