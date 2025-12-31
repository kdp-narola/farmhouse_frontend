import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import TabButton from "@/components/TabButton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import SlotBookingDetails from "./SlotBookingDetails";

const ManageBookings = () => {
  const [status, setStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Navbar />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-start mb-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Booking Management
          </h1>
          <p className="text-sm text-gray-500">Manage your booked property</p>
        </div>
        <div className="flex gap-4 border-b border-gray-200 mb-2">
          <TabButton
            label="All"
            value="all"
            currentPage={status}
            onChange={setStatus}
          />
          <TabButton
            label="Owner"
            value="owner"
            currentPage={status}
            onChange={setStatus}
          />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-start md:gap-2 space-y-4 md:space-y-0">
            {/* Search */}
            <Search
              search={searchTerm}
              setSearch={setSearchTerm}
              placeholder={"Search"}
            />
            {/* Filter */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Select
                  value={filterType}
                  onValueChange={(value) => setFilterType(value)}
                >
                  <SelectTrigger>
                    <div className="h-9 p-0 hover:bg-white hover:text-gray-500 flex justify-center items-center gap-1">
                      <ArrowUpDown className="w-4 h-4 text-gray-600" />
                      <span>Filter by</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <SlotBookingDetails search={searchTerm} filter={status} />
      </div>
    </div>
  );
};

export default ManageBookings;
