import React, { useState } from "react";
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
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Spinner from "@/components/Spinner";
import { useCreateCabin } from "@/hooks/useCreateCabin";

export default function CreateCabinScreen() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [image, setImage] = useState(null);
  const { createCabinFn, isLoading, error } = useCreateCabin();

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

      // Extract filename from image URI
      const filename = image.split("/").pop();

      // Get the file extension
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image/jpeg";

      // Append the image
      // The format for React Native is different from web FormData
      formData.append("image", {
        uri: image,
        name: filename || "photo.jpg",
        type: type,
      });

      // Send the formData to the server
      createCabinFn(formData);
    } catch (err) {
      console.error("Error preparing form data:", err);
      Alert.alert("Error", "Failed to prepare data for upload");
    }
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../../assets/images/aboutBackground.jpg")}
        className="flex-1"
        style={{ resizeMode: "cover" }}
      >
        <SafeAreaView className="absolute inset-0 bg-black opacity-40" />

        <ScrollView contentContainerStyle={{ padding: 16, marginTop: 50 }}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-white/80 p-2 rounded-full max-w-10"
          >
            <AntDesign name="arrowleft" size={20} color="black" />
          </TouchableOpacity>

          <Text className="text-2xl font-bold mb-6 text-white">
            Create New Cabin
          </Text>

          {/* Name */}
          <Text className="text-white mb-1">Cabin Name</Text>
          <Controller
            control={control}
            name="name"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-[#23272f] text-white p-3 rounded-md border border-[#d2af84] mb-3"
                placeholder="Name"
                placeholderTextColor="#ccc"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.name && (
            <Text className="text-red-500">Name is required.</Text>
          )}

          {/* Max Capacity */}
          <Text className="text-white mb-1">Max Capacity</Text>
          <Controller
            control={control}
            name="maxCapacity"
            rules={{ required: true, min: 1 }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-[#23272f] text-white p-3 rounded-md border border-[#d2af84] mb-3"
                placeholder="Max Capacity"
                placeholderTextColor="#ccc"
                keyboardType="numeric"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.maxCapacity && (
            <Text className="text-red-500">Enter a valid capacity.</Text>
          )}

          {/* Price */}
          <Text className="text-white mb-1">Regular Price</Text>
          <Controller
            control={control}
            name="regularPrice"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-[#23272f] text-white p-3 rounded-md border border-[#d2af84] mb-3"
                placeholder="Price"
                placeholderTextColor="#ccc"
                keyboardType="numeric"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.regularPrice && (
            <Text className="text-red-500">Price is required.</Text>
          )}

          {/* Discount */}
          <Text className="text-white mb-1">Discount</Text>
          <Controller
            control={control}
            name="discount"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-[#23272f] text-white p-3 rounded-md border border-[#d2af84] mb-3"
                placeholder="Discount"
                placeholderTextColor="#ccc"
                keyboardType="numeric"
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          {/* Description */}
          <Text className="text-white mb-1">Description</Text>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-[#23272f] text-white p-3 rounded-md border border-[#d2af84] mb-3"
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
          <Text className="text-white mb-2">Cabin Image</Text>
          <TouchableOpacity
            onPress={pickImage}
            className="bg-[#d2af84] px-4 py-2 rounded-md mb-4"
          >
            <Text className="text-black font-bold">Pick an Image</Text>
          </TouchableOpacity>

          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: 200, borderRadius: 8 }}
              className="mb-4"
            />
          )}

          {/* Submit */}
          {isLoading ? (
            <Spinner />
          ) : (
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              className="bg-[#d2af84] px-4 py-3 rounded-md"
            >
              <Text className="text-white text-lg font-bold text-center">
                Create Cabin
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
