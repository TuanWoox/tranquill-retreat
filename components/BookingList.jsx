import React from "react";
import { View, FlatList, Text } from "react-native";
import BookingCard from "./BookingCard";

const BookingList = ({ bookings = [] }) => {
  if (!bookings || bookings.length === 0) {
    return (
      <View style={{ padding: 24, alignItems: "center" }}>
        <Text style={{ color: "#E5E7EB", fontSize: 16 }}>
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
