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
import Teachers from "./sections/Teachers";

export default function VedicMathsContent() {
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
        //console.log("[Vedic Maths] Lead status updated successfully");
        return true;
      }

      //console.warn("[Vedic Maths] Failed to update lead status");
      return false;
    } catch (error) {
      //console.error("[Vedic Maths] Error updating lead status:", error);
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

    let locationStr = "";
    try {
      if (typeof navigator !== "undefined" && navigator.geolocation) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 6000,
            enableHighAccuracy: false
          });
        });
        const { latitude, longitude } = position.coords;
        locationStr = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

        try {
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const geoData = await geoRes.json();
          // console.log("[Vedic Maths] Raw Geo Data:", geoData);
          if (geoData && geoData.address) {
            const {
              city,
              town,
              village,
              suburb,
              state,
              country,
              postcode,
            } = geoData.address;

            const fetchedCity = city || town || village;
            const parts = [fetchedCity, suburb, state, country, postcode]
              .filter((part: string | undefined) => Boolean(part))
              .map((part: string) => part.trim());

            if (parts.length) {
              locationStr = [...new Set(parts)].slice(0, 5).join(" ");
            }
          }
        } catch (e) {
          // Reverse geocode failed, keep coordinates
        }
      }
    } catch (e) {
      // Geolocation failed or denied, proceed without it
    }

    console.log("[Vedic Maths] Final Location for Lead:", locationStr);

    try {
      //console.log("[Vedic Maths] Starting flow", { selectedClass, phoneNumber });
      const leadResponse = await fetch("https://sisyaclass.xyz/student/new_reg_lead3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "SISYA Vedic Maths 2026",
          phone: phoneNumber,
          cf_class: selectedClass,
          status: "initiated",
          source: "web",
          medium: "web",
          cf_location: locationStr,
        }),
      });
      const leadData = await leadResponse.json();
      //console.log("[Vedic Maths] Lead response", leadData);
      if (!leadData?.success) {
        alert("Something went wrong. Please try again.");
        return;
      }
      localStorage.setItem("leadId", leadData.lead.id);
      //console.log("[Vedic Maths] Lead stored", { leadId: leadData.lead.id });

      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 19, currency: "INR", contact: phoneNumber, description: "Vedic Maths Demo" }),
      });
      const orderJson = await orderRes.json();
      //console.log("[Vedic Maths] Order API response", orderJson);
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
          description: "Vedic Maths Demo",
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
          //console.log("[Vedic Maths] Success handler", response);
          setShowReservationPopup(false);
          await updatePaymentStatus("success");
          window.location.href = `/vedic-maths/payment/success.php?transactionId=${encodeURIComponent(
            response.razorpay_payment_id || ""
          )}&amount=${encodeURIComponent("₹19")}`;
        },
        modal: {
          ondismiss: function () {
            //console.warn("[Vedic Maths] Checkout dismissed by user");
            updatePaymentStatus("fail").finally(() => {
              window.location.href = `/vedic-maths/payment/failed.php?transactionId=${encodeURIComponent(
                `DISMISSED_${Date.now()}`
              )}`;
            });
          },
        },
      };
      // @ts-ignore
      const rzp = new (window as any).Razorpay(options);
      //console.log("[Vedic Maths] Opening Razorpay checkout", { order_id: payload.order_id });
      rzp.open();
    } catch (err) {
      //console.error("[Vedic Maths] Error", err);
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
      <WhyStartEarly onEnroll={() => setShowReservationPopup(true)} />
      <AdvantagesGrid onStartJourney={() => setShowReservationPopup(true)} />

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


