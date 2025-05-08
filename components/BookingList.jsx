import { View, FlatList } from "react-native";
import BookingCard from "./BookingCard";

const BookingList = ({ bookings }) => {
  return (
    <FlatList
      data={bookings}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => <BookingCard booking={item} />}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

export default BookingList;
