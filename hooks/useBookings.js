import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../services/bookingService";
export const useBookings = function () {
  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBookings,
  });
  return {
    data,
    isLoading,
    error,
  };
};
