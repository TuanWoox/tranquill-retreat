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
import { SafeAreaView } from "react-native-safe-area-context";
import NotFoundCard from "@/components/NotFoundCard";

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

  if (isLoading) return <Spinner>Fetch The Booking</Spinner>;
  if (error || !booking)
    return (
      <View className="flex-1 justify-center items-center ">
        <NotFoundCard
          title="No Booking Found"
          message="There is no booking at the moment"
          suggestion="Please try again later."
          icon="calendar"
          iconColor="#eab308"
          error={error}
        />
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
      <SafeAreaView className="flex-1 ">
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
          <View className="mt-8 items-center">
            <TouchableOpacity
              className="flex-row items-center bg-[#d2af84]/90 px-6 py-3 rounded-full shadow-lg"
              onPress={() => router.back()}
              activeOpacity={0.85}
            >
              <AntDesign name="arrowleft" size={20} color="#181b20" />
              <Text className="text-[#181b20] font-bold text-base ml-2">
                Back to Bookings
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
