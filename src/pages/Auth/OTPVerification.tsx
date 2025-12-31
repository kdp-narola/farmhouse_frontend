import { useState, useEffect } from "react";
import { ArrowLeft, Home } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { otpVerification, resendOTP } from "@/services/api-routes/auth";
import { ACCESS_TOKEN, USER_ROLE, USER_STATUS } from "@/constant/constant";
import { useAuth } from "@/contexts/AuthContext";

const OTPVerification = () => {
  const {
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const onNavigate = useNavigate();
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(10);
  const otpValue = watch("otp");

  const { getUserData } = useAuth();

  const handleClick = async () => {
    setMinute(0);
    setSecond(10);
    await resendOTP();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (second > 0) setSecond(second - 1);
      if (second === 0) {
        if (minute === 0) clearInterval(interval);
        else {
          setSecond(59);
          setMinute(minute - 1);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [second]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await otpVerification(data);
      localStorage.clear();
      localStorage.setItem(ACCESS_TOKEN, res.data.data.token);
      getUserData();

      if (
        res.data.data.role === USER_ROLE.OWNER &&
        res.data.data.status === USER_STATUS.VERIFIED
      ) {
        onNavigate("/owner/dashboard");
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center px-6 py-12 gap-5">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-violet-500 rounded-2xl flex items-center justify-center">
                <Home className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-violet-600 bg-clip-text text-transparent">
                SpaceShare
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Verify Your Email
            </h2>
            <p className="text-gray-600">
              We've sent a code to{" "}
              <span className="font-semibold">you@example.com</span>
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-center items-center">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Enter 6-digit code
              </label>
              <Controller
                name="otp"
                control={control}
                defaultValue=""
                rules={{ required: true, minLength: 6, maxLength: 6 }}
                render={({ field }) => (
                  <InputOTP
                    value={field.value}
                    onChange={field.onChange}
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    className="flex"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />

              {/* <InputOTP
              id="otp"
              className="flex"
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              {...register("otp")}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP> */}

              {second > 0 || minute > 0 ? (
                <>
                  <p className="text-sm text-gray-600 mt-3">
                    Resend code in
                    <span className="font-semibold text-cyan-600">
                      {" "}
                      {minute < 10 ? `0${minute}` : minute} :{" "}
                      {second < 10 ? `0${second}` : second}
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <button
                    disabled={second > 0 || minute > 0}
                    onClick={handleClick}
                    className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors mt-3"
                  >
                    Resend
                  </button>
                </>
              )}
            </div>

            <div className="flex justify-center p-2 pb-0">
              <Button
                variant={"gradient"}
                disabled={loading || otpValue?.length < 6}
                className="w-full rounded-xl font-semibold"
              >
                {/* OTP Verify */}
                {loading ? "verifying" : "OTP Verify"}
              </Button>
            </div>
            <div className="text-center mt-6">
              <button
                className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                onClick={() => onNavigate("/auth/register")}
              >
                Back to Sign Up
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
export default OTPVerification;
