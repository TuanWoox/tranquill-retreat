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
        text1: "Duplicate",
        text2: "Duplicate Successfully",
      });
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Duplicate",
        text2: "Fail to duplicate",
      });
    },
  });
  return {
    duplicateCabinFn,
    isLoading,
    error,
  };
};
