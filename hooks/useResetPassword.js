import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../services/userService";
import Toast from "react-native-toast-message";

export default function useResetPassword() {
  const {
    mutate: resetPW,
    isLoading: isResetting,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: (data) => resetPassword(data),
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Thành công",
        text2: "Đặt lại mật khẩu thành công!",
        position: "top",
        visibilityTime: 3000,
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Thất bại",
        text2: `Đặt lại mật khẩu thất bại: ${error.message}`,
        position: "top",
        visibilityTime: 3000,
      });
    },
  });

  return {
    resetPassword: resetPW,
    isResetting,
    isSuccess,
    isError,
    error,
    data,
  };
}