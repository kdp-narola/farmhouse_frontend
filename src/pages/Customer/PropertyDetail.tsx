import { useEffect, useState } from "react";
import {
  MapPin,
  Star,
  Heart,
  Share2,
  Users,
  Home,
  Sparkles,
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "../../hooks/use-toast";
import { cn } from "../../lib/utils";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useList } from "@/contexts/ListingContext";
import { AVAILABLE_ICONS } from "@/constant/constant";
import moment from "moment-timezone";
import { availableSlots, propertyBooking } from "@/services/api-routes/booking";
import { Spinner } from "@/components/ui/spinner";
import { useBooking } from "@/contexts/BookingContext";

const PropertyDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const onNavigate = useNavigate();
  const { getPropertyDetails, propertyDetail, propertyDetailLoading } =
    useList();
  const { getVerifiedPaymentDetail, getDeniedPaymentDetail } = useBooking();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingType, setBookingType] = useState<"hourly" | "daily">("hourly");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>();
  const [duration, setDuration] = useState<string>();
  const [guests, setGuests] = useState<string>("1");
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);

  const baseURL = import.meta.env.VITE_IMAGE_ENDPOINT;
  const RazorpayKey = import.meta.env.VITE_RAZORPAY_KEY_SECRET;

  const isValidBooking =
    !!startDate &&
    ((bookingType === "daily" && !!endDate) ||
      (bookingType === "hourly" && !!duration && !!startTime));

  const time = moment(startTime, "HH:mm:ss");
  const checkInDate =
    bookingType === "daily"
      ? moment(startDate).format("YYYY-MM-DDTHH:mm:ss")
      : moment(startDate)
          .hour(time.hours())
          .minute(time.minutes())
          .second(time.seconds())
          .format("YYYY-MM-DDTHH:mm:ss");
  const checkOutDate =
    bookingType === "daily"
      ? moment(endDate).format("YYYY-MM-DDTHH:mm:ss")
      : moment(checkInDate).add(duration, "h").format("YYYY-MM-DDTHH:mm:ss");

  useEffect(() => {
    getPropertyDetails(id);
  }, []);

  const getTotalNights = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diff = end - start;
    return diff / (1000 * 60 * 60 * 24);
  };

  const property = {
    rating: 4.9,
    reviewCount: 127,
    host: {
      name: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      verified: true,
      joinedDate: "2022",
    },
    reviewsList: [
      {
        id: "1",
        author: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        rating: 5,
        date: "April 2024",
        comment:
          "Absolutely stunning space! Perfect for our product photoshoot. The natural light is incredible and the host was super helpful. Highly recommend!",
      },
      {
        id: "2",
        author: "David Park",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        rating: 5,
        date: "March 2024",
        comment:
          "Great location and beautiful interior. We used it for a weekend stay and loved every moment. The skyline views are even better in person.",
      },
      {
        id: "3",
        author: "Emma Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        rating: 4,
        date: "March 2024",
        comment:
          "Wonderful space with lots of character. The industrial aesthetic is perfect for creative work. Only minor issue was parking, but overall fantastic experience.",
      },
    ],
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyDetail?.images?.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + propertyDetail?.images?.length) %
        propertyDetail?.images?.length
    );
  };

  const getIconComponent = (iconName) => {
    const icon = AVAILABLE_ICONS.find((i) => i.name === iconName);
    return icon ? icon.icon : Home;
  };

  const availableSlot = async () => {
    setLoading(true);
    const payload = {
      propertyId: id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
    };
    try {
      const res = await availableSlots(payload);
      setIsAvailable(res?.data?.data?.isAvailable);
      setAmount(res?.data?.data?.totalPrice);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isValidBooking) {
      availableSlot();
    }
  }, [bookingType, startDate, duration, endDate]);

  const handleBooking = async () => {
    const payload = {
      bookingType: bookingType.toUpperCase(),
      propertyId: id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guest: guests,
      specialRequest: null,
    };

    if (!startDate || (bookingType === "hourly" && (!startTime || !duration))) {
      toast({
        title: "Missing information",
        description: "Please fill in all booking details",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await propertyBooking(payload);
      toast({
        title: "Booking confirmed! 🎉",
        description: "Redirecting to payment...",
      });

      const orderId = res?.data?.data?.orderId;
      const customerId = res?.data?.data?.customerId;
      const timeout = res?.data?.data?.timeout;

      const options = {
        key: RazorpayKey,
        order_id: orderId,
        customer_id: customerId,
        timeout: timeout,
        // expire_by: Date.now() + 3600,
        handler: async function (response) {
          const res = await getVerifiedPaymentDetail(response);
          // const res = await verifyPayment(response);

          onNavigate("/booking-success");
        },
        modal: {
          ondismiss: async function () {
            getDeniedPaymentDetail({ orderId: orderId });
            // const res = await deniedPayment({
            //   orderId: orderId,
            // });
          },
        },
        // handler: async function (response) {
        //   await axiosInstance.post("/reservation/verifyPayment", { response });
        // },
        // modal: {
        //   ondismiss: async function () {
        //     await axiosInstance.post("/reservation/deniedPayment", {
        //       orderId: orderId,
        //     });
        //   },
        // },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("error", error);
      if (error.status === 401) onNavigate("/auth/login");
    } finally {
      //
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {!propertyDetailLoading ? (
        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="mb-2">
            <h1 className="text-3xl font-bold capitalize">
              {propertyDetail?.title}
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-2 ">
                <p className="flex items-center gap-1 text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {propertyDetail?.address?.city},{" "}
                    {propertyDetail?.address?.state}
                  </span>
                </p>
                {propertyDetail?.avgRate ? (
                  <p className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-highlight text-highlight" />
                    <span className="font-semibold">
                      {propertyDetail?.avgRate.toFixed(1)}
                    </span>
                    <span className="text-gray-500">
                      ({propertyDetail?.totalReviews} reviews)
                    </span>
                  </p>
                ) : (
                  <></>
                  // <p className="text-gray-500">No reviews yet</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="relative mb-8 rounded-3xl overflow-hidden shadow-lg group">
            <div className="relative max-h-[500px]">
              {propertyDetail?.images?.length > 0 && (
                <img
                  src={`${baseURL}/${propertyDetail?.images[currentImageIndex]}`}
                  alt={propertyDetail?.title}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Navigation Buttons */}
              <Button
                variant={"ghost"}
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-card/70 rounded-full opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft />
              </Button>
              <Button
                variant={"ghost"}
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-card/70 rounded-full opacity-0 group-hover:opacity-100"
              >
                <ChevronRight />
              </Button>

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {propertyDetail?.images?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      index === currentImageIndex
                        ? "bg-white w-8"
                        : "bg-white/50 hover:bg-white/75"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              {propertyDetail?.images
                ?.slice(0, propertyDetail?.images?.length)
                .map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                      index === currentImageIndex
                        ? "border-white scale-110"
                        : "border-transparent opacity-70 hover:opacity-100"
                    )}
                  >
                    <img
                      src={`${baseURL}/${img}`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Host Info */}
              {/* <Card className="rounded-3xl shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="">
                        <AvatarImage src={property.host.avatar} />
                        <AvatarFallback>
                          {propertyDetail?.user?.fullName}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg capitalize">
                            {propertyDetail?.user?.fullName}
                          </h3>
                          {propertyDetail?.user?.status ===
                            USER_STATUS?.VERIFIED && (
                            <Badge variant="secondary" className="rounded-full">
                              <Check className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          Joined in{" "}
                          {new Date(
                            propertyDetail?.user?.createdAt
                          ).getFullYear()}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">Contact Host</Button>
                  </div>
                </CardContent>
              </Card> */}

              {/* Description */}
              <Card className="rounded-3xl shadow-soft">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-1">About this space</h2>
                  <p className="text-gray-500 leading-relaxed">
                    {propertyDetail?.description}
                  </p>
                  <Separator className="my-4" />

                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <Users className="w-6 h-6 mx-auto mb-1 text-teal-500" />
                      <p className="font-bold">
                        {propertyDetail?.max_capacity} Guests
                      </p>
                      <p className="text-sm text-gray-500">Maximum</p>
                    </div>
                    <div className="text-center">
                      <Home className="w-6 h-6 mx-auto mb-1 text-amber-500" />
                      <p className="font-bold">
                        {propertyDetail?.noBedroom} Bedrooms
                      </p>
                      <p className="text-sm text-gray-500">Comfortable</p>
                    </div>
                    <div className="text-center">
                      <Sparkles className="w-6 h-6 mx-auto mb-1 text-violet-500" />
                      <p className="font-bold">
                        {propertyDetail?.noBathroom} Bathrooms
                      </p>
                      <p className="text-sm text-gray-500">Modern</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Amenities */}
              <Card className="rounded-3xl shadow-soft">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-1">Amenities</h2>
                  <div className="grid md:grid-cols-4 gap-4">
                    {propertyDetail?.amenities?.map((amenity, index) => {
                      const IconComponent = getIconComponent(amenity?.icon);
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl"
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                          <span className="font-medium">{amenity.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* HouseRules */}
              <Card className="rounded-3xl shadow-soft">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-1">House Rules</h2>
                  <div className="grid md:grid-cols-4 gap-4">
                    {propertyDetail?.houserule?.map((rule, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl"
                        >
                          <div
                            className={`w-10 h-10 rounded-full ${
                              rule?.isAllowed ? "bg-primary/10" : "bg-red-50"
                            } flex items-center justify-center`}
                          >
                            {rule?.isAllowed ? (
                              <Check className="w-5 h-5 text-primary" />
                            ) : (
                              <X className="w-5 h-5 text-red-500" />
                            )}
                          </div>
                          <span className="font-medium">{rule.label}</span>
                        </div>
                      );
                    })}
                  </div>
                  {propertyDetail?.houseruleFromOwner && (
                    <div className="py-6">
                      <h2 className="font-bold mb-1">More Rules from Owner</h2>
                      <ul className="list-disc pl-6 space-y-1 text-gray-600">
                        {propertyDetail.houseruleFromOwner
                          ?.split(/(?<![A-Za-z])[-~#*]+(?![A-Za-z])|\n+/)
                          ?.filter((rule) => rule.trim() !== "")
                          ?.map((rule, index) => (
                            <li key={index}>{rule}</li>
                          ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card className="rounded-3xl shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Star className="w-6 h-6 fill-highlight text-highlight" />
                      {property.rating} ({property.reviewCount} reviews)
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {property.reviewsList.map((review) => (
                      <div
                        key={review.id}
                        className="pb-6 border-b flex items-start gap-4"
                      >
                        {/* <div className="flex items-start gap-4"> */}
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>{review.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-bold">{review.author}</h4>
                              <p className="text-sm text-gray-500">
                                {review.date}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: review.rating }).map(
                                (_, i) => (
                                  <Star
                                    key={i}
                                    className="w-4 h-4 fill-highlight text-highlight"
                                  />
                                )
                              )}
                            </div>
                          </div>
                          <p className="text-gray-500">{review.comment}</p>
                        </div>
                        {/* </div> */}
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full mt-6">
                    Show all {propertyDetail?.totalReviews} reviews
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="rounded-3xl shadow-lg">
                  <CardContent className="pt-6">
                    {/* Pricing Header */}
                    <div className="mb-2">
                      <Tabs
                        value={bookingType}
                        onValueChange={(v) => {
                          setBookingType(v as "hourly" | "daily");
                          setStartDate(null);
                          setEndDate(null);
                        }}
                      >
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger
                            value="hourly"
                            className="flex items-center gap-2"
                          >
                            <Clock className="w-4 h-4" /> Hourly{" "}
                          </TabsTrigger>
                          <TabsTrigger
                            value="daily"
                            className="flex items-center gap-2"
                          >
                            <CalendarIcon className="w-4 h-4" />
                            Daily
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>

                      <div className="mt-4 text-center">
                        <p className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                          ₹
                          {bookingType === "hourly"
                            ? propertyDetail?.pricePerHours
                            : propertyDetail?.pricePerDay}
                        </p>
                        <p className="text-gray-500">
                          per {bookingType === "hourly" ? "hour" : "night"}
                        </p>
                      </div>
                    </div>

                    <Separator className="mb-6" />

                    {/* Booking Form */}
                    <div className="space-y-4">
                      {/* Date Picker */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Start Date
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              className={cn(
                                "w-full justify-start text-left font-normal h-12 rounded-2xl border border-gray-300",
                                !startDate && "text-gray-500"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {startDate
                                ? format(startDate, "PPP")
                                : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={startDate}
                              onSelect={setStartDate}
                              disabled={(date) =>
                                date < new Date() ||
                                (endDate && date >= endDate)
                              }
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {bookingType === "daily" && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            End Date
                          </label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="ghost"
                                className={cn(
                                  "w-full justify-start text-left font-normal h-12 rounded-2xl border border-gray-300",
                                  !endDate && "text-gray-500"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {endDate
                                  ? format(endDate, "PPP")
                                  : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              {/* <PopoverClose asChild> */}

                              <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                                disabled={(date) =>
                                  date < new Date() ||
                                  (startDate && date <= startDate)
                                }
                                initialFocus
                                className="p-3 pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      )}

                      {/* Hourly Booking Options */}
                      {bookingType === "hourly" && (
                        <>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Start Time
                            </label>
                            <Select
                              value={startTime}
                              onValueChange={setStartTime}
                            >
                              <SelectTrigger className="h-12 rounded-2xl">
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 24 }, (_, i) => {
                                  const hour = i.toString().padStart(2, "0");
                                  return (
                                    <SelectItem key={i} value={`${hour}:00`}>
                                      {hour}:00
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Duration
                            </label>
                            <Select
                              value={duration}
                              onValueChange={setDuration}
                            >
                              <SelectTrigger className="h-12 rounded-2xl">
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((hours) => (
                                <SelectItem key={hours} value={hours.toString()}>
                                  {hours} {hours === 1 ? "hour" : "hours"}
                                </SelectItem>
                              ))} */}
                                {[...Array(23)].map((_, i) => {
                                  const hours = i + 1;
                                  return (
                                    <SelectItem
                                      key={hours}
                                      value={hours.toString()}
                                    >
                                      {hours} {hours === 1 ? "hour" : "hours"}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      )}

                      {/* Guests */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Guests</label>
                        <Select value={guests} onValueChange={setGuests}>
                          <SelectTrigger className="h-12 rounded-2xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from(
                              { length: propertyDetail?.max_capacity },
                              (_, i) => (
                                <SelectItem
                                  key={i + 1}
                                  value={(i + 1).toString()}
                                >
                                  {i + 1} {i === 0 ? "guest" : "guests"}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Pricing Summary */}
                    {isValidBooking && !!isAvailable && (
                      <div className="mt-6 space-y-3">
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                          <div className="flex justify-center items-center gap-2">
                            <span>Total</span>
                            <span className="text-xs text-gray-500">
                              (₹
                              {bookingType === "hourly"
                                ? propertyDetail?.pricePerHours
                                : propertyDetail?.pricePerDay}{" "}
                              ×{" "}
                              {bookingType === "hourly"
                                ? `${duration || 0} hours`
                                : `${getTotalNights()} night${
                                    getTotalNights() > 1 ? "s" : ""
                                  }`}
                              )
                            </span>
                          </div>
                          <span className="gradient-primary bg-clip-text text-transparent">
                            {/* ${total.toFixed(2)} */}₹{amount}
                          </span>
                        </div>
                      </div>
                    )}
                    {isValidBooking && !isAvailable && !loading && (
                      <div className="mt-6 bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="bg-red-500 text-white text-center py-2">
                          <span className="font-bold text-sm">Unavailable</span>
                        </div>

                        <div className="px-4 py-3">
                          <p className="text-red-600 text-xs mt-2 italic">
                            Sorry, the property is unavailable during the
                            selected time slot.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Book Button */}
                    <Button
                      disabled={!isAvailable || !isValidBooking || loading}
                      variant="gradient"
                      size="lg"
                      className="w-full mt-6"
                      onClick={handleBooking}
                    >
                      Reserve Now
                    </Button>

                    <p className="text-xs text-center text-gray-500 mt-4">
                      You won't be charged yet
                    </p>
                  </CardContent>
                </Card>

                {/* Location Card */}
                <Card className="rounded-3xl shadow-soft mt-6">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Location
                    </h3>
                    <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center">
                      <p className="text-gray-500">Map would go here</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-3">
                      {propertyDetail?.address?.mapLink}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center ">
          <Spinner className="size-8" />
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
