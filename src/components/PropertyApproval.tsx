import { Button } from "@/components/ui/button";
import { USER_ROLE } from "@/constant/constant";
import { useAuth } from "@/contexts/AuthContext";
import { useList } from "@/contexts/ListingContext";
import { updatePropertyApproval } from "@/services/api-routes/property";
import { CheckCircle, Info, MapPin, XCircle } from "lucide-react";
import moment from "moment";
import { useLocation } from "react-router-dom";

const PendingProperty = ({ property }) => {
  const baseURL = import.meta.env.VITE_IMAGE_ENDPOINT;
  const location = useLocation();
  const isPendingBooking = location.pathname === "/pending-property";
  console.log("location", location);
  console.log("isPendingBooking", isPendingBooking);
  const { authUser } = useAuth();
  const {
    getAdminDashboardDetail,
    getReservationList,
    getpendingApprovalProperties,
  } = useList();
  const handleReservationApprovalStatus = async (status) => {
    try {
      const payload = {
        status: status,
      };
      await updatePropertyApproval(property?._id, payload);
      await getReservationList();
      await getAdminDashboardDetail();
      await getpendingApprovalProperties();
    } catch (error) {
      console.error("Error updating reservation status", error);
    }
  };

  return (
    <div
      key={property?._id}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        {isPendingBooking && (
          <div className="sm:w-36 md:w-40 h-36 sm:h-auto flex-shrink-0">
            {property?.images?.length > 0 && (
              <img
                src={`${baseURL}/${property?.images[0]}`}
                alt={property?.property?.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        )}

        {/* content */}
        <div className="p-4 flex-1">
          <div className="flex items-start justify-between w-full mb-4">
            <div>
              <h3 className="font-bold text-gray-800 mb-1 capitalize">
                {property?.title}
              </h3>
              <p className="text-sm text-gray-600 flex items-center mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {property?.address?.state}, {property?.address?.city}
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold text-violet-500">
                ${property?.pricePerDay}
              </p>
              <p className="text-xs text-gray-500">
                {moment(property?.createdAt).format("MMMM D, YYYY")}
              </p>
            </div>
          </div>

          {authUser?.role === USER_ROLE.ADMIN && (
            <div className="flex gap-3 lg:w-[50%]">
              <Button
                variant={"default"}
                size={"sm"}
                className="w-full p-0"
                onClick={() => handleReservationApprovalStatus("APPROVED")}
              >
                <CheckCircle className="w-2 h-2" />
                Approve
              </Button>
              <Button
                variant={"outline"}
                size={"sm"}
                className="w-full p-0"
                onClick={() => handleReservationApprovalStatus("REJECTED")}
              >
                <XCircle className="w-2 h-2" />
                Reject
              </Button>
              <Button
                variant={"ghost"}
                size={"sm"}
                className="w-full p-0 bg-gray-100"
                onClick={() => {
                  //handle OnClick
                }}
              >
                <Info className="w-2 h-2" />
                View Details
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingProperty;
