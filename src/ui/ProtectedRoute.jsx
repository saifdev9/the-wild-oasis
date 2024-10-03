/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import useUser from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--color-grey-50);
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { authorized, isPending } = useUser();

  useEffect(() => {
    if (!authorized && !isPending) {
      navigate("/login");
    }
  }, [authorized, navigate, isPending]);

  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (authorized) return children;
}

export default ProtectedRoute;
