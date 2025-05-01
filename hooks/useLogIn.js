import { useMutation } from "@tanstack/react-query";
import { logIn } from "../services/data-service";
import { router } from "expo-router";
export function useLogIn() {
  const {
    mutate: loginFn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: logIn,
    onSuccess: (data) => {
      router.replace("/(tabs)");
    },
  });
  return {
    loginFn,
    isLoading,
    error,
  };
}
