import { useState } from "react";
import { Home, Mail, Lock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import InputData from "@/components/InputData";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/services/api-routes/auth";
import { ACCESS_TOKEN, USER_ROLE, USER_STATUS } from "@/constant/constant";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { getUserData } = useAuth();

  const [loading, setLoading] = useState(false);
  const onNavigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await loginUser(data);
      localStorage.clear();
      localStorage.setItem(ACCESS_TOKEN, res.data.data.token);
      getUserData();

      if (
        res.data.data.role === USER_ROLE.OWNER &&
        res.data.data.status === USER_STATUS.VERIFIED
      ) {
        onNavigate("/owner/dashboard");
      } else if (res.data.data.role === USER_ROLE.ADMIN) {
        onNavigate("/admin/dashboard");
      } else {
        onNavigate("/customer/dashboard");
      }
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
            Welcome Back
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Sign in to continue your journey
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              rules={{ required: "Password required" }}
              errors={errors}
            />
            {/* <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>
            </div> */}

            <button
              onClick={() => onNavigate("/auth/forgot-pass")}
              type="button"
              className="text-teal-600 hover:text-teal-700 font-semibold text-sm transition-colors"
            >
              Forgot password?
            </button>

            <Button
              variant={"gradient"}
              disabled={loading}
              className="w-full rounded-xl font-semibold"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => onNavigate("/auth/register")}
                className="text-teal-600 hover:text-teal-700 font-semibold transition-colors"
              >
                Sign up
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

export default LoginPage;
