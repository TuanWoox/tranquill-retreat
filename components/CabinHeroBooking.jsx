import { MaterialIcons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";
const IMAGE_URL = process.env.EXPO_PUBLIC_BACKEND_URL_IMAGE;
function CabinHeroBooking({ cabin }) {
  return (
    <View className="mb-5">
      <View className="h-48 rounded-2xl overflow-hidden relative">
        <Image
          source={{
            uri:
              cabin?.image && !cabin.image.includes(".co")
                ? `${IMAGE_URL}/${cabin.image}`
                : cabin.image || "https://via.placeholder.com/400x200",
          }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <MaterialIcons name="cabin" size={24} color="#d2af84" />
              <Text className="text-[#d2af84] text-lg font-bold ml-2">
                {cabin?.name}
              </Text>
            </View>
            <Text className="text-white text-sm">
              Max: {cabin?.maxCapacity} guests
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default CabinHeroBooking;
