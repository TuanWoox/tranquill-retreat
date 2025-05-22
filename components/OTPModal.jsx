import React, { useRef, useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import useCreateOTP from "../hooks/useCreateOTP";
import useVerifyOTP from "../hooks/useVerifyOTP";

export default function OTPModal({
    visible,
    onClose,
    email,
    onNextStep,
}) {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef([]);
    const {
        triggerOTPService,
        isLoading: isSendingOTP,
        isSuccess: isSendingOTPSuccess,
        error: otpError,
    } = useCreateOTP();
    const {
        verifyingOTP,
        isVerifyingLoading,
        isVerifyingSuccess,
        verifyError,
    } = useVerifyOTP();

    // Gửi OTP khi mở modal
    useEffect(() => {
        if (visible) {
            triggerOTPService({ email });
        }
        if (!visible) setOtp(["", "", "", ""]);
    }, [visible]);

    // Khi xác thực OTP thành công
    useEffect(() => {
        if (isVerifyingSuccess) {
            onNextStep && onNextStep();
            onClose && onClose();
        }
    }, [isVerifyingSuccess]);

    const handleChange = (index, value) => {
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 3) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleBackspace = (index, value) => {
        if (!value && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = () => {
        const otpString = otp.join("");
        verifyingOTP({ otp: otpString });
    };

    const handleResend = () => {
        if (!isSendingOTP) {
            triggerOTPService({ email });
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-center items-center bg-black/60">
                <View className="bg-white rounded-2xl p-6 w-11/12 max-w-md">
                    <Text className="text-xl font-bold text-gray-800 mb-2 text-center">
                        Xác minh mã OTP
                    </Text>
                    <Text className="text-gray-600 text-sm mb-4 text-center">
                        Nhập mã gồm 4 chữ số vừa được gửi đến email của bạn
                    </Text>
                    <View className="flex-row justify-center mb-4">
                        {otp.map((digit, idx) => (
                            <TextInput
                                key={idx}
                                ref={el => (inputRefs.current[idx] = el)}
                                value={digit}
                                onChangeText={val => handleChange(idx, val)}
                                onKeyPress={({ nativeEvent }) =>
                                    nativeEvent.key === "Backspace" && handleBackspace(idx, digit)
                                }
                                keyboardType="number-pad"
                                maxLength={1}
                                className="w-12 h-12 mx-1 text-center text-2xl border border-gray-300 rounded-lg"
                                style={{ color: "#222" }}
                            />
                        ))}
                    </View>
                    {(verifyError?.message || otpError?.message) ? (
                        <Text className="text-red-500 text-center mb-2">
                            {verifyError?.message || otpError?.message}
                        </Text>
                    ) : isSendingOTPSuccess ? (
                        <Text className="text-green-600 text-center mb-2">
                            OTP đã được gửi thành công!
                        </Text>
                    ) : null}
                    <TouchableOpacity
                        className="bg-[#d2af84] py-3 rounded-lg mb-2"
                        onPress={handleVerify}
                        disabled={isSendingOTP || isVerifyingLoading}
                    >
                        {(isSendingOTP || isVerifyingLoading) ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text className="text-center text-black font-semibold">
                                Xác minh
                            </Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="mb-2 mt-2"
                        onPress={handleResend}
                        disabled={isSendingOTP}
                    >
                        <Text className="text-gray-500 text-center">
                                Chưa nhận được mã? <Text className={`underline ${isSendingOTP ? "opacity-50" : ""}`}>Gửi lại mã OTP</Text>
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose}>
                        <Text className="text-center text-gray-500 mt-2 underline">
                            Đóng
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}