import axiosInstance from "../axiosInstance";

export const userRecords = async (userData) => {
  try {
    const response = await axiosInstance.post("/admin/users/list", userData);
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const dashboardDetails = async () => {
  try {
    const response = await axiosInstance.get("/statistics");
    // const response = await axiosInstance.get("/admin/dashboardDetails");
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};
