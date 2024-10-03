import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignup() {
  const {
    mutate: signup,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => signupApi({ email, password }),
    onSuccess: () => {
      toast.success("New user created successfully");
    },
    onError: (err) => toast.error(err.message),
  });
  return { isPending, signup, error };
}

export default useSignup;
