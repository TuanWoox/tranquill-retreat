import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter, useLocalSearchParams } from "expo-router";
import useResetPassword from "../../hooks/useResetPassword";

export default function ResetPassword() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const { resetPassword, isResetting, isSuccess, isError, error } =
    useResetPassword();

  const onSubmit = (data) => {
    resetPassword(
      { email, password: data.password },
      {
        onSuccess: () => {
          setSubmitted(true);
          setTimeout(() => {
            router.replace("/auth/login");
          }, 1500);
        },
      }
    );
  };

  return (
    <>
      <View className="flex-1 justify-center items-center px-6">
        <View className="w-full max-w-md bg-black/70 rounded-3xl p-8 shadow-2xl border border-white/10">
          <View className="items-center mb-8">
            <Text className="text-3xl font-extrabold text-white mt-3 mb-1 tracking-wide drop-shadow-lg">
              Reset Password
            </Text>
            <Text className="text-amber-200 text-base italic text-center">
              Enter your new password below.
            </Text>
          </View>
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
                  placeholder="New Password"
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
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            }}
            render={({ field }) => (
              <>
                <TextInput
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  placeholder="Confirm Password"
                  placeholderTextColor="#bbb"
                  secureTextEntry
                  className="w-full border border-[#d2af84] rounded-lg p-3 mb-2 text-white bg-black/40"
                />
                {errors.confirmPassword && (
                  <Text className="text-red-400 text-xs mb-2">
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </>
            )}
          />
          <TouchableOpacity
            className="w-full bg-[#d2af84] p-4 rounded-lg mt-4"
            onPress={handleSubmit(onSubmit)}
            disabled={isResetting || submitted}
          >
            <Text className="text-center text-black font-bold text-base tracking-wide">
              {isResetting ? "Processing..." : "Reset Password"}
            </Text>
          </TouchableOpacity>
          {isError && error?.message && (
            <Text className="text-red-400 text-center mb-2">
              {error.message}
            </Text>
          )}
          {isSuccess && submitted && (
            <Text className="text-green-400 text-center mb-2">
              Password reset successful! Redirecting...
            </Text>
          )}
          <TouchableOpacity
            className="mt-6"
            onPress={() => router.replace("/auth/login")}
          >
            <Text className="text-center text-amber-200 underline text-base">
              ← Back to Log In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
