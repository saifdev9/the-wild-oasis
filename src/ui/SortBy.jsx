/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options = [] }) {
  const [searchparams, setSearchParams] = useSearchParams();
  const sortBy = searchparams?.get("sortBy") ?? "";

  function handleChange(e) {
    searchparams.set("sortBy", e.target.value);
    setSearchParams(searchparams);
  }

  return (
    <Select
      onChange={handleChange}
      options={options}
      type="white"
      value={sortBy}
    />
  );
}

export default SortBy;
