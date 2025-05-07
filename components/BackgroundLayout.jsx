import { ImageBackground, View, Text } from "react-native";
import { useState } from "react";

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
    >
      {/* Semi-transparent overlay */}
      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(20,28,36,0.7)",
        }}
      />

      {/* Content container */}
      <View style={{ flex: 1, position: "relative" }}>{children}</View>
    </ImageBackground>
  );
}
