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
export default function UpdateProfileForm({ guest }) {
  const { fullName, email, phoneNumber, nationalId, dateOfBirth } = guest;
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const { updateProfileFn, isLoading, error } = useUpdateProfile();
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
        <Text className="text-2xl font-bold mb-6 text-white">
          Cập nhật thông tin
        </Text>

        {/* Full Name field */}
        <Controller
          control={control}
          name="fullName"
          defaultValue={fullName}
          rules={{
            required: "Họ và tên không được để trống",
            minLength: {
              value: 2,
              message: "Họ và tên phải có ít nhất 2 ký tự",
            },
          }}
          render={({ field }) => (
            <>
              <TextInput
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                placeholder="Họ và tên"
                placeholderTextColor="#ddd"
                className="w-full border border-white rounded-md p-3 mb-4 text-white"
              />
              {errors.fullName && (
                <Text className="text-red-500 text-sm mb-2">
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
            required: "Email không được để trống",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email không hợp lệ",
            },
          }}
          render={({ field }) => (
            <>
              <TextInput
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                placeholder="Email"
                placeholderTextColor="#ddd"
                keyboardType="email-address"
                autoCapitalize="none"
                className="w-full border border-white rounded-md p-3 mb-4 text-white"
              />
              {errors.email && (
                <Text className="text-red-500 text-sm mb-2">
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
            required: "Số điện thoại không được để trống",
            pattern: {
              value: /^[0-9]{10,11}$/,
              message: "Số điện thoại không hợp lệ",
            },
          }}
          render={({ field }) => (
            <>
              <TextInput
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                placeholder="Số điện thoại"
                placeholderTextColor="#ddd"
                keyboardType="phone-pad"
                className="w-full border border-white rounded-md p-3 mb-4 text-white"
              />
              {errors.phoneNumber && (
                <Text className="text-red-500 text-sm mb-2">
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
            required: "CMND/CCCD không được để trống",
            pattern: {
              value: /^[0-9]{9,12}$/,
              message: "CMND/CCCD không hợp lệ",
            },
          }}
          render={({ field }) => (
            <>
              <TextInput
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                placeholder="CMND/CCCD"
                placeholderTextColor="#ddd"
                keyboardType="number-pad"
                className="w-full border border-white rounded-md p-3 mb-4 text-white"
              />
              {errors.nationalId && (
                <Text className="text-red-500 text-sm mb-2">
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
          defaultValue={dateOfBirth ? new Date(dateOfBirth) : new Date()} // Make sure dateOfBirth is a valid Date object
          rules={{
            required: "Ngày sinh không được để trống",
            validate: (value) =>
              isAtLeast18(value) || "Bạn phải từ 18 tuổi trở lên",
          }}
          render={({ field }) => {
            const dateValue = field.value ? new Date(field.value) : new Date();
            return (
              <>
                <TouchableOpacity
                  onPress={showDatePicker}
                  className="w-full border border-white rounded-md p-3 mb-4"
                >
                  <Text className="text-white">
                    {dateValue
                      ? dateValue.toLocaleDateString("vi-VN")
                      : "Chọn ngày sinh"}
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
                  <Text className="text-red-500 text-sm mb-2">
                    {errors.dateOfBirth.message}
                  </Text>
                )}
              </>
            );
          }}
        />

        {/* Update Button */}
        <TouchableOpacity
          className="w-full bg-[#d2af84] p-4 rounded-md mt-4"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-center text-black font-semibold">
            {isLoading ? "Đang cập nhật" : "Cập nhật"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
