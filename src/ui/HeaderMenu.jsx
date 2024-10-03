import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineUser, HiOutlineSun } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkContext";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate(`/account`)}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon onClick={() => setDarkMode((d) => !d)}>
          {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
