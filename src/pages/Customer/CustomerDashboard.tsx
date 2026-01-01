import Navbar from "@/components/Navbar";
import StatusAndIcon from "@/components/StatusAndIcon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/BookingContext";
import { useList } from "@/contexts/ListingContext";
import {
  Calendar,
  MapPin,
  CreditCard,
  Heart,
  MessageCircle,
  Search,
  User,
  Clock,
} from "lucide-react";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ActionCard = ({
  icon: Icon,
  title,
  description,
  onNavigate,
  bgFrom,
  bgTo,
  textColor,
}) => {
  return (
    <Card
      onClick={onNavigate}
      // className={`text-center bg-gradient-to-br from-yellow-500 to-pink-400 text-${textColor} p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer`}
      className={`text-center bg-gradient-to-br ${bgFrom} ${bgTo} text-${textColor} p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer`}
    >
      <Icon className="w-6 h-6" />
      <p className="font-bold text-lg">{title}</p>
      <p className={`text-sm`}>{description}</p>
    </Card>
  );
};

const StatItem = ({ value, label, borderColor }) => {
  return (
    <div className={`border-l-4 pl-4 border-${borderColor}-500`}>
      <p className="text-xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
};

const CustomerDashboard = () => {
  const { authUser } = useAuth();
  const { getUpComingBookingList, upComingBooking } = useBooking();
  const {
    getAdminDashboardDetail,
    adminDashboardDetail,
    getPendingApprovalsList,
    pendingProperties,
  } = useList();
  console.log("pendingProperties", pendingProperties);

  const onNavigate = useNavigate();
  const baseURL = import.meta.env.VITE_IMAGE_ENDPOINT;

  useEffect(() => {
    const payload = {
      options: {
        page: 1,
        limit: 3,
        sort: { checkIn: -1 },
        select: "title address.city address.state pricePerDay images",
      },
    };
    getPendingApprovalsList(payload);
    getAdminDashboardDetail();
    getUpComingBookingList();
  }, []);

  function convertUTC(utcString, timeZone) {
    const m = moment.utc(utcString).tz(timeZone);
    return {
      date: m.format("DD/MM/YYYY"),
      time: m.format("HH:mm"),
    };
  }
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-violet-50">
      <Navbar />

      <div className="mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            <span className="text-gray-800">Welcome back, </span>
            <span className="bg-gradient-to-r from-teal-600 to-violet-600 bg-clip-text text-transparent capitalize">
              {authUser?.fullName?.split(" ")[0] || "Customer"}!
            </span>
          </h1>
          <p className="text-gray-600">Discover your next creative space</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <ActionCard
            icon={Search}
            title="Explore"
            description="Find spaces"
            onNavigate={() => onNavigate("/property")}
            bgFrom="from-teal-500"
            bgTo="to-teal-400"
            textColor="white"
          />

          <ActionCard
            icon={Heart}
            title="Wishlist"
            description="Saved places"
            onNavigate={() => onNavigate("/wishlist")}
            bgFrom="from-pink-500"
            bgTo="to-pink-400"
            textColor="white"
          />

          <ActionCard
            icon={MessageCircle}
            title="My Bookings"
            description="View all reservations"
            onNavigate={() => onNavigate("/booking-manage")}
            bgFrom="from-violet-500"
            bgTo="to-violet-400"
            textColor="white"
          />

          <ActionCard
            icon={User}
            title="Profile"
            description="Manage account"
            onNavigate={() => onNavigate("/auth/profile")}
            bgFrom="from-yellow-500"
            bgTo="to-yellow-400"
            textColor="white"
          />
        </div>

        {/* <div className="grid md:grid-cols-3 gap-8"> */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Upcoming Bookings
                </h2>
                <Button
                  variant={"link"}
                  onClick={() => onNavigate("/pending-bookings")}
                  className="text-violet-600 hover:text-violet-700"
                >
                  View All
                </Button>
              </div>

              {pendingProperties?.length > 0 ? (
                <div className="space-y-4 ">
                  {/* <div className="space-y-6 md:h-[60vh] overflow-auto"> */}
                  {pendingProperties?.map((property) => {
                    const checkinDate = convertUTC(
                      property?.checkIn,
                      userTimeZone
                    );
                    const checkoutDate = convertUTC(
                      property?.checkOut,
                      userTimeZone
                    );

                    return (
                      <div
                        key={property?._id}
                        // className="flex gap-6 p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition cursor-pointer"
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition cursor-pointer"
                      >
                        {/* Image */}
                        {/* <div className="flex-shrink-0 aspect-square w-48 rounded-xl overflow-hidden"> */}
                        <div className="flex-shrink-0 aspect-square w-full sm:w-40 md:w-48 rounded-xl overflow-hidden">
                          <img
                            src={`${baseURL}/${property?.property?.images[0]}`}
                            alt={property?.property?.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Right Content */}
                        <div className="flex flex-col items-start gap-2">
                          {/* Top Row: Title/Location + Amount */}
                          <div className="">
                            {/* Left Section: Title + Location */}
                            <div className="">
                              <h3 className="font-bold text-gray-800 mb-1 capitalize">
                                {property?.property?.title}
                              </h3>

                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">
                                  {property?.property?.address?.city},{" "}
                                  {property?.property?.address?.state}
                                </span>
                              </div>
                              <p className="font-bold text-lg sm:text-2xl text-violet-600 whitespace-nowrap">
                                ${property?.finalAmount}
                              </p>
                            </div>

                            {/* Right Section: Price + Booking Type */}
                            {/* <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-1 flex-shrink-0">
                              <p className="font-bold text-lg sm:text-2xl text-violet-600 whitespace-nowrap">
                                ${property?.finalAmount}
                              </p>

                              <span className="px-2 py-0.5 rounded-md bg-muted text-xs text-muted-foreground capitalize">
                                {property?.bookingType}
                              </span>
                            </div> */}
                          </div>

                          {/* Bottom Section */}
                          <div className="flex flex-col gap-4">
                            {/* Check-in / Check-out */}
                            <div className="flex flex-wrap gap-6">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-100 rounded-lg">
                                  <Calendar className="w-3 h-3 text-emerald-600" />
                                </div>
                                <div>
                                  <div className="text-xs text-slate-500">
                                    Check-in
                                  </div>
                                  <div className="font-medium text-sm">
                                    {checkinDate.date}
                                  </div>
                                  <div className="text-xs text-slate-600 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {checkinDate.time}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-rose-100 rounded-lg">
                                  <Calendar className="w-3 h-3 text-rose-600" />
                                </div>
                                <div>
                                  <div className="text-xs text-slate-500">
                                    Check-out
                                  </div>
                                  <div className="font-medium text-sm">
                                    {checkoutDate.date}
                                  </div>
                                  <div className="text-xs text-slate-600 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {checkoutDate.time}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Reservation & Payment Status */}
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
                              <div className="flex items-center gap-1">
                                <span className="text-sm text-muted-foreground">
                                  Reservation:
                                </span>
                                <StatusAndIcon
                                  status={property.reservationStatus}
                                />
                              </div>

                              <div className="flex items-center gap-1">
                                <span className="text-sm text-muted-foreground">
                                  Payment:
                                </span>
                                <StatusAndIcon
                                  status={property.paymentStatus}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No upcoming bookings</p>
                  <Button
                    onClick={() => onNavigate("/property")}
                    variant={"gradient"}
                  >
                    Browse Spaces
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Your Stats</h3>
              <div className="space-y-4">
                <StatItem
                  value={adminDashboardDetail?.totalReservations}
                  label="Total Bookings"
                  borderColor="teal"
                />
                <StatItem
                  value={adminDashboardDetail?.pendingReservations}
                  label="Saved Spaces"
                  borderColor="pink"
                />
                <StatItem
                  value={adminDashboardDetail?.totalSpent}
                  label="Total Spent"
                  borderColor="violet"
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button
                  onClick={() => onNavigate("/property")}
                  variant="outline"
                  className="w-full justify-start text-teal-700 border-teal-700 hover:bg-teal-50 hover:text-teal-700"
                >
                  <Search className="w-4 h-4" />
                  Find New Spaces
                </Button>
                <Button
                  onClick={() => onNavigate("/wishlist")}
                  variant="outline"
                  className="w-full justify-start text-pink-700 border-pink-700 hover:bg-pink-50 hover:text-pink-700"
                >
                  <Heart className="w-4 h-4" />
                  View Wishlist
                </Button>
                <Button
                  onClick={() => onNavigate("/booking-manage")}
                  variant="outline"
                  className="w-full justify-start text-violet-700 border-violet-700 hover:bg-violet-50 hover:text-violet-700"
                >
                  <CreditCard className="w-4 h-4" />
                  My Bookings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
