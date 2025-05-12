import { useQuery } from "@tanstack/react-query";
import { getBookedDates } from "@/services/bookingService";
import queryClient from "@/config/reactQuery";

export function useGetBookedDates(cabinId) {
  return useQuery({
    queryKey: ["bookedDates", { cabinId }],
    queryFn: getBookedDates,
    enabled: !!cabinId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
