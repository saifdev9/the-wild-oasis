import Select from "./Select";
import { useSearchParams } from "react-router-dom";

/* eslint-disable react/prop-types */
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      onChange={handleChange}
      options={options}
      value={currentSort}
      type="white"
    />
  );
}

export default SortBy;
