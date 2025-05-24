import { FlatList, Text, View } from "react-native";

import AdminBookingCard from "./AdminBookingCard";

function AdminBookingList({ bookings }) {
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
