import Navbar from "@/components/Navbar";
import Pagination from "@/components/Pagination";
import PendingProperty from "@/components/PendingProperty";
import Search from "@/components/Search";
import { useList } from "@/contexts/ListingContext";
import { useEffect, useState } from "react";

const ManagePendingBooking = () => {
  const {
    pendingProperties,
    getPendingApprovalsList,
    pendingPropertiesPagination,
  } = useList();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleLimitChange = (value) => {
    setLimit(value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  console.log(
    "pendingPropertiesPagination?.totalPages from Manage booking",
    pendingPropertiesPagination
  );

  useEffect(() => {
    const payload = {
      options: {
        pagination: true,
        page,
        limit,
        sort: { createdAt: -1 },
        select:
          "title address.city address.state pricePerDay pricePerHours images avgRate",
        search: {
          keys: ["title", "description", "address.city"],
          value: searchTerm,
        },
      },
      population: [],
    };
    getPendingApprovalsList(payload);
  }, [searchTerm, page, limit]);

  const handleMapData = pendingProperties.map((property) => (
    <PendingProperty key={property?._id} property={property} />
  ));
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Pending Property Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage the property reservation
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-start md:gap-2 space-y-4 md:space-y-0">
            {/* Search */}
            <Search
              search={searchTerm}
              setSearch={setSearchTerm}
              placeholder={"Search by Full name or Email..."}
            />
          </div>
        </div>

        {pendingProperties?.length > 0 && (
          <Pagination
            className="space-y-4"
            data={pendingProperties}
            handleFunction={handleMapData}
            handleLimitChange={handleLimitChange}
            handlePageChange={handlePageChange}
            page={page}
            limit={limit}
            totalPage={pendingPropertiesPagination?.totalPages}
            currentPage={pendingPropertiesPagination?.page}
            displayLimitBtn={true}
          />
        )}
        {pendingProperties?.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl font-semibold text-gray-500 mb-2">
              Oops! Property Not Found
            </h1>
          </div>
        )}
        {/* </div> */}
      </div>
    </div>
  );
};

export default ManagePendingBooking;
