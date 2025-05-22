import { ImageBackground, ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function About() {
  return (
    <ImageBackground
      source={require("../../assets/images/aboutBackground.jpg")}
      className="flex-1"
    >
      {/* Gradient overlay for better text contrast */}
      <SafeAreaView className="absolute inset-0 bg-black opacity-5" />

      <StatusBar style="light" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 60,
          flexGrow: 1,
        }}
      >
        {/* Header Section */}
        <View className="items-center mt-16 mb-10">
          <View className="w-16 h-1 bg-amber-400 rounded-full mb-6" />
          <Text className="text-4xl font-bold text-white tracking-tight mb-3 text-center">
            The Tranquility Retreat
          </Text>
          <Text className="text-xl font-medium text-amber-200 text-center px-4 italic">
            Your Perfect Nature Getaway
          </Text>
        </View>

        {/* Main Content Card */}
        <View className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/10 mb-10">
          <Text className="text-lg text-white leading-7 text-center mb-8">
            Discover serenity in our cozy cabins, crafted for families, couples,
            or solo travelers seeking peace. Surrounded by nature's beauty,
            enjoy comfort, warmth, and privacy in a tranquil escape.
          </Text>

          {/* Features Section */}
          <View className="space-y-6">
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
        <View className="items-center mb-8">
          <Text className="text-amber-100 text-lg italic text-center">
            "Nature is not a place to visit. It is home."
          </Text>
          <Text className="text-amber-200 mt-2">— Gary Snyder</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

// Component for feature items
function FeatureItem({ icon, title, description }) {
  return (
    <View className="flex-row space-x-4 m-2">
      <View className="w-12 h-12 rounded-full bg-amber-900/50 items-center justify-center">
        <Ionicons name={icon} size={24} color="#fcd34d" />
      </View>
      <View className="flex-1 ml-2">
        <Text className="text-amber-200 font-bold text-lg mb-1">{title}</Text>
        <Text className="text-white/80">{description}</Text>
      </View>
    </View>
  );
}
