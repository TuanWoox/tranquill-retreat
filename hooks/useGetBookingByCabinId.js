import { useQuery } from "@tanstack/react-query";
import { getBookingsByCabinId } from "../services/bookingService";
export const useGetBookingByCabinId = (cabinId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["cabinBookings", cabinId],
    queryFn: () => {
      return getBookingsByCabinId(cabinId);
    },
  });
  return {
    data,
    isLoading,
    error,
  };
};
