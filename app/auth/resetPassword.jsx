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
  const { control, handleSubmit, watch, formState: { errors } } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const {
    resetPassword,
    isResetting,
    isSuccess,
    isError,
    error,
  } = useResetPassword();

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
    <ImageBackground
      source={require("../../assets/images/aboutBackground.jpg")}
      className="flex-1"
      style={{ resizeMode: "cover" }}
    >
      <View className="absolute inset-0 bg-black opacity-50" />
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-2xl font-bold mb-6 text-white z-10">
          Đặt lại mật khẩu
        </Text>
        <View className="w-full z-10">
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Mật khẩu không được để trống",
              minLength: {
                value: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự",
              },
            }}
            render={({ field }) => (
              <>
                <TextInput
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  placeholder="Mật khẩu mới"
                  placeholderTextColor="#ddd"
                  secureTextEntry
                  className="w-full border border-white rounded-md p-3 mb-4 text-white"
                />
                {errors.password && (
                  <Text className="text-red-500 text-sm mb-2">
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
              required: "Vui lòng nhập lại mật khẩu",
              validate: value =>
                value === watch("password") || "Mật khẩu không khớp",
            }}
            render={({ field }) => (
              <>
                <TextInput
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  placeholder="Nhập lại mật khẩu"
                  placeholderTextColor="#ddd"
                  secureTextEntry
                  className="w-full border border-white rounded-md p-3 mb-4 text-white"
                />
                {errors.confirmPassword && (
                  <Text className="text-red-500 text-sm mb-2">
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </>
            )}
          />
          <TouchableOpacity
            className="w-full bg-[#d2af84] p-4 rounded-md mb-4"
            onPress={handleSubmit(onSubmit)}
            disabled={isResetting || submitted}
          >
            <Text className="text-center text-black font-semibold">
              {isResetting ? "Đang xử lý..." : "Đặt lại mật khẩu"}
            </Text>
          </TouchableOpacity>
          {isError && error?.message && (
            <Text className="text-red-500 text-center mb-2">{error.message}</Text>
          )}
          {isSuccess && submitted && (
            <Text className="text-green-500 text-center mb-2">
              Đặt lại mật khẩu thành công! Đang chuyển hướng...
            </Text>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}