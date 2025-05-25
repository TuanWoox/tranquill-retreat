import { useMutation, useQuery } from "@tanstack/react-query";
import { submitRating, getRatingsByCabinId } from "../services/rateService";
import Toast from "react-native-toast-message";
import queryClient from "../config/reactQuery";

// Hook for submitting/updating a rating
export const useSubmitRating = () => {
  const {
    mutate: submitRatingFn,
    isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: submitRating,
    onSuccess: (data, variables) => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({
        queryKey: ["cabinRatings", variables.cabinId],
      });
      queryClient.invalidateQueries({
        queryKey: ["booking", variables.bookingId],
      });

      Toast.show({
        type: "success",
        text1: "Rating Submitted",
        text2: "Thank you for your feedback!",
      });
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Rating Failed",
        text2: err?.message || "Please try again later",
      });
    },
  });

  return {
    submitRatingFn,
    isLoading,
    error,
    isSuccess,
  };
};
