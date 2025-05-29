import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Spinner = ({ children = "Fetching The Cabins" }) => {
  return (
    <View className="flex-1 justify-center items-center mt-12">
      <View className="bg-black/70 p-8 rounded-2xl items-center shadow-2xl border border-[#d2af84]/40">
        <ActivityIndicator
          size="large"
          color="#d2af84"
          style={{ marginBottom: 12 }}
        />
        <Text className="text-[#d2af84] text-xl font-bold mb-1 text-center drop-shadow-lg">
          Please wait...
        </Text>
        <Text className="text-white text-base text-center opacity-80">
          {children}
        </Text>
      </View>
    </View>
  );
};

export default Spinner;
