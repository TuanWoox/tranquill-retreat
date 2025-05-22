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

export default function ForgetPassword() {
    const { control, handleSubmit, formState: { errors }, getValues } = useForm();
    const [submitted, setSubmitted] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const router = useRouter();

    // Xác thực tài khoản trước khi gửi OTP
    const handleIdentityVerification = async (data) => {
        setErrorMessage("");
        try {
            // Gọi API xác thực tài khoản
            await identityVerification({ email: data.email });
            setEmail(data.email);
            setShowOTP(true);
        } catch (error) {
            setErrorMessage(error.message || "Không tìm thấy tài khoản với email này.");
        }
    };

    // Khi xác thực OTP thành công
    const handleVerifyOTP = () => {
        setShowOTP(false);
        setSubmitted(true);
        router.push({ pathname: "/auth/resetPassword", params: { email } });
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
                    Quên Mật Khẩu
                </Text>
                <>
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
                    {errorMessage ? (
                        <Text className="text-red-500 text-center mb-2">{errorMessage}</Text>
                    ) : null}
                    <TouchableOpacity
                        className="w-full bg-[#d2af84] p-4 rounded-md z-10 mb-4"
                        onPress={handleSubmit(handleIdentityVerification)}
                    >
                        <Text className="text-center text-black font-semibold">
                            Tiếp tục
                        </Text>
                    </TouchableOpacity>
                </>
                <TouchableOpacity
                    className="z-10 mt-2"
                    onPress={() => router.push("/auth/login")}
                >
                    <Text className="text-white text-center underline">
                        Quay lại đăng nhập
                    </Text>
                </TouchableOpacity>
            </View>
            <OTPModal
                visible={showOTP}
                onClose={() => setShowOTP(false)}
                email={email}
                onNextStep={handleVerifyOTP}
            />
        </ImageBackground>
    );
}