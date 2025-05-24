import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Spinner from "@/components/Spinner";
import {
  AntDesign,
  FontAwesome,
  MaterialIcons,
  Feather,
  Ionicons,
} from "@expo/vector-icons";
import { format, isToday, formatDistance, parseISO } from "date-fns";
import { useGetOneBooking } from "@/hooks/useGetOneBooking";
import { useUpdateBooking } from "@/hooks/useUpdateBooking";
import CabinHeroBooking from "@/components/CabinHeroBooking";
import StayDurationSection from "@/components/StayDurationSection";
import GuestServiceSection from "@/components/GuestServiceSection";
import SpecialRequestSection from "@/components/SpecialRequestSection";
import FinSummarySection from "@/components/FinSummarySection";
import GuestInfoSection from "@/components/GuestInfoSection";
import HeaderSection from "@/components/HeaderSection";
import ActionSection from "@/components/ActionSection";

const IMAGE_URL = process.env.EXPO_PUBLIC_BACKEND_URL_IMAGE;

const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

export default function AdminDetailsBooking() {
  // Hooks
  const { bookingId } = useLocalSearchParams();
  const router = useRouter();
  const updateFromAdmin = true;
  const goback = false;

  // Fetch booking details
  const { data: booking, isLoading, error } = useGetOneBooking(bookingId);
  const { updateBookingFn, isUpdating, updateError } = useUpdateBooking(
    updateFromAdmin,
    goback
  );

  // Auto navigate back if already checked-out
  useEffect(() => {
    if (booking?.status === "checked-out") router.back();
  }, [booking?.status]);

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

  // Destructure data
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
    status,
    isPaid,
    user,
  } = booking;

  // Derived state
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  let bookingStatus = status || "";
  let statusColor = "";

  if (!status) {
    if (now < start) {
      bookingStatus = "Upcoming";
      statusColor = "#10b981";
    } else if (now > end) {
      bookingStatus = "Past";
      statusColor = "#f59e0b";
    } else {
      bookingStatus = "In Progress";
      statusColor = "#3b82f6";
    }
  } else {
    switch (status.toLowerCase()) {
      case "confirmed":
        statusColor = "#10b981";
        break;
      case "checked-in":
        statusColor = "#3b82f6";
        break;
      case "checked-out":
        statusColor = "#64748b";
        break;
      default:
        statusColor = "#94a3b8";
    }
  }

  const onUpdateStatus = (newStatus) => {
    Alert.alert("Update Status", `Change booking status to ${newStatus}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Update",
        onPress: () => {
          updateBookingFn({
            bookingId: _id,
            status: newStatus,
            isPaid: newStatus !== "confirmed",
          });
        },
      },
    ]);
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      >
        {/* Admin Header Section */}
        <HeaderSection
          bookingId={bookingId}
          statusColor={statusColor}
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
        {/* Guest Information Card */}
        <GuestInfoSection user={user} />

        {/* Quick Status Update Buttons */}
        <ActionSection
          onUpdateStatus={onUpdateStatus}
          bookingStatus={bookingStatus}
        />
        <View className="mt-4 items-center">
          <TouchableOpacity
            className="bg-[#d2af84] px-6 py-3 rounded-full"
            onPress={() => router.back()}
          >
            <Text className="text-[#23272f] font-bold text-base">← Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
