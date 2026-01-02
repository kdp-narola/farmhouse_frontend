import { useState } from "react";
import { User, Mail, Lock, Shield, Calendar, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import InputData from "@/components/InputData";
import { useForm } from "react-hook-form";
import { changePass } from "@/services/api-routes/auth";

const UserDetails = ({ label, value, Icon }) => {
  return (
    <div className="bg-muted/30  rounded-lg p-4 flex items-center gap-4">
      <Icon className="w-6 h-6 text-gray-400" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
        <p className="text-md font-semibold text-slate-700 break-all">
          {value}
        </p>
      </div>
    </div>
  );
};

const UserProfile = () => {
  const { authUser } = useAuth();
  const onNavigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await changePass(data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Account Settings
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your profile and preferences
            </p>
          </div>
          <Button
            variant={"ghost"}
            className="flex items-center gap-2 bg-gray-100"
            onClick={() => {
              localStorage.clear();
              onNavigate("/");
            }}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-8">
              <div className="relative mb-4">
                <div className="w-20 h-20 mx-auto custom-gradient-teal-violet-1 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  {authUser?.fullName?.charAt(0)}
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {authUser?.fullName}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{authUser?.email}</p>
                <Badge variant={"outline"} className="lowercase">
                  {authUser?.role}
                </Badge>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeTab === "profile"
                      ? "bg-violet-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span className="font-semibold">Profile Info</span>
                </button>

                <button
                  onClick={() => setActiveTab("security")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeTab === "security"
                      ? "bg-violet-500 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Shield className="w-5 h-5" />
                  <span className="font-semibold">Security</span>
                </button>
              </nav>
            </div>
          </div>

          <div className="col-span-9 space-y-6">
            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-1">
                  Personal Information
                </h2>
                <p className="text-gray-500 mb-10">
                  {" "}
                  Basic details associated with your account.{" "}
                </p>

                <div className="border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
                  <UserDetails
                    label="Full Name"
                    value={authUser?.fullName}
                    Icon={User}
                  />
                  <UserDetails
                    label="Email Address"
                    value={authUser?.email}
                    Icon={Mail}
                  />
                  <UserDetails
                    label="Account Type"
                    value={authUser?.role}
                    Icon={Shield}
                  />
                  <UserDetails
                    label="Member Since"
                    value={authUser?.createdAt}
                    Icon={Calendar}
                  />
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Security Settings
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <InputData
                    label={"Current Password"}
                    Icon={Lock}
                    type={"password"}
                    id={"oldPassword"}
                    placeholder={"Enter current password"}
                    register={register}
                    rules={{
                      required: "Current password is required",
                    }}
                    errors={errors}
                  />

                  <InputData
                    label={"New Password"}
                    Icon={Lock}
                    type={"password"}
                    id={"password"}
                    placeholder={"Enter new password"}
                    register={register}
                    rules={{
                      required: "New Password required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{8,}$/,
                        message:
                          "Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, a special character, and no spaces.",
                      },
                    }}
                    errors={errors}
                  />

                  <InputData
                    label={"Confirm New Password"}
                    Icon={Lock}
                    type={"password"}
                    id={"confirmPassword"}
                    placeholder={"Confirm new password"}
                    register={register}
                    rules={{
                      required: "Confirm password is required",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    }}
                    errors={errors}
                  />

                  <Button
                    variant={"gradient"}
                    disabled={loading}
                    className=" rounded-xl font-semibold"
                  >
                    {loading ? "Loading" : "Update Password"}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
