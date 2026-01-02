import { useState } from "react";
import {
  Heart,
  MapPin,
  Calendar,
  DollarSign,
  Share2,
  Trash2,
  Filter,
  Grid,
  List,
  Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";

const WishlistPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [filterCategory, setFilterCategory] = useState("all");

  const wishlistItems = [
    {
      id: 1,
      title: "Bohemian Garden House",
      location: "Austin, TX",
      price: 340,
      priceType: "Hourly",
      image:
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "luxury",
      rating: 4.8,
      reviews: 124,
      availability: "Available",
    },
    {
      id: 2,
      title: "Cozy Studio Apartment",
      location: "Portland, OR",
      price: 1500,
      priceType: "Daily",
      image:
        "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "beachfront",
      rating: 4.9,
      reviews: 89,
      availability: "Available",
    },
    {
      id: 3,
      title: "Luxury Penthouse",
      location: "Miami, FL",
      price: 850,
      priceType: "Daily",
      image:
        "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "farmhouse",
      rating: 4.7,
      reviews: 156,
      availability: "Booked",
    },
  ];

  const filteredItems =
    filterCategory === "all"
      ? wishlistItems
      : wishlistItems.filter((item) => item.category === filterCategory);

  const handleViewModeChange = (mode) => setViewMode(mode);
  const handleFilterChange = (e) => setFilterCategory(e.target.value);

  const statsCard = (label, value, icon, borderColor) => (
    <div
      className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 ${borderColor}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{label}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen custom-gradient-teal-violet-3">
      <Navbar />

      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
            <h2 className="text-4xl font-bold text-gray-800">My Wishlist</h2>
          </div>
          <p className="text-gray-600 text-lg">
            {" "}
            Your collection of dream spaces{" "}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {statsCard(
            "Saved Spaces",
            wishlistItems.length,
            <Heart className="w-10 h-10 text-pink-500" />,
            "border-pink-500"
          )}
          {statsCard(
            "Available Now",
            wishlistItems.filter((i) => i.availability === "Available").length,
            <Calendar className="w-10 h-10 text-teal-500" />,
            "border-teal-500"
          )}
          {statsCard(
            "Avg. Rating",
            4.8,
            <Star className="w-10 h-10 text-violet-500 " />,
            "border-violet-500"
          )}
          {statsCard(
            "Total Value",
            "$2000",
            <DollarSign className="w-10 h-10 text-yellow-500" />,
            "border-yellow-500"
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterCategory}
              onChange={handleFilterChange}
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Categories</option>
              <option value="luxury">Luxury</option>
              <option value="farmhouse">Farmhouse</option>
              <option value="beachfront">Beachfront</option>
              <option value="cabin">Cabin</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleViewModeChange("grid")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleViewModeChange("list")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
          }
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group ${
                viewMode === "list" ? "flex" : ""
              }`}
            >
              <div
                className={`relative ${
                  viewMode === "list" ? "w-1/3" : "h-64"
                } overflow-hidden`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Button className="absolute top-4 right-4 space-x-2 h-7 w-7 flex justify-center items-center bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all shadow-lg">
                  <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                </Button>
                <div
                  className={`absolute top-4 left-4 ${
                    item.availability === "Available"
                      ? "bg-teal-500"
                      : "bg-gray-400"
                  } text-white px-3 py-1 rounded-full text-sm font-medium`}
                >
                  {item.availability}
                </div>
              </div>

              <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors mb-3">
                  {" "}
                  {item.title}{" "}
                </h3>

                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1 text-teal-500" />
                  <span className="text-sm">{item.location}</span>
                </div>

                <div className="flex items-center mb-4">
                  <StarRating star={item?.rating} />
                  <span className="ml-2 text-sm text-gray-600">
                    {" "}
                    {item.rating} ({item.reviews} reviews){" "}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-gray-800">
                      {" "}
                      ${item.price}{" "}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">
                      {" "}
                      / {item.priceType}{" "}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-2 rounded-xl hover:shadow-lg transition-all font-medium">
                    {" "}
                    Book Now{" "}
                  </button>
                  <button className="p-2 border-2 border-gray-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all ">
                    {" "}
                    <Trash2 className="w-5 h-5 text-gray-600 hover:text-red-500" />{" "}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <Heart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {" "}
              No spaces found{" "}
            </h3>
            <p className="text-gray-600">Try adjusting your filters</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default WishlistPage;
