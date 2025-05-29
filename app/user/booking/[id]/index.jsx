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
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Spinner from "@/components/Spinner";
import { AntDesign } from "@expo/vector-icons";
import { format, isToday, formatDistance, parseISO } from "date-fns";
import { useGetOneBooking } from "@/hooks/useGetOneBooking";
import { useDeleteBooking } from "@/hooks/useDeleteBooking";
import GuestServiceSection from "@/components/GuestServiceSection";
import CabinHeroBooking from "@/components/CabinHeroBooking";
import StayDurationSection from "@/components/StayDurationSection";
import SpecialRequestSection from "@/components/SpecialRequestSection";
import FinSummarySection from "@/components/FinSummarySection";
import HeaderSection from "@/components/HeaderSection";
import ActionSection from "@/components/ActionSection";
import RatingSection from "@/components/RatingSection";
import ButtonBack from "@/components/ButtonBack";
import NotFoundCard from "@/components/NotFoundCard";

const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

export default function BookingDetail() {
  const { id } = useLocalSearchParams();
  const { data: booking, isLoading, error } = useGetOneBooking(id);
  const {
    deleteBookingFn,
    isLoading: isDeleting,
    error: deleteError,
  } = useDeleteBooking();

  if (isLoading) return <Spinner>Fetching The Booking</Spinner>;

  if (error || !booking)
    return (
      <NotFoundCard
        title="Booking Not Found"
        message="Sorry, we couldn't find the booking you're looking for."
        suggestion="Please check the link or try again later."
        icon="calendar"
        iconColor="#eab308"
        error={error}
      />
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
    status,
  } = booking;

  // Only allow edit/delete if status is "confirmed"
  const canEdit = status?.toLowerCase() === "confirmed";
  const canDelete = status?.toLowerCase() === "confirmed";

  // Determine booking status for rating section
  const bookingStatus =
    status?.toLowerCase() === "checked-out" ? "Past" : status;

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

  // Status color for header
  let statusColor = "#22c55e"; // default green
  if (status?.toLowerCase() === "checked-in") statusColor = "#3b82f6";
  if (status?.toLowerCase() === "checked-out") statusColor = "#eab308";

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={100}
      >
        <SafeAreaView className="flex-1">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
            keyboardShouldPersistTaps="handled"
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

            {/* Rating Section - Only show for past bookings */}
            {(booking.status === "checked-out" ||
              (bookingStatus === "Past" &&
                booking.status !== "unconfirmed")) && (
              <RatingSection
                bookingId={_id}
                cabinId={cabin._id}
                cabinName={cabin.name}
                existingRating={booking.rating} // If rating already exists
              />
            )}

            {/* Action Buttons */}
            <ActionSection
              canDelete={canDelete}
              canEdit={canEdit}
              onDelete={onDelete}
              id={_id}
            />

            {/* Back Button */}
            <ButtonBack />
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
}
