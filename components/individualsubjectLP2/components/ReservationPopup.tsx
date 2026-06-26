"use client";
import React, { useState, useEffect } from "react";

const SUBJECTS = [
  { name: "English",   emoji: "📖" },
  { name: "Maths",     emoji: "➗" },
  { name: "Physics",   emoji: "⚛️" },
  { name: "Chemistry", emoji: "🧪" },
  { name: "Science",   emoji: "🔬" },
  { name: "Coding",    emoji: "💻" },
];

function getClassesForSubject(subject: string): string[] {
  if (subject === "Physics" || subject === "Chemistry")
    return ["6", "7", "8", "9", "10"];
  if (subject === "Science")
    return ["1", "2", "3", "4", "5"];
  return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
}

type ReservationPopupProps = {
  open: boolean;
  selectedSubject: string;
  selectedClass: string;
  phoneNumber: string;
  locationStr: string;
  otp: string;
  step: "input" | "otp";
  loading?: boolean;
  error?: string | null;
  resendTimer?: number;
  canResend?: boolean;
  lockedSubject?: boolean;
  onChangeSubject: (value: string) => void;
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
  selectedSubject,
  selectedClass,
  phoneNumber,
  locationStr,
  otp,
  step,
  loading = false,
  error = null,
  resendTimer = 30,
  canResend = false,
  lockedSubject = false,
  onChangeSubject,
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
  const [subjectError, setSubjectError] = useState(false);

  useEffect(() => {
    if (!selectedSubject) return;
    const classes = getClassesForSubject(selectedSubject);
    if (!classes.includes(selectedClass)) {
      onChangeClass(classes[0]);
    }
  }, [selectedSubject]);

  useEffect(() => {
    if (!open) setSubjectError(false);
  }, [open]);

  if (!open) return null;

  const availableClasses = selectedSubject
    ? getClassesForSubject(selectedSubject)
    : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubject) {
      setSubjectError(true);
      return;
    }
    setSubjectError(false);
    onSendOTP();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[10000] p-4 transition-opacity duration-300"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl max-w-md w-full relative shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#01317a] px-6 py-5 text-white">
          <button
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white text-xl leading-none transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
          <h2 className="text-xl font-bold text-center">Book A Free Demo</h2>
          <p className="text-center text-sm text-blue-100 mt-1">
            Live Classes · Doubt-Solving · Performance Reports
          </p>
        </div>

        {/* Body */}
        <div className="p-6">

          {/* ── STEP 1: Input Form ── */}
          {step === "input" && (
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

              {/* Subject selector */}
              <div>
                <label className="block text-sm font-semibold text-[#01317a] mb-2">
                  {lockedSubject ? "Subject" : (<>Select Subject <span className="text-red-500">*</span></>)}
                </label>
                {lockedSubject ? (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-[#01317a] bg-[#01317a]/5 w-fit">
                    <span className="text-xl leading-none">
                      {SUBJECTS.find(s => s.name === selectedSubject)?.emoji || "📚"}
                    </span>
                    <span className="text-sm font-bold text-[#01317a]">{selectedSubject}</span>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-3 gap-2">
                      {SUBJECTS.map((s) => (
                        <button
                          key={s.name}
                          type="button"
                          onClick={() => { onChangeSubject(s.name); setSubjectError(false); }}
                          className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-all duration-150 cursor-pointer text-center ${
                            selectedSubject === s.name
                              ? "border-[#01317a] bg-[#01317a]/5 shadow-sm"
                              : "border-gray-200 hover:border-[#01317a]/40 hover:bg-gray-50"
                          }`}
                        >
                          <span className="text-xl leading-none">{s.emoji}</span>
                          <span
                            className={`text-[11px] font-semibold leading-tight ${
                              selectedSubject === s.name ? "text-[#01317a]" : "text-gray-600"
                            }`}
                          >
                            {s.name}
                          </span>
                        </button>
                      ))}
                    </div>
                    {subjectError && (
                      <p className="text-red-500 text-xs mt-1.5">Please select a subject to continue.</p>
                    )}
                  </>
                )}
              </div>

              {/* Grade selector */}
              <div className="relative">
                <label
                  htmlFor="childClass"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Select Grade
                </label>
                <select
                  id="childClass"
                  value={selectedClass}
                  onChange={(e) => onChangeClass(e.target.value)}
                  className="w-full p-3 pr-10 border border-[#c3d3ea] rounded-lg text-base bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#01317a]"
                >
                  {availableClasses.map((grade) => (
                    <option key={grade} value={grade}>
                      Class {grade}
                    </option>
                  ))}
                </select>
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute right-3 bottom-3.5 w-5 h-5 text-[#555]"
                >
                  <path fill="currentColor" d="M7 10l5 5 5-5z" />
                </svg>
              </div>

              {/* Phone number */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <div className="flex items-center border border-[#c3d3ea] rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#01317a]">
                  <div className="px-3 py-3 bg-[#f0f2f5] text-[#333] border-r border-[#c3d3ea] font-medium text-sm">
                    +91
                  </div>
                  <input
                    type="tel"
                    id="phoneNumber"
                    className="flex-1 p-3 border-none outline-none text-base bg-transparent"
                    placeholder="Enter your 10-digit number"
                    value={phoneNumber}
                    onChange={(e) =>
                      onChangePhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))
                    }
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-500 text-xs -mt-2">{error}</p>
              )}

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
                disabled={loading}
                className="bg-[#ffd500] text-black py-3 px-5 rounded-xl font-bold text-base cursor-pointer transition-all duration-300 hover:bg-[#f0c800] shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Sending OTP..." : "Get OTP & Book Free Demo"}
              </button>
            </form>
          )}

          {/* ── STEP 2: OTP Verification ── */}
          {step === "otp" && (
            <div className="flex flex-col gap-5">

              {/* Info */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  OTP sent to <span className="font-semibold text-[#01317a]">+91 {phoneNumber}</span>
                </p>
                <button
                  type="button"
                  onClick={onBackToInput}
                  className="text-xs text-[#01317a] underline mt-1 hover:text-blue-800"
                >
                  Change number
                </button>
              </div>

              {/* OTP input */}
              <div>
                <label
                  htmlFor="otpInput"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Enter 4-digit OTP
                </label>
                <input
                  type="tel"
                  id="otpInput"
                  className="w-full p-3 border border-[#c3d3ea] rounded-lg text-base text-center tracking-[0.4em] font-bold focus:outline-none focus:ring-2 focus:ring-[#01317a]"
                  placeholder="● ● ● ●"
                  value={otp}
                  maxLength={4}
                  onChange={(e) =>
                    onChangeOTP(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))
                  }
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-500 text-xs -mt-2">{error}</p>
              )}

              {/* Verify button */}
              <button
                type="button"
                onClick={onVerifyOTP}
                disabled={loading}
                className="bg-[#ffd500] text-black py-3 px-5 rounded-xl font-bold text-base cursor-pointer transition-all duration-300 hover:bg-[#f0c800] shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify & Book Free Demo"}
              </button>

              {/* Resend */}
              <p className="text-center text-xs text-gray-500">
                {canResend ? (
                  <button
                    type="button"
                    onClick={onResendOTP}
                    className="text-[#01317a] font-semibold underline hover:text-blue-800"
                  >
                    Resend OTP
                  </button>
                ) : (
                  <>Resend OTP in <span className="font-semibold text-[#01317a]">{resendTimer}s</span></>
                )}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}