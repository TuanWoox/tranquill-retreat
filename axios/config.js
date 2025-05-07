// services/axiosAuth.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create base instance
const axiosAuth = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include JWT
axiosAuth.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosAuth;
