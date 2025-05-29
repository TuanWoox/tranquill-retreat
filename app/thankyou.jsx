import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

function ThankScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/images/aboutBackground.jpg")}
      className="flex-1"
      blurRadius={3}
      style={{ resizeMode: "cover" }}
    >
      {/* Overlay for better contrast */}
      <View className="absolute inset-0 bg-black/70" />

      <View className="flex-1 justify-center items-center px-8">
        <View className="bg-black/70 rounded-3xl px-8 py-10 items-center shadow-2xl border border-[#d2af84]/40">
          <AntDesign name="checkcircle" size={90} color="#22c55e" />
          <Text className="text-4xl font-extrabold text-[#d2af84] mt-8 mb-2 text-center drop-shadow-lg">
            Thank You!
          </Text>
          <Text className="text-lg text-white text-center mb-6 leading-relaxed">
            Your cabin booking was{" "}
            <Text className="text-[#22c55e] font-bold">successful</Text>. We
            look forward to welcoming you for a{" "}
            <Text className="text-[#d2af84] font-semibold">relaxing stay</Text>.
          </Text>
          <TouchableOpacity
            className="bg-[#d2af84] px-8 py-3 rounded-full mt-4 shadow-lg"
            activeOpacity={0.92}
            onPress={() => router.back()}
          >
            <Text className="text-black font-bold text-lg tracking-wide">
              Back to Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#d2af84] px-8 py-3 rounded-full mt-4 shadow-lg"
            activeOpacity={0.92}
            onPress={() => router.replace("/user/booking")}
          >
            <Text className="text-black font-bold text-lg tracking-wide">
              Manage Your Booking
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

export default ThankScreen;
