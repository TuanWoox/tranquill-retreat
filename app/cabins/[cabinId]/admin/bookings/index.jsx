import { View, Text, Alert, Modal, TouchableOpacity } from "react-native";
import { useGetBookingByCabinId } from "@/hooks/useGetBookingByCabinId";
import { useLocalSearchParams } from "expo-router";
import AdminBookingList from "@/components/AdminBookingList";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import FilterFactory from "@/patterns/factory/booking/factoryPattern";
import { BookingFilter } from "@/patterns/strategy/booking/sortStrategies";
import { FilterByAll } from "@/patterns/strategy/booking/concreateStrategies";
import { AntDesign } from "@expo/vector-icons";
import BookingMagementHeader from "@/components/BookingMagementHeader";
import NotFoundCard from "@/components/NotFoundCard";

const SORT_OPTIONS = [
  { key: "all", label: "All" },
  { key: "confirmed", label: "Confirmed" },
  { key: "checked-in", label: "Checked-in" },
];

const filterFactory = new FilterFactory();
const filterer = new BookingFilter(FilterByAll);

function Bookings() {
  const { cabinId } = useLocalSearchParams();
  const { data: bookings, isLoading, error } = useGetBookingByCabinId(cabinId);
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
      <View className="flex-1 justify-center items-center py-16">
        <BookingMagementHeader />
        <Text className="text-slate-400 text-lg font-semibold mb-2">
          Loading bookings...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center py-16">
        <BookingMagementHeader />
        <Text className="text-red-500 text-lg font-semibold mb-2">
          Failed to load bookings
        </Text>
      </View>
    );
  }

  if (!bookings) {
    return (
      <View className="flex-1 justify-center items-center py-16">
        <BookingMagementHeader />
        <NotFoundCard
          title="Failed to Load Bookings"
          message="There was a problem loading the bookings for this cabin."
          suggestion="Please try again later."
          icon="calendar"
          iconColor="#eab308"
          error={error}
        />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 ">
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

      {/* Booking List with header */}
      {filteredBookings.length > 0 ? (
        <AdminBookingList
          bookings={filteredBookings}
          ListHeaderComponent={<BookingMagementHeader />}
          contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 24 }}
        />
      ) : (
        <NotFoundCard
          title="No Booking Found"
          message="There is no booking matching the filter now"
          suggestion="Please try again later."
          icon="calendar"
          iconColor="#eab308"
          error={error}
        />
      )}
    </SafeAreaView>
  );
}

export default Bookings;
