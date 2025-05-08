import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../services/userService";
import queryClient from "../config/reactQuery";
import Toast from "react-native-toast-message";
export const useUpdateProfile = function () {
  const {
    mutate: updateProfileFn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["userInfo"]);
      Toast.show({
        type: "success",
        text1: "Cập nhật",
        text2: "Cập nhật thành công",
      });
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: err?.message || "Có lỗi xảy ra khi cập nhật",
      });
    },
  });
  return {
    updateProfileFn,
    isLoading,
    error,
  };
};
