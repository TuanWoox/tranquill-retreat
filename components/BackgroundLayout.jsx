import { ImageBackground, View, Text } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BackgroundLayout({ children }) {
  return (
    <ImageBackground
      source={require("../assets/images/aboutBackground.jpg")}
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
      }}
      resizeMode="cover"
      blurRadius={3}
    >
      {/* Semi-transparent overlay */}
      <SafeAreaView className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

      {/* Content container */}
      <SafeAreaView style={{ flex: 1, position: "relative" }}>
        {children}
      </SafeAreaView>
    </ImageBackground>
  );
}
