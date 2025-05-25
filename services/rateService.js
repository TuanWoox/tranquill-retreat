import axiosAuth from "@/axios/config";

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export const submitRating = async (ratingData) => {
  try {
    const response = await axiosAuth.post(
      `${API_URL}/rating/rateCabin`,
      ratingData
    );
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || "Failed to submit rating";
    throw { message: errMsg };
  }
};

export const getRatingsByCabinId = async (cabinId) => {
  try {
    const response = await axiosAuth.get(
      `${API_URL}/rating/${cabinId}/cabinRatings`
    );
    console.log("Ratings response:", response.data);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || "Failed to fetch ratings";
    throw { message: errMsg };
  }
};
