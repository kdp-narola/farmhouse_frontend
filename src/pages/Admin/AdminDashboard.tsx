import {
  Users,
  Home,
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
  Utensils,
  Hourglass,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useList } from "@/contexts/ListingContext";
import {
  pendingReservationAction,
  pendingReservationListing,
} from "@/services/api-routes/booking";

const AdminStatsCard = ({
  icon: Icon,
  bgFrom,
  bgTo,
  label,
  value,
  icon2: Icon2,
  trendText,
}) => {
  return (
    <div
      className={`bg-gradient-to-br ${bgFrom} ${bgTo} text-white p-6 rounded-3xl shadow-lg`}
    >
      <Icon className="w-6 h-6 mb-3" />
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-white/80">{label}</p>
      <div className="mt-2 flex items-center gap-2 text-sm">
        {<Icon2 className="w-4 h-4" />}
        <span>{trendText}</span>
      </div>
    </div>
  );
};

const CardItem = ({ icon: Icon, title, subtitle, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 text-left cursor-pointer"
    >
      <Icon className={`w-6 h-6 ${color} mb-3`} />
      <p className="font-bold text-lg text-gray-800">{title}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
};

const Stats = ({ number, label, color }) => {
  return (
    <div className={`border-l-4 border-${color}-500 pl-4`}>
      <p className="text-xl font-bold text-gray-900">{number}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
};

export default function AdminDashboard() {
  const onNavigate = useNavigate();
  const {
    getAdminDashboardDetail,
    adminDashboardDetail,
    pendingProperties,
    getPendingApprovalsList,
  } = useList();
  const [reservationApprovalStatus, setReservationApprovalStatus] =
    useState("");

  const stats = {
    totalUsers: 1247,
    totalProperties: 342,
    totalBookings: 856,
    totalRevenue: 125340,
    activeBookings: 45,
    pendingProperties: 12,
  };

  // const pendingProperties = [
  //   {
  //     id: "1",
  //     title: "Coastal Villa",
  //     owner: "Michael Brown",
  //     location: "Malibu, CA",
  //     priceDaily: 800,
  //     submittedDate: "2025-11-05",
  //   },
  //   {
  //     id: "2",
  //     title: "Industrial Warehouse",
  //     owner: "Lisa Chen",
  //     location: "Brooklyn, NY",
  //     priceDaily: 650,
  //     submittedDate: "2025-11-06",
  //   },
  // ];

  const recentUsers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "customer",
      joinedDate: "2025-11-05",
    },
    {
      id: "2",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "owner",
      joinedDate: "2025-11-06",
    },
  ];

  const handleReservationApprovalStatus = async () => {
    try {
      const res = await pendingReservationAction("1");
      console.log("res", res);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleApprove = (id) => {
    console.log("id", id);
    setReservationApprovalStatus("CONFIRMED");
  };
  const handleReject = (id) => {
    console.log("id", id);
    setReservationApprovalStatus("CANCELLED");
  };

  useEffect(() => {
    const payload = {
      options: {
        page: 1,
        limit: 3,
        sort: { checkIn: -1 },
        select: "title address.city address.state pricePerDay",
      },
    };
    getAdminDashboardDetail();
    getPendingApprovalsList(payload);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Navbar />
      <div className="mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Admin Dashboard
            </span>
          </h1>
          <p className="text-gray-600">
            Overview of platform metrics and management tools
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <AdminStatsCard
            icon={Users}
            bgFrom="from-teal-500"
            bgTo="to-teal-400"
            // value={stats.totalUsers.toLocaleString()}
            value={adminDashboardDetail?.userCount}
            label="Total Users"
            icon2={TrendingUp}
            trendText="+12% this month"
          />

          <AdminStatsCard
            icon={Home}
            bgFrom="from-pink-500"
            bgTo="to-pink-400"
            value={adminDashboardDetail?.propertyCount}
            // value={stats.totalProperties}
            label="Active Properties"
            trendText={`${stats.pendingProperties} pending`}
            icon2={Hourglass}
          />

          <AdminStatsCard
            icon={DollarSign}
            bgFrom="from-violet-500"
            bgTo="to-violet-400"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            label="Platform Revenue"
            icon2={TrendingUp}
            trendText="+18% this month"
          />
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <CardItem
            icon={Home}
            title="Properties"
            subtitle="Manage listings"
            color="text-teal-600"
            onClick={() => onNavigate("/add-property")}
          />
          <CardItem
            icon={Users}
            title="Users"
            subtitle="User management"
            color="text-blue-600"
            onClick={() => onNavigate("/admin-users")}
          />

          <CardItem
            icon={DollarSign}
            title="Payments"
            subtitle="Transaction history"
            color="text-violet-600"
            onClick={() => onNavigate("/booking-manage")}
          />

          <CardItem
            icon={Utensils}
            title="Resources"
            subtitle="Manage Amenities, Category and Rules"
            color="text-green-600"
            onClick={() => onNavigate("/resource-manage")}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Pending Approvals
                </h2>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                  {pendingProperties.length} pending
                </span>
              </div>

              <div className="space-y-4">
                {pendingProperties.map((property) => (
                  <div
                    key={property?._id}
                    className="flex flex-col gap-4 p-4 bg-muted/30 rounded-2xl hover-lift cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">
                          {property?.property?.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Booked by : {property?.bookingUser?.fullName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {property?.property?.address?.city},{" "}
                          {property?.property?.address?.state}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-violet-500">
                          ${property?.property?.pricePerDay}/day
                        </p>
                        <p className="text-xs text-gray-500">
                          {property?.submittedDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant={"default"}
                        size={"sm"}
                        className="w-full p-0"
                        onClick={() => handleApprove(property._id)}
                      >
                        <CheckCircle className="w-2 h-2" />
                        Approve
                      </Button>
                      <Button
                        variant={"outline"}
                        size={"sm"}
                        className="w-full p-0"
                        onClick={() => handleReject(property._id)}
                      >
                        <XCircle className="w-2 h-2" />
                        Reject
                      </Button>
                      {/* <Button
                        variant={"ghost"}
                        size={"sm"}
                        className="bg-gray-100"
                      >
                        Details
                      </Button> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Recent Users
              </h2>
              <div className="space-y-3">
                {recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="text-right flex flex-col">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "owner"
                            ? "bg-violet-100 text-violet-700"
                            : "bg-teal-100 text-teal-700"
                        }`}
                      >
                        {user.role}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        {user.joinedDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-3xl p-6 shadow-md  mb-6">
              <h3 className="text-xl font-bold mb-6">Quick Stats</h3>
              <div className="space-y-4">
                <Stats
                  color={"teal"}
                  number={adminDashboardDetail?.totalReservationCount}
                  // number={stats.totalBookings}
                  label={"Total Bookings"}
                />
                <Stats
                  color={"pink"}
                  number={adminDashboardDetail?.upcomingReservationCount}
                  // number={stats.activeBookings}
                  label={"Active Bookings"}
                />
                <Stats color={"violet"} number={"96%"} label={"Success Rate"} />
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                System Health
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Database</span>
                  <span className="flex items-center gap-2 text-green-600 font-semibold">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">API Services</span>
                  <span className="flex items-center gap-2 text-green-600 font-semibold">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Payments</span>
                  <span className="flex items-center gap-2 text-green-600 font-semibold">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
