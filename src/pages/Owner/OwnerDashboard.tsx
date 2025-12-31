import { Home, Plus, Calendar, DollarSign, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BOOKING_STATUS } from "@/constant/constant";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StatusAndIcon from "@/components/StatusAndIcon";

const StatCard = ({ title, value, icon: Icon, bgFrom, bgTo }) => {
  return (
    <Card
      className={`rounded-3xl shadow-soft bg-gradient-to-br ${bgFrom} ${bgTo} text-white`}
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

  const properties = [
    {
      id: "1",
      name: "Modern Loft Studio",
      image:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "active",
      bookings: 12,
      revenue: 4500,
      views: 234,
      saves: 45,
    },
    {
      id: "2",
      name: "Rooftop Garden Space",
      image:
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "active",
      bookings: 8,
      revenue: 3200,
      views: 178,
      saves: 32,
    },
  ];

  const recentBookings = [
    {
      id: "1",
      property: "Modern Loft Studio",
      customer: "John Smith",
      date: "2025-11-15",
      time: "10:00 AM - 2:00 PM",
      amount: 300,
      status: "PENDING",
    },
    {
      id: "2",
      property: "Rooftop Garden Space",
      customer: "Emma Davis",
      date: "2025-11-18",
      time: "2:00 PM - 6:00 PM",
      amount: 340,
      status: "CONFIRMED",
    },
    {
      id: "3",
      property: "Rooftop Garden Space",
      customer: "Emma Davis",
      date: "2025-11-18",
      time: "2:00 PM - 6:00 PM",
      amount: 340,
      status: "ACCEPTED",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Navbar />
      <div className="mx-auto p-8">
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

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Active Properties"
            value={properties.length}
            icon={Home}
            bgFrom="from-teal-500"
            bgTo="to-teal-400"
          />
          <StatCard
            title="Total Bookings"
            value={20}
            icon={Calendar}
            bgFrom="from-pink-500"
            bgTo="to-pink-400"
          />
          <StatCard
            title="This Month"
            value="$7,700"
            icon={DollarSign}
            bgFrom="from-violet-500"
            bgTo="to-violet-400"
          />
          <StatCard
            title="Avg Rating"
            value="4.8"
            icon={BarChart3}
            bgFrom="from-yellow-500"
            bgTo="to-yellow-400"
          />
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
                  onClick={() => onNavigate("/manage-bookings")}
                  className="text-violet-600 hover:text-violet-700"
                >
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${booking.customer}`}
                        />
                        <AvatarFallback>{booking.customer[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{booking.customer}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.property}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {booking.date} • {booking.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${booking.amount}</p>
                      <div className="flex gap-2 mt-2">
                        {booking.status === BOOKING_STATUS.PENDING && (
                          <>
                            <Button variant="outline" size="sm" className="">
                              Reject
                            </Button>
                            <Button variant="default" size="sm">
                              Accept
                            </Button>
                          </>
                        )}
                        {booking.status !== BOOKING_STATUS.PENDING && (
                          <StatusAndIcon status={booking.status} />
                        )}
                      </div>
                    </div>
                  </div>
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
                  <div className="text-sm text-gray-600 mb-1">This Month</div>
                  <div className="text-xl font-bold text-teal-600">$7,700</div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-sm text-gray-600 mb-1">Last Month</div>
                  <div className="text-xl font-bold text-gray-800">$6,200</div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="text-sm text-gray-600 mb-1">All Time</div>
                  <div className="text-xl font-bold text-gray-800">$42,300</div>
                </div>
              </div>
              <Button className="w-full mt-6 bg-gradient-to-r from-violet-500 to-teal-500">
                Request Payout
              </Button>
            </div>

            {/* <div className="bg-white rounded-3xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2 flex gap-2"><Settings className="w-8 h-8 text-violet-600" /> Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  variant={'gradient'}
                  className='w-full'
                  onClick={() => onNavigate('/add-property')}
                >
                  <Plus className="w-4 h-4" />
                  Add New Property
                </Button>
                <Button
                  variant="outline"
                  className='w-full text-teal-700 border-teal-700 hover:bg-teal-50 hover:text-teal-700'
                  onClick={() => onNavigate('/manage-bookings')}
                >
                  <Calendar className="w-4 h-4" />
                  Manage Bookings
                </Button>
                <Button
                  variant="outline"
                  className='w-full text-pink-700 border-pink-700 hover:bg-pink-50 hover:text-pink-700'
                >
                  <DollarSign className="w-4 h-4" />
                  View Analytics
                </Button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
