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
export const deleteBooking = async (id) => {
  try {
    const response = await axiosAuth.delete(
      `${API_URL}/booking/deleteBooking`,
      {
        data: {
          id,
        },
      }
    );
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || "Không thể xóa lịch";
    throw { message: errMsg };
  }
};
export const getOneBooking = async (data) => {
  try {
    const response = await axiosAuth.get(`${API_URL}/booking/getOneBooking`, {
      params: { bookingId: data },
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
export const createBooking = async (data) => {
  try {
    // Send data directly without wrapping in another object
    const response = await axiosAuth.post(
      `${API_URL}/booking/createBooking`,
      data
    );
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || "Không thể tạo lịch mới";
    throw { message: errMsg };
  }
};

export const getBookedDates = async (data) => {
  try {
    const response = await axiosAuth.get(
      `${API_URL}/booking/getBookedDates/${data}`
    );
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || "Không thể lấy lịch đã đặt";
    throw { message: errMsg };
  }
};
