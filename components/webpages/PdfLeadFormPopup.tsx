"use client";
import React, { useState, useEffect } from "react";

type PdfLeadFormPopupProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onTriggerDownload?: () => void;
  pageType?: string;
};

export default function PdfLeadFormPopup({
  open,
  onClose,
  onSuccess,
  onTriggerDownload,
  pageType,
}: PdfLeadFormPopupProps) {
  const [selectedClass, setSelectedClass] = useState("1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"input" | "otp" | "success">("input");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer: any;
    if (step === "otp" && resendTimer > 0) {
      timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [step, resendTimer]);

  useEffect(() => {
    if (open) {
      setStep("input");
      setPhoneNumber("");
      setOtp("");
      setError(null);
    }
  }, [open]);

  if (!open) return null;

  const validatePhone = (num: string) => /^[6-9]\d{9}$/.test(num);

  const handleSendOTP = async () => {
    if (!validatePhone(phoneNumber)) {
      setError("Please enter a valid 10-digit mobile number starting with 6-9.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://sisyaclass.xyz/student/send_lead_otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber }),
      });

      const data = await response.json();
      if (data.success) {
        setStep("otp");
        setResendTimer(30);
        setCanResend(false);
      } else {
        setError(data.error || data.message || "Failed to send OTP");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 4) {
      setError("Please enter a valid 4-digit OTP.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://sisyaclass.xyz/student/verify_lead_otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber, otp }),
      });

      const data = await response.json();
      if (data.success) {
        await handleRegisterLead();
      } else {
        setError(data.error || data.message || "Invalid OTP. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  const handleRegisterLead = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const leadResponse = await fetch("https://sisyaclass.xyz/student/new_reg_lead3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "PDF Download Lead",
          phone: phoneNumber,
          cf_class: selectedClass,
          status: "initiated",
          source: urlParams.get("utm_source") || "web_pdf",
          medium: urlParams.get("utm_medium") || "web_pdf",
          utm_campaign: urlParams.get("utm_campaign") || "",
          utm_id: urlParams.get("utm_id") || "",
          utm_term: urlParams.get("utm_term") || "",
          utm_content: urlParams.get("utm_content") || "",
          utm_adgroupid: urlParams.get("utm_adgroupid") || "",
          utm_device: urlParams.get("utm_device") || "",
          utm_network: urlParams.get("utm_network") || "",
          utm_matchtype: urlParams.get("utm_matchtype") || "",
          utm_placement: urlParams.get("utm_placement") || "",
          cf_reference_type: (pageType || "").replace(/[^a-zA-Z0-9]/g, ""),
          cf_reference_link: "https://sisyaclass.com" + window.location.pathname,
        }),
      });
      const leadData = await leadResponse.json();
      if (!leadData?.success) {
        // Even if lead capture fails for some reason (e.g. duplicate), let them download if OTP verified
        console.warn("Lead reg non-success", leadData);
      }
      if (onTriggerDownload) onTriggerDownload();
      else if (onSuccess) onSuccess();
      setStep("success");
    } catch (err) {
      console.error("Lead reg error", err);
      // Let them download anyway since OTP was verified
      if (onTriggerDownload) onTriggerDownload();
      else if (onSuccess) onSuccess();
      setStep("success");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[10000] p-4 opacity-100 transition-opacity duration-300"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
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
              Please Verify to Download
            </h2>
            <p className="text-center text-base text-[#415252] mb-6">
              Enter your Grade and Phone number to access this PDF document.
            </p>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendOTP();
              }}
            >
              <div className="relative w-full">
                <label
                  htmlFor="childClassPdf"
                  className="block text-sm font-medium text-[#333] mb-2"
                >
                  Select Grade
                </label>
                <select
                  id="childClassPdf"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full p-3 pr-10 border border-[#c3d3ea] rounded-lg text-base bg-white appearance-none outline-none focus:ring-2 focus:ring-[#01317a]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
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
                  htmlFor="phoneNumberPdf"
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
                    id="phoneNumberPdf"
                    className="flex-1 p-3 border-none outline-none text-base bg-transparent"
                    placeholder="Phone number"
                    value={phoneNumber}
                    maxLength={10}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button
                type="submit"
                disabled={loading || phoneNumber.length !== 10}
                className="bg-[#01317a] text-white py-3 px-5 rounded-lg font-semibold text-base cursor-pointer transition-all duration-300 hover:bg-[#001d4a] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? "Sending OTP..." : "Get OTP"}
              </button>
            </form>
          </>
        ) : step === "otp" ? (
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
                handleVerifyOTP();
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
                        setOtp(newOtp.join("").slice(0, 4));
                        if (idx < 3) {
                          const nextInput = document.getElementById(`pdf-otp-${idx + 1}`);
                          nextInput?.focus();
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace") {
                        if (!otp[idx] && idx > 0) {
                          const prevInput = document.getElementById(`pdf-otp-${idx - 1}`);
                          prevInput?.focus();
                          const newOtp = otp.split("");
                          newOtp[idx - 1] = "";
                          setOtp(newOtp.join(""));
                        } else {
                          const newOtp = otp.split("");
                          newOtp[idx] = "";
                          setOtp(newOtp.join(""));
                        }
                      }
                    }}
                    id={`pdf-otp-${idx}`}
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
                  {loading ? "Verifying..." : "Verify & Download"}
                </button>
                
                <div className="flex justify-between items-center px-1">
                  <button
                    type="button"
                    onClick={() => setStep("input")}
                    disabled={loading}
                    className="text-sm text-[#01317a] font-medium hover:underline disabled:opacity-50"
                  >
                    Change Number
                  </button>
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={!canResend || loading}
                    className={`text-sm font-medium ${
                      canResend ? "text-[#01317a] hover:underline" : "text-gray-400"
                    }`}
                  >
                    {canResend ? "Resend OTP" : `Resend in ${resendTimer}s`}
                  </button>
                </div>
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#01317a] mb-2">
              Success!
            </h2>
            <p className="text-base text-[#415252] mb-6">
              Your download should begin momentarily. Thank you!
            </p>
            <button
              onClick={onClose}
              className="bg-[#01317a] text-white py-3 px-8 rounded-lg font-semibold text-base cursor-pointer transition-all duration-300 hover:bg-[#001d4a]"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
