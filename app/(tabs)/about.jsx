import { ImageBackground, ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function About() {
  return (
    <ImageBackground
      source={require("../../assets/images/aboutBackground.jpg")}
      className="flex-1"
      blurRadius={2}
    >
      {/* Overlay for better contrast */}
      <View className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

      <StatusBar style="light" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 80,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View className="items-center mt-10 mb-12">
          <View className="w-20 h-1 bg-amber-400 rounded-full mb-6" />
          <Text className="text-5xl font-extrabold text-white tracking-tight mb-3 text-center drop-shadow-lg">
            The Tranquility Retreat
          </Text>
          <Text className="text-2xl font-semibold text-amber-200 text-center px-4 italic drop-shadow">
            Your Perfect Nature Getaway
          </Text>
        </View>

        {/* Main Content Card */}
        <View className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 mb-12">
          <Text className="text-xl text-white leading-8 text-center mb-8 font-medium">
            Discover serenity in our cozy cabins, crafted for families, couples,
            or solo travelers seeking peace. Surrounded by nature's beauty,
            enjoy comfort, warmth, and privacy in a tranquil escape.
          </Text>

          {/* Features Section */}
          <View className="space-y-8">
            <FeatureItem
              icon="leaf"
              title="Eco-Friendly Design"
              description="Our cabins are built sustainably with local materials to minimize environmental impact."
            />

            <FeatureItem
              icon="water"
              title="Natural Surroundings"
              description="Located near streams, forests, and wildlife for a truly immersive nature experience."
            />

            <FeatureItem
              icon="bed"
              title="Premium Comfort"
              description="Handcrafted furniture, luxury bedding, and modern amenities for a comfortable stay."
            />
          </View>
        </View>

        {/* Quote Section */}
        <View className="items-center mb-10">
          <Ionicons
            name="sparkles"
            size={32}
            color="#fcd34d"
            className="mb-2"
          />
          <Text className="text-amber-100 text-xl italic text-center font-medium">
            "Nature is not a place to visit. It is home."
          </Text>
          <Text className="text-amber-200 mt-2 font-semibold">
            — Gary Snyder
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

// Component for feature items
function FeatureItem({ icon, title, description }) {
  return (
    <View className="flex-row space-x-4 m-2 items-center">
      <View className="w-14 h-14 rounded-full bg-amber-900/60 items-center justify-center shadow-lg">
        <Ionicons name={icon} size={28} color="#fcd34d" />
      </View>
      <View className="flex-1 ml-2">
        <Text className="text-amber-200 font-extrabold text-lg mb-1">
          {title}
        </Text>
        <Text className="text-white/90 text-base">{description}</Text>
      </View>
    </View>
  );
}
