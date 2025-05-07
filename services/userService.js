import axiosAuth from "../axios/config";
const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export const getInformation = async () => {
  try {
    const response = await axiosAuth.get(`${API_URL}/user/getInformation`);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || "Không thể lấy thông tin";
    throw { message: errMsg };
  }
};
