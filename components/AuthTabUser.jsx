import { useAuthContext } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useLogOut } from "@/hooks/useLogOut";
function AuthTabUser() {
  const router = useRouter();
  const logout = useLogOut();
  return (
    <View className="flex-1 items-center justify-center">
      <View className="mb-6">
        <Ionicons name="person-circle" size={80} color="white" />
      </View>
      <View className="w-72 space-y-4">
        <TouchableOpacity
          className="w-70 bg-[#d2af84] px-4 py-3 rounded-md"
          onPress={() => router.push("/user/booking")}
        >
          <Text className="text-black text-center font-semibold">
            Quản lí booking
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full bg-[#d2af84] px-4 py-3 rounded-md mt-3"
          onPress={() => router.push("/user/profile")}
        >
          <Text className="text-black text-center font-semibold">
            Chỉnh sửa thông tin
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full bg-[#d2af84] px-4 py-3 rounded-md mt-3"
          onPress={logout}
        >
          <Text className="text-black text-center font-semibold">
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AuthTabUser;
