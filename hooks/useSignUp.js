import { useMutation } from "@tanstack/react-query";
import { signUp } from "../services/data-service";
import { router } from "expo-router";

export function useSignUp() {
  const {
    mutate: signUpFn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      // Navigate to login screen after successful sign-up
      router.replace("/auth/login"); // added slash for clarity
    },
  });

  return {
    signUpFn,
    isLoading,
    error,
  };
}
