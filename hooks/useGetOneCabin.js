import { useQuery } from "@tanstack/react-query";
import { getOneCabin } from "../services/cabinService";
export const useGetOneCabin = (cabinId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["cabin", cabinId],
    queryFn: () => getOneCabin({ cabinId }),
  });
  return {
    data,
    isLoading,
    error,
  };
};
