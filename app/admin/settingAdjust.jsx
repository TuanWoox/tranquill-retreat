import {
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useGetSetting } from "@/hooks/useGetSetting";
import Spinner from "@/components/Spinner";
import UpdateSettingForm from "@/components/UpdateSettingForm";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

function SettingAdjust() {
  const { data, isLoading, error } = useGetSetting();

  if (isLoading)
    return (
      <Spinner>
        <Text className="text-black">Fetching the setting...</Text>
      </Spinner>
    );

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../../assets/images/aboutBackground.jpg")}
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
            {data && <UpdateSettingForm setting={data} />}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

export default SettingAdjust;
