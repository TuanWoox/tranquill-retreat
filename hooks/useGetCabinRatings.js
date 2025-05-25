import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getRatingsByCabinId } from "../services/rateService";
import Toast from "react-native-toast-message";
import queryClient from "../config/reactQuery";

// Hook for fetching cabin ratings
export const useGetCabinRatings = (cabinId, options = {}) => {
  return useQuery({
    queryKey: ["cabinRatings", cabinId],
    queryFn: () => getRatingsByCabinId(cabinId),
    enabled: !!cabinId, // Only run query if cabinId exists
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    ...options,
  });
};

// Hook for getting cabin ratings with formatted data
export const useCabinRatingsFormatted = (cabinId) => {
  const query = useGetCabinRatings(cabinId);

  // Format the data based on your API response structure
  const formattedData = React.useMemo(() => {
    if (!query.data) {
      return {
        averageRating: 0,
        totalRatings: 0,
        individualRatings: [],
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      };
    }

    const {
      averageRating = 0,
      totalRatings = 0,
      individualRatings = [],
    } = query.data;

    // Calculate rating distribution from individual ratings
    const ratingDistribution = individualRatings.reduce(
      (dist, item) => {
        const rating = item.rating;
        dist[rating] = (dist[rating] || 0) + 1;
        return dist;
      },
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    );

    // Format individual ratings for display with safer access
    const formattedRatings = individualRatings.map((item) => {
      // Safety checks for all properties
      return {
        id: item._id || `temp-${Math.random()}`,
        rating: item.rating || 0,
        comment: item.comment || "",
        createdAt: item.createdAt || new Date().toISOString(),
        userFullName: item.userFullName || "Anonymous Guest",
        bookedDates: item.bookedDates || [],
        stayPeriod: {
          startDate:
            item.booking?.startDate ||
            item.stayPeriod?.startDate ||
            new Date().toISOString(),
          endDate:
            item.booking?.endDate ||
            item.stayPeriod?.endDate ||
            new Date().toISOString(),
        },
      };
    });

    return {
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      totalRatings,
      individualRatings: formattedRatings,
      ratingDistribution,
    };
  }, [query.data]);

  return {
    ...query,
    data: formattedData,
  };
};
