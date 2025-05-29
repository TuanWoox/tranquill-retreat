import React from "react";
import { View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

function NotFoundCard({
  icon = "frowno",
  iconColor = "#eab308",
  title = "Not Found",
  message = "Sorry, we couldn't find what you're looking for.",
  suggestion = "Please check the link or try again later.",
  error,
}) {
  return (
    <View className="items-center bg-black/70 rounded-3xl px-8 py-10 shadow-2xl border border-[#d2af84]/40 m-auto">
      <AntDesign name={icon} size={64} color={iconColor} />
      <Text className="text-3xl font-extrabold text-[#d2af84] mt-6 mb-2 text-center drop-shadow-lg">
        {title}
      </Text>
      <Text className="text-base text-white text-center mb-4">
        {error ? error.message : message}
      </Text>
      <Text className="text-[#d2af84] text-center mb-2">{suggestion}</Text>
    </View>
  );
}

export default NotFoundCard;
