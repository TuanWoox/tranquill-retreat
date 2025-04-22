import { ImageBackground, ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function About() {
  return (
    <ImageBackground
      source={require("../../assets/images/aboutBackground.jpg")}
      className="flex-1"
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 40,
          backgroundColor: "rgba(20, 28, 36, 0.6)", // Semi-transparent overlay
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatusBar style="light" />
        <View className="items-center mb-8 mt-12">
          <Text className="text-4xl font-bold text-white tracking-tight mb-4 shadow-md">
            The Tranquility Retreat
          </Text>
          <Text className="text-xl font-medium text-white/90 text-center px-4">
            Your Perfect Nature Getaway
          </Text>
        </View>
        <View className="bg-white/10 rounded-xl p-6 shadow-lg">
          <Text className="text-lg text-white/85 leading-7 text-center">
            Discover serenity in our cozy cabins, crafted for families, couples,
            or solo travelers seeking peace. Surrounded by nature’s beauty,
            enjoy comfort, warmth, and privacy in a tranquil escape.
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
