import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../services/userService";
import queryClient from "../config/reactQuery";
import Toast from "react-native-toast-message";
import { useAuthContext } from "@/context/AuthContext";
export const useUpdateProfile = function () {
  const { dispatch } = useAuthContext();
  const {
    mutate: updateProfileFn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["userInfo"], data.updatedUser);
      Toast.show({
        type: "success",
        text1: "Update",
        text2: "Update Successfully",
      });
      dispatch({ type: "UPDATE", payload: data.user });
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Update",
        text2: err?.message || "Fail to update",
      });
    },
  });
  return {
    updateProfileFn,
    isLoading,
    error,
  };
};
