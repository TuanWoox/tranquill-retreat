import { useAuthContext } from "@/context/AuthContext";
import { createBooking } from "@/services/bookingService";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import queryClient from "@/config/reactQuery";
export const useCreateBooking = () => {
  const { user } = useAuthContext();
  const router = useRouter();
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

      return createBooking(formattedData);
    },
    onSuccess: (data) => {
      // Extract the proper booking data - the structure might be nested
      const bookingData = data.savedBooking || data;

      // Ensure the booking has the required fields before updating cache
      if (bookingData && bookingData._id) {
        // Directly update the bookings cache
        queryClient.setQueryData(["bookings"], (oldBookings = []) => {
          return [...oldBookings, bookingData];
        });
      }

      queryClient.invalidateQueries(["bookDates", bookingData.cabin._id]);

      Toast.show({
        type: "success",
        text1: "Booking",
        text2: "Booking Successfully",
      });

      router.replace("/thankyou");
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Booking",
        text2: error?.message || "Fail to create booking",
      });
    },
  });

  return {
    createBookingFn,
    isLoading,
    error,
  };
};
