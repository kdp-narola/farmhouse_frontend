import axiosInstance from "@/services/axiosInstance";

export const propertyBooking = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `/reservation/bookProperty`,
      userData
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const availableSlots = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `/public/availableSlot`,
      userData
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const customerUpcomingBooking = async () => {
  try {
    const response = await axiosInstance.get(
      "/reservation/customer-upcoming-reservation"
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const upcomingBookingDetails = async (reservationId) => {
  try {
    const response = await axiosInstance.get(
      `/reservation/details/${reservationId}`
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const propertyBookingRequest = async (propertyId) => {
  try {
    const response = await axiosInstance.get(
      `/owner/reservation/${propertyId}`
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const slotBookingList = async (userData) => {
  try {
    const response = await axiosInstance.post(`/bookings`, userData);
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const verifyPayment = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `/reservation/verifyPayment`,
      userData
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const deniedPayment = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `/reservation/deniedPayment`,
      userData
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const pendingReservationAction = async (reservationId, userData) => {
  try {
    const response = await axiosInstance.patch(
      `/reservation/${reservationId}`,
      userData
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};

export const pendingReservationListing = async (userData) => {
  try {
    const response = await axiosInstance.post(
      `/reservation/pendingReservationDetails`,
      userData
    );
    return response;
  } catch (error) {
    throw error || "Unknown Error";
  }
};
