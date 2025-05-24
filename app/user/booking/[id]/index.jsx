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
import GuestServiceSection from "@/components/GuestServiceSection";
import CabinHeroBooking from "@/components/CabinHeroBooking";
import StayDurationSection from "@/components/StayDurationSection";
import SpecialRequestSection from "@/components/SpecialRequestSection";
import FinSummarySection from "@/components/FinSummarySection";
import HeaderSection from "@/components/HeaderSection";
import ActionSection from "@/components/ActionSection";

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
    isPaid,
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
          <HeaderSection
            statusColor={statusColor}
            id={id}
            bookingStatus={bookingStatus}
          />
          {/* Cabin Info Card */}
          <CabinHeroBooking cabin={cabin} />
          {/* Date & Duration Card */}
          <StayDurationSection
            startDate={startDate}
            endDate={endDate}
            numDates={numDates}
          />
          {/* Guest & Services Card */}
          <GuestServiceSection
            numGuests={numGuests}
            hasBreakfast={hasBreakfast}
          />
          {/* Special Requests Card */}
          <SpecialRequestSection observations={observations} />
          {/* Financial Summary Card */}
          <FinSummarySection
            numDates={numDates}
            cabinPrice={cabinPrice}
            extrasPrice={extrasPrice}
            totalPrice={totalPrice}
            createdAt={createdAt}
            isPaid={isPaid}
          />

          {/* Action Buttons */}
          <ActionSection
            canDelete={canDelete}
            canEdit={canEdit}
            onDelete={onDelete}
          />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
