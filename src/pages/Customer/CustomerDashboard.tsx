import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/BookingContext";
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
  const onNavigate = useNavigate();
  const baseURL = import.meta.env.VITE_IMAGE_ENDPOINT;

  useEffect(() => {
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

  const recentPayments = [
    {
      id: "1",
      amount: 300,
      date: "2025-11-08",
      property: "Modern Loft Studio",
    },
    {
      id: "2",
      amount: 240,
      date: "2025-11-01",
      property: "Minimalist White Space",
    },
  ];

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
            title="Messages"
            description="Chat with hosts"
            onNavigate={() => onNavigate("/messages")}
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

        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col md:col-span-2 gap-6">
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Upcoming Bookings
                </h2>
                <Calendar className="w-6 h-6 text-violet-500" />
              </div>

              {upComingBooking?.length > 0 ? (
                <div className="space-y-4 md:max-h-[30vh] overflow-auto">
                  {upComingBooking?.map((booking) => {
                    const checkinDate = convertUTC(
                      booking?.checkIn,
                      userTimeZone
                    );
                    const checkoutDate = convertUTC(
                      booking?.checkOut,
                      userTimeZone
                    );
                    return (
                      <div
                        key={booking?._id}
                        className="flex gap-4 p-4 bg-muted/30 rounded-2xl hover-lift cursor-pointer"
                      >
                        <img
                          src={`${baseURL}/${booking?.property?.images[0]}`}
                          alt={booking?.property?.title}
                          className="w-24 h-24 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold mb-1">
                            {booking?.property?.title}
                          </h3>
                          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                            <p className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {booking?.property?.address?.city},{" "}
                              {booking?.property?.address?.state}
                            </p>
                            <p className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {checkinDate?.date} - {checkoutDate?.date}
                            </p>
                            <p className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {checkinDate?.time} - {checkoutDate?.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-violet-500 text-lg">
                            ${booking?.finalAmount}
                          </p>
                          <p className="text-xs text-muted-foreground lowercase">
                            {booking?.bookingType}
                          </p>
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

            <div className="bg-white rounded-3xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {" "}
                  Recent Payments
                </h2>
                <CreditCard className="w-6 h-6 text-violet-500" />
              </div>

              <div className="space-y-3">
                {recentPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-xl"
                  >
                    <div>
                      <div className="font-semibold">{payment.property}</div>
                      <div className="text-sm text-muted-foreground">
                        {payment.date}
                      </div>
                    </div>
                    <div className="font-bold text-lg">${payment.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4">Your Stats</h3>
              <div className="space-y-4">
                <StatItem
                  value="12"
                  label="Total Bookings"
                  borderColor="teal"
                />
                <StatItem value="8" label="Saved Spaces" borderColor="pink" />
                <StatItem
                  value="$2,340"
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
                  onClick={() => onNavigate("/messages")}
                  variant="outline"
                  className="w-full justify-start text-violet-700 border-violet-700 hover:bg-violet-50 hover:text-violet-700"
                >
                  <CreditCard className="w-4 h-4" />
                  Messages
                </Button>
                {/* <button
                  onClick={() => onNavigate('/property')}
                  className="w-full px-4 py-3 bg-teal-50 text-teal-700 rounded-xl font-semibold hover:bg-teal-100 transition-colors text-left"
                >
                  Find a Space
                </button>
                <button
                  onClick={() => onNavigate('/wishlist')}
                  className="w-full px-4 py-3 bg-pink-50 text-pink-700 rounded-xl font-semibold hover:bg-pink-100 transition-colors text-left"
                >
                  View Wishlist
                </button>
                <button
                  onClick={() => onNavigate('/messages')}
                  className="w-full px-4 py-3 bg-violet-50 text-violet-700 rounded-xl font-semibold hover:bg-violet-100 transition-colors text-left"
                >
                  Messages
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 md:hidden">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 text-teal-600">
            <Calendar className="w-6 h-6" />
            <span className="text-xs font-semibold">Home</span>
          </button>
          <button onClick={() => onNavigate('/property')} className="flex flex-col items-center gap-1 text-gray-400">
            <Search className="w-6 h-6" />
            <span className="text-xs">Search</span>
          </button>
          <button onClick={() => onNavigate('/wishlist')} className="flex flex-col items-center gap-1 text-gray-400">
            <Heart className="w-6 h-6" />
            <span className="text-xs">Wishlist</span>
          </button>
          <button onClick={() => onNavigate('/messages')} className="flex flex-col items-center gap-1 text-gray-400">
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs">Messages</span>
          </button>
        </div>
      </nav> */}
    </div>
  );
};

export default CustomerDashboard;
