import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useBookings } from "@/hooks/useBookings";
import BookingList from "@/components/BookingList";
import FilterFactory from "@/patterns/factory/booking/factoryPattern";
import { BookingFilter } from "@/patterns/strategy/booking/sortStrategies";
import { FilterByAll } from "@/patterns/strategy/booking/concreateStrategies";
import BookingMagementHeader from "@/components/BookingMagementHeader";

const SORT_OPTIONS = [
  { key: "all", label: "All" },
  { key: "confirmed", label: "Confirmed" },
  { key: "checked-in", label: "Checked-in" },
  { key: "checked-out", label: "Checked-out" },
];

const filterFactory = new FilterFactory();
const filterer = new BookingFilter(FilterByAll);

const ReservationsScreen = () => {
  const router = useRouter();
  const { data: bookings, isLoading, error } = useBookings();
  const [currentFilterType, setCurrentFilterType] = useState("all");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [showSortPicker, setShowSortPicker] = useState(false);

  useEffect(() => {
    if (!isLoading && bookings) {
      try {
        const strategy = filterFactory.getFilter(currentFilterType);
        filterer.setStrategy(strategy);
        setFilteredBookings(filterer.filter(bookings));
      } catch (err) {
        console.error("Filter error:", err);
        Alert.alert("Error", "Failed to filter bookings");
      }
    }
  }, [bookings, isLoading, currentFilterType]);

  const handleFilterChange = (filterType) => {
    try {
      setCurrentFilterType(filterType);
      const strategy = filterFactory.getFilter(filterType);
      filterer.setStrategy(strategy);
      setFilteredBookings(filterer.filter(bookings));
      setShowSortPicker(false);
    } catch (error) {
      console.error("Sort change error:", error);
      Alert.alert("Error", "Failed to change sort order");
    }
  };

  const getCurrentSortLabel = () => {
    const currentOption = SORT_OPTIONS.find(
      (option) => option.key === currentFilterType
    );
    return currentOption ? currentOption.label : "All";
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-primary-200">
        <Text className="text-lg text-white">Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-primary-200">
        <Text className="text-lg text-red-400">Failed to load bookings</Text>
      </View>
    );
  }

  return (
    <>
      <BookingMagementHeader />
      {/* Filter Picker */}
      <View className="my-4 px-6">
        <Text className="text-[#d2af84] font-medium mb-2">Filter by:</Text>
        <TouchableOpacity
          onPress={() => setShowSortPicker(true)}
          className="bg-[#d2af84] px-4 py-3 rounded-lg flex-row justify-between items-center shadow"
          activeOpacity={0.9}
        >
          <Text className="text-black font-medium">
            {getCurrentSortLabel()}
          </Text>
          <AntDesign name="down" size={18} color="#181b20" />
        </TouchableOpacity>
      </View>

      {/* Filter Options Modal */}
      <Modal
        visible={showSortPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSortPicker(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/60 justify-center items-center"
          activeOpacity={1}
          onPress={() => setShowSortPicker(false)}
        >
          <View className="bg-white rounded-2xl mx-6 max-w-sm w-full shadow-2xl">
            <View className="p-4 border-b border-gray-200">
              <Text className="text-lg font-bold text-center text-gray-800">
                Filter Options
              </Text>
            </View>

            <View className="max-h-80">
              {SORT_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.key}
                  onPress={() => handleFilterChange(option.key)}
                  className={`px-4 py-3 border-b border-gray-100 ${
                    currentFilterType === option.key ? "bg-[#d2af84]/20" : ""
                  }`}
                >
                  <Text
                    className={`text-gray-800 ${
                      currentFilterType === option.key
                        ? "font-bold"
                        : "font-medium"
                    }`}
                  >
                    {option.label}
                    {currentFilterType === option.key && " ✓"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              onPress={() => setShowSortPicker(false)}
              className="p-4 border-t border-gray-200"
            >
              <Text className="text-center text-gray-600 font-medium">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Booking List or Empty State */}
      <View className="flex-1 justify-center px-5 py-6">
        {filteredBookings && filteredBookings.length > 0 ? (
          <BookingList bookings={filteredBookings} />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-slate-400 text-lg font-semibold">
              No reservations found
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

export default ReservationsScreen;
