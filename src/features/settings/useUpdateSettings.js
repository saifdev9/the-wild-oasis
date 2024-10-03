import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

function useUpdateSettings() {
  const querClient = useQueryClient();

  const { mutate: updateSetting, isUpdating } = useMutation({
    mutationFn: (settings) => updateSettingApi(settings),
    onSuccess: () => {
      toast.success("Settings updated successfully");
      querClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateSetting, isUpdating };
}

export default useUpdateSettings;
