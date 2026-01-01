import moment from "moment";
import { Button } from "./ui/button";
import { CheckCircle, MapPin, XCircle } from "lucide-react";
import { pendingReservationAction } from "@/services/api-routes/booking";

const PendingProperty = ({ property }) => {
  const handleReservationApprovalStatus = async (status) => {
    console.log("status", status);
    try {
      const propertyId = property?._id;
      const payload = {
        status: status,
      };
      const res = await pendingReservationAction(propertyId, payload);
      console.log("res", res);
    } catch (error) {
      console.error("Error updating reservation status", error);
    }
  };

  return (
    <div
      key={property?._id}
      className="flex flex-col gap-4 p-4 bg-muted/30 rounded-2xl hover-lift cursor-pointer"
    >
      <div className="flex items-start justify-between">
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
          <p className="font-bold text-violet-500">${property?.finalAmount}</p>
          <p className="text-xs text-gray-500">
            {moment(property?.createdAt).format("MMMM D, YYYY")}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant={"default"}
          size={"sm"}
          className="w-full p-0"
          onClick={() => handleReservationApprovalStatus("CONFIRMED")}
        >
          <CheckCircle className="w-2 h-2" />
          Approve
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          className="w-full p-0"
          onClick={() => handleReservationApprovalStatus("CANCELLED")}
        >
          <XCircle className="w-2 h-2" />
          Reject
        </Button>
      </div>
    </div>
  );
};

export default PendingProperty;
