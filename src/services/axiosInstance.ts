import { ACCESS_TOKEN } from "@/constant/constant";
import axios from "axios";
import { toast } from "sonner";

const baseURL = import.meta.env.VITE_API_ENDPOINT;

const axiosInstance = axios.create({
  baseURL,
  headers: { "Content-type": "application/json" },

});

const requestHandler = (config) => {
  const token = localStorage.getItem(ACCESS_TOKEN)
  config.headers.Authorization = token ? `Bearer ${token}` : null;
  return Promise.resolve(config);
};

axiosInstance.interceptors.request.use(
  (config) => requestHandler(config),
  (error) => Promise.reject(error)
);

const errorHandler = async (error) => {
  const errorMessage = error?.response?.data?.message || "Network error - something went wrong";
  toast.error(errorMessage)
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => errorHandler(error)
);

export default axiosInstance;
