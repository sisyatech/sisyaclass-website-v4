"use client";

import React, { useState, useEffect, useRef } from "react";
import Script from "next/script";
import Image from "next/image";
import ReservationPopup from "./components/ReservationPopup";
import WhatsAppFab from "./components/WhatsAppFab";
import SocialFab from "./components/SocialFab";
import HeroSection from "./sections/HeroSection";
import StatsSection from "./sections/StatsSection";
import ClassTimingsSection from "./sections/ClassTimingsSection";
import AISection from "./sections/AISection";
import TestimonialsSection from "./sections/TestimonialsSection";
import ParentSupportSection from "./sections/ParentSupportSection";
import CompareSection from "./sections/CompareSection";
import TransformSection from "./sections/TransformSection";
import EducatorSection from "./sections/EducatorSection";
import TeamSection from "./sections/TeamSection";
import VideoSliderSection from "./sections/VideoSliderSection";
import PromoSection from "./sections/PromoSection";

// Note: This is a conversion of the PHP landing page to Next.js
// Some asset paths referenced in the PHP (like ../mainAsset/) may need to be updated
// Payment API endpoints will need to be created as Next.js API routes

export default function TenXBoosterCourseContent() {
  const [showReservationPopup, setShowReservationPopup] = useState(false);
  const [selectedClass, setSelectedClass] = useState("1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const typewriterRef = useRef<NodeJS.Timeout | null>(null);
  const aiImageRowRef = useRef<HTMLDivElement | null>(null);

  // Typewriter effect
  useEffect(() => {
    const animatedText = "Only Edtech with AI Integrated";
    let currentIndex = 0;
    let typingDirection = 1;

    function runTypewriterEffect() {
      if (typingDirection === 1 && currentIndex <= animatedText.length) {
        setTypewriterText(animatedText.slice(0, currentIndex++));
      } else if (typingDirection === -1 && currentIndex >= 0) {
        setTypewriterText(animatedText.slice(0, currentIndex--));
      }

      if (currentIndex === animatedText.length) {
        typingDirection = -1;
        typewriterRef.current = setTimeout(runTypewriterEffect, 2000);
        return;
      }

      if (currentIndex < 0) {
        typingDirection = 1;
        typewriterRef.current = setTimeout(runTypewriterEffect, 500);
        return;
      }

      typewriterRef.current = setTimeout(runTypewriterEffect, 100);
    }

    runTypewriterEffect();

    return () => {
      if (typewriterRef.current) clearTimeout(typewriterRef.current);
    };
  }, []);

  // AI images auto-scroll on mobile
  useEffect(() => {
    if (typeof window === "undefined") return;

    const aiImageRowContainer = aiImageRowRef.current;
    if (!aiImageRowContainer) return;

    if (window.innerWidth <= 768) {
      const aiImageElements = aiImageRowContainer.querySelectorAll("img");
      if (aiImageElements.length === 0) return;

      let currentAiImageIndex = 0;
      const totalAiImages = aiImageElements.length;
      const aiScrollDelay = 3000;
      const aiImageWidth = window.innerWidth;

      const scrollInterval = setInterval(() => {
        currentAiImageIndex = (currentAiImageIndex + 1) % totalAiImages;
        aiImageRowContainer.scrollTo({
          left: currentAiImageIndex * aiImageWidth,
          behavior: "smooth",
        });
      }, aiScrollDelay);

      return () => clearInterval(scrollInterval);
    }
  }, []);

  const handleClassButtonClick = (grade: string) => {
    setSelectedClass(grade);
    setShowReservationPopup(true);
  };

  const handleReserveClick = async () => {
    if (!phoneNumber || !selectedClass) {
      alert("Please enter your phone number and select a class.");
      return;
    }

    const isValidMobile = /^[6-9]\d{9}$/.test(phoneNumber);
    if (!isValidMobile) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    localStorage.setItem("mobileNumber", phoneNumber);
    localStorage.setItem("selectedClass", selectedClass);
    
    setShowLoader(true);
    
    try {
      //console.log("[PAYMENT] Starting flow", { selectedClass, phoneNumber });
      // 1) Create registration lead (existing)
      const leadResponse = await fetch(
        "https://sisyaclass.xyz/student/new_reg_lead",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "SISYA Rank Booster - 10X Smarter Learning by IITians",
            phone: phoneNumber,
            class: selectedClass,
            status: "initiated",
          }),
        }
      );
      const leadData = await leadResponse.json();
      //console.log("[PAYMENT] Lead response", leadData);
      if (!leadData?.success) {
        alert("Something went wrong. Please try again.");
        return;
      }
      localStorage.setItem("leadId", leadData.lead.id);
      //console.log("[PAYMENT] Lead stored", { leadId: leadData.lead.id });

      // 2) Create Razorpay order via Next.js API
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 19, currency: "INR", contact: phoneNumber, description: "10x Booster Course Demo" }),
      });
      const orderJson = await orderRes.json();
      //console.log("[PAYMENT] Order API response", orderJson);
      if (!orderJson?.success) {
        alert("Failed to initialize payment. Please try again.");
        return;
      }

      // Support both PHP-like shape (data) and previous shape (order/keyId)
      const payload = orderJson.data ? orderJson.data : {
        order_id: orderJson.order?.id,
        amount: orderJson.order?.amount,
        currency: orderJson.order?.currency,
        key_id: orderJson.keyId,
        name: "Sisya Class",
        description: "10x Booster Course Demo",
        prefill: { contact: phoneNumber },
      };

      // 3) Open Razorpay Checkout
      const options: any = {
        key: payload.key_id,
        amount: payload.amount,
        currency: payload.currency,
        name: payload.name,
        description: payload.description,
        order_id: payload.order_id,
        prefill: payload.prefill,
        handler: function (response: any) {
          //console.log("[PAYMENT] Success handler", response);
          setShowReservationPopup(false);
          window.location.href = `/10xboostercourse/payment/success.php?transactionId=${encodeURIComponent(
            response.razorpay_payment_id || ""
          )}&amount=${encodeURIComponent("₹19")}`;
        },
        modal: {
          ondismiss: function () {
            //console.warn("[PAYMENT] Checkout dismissed by user");
            window.location.href = `/10xboostercourse/payment/failed.php?transactionId=${encodeURIComponent(
              `DISMISSED_${Date.now()}`
            )}`;
          },
        },
      };

      // @ts-ignore
      const rzp = new (window as any).Razorpay(options);
      //console.log("[PAYMENT] Opening Razorpay checkout", { order_id: payload.order_id });
      rzp.open();
    } catch (error) {
      //console.error("Error:", error);
      alert("Network error. Please try again.");
    } finally {
      setShowLoader(false);
      //console.log("[PAYMENT] Flow ended");
    }
  };


  return (
    <>
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0); }
        }
        @keyframes rotateFloat {
          0% { transform: rotate(0deg) translateY(0); }
          50% { transform: rotate(5deg) translateY(-10px); }
          100% { transform: rotate(0deg) translateY(0); }
        }
        @keyframes blink {
          to { visibility: hidden; }
        }
        @keyframes blink-caret {
          from, to { border-color: transparent; }
          50% { border-color: orange; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .floating-icon {
          animation: float 3s ease-in-out infinite;
        }
        .floating-icon.flask {
          animation-delay: 1s;
          animation-duration: 4s;
        }
        .floating-icon.hand {
          animation: rotateFloat 5s ease-in-out infinite;
        }
        .ai-section h1::after {
          content: "";
          display: inline-block;
          width: 3px;
          height: 1em;
          background-color: #000;
          margin-left: 4px;
          animation: blink 1s steps(2, start) infinite;
          vertical-align: middle;
        }
      `}</style>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/gsap.min.js"
        integrity="sha512-f6bQMg6nkSRw/xfHw5BCbISe/dJjXrVGfz9BSDwhZtiErHwk7ifbmBEtF9vFW8UNIQPhV2uEFVyI/UHob9r7Cw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        strategy="lazyOnload"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/ScrollTrigger.min.js"
        integrity="sha512-AcqPGqrrAEtEwe+ADO5R8RbdFi7tuU7b/A2cJJH0Im0D18NRk5p5s4B3E5PMuO81KFw0ClN7J5SHVUJz7KOb0A=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        strategy="lazyOnload"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/TextPlugin.min.js"
        integrity="sha512-cxH9rbrf9TrOfYMunxS2cLhFg/hIFJP9/d8SdBT1To+D5BHf6XcYN6PGtLiN9baib6ve4JDOzaPrCTRyo/8J9g=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        strategy="lazyOnload"
      />

      {/* Google Tag Manager */}
      <Script id="gtm-script" strategy="afterInteractive">
        {`
          (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
              'gtm.start': new Date().getTime(),
              event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', 'GTM-PMD8KHN9');
        `}
      </Script>

      <div className="tenx-booster-page">
        {/* Sidebar is handled by Navbar component */}
        
        {/* Hero Section */}
        <HeroSection onRegister={() => setShowReservationPopup(true)} />

        {/* Stats Section */}
        <StatsSection onChooseClass={(g) => handleClassButtonClick(g)} />

        {/* Class Timings Section */}
        <ClassTimingsSection />

        {/* Testimonial Section */}
        <TestimonialsSection />
        {/* Old inline testimonial removed below */}
        {/* <section className="text-center py-12 px-4 bg-white max-w-6xl mx-auto" id="testimonial-section">
          <div className="overflow-x-auto scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory touch-pan-x px-4 pb-4 mx-auto max-w-full">
            <div className="flex gap-8 w-max">
              <div className="bg-white rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.06)] py-8 px-6 w-[350px] flex-shrink-0 snap-start flex flex-col gap-4 h-[300px]">
                <div className="w-12 h-12 text-[#eeeeee] self-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="block w-full h-full"
                  >
                   <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                    <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                  </svg>
                </div>
                <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                  <p className="m-0 text-base text-left text-[#444] leading-relaxed p-0">
                    My daughter is much more confident now! She understands things
                    better and gets better marks in school.
                  </p>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <Image
                    src="/10x/t1.jpeg"
                    alt="Priya Sharma"
                    width={48}
                    height={48}
                    className="rounded-full w-12 h-12 object-cover"
                  />
                  <div className="flex flex-col items-start justify-center">
                    <div className="text-[13px] text-[#555] flex gap-[5px] flex-wrap items-center">
                      <span className="font-semibold text-[15px] text-[#222] mb-1">Priya Sharma</span>
                      <span className="text-[#4a4ef5] text-[10px] font-medium">Parent</span>
                    </div>
                    <span className="stars">⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.06)] py-8 px-6 w-[350px] flex-shrink-0 snap-start flex flex-col gap-4 h-[320px]">
                <div className="w-12 h-12 text-[#eeeeee] self-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                    <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 20 0 0-2-2z" />
                  </svg>
                </div>
                <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                  <p className="m-0 text-base text-left text-[#444] leading-relaxed p-0">
                    The AI learning and games keep my child interested. Learning is
                    actually fun now!
                  </p>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <Image
                    src="/10x/t2.jpeg"
                    alt="Harsha"
                    width={48}
                    height={48}
                    className="rounded-full w-12 h-12 object-cover"
                  />
                  <div className="flex flex-col items-start justify-center">
                    <div className="text-[13px] text-[#555] flex gap-[5px] flex-wrap items-center">
                      <span className="font-semibold text-[15px] text-[#222] mb-1">Harsha</span>
                      <span className="text-[#4a4ef5] text-[10px] font-medium">Parent</span>
                    </div>
                    <span className="stars">⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.06)] py-8 px-6 w-[350px] flex-shrink-0 snap-start flex flex-col gap-4 h-[300px]">
                <div className="w-12 h-12 text-[#eeeeee] self-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="block w-full h-full"
                  >
                    <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                    <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                  </svg>
                </div>
                <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                  <p className="m-0 text-base text-left text-[#444] leading-relaxed p-0">
                    SISYA Class made learning easy! The teachers explain everything
                    well, and now I understand my school classes better.
                  </p>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <Image
                    src="/10x/t3.jpeg"
                    alt="Varshini"
                    width={48}
                    height={48}
                    className="rounded-full w-12 h-12 object-cover"
                  />
                  <div className="flex flex-col items-start justify-center">
                    <div className="text-[13px] text-[#555] flex gap-[5px] flex-wrap items-center">
                      <span className="font-semibold text-[15px] text-[#222] mb-1">Varshini</span>
                      <span className="text-[#4a4ef5] text-[10px] font-medium">Class 9 Student</span>
                    </div>
                    <span className="stars">⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Parent Support Section */}
        <ParentSupportSection />
        {/* <section className="bg-[#eaf3ff] rounded-[20px] p-8 max-w-[1000px] mx-auto">
          <div className="flex flex-wrap items-start justify-between">
            <div className="flex-1 basis-[45%]">
              <h2 className="text-[3rem] text-[#01317a] mb-4">Does This Sound Familiar?</h2>
              <ul className="list-none p-0 m-0">
                <li className="flex items-center gap-4 mb-8 text-lg text-[#333]">
                  <Image
                    src="/10x/wrong-decision 1.svg"
                    alt="Concern Icon"
                    width={36}
                    height={36}
                    className="w-9 h-9"
                  />
                  <span>My child forgets what they learn in school...</span>
                </li>
                <li className="flex items-center gap-4 mb-8 text-lg text-[#333]">
                  <Image
                    src="/10x/wrong-decision 1.svg"
                    alt="Concern Icon"
                    width={36}
                    height={36}
                    className="w-9 h-9"
                  />
                  <span>I can&apos;t always help with doubts - I&apos;m busy or unsure...</span>
                </li>
                <li className="flex items-center gap-4 mb-8 text-lg text-[#333]">
                  <Image
                    src="/10x/wrong-decision 1.svg"
                    alt="Concern Icon"
                    width={36}
                    height={36}
                    className="w-9 h-9"
                  />
                  <span>Tuition classes are either too far or too expensive.</span>
                </li>
              </ul>
            </div>

            <div className="flex-1 basis-[45%] text-left md:flex-col md:items-center md:text-center">
              <Image
                src="/10x/Object.svg"
                alt="Parent Helping Child"
                className="max-w-full h-auto mb-4"
                width={400}
                height={400}
              />
              <div>
                <h3 className="text-[#01317a] text-xl mb-2 ml-11 md:ml-0 md:text-center">Our Solution:</h3>
                <p className="text-base text-[#333] flex items-start gap-2 md:justify-center">
                  <Image
                    src="/10x/verified 1.svg"
                    alt="Check Icon"
                    width={36}
                    height={36}
                    className="w-9 h-9 flex-shrink-0"
                  />
                  A complete online learning system built to support your child -
                  and you.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center bg-white py-3 px-4 rounded-xl font-semibold text-[#003087] text-base w-1/2 mx-auto">
            <span>🔥 SISYA CLASS - Built with working parents in mind.</span>
          </div>
        </section> */}

        {/* SISYA Compare Section */}
        <CompareSection />
        {/* <section className="text-center p-8 px-4" id="sisya-compare-section">
          <h2 className="text-[2rem] text-black mb-8 leading-[2.5rem] md:text-[1.3rem] md:leading-normal">
            Why Settle for Less? Choose SISYA<br />
            Where Smart Learning Begins @ Just ₹19!
          </h2>

          <div className="max-w-[800px] mx-auto bg-[#eaf3ff] rounded-xl overflow-hidden">
            <div className="grid grid-cols-[2fr_1fr_1fr] p-4 border-b border-[#d0e0f0] items-center justify-items-center bg-[#003087] text-white font-semibold">
              <div>Features</div>
              <div>SISYA CLASS</div>
              <div>Others</div>
            </div>

            {[
              "Includes Coding & Robotics",
              "Live Sessions with IIT/NIT Mentors",
              "AI Chatbot for Instant Doubt Help",
              "Real-Time Feedback & Performance Tracking",
              "Personalized Mentorship (Quadcore Model)",
              "Practice Worksheets + Regular Homework",
              "Certificate + Discounts on Future Courses",
            ].map((label) => (
              <div key={label} className="grid grid-cols-[2fr_1fr_1fr] p-4 border-b border-[#d0e0f0] items-center justify-items-center">
                <div>{label}</div>
                <div>
                  <Image src="/10x/tick.svg" alt="Yes" width={24} height={24} />
                </div>
                <div>
                  <Image src="/10x/cross.svg" alt="No" width={24} height={24} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 inline-flex items-center gap-2 mx-auto">
            <a href="#team">
              <button className="bg-[#ffd500] text-black border-0 py-3 px-6 font-semibold text-base rounded-lg cursor-pointer h-full">Checkout Our Demo Lecture</button>
            </a>
            <Image
              className="h-full max-h-12 object-contain"
              src="/10x/down-arrow.gif"
              alt="Click Icon"
              width={48}
              height={48}
            />
          </div>
        </section> */}

        <TransformSection />

        {/* Educator Section */}
        <EducatorSection />

        {/* AI Section */}
        <AISection typewriterText={typewriterText} aiImageRowRef={aiImageRowRef as React.RefObject<HTMLDivElement>} />

        {/* Team Section */}
        <TeamSection onRegister={() => setShowReservationPopup(true)} />

        {/* Video Slider Section */}
        <VideoSliderSection />

        {/* Promo Section */}
        <PromoSection onRegister={() => setShowReservationPopup(true)} />

       
        <WhatsAppFab />
        <SocialFab />

        {/* Reservation Popup */}
        <ReservationPopup
          open={showReservationPopup}
          selectedClass={selectedClass}
          phoneNumber={phoneNumber}
          onChangeClass={setSelectedClass}
          onChangePhone={setPhoneNumber}
          onSubmit={handleReserveClick}
          onClose={() => setShowReservationPopup(false)}
        />

        {/* Loader */}
        {showLoader && (
          <div id="loader" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000]">
            <div className="border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-12 h-12 animate-spin"></div>
          </div>
        )}
      </div>

      {/* Google Tag Manager noscript */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-PMD8KHN9"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}

