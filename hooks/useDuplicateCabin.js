import { useMutation } from "@tanstack/react-query";
import queryClient from "../config/reactQuery";
import { duplicateCabin } from "../services/cabinService";
import Toast from "react-native-toast-message";
export const useDuplicateCabin = () => {
  const {
    mutate: duplicateCabinFn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: duplicateCabin,
    onSuccess: (data) => {
      queryClient.setQueryData(["cabins"], (oldValue) => {
        return [...oldValue, data];
      });
      Toast.show({
        type: "success",
        text1: "Nhân bản",
        text2: "Nhân bản thành công",
      });
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Nhân bản",
        text2: "Nhân bản thất bại",
      });
    },
  });
  return {
    duplicateCabinFn,
    isLoading,
    error,
  };
};
