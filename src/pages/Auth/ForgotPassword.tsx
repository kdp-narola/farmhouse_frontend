import { useState } from "react";
import { Mail, CheckCircle, Lock, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import InputData from "@/components/InputData";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { forgotPass } from "@/services/api-routes/auth";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onNavigate = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await forgotPass(data);
      setIsSubmitted(true);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen custom-gradient-gray flex flex-col items-center justify-center px-6 py-12 gap-5">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 md:p-10">
        <div className="text-center mb-8">
          <p className="flex justify-center mb-6">
            {" "}
            <Lock size={40} />{" "}
          </p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Forgot Password
          </h1>
          <p className="text-gray-600 text-sm">
            Enter your email to receive reset instructions
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <InputData
              label={"Email Address"}
              Icon={Mail}
              type={"email"}
              id={"email"}
              placeholder={"you@example.com"}
              register={register}
              rules={{ required: "Email required" }}
              errors={errors}
            />

            <Button
              variant={"gradient"}
              disabled={loading}
              className="w-full rounded-xl font-semibold"
            >
              {loading ? "Sending..." : "Send Reset Link"}
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
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 custom-gradient-green rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Check Your Email
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                We've sent password reset instructions to your email.
              </p>
              <p className="text-gray-500 text-xs mb-6">
                If you don't see the email, check your spam folder or try again
                with a different email address.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                variant={"gradient"}
                onClick={() => setIsSubmitted(false)}
                className="w-full"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
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

export default ForgotPassword;
