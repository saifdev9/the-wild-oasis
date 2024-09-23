import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDark } from "../context/DarkMode";

function DarkModeToggle() {
  const { toggle, toggleMode } = useDark();

  return (
    <ButtonIcon onClick={toggleMode}>
      {toggle ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
