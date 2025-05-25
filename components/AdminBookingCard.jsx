import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

const AdminBookingCard = ({ booking }) => {
  if (!booking) return null;
  const router = useRouter();
  const { cabinId } = useLocalSearchParams();
  const {
    _id,
    startDate,
    endDate,
    numGuests,
    status,
    cabin,
    user,
    totalPrice,
    createdAt,
  } = booking;

  // Only allow these statuses
  const statusMap = {
    confirmed: { color: "#10B981", icon: "checkmark-circle" },
    "checked-in": { color: "#3b82f6", icon: "log-in-outline" },
    "checked-out": { color: "#64748b", icon: "log-out-outline" },
  };
  const statusKey = status?.toLowerCase();
  const statusInfo =
    statusKey && statusMap[statusKey]
      ? statusMap[statusKey]
      : { color: "#FBBF24", icon: "help-circle" };

  return (
    <TouchableOpacity
      activeOpacity={0.94}
      className="bg-[#23272e] rounded-2xl p-5 shadow-xl border-2 border-[#FBBF24]/30 mb-4"
      onPress={() => router.push(`/cabins/${cabinId}/admin/bookings/${_id}`)}
    >
      {/* Top: Booking & Status */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-[#FBBF24] font-extrabold text-lg tracking-widest">
          #{_id?.slice(-6).toUpperCase() || "BOOKING"}
        </Text>
        <View className="flex-row items-center space-x-2">
          <Ionicons name={statusInfo.icon} size={22} color={statusInfo.color} />
          <Text
            className="font-bold text-xs uppercase"
            style={{ color: statusInfo.color, letterSpacing: 1.5 }}
          >
            {statusKey ? status.replace("-", " ").toUpperCase() : "UNKNOWN"}
          </Text>
        </View>
      </View>

      {/* Guest Info */}
      <View className="mb-2">
        <View className="flex-row items-center mb-1">
          <FontAwesome5 name="user" size={15} color="#FBBF24" />
          <Text className="ml-2 text-white font-semibold text-base">
            {user?.fullName || "No name"}
          </Text>
        </View>
        <View className="flex-row items-center mb-1">
          <Ionicons name="mail-outline" size={15} color="#FBBF24" />
          <Text className="ml-2 text-slate-200 font-medium text-base">
            {user?.email || "No email"}
          </Text>
        </View>
        {user?.phoneNumber && (
          <View className="flex-row items-center">
            <Ionicons name="call-outline" size={15} color="#FBBF24" />
            <Text className="ml-2 text-slate-400 font-medium text-base">
              {user.phoneNumber}
            </Text>
          </View>
        )}
      </View>

      {/* Cabin */}
      <View className="flex-row items-center mb-2">
        <Ionicons name="home-outline" size={16} color="#FBBF24" />
        <Text className="ml-2 text-slate-200 font-semibold text-base">
          {cabin?.name || "Cabin"}
        </Text>
      </View>

      {/* Dates & Guests */}
      <View className="flex-row items-center mb-2">
        <Ionicons name="calendar-outline" size={16} color="#FBBF24" />
        <Text className="ml-2 text-slate-200 font-medium">
          {startDate?.slice(0, 10)} → {endDate?.slice(0, 10)}
        </Text>
        <View className="flex-row items-center ml-4">
          <FontAwesome5 name="users" size={14} color="#FBBF24" />
          <Text className="ml-1 text-slate-400 font-medium">
            {numGuests} {numGuests === 1 ? "guest" : "guests"}
          </Text>
        </View>
      </View>

      {/* Price & Created */}
      <View className="flex-row items-center justify-between mt-4">
        <Text className="text-green-400 font-extrabold text-xl">
          ${totalPrice?.toFixed(2) || "0.00"}
        </Text>
        <Text className="text-xs text-slate-500 italic">
          Created: {createdAt?.slice(0, 10)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AdminBookingCard;
