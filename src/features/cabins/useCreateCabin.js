import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin as createEditCabinAPi } from "../../services/apiCabins";

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: (newCabin) => createEditCabinAPi(newCabin),
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCabin, isCreating };
}

export default useCreateCabin;
