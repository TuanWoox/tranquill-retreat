// hooks/useGetOneBooking.js
import { useQuery } from "@tanstack/react-query";
import { getOneBooking } from "../services/bookingService";

export const useGetOneBooking = function (id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["booking", id],
    queryFn: getOneBooking,
    enabled: !!id, // only run if id exists
  });

  return { data, isLoading, error };
};
