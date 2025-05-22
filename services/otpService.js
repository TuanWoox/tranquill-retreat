import axios from "axios";
const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export const createOTP = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/otp/createOTP`, data);
        return response.data;
    } catch (error) {
        const errMsg = error.response?.data?.message || "Không thể gửi OTP";
        const field = error.response?.data?.field;
        throw { message: errMsg, field };
    }
};

export const verifyOTP = async (data) => {
    try {
        const response = await axios.get(`${API_URL}/otp/verifyOTP`, {
            withCredentials: true,
            params: { otp: data.otp }, // Send OTP as query parameter
        });
        return response.data;
    } catch (error) {
        const errMsg =
            error.response?.data?.message || "Không thể xác thực OTP";
        const field = error.response?.data?.field;
        throw { message: errMsg, field };
    }
};
