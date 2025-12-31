import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Home, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  create,
  deleteAmenities,
  update,
} from "@/services/api-routes/CURD/amenities";
import { useList } from "@/contexts/ListingContext";
import { AVAILABLE_ICONS } from "@/constant/constant";
import { Input } from "@/components/ui/input";

const Amenities = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAmenity, setNewAmenity] = useState({ label: "", icon: "" });
  const [editingId, setEditingId] = useState(null);
  const { getAmenitiesList, amenities } = useList();

  useEffect(() => {
    getAmenitiesList({ options: { pagination: false } });
  }, []);

  const getIconComponent = (iconName) => {
    const icon = AVAILABLE_ICONS?.find((i) => i.name === iconName);
    return icon ? icon.icon : Home;
  };

  const handleAddAmenity = async () => {
    try {
      if (editingId) {
        setEditingId(null);
        await update(editingId, newAmenity);
        getAmenitiesList({ options: { pagination: false } });
      } else {
        await create(newAmenity);
        getAmenitiesList({ options: { pagination: false } });
      }
    } catch (error) {
      console.log("error", error);
    }
    setIsModalOpen(false);
  };

  const handleEdit = (amenity) => {
    setNewAmenity({ label: amenity?.label, icon: amenity?.icon });
    setEditingId(amenity._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (_id) => {
    try {
      await deleteAmenities(_id);
      getAmenitiesList();
    } catch (error) {
      console.log("error", error);
    }
  };

  const openModal = () => {
    setNewAmenity({ label: "", icon: "" });
    setEditingId(null);
    setIsModalOpen(true);
  };

  return (
    <div className="">
      <div className="mx-auto p-8">
        {/* <div className='flex justify-between mb-4'>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Amenities Management</h2>
          <p className="text-gray-600 text-sm">Manage farmhouse amenities and features</p>
        </div>
        <Button onClick={openModal} variant="default" className="bg-white hover:bg-white text-teal-600 hover:text-teal-700">
          <Plus className="w-5 h-5" />
          Add New
        </Button>
        </div> */}
        {/* Stats Card */}
        {/* <div className="bg-gradient-to-r from-teal-500 to-violet-500 rounded-2xl shadow-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <Utensils className="w-8 h-8" />
              <p className="text-5xl font-bold mb-1">{amenities?.length}</p>
              <p className="text-lg opacity-90">Total Amenities</p>
            </div>
            <Button onClick={openModal} variant="ghost" className="bg-white hover:bg-white text-teal-600 hover:text-teal-700 rounded-xl flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New
            </Button>
          </div>
        </div> */}

        {/* Amenities Listings ==> list API Integrations */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              All Amenities({amenities?.length})
            </h3>
            <Button
              onClick={openModal}
              variant="default"
              className="bg-white hover:bg-white text-teal-600 hover:text-teal-700"
            >
              <Plus className="w-5 h-5" />
              Add New
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {amenities?.map((amenity) => {
              const IconComponent = getIconComponent(amenity?.icon);
              return (
                <div
                  key={amenity?._id}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="bg-teal-100 rounded-lg p-2">
                      <IconComponent className="w-5 h-5 text-teal-600" />
                    </div>
                    <div className="flex gap-1">
                      <Button
                        onClick={() => handleEdit(amenity)}
                        variant="ghost"
                        className="p-2 hover:bg-gray-100"
                      >
                        <Edit2 className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(amenity?._id)}
                        variant="ghost"
                        className="p-2 hover:bg-gray-100"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-800 text-sm">
                    {amenity?.label}
                  </h4>
                </div>
              );
            })}
          </div>
          {amenities?.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Utensils className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No amenities found</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <DialogTitle>
            {editingId ? "Edit Amenity" : "Add New Amenity"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Fill in the details to add or update an amenity.
          </DialogDescription>

          <div className="p-2">
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Amenity Label *
              </label>
              <Input
                type="text"
                value={newAmenity.label}
                onChange={(e) =>
                  setNewAmenity({ ...newAmenity, label: e.target.value })
                }
                placeholder="e.g., Stove, Swimming Pool, WiFi"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg "
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Icon *
              </label>
              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-64 overflow-y-auto p-2 border border-gray-200 rounded-lg">
                {AVAILABLE_ICONS?.map((i) => {
                  const IconComp = i?.icon;
                  return (
                    <Button
                      key={i?.name}
                      onClick={() =>
                        setNewAmenity({ ...newAmenity, icon: i.name })
                      }
                      variant={"ghost"}
                      className="bg-gray-100 rounded-lg "
                      title={i?.name}
                    >
                      <IconComp className="w-5 h-5 mx-auto" />
                    </Button>
                  );
                })}
              </div>
              {newAmenity?.icon && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected:{" "}
                  <span className="font-semibold">{newAmenity?.icon}</span>
                </p>
              )}
            </div>

            {newAmenity?.label && newAmenity?.icon && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Preview:
                </p>
                <div className="inline-flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-sm">
                  {(() => {
                    const PreviewIcon = getIconComponent(newAmenity?.icon);
                    return <PreviewIcon className="w-6 h-6 text-violet-500" />;
                  })()}
                  <span className="font-medium text-gray-800">
                    {newAmenity?.label}
                  </span>
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <Button
                onClick={handleAddAmenity}
                disabled={!newAmenity?.label || !newAmenity?.icon}
                className="w-full rounded-lg"
              >
                {editingId ? "Update Amenity" : "Add Amenity"}
              </Button>
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="ghost"
                className="border border-gray-300 "
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Amenities;
