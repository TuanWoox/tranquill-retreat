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
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Signup() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { signUpFn, isLoading } = useSignUp();
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      signUpFn(data);
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

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);
  const handleConfirm = (date) => {
    setValue("dateOfBirth", date);
    hideDatePicker();
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 32,
          paddingHorizontal: 16,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="w-full max-w-md bg-black/70 rounded-3xl p-8 shadow-2xl border border-white/10">
          <View className="items-center mb-8">
            <Ionicons name="person-add-outline" size={40} color="#d2af84" />
            <Text className="text-3xl font-extrabold text-white mt-3 mb-1 tracking-wide drop-shadow-lg">
              Create Account
            </Text>
            <Text className="text-amber-200 text-base italic">
              Join the Tranquility Retreat family!
            </Text>
          </View>

          {/* Full Name field */}
          <Controller
            control={control}
            name="fullName"
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
                  className="w-full border border-[#d2af84] rounded-lg p-3 mb-2 text-white bg-black/40"
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
                  className="w-full border border-[#d2af84] rounded-lg p-3 mb-2 text-white bg-black/40"
                />
                {errors.email && (
                  <Text className="text-red-400 text-xs mb-2">
                    {errors.email.message}
                  </Text>
                )}
              </>
            )}
          />

          {/* Password field */}
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field }) => (
              <>
                <TextInput
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  placeholder="Password"
                  placeholderTextColor="#bbb"
                  secureTextEntry
                  className="w-full border border-[#d2af84] rounded-lg p-3 mb-2 text-white bg-black/40"
                />
                {errors.password && (
                  <Text className="text-red-400 text-xs mb-2">
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
                  className="w-full border border-[#d2af84] rounded-lg p-3 mb-2 text-white bg-black/40"
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
                  className="w-full border border-[#d2af84] rounded-lg p-3 mb-2 text-white bg-black/40"
                />
                {errors.nationalId && (
                  <Text className="text-red-400 text-xs mb-2">
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
              required: "Date of birth is required",
              validate: (value) =>
                isAtLeast18(value) || "You must be at least 18 years old",
            }}
            render={({ field }) => (
              <>
                <TouchableOpacity
                  onPress={showDatePicker}
                  className="w-full border border-[#d2af84] rounded-lg p-3 mb-2 bg-black/40"
                >
                  <Text className="text-white">
                    {field.value
                      ? field.value.toLocaleDateString("en-GB")
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
            )}
          />

          <TouchableOpacity
            className="w-full bg-[#d2af84] p-4 rounded-lg mt-4"
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            <Text className="text-center text-black font-bold text-base tracking-wide">
              {isLoading ? "Signing up..." : "Sign Up"}
            </Text>
          </TouchableOpacity>
          {/* Go back to Log In */}
          <TouchableOpacity className="mt-6" onPress={() => router.back()}>
            <Text className="text-center text-amber-200 underline text-base">
              ← Back to Log In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
