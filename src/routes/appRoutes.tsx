import AdminDashboard from "@/pages/Admin/AdminDashboard";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import LoginPage from "@/pages/Auth/LoginPage";
import OTPVerification from "@/pages/Auth/OTPVerification";
import RegisterPage from "@/pages/Auth/RegisterPage";
import ResetPassword from "@/pages/Auth/ResetPassword";
import UserProfile from "@/pages/Auth/UserProfile";
import BookingSuccess from "@/pages/Customer/BookingSuccess";
import CustomerDashboard from "@/pages/Customer/CustomerDashboard";
import PropertyDetail from "@/pages/Customer/PropertyDetail";
import WishlistPage from "@/pages/Customer/Wishlist";
import AddProperty from "@/pages/AddProperty";
import OwnerDashboard from "@/pages/Owner/OwnerDashboard";
import { USER_ROLE } from "@/constant/constant";
import PropertyResource from "@/pages/Admin/PropertyResource";
import PropertyListing from "@/pages/Customer/PropertyListing";
import UserList from "@/pages/Admin/UserDetails";
import ManageBookings from "@/pages/ManageBookings";
import ManagePendingBooking from "@/pages/ManagePendingBooking";

export const AUTH_ROUTES = [
  {
    path: "/auth/profile",
    element: <UserProfile />,
    isRouteAccessible: true,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
    isRouteAccessible: true,
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
    isRouteAccessible: true,
  },
  {
    path: "/auth/otp-verify",
    element: <OTPVerification />,
    isRouteAccessible: true,
  },
  {
    path: "/auth/forgot-pass",
    element: <ForgotPassword />,
    isRouteAccessible: true,
  },
  {
    path: "/auth/reset-pass",
    element: <ResetPassword />,
    isRouteAccessible: true,
  },
];

export const PROPERTY_ROUTES = [
  {
    path: "/property",
    element: <PropertyListing />,
    isRouteAccessible: true,
  },
  {
    path: "/booking-success",
    element: <BookingSuccess />,
    isRouteAccessible: true,
  },
  {
    path: "/property-detail/:id",
    element: <PropertyDetail />,
    isRouteAccessible: true,
  },
  {
    path: "/wishlist",
    element: <WishlistPage />,
    isRouteAccessible: true,
  },
  {
    path: "/add-property",
    element: <AddProperty />,
    isRouteAccessible: false,
    accessBy: [USER_ROLE.OWNER, USER_ROLE.ADMIN],
  },
  {
    path: "/resource-manage",
    element: <PropertyResource />,
    isRouteAccessible: false,
    accessBy: [USER_ROLE.ADMIN],
  },
  {
    path: "/booking-manage",
    element: <ManageBookings />,
    isRouteAccessible: false,
    accessBy: [USER_ROLE.ADMIN, USER_ROLE.OWNER, USER_ROLE.CUSTOMER],
  },
  {
    path: "/pending-bookings",
    element: <ManagePendingBooking />,
    isRouteAccessible: false,
    accessBy: [USER_ROLE.ADMIN, USER_ROLE.OWNER, USER_ROLE.CUSTOMER],
  },
  {
    path: "/admin-users",
    element: <UserList />,
    isRouteAccessible: false,
    accessBy: [USER_ROLE.ADMIN],
  },
];

export const DASHBOARD_ROUTES = [
  {
    path: "/customer/dashboard",
    element: <CustomerDashboard />,
    isRouteAccessible: false,
    accessBy: USER_ROLE.CUSTOMER,
  },
  {
    path: "/owner/dashboard",
    element: <OwnerDashboard />,
    isRouteAccessible: false,
    accessBy: USER_ROLE.OWNER,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    isRouteAccessible: false,
    accessBy: USER_ROLE.ADMIN,
  },
];
