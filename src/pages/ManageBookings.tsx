import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import TabButton from "@/components/TabButton";
import { useState } from "react";
import SlotBookingDetails from "./SlotBookingDetails";
import { useAuth } from "@/contexts/AuthContext";
import { USER_ROLE } from "@/constant/constant";

const ManageBookings = () => {
  const { authUser } = useAuth();
  const [status, setStatus] = useState(
    authUser.role === USER_ROLE.CUSTOMER ? "" : "owner"
  );
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen custom-gradient-blue-teal">
      <Navbar />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-start mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Booking Management
          </h1>
          <p className="text-sm text-gray-500">Manage your booked property</p>
        </div>
        {authUser?.role === USER_ROLE.ADMIN && (
          <div className="flex gap-4 border-b border-gray-200 mb-2">
            <TabButton
              label="Owner"
              value="owner"
              currentPage={status}
              onChange={setStatus}
            />
            <TabButton
              label="All"
              value="all"
              currentPage={status}
              onChange={setStatus}
            />
          </div>
        )}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-start md:gap-2 space-y-4 md:space-y-0">
            {/* Search */}
            <Search
              search={searchTerm}
              setSearch={setSearchTerm}
              placeholder={"Search"}
            />
          </div>
        </div>
        <SlotBookingDetails search={searchTerm} filter={status} />
      </div>
    </div>
  );
};

export default ManageBookings;
