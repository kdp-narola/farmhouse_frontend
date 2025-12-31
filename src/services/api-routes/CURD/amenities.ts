import axiosInstance from "@/services/axiosInstance";

export const create = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `/admin/amenities/create`,
      userData
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const update = async (aemenitiesId, userData) => {
  try {
    const response = await axiosInstance.patch(
      `/admin/amenities/update/${aemenitiesId}`,
      userData
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const deleteAmenities = async (aemenitiesId) => {
  try {
    const response = await axiosInstance.delete(
      `/admin/amenities/delete/${aemenitiesId}`,
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const amenitiesList = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `/public/amenities/list`,
      userData
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};