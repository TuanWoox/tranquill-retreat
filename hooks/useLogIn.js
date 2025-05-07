import { useMutation } from "@tanstack/react-query";
import { logIn } from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useAuthContext } from "@/context/AuthContext";

export function useLogIn() {
  const { dispatch } = useAuthContext();
  const {
    mutate: loginFn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: logIn,
    onMutate: () => {
      dispatch({ type: "LOGIN_REQUEST" });
    },
    onSuccess: async (data) => {
      dispatch({ type: "LOGIN_SUCCESS" });
      const token = data.token; // make sure 'token' is from the response
      await AsyncStorage.setItem("jwt", token);
      router.replace("/(tabs)");
    },
    onError: (err) => {
      const msg = error?.message || "Login failed";
      dispatch({ type: "LOGIN_FAILURE", payload: msg });
    },
  });

  return {
    loginFn,
    isLoading,
    error,
  };
}
