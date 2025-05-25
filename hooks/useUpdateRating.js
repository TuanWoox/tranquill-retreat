import { useMutation } from "@tanstack/react-query";
import { updateRating } from "@/services/rateService";
import Toast from "react-native-toast-message";
import queryClient from "@/config/reactQuery";

export const useUpdateRating = () => {
  return useMutation({
    mutationFn: ({ ratingId, updatedData }) => {
      return updateRating(ratingId, updatedData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cabinRatings"] });
      queryClient.invalidateQueries({ queryKey: ["rating"] }); // Also invalidate single rating queries
      Toast.show({
        type: "success",
        text1: "Rating Updated",
        text2: "Your rating has been successfully updated.",
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: error.message || "Failed to update rating",
      });
    },
  });
};
