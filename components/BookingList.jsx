import React from "react";
import { View, FlatList, Text } from "react-native";
import BookingCard from "./BookingCard";

const BookingList = ({ bookings = [] }) => {
  if (!bookings || bookings.length === 0) {
    return (
      <View className="flex-1 justify-center items-center py-16">
        <Text className="text-slate-400 text-lg font-semibold mb-2">
          No bookings found
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      data={bookings}
      keyExtractor={(item) => item?._id?.toString() || Math.random().toString()}
      renderItem={({ item }) => <BookingCard booking={item} />}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

export default BookingList;
