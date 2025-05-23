import { useMutation } from "@tanstack/react-query";
import { changePassword as changePasswordService } from "../services/userService";
import Toast from "react-native-toast-message";

export default function useChangePassword() {
  const {
    mutate: changePassword,
    isLoading: isSubmitting,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation({
    // Nhận { oldPassword, newPassword } từ form, truyền đúng tham số cho service
    mutationFn: ({ oldPassword, newPassword }) =>
      changePasswordService(oldPassword, newPassword),
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Thành công",
        text2: "Đổi mật khẩu thành công!",
        position: "top",
        visibilityTime: 3000,
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Thất bại",
        text2: error.message || "Đổi mật khẩu thất bại",
        position: "top",
        visibilityTime: 3000,
      });
    },
  });

  return {
    changePassword,
    isSubmitting,
    isSuccess,
    isError,
    error,
    data,
  };
}