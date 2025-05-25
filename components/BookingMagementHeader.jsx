import { useAuthContext } from "@/context/AuthContext";
import { Text, View } from "react-native";

function BookingMagementHeader() {
  const { user } = useAuthContext();

  if (user?.role === "admin") {
    return (
      <View className="w-full items-center mt-8 mb-6">
        <Text className="text-3xl font-extrabold text-[#d2af84] tracking-wide drop-shadow-lg mb-2">
          Admin Booking Management
        </Text>
        <View className="h-1 w-32 bg-[#d2af84] rounded-full mb-2" />
        <Text className="text-base text-white/80 italic">
          Manage all bookings for this cabin below
        </Text>
      </View>
    );
  }

  // Not admin: render Booking Management
  return (
    <View className="w-full items-center mt-8 mb-6">
      <Text className="text-3xl font-extrabold text-[#d2af84] tracking-wide drop-shadow-lg mb-2">
        Booking Management
      </Text>
      <View className="h-1 w-32 bg-[#d2af84] rounded-full mb-2" />
      <Text className="text-base text-white/80 italic">
        View your bookings for this cabin below
      </Text>
    </View>
  );
}

export default BookingMagementHeader;
