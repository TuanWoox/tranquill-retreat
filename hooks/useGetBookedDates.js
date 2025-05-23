import { useQuery } from "@tanstack/react-query";
import { getBookedDates } from "@/services/bookingService";

export function useGetBookedDates(cabinId) {
  return useQuery({
    queryKey: ["bookedDates", cabinId],
    queryFn: () => {
      return getBookedDates(cabinId);
    },
    enabled: !!cabinId,
  });
}
