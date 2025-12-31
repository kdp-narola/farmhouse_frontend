import axiosInstance from "@/services/axiosInstance";

export const create = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `/admin/houserule/create`,
      userData
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const update = async (categoryId, userData) => {
  try {
    const response = await axiosInstance.patch(
      `/admin/houserule/update/${categoryId}`,
      userData
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const deleteHouseRules = async (categoryId) => {
  try {
    const response = await axiosInstance.delete(
      `/admin/houserule/delete/${categoryId}`,
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};
