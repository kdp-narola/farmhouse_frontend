import { ArrowLeft, Calendar, Clock, CreditCard, Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BookingFlow() {
  const [bookingType, setBookingType] = useState<"hourly" | "daily">("hourly");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal">(
    "stripe"
  );
  const onNavigate = useNavigate();

  const property = {
    id: 1,
    title: "Modern Loft Studio",
    location: "Downtown LA",
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
    priceHourly: 75,
    priceDaily: 500,
  };

  const calculateTotal = () => {
    if (bookingType === "hourly") {
      const hours = 4;
      return hours * property.priceHourly;
    }
    return property.priceDaily;
  };

  const serviceFee = calculateTotal() * 0.1;
  const total = calculateTotal() + serviceFee;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-violet-50 pb-20">
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate(`/property-detail/${property.id}`)}
            className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-xl font-bold text-gray-800">Complete Booking</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Booking Details
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Booking Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setBookingType("hourly")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      bookingType === "hourly"
                        ? "border-teal-500 bg-teal-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Clock
                      className={`w-6 h-6 mx-auto mb-2 ${
                        bookingType === "hourly"
                          ? "text-teal-600"
                          : "text-gray-400"
                      }`}
                    />
                    <div
                      className={`font-semibold ${
                        bookingType === "hourly"
                          ? "text-teal-700"
                          : "text-gray-600"
                      }`}
                    >
                      Hourly
                    </div>
                    <div className="text-sm text-gray-500">
                      ${property.priceHourly}/hr
                    </div>
                  </button>
                  <button
                    onClick={() => setBookingType("daily")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      bookingType === "daily"
                        ? "border-violet-500 bg-violet-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Calendar
                      className={`w-6 h-6 mx-auto mb-2 ${
                        bookingType === "daily"
                          ? "text-violet-600"
                          : "text-gray-400"
                      }`}
                    />
                    <div
                      className={`font-semibold ${
                        bookingType === "daily"
                          ? "text-violet-700"
                          : "text-gray-600"
                      }`}
                    >
                      Daily
                    </div>
                    <div className="text-sm text-gray-500">
                      ${property.priceDaily}/day
                    </div>
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>

              {bookingType === "hourly" && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Payment Method
              </h2>

              <div className="space-y-4">
                <button
                  onClick={() => setPaymentMethod("stripe")}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                    paymentMethod === "stripe"
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-500 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">
                        Credit Card
                      </div>
                      <div className="text-sm text-gray-500">
                        Powered by Stripe
                      </div>
                    </div>
                  </div>
                  {paymentMethod === "stripe" && (
                    <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setPaymentMethod("paypal")}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                    paymentMethod === "paypal"
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xs">
                        PayPal
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">PayPal</div>
                      <div className="text-sm text-gray-500">Fast & secure</div>
                    </div>
                  </div>
                  {paymentMethod === "paypal" && (
                    <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Booking Summary
              </h3>

              <div className="flex gap-4 mb-6 pb-6 border-b border-gray-200">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div>
                  <div className="font-bold text-gray-800">
                    {property.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {property.location}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>
                    {bookingType === "hourly" ? "4 hours" : "1 day"} × $
                    {bookingType === "hourly"
                      ? property.priceHourly
                      : property.priceDaily}
                  </span>
                  <span className="font-semibold">${calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service fee</span>
                  <span className="font-semibold">
                    ${serviceFee.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">Total</span>
                  <span className="text-2xl font-bold text-teal-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigate("/booking-confirmation")}
                className="w-full py-4 bg-gradient-to-r from-teal-500 to-violet-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Confirm & Pay
              </button>

              <div className="mt-4 text-center text-xs text-gray-500">
                By booking, you agree to our Terms of Service
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
