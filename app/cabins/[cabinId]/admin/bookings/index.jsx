import { View, Text } from "react-native";
import { useGetBookingByCabinId } from "@/hooks/useGetBookingByCabinId";
import { useLocalSearchParams } from "expo-router";
import AdminBookingList from "@/components/AdminBookingList";

function Bookings() {
  const { cabinId } = useLocalSearchParams();
  const { data: bookings, isLoading, error } = useGetBookingByCabinId(cabinId);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center py-16">
        <Text className="text-slate-400 text-lg font-semibold mb-2">
          Loading bookings...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center py-16">
        <Text className="text-red-500 text-lg font-semibold mb-2">
          Failed to load bookings
        </Text>
      </View>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <View className="flex-1 justify-center items-center py-16">
        <Text className="text-slate-400 text-lg font-semibold mb-2">
          No bookings found
        </Text>
      </View>
    );
  }

  return <AdminBookingList bookings={bookings} />;
}

export default Bookings;
