import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Spinner from "@/components/Spinner";
import {
  AntDesign,
  FontAwesome,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import { format, isToday, formatDistance, parseISO } from "date-fns";
import { useGetOneBooking } from "@/hooks/useGetOneBooking";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDeleteBooking } from "@/hooks/useDeleteBooking";

const IMAGE_URL = process.env.EXPO_PUBLIC_BACKEND_URL_IMAGE;

const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

export default function BookingDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: booking, isLoading, error } = useGetOneBooking(id);
  const {
    deleteBookingFn,
    isLoading: isDeleteing,
    error: deleteError,
  } = useDeleteBooking();

  if (isLoading) return <Spinner />;

  if (error || !booking)
    return (
      <View className="flex-1 justify-center items-center bg-[#181b20]">
        <View className="items-center p-10">
          <AntDesign name="exclamationcircleo" size={64} color="#ff4d4f" />
          <Text className="text-[#ff4d4f] text-xl font-bold mt-4">
            Booking not found
          </Text>
          <Text className="text-[#94a3b8] text-sm mt-2">
            Please try again later
          </Text>
        </View>
      </View>
    );

  const {
    startDate,
    endDate,
    numDates,
    cabinPrice,
    extrasPrice,
    totalPrice,
    numGuests,
    createdAt,
    cabin,
    observations,
    hasBreakfast,
    _id,
  } = booking;

  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  let bookingStatus = "";
  let statusColor = "";

  if (now < start) {
    bookingStatus = "Upcoming";
    statusColor = "#10b981"; // Green
  } else if (now > end) {
    bookingStatus = "Past";
    statusColor = "#f59e0b"; // Orange
  } else {
    bookingStatus = "In Progress";
    statusColor = "#3b82f6"; // Blue
  }
  const canEdit = bookingStatus === "Upcoming";
  const canDelete = bookingStatus === "Upcoming" || bookingStatus === "Past";

  const onDelete = () => {
    Alert.alert(
      "Delete Booking",
      "Are you sure you want to delete this booking?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteBookingFn(_id);
          },
        },
      ]
    );
  };

  return (
    <ImageBackground
      source={require("@/assets/images/aboutBackground.jpg")}
      className="flex-1 w-full h-full"
      resizeMode="cover"
    >
      <View className="absolute inset-0 bg-black/70" />
      <SafeAreaView className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        >
          {/* Header Section */}
          <View className="mb-6">
            <View className="bg-[#23272f]/95 rounded-2xl p-5 border border-[#d2af84]">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-[#d2af84] text-2xl font-bold">
                  Booking Details
                </Text>
                <View
                  className={`px-3 py-1 rounded-full `}
                  style={{ backgroundColor: statusColor }}
                >
                  <Text className="text-white text-xs font-bold uppercase">
                    {bookingStatus}
                  </Text>
                </View>
              </View>
              <Text className="text-[#94a3b8] text-sm font-medium">
                ID: #{id.slice(-8).toUpperCase()}
              </Text>
            </View>
          </View>

          {/* Cabin Info Card */}
          <View className="mb-5">
            <View className="h-48 rounded-2xl overflow-hidden relative">
              <Image
                source={{
                  uri:
                    cabin?.image && !cabin.image.includes(".co")
                      ? `${IMAGE_URL}/${cabin.image}`
                      : cabin.image || "https://via.placeholder.com/400x200",
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
              <View className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 flex-row items-center">
                <MaterialIcons name="cabin" size={24} color="#d2af84" />
                <Text className="text-[#d2af84] text-lg font-bold ml-2">
                  {cabin?.name}
                </Text>
              </View>
            </View>
          </View>

          {/* Date & Duration Card */}
          <View className="bg-[#23272f]/95 rounded-2xl mb-4 border border-[#d2af84]/30">
            <View className="flex-row items-center p-4 border-b border-[#d2af84]/20">
              <AntDesign name="calendar" size={20} color="#d2af84" />
              <Text className="text-[#d2af84] text-base font-bold ml-2">
                Stay Duration
              </Text>
            </View>
            <View className="p-4">
              <View className="flex-row items-center justify-between mb-4">
                <View className="items-center flex-1">
                  <Text className="text-[#94a3b8] text-xs uppercase font-semibold mb-1">
                    Check-in
                  </Text>
                  <Text className="text-white text-lg font-bold">
                    {format(new Date(startDate), "MMM dd")}
                  </Text>
                  <Text className="text-[#d2af84] text-sm font-medium">
                    {format(new Date(startDate), "yyyy")}
                  </Text>
                  <Text className="text-[#94a3b8] text-xs italic mt-1">
                    {isToday(new Date(startDate))
                      ? "Today"
                      : formatDistanceFromNow(startDate)}
                  </Text>
                </View>
                <View className="flex-row items-center px-4">
                  <View className="h-px bg-[#d2af84] flex-1" />
                  <AntDesign name="arrowright" size={16} color="#d2af84" />
                  <View className="h-px bg-[#d2af84] flex-1" />
                </View>
                <View className="items-center flex-1">
                  <Text className="text-[#94a3b8] text-xs uppercase font-semibold mb-1">
                    Check-out
                  </Text>
                  <Text className="text-white text-lg font-bold">
                    {format(new Date(endDate), "MMM dd")}
                  </Text>
                  <Text className="text-[#d2af84] text-sm font-medium">
                    {format(new Date(endDate), "yyyy")}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center justify-center bg-[#d2af84]/10 p-3 rounded-lg">
                <MaterialIcons name="hotel" size={18} color="#d2af84" />
                <Text className="text-[#d2af84] text-base font-bold ml-2">
                  {numDates} dates
                </Text>
              </View>
            </View>
          </View>

          {/* Guest & Services Card */}
          <View className="bg-[#23272f]/95 rounded-2xl mb-4 border border-[#d2af84]/30">
            <View className="flex-row items-center p-4 border-b border-[#d2af84]/20">
              <FontAwesome name="users" size={18} color="#d2af84" />
              <Text className="text-[#d2af84] text-base font-bold ml-2">
                Guest & Services
              </Text>
            </View>
            <View className="p-4">
              <View className="flex-row justify-between items-center py-3 border-b border-[#d2af84]/10">
                <View className="flex-row items-center">
                  <FontAwesome name="user" size={16} color="#94a3b8" />
                  <Text className="text-white text-base ml-2">Guests</Text>
                </View>
                <Text className="text-[#d2af84] text-base font-bold">
                  {numGuests}
                </Text>
              </View>
              <View className="flex-row justify-between items-center py-3">
                <View className="flex-row items-center">
                  <MaterialIcons
                    name="free-breakfast"
                    size={18}
                    color="#94a3b8"
                  />
                  <Text className="text-white text-base ml-2">Breakfast</Text>
                </View>
                <View
                  className={`px-3 py-1 rounded-full ${
                    hasBreakfast ? "bg-[#10b981]" : "bg-[#64748b]"
                  }`}
                >
                  <Text className="text-white text-xs font-semibold">
                    {hasBreakfast ? "Included" : "Not included"}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Special Requests Card */}
          {observations && (
            <View className="bg-[#23272f]/95 rounded-2xl mb-4 border border-[#d2af84]/30">
              <View className="flex-row items-center p-4 border-b border-[#d2af84]/20">
                <Feather name="message-square" size={18} color="#d2af84" />
                <Text className="text-[#d2af84] text-base font-bold ml-2">
                  Special Requests
                </Text>
              </View>
              <View className="p-4">
                <Text className="text-white text-base leading-6 italic">
                  {observations}
                </Text>
              </View>
            </View>
          )}

          {/* Price & Booking Info Card */}
          <View className="bg-[#23272f]/95 rounded-2xl mb-4 border-2 border-[#d2af84]">
            <View className="flex-row items-center p-4 border-b border-[#d2af84]/20">
              <AntDesign name="creditcard" size={18} color="#d2af84" />
              <Text className="text-[#d2af84] text-base font-bold ml-2">
                Payment & Booking Info
              </Text>
            </View>
            <View className="p-4">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-white text-lg font-semibold">
                  Base Price
                </Text>
                <Text className="text-[#d2af84] text-2xl font-bold">
                  ${cabinPrice}
                </Text>
              </View>
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-white text-lg font-semibold">
                  Breakfast Price
                </Text>
                <Text className="text-[#d2af84] text-2xl font-bold">
                  ${extrasPrice}
                </Text>
              </View>
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-white text-lg font-semibold">
                  Total Amount
                </Text>
                <Text className="text-[#d2af84] text-2xl font-bold">
                  ${totalPrice}
                </Text>
              </View>
              <View className="h-px bg-[#d2af84]/30 my-3" />
              <View className="flex-row items-center">
                <AntDesign name="clockcircleo" size={14} color="#94a3b8" />
                <Text className="text-[#94a3b8] text-sm ml-2">
                  Booked on {format(new Date(createdAt), "MMM dd, yyyy")}
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-center gap-4 mt-6">
            {canEdit && (
              <TouchableOpacity
                className="bg-[#d2af84] rounded-xl py-3.5 px-6 flex-row items-center gap-2 flex-1 justify-center shadow shadow-[#d2af84]"
                onPress={() => router.push(`/user/booking/${id}/edit`)}
              >
                <AntDesign name="edit" size={18} color="#23272f" />
                <Text className="text-[#23272f] font-bold text-base">
                  Edit Booking
                </Text>
              </TouchableOpacity>
            )}
            {canDelete && (
              <TouchableOpacity
                className="bg-[#ff4d4f] rounded-xl py-3.5 px-6 flex-row items-center gap-2 shadow shadow-[#ff4d4f]"
                onPress={onDelete}
              >
                <AntDesign name="delete" size={18} color="#fff" />
                <Text className="text-white font-bold text-base">Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
