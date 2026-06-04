"use client";

import React, { useState } from "react";
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

export default function JeeFoundationContent() {
  const [showReservationPopup, setShowReservationPopup] = useState(false);
  const [selectedClass, setSelectedClass] = useState("6");
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
        //console.log("[JEE Foundation] Lead status updated successfully");
        return true;
      }

      //console.warn("[JEE Foundation] Failed to update lead status");
      return false;
    } catch (error) {
      //console.error("[JEE Foundation] Error updating lead status:", error);
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
    let stateStr = "";
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

            if (state) stateStr = state.trim();

            const fetchedCity = city || town || village;
            const parts = [fetchedCity, suburb, state, country, postcode]
              .filter((part: string | undefined) => Boolean(part))
              .map((part: string) => part.trim());

            if (parts.length) {
              locationStr = [...new Set(parts)].slice(0, 5).join(" ");
            }
          }
        } catch (e) { }
      }
    } catch (e) { }

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const leadResponse = await fetch("https://sisyaclass.xyz/student/new_reg_lead3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "JEE FOUNDATION",
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
      if (!leadData?.success) {
        alert("Something went wrong. Please try again.");
        return;
      }
      localStorage.setItem("leadId", leadData.lead.id);
      await updatePaymentStatus("success");
      setShowReservationPopup(false);
      window.location.href = `/jee_foundation/payment/success.php?type=demo&class=${encodeURIComponent(
        selectedClass
      )}&phone=${encodeURIComponent(phoneNumber)}`;
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <HeroSection onRegister={() => setShowReservationPopup(true)} />
      <StatsSection onChooseClass={handleChooseClass} />
      <WhyStartEarly onEnroll={() => setShowReservationPopup(true)} />
      <AdvantagesGrid onStartJourney={() => setShowReservationPopup(true)} />

      <ReviewsSection />
      {/* <Teachers /> */}
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


