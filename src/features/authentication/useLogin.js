import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user);
      navigate("/", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isPending, login, error };
}

export default useLogin;
