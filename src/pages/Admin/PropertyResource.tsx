import { useState } from "react";
import Navbar from "@/components/Navbar";
import Amenities from "./Amenities";
import Category from "./Category";
import HouseRules from "./HouseRules";
import TabButton from "@/components/TabButton";

const PropertyResource = () => {
  const [currentPage, setCurrentPage] = useState("amenities");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Navbar />
      <div className="mx-auto px-8 mt-6">
        <div className="flex gap-4 border-b border-gray-200">
          <TabButton
            label="Amenities Management"
            value="amenities"
            currentPage={currentPage}
            onChange={setCurrentPage}
          />
          <TabButton
            label="Categories Management"
            value="categories"
            currentPage={currentPage}
            onChange={setCurrentPage}
          />
          <TabButton
            label="House Rules Management"
            value="rules"
            currentPage={currentPage}
            onChange={setCurrentPage}
          />
        </div>
      </div>
      {currentPage === "amenities" && <Amenities />}
      {currentPage === "categories" && <Category />}
      {currentPage === "rules" && <HouseRules />}
    </div>
  );
};

export default PropertyResource;
