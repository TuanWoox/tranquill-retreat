import React from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useChangePassword from "../../../hooks/useChangePassword";

export default function ChangePasswordScreen() {
  const { control, handleSubmit, watch, formState: { errors } } = useForm();
  const router = useRouter();
  
  const {
    changePassword,
    isSubmitting,
    isSuccess,
    isError,
    error,
  } = useChangePassword();

  const onSubmit = (data) => {
    changePassword(
      {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            router.back();
          }, 1500);
        },
      }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../../../assets/images/aboutBackground.jpg")}
        className="flex-1"
        style={{ resizeMode: "cover" }}
      >
        <SafeAreaView className="absolute top-2 left-2 z-20">
          <TouchableOpacity
             onPress={() => router.back()}
             className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30"
             style={{
               shadowColor: "#000",
               shadowOffset: { width: 0, height: 2 },
               shadowOpacity: 0.25,
               shadowRadius: 3.84,
               elevation: 5,
             }}
          >
             <AntDesign name="arrowleft" size={22} color="white" />
          </TouchableOpacity>
        </SafeAreaView>

        <View className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        
        <View className="flex-1 justify-center items-center px-6">
          <View className="items-center mb-8">
            <AntDesign name="lock1" size={40} color="white" />
            <Text className="text-3xl font-bold text-white text-center mt-4 mb-2">
              Đổi mật khẩu
            </Text>
          </View>

          <View className="w-full max-w-sm">
            <View className="bg-white/25 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/40"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.4,
                    shadowRadius: 15,
                    elevation: 15,
                  }}>
              
              <Controller
                control={control}
                name="oldPassword"
                rules={{ required: "Vui lòng nhập mật khẩu hiện tại" }}
                render={({ field }) => (
                  <View className="mb-4">
                    <View className="relative">
                      <View className="absolute left-3 top-4 z-10">
                        <AntDesign name="lock" size={20} color="#333" />
                      </View>
                      <TextInput
                        value={field.value}
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                        placeholder="Mật khẩu hiện tại"
                        placeholderTextColor="#555"
                        secureTextEntry
                        className="w-full bg-white/40 border-2 border-white/60 rounded-xl p-4 pl-12 text-black text-base font-semibold"
                        style={{
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 3 },
                          shadowOpacity: 0.25,
                          shadowRadius: 5,
                          elevation: 5,
                        }}
                      />
                    </View>
                    {errors.oldPassword && (
                      <Text className="text-red-600 text-sm mt-1 ml-1 font-medium">
                        {errors.oldPassword.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="newPassword"
                rules={{
                  required: "Vui lòng nhập mật khẩu mới",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu mới phải có ít nhất 6 ký tự",
                  },
                }}
                render={({ field }) => (
                  <View className="mb-4">
                    <View className="relative">
                      <View className="absolute left-3 top-4 z-10">
                        <AntDesign name="key" size={20} color="#333" />
                      </View>
                      <TextInput
                        value={field.value}
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                        placeholder="Mật khẩu mới"
                        placeholderTextColor="#555"
                        secureTextEntry
                        className="w-full bg-white/40 border-2 border-white/60 rounded-xl p-4 pl-12 text-black text-base font-semibold"
                        style={{
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 3 },
                          shadowOpacity: 0.25,
                          shadowRadius: 5,
                          elevation: 5,
                        }}
                      />
                    </View>
                    {errors.newPassword && (
                      <Text className="text-red-600 text-sm mt-1 ml-1 font-medium">
                        {errors.newPassword.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                rules={{
                  required: "Vui lòng nhập lại mật khẩu mới",
                  validate: value =>
                    value === watch("newPassword") || "Mật khẩu không khớp",
                }}
                render={({ field }) => (
                  <View className="mb-8">
                    <View className="relative">
                      <View className="absolute left-3 top-4 z-10">
                        <AntDesign name="checkcircleo" size={20} color="#333" />
                      </View>
                      <TextInput
                        value={field.value}
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                        placeholder="Nhập lại mật khẩu mới"
                        placeholderTextColor="#555"
                        secureTextEntry
                        className="w-full bg-white/40 border-2 border-white/60 rounded-xl p-4 pl-12 text-black text-base font-semibold"
                        style={{
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 3 },
                          shadowOpacity: 0.25,
                          shadowRadius: 5,
                          elevation: 5,
                        }}
                      />
                    </View>
                    {errors.confirmPassword && (
                      <Text className="text-red-600 text-sm mt-1 ml-1 font-medium">
                        {errors.confirmPassword.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <View>
                <TouchableOpacity
                  className="w-full p-4 rounded-xl mb-5"
                  onPress={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: "#6B7280", // Gray color
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.25,
                    shadowRadius: 5,
                    elevation: 5,
                  }}
                >
                  <View className="flex-row items-center justify-center">
                    {isSubmitting && (
                      <AntDesign name="loading1" size={18} color="white" className="mr-2" />
                    )}
                    <Text className="text-center text-white font-bold text-base">
                      {isSubmitting ? "Đang xử lý..." : "Đổi mật khẩu"}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  className="w-full p-4 rounded-xl"
                  onPress={() => router.back()}
                  style={{
                    backgroundColor: "#6B7280", 
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.25,
                    shadowRadius: 5,
                    elevation: 5,
                  }}
                >
                  <Text className="text-center text-white font-bold text-base">
                    Quay lại
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {isError && error?.message && (
              <View className="bg-red-100/90 border border-red-300 rounded-xl p-3 mt-4 backdrop-blur-sm">
                <Text className="text-red-700 text-center font-medium">
                  {error.message}
                </Text>
              </View>
            )}
            
            {isSuccess && (
              <View className="bg-green-100/90 border border-green-300 rounded-xl p-3 mt-4 backdrop-blur-sm">
                <View className="flex-row items-center justify-center">
                  <AntDesign name="checkcircle" size={16} color="#059669" />
                  <Text className="text-green-700 text-center font-medium ml-2">
                    Đổi mật khẩu thành công! Đang quay lại...
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}