import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import { useRouter, useLocalSearchParams } from "expo-router";

import Spinner from "@/components/Spinner";
import { useGetOneCabin } from "@/hooks/useGetOneCabin";
import { useUpdateCabin } from "@/hooks/useUpdateCabin";
const IMAGE_URL = process.env.EXPO_PUBLIC_BACKEND_URL_IMAGE;

export default function EditCabinScreen() {
  const router = useRouter();
  const { cabinId } = useLocalSearchParams();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [image, setImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);

  const {
    data,
    isLoading: isFetching,
    error: fetchError,
  } = useGetOneCabin(cabinId);
  const {
    updateCabinFn,
    isLoading: isUpdating,
    error: updateError,
  } = useUpdateCabin();

  // Populate form with existing cabin data
  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("maxCapacity", data.maxCapacity?.toString());
      setValue("regularPrice", data.regularPrice?.toString());
      setValue("discount", data.discount?.toString() || "");
      setValue("description", data.description || "");

      if (data.image) {
        setOriginalImage(data.image);
        setImage(data.image);
      }
    }
  }, [data, setValue]);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Please allow access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = (data) => {
    if (!image) {
      return Alert.alert("Image required", "Please select an image.");
    }

    try {
      // Create FormData object
      const formData = new FormData();

      // Append all text fields from the form
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      // Append cabin ID for update
      formData.append("cabinId", cabinId);

      // Only append new image if it's different from the original
      if (image !== originalImage) {
        // Extract filename from image URI
        const filename = image.split("/").pop();

        // Get the file extension
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : "image/jpeg";

        // Append the image
        formData.append("image", {
          uri: image,
          name: filename || "photo.jpg",
          type: type,
        });
      }

      updateCabinFn(formData);
    } catch (err) {
      console.error("Error preparing form data:", err);
      Alert.alert("Error", "Failed to prepare data for upload");
    }
  };

  if (isFetching) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Spinner />
      </View>
    );
  }

  if (fetchError) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-red-500 text-center mb-4">
          Error loading cabin data
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-[#d2af84] px-4 py-2 rounded-md"
        >
          <Text className="text-black font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
          <View className="w-full max-w-xl mx-auto bg-black/70 border border-[#d2af84]/30 rounded-3xl p-8 shadow-2xl backdrop-blur-sm mt-8 mb-8">
            <Text className="text-3xl font-extrabold text-[#d2af84] mb-8 text-center tracking-wide drop-shadow-lg">
              Edit Cabin
            </Text>

            {/* Name */}
            <Text className="text-[#d2af84] mb-1 font-semibold">
              Cabin Name
            </Text>
            <Controller
              control={control}
              name="name"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="bg-black/40 text-white p-3 rounded-lg border border-[#d2af84] mb-3"
                  placeholder="Name"
                  placeholderTextColor="#ccc"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.name && (
              <Text className="text-red-400 mb-2">Name is required.</Text>
            )}

            {/* Max Capacity */}
            <Text className="text-[#d2af84] mb-1 font-semibold">
              Max Capacity
            </Text>
            <Controller
              control={control}
              name="maxCapacity"
              rules={{ required: true, min: 1 }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="bg-black/40 text-white p-3 rounded-lg border border-[#d2af84] mb-3"
                  placeholder="Max Capacity"
                  placeholderTextColor="#ccc"
                  keyboardType="numeric"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.maxCapacity && (
              <Text className="text-red-400 mb-2">Enter a valid capacity.</Text>
            )}

            {/* Price */}
            <Text className="text-[#d2af84] mb-1 font-semibold">
              Regular Price
            </Text>
            <Controller
              control={control}
              name="regularPrice"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="bg-black/40 text-white p-3 rounded-lg border border-[#d2af84] mb-3"
                  placeholder="Price"
                  placeholderTextColor="#ccc"
                  keyboardType="numeric"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.regularPrice && (
              <Text className="text-red-400 mb-2">Price is required.</Text>
            )}

            {/* Discount */}
            <Text className="text-[#d2af84] mb-1 font-semibold">Discount</Text>
            <Controller
              control={control}
              name="discount"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="bg-black/40 text-white p-3 rounded-lg border border-[#d2af84] mb-3"
                  placeholder="Discount"
                  placeholderTextColor="#ccc"
                  keyboardType="numeric"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            {/* Description */}
            <Text className="text-[#d2af84] mb-1 font-semibold">
              Description
            </Text>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="bg-black/40 text-white p-3 rounded-lg border border-[#d2af84] mb-3"
                  placeholder="Description"
                  placeholderTextColor="#ccc"
                  multiline
                  numberOfLines={4}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            {/* Image Upload */}
            <Text className="text-[#d2af84] mb-2 font-semibold">
              Cabin Image
            </Text>
            <TouchableOpacity
              onPress={pickImage}
              className="bg-[#d2af84] px-4 py-2 rounded-lg mb-4"
              activeOpacity={0.85}
            >
              <Text className="text-black font-bold text-center">
                {image ? "Change Image" : "Pick an Image"}
              </Text>
            </TouchableOpacity>
            {image && (
              <Image
                source={{
                  uri:
                    image.includes("file://") || image.startsWith("http")
                      ? image
                      : `${IMAGE_URL}/${image}`,
                }}
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: "#d2af84",
                }}
                className="mb-4"
              />
            )}

            {/* Submit */}
            {isUpdating ? (
              <Spinner />
            ) : (
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                className="bg-[#d2af84] px-4 py-3 rounded-lg mt-2"
                activeOpacity={0.85}
              >
                <Text className="text-black text-lg font-bold text-center">
                  {isUpdating ? "Updating Cabin" : "Update"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
