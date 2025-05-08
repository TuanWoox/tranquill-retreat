import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGetOneBooking } from "@/hooks/useGetOneBooking";
import { useUpdateBooking } from "@/hooks/useUpdateBooking";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router"; // Import router for navigation
import { AntDesign } from "@expo/vector-icons";

const EditBookingScreen = () => {
  const { id } = useLocalSearchParams();
  const { data, isLoading, error } = useGetOneBooking(id);
  const { updateBookingFn, isUpdating, updateError } = useUpdateBooking();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    if (data?.foundBooking) {
      const booking = data.foundBooking;
      setValue("numGuests", booking.numGuests);
      setValue("hasBreakfast", booking.hasBreakfast);
      setValue("bookingId", booking._id); // required for the update
    }
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    try {
      updateBookingFn(formData);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading booking details...</Text>
      </View>
    );
  }

  if (error || !data?.foundBooking) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Error loading booking</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../../../../assets/images/aboutBackground.jpg")} // Add your background image here
        className="flex-1"
        style={{ resizeMode: "cover" }}
      >
        <SafeAreaView className="absolute inset-0 bg-black opacity-40" />
        {/* Optional overlay for better text visibility */}
        <ScrollView contentContainerStyle={{ padding: 16, marginTop: 50 }}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-white/80 p-2 rounded-full max-w-10"
          >
            <AntDesign name="arrowleft" size={20} color="black" />
          </TouchableOpacity>

          <Text className="text-2xl font-bold mb-6 text-white">
            Edit Booking
          </Text>

          {/* Number of Guests */}
          <Text className="text-lg mb-2 text-white">Guests</Text>
          <Controller
            control={control}
            name="numGuests"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value?.toString()}
                onChangeText={(val) => onChange(Number(val))}
                keyboardType="numeric"
                style={{
                  backgroundColor: "white",
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 16,
                }}
              />
            )}
          />
          {errors.numGuests && (
            <Text className="text-red-500">This field is required.</Text>
          )}

          {/* Breakfast Toggle */}
          <Text className="text-lg mb-2 text-white">Include Breakfast</Text>
          <Controller
            control={control}
            name="hasBreakfast"
            render={({ field: { onChange, value } }) => (
              <Switch value={value} onValueChange={onChange} />
            )}
          />

          {/* Reservation ID (hidden) */}
          <Controller
            control={control}
            name="bookingId"
            render={({ field: { value } }) => (
              <TextInput
                value={value}
                editable={false}
                style={{ display: "none" }}
              />
            )}
          />

          <View className="mt-6 flex justify-center items-center">
            {/* Custom Update Booking Button */}
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              className="w-30 bg-[#d2af84] px-4 py-3 rounded-md mt-3"
            >
              <Text className="text-white text-lg">Update Booking</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default EditBookingScreen;
