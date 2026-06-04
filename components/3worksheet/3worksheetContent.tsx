"use client";
import React, { useState } from "react";
import Script from "next/script";
import HeroSection from "./sections/HeroSection";
import ReviewsSection from "./sections/ReviewsSection";
import Testimonials from "./sections/Testimonials";
import HowItWorksSection from "./sections/HowItWorksSection";
import ReservationPopup from "./components/ReservationPopup";
import WhatsAppFab from "./components/WhatsAppFab";
import SocialFab from "./components/SocialFab";

export default function ThreeWorksheetContent() {
  const [showReservationPopup, setShowReservationPopup] = useState(false);
  const [selectedClass, setSelectedClass] = useState("1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [errorModal, setErrorModal] = useState<{ open: boolean; title: string; message: string }>({
    open: false,
    title: "",
    message: "",
  });

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
        //console.log("[5Worksheet] Lead status updated successfully");
        return true;
      }
      //console.warn("[5Worksheet] Failed to update lead status");
      return false;
    } catch (error) {
      //console.error("[5Worksheet] Error updating lead status:", error);
      return false;
    }
  };


  const handleReserveClick = async () => {
    if (!phoneNumber || !selectedClass)
      return alert("Please enter your phone number and select a class.");
    const isValid = /^[6-9]\d{9}$/.test(phoneNumber);
    if (!isValid) return alert("Please enter a valid 10-digit mobile number.");
    localStorage.setItem("mobileNumber", phoneNumber);
    localStorage.setItem("selectedClass", selectedClass);
    setShowLoader(true);
    try {
      //console.log("[5Worksheet] Starting flow", { selectedClass, phoneNumber });
      const urlParams = new URLSearchParams(window.location.search);
      const leadResponse = await fetch("https://sisyaclass.xyz/student/new_reg_lead3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "SISYA Five Worksheet Bundle",
          phone: phoneNumber,
          cf_class: selectedClass,
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
      if (leadResponse.status === 409) {
        setErrorModal({
          open: true,
          title: "Phone Number Already Registered",
          message: "Please use a different number to continue with the worksheet download.",
        });
        return;
      }

      const leadData = await leadResponse.json();
      //console.log("[5Worksheet] Lead response", leadData);
      if (!leadData?.success) {
        alert("Something went wrong. Please try again.");
        return;
      }
      localStorage.setItem("leadId", leadData.lead.id);
      //console.log("[5Worksheet] Lead stored", { leadId: leadData.lead.id });

      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 49,
          currency: "INR",
          contact: phoneNumber,
          description: "3 Worksheet Bundle",
          className: selectedClass,
        }),
      });
      const orderJson = await orderRes.json();
      //console.log("[5Worksheet] Order API response", orderJson);
      if (!orderJson?.success) {
        await updatePaymentStatus("fail");
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
          description: "5 Worksheet Bundle",
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
          //console.log("[5 Worksheet Bundle] Success handler", response);
          setShowReservationPopup(false);
          await updatePaymentStatus("success");
          window.location.href = `/3worksheet/payment/success.php?transactionId=${encodeURIComponent(response.razorpay_payment_id || "")}&amount=${encodeURIComponent("₹49")}&class=${encodeURIComponent(selectedClass)}`;
        },
        modal: {
          ondismiss: function () {
            //console.warn("[5Worksheet] Checkout dismissed by user");
            updatePaymentStatus("fail").finally(() => {
              window.location.href = `/3worksheet/payment/failed.php?transactionId=${encodeURIComponent(`DISMISSED_${Date.now()}`)}`;
            });
          },
        },
      };
      // @ts-ignore
      const rzp = new (window as any).Razorpay(options);
      //console.log("[5Worksheet] Opening Razorpay checkout", { order_id: payload.order_id });
      rzp.open();
    } catch (err) {
      //console.error("[5Worksheet] Error", err);
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
      <HowItWorksSection />
      <ReviewsSection />

      <Testimonials />

      <section className="bg-white py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#5F6A85] sm:text-base">
            Ready to See How Your Child Performs?
          </p>
          <button
            type="button"
            onClick={() => setShowReservationPopup(true)}
            className="inline-flex h-[50px] min-w-[220px] items-center justify-center rounded-[12px] bg-[#FFD500] px-8 text-sm font-semibold text-[#0B2B68] shadow-md transition-transform duration-200 hover:scale-[1.02] hover:bg-[#FFE24D] active:scale-[0.98] sm:text-base cursor-pointer"
          >
            Tap To Download Worksheets
          </button>
        </div>
      </section>

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
      {errorModal.open && (
        <div className="bg-opacity-50 fixed inset-0 z-[11000] flex items-center justify-center bg-black px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-[#0B2B68]">{errorModal.title}</h3>
            <p className="mt-3 text-sm text-[#4A5B7A]">{errorModal.message}</p>
            <button
              type="button"
              onClick={() => setErrorModal({ open: false, title: "", message: "" })}
              className="mt-6 w-full rounded-xl bg-[#FFD500] py-3 text-sm font-semibold text-[#0B2B68] transition hover:bg-[#FFE24D]"
            >
              Try Another Number
            </button>
          </div>
        </div>
      )}
      {showLoader && (
        <div className="bg-opacity-50 fixed inset-0 z-[10000] flex items-center justify-center bg-black">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500"></div>
        </div>
      )}
    </main>
  );
}
