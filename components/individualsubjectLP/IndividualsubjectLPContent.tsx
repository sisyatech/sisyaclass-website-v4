"use client";

import React, { useState } from "react";
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

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function IndividualSubjectLPContent() {
  const [showReservationPopup, setShowReservationPopup] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("6");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [isSubjectLocked, setIsSubjectLocked] = useState(false);

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
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const handleChooseSubject = (subjectName: string, defaultClass: string) => {
    setSelectedSubject(subjectName);
    setSelectedClass(defaultClass);
    setIsSubjectLocked(true);
    setShowReservationPopup(true);
  };

  const handleReserveClick = async () => {
    if (!phoneNumber || !selectedClass) return alert("Please enter your phone number and select a class.");
    const isValid = /^[6-9]\d{9}$/.test(phoneNumber);
    if (!isValid) return alert("Please enter a valid 10-digit mobile number.");

    localStorage.setItem("mobileNumber", phoneNumber);
    localStorage.setItem("selectedClass", selectedClass);
    setShowLoader(true);

    let locationStr = "";
    let stateStr = "";
    try {
      if (typeof navigator !== "undefined" && navigator.geolocation) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 6000,
            enableHighAccuracy: false,
          });
        });
        const { latitude, longitude } = position.coords;
        locationStr = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

        try {
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const geoData = await geoRes.json();
          if (geoData && geoData.address) {
            const { city, town, village, suburb, state, country, postcode } = geoData.address;
            if (state) stateStr = state.trim();
            const fetchedCity = city || town || village;
            const parts = [fetchedCity, suburb, state, country, postcode]
              .filter((part: string | undefined) => Boolean(part))
              .map((part: string) => part.trim());
            if (parts.length) {
              locationStr = [...new Set(parts)].slice(0, 5).join(" ");
            }
          }
        } catch (e) {}
      }
    } catch (e) {}

    try {
      const urlParams = new URLSearchParams(window.location.search);

      // Step 1: Create lead
      const leadResponse = await fetch("https://sisyaclass.xyz/student/new_reg_lead3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `INDIVIDUAL SUBJECT ${selectedSubject.toUpperCase()}`,
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
          cf_location: locationStr,
          cf_state: stateStr,
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
        body: JSON.stringify({ amount: 9, currency: "INR", contact: phoneNumber, description: "Individual Subject DEMO" }),
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
          window.location.href = `/individualsubjectLP/payment/success.php?transactionId=${encodeURIComponent(
            response.razorpay_payment_id || ""
          )}&amount=${encodeURIComponent("₹9")}`;
        },
        modal: {
          ondismiss: function () {
            //console.warn("[LTC] Checkout dismissed by user");
            updatePaymentStatus("fail").finally(() => {
              window.location.href = `/individualsubjectLP/payment/failed.php?transactionId=${encodeURIComponent(
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
      <HeroSection
        onRegister={() => {
          setSelectedSubject("");
          setPhoneNumber("");
          setIsSubjectLocked(false);
          setShowReservationPopup(true);
        }}
      />
      <StatsSection onChooseSubject={handleChooseSubject} />
      <WhyStartEarly />
      <AdvantagesGrid />
      <ReviewsSection />
      {/* <Teachers /> */}
      <Testimonials />
      <WhatsAppFab />
      <SocialFab />
      <ReservationPopup
        open={showReservationPopup}
        selectedSubject={selectedSubject}
        selectedClass={selectedClass}
        phoneNumber={phoneNumber}
        lockedSubject={isSubjectLocked}
        onChangeSubject={setSelectedSubject}
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