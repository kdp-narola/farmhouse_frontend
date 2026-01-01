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

  const BookingCard = ({ booking }) => {
    const checkinDate = convertUTC(
        booking?.checkIn,
        userTimeZone
      );
      const checkoutDate = convertUTC(
        booking?.checkOut,
        userTimeZone
      );
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row">
        {/* Property Image */}
        <div className="sm:w-48 md:w-64 h-48 sm:h-auto flex-shrink-0">
          <img 
            src={`${baseURL}/${booking?.property?.images[0]}`}
            alt={booking.property.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 p-4">
          {/* Header: Title and Price */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {booking.property.title}
              </h3>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                {booking.property.address.city}, {booking.property.address.state}
              </div>
            </div>
            <div className="text-right ml-4">
              <div className="text-2xl font-bold text-violet-600">
                ${booking.finalAmount}
              </div>
              <div className="text-xs text-gray-500">{booking.bookingType}</div>
            </div>
          </div>
          
          {/* Dates */}
          <div className="grid grid-cols-2 w-full gap-4 sm:gap-12 rounded-lg mb-3">
            <div className="flex items-start bg-gray-50 p-2 rounded-md">
              <Calendar className="w-4 h-4 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-500 font-medium">Check-in</div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900">{checkinDate.date}</div>
                <div className="text-xs text-gray-600 flex items-center mt-0.5">
                  {checkinDate.time}
                </div>
              </div>
            </div>
            
            <div className="flex items-start bg-gray-50 p-2 rounded-md">
              <Calendar className="w-4 h-4 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-500 font-medium">Check-out</div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900">{checkoutDate.date}</div>
                <div className="text-xs text-gray-600 flex items-center mt-0.5">
                  {checkoutDate.time}
                </div>
              </div>
            </div>
          </div>
          
          {/* Status Badges */}
          <div className="flex flex-col sm:flex-row gap-2 md:items-center">
            <div className="flex gap-1">
              <span className="text-xs text-gray-500 font-medium">Reservation:</span>
              <StatusAndIcon status={booking.reservationStatus} />
            </div>
            <div className="flex gap-1">
              <span className="text-xs text-gray-500 font-medium">Payment:</span>
              <StatusAndIcon status={booking.paymentStatus} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-violet-50">
      <Navbar />

      <div className="mx-auto p-4 md:p-8">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6">
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

              <div className="space-y-4">
          {pendingProperties.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-6 lg:mt-0">
            <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6">
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

            <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6">
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
