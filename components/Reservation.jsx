import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  StatusBar,
  Modal,
  Dimensions,
} from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import DateSelector from "./DateSelector";
import { useAuthContext } from "@/context/AuthContext";
import { differenceInDays } from "date-fns";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useCreateBooking } from "@/hooks/useCreateBooking";
import { LinearGradient } from "expo-linear-gradient";

export default function Reservation({ cabin, settings }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthContext();

  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [numGuests, setNumGuests] = useState(1);
  const [hasBreakfast, setHasBreakfast] = useState(false);
  const [observations, setObservations] = useState("");
  const [showGuestModal, setShowGuestModal] = useState(false);

  const { createBookingFn, isLoading: isSubmitting } = useCreateBooking();

  const handleDateChange = (newRange) => {
    setDateRange(newRange);
  };

  const handleResetDates = () => {
    setDateRange({ from: null, to: null });
  };

  const handleGuestSelect = (guestCount) => {
    setNumGuests(guestCount);
    setShowGuestModal(false);
  };

  const handleCreateBooking = () => {
    if (!isAuthenticated) {
      Toast.show({
        type: "error",
        text1: "Please log in to book a cabin",
      });
      router.push("/auth/login");
      return;
    }

    if (!dateRange.from || !dateRange.to) {
      Toast.show({
        type: "error",
        text1: "Please select dates for your stay",
      });
      return;
    }

    const numDates = differenceInDays(dateRange.to, dateRange.from);
    const cabinPrice = cabin?.discount
      ? cabin?.regularPrice - cabin?.discount
      : cabin?.regularPrice || 0;

    const extrasPrice =
      hasBreakfast && settings?.breakfastPrice
        ? settings.breakfastPrice * numGuests * numDates
        : 0;

    const bookingData = {
      startDate: dateRange.from,
      endDate: dateRange.to,
      numGuests,
      cabinPrice: cabinPrice * numDates,
      extrasPrice,
      hasBreakfast,
      observations,
      cabin: cabin._id || cabin.id,
    };

    createBookingFn(bookingData);
  };

  if (!isAuthenticated) {
    return (
      <LinearGradient colors={["#1E293B", "#0F172A"]} className="flex-1">
        <StatusBar barStyle="light-content" />
        <View className="flex-1 justify-center items-center p-5">
          <Ionicons name="log-in-outline" size={60} color="#FBBF24" />
          <Text className="text-white text-2xl font-bold mt-4 mb-2">
            Authentication Required
          </Text>
          <Text className="text-gray-300 text-base text-center leading-6">
            Please{" "}
            <Text
              className="text-amber-400 underline"
              onPress={() => router.push("/auth/login")}
            >
              login
            </Text>{" "}
            to reserve this cabin
          </Text>
          <TouchableOpacity
            className="bg-amber-400/20 border border-amber-400 py-3 px-6 rounded-xl mt-6"
            onPress={() => router.push("/auth/login")}
          >
            <Text className="text-amber-400 text-base font-semibold">
              Go to Login
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  const { from, to } = dateRange;
  const displayName = user?.fullName || "Visitor";
  const numDates = from && to ? differenceInDays(to, from) : 0;
  const totalCabinPrice =
    numDates * (cabin?.regularPrice - (cabin?.discount || 0));
  const totalBreakfastPrice =
    hasBreakfast && settings?.breakfastPrice
      ? settings.breakfastPrice * numGuests * numDates
      : 0;
  const totalPrice = totalCabinPrice + totalBreakfastPrice;

  const maxGuests = cabin?.maxCapacity || settings?.maxNumberOfGuests || 8;

  return (
    <LinearGradient colors={["#1E293B", "#0F172A"]} className="flex-1">
      <StatusBar barStyle="light-content" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* User Header With Card Effect */}
        <View className="mx-4 mt-4 rounded-2xl overflow-hidden shadow-lg">
          <LinearGradient
            colors={["#334155", "#1E293B"]}
            className="flex-row justify-between items-center p-4 rounded-2xl"
          >
            <View className="flex-col p-4">
              <Text className="text-slate-400 text-sm mb-1">Welcome </Text>
              <Text className="text-amber-400 text-xl font-bold">
                {displayName}
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Cabin Card Preview */}
        {cabin && (
          <View className="mx-4 mt-4 bg-slate-600 rounded-2xl p-4 shadow-md">
            <View className="flex-col gap-2">
              <Text className="text-white text-lg font-semibold">
                {cabin.name}
              </Text>
              <View className="flex-row items-center bg-black/20 px-2 py-1 rounded-xl self-start gap-1.5">
                <Ionicons name="bed-outline" size={14} color="#E5E7EB" />
                <Text className="text-gray-300 text-xs">
                  Max {cabin.maxCapacity} guests
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Date Selector Section */}
        <DateSelector
          settings={
            settings || {
              minBookingLength: 1,
              maxBookingLength: 30,
              maxNumberOfGuests: cabin?.maxCapacity || 8,
            }
          }
          cabin={cabin}
          dateRange={dateRange}
          onDateChange={handleDateChange}
          onReset={handleResetDates}
        />

        {/* Guest Details Section */}
        <View className="mx-4 mt-6 bg-slate-600 rounded-2xl p-4 shadow-sm">
          <View className="flex-row items-center mb-4 gap-2">
            <FontAwesome5 name="users" size={18} color="#FBBF24" />
            <Text className="text-white text-lg font-semibold">
              Guest Details
            </Text>
          </View>

          <View className="mb-4">
            <Text className="text-gray-300 text-base mb-2">
              Number of Guests
            </Text>
            <TouchableOpacity
              className="bg-slate-800 rounded-xl p-4 flex-row justify-between items-center border border-white/10"
              onPress={() => setShowGuestModal(true)}
            >
              <Text className="text-gray-300 text-base">
                {numGuests} {numGuests === 1 ? "guest" : "guests"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#E5E7EB" />
            </TouchableOpacity>
          </View>

          <View className="mb-4">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-gray-300 text-base">
                  Include breakfast
                </Text>
                {settings?.breakfastPrice && (
                  <Text className="text-slate-400 text-xs">
                    ${settings.breakfastPrice} per person/date
                  </Text>
                )}
              </View>
              <Switch
                value={hasBreakfast}
                onValueChange={(value) => setHasBreakfast(value)}
                trackColor={{ false: "#334155", true: "#10B981" }}
                thumbColor={hasBreakfast ? "#FBBF24" : "#E5E7EB"}
                ios_backgroundColor="#334155"
              />
            </View>
          </View>
        </View>

        {/* Special Requests Section */}
        <View className="mx-4 mt-6 bg-slate-600 rounded-2xl p-4 shadow-sm">
          <View className="flex-row items-center mb-4 gap-2">
            <MaterialIcons name="note-add" size={20} color="#FBBF24" />
            <Text className="text-white text-lg font-semibold">
              Special Requests
            </Text>
          </View>

          <TextInput
            className="bg-slate-800 rounded-xl p-4 text-gray-300 text-base h-30 border border-white/10"
            placeholder="Any special requests, allergies, etc."
            placeholderTextColor="#94A3B8"
            value={observations}
            onChangeText={setObservations}
            multiline={true}
            numberOfLines={4}
            style={{ textAlignVertical: "top" }}
          />
        </View>

        {/* Price Summary Section */}
        {from && to && (
          <View className="mx-4 mt-6 bg-slate-600 rounded-2xl p-4">
            <Text className="text-white text-lg font-semibold mb-4">
              Price Summary
            </Text>

            <View className="flex-row justify-between mb-3">
              <Text className="text-gray-300 text-sm">
                {numDates} {numDates === 1 ? "date" : "dates"} × $
                {(cabin?.regularPrice - (cabin?.discount || 0)).toFixed(2)}
              </Text>
              <Text className="text-gray-300 text-sm font-medium">
                ${totalCabinPrice.toFixed(2)}
              </Text>
            </View>

            {hasBreakfast && settings?.breakfastPrice && (
              <View className="flex-row justify-between mb-3">
                <Text className="text-gray-300 text-sm">
                  Breakfast ({numGuests} {numGuests === 1 ? "guest" : "guests"}{" "}
                  × {numDates} {numDates === 1 ? "date" : "dates"})
                </Text>
                <Text className="text-gray-300 text-sm font-medium">
                  ${totalBreakfastPrice.toFixed(2)}
                </Text>
              </View>
            )}

            <View className="h-px bg-white/10 my-3" />

            <View className="flex-row justify-between mt-1">
              <Text className="text-white text-base font-semibold">Total</Text>
              <Text className="text-green-500 text-lg font-bold">
                ${totalPrice.toFixed(2)}
              </Text>
            </View>
          </View>
        )}

        {/* Reserve Button */}
        {from && to ? (
          <TouchableOpacity
            className="mx-4 mt-8 rounded-3xl overflow-hidden shadow-lg shadow-[#FBBF24]/40 elevation-8 "
            onPress={handleCreateBooking}
            disabled={isSubmitting}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={
                isSubmitting
                  ? ["#D97706", "#F59E0B", "#FBBF24"]
                  : ["#F59E0B", "#FBBF24", "#FCD34D"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="py-10 px-8 items-center justify-center min-h-[64px]"
            >
              {isSubmitting ? (
                <View className="flex-row items-center justify-center space-x-3">
                  <Ionicons name="hourglass-outline" size={22} color="#FFF" />
                  <Text className="text-white text-lg font-extrabold tracking-wide">
                    Processing Reservation...
                  </Text>
                </View>
              ) : (
                <View className="flex-row items-center justify-center space-x-3 ">
                  <Ionicons name="checkmark-circle" size={22} color="#FFF" />
                  <Text className="text-white text-lg font-extrabold tracking-wide">
                    Complete Reservation
                  </Text>
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <View className="mx-4 mt-8 flex-row items-center justify-center space-x-3 bg-gradient-to-r from-[#FBBF24]/15 via-[#FBBF24]/10 to-[#FBBF24]/15 py-6 px-8 rounded-3xl border-2 border-[#FBBF24]/40 border-dashed shadow-lg shadow-[#FBBF24]/20 min-h-[64px]">
            <View className="p-2 bg-[#FBBF24]/20 rounded-full">
              <Ionicons name="calendar-outline" size={28} color="#FBBF24" />
            </View>
            <Text className="text-[#FBBF24] text-lg font-bold tracking-wide">
              Start by selecting your dates
            </Text>
          </View>
        )}

        {/* Bottom Padding */}
        <View className="h-10" />
      </ScrollView>

      {/* Guest Selection Modal */}
      <Modal
        visible={showGuestModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowGuestModal(false)}
      >
        <View className="flex-1 bg-black/70 justify-center items-center p-5">
          <View className="w-full max-w-sm rounded-2xl overflow-hidden">
            <LinearGradient
              colors={["#334155", "#1E293B"]}
              className="max-h-96"
            >
              <View className="flex-row justify-between items-center p-5 border-b border-white/10">
                <Text className="text-white text-lg font-semibold">
                  Select Number of Guests
                </Text>
                <TouchableOpacity
                  onPress={() => setShowGuestModal(false)}
                  className="p-1"
                >
                  <Ionicons name="close" size={24} color="#E5E7EB" />
                </TouchableOpacity>
              </View>

              <ScrollView className="max-h-72">
                {Array.from({ length: maxGuests }, (_, i) => i + 1).map(
                  (guestCount) => (
                    <TouchableOpacity
                      key={guestCount}
                      className={`flex-row justify-between items-center p-4 border-b border-white/10 ${
                        numGuests === guestCount ? "bg-amber-400/10" : ""
                      }`}
                      onPress={() => handleGuestSelect(guestCount)}
                    >
                      <View className="flex-row items-center gap-3">
                        <FontAwesome5
                          name="users"
                          size={16}
                          color={
                            numGuests === guestCount ? "#FBBF24" : "#94A3B8"
                          }
                        />
                        <Text
                          className={`text-base ${
                            numGuests === guestCount
                              ? "text-amber-400 font-semibold"
                              : "text-gray-300"
                          }`}
                        >
                          {guestCount} {guestCount === 1 ? "Guest" : "Guests"}
                        </Text>
                      </View>
                      {numGuests === guestCount && (
                        <Ionicons
                          name="checkmark-circle"
                          size={20}
                          color="#FBBF24"
                        />
                      )}
                    </TouchableOpacity>
                  )
                )}
              </ScrollView>
            </LinearGradient>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}
