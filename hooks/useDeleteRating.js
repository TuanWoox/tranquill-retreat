import { useMutation } from "@tanstack/react-query";
import { deleteRating } from "@/services/rateService";
import Toast from "react-native-toast-message";
import queryClient from "@/config/reactQuery"; // adjust the path if needed

export const useDeleteRating = () => {
  return useMutation({
    mutationFn: (ratingId) => deleteRating(ratingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabinRatings"] });
      Toast.show({
        type: "success",
        text1: "Rating Deleted",
        text2: "Your rating has been successfully deleted.",
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Deletion Failed",
        text2: error.message || "Failed to delete rating",
      });
    },
  });
};
