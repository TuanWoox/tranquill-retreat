import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

function SpecialRequestSection({ observations }) {
  if (!observations) return null;

  return (
    <View className="bg-[#23272f]/95 rounded-2xl mb-4 border border-[#d2af84]/30">
      <View className="flex-row items-center p-4 border-b border-[#d2af84]/20">
        <Feather name="message-square" size={18} color="#d2af84" />
        <Text className="text-[#d2af84] text-base font-bold ml-2">
          Special Requests
        </Text>
      </View>
      <View className="p-4">
        <Text className="text-white text-base leading-6 italic">
          "{observations}"
        </Text>
      </View>
    </View>
  );
}

export default SpecialRequestSection;
