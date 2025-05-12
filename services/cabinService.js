import axiosAuth from "../axios/config";
const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export const getAllCabins = async () => {
  try {
    const response = await axiosAuth.get(`${API_URL}/cabin/getAllCabins`);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || "Không thể lấy cabin";
    throw { message: errMsg };
  }
};
export const deleteCabin = async (id) => {
  try {
    const reponse = await axiosAuth.delete(`${API_URL}/cabin/deleteCabin`, {
      data: {
        id,
      },
    });
    return reponse.data;
  } catch (err) {
    const errMsg = err.reponse?.data?.message || "Không thể xóa cabin";
    throw { message: errMsg };
  }
};
