import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import TextExpander from "@/components/TextExpander";

const { width } = Dimensions.get("window");
const IMAGE_URL = process.env.EXPO_PUBLIC_BACKEND_URL_IMAGE;

function CabinHero({ cabin }) {
  const { name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  const discountedPrice = discount > 0 ? regularPrice - discount : null;

  return (
    <View className="flex-1 items-center my-4">
      <View
        className="rounded-3xl overflow-hidden bg-white shadow-md"
        style={{ width: width - 32, height: 380, elevation: 15 }}
      >
        <Image
          source={{
            uri:
              image && !image.includes(".co")
                ? `${IMAGE_URL}/${image}`
                : image || "fallback-image-url",
          }}
          className="absolute inset-0"
          style={{ resizeMode: "cover" }}
          blurRadius={1}
        />
        <View className="absolute inset-0 bg-black/50" />

        <View className="flex-1 justify-end p-5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-extrabold text-yellow-400 max-w-[70%]">
              {name}
            </Text>
            <View className="flex-row items-center bg-white/20 px-2.5 py-1.5 rounded-full">
              <FontAwesome5 name="users" size={16} color="#FBBF24" />
              <Text className="text-yellow-400 ml-2 text-sm font-semibold">
                {maxCapacity} Guests
              </Text>
            </View>
          </View>

          <View className="bg-black/50 rounded-2xl p-4">
            <TextExpander
              style={{
                color: "white",
                fontSize: 15,
                marginBottom: 16,
                lineHeight: 24,
              }}
              buttonTextStyle={{ color: "#FBBF24" }} // Optional: yellow "Show more"
            >
              {description}
            </TextExpander>

            <View className="flex-row items-baseline justify-start">
              {discountedPrice ? (
                <View className="flex-row items-baseline">
                  <Text className="text-[26px] font-extrabold text-emerald-500 mr-2">
                    ${discountedPrice}
                  </Text>
                  <Text className="text-lg text-gray-200 line-through mr-2">
                    ${regularPrice}
                  </Text>
                </View>
              ) : (
                <Text className="text-[26px] font-extrabold text-emerald-500 mr-2">
                  ${regularPrice}
                </Text>
              )}
              <Text className="text-gray-100 text-sm mb-0.5">/ night</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default CabinHero;
