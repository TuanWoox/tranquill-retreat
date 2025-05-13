import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import { AntDesign } from "@expo/vector-icons";
import { useDeleteCabin } from "@/hooks/useDeleteBooking";

const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

const BookingCard = ({ booking }) => {
  const {
    _id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    createdAt,
    cabin,
  } = booking;
  const { deleteBookingFn, isLoading, error } = useDeleteBooking();
  const router = useRouter();

  const isPastBooking = isPast(new Date(startDate));
  const bookingStatus = isPastBooking ? "Past" : "Upcoming";
  const badgeColor = isPastBooking ? "bg-yellow-700" : "bg-green-700";

  return (
    <View className="bg-gray-900 rounded-xl shadow-md border border-gray-700 mb-5">
      <View className="flex-row">
        {/* Image */}
        <Image
          source={{ uri: cabin.image }}
          className="w-28 h-full rounded-l-xl"
          resizeMode="cover"
        />

        {/* Info Section */}
        <View className="flex-1 p-3">
          <View className="flex-row justify-end items-start">
            <View className={`px-2 py-1 rounded ${badgeColor}`}>
              <Text className="text-xs font-bold uppercase text-white">
                {bookingStatus}
              </Text>
            </View>
          </View>
          <Text className="text-base font-bold text-white flex-1 mr-2">
            {numNights} nights in {cabin.name}
          </Text>

          {/* Dates */}
          <View className="mt-2">
            <Text className="text-sm text-gray-300">
              {format(new Date(startDate), "MMM dd")}
              {isToday(new Date(startDate))
                ? " (Today)"
                : ` (${formatDistanceFromNow(startDate)})`}
            </Text>
            <Text className="text-sm text-gray-300">
              to {format(new Date(endDate), "MMM dd yyyy")}
            </Text>
          </View>

          {/* Price and Guests */}
          <View className="flex-row items-center mt-2">
            <Text className="text-base font-semibold text-white">
              ${totalPrice}
            </Text>
            <Text className="mx-2 text-gray-400">&bull;</Text>
            <Text className="text-sm text-gray-300">
              {numGuests} guest{numGuests > 1 ? "s" : ""}
            </Text>
          </View>

          {/* Booking Time */}
          <Text className="text-xs text-gray-500 mt-2">
            Booked on {format(new Date(createdAt), "MMM dd")}
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="justify-between items-center bg-gray-800 px-2 py-3 rounded-r-xl border-l border-gray-700">
          {!isPastBooking && (
            <TouchableOpacity
              onPress={() => router.push(`/user/booking/${_id}/edit`)}
              className="items-center"
            >
              <AntDesign name="edit" size={18} color="#f5f5f5" />
              <Text className="text-xs font-semibold text-gray-200 mt-1">
                Edit
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => {
              deleteBookingFn({ _id });
            }}
            className="items-center mt-4"
          >
            <AntDesign name="delete" size={18} color="red" />
            <Text className="text-xs font-semibold text-red-500 mt-1">
              {isLoading ? "Đang xóa" : "Xóa"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BookingCard;
