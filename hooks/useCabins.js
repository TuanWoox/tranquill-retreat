import { useQuery } from "@tanstack/react-query";
import { getAllCabins } from "../services/cabinService";

export function useCabins() {
  const {
    data: cabins,
    isLoading: isCabinsLoading,
    error: cabinsError,
  } = useQuery({
    queryFn: getAllCabins,
    queryKey: ["cabins"],
  });
  return {
    cabins,
    isCabinsLoading,
    cabinsError,
  };
}
