import axiosInstance from "@/services/axiosInstance";

export const create = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `/owner/property/create`,
      userData,
      {
        headers: {'Content-Type':'multipart/form-data'}
      }
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const update = async (propertyId, userData) => {
  try {
    const response = await axiosInstance.patch(
      `/owner/property/update/${propertyId}`,
      userData,
      {
        headers: {'Content-Type':'multipart/form-data'}
      }
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const deleteProperty = async (propertyId) => {
  try {
    const response = await axiosInstance.delete(
      `/owner/property/delete/${propertyId}`,
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const propertyList = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `/public/property`,
      userData
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const ownrPropertyList = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `/owner/myProperties`,
      userData
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const propertyDetails = async (propertyId) => {
  try {
    const response = await axiosInstance.get(
      `/public/property/${propertyId}`,
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const categoryList = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `/public/category/list`,
      userData
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const houseRuleList = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `/public/houserule/list`,
      userData
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};
