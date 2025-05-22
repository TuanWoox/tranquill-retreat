import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { useLogIn } from "../../hooks/useLogIn";

export default function login() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginFn, isLoading, error } = useLogIn();

  const onSubmit = async (data) => {
    try {
      loginFn(data);
    } catch (error) {
      Alert.alert("Đăng nhập thất bại", error.message);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/aboutBackground.jpg")}
      className="flex-1"
      style={{ resizeMode: "cover" }}
    >
      {/* Overlay for readability */}
      <View className="absolute inset-0 bg-black opacity-50" />

      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-2xl font-bold mb-6 text-white z-10">
          Đăng Nhập
        </Text>

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
            required: "Mật khẩu không được để trống",
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
                className="w-full border border-white rounded-md p-3 mb-6 text-white z-10"
              />
              {errors.password && (
                <Text className="text-red-500 text-sm mb-2">
                  {errors.password.message}
                </Text>
              )}
            </>
          )}
        />

        <TouchableOpacity
          className="w-full bg-[#d2af84] p-4 rounded-md z-10 mb-4"
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          <Text className="text-center text-black font-semibold">
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="z-10 mt-2"
          onPress={() => router.push("/auth/forgetPassword")}
        >
          <Text className="text-white text-center underline">
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="z-10 mt-4"
          onPress={() => router.push("/auth/signup")}
        >
          <Text className="text-white text-center">
            Chưa có tài khoản? <Text className="underline">Đăng ký</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
