// Spinner.js
import React from "react";
import { View, ActivityIndicator, Text } from "react-native";

const Spinner = ({ children = "Fetching The Cabins" }) => {
  return (
    <View className="flex-1 justify-center items-center mt-12">
      <ActivityIndicator size="large" color="#d2af84" />
      <Text className="text-white mt-4 text-xl">Fetching The Cabins....</Text>
    </View>
  );
};

export default Spinner;
