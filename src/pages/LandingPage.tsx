import Navbar from "@/components/Navbar";
import {
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  Camera,
  Shield,
  TrendingUp,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-property.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useList } from "@/contexts/ListingContext";

const LandingPage = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [bookingType, setBookingType] = useState<"hourly" | "daily">("hourly");
  const onNavigate = useNavigate();

  const { property, getPropertyList } = useList();
  console.log("property from landing page", property);
  const baseURL = import.meta.env.VITE_IMAGE_ENDPOINT;

  useEffect(() => {
    const payload = {
      options: {
        pagination: true,
        page: 1,
        limit: 3,
        select:
          "title address.city address.state pricePerDay pricePerHours images",
      },
    };

    getPropertyList(payload);
  }, []);

  const handleSearch = () => {
    onNavigate("/property");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-violet-50">
      <Navbar />

      <section className="relative p-4 md:p-8 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-2xl md:text-4xl font-bold">
                <span className="bg-gradient-to-r from-teal-600 to-violet-600 bg-clip-text text-transparent">
                  Find Your Perfect
                </span>
                <br />
                <span className="text-gray-800">Creative Space</span>
              </h1>
              <p className="md:text-lg text-muted-foreground">
                Book stunning locations for photoshoots or find your next
                staycation. From hourly studios to daily rentals.
              </p>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-4 md:p-6">
              <div className="flex gap-4 mb-4">
                <Button
                  onClick={() => setBookingType("hourly")}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    bookingType === "hourly"
                      ? "bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Clock className="w-5 h-5" />
                  Hourly
                </Button>
                <Button
                  onClick={() => setBookingType("daily")}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    bookingType === "daily"
                      ? "bg-gradient-to-r from-violet-500 to-violet-400 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  Daily
                </Button>
              </div>

              <div className="grid lg:grid-cols-3 gap-4">
                <div className="relative">
                  <MapPin className="absolute z-10 left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Location"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full pl-[40px] py-2.5"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute z-10 left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="w-full pl-[40px] py-2.5"
                  />
                </div>
                <Button
                  variant={"gradient"}
                  onClick={handleSearch}
                  className="py-4 bg-gradient-to-r from-teal-500 to-violet-500"
                >
                  Search <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-8 flex-wrap">
              <div>
                <p className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                  10K+
                </p>
                <p className="text-sm text-muted-foreground">Properties</p>
              </div>
              <div>
                <p className="text-2xl font-bold gradient-accent bg-clip-text text-transparent">
                  50K+
                </p>
                <p className="text-sm text-muted-foreground">Happy Users</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">4.9★</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-glow">
              <img
                src={heroImage}
                alt="Beautiful rental property"
                className="aspect-square object-cover animate-zoomInOut"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="p-4 md:p-8 bg-white">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-1 text-gray-800">
            Featured Spaces
          </h2>
          <p className="text-gray-600 text-lg">
            Handpicked locations loved by creators
          </p>
          <Button
            variant={"outline"}
            size={"sm"}
            className="mt-4"
            onClick={() => onNavigate("/property")}
          >
            Explore more
          </Button>
        </div>

        {/* <div className="flex justify-end mb-8">Explore more</div> */}

        <div className="grid md:grid-cols-3 gap-8">
          {property?.map((property) => (
            <div
              key={property._id}
              onClick={() => onNavigate(`/property-detail/${property._id}`)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative aspect-auto h-64 overflow-hidden">
                <img
                  src={`${baseURL}/${property?.images[0]}`}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="font-bold text-teal-600">
                    ${property?.pricePerHours}/hr
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2 truncate capitalize">
                  {property.title}
                </h3>
                <p className="flex items-center text-gray-600 mb-2 gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {property?.address?.city}, {property?.address?.state}
                  </span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-gray-500">
                    ${property?.pricePerDay}/day
                  </span>
                  <ArrowRight className="w-5 h-5 text-teal-500 group-hover:translate-x-2 transition-transform" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="p-8 bg-gradient-to-br from-teal-50 to-violet-50">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg">Simple, fast, and secure</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              1. Search & Discover
            </h3>
            <p className="text-gray-600">
              Browse hundreds of unique spaces perfect for photoshoots, events,
              or staycations.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-400 to-violet-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              2. Book Instantly
            </h3>
            <p className="text-gray-600">
              Select your date, time, and booking type. Pay securely and get
              instant confirmation.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">
              3. Create Memories
            </h3>
            <p className="text-gray-600">
              Enjoy your space with peace of mind. Protected bookings and 24/7
              support.
            </p>
          </div>
        </div>
      </section>

      <section className="p-8 bg-gradient-to-r from-teal-600 to-violet-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <TrendingUp className="w-12 h-12 mx-auto" />
          <h2 className="text-3xl font-bold mb-2">List Your Space</h2>
          <p className="text-lg mb-8 text-teal-50">
            Turn your property into income. Join thousands of hosts earning from
            their spaces.
          </p>
          <Button
            variant={"ghost"}
            onClick={() => onNavigate("/auth/register")}
            className="bg-white text-teal-600 font-bold hover:scale-105 hover:text-teal-600"
          >
            Become a Host
          </Button>
        </div>
      </section>

      <footer className="bg-muted p-8 text-center">
        <div className="grid md:grid-cols-4 gap-8 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* <div className="w-10 h-10 rounded-full gradient-primary flex items-centerx justify-center"> */}
              <Search className="w-5 h-5 text-black" />
              {/* </div> */}
              <span className="text-xl font-bold">SpaceShare</span>
            </div>
            <p className="text-muted-foreground">
              Find and book the perfect space for your next project.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">For Guests</h3>
            <div className="space-y-2 text-muted-foreground">
              <div
                className="hover:text-primary transition-colors"
                onClick={() => onNavigate("/property")}
              >
                Search Spaces
              </div>
              <div
                className="hover:text-primary transition-colors"
                onClick={() => onNavigate("/auth/register")}
              >
                Sign Up
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">For Hosts</h3>
            <div className="space-y-2 text-muted-foreground">
              <div
                className="hover:text-primary transition-colors"
                onClick={() => onNavigate("/")}
              >
                {" "}
                List Property
              </div>
              <div
                className="hover:text-primary transition-colors"
                onClick={() => onNavigate("/auth/login")}
              >
                {" "}
                Host Login
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <div className="space-y-2 text-muted-foreground">
              <div>
                <a href="#" className="hover:text-primary transition-colors">
                  About
                </a>
              </div>
              <div>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>© 2025 SpaceShare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
