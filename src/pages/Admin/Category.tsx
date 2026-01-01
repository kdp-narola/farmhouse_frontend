import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  create,
  deleteCategory,
  update,
} from "@/services/api-routes/CURD/category";
import { useList } from "@/contexts/ListingContext";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ label: "" });
  const [editingId, setEditingId] = useState(null);
  const { getCategoryList, category } = useList();

  useEffect(() => {
    getCategoryList({ options: { pagination: false } });
  }, []);

  const handleAddAmenity = async () => {
    try {
      if (editingId) {
        setEditingId(null);
        await update(editingId, newCategory);
        getCategoryList({ options: { pagination: false } });
      } else {
        await create(newCategory);
        getCategoryList({ options: { pagination: false } });
      }
    } catch (error) {
      console.log("error", error);
    }
    setIsModalOpen(false);
  };

  const handleEdit = (category) => {
    setNewCategory({ label: category?.label });
    setEditingId(category._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (_id) => {
    try {
      await deleteCategory(_id);
      getCategoryList({ options: { pagination: false } });
    } catch (error) {
      console.log("error", error);
    }
  };

  const openModal = () => {
    setEditingId(null);
    setIsModalOpen(true);
    setNewCategory({ label: "" });
  };

  return (
    <div className="">
      <div className="mx-auto p-4 md:p-8">
        {/* <div className='flex justify-between mb-4'>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Categories Management</h2>
            <p className="text-gray-600 text-sm">Manage farmhouse categories and classifications</p>
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
                <Tag className="w-8 h-8" />
                <div className="text-5xl font-bold mb-1">{category.length}</div>
                <div className="text-lg opacity-90">Total Categories</div>
            </div>
            <Button onClick={openModal} variant="ghost" className="bg-white hover:bg-white text-teal-600 hover:text-teal-700 rounded-xl flex items-center gap-2" >
                <Plus className="w-5 h-5" />
                Add New
            </Button>
            </div>
        </div> */}

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              All Categories({category?.length})
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
          {/* <h3 className="text-xl font-bold text-gray-800 mb-6">All Categories({category.length})</h3> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {category?.map((category) => (
              <div
                key={category._id}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all flex items-center justify-between"
              >
                {/* <div className="flex items-center gap-3"> */}
                {/* <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <Tag className="w-5 h-5 text-cyan-600" />
                    </div> */}
                <h4 className="font-semibold text-gray-800 text-sm">
                  {category.label}
                </h4>
                {/* </div> */}
                <div className="flex gap-1">
                  <Button
                    onClick={() => handleEdit(category)}
                    variant="ghost"
                    className="p-2 hover:bg-gray-100"
                  >
                    <Edit2 className="w-4 h-4 text-blue-600" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(category?._id)}
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
            {editingId ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          {/* <DialogDescription className="text-gray-600">Fill in the details to add or update an category.</DialogDescription> */}
          <Separator />
          <div className="p-2">
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category Name *
              </label>
              <Input
                type="text"
                value={newCategory.label}
                onChange={(e) => setNewCategory({ label: e.target.value })}
                placeholder="e.g., Luxury Villa, Budget Friendly"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg "
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleAddAmenity}
                disabled={!newCategory?.label}
                className="w-full rounded-lg"
              >
                {editingId ? "Update Category" : "Add Category"}
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

export default Category;
