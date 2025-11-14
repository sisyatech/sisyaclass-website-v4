"use client";
import React, { useState } from "react";
import Script from "next/script";
import HeroSection from "./sections/HeroSection";
import TrialIncludedSection from "./sections/TrialIncludedSection";
import ScholarshipSection from "./sections/ScholarshipSection";
import DownloadWorksheetsSection from "./sections/DownloadWorksheetsSection";
import ReservationPopup from "./components/ReservationPopup";
import ReviewsSection from "../3daylp/sections/ReviewsSection";
import TransformationSection from "./sections/Transformation";
import StudentReviews from "./sections/studnetreviews";

export default function BoardContent() {
  const [showReservationPopup, setShowReservationPopup] = useState(false);
  const [selectedClass, setSelectedClass] = useState("10");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const handleChooseClass = (grade: string) => {
    setSelectedClass(grade);
    setShowReservationPopup(true);
  };

  const handleReserveClick = async () => {
    if (!phoneNumber || !selectedClass) return alert("Please enter your phone number and select a class.");
    const isValid = /^[6-9]\d{9}$/.test(phoneNumber);
    if (!isValid) return alert("Please enter a valid 10-digit mobile number.");
    localStorage.setItem("mobileNumber", phoneNumber);
    localStorage.setItem("selectedClass", selectedClass);
    setShowLoader(true);
    try {
      console.log("[BOARD] Starting flow", { selectedClass, phoneNumber });
      const leadResponse = await fetch("https://sisyaclass.xyz/student/new_reg_lead2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "SISYA Board Demo",
          phone: phoneNumber,
          cf_class: selectedClass,
          status: "initiated",
          source:"web",
          medium:"web",
        }),
      });
      const leadData = await leadResponse.json();
      console.log("[BOARD] Lead response", leadData);
      if (!leadData?.success) {
        alert("Something went wrong. Please try again.");
        return;
      }
      localStorage.setItem("leadId", leadData.lead.id);
      console.log("[BOARD] Lead stored", { leadId: leadData.lead.id });

      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 19, currency: "INR", contact: phoneNumber, description: "Board Demo Classes" }),
      });
      const orderJson = await orderRes.json();
      console.log("[BOARD] Order API response", orderJson);
      if (!orderJson?.success) {
        alert("Failed to initialize payment. Please try again.");
        return;
      }

      const payload = orderJson.data ? orderJson.data : {
        order_id: orderJson.order?.id,
        amount: orderJson.order?.amount,
        currency: orderJson.order?.currency,
        key_id: orderJson.keyId,
        name: "Sisya Class",
        description: "Board Demo Classes",
        prefill: { contact: phoneNumber },
      };

      const options: any = {
        key: payload.key_id,
        amount: payload.amount,
        currency: payload.currency,
        name: payload.name,
        description: payload.description,
        order_id: payload.order_id,
        prefill: payload.prefill,
        handler: function (response: any) {
          console.log("[BOARD] Success handler", response);
          setShowReservationPopup(false);
          window.location.href = `/10thboards/payment/success?transactionId=${encodeURIComponent(response.razorpay_payment_id || "")}&amount=${encodeURIComponent("₹19")}`;
        },
        modal: {
          ondismiss: function () {
            console.warn("[BOARD] Checkout dismissed by user");
            window.location.href = `/10thboards/payment/failed?transactionId=${encodeURIComponent(`DISMISSED_${Date.now()}`)}`;
          },
        },
      };
      // @ts-ignore
      const rzp = new (window as any).Razorpay(options);
      console.log("[BOARD] Opening Razorpay checkout", { order_id: payload.order_id });
      rzp.open();
    } catch (err) {
      console.error("[BOARD] Error", err);
      alert("Network error. Please try again.");
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <main className="min-screen bg-white">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <HeroSection onRegister={() => setShowReservationPopup(true)} />
      <TrialIncludedSection />
      <ScholarshipSection onRegister={() => setShowReservationPopup(true)} />
      <ReviewsSection />
      <DownloadWorksheetsSection onRegister={() => setShowReservationPopup(true)} />
      <TransformationSection onRegister={() => setShowReservationPopup(true)} />
      <StudentReviews onRegister={() => setShowReservationPopup(true)} />
      <ReservationPopup
        open={showReservationPopup}
        selectedClass={selectedClass}
        phoneNumber={phoneNumber}
        onChangeClass={setSelectedClass}
        onChangePhone={setPhoneNumber}
        onSubmit={handleReserveClick}
        onClose={() => setShowReservationPopup(false)}
      />
      {showLoader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000]">
          <div className="border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}
    </main>
  );
}

