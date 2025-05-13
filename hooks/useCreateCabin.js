import { useMutation } from "@tanstack/react-query";
import queryClient from "../config/reactQuery";
import { createCabin } from "../services/cabinService";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

export const useCreateCabin = () => {
  const router = useRouter();

  const {
    mutate: createCabinFn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: createCabin,
    onSuccess: (data) => {
      queryClient.setQueryData(["cabins"], (oldValue) => {
        return [...(oldValue || []), data]; // Safe check for null oldValue
      });

      Toast.show({
        type: "success",
        text1: "Tạo",
        text2: "Tạo thành công",
      });

      router.back(); // 👈 Go back instead of replace
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Tạo",
        text2: "Tạo thất bại",
      });
    },
  });

  return {
    createCabinFn,
    isLoading,
    error,
  };
};
