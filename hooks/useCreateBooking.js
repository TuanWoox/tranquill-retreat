import { useAuthContext } from "@/context/AuthContext";
import { createBooking } from "@/services/bookingService";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "react-native-toast-message";

export const useCreateBooking = () => {
  const { user } = useAuthContext();

  const {
    mutate: createBookingFn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (bookingData) => {
      // Format data to match backend expectations
      const formattedData = {
        ...bookingData,
        cabinId: bookingData.cabin, // Backend expects cabinId
        cabin: bookingData.cabin, // Also include cabin for model validation
        user: user?._id, // Add user ID from auth context
        id: user?._id, // Backend UserPrototype.clone expects id field
      };

      console.log("Formatted booking data:", formattedData);
      return createBooking(formattedData);
    },
    onSuccess: (data) => {
      console.log("Booking success response:", data);

      // Extract the proper booking data - the structure might be nested
      const bookingData = data.savedBooking || data;

      // Ensure the booking has the required fields before updating cache
      if (bookingData && bookingData._id) {
        // Directly update the bookings cache
        queryClient.setQueryData(["bookings"], (oldBookings = []) => {
          return [...oldBookings, bookingData];
        });
      }

      Toast.show({
        type: "success",
        text1: "Đặt phòng",
        text2: "Đặt phòng thành công",
      });

      router.push("/user/booking");
    },
    onError: (error) => {
      console.error("Booking error:", error);
      Toast.show({
        type: "error",
        text1: "Đặt phòng",
        text2: error.message || "Đặt phòng thất bại",
      });
    },
  });

  return {
    createBookingFn,
    isLoading,
    error,
  };
};
