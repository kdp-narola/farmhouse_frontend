import axiosInstance from "@/services/axiosInstance";

export const create = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `/admin/category/create`,
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
      `/admin/category/update/${categoryId}`,
      userData
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.delete(
      `/admin/category/delete/${categoryId}`,
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};
