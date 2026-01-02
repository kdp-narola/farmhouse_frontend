import { dashboardDetails, userRecords } from "@/services/api-routes/admin";
import { reservationListing } from "@/services/api-routes/booking";
import { amenitiesList } from "@/services/api-routes/CURD/amenities";
import {
  categoryList,
  houseRuleList,
  ownrPropertyList,
  pendingApprovalProperties,
  propertyDetails,
  propertyList,
} from "@/services/api-routes/property";
import { createContext, useContext, useState } from "react";

const ListingContext = createContext({});

const ListingProvider = ({ children }) => {
  const [propertyLoading, setPropertyLoading] = useState(false);
  const [property, setProperty] = useState([]);
  const [propertyFilter, setPropertyFilter] = useState({});
  const [propertyPagination, setPropertyPagination] = useState({});

  const [ownerPropertyLoading, setOwnerPropertyLoading] = useState(false);
  const [ownerProperty, setOnerProperty] = useState("");

  const [propertyDetailLoading, setPropertyDetailLoading] = useState(false);
  const [propertyDetail, setPropertyDetail] = useState("");

  const [amenitiesLoading, setAmenitiesLoading] = useState(false);
  const [amenities, setAmenities] = useState([]);

  const [categoryLoading, setCategoryLoading] = useState(false);
  const [category, setCategory] = useState([]);

  const [houseRuleLoading, setHouseRuleLoading] = useState(false);
  const [houserule, setHouserule] = useState([]);

  const [adminDashboardDetailLoading, setAdminDashboardDetailLoading] =
    useState(false);
  const [adminDashboardDetail, setAdminDashboardDetail] = useState({});

  const [userListLoading, setUserListLoading] = useState(false);
  const [userList, setUserList] = useState({});

  const [reservationListLoading, setReservationListLoading] = useState(false);
  const [reservationList, setReservationList] = useState([]);
  const [reservationListPagination, setReservationListPagination] = useState(
    {}
  );

  const [pendingApprovalPropertyLoading, setPendingApprovalPropertyLoading] =
    useState(false);
  const [pendingApprovalProperty, setPendingApprovalProperty] = useState([]);
  const [
    pendingApprovalPropertyPagination,
    setPendingApprovalPropertyPagination,
  ] = useState({});

  const getPropertyList = async (userData) => {
    setPropertyLoading(true);
    try {
      const res = await propertyList(userData);
      setProperty(res.data.data.data);
      setPropertyPagination(res.data.data.pagination);
      setPropertyFilter(res.data.data.filterInformation);
    } catch (error) {
      console.log("error", error);
    } finally {
      setPropertyLoading(false);
    }
  };

  const getOwnerPropertyList = async (userData) => {
    setOwnerPropertyLoading(true);
    try {
      const res = await ownrPropertyList(userData);
      setOnerProperty(res.data.data.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setOwnerPropertyLoading(false);
    }
  };

  const getPropertyDetails = async (propertyId) => {
    setPropertyDetailLoading(true);
    try {
      const res = await propertyDetails(propertyId);
      setPropertyDetail(res.data.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setPropertyDetailLoading(false);
    }
  };

  const getAmenitiesList = async (userData) => {
    setAmenitiesLoading(true);
    try {
      const res = await amenitiesList(userData);
      setAmenities(res.data.data.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setAmenitiesLoading(false);
    }
  };

  const getCategoryList = async (userData) => {
    setCategoryLoading(true);
    try {
      const res = await categoryList(userData);
      setCategory(res.data.data.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setCategoryLoading(false);
    }
  };

  const getHouseruleList = async (userData) => {
    setHouseRuleLoading(true);
    try {
      const res = await houseRuleList(userData);
      setHouserule(res.data.data.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setHouseRuleLoading(false);
    }
  };

  const getAdminDashboardDetail = async () => {
    setAdminDashboardDetailLoading(true);
    try {
      const res = await dashboardDetails();
      setAdminDashboardDetail(res.data.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setAdminDashboardDetailLoading(false);
    }
  };

  const getUserList = async (userData) => {
    setUserListLoading(true);
    try {
      const res = await userRecords(userData);
      setUserList(res.data.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setUserListLoading(false);
    }
  };

  const getReservationList = async (userData) => {
    setReservationListLoading(true);
    try {
      const res = await reservationListing(userData);
      setReservationList(res.data.data.data);
      setReservationListPagination(res.data.data.pagination);
    } catch (error) {
      console.log("error", error);
    } finally {
      setReservationListLoading(false);
    }
  };

  const getpendingApprovalProperties = async (userData) => {
    setPendingApprovalPropertyLoading(true);
    try {
      const res = await pendingApprovalProperties(userData);
      setPendingApprovalProperty(res.data.data.data);
      setPendingApprovalPropertyPagination(res.data.data.pagination);
    } catch (error) {
      console.log("error", error);
    } finally {
      setPendingApprovalPropertyLoading(false);
    }
  };

  return (
    <ListingContext.Provider
      value={{
        property,
        propertyPagination,
        propertyFilter,
        propertyLoading,
        getPropertyList,
        propertyDetail,
        propertyDetailLoading,
        getPropertyDetails,
        amenities,
        amenitiesLoading,
        getAmenitiesList,
        category,
        categoryLoading,
        getCategoryList,
        houserule,
        houseRuleLoading,
        getHouseruleList,
        ownerProperty,
        ownerPropertyLoading,
        getOwnerPropertyList,
        adminDashboardDetail,
        adminDashboardDetailLoading,
        getAdminDashboardDetail,
        userListLoading,
        userList,
        getUserList,
        reservationListLoading,
        reservationListPagination,
        reservationList,
        getReservationList,
        pendingApprovalPropertyLoading,
        pendingApprovalProperty,
        pendingApprovalPropertyPagination,
        getpendingApprovalProperties,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};

const useList = () => {
  return useContext(ListingContext);
};

export { ListingProvider, ListingContext, useList };
