"use client";
import React, { useState } from "react";
import HeroSection from "./sections/HeroSection";
import StatsSection from "./sections/StatsSection";
import ReviewsSection from "./sections/ReviewsSection";
import UniqueCourseSection from "./sections/UniqueCourseSection";
import BlueStatsSection from "./sections/BlueStatsSection";
import Testimonials from "../Testimonials";
import HowItWorksSection from "./sections/HowItWorksSection";
import ReservationPopup from "./components/ReservationPopup";
import WhatsAppFab from "./components/WhatsAppFab";
import SocialFab from "./components/SocialFab";

export default function ThreeDayLPContent() {
  const [showReservationPopup, setShowReservationPopup] = useState(false);
  const [selectedClass, setSelectedClass] = useState("1");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChooseClass = (grade: string) => {
    setSelectedClass(grade);
    setShowReservationPopup(true);
  };

  const handleReserveClick = () => {
    if (!phoneNumber || !selectedClass) return alert("Please enter your phone number and select a class.");
    const isValid = /^[6-9]\d{9}$/.test(phoneNumber);
    if (!isValid) return alert("Please enter a valid 10-digit mobile number.");
    localStorage.setItem("mobileNumber", phoneNumber);
    localStorage.setItem("selectedClass", selectedClass);
    setShowReservationPopup(false);
    alert("Thanks! We will reach out shortly.");
  };

  return (
    <main className="min-h-screen bg-white">
      <HeroSection onRegister={() => setShowReservationPopup(true)}/>
      <StatsSection onChooseClass={handleChooseClass} />
      <ReviewsSection />
      <UniqueCourseSection />
      <BlueStatsSection />
      <Testimonials />
      <HowItWorksSection />
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
    </main>
  );
}


