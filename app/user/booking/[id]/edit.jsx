import React from "react";
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
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router"; // Import router for navigation
import { AntDesign } from "@expo/vector-icons";
import Spinner from "@/components/Spinner";

const EditBookingScreen = () => {
  const { id } = useLocalSearchParams();
  const {
    data: booking,
    isGettingTheBooking,
    error: bookingError,
  } = useGetOneBooking(id);
  const { updateBookingFn, isUpdating, updateError } = useUpdateBooking();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter(); // Initialize the router

  // Check if booking data is available before setting form values
  if (booking && !errors.numGuests) {
    setValue("numGuests", booking.numGuests);
    setValue("hasBreakfast", booking.hasBreakfast);
    setValue("bookingId", booking._id);
  }

  // Loading state
  if (isGettingTheBooking) {
    return (
      <Spinner>
        <Text className="text-black">Fetching The Cabin</Text>
      </Spinner>
    );
  }

  const onSubmit = async (formData) => {
    try {
      updateBookingFn(formData);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // Error handling if booking details couldn't be fetched
  if (bookingError || !booking) {
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
              <View
                style={{
                  backgroundColor: "#23272f", // dark background
                  borderRadius: 8,
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: "#d2af84", // gold border
                  overflow: "hidden",
                }}
              >
                <Picker
                  selectedValue={value}
                  onValueChange={(val) => onChange(val)}
                  style={{
                    color: "#fff", // white text
                    backgroundColor: "transparent",
                  }}
                  dropdownIconColor="#d2af84" // gold icon (supported in @react-native-picker/picker)
                >
                  {[...Array(booking?.cabin?.maxCapacity || 10).keys()].map(
                    (num) => (
                      <Picker.Item
                        key={num + 1}
                        label={`${num + 1}`}
                        value={num + 1}
                        color="#fff" // white text for dropdown items
                      />
                    )
                  )}
                </Picker>
              </View>
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
