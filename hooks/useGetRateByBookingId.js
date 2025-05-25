import { useQuery } from "@tanstack/react-query";
import { getRatingByBookingId } from "../services/rateService";

export const useGetRatingByBookingId = (bookingId) => {
  return useQuery(
    ["rating", bookingId],
    () => getRatingByBookingId(bookingId),
    {
      enabled: !!bookingId,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    }
  );
};

export default useGetRatingByBookingId;
