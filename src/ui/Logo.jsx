import styled from "styled-components";
import { useDark } from "../context/DarkMode";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { toggle } = useDark();

  const src = !toggle ? "/logo-light.png" : "/logo-dark.png";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
