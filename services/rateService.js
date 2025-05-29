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
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || "Failed to fetch ratings";
    throw { message: errMsg };
  }
};

export const getRatingByBookingId = async (bookingId) => {
  try {
    const response = await axiosAuth.get(
      `${API_URL}/rating/${bookingId}/getRateByBookingId`
    );
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || "Failed to fetch rating";
    throw { message: errMsg };
  }
};

export const updateRating = async (ratingId, updatedData) => {
  try {
    // Make sure ratingId is properly formatted and not undefined
    if (!ratingId) {
      throw new Error("Rating ID is required for updates");
    }

    const response = await axiosAuth.put(
      `${API_URL}/rating/${ratingId}/updateRate`,
      {
        rating: updatedData.rating,
        comment: updatedData.comment,
      }
    );

    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || "Failed to update rating";
    throw { message: errMsg };
  }
};

export const deleteRating = async (ratingId) => {
  try {
    const response = await axiosAuth.delete(
      `${API_URL}/rating/${ratingId}/deleteRate`
    );
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message || "Failed to delete rating";
    throw { message: errMsg };
  }
};
