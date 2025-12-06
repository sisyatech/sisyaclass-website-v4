"use client";
import React, { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import HeroSection from "./sections/HeroSection";
import TrialIncludedSection from "./sections/TrialIncludedSection";
import ScholarshipSection from "./sections/ScholarshipSection";
import DownloadWorksheetsSection from "./sections/DownloadWorksheetsSection";
import ReservationPopup from "./components/ReservationPopup";
import ReviewsSection from "../3daylp/sections/ReviewsSection";
import TransformationSection from "./sections/Transformation";
import StudentReviews from "./sections/studnetreviews";
import SocialFab from "./components/SocialFab";
import WhatsAppFab from "./components/WhatsAppFab";
import FAQ from "./sections/FAQSection";
import HowItWorksSection from "./sections/HowItWorksSection";

export default function PyqContent() {
  const [showReservationPopup, setShowReservationPopup] = useState(false);
  const [selectedClass, setSelectedClass] = useState("10");
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
        console.log("[PYQ] Lead status updated successfully");
        return true;
      }
      console.warn("[PYQ] Failed to update lead status");
      return false;
    } catch (error) {
      console.error("[PYQ] Error updating lead status:", error);
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
      console.log("[PYQ] Starting flow", { selectedClass, phoneNumber });
      const leadResponse = await fetch("https://sisyaclass.xyz/student/new_reg_lead2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "SISYA PYQ Demo",
          phone: phoneNumber,
          cf_class: selectedClass,
          status: "initiated",
          source: "web",
          medium: "web",
        }),
      });
      const leadData = await leadResponse.json();
      console.log("[PYQ] Lead response", leadData);
      if (!leadData?.success) {
        alert("Something went wrong. Please try again.");
        return;
      }
      localStorage.setItem("leadId", leadData.lead.id);
      console.log("[PYQ] Lead stored", { leadId: leadData.lead.id });

      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 19, currency: "INR", contact: phoneNumber, description: "PYQ Demo Classes" }),
      });
      const orderJson = await orderRes.json();
      console.log("[PYQ] Order API response", orderJson);
      if (!orderJson?.success) {
        await updatePaymentStatus("fail");
        alert("Failed to initialize payment. Please try again.");
        return;
      }

      const payload = orderJson.data ? orderJson.data : {
        order_id: orderJson.order?.id,
        amount: orderJson.order?.amount,
        currency: orderJson.order?.currency,
        key_id: orderJson.keyId,
        name: "Sisya Class",
        description: "PYQ Demo Classes",
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
          console.log("[PYQ] Success handler", response);
          setShowReservationPopup(false);
          await updatePaymentStatus("success");
          window.location.href = `/pyq/payment/success.php?transactionId=${encodeURIComponent(response.razorpay_payment_id || "")}&amount=${encodeURIComponent("₹19")}`;
        },
        modal: {
          ondismiss: function () {
            console.warn("[PYQ] Checkout dismissed by user");
            updatePaymentStatus("fail").finally(() => {
              window.location.href = `/pyq/payment/failed.php?transactionId=${encodeURIComponent(`DISMISSED_${Date.now()}`)}`;
            });
          },
        },
      };
      // @ts-ignore
      const rzp = new (window as any).Razorpay(options);
      console.log("[PYQ] Opening Razorpay checkout", { order_id: payload.order_id });
      rzp.open();
    } catch (err) {
      console.error("[PYQ] Error", err);
      updatePaymentStatus("fail");
      alert("Network error. Please try again.");
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <main className="min-screen bg-white">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <HeroSection onRegister={() => setShowReservationPopup(true)} />
      <HowItWorksSection onRegister={() => setShowReservationPopup(true)} />
      <TrialIncludedSection />
      <ScholarshipSection onRegister={() => setShowReservationPopup(true)} />
      <ReviewsSection />
      <DownloadWorksheetsSection onRegister={() => setShowReservationPopup(true)} />
      {/* <TransformationSection onRegister={() => setShowReservationPopup(true)} /> */}
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
        <div className="bg-opacity-50 fixed inset-0 z-[10000] flex items-center justify-center bg-black">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500"></div>
        </div>
      )}
      {/* <FAQ /> */}
      {/* <div className="py-8 text-center">
        <Link href="/pyq/terms-and-conditions" className="text-sm font-medium text-blue-600 underline underline-offset-4 hover:text-blue-700">
          Terms &amp; Conditions
        </Link>
      </div> */}
      <SocialFab />
      <WhatsAppFab />
    </main>
  );
}

