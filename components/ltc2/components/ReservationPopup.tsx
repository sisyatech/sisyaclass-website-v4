"use client";
import React from "react";

type ReservationPopupProps = {
  open: boolean;
  selectedClass: string;
  phoneNumber: string;
  locationStr: string;
  otp: string;
  step: "input" | "otp";
  loading: boolean;
  error: string | null;
  resendTimer: number;
  canResend: boolean;
  onChangeClass: (value: string) => void;
  onChangePhone: (value: string) => void;
  onChangeLocation: (value: string) => void;
  onChangeOTP: (value: string) => void;
  onSendOTP: () => void;
  onVerifyOTP: () => void;
  onResendOTP: () => void;
  onBackToInput: () => void;
  onClose: () => void;
};

export default function ReservationPopup({
  open,
  selectedClass,
  phoneNumber,
  locationStr,
  otp,
  step,
  loading,
  error,
  resendTimer,
  canResend,
  onChangeClass,
  onChangePhone,
  onChangeLocation,
  onChangeOTP,
  onSendOTP,
  onVerifyOTP,
  onResendOTP,
  onBackToInput,
  onClose,
}: ReservationPopupProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-10000 p-4 opacity-100 transition-opacity duration-300"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      <div className="bg-white rounded-xl p-8 max-w-md w-full relative shadow-lg">
        <button
          className="absolute top-4 right-4 bg-transparent border-none text-2xl cursor-pointer text-[#333] hover:text-black disabled:opacity-50"
          onClick={onClose}
          disabled={loading}
        >
          ×
        </button>

        {step === "input" ? (
          <>
            <h2 className="text-2xl font-bold text-[#01317a] mb-4 text-center">
              See the Difference in Just One Class
            </h2>
            <p className="text-center text-base text-[#415252] mb-4">
              Get Live Class, Recorded Sessions, Doubt-Solving &amp; Performance Reports
            </p>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                onSendOTP();
              }}
            >
              <div className="relative w-full">
                <label
                  htmlFor="childClass"
                  className="block text-center text-sm font-medium text-[#333] mb-2"
                >
                  Select Grade
                </label>
                <select
                  id="childClass"
                  value={selectedClass}
                  onChange={(e) => onChangeClass(e.target.value)}
                  className="w-full p-3 pr-10 border border-[#c3d3ea] rounded-lg text-base bg-white appearance-none outline-none focus:ring-2 focus:ring-[#01317a]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((grade) => (
                    <option key={grade} value={grade.toString()}>
                      Class {grade}
                    </option>
                  ))}
                </select>
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute right-3 top-[65%] -translate-y-1/2 w-5 h-5 text-[#555]"
                >
                  <path fill="currentColor" d="M7 10l5 5 5-5z" />
                </svg>
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-[#333] mb-2"
                >
                  Enter your phone number
                </label>
                <div className="flex items-center border border-[#c3d3ea] rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#01317a]">
                  <div className="px-3 py-2 bg-[#f0f2f5] text-[#333] border-r border-[#c3d3ea]">
                    +91
                  </div>
                  <input
                    type="tel"
                    id="phoneNumber"
                    className="flex-1 p-3 border-none outline-none text-base bg-transparent"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    maxLength={10}
                    onChange={(e) => onChangePhone(e.target.value.replace(/\D/g, ""))}
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <div className="relative w-full">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-[#333] mb-2"
                >
                  Enter your location
                </label>
                <input
                  type="text"
                  id="location"
                  required
                  className="w-full p-3 border border-[#c3d3ea] rounded-lg text-base bg-white outline-none focus:border-[#01317a]"
                  placeholder="e.g. City, State"
                  value={locationStr}
                  onChange={(e) => onChangeLocation(e.target.value.replace(/[^a-zA-Z0-9\s]/g, ""))}
                />
              </div>
              <button
                type="submit"
                disabled={loading || phoneNumber.length !== 10}
                className="bg-[#01317a] text-white py-3 px-5 rounded-lg font-semibold text-base cursor-pointer transition-all duration-300 hover:bg-[#001d4a] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? "Sending..." : "Book A Free Demo"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[#01317a] mb-2 text-center">
              Verify OTP
            </h2>
            <p className="text-center text-sm text-[#415252] mb-6">
              Enter the 4-digit code sent to <b>+91 {phoneNumber}</b>
            </p>
            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => {
                e.preventDefault();
                onVerifyOTP();
              }}
            >
              <div className="flex justify-center gap-3">
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={otp[idx] || ""}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      if (val) {
                        const newOtp = otp.split("");
                        newOtp[idx] = val;
                        onChangeOTP(newOtp.join("").slice(0, 4));
                        if (idx < 3) {
                          const nextInput = document.getElementById(`otp-${idx + 1}`);
                          nextInput?.focus();
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace") {
                        if (!otp[idx] && idx > 0) {
                          const prevInput = document.getElementById(`otp-${idx - 1}`);
                          prevInput?.focus();
                          const newOtp = otp.split("");
                          newOtp[idx - 1] = "";
                          onChangeOTP(newOtp.join(""));
                        } else {
                          const newOtp = otp.split("");
                          newOtp[idx] = "";
                          onChangeOTP(newOtp.join(""));
                        }
                      }
                    }}
                    id={`otp-${idx}`}
                    autoFocus={idx === 0}
                    className="w-12 h-14 text-center text-xl font-bold border-2 border-[#c3d3ea] rounded-lg outline-none focus:border-[#01317a] focus:ring-2 focus:ring-[#01317a]/20"
                  />
                ))}
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={loading || otp.length !== 4}
                  className="bg-[#01317a] text-white py-3 px-5 rounded-lg font-semibold text-base cursor-pointer transition-all duration-300 hover:bg-[#001d4a] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Verifying..." : "Verify & Book Demo"}
                </button>

                <div className="flex justify-between items-center px-1">
                  <button
                    type="button"
                    onClick={onBackToInput}
                    disabled={loading}
                    className="text-sm text-[#01317a] font-medium hover:underline disabled:opacity-50"
                  >
                    Change Number
                  </button>
                  <button
                    type="button"
                    onClick={onResendOTP}
                    disabled={!canResend || loading}
                    className={`text-sm font-medium ${canResend ? "text-[#01317a] hover:underline" : "text-gray-400"
                      }`}
                  >
                    {canResend ? "Resend OTP" : `Resend in ${resendTimer}s`}
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
