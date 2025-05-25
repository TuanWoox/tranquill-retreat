import { View, Text } from "react-native";
import { useGetBookingByCabinId } from "@/hooks/useGetBookingByCabinId";
import { useLocalSearchParams } from "expo-router";
import AdminBookingList from "@/components/AdminBookingList";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonBack from "@/components/ButtonBack";

function Bookings() {
  const { cabinId } = useLocalSearchParams();
  const { data: bookings, isLoading, error } = useGetBookingByCabinId(cabinId);

  // Admin Management Header
  const AdminHeader = () => (
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

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center py-16">
        <AdminHeader />
        <Text className="text-slate-400 text-lg font-semibold mb-2">
          Loading bookings...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center py-16">
        <AdminHeader />
        <Text className="text-red-500 text-lg font-semibold mb-2">
          Failed to load bookings
        </Text>
      </View>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <View className="flex-1 justify-center items-center py-16">
        <AdminHeader />
        <Text className="text-slate-400 text-lg font-semibold mb-2">
          No bookings found
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 ">
      <AdminHeader />

      <AdminBookingList bookings={bookings} />
    </SafeAreaView>
  );
}

export default Bookings;
