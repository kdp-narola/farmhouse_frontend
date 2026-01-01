import {
  Users,
  Home,
  DollarSign,
  TrendingUp,
  Utensils,
  Hourglass,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import { useList } from "@/contexts/ListingContext";
import PendingProperty from "@/components/PendingProperty";
import { USER_ROLE } from "@/constant/constant";
import moment from "moment";

const AdminStatsCard = ({ icon: Icon, bgFrom, bgTo, label, value }) => {
  return (
    <div
      className={`bg-gradient-to-br ${bgFrom} ${bgTo} text-white p-6 rounded-3xl shadow-lg`}
    >
      <Icon className="w-6 h-6 mb-3" />
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-white/80">{label}</p>
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
    userList,
    getUserList,
  } = useList();

  console.log("userList from admin dashboard", userList);
  const recentUsers = userList?.data ?? [];

  // const recentUsers = [
  //   {
  //     id: "1",
  //     name: "John Doe",
  //     email: "john@example.com",
  //     role: "customer",
  //     joinedDate: "2025-11-05",
  //   },
  //   {
  //     id: "2",
  //     name: "Sarah Wilson",
  //     email: "sarah@example.com",
  //     role: "owner",
  //     joinedDate: "2025-11-06",
  //   },
  // ];

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
    getUserList({
      options: {
        page: 1,
        limit: 3,
        search: {
          keys: ["fullName", "email"],
          value: "",
        },
      },
      filter: {
        role: "",
      },
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Navbar />
      <div className="mx-auto p-4 md:p-8">
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
            value={adminDashboardDetail?.totalUsers}
            label="Total Users"
          />

          <AdminStatsCard
            icon={Home}
            bgFrom="from-pink-500"
            bgTo="to-pink-400"
            value={adminDashboardDetail?.totalProperties}
            label="Active Properties"
          />

          <AdminStatsCard
            icon={DollarSign}
            bgFrom="from-violet-500"
            bgTo="to-violet-400"
            value={`$${adminDashboardDetail?.totalRevenue}`}
            label="Platform Revenue"
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
                <div className="flex gap-2">
                  <Button
                    variant={"link"}
                    onClick={() => onNavigate("/pending-bookings")}
                    className="text-violet-600 hover:text-violet-700"
                  >
                    View All
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {pendingProperties?.length > 0 &&
                  pendingProperties?.map((property) => (
                    <PendingProperty key={property?._id} property={property} />
                  ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6">
              {/* <h2 className="text-xl font-bold text-gray-800 mb-6">
                Recent Users
              </h2> */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Recent Users
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant={"link"}
                    onClick={() => onNavigate("/admin-users")}
                    className="text-violet-600 hover:text-violet-700"
                  >
                    View All
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                {recentUsers?.slice(0, 3)?.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-gray-800 capitalize">
                        {user.fullName}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="text-right flex flex-col">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === USER_ROLE.OWNER
                            ? "bg-teal-100 text-teal-700"
                            : user.role === USER_ROLE.ADMIN
                            ? "bg-pink-100 text-pink-700"
                            : "bg-violet-100 text-violet-700"
                        }`}
                      >
                        {user.role}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        {moment(user.createdAt).format("DD-MM-yy")}
                        {/* {user.createdAt} */}
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
                  number={adminDashboardDetail?.totalConfirmedReservations}
                  label={"Total Bookings"}
                />
                <Stats
                  color={"pink"}
                  number={adminDashboardDetail?.pendingReservations}
                  label={"Active Bookings"}
                />
                {/* <Stats color={"violet"} number={"96%"} label={"Success Rate"} /> */}
                <Stats
                  color={"violet"}
                  number={adminDashboardDetail?.successRate + "%"}
                  label={"Success Rate"}
                />
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
