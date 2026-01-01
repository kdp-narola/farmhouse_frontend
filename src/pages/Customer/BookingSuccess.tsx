import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, Calendar, Clock, Home } from "lucide-react";
import confetti from "canvas-confetti";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/contexts/BookingContext";
import moment from "moment";

const BookingSuccess = () => {
  const [showContent, setShowContent] = useState(false);
  const onNavigate = useNavigate();
  const { verifyPaymentDetail } = useBooking();

  useEffect(() => {
    // Trigger confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    setTimeout(() => setShowContent(true), 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center p-4">
      <div
        className={`w-full max-w-2xl transition-all duration-700 ${
          showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <Card className="rounded-3xl shadow-2xl overflow-hidden">
          <CardContent className="p-6 text-center">
            {/* Success Icon */}
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 animate-scale-in shadow-glow">
              <Check className="w-12 h-12 text-white" />
            </div>

            {/* Success Message */}
            <h1 className="text-xl md:text-2xl font-bold mb-1">
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground mb-8">
              Get ready for an amazing experience at your space
            </p>

            {/* Booking Details */}
            <div className="bg-muted/30 rounded-3xl p-6 mb-6 text-left">
              <h2 className="font-bold text-lg mb-4">Booking Details</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Home className="w-5 h-5 text-primary mt-0.5" />
                  {verifyPaymentDetail?.property?.title ? (
                    <div>
                      <h3 className="font-semibold capitalize">
                        {/* Modern Loft with Skyline View */}
                        {verifyPaymentDetail?.property?.title}
                      </h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {verifyPaymentDetail?.property?.address?.city},{" "}
                        {verifyPaymentDetail?.property?.address?.state}
                        {/* Downtown, Los Angeles */}
                      </p>
                    </div>
                  ) : (
                    "N/A"
                  )}
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-semibold">Date</p>
                    <p className="text-sm text-muted-foreground">
                      {/* May 15, 2024 */}
                      {verifyPaymentDetail?.checkIn
                        ? moment(verifyPaymentDetail.checkIn).format(
                            "MMMM D, YYYY"
                          )
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-semibold">Time</p>
                    {/* <div className="text-sm text-muted-foreground">
                      2:00 PM - 6:00 PM (4 hours)
                    </div> */}
                    <p className="text-sm text-muted-foreground">
                      {verifyPaymentDetail?.checkIn &&
                      verifyPaymentDetail?.checkOut ? (
                        <>
                          {/* Format the checkIn and checkOut times */}
                          {moment(verifyPaymentDetail.checkIn).format(
                            "h:mm A"
                          )}{" "}
                          -{" "}
                          {moment(verifyPaymentDetail.checkOut).format(
                            "h:mm A"
                          )}{" "}
                          ({/* Calculate the duration in hours */}
                          {moment(verifyPaymentDetail.checkOut).diff(
                            moment(verifyPaymentDetail.checkIn),
                            "hours"
                          )}
                          {" hours"})
                        </>
                      ) : (
                        "N/A"
                      )}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Paid</span>
                    <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                      {/* $374.00 */}${verifyPaymentDetail?.finalAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-primary/5 rounded-2xl p-6 mb-6 text-left">
              <h3 className="font-bold mb-3">What's Next?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>A confirmation email has been sent to your inbox</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>The host will receive your booking details</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    You'll receive check-in instructions 24 hours before your
                    booking
                  </span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/customer/dashboard">
                <Button
                  variant="gradient"
                  // size="lg"
                  className="w-full sm:w-auto"
                >
                  View My Bookings
                </Button>
              </Link>
              <Button
                onClick={() => {
                  onNavigate("/property");
                }}
                variant="outline"
                // size="lg"
                className="w-full sm:w-auto"
              >
                Explore More Spaces
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingSuccess;
