import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "react-native";

function GuestInfoSection({ user }) {
  return (
    <View className="bg-[#23272f]/95 rounded-2xl mb-4 border border-[#d2af84]/30">
      <View className="flex-row items-center p-4 border-b border-[#d2af84]/20">
        <FontAwesome name="user-circle" size={20} color="#d2af84" />
        <Text className="text-[#d2af84] text-base font-bold ml-2">
          Guest Information
        </Text>
      </View>
      <View className="p-4">
        <View className="flex-row justify-between items-center py-2">
          <Text className="text-[#94a3b8] text-sm">Full Name:</Text>
          <Text className="text-white text-base font-medium">
            {user?.fullName}
          </Text>
        </View>
        <View className="flex-row justify-between items-center py-2">
          <Text className="text-[#94a3b8] text-sm">Email:</Text>
          <Text className="text-white text-base font-medium">
            {user?.email || "N/A"}
          </Text>
        </View>
        <View className="flex-row justify-between items-center py-2">
          <Text className="text-[#94a3b8] text-sm">Phone:</Text>
          <Text className="text-white text-base font-medium">
            {user?.phoneNumber || "N/A"}
          </Text>
        </View>
        {user?.nationalId && (
          <View className="flex-row justify-between items-center py-2">
            <Text className="text-[#94a3b8] text-sm">National ID:</Text>
            <Text className="text-white text-base font-medium">
              {user.nationalId}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default GuestInfoSection;
