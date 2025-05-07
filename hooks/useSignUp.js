import { useMutation } from "@tanstack/react-query";
import { signUp } from "../services/authService";
import { router } from "expo-router";

export function useSignUp() {
  const {
    mutate: signUpFn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      router.replace("/auth/login");
    },
  });

  return {
    signUpFn,
    isLoading,
    error,
  };
}
