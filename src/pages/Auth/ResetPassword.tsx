import InputData from "@/components/InputData";
import { Button } from "@/components/ui/button";
import { ACCESS_TOKEN } from "@/constant/constant";
import { resetPass } from "@/services/api-routes/auth";
import { ArrowLeft, Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [searchParam] = useSearchParams();
  const onNavigate = useNavigate();

  const password = watch("password");
  const token = searchParam.get("token");
  localStorage.setItem(ACCESS_TOKEN, token);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await resetPass(data);
      onNavigate("/auth/login");
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center px-6 py-12 gap-5">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <p className="flex justify-center mb-6">
              {" "}
              <Lock size={40} />{" "}
            </p>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Reset Account Password
            </h1>
            <p className="text-gray-600 text-sm">
              Create a new password and confirm it below. Make sure both
              passwords match for a secure reset.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

            <InputData
              label={"Confirm Password"}
              Icon={Lock}
              type={"password"}
              id={"confirmPassword"}
              placeholder={"••••••••"}
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
              className="w-full rounded-xl font-semibold"
            >
              {loading ? "Loading" : "Reset Password"}
            </Button>

            <div className="text-center mt-6">
              <button
                className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                onClick={() => onNavigate("/auth/login")}
              >
                Back to Sign In
              </button>
            </div>
          </form>
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
export default ResetPassword;
