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
  Platform,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGetOneBooking } from "@/hooks/useGetOneBooking";
import { useUpdateBooking } from "@/hooks/useUpdateBooking";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import ModalSelector from "react-native-modal-selector";
import { AntDesign, Feather } from "@expo/vector-icons";
import Spinner from "@/components/Spinner";
import { useGetSetting } from "@/hooks/useGetSetting";
import NotFoundCard from "@/components/NotFoundCard";

const EditBookingScreen = () => {
  const { id } = useLocalSearchParams();
  const {
    data: booking,
    isGettingTheBooking,
    error: bookingError,
  } = useGetOneBooking(id);
  const { updateBookingFn, isUpdating, updateError } = useUpdateBooking();
  const { data: settings, isLoading, error } = useGetSetting();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  useEffect(() => {
    if (booking) {
      setValue("numGuests", booking.numGuests);
      setValue("hasBreakfast", booking.hasBreakfast);
      setValue("observations", booking.observations || "");
      setValue("bookingId", booking._id);
    }
  }, [booking, setValue]);

  if (isGettingTheBooking) {
    return <Spinner>Fetching The Booking</Spinner>;
  }

  const onSubmit = async (formData) => {
    const extrasPrice =
      formData.hasBreakfast === false
        ? 0
        : formData.numGuests * settings.breakfastPrice * booking.numDates;

    formData.extrasPrice = Number(extrasPrice);

    try {
      updateBookingFn(formData);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (bookingError || !booking) {
    return (
      <View className="flex-1 items-center justify-center">
        <NotFoundCard
          title="Booking Not Found"
          message="Sorry, we couldn't find the booking you're trying to edit."
          suggestion="Please check the link or try again later."
          icon="calendar"
          iconColor="#eab308"
          error={bookingError}
        />
      </View>
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 80 }}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-10 left-4 bg-white/90 p-2 rounded-full shadow-md z-10"
        >
          <AntDesign name="arrowleft" size={22} color="black" />
        </TouchableOpacity>

        {/* Form Container */}
        <View className="bg-white/10 border border-white/20 p-6 rounded-2xl shadow-md">
          <Text className="text-3xl font-bold text-[#d2af84] mb-6 text-center">
            Edit Booking
          </Text>

          {/* Guests Picker */}
          <Text className="text-white text-base mb-2">Number of Guests</Text>
          <Controller
            control={control}
            name="numGuests"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => {
              const options = [
                ...Array(booking?.cabin?.maxCapacity || 10).keys(),
              ].map((i) => ({
                key: i + 1,
                label: `${i + 1}`,
              }));

              return (
                <View style={{ marginBottom: 16 }}>
                  <ModalSelector
                    data={options}
                    initValue={
                      value ? `Guests: ${value}` : "Select number of guests"
                    }
                    onChange={(option) => onChange(option.key)}
                    style={{
                      backgroundColor: "#2c2f38",
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: "#d2af84",
                      paddingVertical: 14,
                      paddingHorizontal: 16,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 3 },
                      shadowOpacity: 0.25,
                      shadowRadius: 6,
                      elevation: 5,
                    }}
                    initValueTextStyle={{
                      color: value ? "#d2af84" : "#aaa",
                      fontSize: 18,
                      fontWeight: "600",
                      fontFamily: "System",
                    }}
                    selectTextStyle={{
                      color: "#fff",
                      fontSize: 18,
                      fontWeight: "600",
                      fontFamily: "System",
                    }}
                    optionTextStyle={{
                      color: "#222",
                      fontSize: 16,
                      paddingVertical: 10,
                    }}
                    cancelText="Cancel"
                    cancelTextStyle={{
                      color: "#d2af84",
                      fontWeight: "600",
                      fontSize: 16,
                    }}
                    optionContainerStyle={{
                      borderRadius: 12,
                      backgroundColor: "#fefefe",
                      marginHorizontal: 10,
                      marginVertical: 8,
                      paddingVertical: 8,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 5,
                      elevation: 3,
                    }}
                  >
                    <Text
                      style={{
                        color: value ? "#d2af84" : "#888",
                        fontSize: 18,
                      }}
                    >
                      {value ? `Guests: ${value}` : "Select number of guests"}
                    </Text>
                  </ModalSelector>
                </View>
              );
            }}
          />

          {errors.numGuests && (
            <Text className="text-red-400 mb-4">This field is required.</Text>
          )}

          {/* Breakfast Switch */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-white text-base">Include Breakfast</Text>
            <Controller
              control={control}
              name="hasBreakfast"
              render={({ field: { onChange, value } }) => (
                <Switch
                  value={value}
                  onValueChange={onChange}
                  trackColor={{ false: "#767577", true: "#d2af84" }}
                  thumbColor={value ? "#fff" : "#f4f3f4"}
                />
              )}
            />
          </View>

          {/* Special Requests Section */}
          <View className="mb-6">
            <View className="flex-row items-center mb-3">
              <Feather name="message-square" size={18} color="#d2af84" />
              <Text className="text-white text-base ml-2 font-semibold">
                Special Requests
              </Text>
            </View>
            <Text className="text-gray-300 text-sm mb-3">
              Let us know about any special requirements or requests for your
              stay
            </Text>

            <Controller
              control={control}
              name="observations"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter your special requests here..."
                  placeholderTextColor="#888"
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical="top"
                  style={{
                    backgroundColor: "#2c2f38",
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: "#d2af84",
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    color: "#fff",
                    fontSize: 16,
                    minHeight: 100,
                    maxHeight: 150,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                />
              )}
            />

            {/* Character count or helpful text */}
            <Text className="text-gray-400 text-xs mt-2">
              Examples: Early check-in, late check-out, dietary restrictions,
              celebration arrangements, etc.
            </Text>
          </View>

          {/* Booking ID (Hidden) */}
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

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isUpdating}
            className="bg-[#d2af84] py-3 rounded-xl shadow-md mt-4"
            style={{
              shadowColor: "#d2af84",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 6,
              elevation: 8,
            }}
          >
            <Text className="text-center text-lg text-white font-bold">
              {isUpdating ? "Updating..." : "Update Booking"}
            </Text>
          </TouchableOpacity>

          {/* Error Message */}
          {updateError && (
            <View className="mt-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30">
              <Text className="text-red-300 text-center">
                Failed to update booking. Please try again.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default EditBookingScreen;
