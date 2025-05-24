import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { format, formatDistance, isToday, parseISO } from "date-fns";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
const IMAGE_URL = process.env.EXPO_PUBLIC_BACKEND_URL_IMAGE;

const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

const CARD_HEIGHT = 150;

const statusMap = {
  Upcoming: { color: "#22c55e", icon: "calendar-check" },
  "In Progress": { color: "#3b82f6", icon: "progress-clock" },
  Past: { color: "#eab308", icon: "history" },
};

const BookingCard = ({ booking }) => {
  const {
    _id,
    startDate,
    endDate,
    numDates,
    totalPrice,
    numGuests,
    createdAt,
    status,
    cabin,
  } = booking;
  const router = useRouter();

  // Status logic
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  let bookingStatus = "";
  if (now < start) {
    bookingStatus = "Upcoming";
  } else if (now > end) {
    bookingStatus = "Past";
  } else {
    bookingStatus = "In Progress";
  }
  const { color: badgeColor, icon: badgeIcon } = statusMap[bookingStatus];

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={() => router.push(`/user/booking/${_id}`)}
      className="rounded-2xl shadow-xl border border-[#d2af84] mb-6 overflow-hidden flex-row"
      style={{
        backgroundColor: "#23272f",
        height: CARD_HEIGHT,
        elevation: 6,
      }}
    >
      {/* Image */}
      <View style={{ width: 110, height: "100%", position: "relative" }}>
        <Image
          source={{
            uri:
              cabin.image && !cabin.image.includes(".co")
                ? `${IMAGE_URL}/${cabin.image}`
                : cabin.image || "fallback-image-url",
          }}
          style={{
            width: 110,
            height: "100%",
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          }}
          resizeMode="cover"
        />
        {/* Overlay for readability */}
        <View style={StyleSheet.absoluteFill} className="bg-black/10" />
        {/* Cabin name overlay */}
        <View className="absolute bottom-0 left-0 right-0 bg-[#23272f]/90 px-2 py-1 flex-row items-center rounded-bl-2xl">
          <MaterialCommunityIcons
            name="home-variant"
            size={14}
            color="#d2af84"
          />
          <Text
            numberOfLines={1}
            className="text-[#d2af84] font-bold text-xs ml-1"
            style={{ maxWidth: 90 }}
          >
            {cabin.name}
          </Text>
        </View>
      </View>

      {/* Info Section */}
      <View className="flex-1 py-3 px-4 justify-between min-w-0">
        {/* Top Row: Nights & Status */}
        <View className="flex-row items-center justify-between mb-1">
          <Text
            className="text-lg font-bold text-[#d2af84] flex-1"
            numberOfLines={1}
          >
            <MaterialCommunityIcons
              name="moon-waning-crescent"
              size={16}
              color="#d2af84"
            />{" "}
            {numDates} date{numDates > 1 ? "s" : ""}
          </Text>
          <View
            className="px-3 py-1 rounded-full flex-row items-center ml-2"
            style={{ backgroundColor: badgeColor }}
          >
            <MaterialCommunityIcons name={badgeIcon} size={14} color="#fff" />
            <Text className="text-xs font-bold uppercase text-white ml-1">
              {bookingStatus}
            </Text>
          </View>
        </View>

        {/* Dates */}
        <View className="flex-row items-center mt-1 flex-1 min-w-0">
          <AntDesign name="calendar" size={16} color="#d2af84" />
          <Text
            className="text-sm text-gray-200 ml-2 flex-shrink"
            numberOfLines={2}
            style={{
              flexShrink: 1,
              flexWrap: "wrap",
            }}
          >
            {format(new Date(startDate), "MMM dd")}
            {isToday(new Date(startDate))
              ? " (Today)"
              : ` (${formatDistanceFromNow(startDate)})`}
            {"  "}→ {format(new Date(endDate), "MMM dd yyyy")}
          </Text>
        </View>

        {/* Price and Guests */}
        <View className="flex-row items-center mt-2">
          <FontAwesome name="user" size={15} color="#d2af84" />
          <Text className="ml-2 text-gray-200">
            {numGuests} guest{numGuests > 1 ? "s" : ""}
          </Text>
          <Text className="mx-2 text-gray-400">|</Text>
          <AntDesign name="creditcard" size={15} color="#d2af84" />
          <Text className="ml-2 text-[#d2af84] font-bold text-base">
            ${totalPrice}
          </Text>
          <Text className="ml-1 text-gray-400 text-xs">/total</Text>
        </View>

        {/* Booking Time */}
        <Text className="text-xs text-gray-400 mt-2" numberOfLines={1}>
          Booked on {format(new Date(createdAt), "MMM dd yyyy")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BookingCard;
