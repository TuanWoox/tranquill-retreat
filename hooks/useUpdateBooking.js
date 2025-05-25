import { useMutation } from "@tanstack/react-query";
import { updateBooking } from "../services/bookingService";
import queryClient from "../config/reactQuery";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

export const useUpdateBooking = function (
  updateFromAdmin = false,
  goback = true
) {
  const router = useRouter();
  const {
    mutate: updateBookingFn,
    isLoading: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: updateBooking,
    onSuccess: (data) => {
      if (!updateFromAdmin) {
        queryClient.setQueryData(["bookings"], (oldValue) => {
          if (!oldValue) return [];
          return oldValue.map((item) => (item._id === data._id ? data : item));
        });
      }

      queryClient.setQueryData(["booking", data._id], data);

      if (updateFromAdmin) {
        queryClient.setQueryData(
          ["cabinBookings", data.cabin._id],
          (oldValue) => {
            if (!oldValue) return [];
            // Keep all bookings except the updated one unless the updated booking's status is confirmed or checked-in
            return oldValue.filter(
              (b) =>
                b._id !== data._id ||
                ["confirmed", "checked-in"].includes(b.status)
            );
          }
        );
      }

      Toast.show({
        type: "success",
        text1: "Update",
        text2: "Update Successfully",
      });

      if (goback) {
        router.back();
      }
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Update",
        text2: err?.message || "Fail to update",
      });
    },
  });

  return {
    updateBookingFn,
    isUpdating,
    updateError,
  };
};
