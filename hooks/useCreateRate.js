import { useMutation, useQuery } from "@tanstack/react-query";
import { submitRating, getRatingsByCabinId } from "../services/rateService";
import Toast from "react-native-toast-message";
import queryClient from "../config/reactQuery";

// Hook for submitting/updating a rating
export const useSubmitRating = () => {
  const {
    mutate: mutateFunction,
    isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: submitRating,
    onSuccess: (data) => {
      // Default success behavior
      queryClient.invalidateQueries({ queryKey: ["cabinRatings"] });
      queryClient.invalidateQueries({ queryKey: ["rating"] });
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
        text2: err.message || "Failed to submit rating",
      });
    },
  });

  // Return a function that allows passing callbacks
  const submitRatingFn = (data, options = {}) => {
    return mutateFunction(data, {
      onSuccess: (responseData) => {
        // If custom success callback is provided, call it with the response data
        if (options?.onSuccess) {
          options.onSuccess(responseData);
        }
      },
      onError: (error) => {
        if (options?.onError) {
          options.onError(error);
        }
      },
    });
  };

  return {
    submitRatingFn,
    isLoading,
    error,
    isSuccess,
  };
};
