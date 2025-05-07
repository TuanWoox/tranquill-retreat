import { useAuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import queryClient from "../config/reactQuery";

export const useLogOut = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("jwt");
      queryClient.removeQueries(["userInfo"]);
    } catch (err) {
      console.error("Failed to remove JWT or clear cache", err);
    }
    dispatch({ type: "LOGOUT" });
  };

  return logout; // ✅ return the function properly
};
