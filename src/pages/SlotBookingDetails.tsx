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
        sort: { checkIn: -1 },
        select: "title address.city address.state avgRate",
        search: {
          keys: ["title", "address.city", "address.state"],
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
      console.log("res.data.data", res.data.data.data);
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
      cell: (row) => moment(row.checkIn).format("h:mm A"),
    },
    {
      name: "CheckOut",
      cell: (row) => moment(row.checkOut).format("h:mm A"),
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
    // <div className="space-y-6">
    //   {properties?.map((property) => (
    //     <div
    //       key={property._id}
    //       className="bg-white rounded-lg shadow-sm border border-gray-100 p-5"
    //     >
    //       <div className="flex items-start justify-between mb-4">
    //         <div>
    //           <h3 className="text-lg font-semibold text-gray-900 capitalize">
    //             {property?.property?.title}
    //           </h3>
    //           <p className="text-sm text-gray-600 flex items-center mt-1">
    //             <MapPin className="w-4 h-4 mr-1" />
    //             {property?.property?.address?.state},{" "}
    //             {property?.property?.address?.city}
    //           </p>
    //         </div>
    //         <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
    //           {property?.reservations?.length} Bookings
    //         </span>
    //       </div>

    //       <div className="space-y-2">
    //         {property?.reservations?.length > 0 && (
    //           <Table>
    //             <TableHeader className="bg-gray-50 border-b border-gray-200">
    //               <TableRow>
    //                 {userColumns.map((col) => (
    //                   <TableHead
    //                     key={col.name}
    //                     className="px-6 py-4 text-sm font-semibold text-gray-700"
    //                   >
    //                     {col.name}
    //                   </TableHead>
    //                 ))}
    //               </TableRow>
    //             </TableHeader>
    //             <TableBody>
    //               {property?.reservations?.map((booking) => (
    //                 <TableRow key={booking?._id}>
    //                   {userColumns.map((col) => (
    //                     <TableCell key={col.name}>
    //                       <span className="text-gray-600">
    //                         {col.cell(booking)}
    //                       </span>
    //                     </TableCell>
    //                   ))}
    //                 </TableRow>
    //               ))}
    //             </TableBody>
    //           </Table>
    //         )}
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <div className="space-y-6">
      {/* Accordion component to wrap the list of properties */}
      <Accordion type="single" collapsible>
        {properties?.map((property) => (
          <AccordionItem key={property._id} value={property._id}>
            <AccordionTrigger className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start justify-between mb-4">
              <div className="min-w-20">
                <h3 className="text-lg font-semibold text-gray-900 capitalize">
                  {property?.property?.title}
                </h3>
                <p className="text-sm text-gray-600 flex items-center mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property?.property?.address?.state},{" "}
                  {property?.property?.address?.city}
                </p>
              </div>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {property?.reservations?.length} Bookings
              </span>
            </AccordionTrigger>

            {/* Accordion Content: Table with booking details */}
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
      </Accordion>
    </div>
  );
};

export default SlotBookingDetails;
