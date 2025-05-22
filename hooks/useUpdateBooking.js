import { useMutation } from "@tanstack/react-query";
import { updateBooking } from "../services/bookingService";
import queryClient from "../config/reactQuery";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

export const useUpdateBooking = function () {
  const router = useRouter();
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
        text1: "Update",
        text2: "Update Successfully",
      });
      router.back();
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Update",
        text2: err?.message || "Fail to update",
      });
      router.back();
    },
  });
  return {
    updateBookingFn,
    isUpdating,
    updateError,
  };
};
