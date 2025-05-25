import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { useLogIn } from "../../hooks/useLogIn";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
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
      blurRadius={4}
      style={{ resizeMode: "cover" }}
    >
      <View className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
      <View className="flex-1 justify-center items-center px-6">
        <View className="w-full max-w-md bg-black/60 rounded-2xl p-8 shadow-2xl border border-white/10">
          <View className="items-center mb-8">
            <Ionicons name="log-in-outline" size={40} color="#d2af84" />
            <Text className="text-3xl font-extrabold text-white mt-3 mb-1 tracking-wide drop-shadow-lg">
              Log in
            </Text>
            <Text className="text-amber-200 text-base italic">
              Welcome back, our beloved customer!!!
            </Text>
          </View>

          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email cannot be empty",
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

          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password cannot be empty",
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

          <TouchableOpacity
            className="w-full bg-[#d2af84] p-4 rounded-lg mt-2 mb-3"
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            <Text className="text-center text-black font-bold text-base tracking-wide">
              {isLoading ? "Logging in" : "Log in"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-1"
            onPress={() => router.push("/auth/forgetPassword")}
          >
            <Text className="text-amber-100 text-center underline text-sm">
              Forget password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-4"
            onPress={() => router.push("/auth/signup")}
          >
            <Text className="text-white text-center text-base">
              Does not have a register account?{" "}
              <Text className="underline text-amber-200 font-semibold">
                Sign up
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
