import { useMutation } from "@tanstack/react-query";
import queryClient from "../config/reactQuery";
import { deleteCabin } from "../services/cabinService";
import Toast from "react-native-toast-message";
export const useDeleteCabin = function () {
  const {
    mutate: deleteCabinFn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: (data) => {
      queryClient.setQueryData(["cabins"], (oldValue) => {
        if (!oldValue) return [];
        return oldValue.filter((item) => item._id !== data._id);
      });
      Toast.show({
        type: "success",
        text1: "Delete",
        text2: "Delete Successfully",
      });
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Delete",
        text2: "Fail to delete",
      });
    },
  });
  return {
    deleteCabinFn,
    isLoading,
    error,
  };
};
