import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import OTPModal from "../../components/OTPModal";
import { identityVerification } from "../../services/authService";
import { Ionicons } from "@expo/vector-icons";

export default function ForgetPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  // Verify account before sending OTP
  const handleIdentityVerification = async (data) => {
    setErrorMessage("");
    try {
      await identityVerification({ email: data.email });
      setEmail(data.email);
      setShowOTP(true);
    } catch (error) {
      setErrorMessage(error.message || "No account found with this email.");
    }
  };

  // When OTP is successfully verified
  const handleVerifyOTP = () => {
    setShowOTP(false);
    setSubmitted(true);
    router.push({ pathname: "/auth/resetPassword", params: { email } });
  };

  return (
    <>
      <View className="flex-1 justify-center items-center px-6">
        <View className="w-full max-w-md bg-black/70 rounded-3xl p-8 shadow-2xl border border-white/10">
          <View className="items-center mb-8">
            <Ionicons name="key-outline" size={40} color="#d2af84" />
            <Text className="text-3xl font-extrabold text-white mt-3 mb-1 tracking-wide drop-shadow-lg">
              Forgot Password
            </Text>
            <Text className="text-amber-200 text-base italic text-center">
              Enter your email to receive a verification code.
            </Text>
          </View>
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
          {errorMessage ? (
            <Text className="text-red-400 text-center mb-2">
              {errorMessage}
            </Text>
          ) : null}
          <TouchableOpacity
            className="w-full bg-[#d2af84] p-4 rounded-lg mt-2 mb-4"
            onPress={handleSubmit(handleIdentityVerification)}
            disabled={isVerifying}
          >
            <Text className="text-center text-black font-bold text-base tracking-wide">
              Continue
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="mt-2" onPress={() => router.back()}>
            <Text className="text-center text-amber-200 underline text-base">
              ← Back to Log In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <OTPModal
        visible={showOTP}
        onClose={() => setShowOTP(false)}
        email={email}
        onNextStep={handleVerifyOTP}
      />
    </>
  );
}
