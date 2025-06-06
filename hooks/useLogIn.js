import { useMutation } from "@tanstack/react-query";
import { logIn } from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
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

    onSuccess: async (data) => {
      dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
      const token = data.token; // make sure 'token' is from the response
      await AsyncStorage.setItem("jwt", token);

      router.replace("/(tabs)");
    },
    onError: (err) => {
      const msg = error?.message || "Login failed";
      dispatch({ type: "LOGIN_FAILURE", payload: msg });
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err?.message || "There was error during login process",
      });
    },
  });

  return {
    loginFn,
    isLoading,
    error,
  };
}
