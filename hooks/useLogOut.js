import { useMutation } from "@tanstack/react-query";
import { logOut } from "../services/data-service";
import { router } from "expo-router";
import queryClient from "@/config/reactQuery";
export function useLogOut() {
  const {
    mutate: logOutFn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: logOut,
    onSuccess: (data) => {
      queryClient.removeQueries(["userInfo"]);
      router.replace("/(tabs)");
    },
  });
  return {
    logOutFn,
    isLoading,
    error,
  };
}
