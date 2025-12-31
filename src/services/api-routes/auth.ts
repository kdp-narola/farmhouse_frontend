import axiosInstance from "../axiosInstance";

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post(
      "/authentication/register",
      userData
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post(
      "/authentication/login",
      userData
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const otpVerification = async (userData) => {
  try {
    const response = await axiosInstance.post(
      "/authentication/verify-otp",
      userData
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const resendOTP = async () => {
  try {
    const response = await axiosInstance.post(
      "/authentication/resend-otp",
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const forgotPass = async (userData) => {
  try {
    const response = await axiosInstance.post(
      "/authentication/forgot-password",
      userData
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const resetPass = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `/authentication/reset-password`,
      userData
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const changePass = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `/authentication/change-password`,
      userData
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const profileMe = async () => {
  try {
    const response = await axiosInstance.get(
      `/authentication/profile-me`,
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};