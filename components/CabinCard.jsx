import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
const IMAGE_URL = process.env.EXPO_PUBLIC_BACKEND_URL_IMAGE;
import { useRouter } from "expo-router";

const CabinCard = ({ cabin }) => {
  const { _id, name, maxCapacity, regularPrice, discount, image } = cabin;
  const router = useRouter();

  return (
    <View className="bg-black/70 rounded-2xl overflow-hidden border border-[#d2af84]/40 my-4 shadow-2xl">
      {/* Touchable area for navigation */}
      <TouchableOpacity
        className="flex-row"
        activeOpacity={0.92}
        onPress={() => {
          router.navigate(`/cabins/${_id}`);
        }}
      >
        {/* Left: Image Section */}
        <View className="w-36 h-36 m-4 rounded-xl overflow-hidden border-2 border-[#d2af84]/60 shadow-lg">
          <Image
            source={{
              uri:
                image && !image.includes(".co")
                  ? `${IMAGE_URL}/${image}`
                  : image || "fallback-image-url",
            }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* Right: Info Section */}
        <View className="flex-1 py-4 pr-4">
          <Text className="text-[#d2af84] font-extrabold text-xl mb-1 tracking-wide">
            Cabin {name}
          </Text>
          <View className="flex-row items-center mb-2">
            <FontAwesome name="users" size={18} color="#d2af84" />
            <Text className="font-semibold text-white ml-2">
              {maxCapacity} guest{maxCapacity > 1 ? "s" : ""}
            </Text>
          </View>
          <View className="flex-row items-baseline mb-2">
            {discount > 0 ? (
              <>
                <Text className="text-2xl font-bold text-[#d2af84]">
                  ${regularPrice - discount}
                </Text>
                <Text className="ml-2 line-through text-white text-base">
                  ${regularPrice}
                </Text>
              </>
            ) : (
              <Text className="text-2xl font-bold text-[#d2af84]">
                ${regularPrice}
              </Text>
            )}
            <Text className="text-white text-base ml-1">/ night</Text>
          </View>
          <View className="flex-row items-center gap-2 mt-2">
            <Feather name="arrow-right" size={16} color="#d2af84" />
            <Text className="text-xs text-white/70">Tap to reserve</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CabinCard;
