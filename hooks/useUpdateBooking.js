import { useMutation } from "@tanstack/react-query";
import { updateBooking } from "../services/bookingService";
import queryClient from "../config/reactQuery";
import Toast from "react-native-toast-message";

export const useUpdateBooking = function () {
  const {
    mutate: updateBookingFn,
    isLoading: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: updateBooking,
    onSuccess: (data) => {
      queryClient.setQueryData(["booking", data._id], data);
      queryClient.setQueryData(["bookings"], (oldValue) => {
        if (!oldValue) return [];
        return oldValue.map((item) => (item._id === data._id ? data : item));
      });

      Toast.show({
        type: "success",
        text1: "Cập nhật",
        text2: "Cập nhật thành công",
      });
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Cập nhật",
        text2: "Cập nhật thất bại",
      });
    },
  });
  return {
    updateBookingFn,
    isUpdating,
    updateError,
  };
};
