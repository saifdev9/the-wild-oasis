/* eslint-disable react/prop-types */
import { useEffect } from "react";
import useUser from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-50);
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isPending, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate("/login");
  }, [isAuthenticated, navigate, isPending]);

  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  return isAuthenticated && children;
}

export default ProtectedRoute;
