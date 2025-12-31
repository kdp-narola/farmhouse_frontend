import {
  customerUpcomingBooking,
  propertyBookingRequest,
  upcomingBookingDetails,
  verifyPayment,
} from "@/services/api-routes/booking";
import { createContext, useContext, useEffect, useState } from "react";

const BookingContext = createContext({});

const BookingProvider = ({ children }) => {
  const [upComingBooking, setUpComingBooking] = useState([]);
  const [upComingBookingLoading, setUpComingBookingLoading] = useState(false);

  const [UpcomingBookinDetail, setUpcomingBookinDetail] = useState("");
  const [UpcomingBookinDetailLoading, setUpcomingBookinDetailLoading] =
    useState(false);

  const [propertyBookingRequestList, setPropertyBookingRequestList] = useState(
    []
  );
  const [
    propertyBookingRequestListLoading,
    setPropertyBookingRequestListLoading,
  ] = useState(false);

  const [verifyPaymentDetail, setVerifyPaymentDetail] = useState("");
  const [deniedPaymentDetail, setDeniedPaymentDetail] = useState("");

  const getUpComingBookingList = async () => {
    setUpComingBookingLoading(true);
    try {
      const res = await customerUpcomingBooking();
      setUpComingBooking(res.data.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setUpComingBookingLoading(false);
    }
  };

  const getUpcomingBookingDetails = async (reservationId) => {
    setUpcomingBookinDetailLoading(true);
    try {
      const res = await upcomingBookingDetails(reservationId);
      setUpcomingBookinDetail(res.data.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setUpcomingBookinDetailLoading(false);
    }
  };

  const getPropertyBookingRequestList = async (propertyId) => {
    setPropertyBookingRequestListLoading(true);
    try {
      const res = await propertyBookingRequest(propertyId);
      setPropertyBookingRequestList(res.data.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setPropertyBookingRequestListLoading(false);
    }
  };

  const getVerifiedPaymentDetail = async (response) => {
    try {
      const res = await verifyPayment(response);
      setVerifyPaymentDetail(res.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const getDeniedPaymentDetail = async (response) => {
    try {
      const res = await verifyPayment(response);
      setDeniedPaymentDetail(res.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  // useEffect(()=>{
  //   getPropertyBookingRequestList("6932a98f3aee918144342bcb")
  // },[])

  return (
    <BookingContext.Provider
      value={{
        upComingBooking,
        upComingBookingLoading,
        getUpComingBookingList,
        UpcomingBookinDetail,
        UpcomingBookinDetailLoading,
        getUpcomingBookingDetails,
        propertyBookingRequestList,
        propertyBookingRequestListLoading,
        getPropertyBookingRequestList,
        verifyPaymentDetail,
        getVerifiedPaymentDetail,
        deniedPaymentDetail,
        getDeniedPaymentDetail,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

const useBooking = () => {
  return useContext(BookingContext);
};

export { BookingProvider, BookingContext, useBooking };
