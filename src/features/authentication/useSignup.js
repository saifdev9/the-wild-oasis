import { useMutation } from "@tanstack/react-query";
import { signup as signipApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignup() {
  const { mutate: signup, isPending: isSignup } = useMutation({
    mutationFn: () => signipApi(),
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address"
      );
    },
  });
  return { signup, isSignup };
}

export default useSignup;
