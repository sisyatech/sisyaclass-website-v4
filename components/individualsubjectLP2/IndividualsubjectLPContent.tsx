"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
import HeroSection from "./sections/HeroSection";
import StatsSection from "./sections/StatsSection";
import WhyStartEarly from "./sections/WhyStartEarly";
import AdvantagesGrid from "./sections/AdvantagesGrid";
import ReviewsSection from "./sections/ReviewsSection";
import Testimonials from "../Testimonials";
import ReservationPopup from "./components/ReservationPopup";
import WhatsAppFab from "./components/WhatsAppFab";
import SocialFab from "./components/SocialFab";

export default function IndividualSubjectLPContent() {
  const [showReservationPopup, setShowReservationPopup] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("6");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [locationStr, setLocationStr] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"input" | "otp">("input");
  const [showLoader, setShowLoader] = useState(false);
  const [isSubjectLocked, setIsSubjectLocked] = useState(false);
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

  const updatePaymentStatus = async (paymentStatus: "success" | "fail") => {
    const leadID = typeof window !== "undefined" ? localStorage.getItem("leadId") : null;
    if (!leadID) return false;
    try {
      const response = await fetch("https://sisyaclass.xyz/student/update_reg_lead2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Number(leadID),
          status: paymentStatus,
        }),
      });
      const data = await response.json();
      return data.success ? true : false;
    } catch (error) {
      return false;
    }
  };

  const handleChooseSubject = (subjectName: string, defaultClass: string) => {
    setSelectedSubject(subjectName);
    setSelectedClass(defaultClass);
    setIsSubjectLocked(true);
    setStep("input");
    setError(null);
    setShowReservationPopup(true);
  };

  const validatePhone = (num: string) => /^[6-9]\d{9}$/.test(num);

  const handleSendOTP = async () => {
    if (!validatePhone(phoneNumber)) {
      setError("Please enter a valid 10-digit mobile number starting with 6-9.");
      return;
    }
    setShowLoader(true);
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
      setShowLoader(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 4) {
      setError("Please enter a valid 4-digit OTP.");
      return;
    }
    setShowLoader(true);
    setError(null);
    try {
      const response = await fetch("https://sisyaclass.xyz/student/verify_lead_otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber, otp }),
      });
      const data = await response.json();
      if (data.success) {
        await handleReserveClick();
      } else {
        setError(data.error || data.message || "Invalid OTP. Please try again.");
        setShowLoader(false);
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setShowLoader(false);
    }
  };

  const handleReserveClick = async () => {
    localStorage.setItem("mobileNumber", phoneNumber);
    localStorage.setItem("selectedClass", selectedClass);
    setShowLoader(true);

    try {
      const urlParams = new URLSearchParams(window.location.search);

      const leadResponse = await fetch("https://sisyaclass.xyz/student/new_reg_lead3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `INDIVIDUAL SUBJECT ${selectedSubject.toUpperCase()}`,
          phone: phoneNumber,
          cf_class: selectedClass,
          cf_location: locationStr,
          status: "initiated",
          source: urlParams.get("utm_source") || "web",
          medium: urlParams.get("utm_medium") || "web",
          utm_campaign: urlParams.get("utm_campaign") || "",
          utm_id: urlParams.get("utm_id") || "",
          utm_term: urlParams.get("utm_term") || "",
          utm_content: urlParams.get("utm_content") || "",
          utm_adgroupid: urlParams.get("utm_adgroupid") || "",
          utm_device: urlParams.get("utm_device") || "",
          utm_network: urlParams.get("utm_network") || "",
          utm_matchtype: urlParams.get("utm_matchtype") || "",
          utm_placement: urlParams.get("utm_placement") || "",
        }),
      });

      const leadData = await leadResponse.json();
      if (!leadData?.success) {
        setError("Something went wrong. Please try again.");
        setShowLoader(false);
        return;
      }
      localStorage.setItem("leadId", leadData.lead.id);

      await updatePaymentStatus("success");
      setShowReservationPopup(false);
      window.location.href = `/individualsubjectLP2/payment/success.php?transactionId=FREE_${Date.now()}&amount=${encodeURIComponent("Free")}`;
    } catch (err) {
      updatePaymentStatus("fail");
      setError("Network error. Please try again.");
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <HeroSection
        onRegister={() => {
          setSelectedSubject("");
          setPhoneNumber("");
          setIsSubjectLocked(false);
          setStep("input");
          setError(null);
          setShowReservationPopup(true);
        }}
      />
      <StatsSection onChooseSubject={handleChooseSubject} />
      <WhyStartEarly />
      <AdvantagesGrid />
      <ReviewsSection />
      <Testimonials />
      <WhatsAppFab />
      <SocialFab />
      <ReservationPopup
        open={showReservationPopup}
        selectedSubject={selectedSubject}
        selectedClass={selectedClass}
        phoneNumber={phoneNumber}
        locationStr={locationStr}
        otp={otp}
        step={step}
        loading={showLoader}
        error={error}
        resendTimer={resendTimer}
        canResend={canResend}
        lockedSubject={isSubjectLocked}
        onChangeSubject={setSelectedSubject}
        onChangeClass={setSelectedClass}
        onChangePhone={setPhoneNumber}
        onChangeLocation={setLocationStr}
        onChangeOTP={setOtp}
        onSendOTP={handleSendOTP}
        onVerifyOTP={handleVerifyOTP}
        onResendOTP={handleSendOTP}
        onBackToInput={() => setStep("input")}
        onClose={() => setShowReservationPopup(false)}
      />
      {showLoader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10000">
          <div className="border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}
    </main>
  );
}