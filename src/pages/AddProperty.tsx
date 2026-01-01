import { useEffect, useState } from "react";
import {
  Edit2,
  Trash2,
  Plus,
  MapPin,
  Maximize,
  Bed,
  Bath,
  Users,
  X,
  User,
  Check,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import InputData from "@/components/InputData";
import { useList } from "@/contexts/ListingContext";
import { create, update, deleteProperty } from "@/services/api-routes/property";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ConfirmationButton from "@/components/ConfirmationButton";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";

const AddProperty = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
    watch,
    reset,
  } = useForm({ mode: "onTouched" });
  const {
    getAmenitiesList,
    amenities,
    getCategoryList,
    category,
    getOwnerPropertyList,
    ownerProperty,
    getHouseruleList,
    houserule,
  } = useList();
  const baseURL = import.meta.env.VITE_IMAGE_ENDPOINT;
  const selectedAmenities = watch("amenities") ?? [];
  const selectedHouseRule = watch("houserule") ?? [];
  const steps = [
    "Basic Info",
    "Pricing & Amenities",
    "House Rules",
    "Address",
    "Images",
  ];

  const [view, setView] = useState("list");
  const [images, setImages] = useState([]);
  const [imageToUpload, setImageToUpload] = useState([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [editingId, setEditingId] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectId, setSelectId] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    getAmenitiesList({ options: { pagination: false } });
    getCategoryList({ options: { pagination: false } });
    getOwnerPropertyList({ options: { pagination: false } });
    getHouseruleList({ options: { pagination: false } });
  }, []);

  const toggleAmenity = (amenityId, checked) => {
    const selected = getValues("amenities") ?? [];
    const updated = checked
      ? [...selected, amenityId]
      : selected.filter((id) => id !== amenityId);

    setValue("amenities", updated, {
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const toggleHouseRule = (houseruleId: string, checked: boolean) => {
    const updated = checked
      ? [...selectedHouseRule, houseruleId]
      : selectedHouseRule.filter((id) => id !== houseruleId);
    setValue("houserule", updated);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prev) => [...prev, ...newImages]);
    setImageToUpload((prev) => [...prev, ...Array.from(files)]);
  };

  const removeImage = (index, src) => {
    if (src.startsWith(baseURL)) {
      setRemovedImages((prev) => [...prev, src]);
      setImages((prev) => prev.filter((_, idx) => idx !== index));
    } else {
      setImages((prev) => prev.filter((_, idx) => idx !== index));
      setImageToUpload((prev) => prev.filter((_, idx) => idx !== index));
    }
  };

  // create
  const startCreate = () => {
    setView("create");
    reset();
  };

  // update
  const startEdit = (property) => {
    setView("edit");
    setEditingId(property?._id);
    setValue("title", property?.title);
    setValue("description", property?.description);
    setValue("category", property?.category);
    setValue("max_capacity", property?.max_capacity);
    setValue("area_sq", property?.area_sq);
    setValue("noBedroom", property?.noBedroom);
    setValue("noBathroom", property?.noBathroom);
    setValue("pricePerDay", property?.pricePerDay);
    setValue("pricePerHours", property?.pricePerHours);
    setValue("amenities", property?.amenities || [], {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("houserule", property?.houserule || [], {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("houseruleFromOwner", property?.houseruleFromOwner);
    setValue("addressLine", property?.address?.addressLine);
    setValue("street", property?.address?.street);
    setValue("city", property?.address?.city);
    setValue("state", property?.address?.state);
    setValue("district", property?.address?.district);
    setValue("pincode", property?.address?.pincode);
    setValue("landMark", property?.address?.landMark);
    setValue("mapLink", property?.address?.mapLink);
    const oldImages = property?.images?.map((img) => `${baseURL}/${img}`) || [];
    setImages(oldImages);
  };

  // delete
  const handleDelete = async (_id) => {
    try {
      await deleteProperty(_id);
      getOwnerPropertyList({ options: { pagination: false } });
      setConfirmOpen(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key] instanceof FileList) {
          Array.from(data[key]).forEach((file) => {
            formData.append(key, file);
          });
        } else if (data[key] instanceof File) {
          formData.append(key, data[key]);
        } else if (Array.isArray(data[key])) {
          data[key].forEach((item) => {
            formData.append(key, item);
          });
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });

      imageToUpload.forEach((file) => {
        formData.append("images", file);
      });

      removedImages.forEach((image) => {
        if (!image) return;
        const imagePath = image?.replace(baseURL + "/", "");
        formData.append("removedImages", imagePath);
      });

      if (view === "edit") {
        await update(editingId, formData);
      } else {
        await create(formData);
      }
      getOwnerPropertyList({ options: { pagination: false } });
      reset();
      setRemovedImages([]);
      setImages([]);
      setImageToUpload([]);
      setView("list");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Navbar />
      {view === "list" && (
        <div className="">
          <div className="mx-auto px-4 md:px-8 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start">
                {/* <div> */}
                <h1 className="text-2xl font-bold text-gray-800">
                  Property Management
                </h1>
                <p className="text-sm text-gray-500">
                  Manage your property listings
                </p>
                {/* </div> */}
              </div>
              <Button
                onClick={startCreate}
                variant="default"
                className="bg-white hover:bg-white text-violet-600 hover:text-violet-700"
              >
                <Plus className="w-5 h-5" />
                Add New
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto p-4 md:p-8">
        {view === "list" && (
          <div className="grid gap-6">
            {ownerProperty?.length > 0 &&
              ownerProperty?.map((p) => (
                <div
                  key={p?._id}
                  className="bg-white rounded-xl shadow-sm p-4 md:p-6 hover:shadow-md transition-shadow"
                >
                  <ConfirmationButton
                    variant={"ghost"}
                    confirmOpen={confirmOpen}
                    setConfirmOpen={setConfirmOpen}
                    message={`Are you sure you want to Delete the property?`}
                    onClick={() => {
                      handleDelete(selectId);
                    }}
                    className={""}
                    loading={""}
                    submitBtnName={"Yes"}
                  />
                  <div className="flex flex-col sm:flex-row gap-6 ">
                    <div className="w-full sm:w-60 h-50 flex">
                      <img
                        src={`${baseURL}${p?.images[0]}`}
                        alt="Property Image"
                        className="w-full h-full rounded-lg object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1 capitalize">
                            {p?.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>
                              {p?.address?.city}, {p.address?.state}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {p?.description}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant={"ghost"}
                            onClick={() => startEdit(p)}
                            className="p-2 text-blue-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-5 h-5" />
                          </Button>
                          <Button
                            variant={"ghost"}
                            // onClick={() => handleDelete(p?._id)}
                            onClick={() => {
                              setSelectId(p?._id);
                              setConfirmOpen(true);
                            }}
                            className="p-2 text-red-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 py-3 flex-wrap">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Maximize className="w-4 h-4 text-gray-400" />
                          <span>{p?.area_sq} sq ft</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Bed className="w-4 h-4 text-gray-400" />
                          <span>{p?.noBedroom} Beds</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Bath className="w-4 h-4 text-gray-400" />
                          <span>{p?.noBathroom} Baths</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>Max {p?.max_capacity}</span>
                        </div>
                      </div>
                      <Separator />

                      <div className="flex items-center gap-8 mt-4">
                        <div className="text-right">
                          <span className="text-xl font-bold text-purple-600">
                            ${p?.pricePerDay}
                          </span>
                          <span className="text-gray-500 text-sm ml-1">
                            /day
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-semibold text-cyan-600">
                            ${p?.pricePerHours}
                          </span>
                          <span className="text-gray-500 text-sm ml-1">
                            /hour
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {ownerProperty?.length === 0 && (
              <div className="flex justify-center items-center text-center py-12 text-gray-500">
                <p>No property found</p>
              </div>
            )}
          </div>
        )}

        {(view === "create" || view === "edit") && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {" "}
                {view === "create" ? "Add New Property" : "Edit Property"}{" "}
              </h2>
              <button
                onClick={() => {
                  setView("list");
                  setCurrentStep(1);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="w-full mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
              {/* Steps */}
              <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute top-5 left-5 right-0 h-0.5 bg-gray-200">
                    <div
                      className="h-full bg-teal-600 transition-all duration-500 ease-out"
                      style={{
                        width: `${
                          ((currentStep - 1) / (steps.length - 1)) * 100
                        }%`,
                      }}
                    />
                  </div>
                  <div className="relative flex justify-between ">
                    {steps.map((label, index) => {
                      const stepNumber = index + 1;
                      const isCompleted = currentStep > stepNumber;
                      const isCurrent = currentStep === stepNumber;

                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center cursor-pointer"
                          onClick={() => {
                            if (view === "edit") setCurrentStep(stepNumber);
                          }}
                        >
                          {/* Step Circle */}
                          <div className="relative">
                            <div
                              className={`w-12 h-12 flex items-center justify-center rounded-full font-semibold text-sm transition-all duration-300
                              ${
                                isCompleted
                                  ? "bg-teal-600 text-white scale-100"
                                  : isCurrent
                                  ? "bg-teal-600 text-white scale-110 shadow-lg shadow-teal-600/50"
                                  : "bg-white border-2 border-gray-300 text-gray-400"
                              }`}
                            >
                              {isCompleted ? (
                                <Check className="w-5 h-5" />
                              ) : (
                                <span>{stepNumber}</span>
                              )}
                            </div>
                            {/* {isCurrent && <div className="absolute inset-0 rounded-full bg-teal-600 animate-ping opacity-20" />} */}
                          </div>

                          {/* Step Label */}
                          <p
                            className={`text-xs mt-3 text-center max-w-[80px] leading-tight transition-all duration-300
                            ${
                              isCurrent
                                ? "text-teal-600 font-semibold"
                                : "text-gray-700 font-medium"
                            }
                          `}
                          >
                            {label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {currentStep === 1 && (
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputData
                        label={"Property Title"}
                        Icon={User}
                        type={"text"}
                        id={"title"}
                        placeholder={
                          "e.g., Cozy Studio Apartment Near Beachfront"
                        }
                        register={register}
                        rules={{
                          required: "Property Title required",
                          minLength: {
                            value: 5,
                            message: "Title must be 5 character long",
                          },
                          validate: (value) =>
                            value.trim().length >= 5 ||
                            "Title must be at least 5 characters and cannot consist only of spaces",
                        }}
                        errors={errors}
                      />

                      <InputData
                        label={"Description"}
                        Icon={User}
                        type={"text"}
                        id={"description"}
                        placeholder={"Brief description of the property"}
                        register={register}
                        rules={{
                          required: "Description required",
                          minLength: {
                            value: 10,
                            message: "Description must be 10 character long",
                          },
                          validate: (value) =>
                            value.trim().length >= 10 ||
                            "Description must be at least 10 characters.",
                        }}
                        errors={errors}
                      />
                      {/* Category Select */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <Controller
                          name="category"
                          control={control}
                          rules={{ required: "Please select a category" }}
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="px-3.5 py-6 border-2">
                                <SelectValue placeholder="Select Category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {category?.map((cat) => (
                                    <SelectItem key={cat._id} value={cat._id}>
                                      {cat.label}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          )}
                        />

                        {errors.category && (
                          <p className="text-red-500 text-sm">
                            {errors.category.message as string}
                          </p>
                        )}
                      </div>

                      <InputData
                        label={"Max Capacity"}
                        Icon={User}
                        type={"number"}
                        id={"max_capacity"}
                        placeholder={"e.g., 4"}
                        register={register}
                        rules={{
                          required: "Max Capacity Number required",
                          min: {
                            value: 1,
                            message: "Max Capacity must be a positive number",
                          },
                        }}
                        errors={errors}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <InputData
                        Icon={""}
                        label={"Area (sq ft)"}
                        type={"number"}
                        id={"area_sq"}
                        placeholder={"e.g., 450"}
                        register={register}
                        rules={{
                          required: "Area required",
                          min: {
                            value: 1,
                            message: "Area must be a positive number",
                          },
                        }}
                        errors={errors}
                      />

                      <InputData
                        Icon={""}
                        label={"Bedrooms"}
                        type={"number"}
                        id={"noBedroom"}
                        placeholder={"e.g., 2"}
                        register={register}
                        rules={{
                          required: "Number of bedrooms required",
                          min: {
                            value: 1,
                            message:
                              "Number of bedrooms must be a positive number",
                          },
                        }}
                        errors={errors}
                      />

                      <InputData
                        Icon={""}
                        label={"Bathrooms"}
                        type={"number"}
                        id={"noBathroom"}
                        placeholder={"e.g., 1"}
                        register={register}
                        rules={{
                          required: "Number of bathrooms required",
                          min: {
                            value: 1,
                            message:
                              "Number of bathrooms must be a positive number",
                          },
                        }}
                        errors={errors}
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Pricing
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputData
                        Icon={""}
                        label={"Price per Day ($)"}
                        type={"number"}
                        id={"pricePerDay"}
                        placeholder={"e.g., 150"}
                        register={register}
                        rules={{
                          required: "Price per Day is required",
                          min: {
                            value: 1,
                            message: "Price must be a positive number",
                          },
                        }}
                        errors={errors}
                      />
                      <InputData
                        Icon={""}
                        label={"Price per Hour ($)"}
                        type={"number"}
                        id={"pricePerHours"}
                        placeholder={"e.g., 25"}
                        register={register}
                        rules={{
                          required: "Price per Hour is required",
                          min: {
                            value: 1,
                            message: "Price must be a positive number",
                          },
                        }}
                        errors={errors}
                      />
                    </div>
                    {/* Amenities */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {" "}
                        Amenities <span className="text-red-500">*</span>{" "}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {amenities?.map((amenity) => (
                          <div
                            key={amenity._id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              checked={(getValues("amenities") ?? []).includes(
                                amenity._id
                              )}
                              onCheckedChange={(checked) =>
                                toggleAmenity(amenity._id, checked)
                              }
                            />
                            <Label className="cursor-pointer">
                              {amenity.label}
                            </Label>
                          </div>
                        ))}
                      </div>

                      <Input
                        type="hidden"
                        {...register("amenities", {
                          required: "Please select amenities",
                          validate: {
                            minLength: (value) =>
                              value.length > 1 ||
                              "Please select at least 2 amenities",
                          },
                        })}
                      />
                      {errors.amenities && (
                        <p className="text-red-500 text-sm pt-2">
                          {errors?.amenities?.message as string}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-1 flex flex-col gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                        House Rules
                        <span
                          className="ml-2 text-gray-500 cursor-pointer"
                          title="Please choose the house rules you'd like to apply to your property. These rules will be enforced, and guests must follow them."
                        >
                          <Info size={20} />
                        </span>
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {houserule?.map((rule) => (
                          <div
                            key={rule._id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              checked={(getValues("houserule") ?? []).includes(
                                rule._id
                              )}
                              onCheckedChange={(checked) =>
                                toggleHouseRule(rule._id, checked)
                              }
                            />
                            <Label className="cursor-pointer">
                              {rule.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Additional House Rules
                      </h3>
                      <textarea
                        {...register("houseruleFromOwner")}
                        placeholder="e.g., Outside food not allowed"
                        className="w-full py-3.5 rounded-xl border-2 border-gray-200 bg-gray-50 px-4 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Address
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputData
                        Icon={""}
                        label="Address Line"
                        type="text"
                        id="addressLine"
                        placeholder="e.g., 123 Twin tower"
                        register={register}
                        rules={{ required: "Address Line required" }}
                        errors={errors}
                      />

                      <InputData
                        Icon={""}
                        label="Street Address"
                        type="text"
                        id="street"
                        placeholder="e.g., Main Street"
                        register={register}
                        rules={{ required: "Street required" }}
                        errors={errors}
                      />

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 col-span-2">
                        <InputData
                          Icon={""}
                          label="City"
                          id="city"
                          type="text"
                          placeholder="e.g., Surat"
                          register={register}
                          rules={{ required: "City required" }}
                          errors={errors}
                        />

                        <InputData
                          Icon={""}
                          label="State"
                          id="state"
                          type="text"
                          placeholder="e.g., Gujarat"
                          register={register}
                          rules={{ required: "State required" }}
                          errors={errors}
                        />

                        <InputData
                          Icon={""}
                          label="District"
                          id="district"
                          type="text"
                          placeholder="e.g., Central"
                          register={register}
                          rules={{ required: "District required" }}
                          errors={errors}
                        />

                        <InputData
                          Icon={""}
                          label="Pincode"
                          id="pincode"
                          type="number"
                          placeholder="e.g., 123456"
                          register={register}
                          rules={{
                            required: "Pincode is required",
                            minLength: {
                              value: 6,
                              message: "Pincode must be exactly 6 digits",
                            },
                            maxLength: {
                              value: 6,
                              message: "Pincode must be exactly 6 digits",
                            },
                          }}
                          errors={errors}
                        />
                      </div>

                      <InputData
                        Icon={""}
                        label="Landmark"
                        id="landMark"
                        type="text"
                        placeholder="e.g., Central"
                        register={register}
                        rules={{ required: "Landmark required" }}
                        errors={errors}
                      />

                      <InputData
                        Icon={""}
                        label="Map Link"
                        id="mapLink"
                        type="url"
                        placeholder="https://maps.google.com/..."
                        register={register}
                        rules={{ required: "Map Link required" }}
                        errors={errors}
                      />
                    </div>
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Upload Images
                    </h3>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                    />

                    {errors.images && (
                      <p className="text-sm text-red-500">
                        Please upload at least 1 image.
                      </p>
                    )}

                    {images.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                        {images.map((src, index) => (
                          <div
                            key={index}
                            className="relative group w-32 h-32 mt-6"
                          >
                            <img
                              src={src}
                              alt="preview"
                              className="w-full h-full object-cover rounded"
                            />
                            <button
                              type="button"
                              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1 py-1 text-xs"
                              onClick={() => removeImage(index, src)}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between pt-6 border-t">
                  {currentStep > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(currentStep - 1)}
                    >
                      {" "}
                      Back{" "}
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < 5 ? (
                    <Button
                      type="button"
                      variant="gradient"
                      disabled={!isValid}
                      onClick={() => {
                        setCurrentStep(currentStep + 1);
                      }}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="gradient"
                      type="button"
                      disabled={images.length === 0}
                      onClick={() => onSubmit(getValues())}
                    >
                      {view === "create"
                        ? "Create Property"
                        : "Update Property"}
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProperty;
