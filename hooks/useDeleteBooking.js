import { useMutation } from "@tanstack/react-query";
import { deleteBooking } from "../services/bookingService";
import queryClient from "../config/reactQuery";
import Toast from "react-native-toast-message";
export const useDeleteBooking = function () {
  const {
    mutate: deleteBookingFn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: (data) => {
      queryClient.setQueryData(["bookings"], (oldValue) => {
        if (!oldValue) return [];
        return oldValue.filter((item) => item._id !== data._id);
      });
      Toast.show({
        type: "success",
        text1: "Delete",
        text2: "Delete Successfully",
      });
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Delete",
        text2: "Fail to delete",
      });
    },
  });
  return {
    deleteBookingFn,
    isLoading,
    error,
  };
};
