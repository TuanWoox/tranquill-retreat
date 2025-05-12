import { useQuery } from "@tanstack/react-query";
import { getSetting } from "../services/settingService";
export const useGetSetting = function () {
  const { data, isLoading, error } = useQuery({
    queryFn: getSetting,
    queryKey: ["settings"],
  });
  return {
    data,
    isLoading,
    error,
  };
};
