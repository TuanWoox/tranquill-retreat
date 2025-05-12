import { useMutation } from "@tanstack/react-query";
import { updateSetting } from "../services/settingService";
import Toast from "react-native-toast-message";
import queryClient from "@/config/reactQuery";
export const useUpdateSetting = () => {
  const {
    mutate: updateSettingFn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: updateSetting,
    onSuccess: (data) => {
      queryClient.setQueryData(["settings"], data);
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
    updateSettingFn,
    isLoading,
    error,
  };
};
