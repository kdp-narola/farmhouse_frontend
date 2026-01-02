import moment from "moment";
import { MapPin } from "lucide-react";
// import { pendingReservationAction } from "@/services/api-routes/booking";
// import { useList } from "@/contexts/ListingContext";

const ReserveProperty = ({ property }) => {
  const baseURL = import.meta.env.VITE_IMAGE_ENDPOINT;
  // const { getReservationList, getAdminDashboardDetail } = useList();
  // const handleReservationApprovalStatus = async (status) => {
  //   try {
  //     const propertyId = property?._id;
  //     const payload = {
  //       status: status,
  //     };
  //     await pendingReservationAction(propertyId, payload);
  //     await getReservationList();
  //     await getAdminDashboardDetail();
  //   } catch (error) {
  //     console.error("Error updating reservation status", error);
  //   }
  // };

  return (
    <div
      key={property?._id}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="sm:w-36 md:w-40 h-36 sm:h-auto flex-shrink-0">
          {property?.property?.images?.length > 0 && (
            <img
              src={`${baseURL}/${property?.property?.images[0]}`}
              alt={property?.property?.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* content */}
        <div className="flex p-4 items-start justify-between w-full">
          <div>
            <h3 className="font-bold text-gray-800 mb-1 capitalize">
              {property?.property?.title}
            </h3>
            <p className="text-sm text-gray-600">
              Booked by: {property?.bookingUser?.fullName}
            </p>
            <p className="text-sm text-gray-600 flex items-center mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {property?.property?.address?.state},{" "}
              {property?.property?.address?.city}
            </p>
          </div>

          <div className="text-right">
            <p className="font-bold text-violet-500">
              ${property?.finalAmount}
            </p>
            <p className="text-xs text-gray-500">
              {moment(property?.createdAt).format("MMMM D, YYYY")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveProperty;
