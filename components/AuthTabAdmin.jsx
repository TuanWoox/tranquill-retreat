import { useAuthContext } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useLogOut } from "@/hooks/useLogOut";
import ButtonAuthTab from "./ButtonAuthTab";
function AuthTabAdmin() {
  const router = useRouter();
  const logout = useLogOut();
  return (
    <View className="flex-1 items-center justify-center">
      <View className="mb-6">
        <Ionicons name="person-circle" size={80} color="white" />
      </View>
      <View className="w-72 space-y-4">
        <ButtonAuthTab handlePress={() => router.push("/admin/settingAdjust")}>
          Adjust App Setting
        </ButtonAuthTab>
        <ButtonAuthTab handlePress={() => router.push("/user/profile")}>
          Manage Personal Information
        </ButtonAuthTab>
        <ButtonAuthTab handlePress={logout}>Logout</ButtonAuthTab>
      </View>
    </View>
  );
}

export default AuthTabAdmin;
