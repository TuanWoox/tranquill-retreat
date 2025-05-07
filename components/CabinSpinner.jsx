import React from "react";
import { ActivityIndicator, Text, View, Image } from "react-native";

const CabinSpinner = () => {
  return (
    <View className="flex-1 bg-[#4B3F30] justify-center items-center">
      <Image
        source={require("../assets/images/logoload.jpg")} // Optional logo/image
        style={{ width: 100, height: 100, marginBottom: 20 }}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#D2AF84" />
      <Text className="text-[#D2AF84] mt-4 text-lg font-semibold">
        Đang tải dữ liệu...
      </Text>
    </View>
  );
};

export default CabinSpinner;
