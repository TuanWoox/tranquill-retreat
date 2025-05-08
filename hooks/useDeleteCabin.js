import { useMutation } from "@tanstack/react-query";
import { deleteBooking } from "../services/bookingService";
import queryClient from "../config/reactQuery";
import Toast from "react-native-toast-message";
export const useDeleteCabin = function () {
  const {
    mutate: deleteBookingFn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["bookings"]);
      Toast.show({
        type: "success",
        text1: "Xóa",
        text2: "Xóa thành công",
      });
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Xóa",
        text2: "Xóa thất bại",
      });
    },
  });
  return {
    deleteBookingFn,
    isLoading,
    error,
  };
};
