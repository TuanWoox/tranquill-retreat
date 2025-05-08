import axiosAuth from "@/axios/config";
const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export const getAllBookings = async () => {
  try {
    const response = await axiosAuth.get(`${API_URL}/booking/getAllBookings`);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || "Không thể lấy lịch";
    throw { message: errMsg };
  }
};
export const deleteBooking = async (data) => {
  try {
    const response = await axiosAuth.post(
      `${API_URL}/booking/deleteBooking`,
      data
    );
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || "Không thể xóa lịch";
    throw { message: errMsg };
  }
};
export const getOneBooking = async (data) => {
  const [_id, bookingId] = data.queryKey;
  try {
    const response = await axiosAuth.post(`${API_URL}/booking/getOneBooking`, {
      bookingId,
    });
    return response.data;
  } catch (error) {
    const errMsg =
      error.response?.data?.message || "Không thể lấy chi tiết 1 lịch";
    throw { message: errMsg };
  }
};
export const updateBooking = async (data) => {
  try {
    const response = await axiosAuth.post(`${API_URL}/booking/updateBooking`, {
      data,
    });
    return response.data;
  } catch (error) {
    const errMsg =
      error.response?.data?.message || "Không thể lấy chi tiết 1 lịch";
    throw { message: errMsg };
  }
};
