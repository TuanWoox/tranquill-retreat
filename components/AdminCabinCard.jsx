import React from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useDeleteCabin } from "@/hooks/useDeleteCabin";
import { useDuplicateCabin } from "@/hooks/useDuplicateCabin";
import { useRouter } from "expo-router";
const IMAGE_URL = process.env.EXPO_PUBLIC_BACKEND_URL_IMAGE;

const AdminCabinCard = ({ cabin, onDelete, onEdit }) => {
  const { _id: id, name, maxCapacity, regularPrice, discount, image } = cabin;
  const router = useRouter();
  const { deleteCabinFn, isLoading, error } = useDeleteCabin();
  const {
    duplicateCabinFn,
    isLoading: isDuplicating,
    error: isDuplicateError,
  } = useDuplicateCabin();

  const handleDelete = () => {
    Alert.alert("Delete Cabin", `Are you sure you want to delete ${name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => deleteCabinFn(id),
        style: "destructive",
      },
    ]);
  };

  return (
    <View className="bg-black/70 rounded-2xl overflow-hidden border border-[#d2af84]/40 my-4 shadow-2xl">
      {/* Touchable area for navigation */}
      <TouchableOpacity
        className="flex-row"
        activeOpacity={0.92}
        onPress={() => {
          router.navigate(`/cabins/${id}/admin/bookings`);
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
            {name}
          </Text>
          <View className="flex-row items-center mb-2">
            <FontAwesome name="users" size={18} color="#d2af84" />
            <Text className="font-semibold text-white ml-2">
              {maxCapacity} guests
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
            <Feather name="edit-2" size={16} color="#d2af84" />
            <Text className="text-xs text-white/70">Tap card for bookings</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Action Buttons - Horizontal at bottom */}
      <View className="flex-row justify-center items-center gap-3 px-4 pb-4">
        <TouchableOpacity
          className="bg-[#d2af84] px-4 py-2 rounded-full flex-1 shadow"
          onPress={() => {
            router.navigate(`/cabins/${id}/admin/edit`);
          }}
        >
          <Text className="text-black font-bold text-center">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#d2af84]/90 px-4 py-2 rounded-full flex-1 shadow"
          onPress={() => {
            duplicateCabinFn(id);
          }}
        >
          <Text className="text-black font-bold text-center">
            {isDuplicating ? "Duplicating..." : "Duplicate"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-500 px-4 py-2 rounded-full flex-1 shadow"
          onPress={handleDelete}
        >
          <Text className="text-white font-bold text-center">
            {isLoading ? "Deleting..." : "Delete"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminCabinCard;
