import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useList } from "@/contexts/ListingContext";
import {
  create,
  deleteHouseRules,
  update,
} from "@/services/api-routes/CURD/houserules";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

const HouseRules = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRule, setNewRule] = useState({ label: "" });
  const [editingId, setEditingId] = useState(null);
  const { getHouseruleList, houserule } = useList();

  useEffect(() => {
    getHouseruleList({ options: { pagination: false } });
  }, []);

  const handleAddAmenity = async () => {
    try {
      if (editingId) {
        setEditingId(null);
        await update(editingId, newRule);
        getHouseruleList({ options: { pagination: false } });
      } else {
        await create(newRule);
        getHouseruleList({ options: { pagination: false } });
      }
    } catch (error) {
      console.log("error", error);
    }
    setIsModalOpen(false);
  };

  const handleEdit = (houserule) => {
    setNewRule({ label: houserule?.label });
    setEditingId(houserule._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (_id) => {
    try {
      await deleteHouseRules(_id);
      getHouseruleList({ options: { pagination: false } });
    } catch (error) {
      console.log("error", error);
    }
  };

  const openModal = () => {
    setEditingId(null);
    setIsModalOpen(true);
    setNewRule({ label: "" });
  };

  return (
    <div className="">
      <div className="mx-auto p-4 md:p-8">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              All House Rules({houserule?.length})
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
          {/* <h3 className="text-xl font-bold text-gray-800 mb-6">All House Rules({houserule?.length})</h3> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {houserule?.map((houserule) => (
              <div
                key={houserule._id}
                className="custom-gradient-gray rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {/* <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-cyan-600" />
                    </div> */}
                  <h4 className="font-semibold text-gray-800 text-sm">
                    {houserule?.label}
                  </h4>
                </div>
                <div className="flex gap-1">
                  <Button
                    onClick={() => handleEdit(houserule)}
                    variant="ghost"
                    className="p-2 hover:bg-gray-100"
                  >
                    <Edit2 className="w-4 h-4 text-blue-600" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(houserule?._id)}
                    variant="ghost"
                    className="p-2 hover:bg-gray-100"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <DialogTitle>
            {editingId ? "Edit House Rules" : "Add New House Rules"}
          </DialogTitle>
          {/* <DialogDescription className="text-gray-600">Fill in the detail to add or update an houserule.</DialogDescription> */}
          <Separator />
          <div className="p-2">
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                House Rules *
              </label>
              <Input
                type="text"
                value={newRule.label}
                onChange={(e) => setNewRule({ label: e.target.value })}
                placeholder="e.g., Check-in Time: 2:00 PM onwards"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg "
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleAddAmenity}
                disabled={!newRule?.label}
                className="w-full rounded-lg"
              >
                {editingId ? "Update House Rules" : "Add House Rules"}
              </Button>
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="outline"
                className="border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
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

export default HouseRules;
