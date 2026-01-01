import { Home, Plus, Calendar, DollarSign, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useList } from "@/contexts/ListingContext";
import { useEffect } from "react";
import PendingProperty from "@/components/PendingProperty";

const StatCard = ({ title, value, icon: Icon, bgFrom, bgTo, onclick }) => {
  return (
    <Card
      className={`rounded-3xl shadow-soft bg-gradient-to-br ${bgFrom} ${bgTo} text-white`}
      onClick={onclick}
    >
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 mb-1">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function OwnerDashboard() {
  const { authUser } = useAuth();
  const onNavigate = useNavigate();
  const {
    getAdminDashboardDetail,
    adminDashboardDetail,
    pendingProperties,
    getPendingApprovalsList,
  } = useList();

  useEffect(() => {
    const payload = {
      options: {
        page: 1,
        limit: 3,
        sort: { createdAt: -1 },
        select: "title address.city address.state pricePerDay",
      },
    };
    getAdminDashboardDetail();
    getPendingApprovalsList(payload);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Navbar />
      <div className="mx-auto p-4 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              <span className="text-gray-800">Hello, </span>
              <span className="bg-gradient-to-r from-violet-600 to-teal-600 bg-clip-text text-transparent capitalize">
                {authUser?.fullName?.split(" ")[0] || "Owner"}!
              </span>
            </h1>
            <p className="text-gray-600">Manage your properties and bookings</p>
          </div>
          <Button
            variant={"gradient"}
            onClick={() => onNavigate("/add-property")}
            className="rounded-2xl font-bold"
          >
            <Plus className="w-5 h-5" />
            Add Property
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Active Properties"
            value={adminDashboardDetail?.totalProperties}
            // value={properties.length}
            icon={Home}
            bgFrom="from-teal-500"
            bgTo="to-teal-400"
            onclick={() => {
              onNavigate("/add-property");
            }}
          />
          <StatCard
            title="Total Bookings"
            value={adminDashboardDetail?.totalConfirmedReservations}
            icon={Calendar}
            bgFrom="from-pink-500"
            bgTo="to-pink-400"
            onclick={() => {
              onNavigate("/booking-manage");
            }}
          />
          <StatCard
            title="This Month"
            value={adminDashboardDetail?.thisMonthRevenue}
            icon={DollarSign}
            bgFrom="from-violet-500"
            bgTo="to-violet-400"
            onclick={() => {}}
          />
          {/* <StatCard
            title="Avg Rating"
            value="4.8"
            icon={BarChart3}
            bgFrom="from-yellow-500"
            bgTo="to-yellow-400"
          /> */}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Recent Bookings
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
                {pendingProperties.map((property) => (
                  <PendingProperty key={property?._id} property={property} />
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Earnings Overview
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">This Month</p>
                  <p className="text-xl font-bold text-teal-600">
                    {adminDashboardDetail?.thisMonthRevenue}
                  </p>
                  {/* <div className="text-xl font-bold text-teal-600">$7,700</div> */}
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 mb-1">Last Month</p>
                  <p className="text-xl font-bold text-gray-800">
                    {adminDashboardDetail?.lastMonthRevenue}
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 mb-1">All Time</p>
                  <p className="text-xl font-bold text-gray-800">
                    {adminDashboardDetail?.totalRevenue}
                  </p>
                </div>
              </div>
              <Button className="w-full mt-6 bg-gradient-to-r from-violet-500 to-teal-500">
                Request Payout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
