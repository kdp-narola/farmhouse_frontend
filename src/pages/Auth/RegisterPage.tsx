import { useState } from "react";
import {
  Home,
  Mail,
  Lock,
  User,
  ArrowLeft,
  Camera,
  Building,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/services/api-routes/auth";
import InputData from "@/components/InputData";
import { ACCESS_TOKEN } from "@/constant/constant";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"CUSTOMER" | "OWNER">("CUSTOMER");
  const onNavigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("fullName", data.fullName);
      formData.append("role", role);
      formData.append("password", data.password);

      const res = await registerUser(formData);
      localStorage.setItem(ACCESS_TOKEN, res.data.data.token);
      onNavigate("/auth/otp-verify");
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-violet-50 flex flex-col items-center justify-center px-6 py-12 gap-5">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-violet-500 rounded-2xl flex items-center justify-center">
              <Home className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-violet-600 bg-clip-text text-transparent">
              SpaceShare
            </span>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Create Account
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Join the creative community
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => setRole("CUSTOMER")}
              className={`p-4 rounded-xl border-2 transition-all ${
                role === "CUSTOMER"
                  ? "border-teal-500 bg-teal-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Camera
                className={`w-8 h-8 mx-auto mb-2 ${
                  role === "CUSTOMER" ? "text-teal-600" : "text-gray-400"
                }`}
              />
              <div
                className={`font-semibold ${
                  role === "CUSTOMER" ? "text-teal-700" : "text-gray-600"
                }`}
              >
                I'm Booking
              </div>
              <div className="text-xs text-gray-500 mt-1">Find spaces</div>
            </button>

            <button
              onClick={() => setRole("OWNER")}
              className={`p-4 rounded-xl border-2 transition-all ${
                role === "OWNER"
                  ? "border-violet-500 bg-violet-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Building
                className={`w-8 h-8 mx-auto mb-2 ${
                  role === "OWNER" ? "text-violet-600" : "text-gray-400"
                }`}
              />
              <div
                className={`font-semibold ${
                  role === "OWNER" ? "text-violet-700" : "text-gray-600"
                }`}
              >
                I'm Hosting
              </div>
              <div className="text-xs text-gray-500 mt-1">List spaces</div>
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <InputData
              label={"Full Name"}
              Icon={User}
              type={"text"}
              id={"fullName"}
              placeholder={"John Doe"}
              register={register}
              rules={{ required: "Fullname required" }}
              errors={errors}
            />
            <InputData
              label={"Email"}
              Icon={Mail}
              type={"email"}
              id={"email"}
              placeholder={"you@example.com"}
              register={register}
              rules={{ required: "Email required" }}
              errors={errors}
            />
            <InputData
              label={"Password"}
              Icon={Lock}
              type={"password"}
              id={"password"}
              placeholder={"••••••••"}
              register={register}
              rules={{
                required: "Password required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{8,}$/,
                  message:
                    "Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, a special character, and no spaces.",
                },
              }}
              errors={errors}
            />

            <Button
              variant={"gradient"}
              disabled={loading}
              className="w-full rounded-xl font-semibold"
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => onNavigate("/auth/login")}
                className="text-teal-600 hover:text-teal-700 font-semibold transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={() => onNavigate("/")}
        className="flex items-center gap-2 text-gray-600 hover:text-teal-600 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </button>
    </div>
  );
};
export default RegisterPage;
