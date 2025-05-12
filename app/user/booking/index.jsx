import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useBookings } from "@/hooks/useBookings";
import BookingList from "@/components/BookingList";

const ReservationsScreen = () => {
  const router = useRouter();
  const { data: bookings, isLoading, error } = useBookings();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-primary-200">
        <Text className="text-lg text-white">Loading...</Text>
      </View>
    );
  }

  const navigateToCabins = () => {
    router.replace("/"); // Replace current screen with home screen
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../../../assets/images/aboutBackground.jpg")}
        className="flex-1"
        style={{ resizeMode: "cover" }}
      >
        <View className="absolute inset-0 bg-black opacity-40" />

        {/* Back Button */}
        <SafeAreaView className="absolute top-2 left-2 z-20">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-white/80 p-2 rounded-full max-w-10"
          >
            <AntDesign name="arrowleft" size={20} color="black" />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Content Area */}
        <View className="flex-1 justify-center px-5 py-6 mt-20">
          {/* Conditional rendering of reservations or the no reservations message */}
          {!bookings || bookings.length === 0 ? (
            <View className="flex-1">
              <View className="flex-1" />
              <View className="items-center">
                <Text className="text-lg text-white text-center mb-4">
                  You have no reservations yet. Check out our{" "}
                  <Text
                    className="underline text-accent-500"
                    onPress={navigateToCabins}
                  >
                    luxury cabins →
                  </Text>
                </Text>
              </View>
            </View>
          ) : (
            <BookingList bookings={bookings} />
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default ReservationsScreen;
