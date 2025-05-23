import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const IMAGE_URL = process.env.EXPO_PUBLIC_BACKEND_URL_IMAGE;
import { useRouter } from "expo-router";

const CabinCard = ({ cabin }) => {
  const { _id, name, maxCapacity, regularPrice, discount, image } = cabin;
  const router = useRouter();
  return (
    <View className="flex-row bg-[#72716e] rounded-xl overflow-hidden border border-[#524d4d] my-4 shadow-lg">
      {/* Left: Image Section */}
      <View className="w-40 h-40">
        <Image
          source={{
            uri:
              image && !image.includes(".co")
                ? `${IMAGE_URL}/${image}`
                : image || "fallback-image-url",
          }}
          className="w-full h-full rounded-xl"
          resizeMode="cover"
        />
      </View>

      {/* Right: Info Section */}
      <View className="flex-1 p-3">
        <Text className="text-yellow-600 font-bold text-base">
          Cabin {name}
        </Text>

        <Text className="text-white my-1 flex-row items-center">
          <FontAwesome name="users" size={18} color="#d2af84" />
          <Text className="font-bold ml-3"> {maxCapacity} guests</Text>
        </Text>

        <View className="flex-row items-baseline mt-auto">
          {discount > 0 ? (
            <>
              <Text className="text-2xl font-bold text-[#d2af84]">
                ${regularPrice - discount}
              </Text>
              <Text className="ml-2 line-through text-white text-sm">
                ${regularPrice}
              </Text>
            </>
          ) : (
            <Text className="text-2xl font-bold text-[#d2af84]">
              ${regularPrice}
            </Text>
          )}
          <Text className="text-white text-sm ml-1">/ night</Text>
        </View>

        <TouchableOpacity
          className="bg-[#d2af84] px-3 py-1 rounded-lg self-end mt-2"
          onPress={() => {
            router.navigate(`/cabins/${_id}`);
          }}
        >
          <Text className="text-[#312e2b] font-medium">Reserve →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CabinCard;
