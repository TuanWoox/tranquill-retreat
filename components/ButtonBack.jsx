import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

function ButtonBack({ children = "Back", position = "center", style }) {
  const router = useRouter();

  // Tailwind alignment classes
  const alignmentMap = {
    left: "items-start",
    center: "items-center",
    right: "items-end",
  };

  return (
    <View className={`mt-8 ${alignmentMap[position]}`} style={style}>
      <TouchableOpacity
        className="flex-row items-center bg-[#d2af84]/90 px-6 py-3 rounded-full shadow-lg"
        onPress={() => router.back()}
        activeOpacity={0.85}
      >
        <AntDesign name="arrowleft" size={20} color="#181b20" />
        <Text className="text-[#181b20] font-bold text-base ml-2">
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default ButtonBack;
