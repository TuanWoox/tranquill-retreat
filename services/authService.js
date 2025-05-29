import axiosAuth from "@/axios/config";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export const signUp = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signUp`, data);
    return response.data;
  } catch (error) {
    const errMsg =
      error.response?.data?.message || "Không thể đăng kí tài khoản";
    throw { message: errMsg };
  }
};
export const logIn = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/logIn`, data);
    return response.data;
  } catch (error) {
    const errMsg =
      error.response?.data?.message || "Không thể đăng nhập tài khoản";
    throw { message: errMsg };
  }
};
export const validateJWT = async () => {
  // Check network status first
  const netState = await NetInfo.fetch();
  if (!netState.isConnected) {
    throw {
      message: "WiFi is turned off. Please enable your internet connection.",
    };
  }
  try {
    const response = await axiosAuth.get(`${API_URL}/auth/validateJWT`);
    return response.data;
  } catch (error) {
    let errMsg;
    if (
      error.code === "ECONNABORTED" ||
      error.code === "ENOTFOUND" ||
      error.code === "ERR_NETWORK" ||
      error.message === "Network Error"
    ) {
      errMsg =
        "Cannot connect to server. Please check your internet connection.";
    } else {
      errMsg = error.response?.data?.message || "Không thể xác thực";
    }
    throw { message: errMsg };
  }
};
export const identityVerification = async (data) => {
  try {
    const response = await axiosAuth.post(
      `${API_URL}/auth/identityVerification`,
      data
    );
    return response.data;
  } catch (error) {
    const errMsg =
      error.response?.data?.message || "Không thể xác thực danh tính";
    throw { message: errMsg };
  }
};
