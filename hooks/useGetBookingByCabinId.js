import { useQuery } from "@tanstack/react-query";
import { getBookingsByCabinId } from "../services/bookingService";
import queryClient from "@/config/reactQuery";
export const useGetBookingByCabinId = (cabinId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["cabinBookings", cabinId],
    queryFn: () => {
      return getBookingsByCabinId(cabinId);
    },
    onError: () => {
      queryClient.invalidateQueries(["cabins"]);
    },
  });
  return {
    data,
    isLoading,
    error,
  };
};
