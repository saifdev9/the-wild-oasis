import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

function useSettings() {
  const {
    data: settings,
    isPending,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { settings, error, isPending };
}

export default useSettings;
