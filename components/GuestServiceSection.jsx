import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

function GuestServiceSection({ numGuests, hasBreakfast }) {
  return (
    <View className="bg-[#23272f]/95 rounded-2xl mb-4 border border-[#d2af84]/30">
      <View className="flex-row items-center p-4 border-b border-[#d2af84]/20">
        <FontAwesome name="users" size={18} color="#d2af84" />
        <Text className="text-[#d2af84] text-base font-bold ml-2">
          Guest & Services
        </Text>
      </View>
      <View className="p-4">
        <View className="flex-row justify-between items-center py-3 border-b border-[#d2af84]/10">
          <View className="flex-row items-center">
            <FontAwesome name="user" size={16} color="#94a3b8" />
            <Text className="text-white text-base ml-2">Guests</Text>
          </View>
          <Text className="text-[#d2af84] text-base font-bold">
            {numGuests}
          </Text>
        </View>
        <View className="flex-row justify-between items-center py-3">
          <View className="flex-row items-center">
            <MaterialIcons name="free-breakfast" size={18} color="#94a3b8" />
            <Text className="text-white text-base ml-2">Breakfast</Text>
          </View>
          <View
            className={`px-3 py-1 rounded-full ${
              hasBreakfast ? "bg-[#10b981]" : "bg-[#64748b]"
            }`}
          >
            <Text className="text-white text-xs font-semibold">
              {hasBreakfast ? "Included" : "Not included"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default GuestServiceSection;
