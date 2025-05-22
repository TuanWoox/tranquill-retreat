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
export const updateProfile = async (data) => {
  try {
    const response = await axiosAuth.put(`${API_URL}/user/updateProfile`, data);
    return response.data;
  } catch (error) {
    const errMsg =
      error.response?.data?.message || "Không thể cập nhật thông tin";
    throw { message: errMsg };
  }
};
export const resetPassword = async (data) => {
    try {
        const response = await axiosAuth.post(
            `${API_URL}/user/resetPassword`,
            data, 
            {
                withCredentials: true,
            },
        );
        return response.data;
    } catch (error) {
        const errMsg =
            error.response?.data?.message || "Không thể đặt lại mật khẩu";
        throw { message: errMsg };
    }
};