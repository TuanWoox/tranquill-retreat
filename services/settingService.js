import axiosAuth from "@/axios/config";
import axios from "axios";
const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export const getSetting = async () => {
  try {
    const response = await axios.get(`${API_URL}/setting/getSetting`);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || "Không thể lấy thiết lập";
    throw { message: errMsg };
  }
};
export const updateSetting = async (data) => {
  try {
    const response = await axiosAuth.post(`${API_URL}/setting/updateSetting`, {
      ...data,
    });
    return response.data;
  } catch (error) {
    const errMsg =
      error.response?.data?.message || "Không thể chỉnh sửa thiết lập";
    throw { message: errMsg };
  }
};
