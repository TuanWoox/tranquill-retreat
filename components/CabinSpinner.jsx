import React from "react";
import { ActivityIndicator, Text, View, Image } from "react-native";
import BackgroundLayout from "./BackgroundLayout";

const CabinSpinner = () => {
  return (
    <BackgroundLayout>
      <View className="flex-1 justify-center items-center">
        <View className="bg-black/70 p-8 rounded-2xl items-center shadow-2xl border border-[#d2af84]/40">
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 90, height: 90, marginBottom: 18 }}
            resizeMode="contain"
          />
          <ActivityIndicator
            size="large"
            color="#d2af84"
            style={{ marginBottom: 12 }}
          />
          <Text className="text-[#d2af84] text-xl font-bold mb-1 text-center drop-shadow-lg">
            Please wait...
          </Text>
        </View>
      </View>
    </BackgroundLayout>
  );
};

export default CabinSpinner;
