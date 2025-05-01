import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Platform,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useSignUp } from "../../hooks/useSignUp";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Signup() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();
  const { signUpFn, isLoading, error } = useSignUp();
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const onSubmit = async (data) => {
    // Handle form submission logic (e.g., Supabase signup)
    try {
      signUpFn(data);
      reset();
    } catch (error) {
      Alert.alert("Signup Error", error.message);
    }
  };

  // Calculate if the user is 18 years or older
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

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setValue("dateOfBirth", date);
    hideDatePicker();
  };

  return (
    <ImageBackground
      source={require("../../assets/images/aboutBackground.jpg")}
      className="flex-1"
      style={{ resizeMode: "cover" }}
    >
      {/* Overlay for readability */}
      <View className="absolute inset-0 bg-black opacity-50" />

      <ScrollView>
        <View className="flex-1 justify-center items-center px-6 py-12">
          <Text className="text-2xl font-bold mb-6 text-white z-10">
            Đăng Ký
          </Text>

          {/* Full Name field */}
          <Controller
            control={control}
            name="fullName"
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
                  className="w-full border border-white rounded-md p-3 mb-4 text-white z-10"
                />
                {errors.fullName && (
                  <Text className="text-red-500 text-sm mb-2">
                    {errors.fullName.message}
                  </Text>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email không được để trống",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email không format hợp lệ",
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
                  className="w-full border border-white rounded-md p-3 mb-4 text-white z-10"
                />
                {errors.email && (
                  <Text className="text-red-500 text-sm mb-2">
                    {errors.email.message}
                  </Text>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password không được để trống",
              minLength: {
                value: 6,
                message: "Mật khẩu phải có độ dài 6 kí tự trở lên",
              },
            }}
            render={({ field }) => (
              <>
                <TextInput
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  placeholder="Mật khẩu"
                  placeholderTextColor="#ddd"
                  secureTextEntry
                  className="w-full border border-white rounded-md p-3 mb-4 text-white z-10"
                />
                {errors.password && (
                  <Text className="text-red-500 text-sm mb-2">
                    {errors.password.message}
                  </Text>
                )}
              </>
            )}
          />

          {/* Phone number field */}
          <Controller
            control={control}
            name="phoneNumber"
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
                  className="w-full border border-white rounded-md p-3 mb-4 text-white z-10"
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
                  className="w-full border border-white rounded-md p-3 mb-4 text-white z-10"
                />
                {errors.nationalId && (
                  <Text className="text-red-500 text-sm mb-2">
                    {errors.nationalId.message}
                  </Text>
                )}
              </>
            )}
          />

          {/* Date of Birth field with Expo-compatible DateTimePicker */}
          <Controller
            control={control}
            name="dateOfBirth"
            rules={{
              required: "Ngày sinh không được để trống",
              validate: (value) =>
                isAtLeast18(value) || "Bạn phải từ 18 tuổi trở lên",
            }}
            render={({ field }) => (
              <>
                <TouchableOpacity
                  onPress={showDatePicker}
                  className="w-full border border-white rounded-md p-3 mb-4 z-10"
                >
                  <Text className="text-white">
                    {field.value
                      ? field.value.toLocaleDateString("vi-VN")
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
            )}
          />

          <TouchableOpacity
            className="w-full bg-[#d2af84] p-4 rounded-md z-10 mt-2"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-center text-black font-semibold">
              {isLoading ? "Đang đăng ký" : "Đăng ký"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
