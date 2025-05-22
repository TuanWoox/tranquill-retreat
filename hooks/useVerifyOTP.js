import { useMutation } from "@tanstack/react-query";
import { verifyOTP } from "../services/otpService";
import Toast from "react-native-toast-message";

export default function useVerifyOTP() {
  const {
    mutate: verifyingOTP,
    isLoading: isVerifyingLoading,
    isError: isVerifyingError,
    isSuccess: isVerifyingSuccess,
    error: verifyError,
    data: verifyData,
  } = useMutation({
    mutationFn: (data) => verifyOTP(data),
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Thành công",
        text2: "Vui lòng đặt lại mật khẩu!",
        position: "top",
        visibilityTime: 3000,
      });
    },
    onError: (error) => {
      // console.error("Error verifying OTP:", error.message);
    },
  });

  // Return the mutation functions and states
  return {
    verifyingOTP,
    isVerifyingLoading,
    isVerifyingSuccess,
    isVerifyingError,
    verifyError,
    verifyData,
  };
}
