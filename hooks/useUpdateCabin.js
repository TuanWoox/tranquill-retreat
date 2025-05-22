import { useMutation } from "@tanstack/react-query";
import { updateCabin } from "../services/cabinService";
import Toast from "react-native-toast-message";
import queryClient from "@/config/reactQuery";

export const useUpdateCabin = function () {
  const {
    mutate: updateCabinFn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: updateCabin,
    onSuccess: (data) => {
      queryClient.setQueryData(["cabins"], (oldValue) => {
        if (!oldValue) return [];
        return oldValue.map((item) => (item._id === data._id ? data : item));
      });

      queryClient.setQueryData(["cabin", data._id], data);

      Toast.show({
        type: "success",
        text1: "Update",
        text2: "Update Successfully",
      });
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
    updateCabinFn,
    isLoading,
    error,
  };
};
