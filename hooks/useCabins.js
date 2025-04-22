import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../services/data-service";

export function useCabins() {
  const {
    data: cabins,
    isLoading: isCabinsLoading,
    error: cabinsError,
  } = useQuery({
    queryFn: getCabins,
    queryKey: ["cabins"],
  });
  return {
    cabins,
    isCabinsLoading,
    cabinsError,
  };
}
