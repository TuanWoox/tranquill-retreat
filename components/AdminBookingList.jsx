import { FlatList, Text, View } from "react-native";
import AdminBookingCard from "./AdminBookingCard";

function AdminBookingList({ bookings }) {
  if (!bookings || bookings.length === 0) {
    return (
      <View className="flex-1 justify-center items-center py-16">
        <Text className="text-slate-400 text-lg font-semibold">
          No bookings found
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={bookings}
      keyExtractor={(item) => item?._id?.toString() || Math.random().toString()}
      renderItem={({ item }) => <AdminBookingCard booking={item} />}
      contentContainerStyle={{ padding: 16, gap: 16 }}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default AdminBookingList;
