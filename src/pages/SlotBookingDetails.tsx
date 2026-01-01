import StatusAndIcon from "@/components/StatusAndIcon";
import { slotBookingList } from "@/services/api-routes/booking";
import { MapPin } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SlotBookingDetails = ({ search, filter }) => {
  const [properties, setProperties] = useState([]);
  const handleSlotBookingDetails = async () => {
    const payload = {
      options: {
        pagination: true,
        page: 1,
        limit: 10,
        sort: { createdAt: -1 },
        select: "title address.city address.state avgRate",
        search: {
          keys: ["title", "address.city", "address.state", "fullName", "email"],
          value: search,
        },
      },
      filter: {
        key: filter,
      },
      population: [],
    };
    try {
      const res = await slotBookingList(payload);
      setProperties(res?.data?.data?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    handleSlotBookingDetails();
  }, [search, filter]);

  const userColumns = [
    {
      name: "CheckIn",
      cell: (row) =>
        moment(row.checkIn).format("MMM D, YYYY") +
        " (" +
        moment(row.checkIn).format("h:mm A") +
        ")",
    },
    {
      name: "CheckOut",
      // cell: (row) => moment(row.checkOut).format("h:mm A"),
      cell: (row) =>
        moment(row.checkOut).format("MMM D, YYYY") +
        " (" +
        moment(row.checkOut).format("h:mm A") +
        ")",
    },
    {
      name: "Duration",
      cell: (row) =>
        moment(row.checkOut).diff(moment(row.checkIn), "hours") + " hours",
    },
    {
      name: "Booking User",
      cell: (row) => row.bookingUser?.fullName,
    },
    {
      name: "Amount(₹)",
      cell: (row) => row.finalAmount,
    },
    {
      name: "Reservation Status",
      cell: (row) => <StatusAndIcon status={row.reservationStatus} />,
    },
    {
      name: "Payment Status",
      cell: (row) => <StatusAndIcon status={row.paymentStatus} />,
    },
  ];

  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible>
        {properties?.length > 0 &&
          properties?.map((property) => (
            <AccordionItem key={property._id} value={property._id}>
              <AccordionTrigger className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start justify-between mb-4">
                <div className="w-[85%]">
                  <h3 className="text-lg font-semibold text-gray-900 text-start capitalize">
                    {property?.property?.title}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property?.property?.address?.state},{" "}
                    {property?.property?.address?.city}
                  </p>
                  <p className="flex md:hidden w-fit mt-1 text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full flex-shrink-0">
                    {property?.reservations?.length} Bookings
                  </p>
                </div>
                <div className="hidden md:flex text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full flex-shrink-0">
                  {property?.reservations?.length} Bookings
                </div>
              </AccordionTrigger>

              <AccordionContent>
                {property?.reservations?.length > 0 && (
                  <Table className="bg-white rounded-xl shadow-sm border border-gray-50">
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        {userColumns.map((col) => (
                          <TableHead
                            key={col.name}
                            className="px-6 py-4 text-sm font-semibold text-gray-700"
                          >
                            {col.name}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {property?.reservations?.map((booking) => (
                        <TableRow key={booking?._id}>
                          {userColumns.map((col) => (
                            <TableCell key={col.name}>
                              <span className="text-gray-600">
                                {col.cell(booking)}
                              </span>
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        {properties?.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl font-semibold text-gray-500 mb-2">
              Oops! Property Not Found
            </h1>
          </div>
        )}
      </Accordion>
    </div>
  );
};

export default SlotBookingDetails;
