import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { useRouter } from "expo-router";

export default function UpdateProfileForm({ guest }) {
  const { fullName, email, phoneNumber, nationalId, dateOfBirth } = guest;
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const { updateProfileFn, isLoading } = useUpdateProfile();

  const onSubmit = async (data) => {
    try {
      updateProfileFn(data);
    } catch (error) {
      Alert.alert("Update Error", error.message);
    }
  };

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);
  const handleConfirm = (date) => {
    setValue("dateOfBirth", date);
    hideDatePicker();
  };

  const isAtLeast18 = (birthDate) => {
    if (!birthDate) return false;
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    return birthDate <= eighteenYearsAgo;
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View className="flex-1 justify-center items-center px-6 py-12">
        <Text className="text-2xl font-extrabold mb-6 text-[#d2af84] tracking-wide drop-shadow-lg">
          Update Profile
        </Text>

        {/* Full Name field */}
        <Controller
          control={control}
          name="fullName"
          defaultValue={fullName}
          rules={{
            required: "Full name is required",
            minLength: {
              value: 2,
              message: "Full name must be at least 2 characters",
            },
          }}
          render={({ field }) => (
            <>
              <TextInput
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                placeholder="Full Name"
                placeholderTextColor="#bbb"
                className="w-full border border-[#d2af84] rounded-lg p-3 mb-4 text-white bg-black/40"
              />
              {errors.fullName && (
                <Text className="text-red-400 text-xs mb-2">
                  {errors.fullName.message}
                </Text>
              )}
            </>
          )}
        />

        {/* Email field */}
        <Controller
          control={control}
          name="email"
          defaultValue={email}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format",
            },
          }}
          render={({ field }) => (
            <>
              <TextInput
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                placeholder="Email"
                placeholderTextColor="#bbb"
                keyboardType="email-address"
                autoCapitalize="none"
                className="w-full border border-[#d2af84] rounded-lg p-3 mb-4 text-white bg-black/40"
              />
              {errors.email && (
                <Text className="text-red-400 text-xs mb-2">
                  {errors.email.message}
                </Text>
              )}
            </>
          )}
        />

        {/* Phone Number field */}
        <Controller
          control={control}
          name="phoneNumber"
          defaultValue={phoneNumber}
          rules={{
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10,11}$/,
              message: "Invalid phone number",
            },
          }}
          render={({ field }) => (
            <>
              <TextInput
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                placeholder="Phone Number"
                placeholderTextColor="#bbb"
                keyboardType="phone-pad"
                className="w-full border border-[#d2af84] rounded-lg p-3 mb-4 text-white bg-black/40"
              />
              {errors.phoneNumber && (
                <Text className="text-red-400 text-xs mb-2">
                  {errors.phoneNumber.message}
                </Text>
              )}
            </>
          )}
        />

        {/* National ID field */}
        <Controller
          control={control}
          name="nationalId"
          defaultValue={nationalId}
          rules={{
            required: "National ID is required",
            pattern: {
              value: /^[0-9]{9,12}$/,
              message: "Invalid National ID",
            },
          }}
          render={({ field }) => (
            <>
              <TextInput
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                placeholder="National ID"
                placeholderTextColor="#bbb"
                keyboardType="number-pad"
                className="w-full border border-[#d2af84] rounded-lg p-3 mb-4 text-white bg-black/40"
              />
              {errors.nationalId && (
                <Text className="text-red-400 text-xs mb-2">
                  {errors.nationalId.message}
                </Text>
              )}
            </>
          )}
        />

        {/* Date of Birth field */}
        <Controller
          control={control}
          name="dateOfBirth"
          defaultValue={dateOfBirth ? new Date(dateOfBirth) : new Date()}
          rules={{
            required: "Date of birth is required",
            validate: (value) =>
              isAtLeast18(value) || "You must be at least 18 years old",
          }}
          render={({ field }) => {
            const dateValue = field.value ? new Date(field.value) : new Date();
            return (
              <>
                <TouchableOpacity
                  onPress={showDatePicker}
                  className="w-full border border-[#d2af84] rounded-lg p-3 mb-4 bg-black/40"
                >
                  <Text className="text-white">
                    {dateValue
                      ? dateValue.toLocaleDateString("en-GB")
                      : "Select Date of Birth"}
                  </Text>
                </TouchableOpacity>

                <DateTimePickerModal
                  isVisible={datePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  maximumDate={new Date()}
                />

                {errors.dateOfBirth && (
                  <Text className="text-red-400 text-xs mb-2">
                    {errors.dateOfBirth.message}
                  </Text>
                )}
              </>
            );
          }}
        />

        {/* Update Button */}
        <TouchableOpacity
          className="w-full bg-[#d2af84] p-4 rounded-lg mt-4"
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          <Text className="text-center text-black font-bold text-base tracking-wide">
            {isLoading ? "Updating..." : "Update Profile"}
          </Text>
        </TouchableOpacity>
        {/* Change Password Button */}
        <TouchableOpacity
          className="w-full bg-[#d2af84] p-4 rounded-lg mt-4"
          onPress={() => router.push("/user/profile/changePassword")}
        >
          <Text className="text-center text-black font-bold text-base tracking-wide">
            Change Password
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
