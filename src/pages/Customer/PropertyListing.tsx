import Navbar from "@/components/Navbar";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import { useList } from "@/contexts/ListingContext";
import {
  MapPin,
  SlidersHorizontal,
  Search as SearchIcon,
  ArrowUpDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type Filters = {
  category: string;
  amenities: string[];
  pricePerDay: {
    minPrice: number;
    maxPrice: number;
  };
};

const PropertyListing = () => {
  const {
    property,
    propertyLoading,
    propertyPagination,
    propertyFilter,
    getPropertyList,
    getAmenitiesList,
    amenities,
    getCategoryList,
    category,
  } = useList();
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [payloadFilter, setPayloadFilter] = useState<Filters>({
    category: "",
    amenities: [],
    pricePerDay: {
      minPrice: 0,
      maxPrice: 5000,
    },
  });
  const [filters, setFilters] = useState<Filters>({
    category: "",
    amenities: [],
    pricePerDay: {
      minPrice: 0,
      maxPrice: 5000,
    },
  });

  const [searchParams] = useSearchParams();
  const onNavigate = useNavigate();
  const baseURL = import.meta.env.VITE_IMAGE_ENDPOINT;

  useEffect(() => {
    const minPrice = searchParams.has("minPrice")
      ? Number(searchParams.get("minPrice"))
      : 0;
    const maxPrice = searchParams.has("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : 5000;
    const category = searchParams.get("category") || "";
    const amenities = searchParams.has("amenities")
      ? searchParams.get("amenities").split(",")
      : [];

    setFilters({
      category,
      amenities,
      pricePerDay: { minPrice, maxPrice },
    });

    setPayloadFilter({
      category,
      amenities,
      pricePerDay: { minPrice, maxPrice },
    });
    setIsInitialized(true);
  }, [searchParams]);

  const applyFilters = () => {
    const query = new URLSearchParams();

    if (filters.category) query.set("category", filters.category);
    if (filters.amenities.length)
      query.set("amenities", filters.amenities.join(","));
    query.set("minPrice", filters.pricePerDay.minPrice.toString());
    query.set("maxPrice", filters.pricePerDay.maxPrice.toString());

    onNavigate("?" + query.toString());
    setShowFilters(false);
  };

  // Reset Filters to default values
  const resetFilters = () => {
    const defaultFilters = {
      category: "",
      amenities: [],
      pricePerDay: {
        minPrice: propertyFilter?.pricePerDay?.minPrice || 0,
        maxPrice: propertyFilter?.pricePerDay?.maxPrice || 5000,
      },
    };

    setFilters(defaultFilters);
    setPayloadFilter(defaultFilters);
    setShowFilters(false);
    onNavigate("?");
  };

  // Pagination handling (limit and page change)
  const handleLimitChange = (value) => {
    setLimit(value);
    setPage(1);

    const query = new URLSearchParams(searchParams);
    query.set("limit", value.toString());
    query.set("page", "1");

    onNavigate("?" + query.toString());
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= propertyPagination?.totalPages) {
      setPage(newPage);
      const query = new URLSearchParams(searchParams);
      query.set("page", newPage.toString());

      onNavigate("?" + query.toString());
    }
  };

  useEffect(() => {
    const limitFromURL = searchParams.has("limit")
      ? Number(searchParams.get("limit"))
      : 10;
    const pageFromURL = searchParams.has("page")
      ? Number(searchParams.get("page"))
      : 1;

    setLimit(limitFromURL);
    setPage(pageFromURL);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const payload = {
      options: {
        pagination: true,
        page,
        limit,
        sort,
        select:
          "title address.city address.state pricePerDay pricePerHours images avgRate",
        search: {
          keys: ["title", "description", "address.city"],
          value: search,
        },
      },
      filter: payloadFilter,
      population: [],
    };

    getPropertyList(payload);
  }, [page, limit, search, sort, payloadFilter]);

  useEffect(() => {
    getAmenitiesList({ options: { pagination: false } });
    getCategoryList({ options: { pagination: false } });
  }, []);

  const handleMapData = property?.map((property) => (
    <Card
      key={property?._id}
      onClick={() => onNavigate(`/property-detail/${property?._id}`)}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 "
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={`${baseURL}/${property?.images[0]}`}
          alt={property?.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className="font-bold text-teal-600">
            ₹{property?.pricePerHours}/hr
          </span>
        </div>
      </div>

      <CardContent className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 truncate capitalize">
          {" "}
          {property?.title}{" "}
        </h3>
        <p className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm capitalize">
            {property?.address?.city}, {property?.address?.state}
          </span>
        </p>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {" "}
            ₹{property?.pricePerDay}/day{" "}
          </p>

          {property?.avgRate ? (
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="font-semibold text-gray-700">
                {property?.avgRate.toFixed(1)}
              </span>
            </div>
          ) : (
            <p className="text-gray-500">No reviews</p>
          )}
        </div>
      </CardContent>
    </Card>
  ));
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-violet-50">
      <div className="relative top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm space-y-2">
        <Navbar />
        <div className="mx-auto px-8 py-4">
          <div className="flex items-center gap-4">
            <Search
              search={search}
              setSearch={setSearch}
              placeholder={"Search by location, title, or features..."}
            />
            <Button
              size={"sm"}
              variant={"ghost"}
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-xl bg-gray-200"
            >
              <SlidersHorizontal className="w-4 h-4 text-gray-600" />
            </Button>
            <div>
              <Select value={sort} onValueChange={(value) => setSort(value)}>
                <SelectTrigger>
                  <div className="h-9 p-0 hover:bg-white hover:text-gray-500 flex justify-center items-center gap-1">
                    <ArrowUpDown className="w-4 h-4 text-gray-600" />
                    <span>Sort by</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="-createdAt">Newest Arrivals</SelectItem>
                    <SelectItem value="-pricePerDay">
                      High to low (Price)
                    </SelectItem>
                    <SelectItem value="pricePerDay">
                      Low to high (Price)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Dialog open={showFilters} onOpenChange={setShowFilters}>
            <DialogContent className="max-w-xl">
              <DialogTitle className="text-xl font-semibold">
                {" "}
                Filters{" "}
              </DialogTitle>

              <div className="space-y-6 mt-4">
                {/* CATEGORY */}
                <div className="space-y-2">
                  <Label className="text-gray-700">Category</Label>
                  <Select
                    value={filters.category}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {category?.map((cat) => (
                          <SelectItem key={cat._id} value={cat._id}>
                            {" "}
                            {cat.label}{" "}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* MULTI SELECT AMENITIES */}
                <div className="space-y-2">
                  <Label className="text-gray-700">Amenities</Label>
                  <div className="border rounded-lg p-2 space-y-2 max-h-40 overflow-y-auto">
                    {amenities?.map((amenity) => (
                      <div
                        key={amenity?._id}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          checked={filters?.amenities?.includes(amenity?._id)}
                          onChange={() => {
                            setFilters((prev) => ({
                              ...prev,
                              amenities: prev?.amenities?.includes(amenity?._id)
                                ? prev?.amenities?.filter(
                                    (id) => id !== amenity?._id
                                  )
                                : [...prev.amenities, amenity?._id],
                            }));
                          }}
                        />
                        <span>{amenity?.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PRICE RANGE SLIDER */}
                <div className="space-y-2">
                  <Label className="text-gray-700">Price Range (₹/day)</Label>
                  <Slider
                    min={propertyFilter?.pricePerDay?.minPrice}
                    max={propertyFilter?.pricePerDay?.maxPrice}
                    step={50}
                    value={[
                      filters?.pricePerDay?.minPrice,
                      filters?.pricePerDay?.maxPrice,
                    ]}
                    onValueChange={(val) =>
                      setFilters((prev) => ({
                        ...prev,
                        pricePerDay: {
                          minPrice: val[0],
                          maxPrice: val[1],
                        },
                      }))
                    }
                  />

                  <div className="flex justify-center text-sm text-gray-500">
                    <span className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-sm font-semibold">
                      ₹
                      {filters.pricePerDay.minPrice
                        ? filters.pricePerDay.minPrice
                        : propertyFilter?.pricePerDay?.minPrice}{" "}
                      - ₹
                      {filters.pricePerDay.maxPrice
                        ? filters.pricePerDay.maxPrice
                        : propertyFilter?.pricePerDay?.maxPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-between mt-6 pt-4 border-t">
                <Button variant={"ghost"} onClick={resetFilters}>
                  Reset
                </Button>
                <Button onClick={applyFilters}>Apply Filters</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mx-auto p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Explore Spaces
          </h1>
          {property?.length > 0 && (
            <p className="text-gray-600">
              Discover {property?.length} amazing properties
            </p>
          )}
        </div>

        {/* <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6"> */}
        {property?.length > 0 && !propertyLoading ? (
          <Pagination
            className={"grid md:grid-cols-3 lg:grid-cols-4 gap-6"}
            data={property}
            handleFunction={handleMapData}
            handleLimitChange={handleLimitChange}
            handlePageChange={handlePageChange}
            page={page}
            limit={limit}
            totalPage={propertyPagination?.totalPages}
            currentPage={propertyPagination?.currentPage}
            displayLimitBtn={true}
          />
        ) : (
          <div className="flex justify-center items-center">
            <Spinner className="size-8" />
          </div>
        )}
      </div>
      {property?.length === 0 && !propertyLoading && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl font-semibold text-gray-500 mb-2">
            Oops! Property Not Found
          </h1>
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

export default PropertyListing;
