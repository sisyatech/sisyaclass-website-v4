"use client";

import React, { useState } from "react";
import Script from "next/script";
import HeroSection from "./sections/HeroSection";
import StatsSection from "./sections/StatsSection";
import TopperBatchSection from "./sections/TopperBatchSection";
import WhatChildWillLearnSection from "./sections/WhatChildWillLearnSection";
import WeeklyPlanSection from "./sections/WeeklyPlanSection";
import MonthlyWorkshops from "./sections/MonthlyWorkshops";
import ReviewsSection from "./sections/ReviewsSection";
import BlueStatsSection from "./sections/BlueStatsSection";
import Testimonials from "../Testimonials";
import ReservationPopup from "./components/ReservationPopup";
import WhatsAppFab from "./components/WhatsAppFab";
import SocialFab from "./components/SocialFab";
import Teachers from "./sections/Teachers";

export default function LtcContent() {
  const [showReservationPopup, setShowReservationPopup] = useState(false);
  const [selectedClass, setSelectedClass] = useState("1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showLoader, setShowLoader] = useState(false);

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
      if (data.success) {
        //console.log("[LTC] Lead status updated successfully");
        return true;
      }

      //console.warn("[LTC] Failed to update lead status");
      return false;
    } catch (error) {
      //console.error("[LTC] Error updating lead status:", error);
      return false;
    }
  };

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
      //console.log("[LTC] Starting flow", { selectedClass, phoneNumber });
      const leadResponse = await fetch("https://sisyaclass.xyz/student/new_reg_lead2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "SISYA LTC 2026",
          phone: phoneNumber,
          cf_class: selectedClass,
          status: "initiated",
          source: "web",
          medium: "web",
        }),
      });
      const leadData = await leadResponse.json();
      //console.log("[LTC] Lead response", leadData);
      if (!leadData?.success) {
        alert("Something went wrong. Please try again.");
        return;
      }
      localStorage.setItem("leadId", leadData.lead.id);
      //console.log("[LTC] Lead stored", { leadId: leadData.lead.id });

      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 19, currency: "INR", contact: phoneNumber, description: "LTC Demo" }),
      });
      const orderJson = await orderRes.json();
      //console.log("[LTC] Order API response", orderJson);
      if (!orderJson?.success) {
        alert("Failed to initialize payment. Please try again.");
        return;
      }

      const payload = orderJson.data
        ? orderJson.data
        : {
          order_id: orderJson.order?.id,
          amount: orderJson.order?.amount,
          currency: orderJson.order?.currency,
          key_id: orderJson.keyId,
          name: "Sisya Class",
          description: "LTC Demo",
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
        handler: async function (response: any) {
          //console.log("[LTC] Success handler", response);
          setShowReservationPopup(false);
          await updatePaymentStatus("success");
          window.location.href = `/ltc/payment/success.php?transactionId=${encodeURIComponent(
            response.razorpay_payment_id || ""
          )}&amount=${encodeURIComponent("₹19")}`;
        },
        modal: {
          ondismiss: function () {
            //console.warn("[LTC] Checkout dismissed by user");
            updatePaymentStatus("fail").finally(() => {
              window.location.href = `/ltc/payment/failed.php?transactionId=${encodeURIComponent(
                `DISMISSED_${Date.now()}`
              )}`;
            });
          },
        },
      };
      // @ts-ignore
      const rzp = new (window as any).Razorpay(options);
      //console.log("[LTC] Opening Razorpay checkout", { order_id: payload.order_id });
      rzp.open();
    } catch (err) {
      //console.error("[LTC] Error", err);
      updatePaymentStatus("fail");
      alert("Network error. Please try again.");
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <HeroSection onRegister={() => setShowReservationPopup(true)} />
      <StatsSection onChooseClass={handleChooseClass} />
      <TopperBatchSection />
      {/* <WhatChildWillLearnSection /> */}
      <WeeklyPlanSection onBookDemo={() => setShowReservationPopup(true)} />
      <MonthlyWorkshops />
      <ReviewsSection />
      <Teachers />
      <Testimonials />
      <WhatsAppFab />
      <SocialFab />
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10000">
          <div className="border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}
    </main>
  );
}


