import { useEffect, useState } from "react";
import { Users, Home, ArrowUpDown } from "lucide-react";
import moment from "moment";
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useList } from "@/contexts/ListingContext";
import { USER_ROLE, USER_STATUS } from "@/constant/constant";

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

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const { userList, getUserList } = useList();

  useEffect(() => {
    getUserList({
      options: {
        pagination: false,
        search: {
          keys: ["fullName", "email"],
          value: searchTerm,
        },
      },
      filter: {
        role: filterType.toUpperCase(),
      },
    });
  }, [filterType, searchTerm]);

  const users = userList?.data ?? [];

  const userColumns = [
    {
      name: "Name",
      cell: (row) => <span className="text-gray-600">{row.fullName}</span>,
    },
    {
      name: "Email",
      cell: (row) => <span className="text-gray-600">{row.email}</span>,
    },
    {
      name: "Type",
      cell: (row) => (
        <span
          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium lowercase ${
            row.role === USER_ROLE.OWNER
              ? "bg-teal-100 text-teal-700"
              : row.role === USER_ROLE.ADMIN
              ? "bg-pink-100 text-pink-700"
              : "bg-violet-100 text-violet-700"
          }`}
        >
          {row.role}
        </span>
      ),
    },
    {
      name: "Joined",
      cell: (row) => (
        <span className="text-gray-600">
          {moment(row.createdAt).format("DD-MM-YYYY")}
        </span>
      ),
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium lowercase ${
            row.status === USER_STATUS.VERIFIED
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-sm text-gray-500">
            Manage and communicate with all platform users
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Users"
            value={userList?.totalUserCount || 0}
            icon={Users}
            bgFrom="from-teal-500"
            bgTo="to-teal-400"
          />
          <StatCard
            title="Property Owners"
            value={userList?.roleWiseCount?.OWNER || 0}
            icon={Home}
            bgFrom="from-pink-500"
            bgTo="to-pink-400"
          />
          <StatCard
            title="Regular Users"
            value={userList?.roleWiseCount?.CUSTOMER || 0}
            icon={Users}
            bgFrom="from-violet-500"
            bgTo="to-violet-400"
          />
          <StatCard
            title="Super Admin"
            value={userList?.roleWiseCount?.ADMIN || 0}
            icon={Users}
            bgFrom="from-yellow-500"
            bgTo="to-yellow-400"
          />
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-start md:gap-2 space-y-4 md:space-y-0">
            {/* Search */}
            <Search
              search={searchTerm}
              setSearch={setSearchTerm}
              placeholder={"Search by Full name or Email..."}
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
                      <SelectItem value="owner">Owners</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {users.length > 0 && (
            <Table>
              <TableHeader className="bg-gray-50 border-b border-gray-200">
                <TableRow>
                  {userColumns?.map((col, index) => (
                    <TableHead
                      key={index}
                      className="px-6 py-4 text-sm font-semibold text-gray-700"
                    >
                      {col.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map((row) => (
                  <TableRow
                    key={row._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {userColumns?.map((col, index) => (
                      <TableCell key={index} className="px-6 py-4">
                        {col.cell(row)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {users.length === 0 && (
            <div className="py-12 text-center">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                No users found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
