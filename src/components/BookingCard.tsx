import { Calendar, MapPin } from "lucide-react";
import moment from "moment";
import StatusAndIcon from "./StatusAndIcon";

function convertUTC(utcString, timeZone) {
  const m = moment.utc(utcString).tz(timeZone);
  return {
    date: m.format("DD/MM/YYYY"),
    time: m.format("HH:mm"),
  };
}

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const BookingCard = ({ booking }) => {
  const baseURL = import.meta.env.VITE_IMAGE_ENDPOINT;
  const checkinDate = convertUTC(booking?.checkIn, userTimeZone);
  const checkoutDate = convertUTC(booking?.checkOut, userTimeZone);
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row">
        {/* Property Image */}
        <div className="sm:w-48 md:w-64 h-48 sm:h-auto flex-shrink-0">
          <img
            src={`${baseURL}/${booking?.property?.images[0]}`}
            alt={booking.property.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          {/* Header: Title and Price */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {booking.property.title}
              </h3>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                {booking.property.address.city},{" "}
                {booking.property.address.state}
              </div>
            </div>
            <div className="text-right ml-4">
              <div className="text-2xl font-bold text-violet-600">
                ${booking.finalAmount}
              </div>
              <div className="text-xs text-gray-500">{booking.bookingType}</div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 w-full gap-4 sm:gap-12 rounded-lg mb-3">
            <div className="flex items-start bg-gray-50 p-2 rounded-md">
              <Calendar className="w-4 h-4 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-500 font-medium">
                  Check-in
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900">
                  {checkinDate.date}
                </div>
                <div className="text-xs text-gray-600 flex items-center mt-0.5">
                  {checkinDate.time}
                </div>
              </div>
            </div>

            <div className="flex items-start bg-gray-50 p-2 rounded-md">
              <Calendar className="w-4 h-4 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-500 font-medium">
                  Check-out
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-900">
                  {checkoutDate.date}
                </div>
                <div className="text-xs text-gray-600 flex items-center mt-0.5">
                  {checkoutDate.time}
                </div>
              </div>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex flex-col sm:flex-row gap-2 md:items-center">
            <div className="flex gap-1">
              <span className="text-xs text-gray-500 font-medium">
                Reservation:
              </span>
              <StatusAndIcon status={booking.reservationStatus} />
            </div>
            <div className="flex gap-1">
              <span className="text-xs text-gray-500 font-medium">
                Payment:
              </span>
              <StatusAndIcon status={booking.paymentStatus} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
