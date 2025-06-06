import axios from "axios";
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
export const getOneCabin = async ({ cabinId }) => {
  try {
    const response = await axios.get(`${API_URL}/cabin/getOneCabin`, {
      params: { cabinId },
    });
    return response.data;
  } catch (err) {
    const errMsg = err.response?.data?.message || "Không thể nhân bản cabin";
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
export const duplicateCabin = async (id) => {
  try {
    const reponse = await axiosAuth.post(`${API_URL}/cabin/duplicateCabin`, {
      id,
    });
    return reponse.data;
  } catch (err) {
    const errMsg = err.reponse?.data?.message || "Không thể nhân bản cabin";
    throw { message: errMsg };
  }
};
export const createCabin = async (data) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const reponse = await axiosAuth.post(
      `${API_URL}/cabin/createCabin`,
      data,
      config
    );
    return reponse.data;
  } catch (err) {
    const errMsg = err.reponse?.data?.message || "Không thể tạo cabin";
    throw { message: errMsg };
  }
};
export const updateCabin = async (data) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const reponse = await axiosAuth.put(
      `${API_URL}/cabin/updateCabin`,
      data,
      config
    );
    return reponse.data;
  } catch (err) {
    const errMsg = err.reponse?.data?.message || "Không thể tạo cabin";
    throw { message: errMsg };
  }
};
