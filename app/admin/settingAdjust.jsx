import {
  Text,
  View,
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

  if (isLoading) {
    return (
      <Spinner>
        <Text className="text-black text-lg font-semibold">
          Fetching your settings...
        </Text>
      </Spinner>
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
      >
        <View className="bg-black/70 border border-[#d2af84]/30 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
          <Text className="text-3xl text-center font-extrabold text-[#d2af84] mb-6 tracking-wide drop-shadow-lg">
            Admin Settings
          </Text>

          {data ? (
            <UpdateSettingForm setting={data} />
          ) : (
            <Text className="text-[#d2af84] text-center">
              Unable to load settings.
            </Text>
          )}
        </View>
      </ScrollView>
    </>
  );
}

export default SettingAdjust;
