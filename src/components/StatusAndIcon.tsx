import {
  BOOKING_STATUS,
  PAYMENT_STATUS,
  RESERVATION_STATUS,
} from "@/constant/constant";
import {
  AlertCircle,
  CheckCheck,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

const StatusAndIcon = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case BOOKING_STATUS.PENDING:
      case RESERVATION_STATUS.PEDNING:
      case PAYMENT_STATUS.PEDNING:
        return "bg-yellow-50 text-yellow-500";

      case BOOKING_STATUS.ACCEPTED:
      case RESERVATION_STATUS.COMPLETED:
      case PAYMENT_STATUS.SUCCESS:
        return "bg-green-50 text-green-500";

      case BOOKING_STATUS.CONFIRMED:
      case RESERVATION_STATUS.CONFIRMED:
      case PAYMENT_STATUS.REFUNDED:
        return "bg-blue-50 text-blue-500";

      case BOOKING_STATUS.REJECTED:
      case RESERVATION_STATUS.CANCELLED:
      case RESERVATION_STATUS.FAILED:
      case PAYMENT_STATUS.FAILED:
        return "bg-red-50 text-red-500";

      default:
        return "bg-yellow-50 text-yellow-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case BOOKING_STATUS.PENDING:
        return <AlertCircle className="h-4 w-4" />;

      case BOOKING_STATUS.ACCEPTED:
        return <CheckCircle className="h-4 w-4" />;

      case BOOKING_STATUS.CONFIRMED:
        return <CheckCheck className="h-4 w-4" />;

      case BOOKING_STATUS.REJECTED:
        return <XCircle className="h-4 w-4" />;

      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <>
      <p
        className={`${getStatusColor(
          status
        )} capitalize flex items-center font-normal space-x-1 rounded-full text-xs px-2 w-fit`}
      >
        {getStatusIcon(status)}
        <span>{status}</span>
      </p>
    </>
  );
};

export default StatusAndIcon;
