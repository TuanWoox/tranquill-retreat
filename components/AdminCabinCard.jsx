import React from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useDeleteCabin } from "@/hooks/useDeleteCabin";
import { useDuplicateCabin } from "@/hooks/useDuplicateCabin";
const IMAGE_URL = process.env.EXPO_PUBLIC_BACKEND_URL_IMAGE;
const AdminCabinCard = ({ cabin, onDelete, onEdit }) => {
  const { _id: id, name, maxCapacity, regularPrice, discount, image } = cabin;

  const { deleteCabinFn, isLoading, error } = useDeleteCabin();
  const {
    duplicateCabinFn,
    isLoading: isDuplicating,
    error: isDuplicateError,
  } = useDuplicateCabin();
  const handleDelete = () => {
    Alert.alert("Xóa Cabin", `Bạn chắc chắn muốn xóa ${name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => deleteCabinFn(id),
        style: "destructive",
      },
    ]);
  };

  return (
    <View className="flex-row bg-[#3b3b3b] rounded-xl overflow-hidden border border-[#524d4d] my-4 shadow-lg">
      {/* Left: Image Section */}
      <View className="w-40 h-40">
        <Image
          source={{
            uri:
              image && !image.includes(".co")
                ? `${IMAGE_URL}/public/uploads/cabins/${image}`
                : image || "fallback-image-url",
          }}
          className="w-full h-full rounded-xl"
          resizeMode="cover"
        />
      </View>

      {/* Right: Info Section */}
      <View className="flex-1 p-3">
        <Text className="text-yellow-500 font-bold text-base">
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

        <View className="flex-row justify-end space-x-2 mt-3 gap-3">
          <TouchableOpacity
            className="bg-yellow-500 px-3 py-1 rounded-lg"
            onPress={() => onEdit(cabin)}
          >
            <Text className="text-black font-medium">Sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-yellow-500 px-3 py-1 rounded-lg"
            onPress={() => {
              duplicateCabinFn(id);
            }}
          >
            <Text className="text-black font-medium">
              {isDuplicating ? "Đang nhân bản" : "Nhân bản"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-500 px-3 py-1 rounded-lg"
            onPress={handleDelete}
          >
            <Text className="text-white font-medium">
              {isLoading ? "Đang xóa" : "Xóa"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AdminCabinCard;
