import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useGetInformation } from "@/hooks/useGetInformation";
import UpdateProfileForm from "@/components/UpdateProfileForm";

const UpdateProfileScreen = () => {
  const { userInfo, isLoading } = useGetInformation();
  const router = useRouter();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-primary-200">
        <Text className="text-lg text-white">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../../../assets/images/aboutBackground.jpg")}
        className="flex-1"
        style={{ resizeMode: "cover" }}
      >
        <View className="absolute inset-0 bg-black opacity-40" />

        {/* Back Button using Expo Router */}
        <SafeAreaView className="absolute top-2 left-2 z-20">
          <TouchableOpacity
            onPress={() => router.back()} // ✅ Go back using Expo Router
            className="bg-white/80 p-2 rounded-full"
          >
            <AntDesign name="arrowleft" size={20} color="black" />
          </TouchableOpacity>
        </SafeAreaView>

        <ScrollView className="flex-1">
          <View className="px-5 py-6">
            {userInfo.foundUser && (
              <UpdateProfileForm guest={userInfo.foundUser} />
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default UpdateProfileScreen;
