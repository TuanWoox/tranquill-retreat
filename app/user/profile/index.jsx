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
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-lg text-[#d2af84] font-semibold">Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingVertical: 40,
          paddingHorizontal: 20,
          minHeight: "100%",
          justifyContent: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full max-w-xl mx-auto bg-black/70 border border-[#d2af84]/30 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
          <Text className="text-3xl font-extrabold text-[#d2af84] mb-6 text-center tracking-wide drop-shadow-lg">
            Update Profile
          </Text>
          {userInfo && <UpdateProfileForm guest={userInfo} />}
        </View>
      </ScrollView>
    </>
  );
};

export default UpdateProfileScreen;
