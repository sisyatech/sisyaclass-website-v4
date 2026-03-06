"use client";

import React, { useEffect, useState, useRef } from "react";
import Script from "next/script";
import RevealOnView from "./Reveal/RevealOnView";
import Image from "next/image";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import LoginModal from "./LoginModal";
import { useUser } from "./UserContext";

interface ClassData {
  id: number;
  class: number;
  educatorImage: string;
  demoPrice: number;
  createdAt: string;
  updatedAt: string;
}

const ClassSelection = () => {
  const { user, isLoggedIn } = useUser();
  const [activeClass, setActiveClass] = useState("Class 1-3");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsEntered, setCardsEntered] = useState(false);
  const [mobileCardIndex, setMobileCardIndex] = useState(0);
  const [mobileGlobalIndex, setMobileGlobalIndex] = useState(0); // For cycling through all 10 classes
  const [entered, setEntered] = useState(false);
  const [classData, setClassData] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedClassForPayment, setSelectedClassForPayment] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const classOptions = ["Class 1-3", "Class 4-5", "Class 6-7", "Class 8-10"];

  const courseFeatures = [
    "Online Courses",
    "Detailed Syllabus",
    "Textbook Solutions",
    "Sample Papers",
    "Olympiad Preparation",
    "Worksheets",
    "Revision Notes",
  ];

  // All 10 classes with colors
  const allClasses = [
    { class: "Class 1", containerColor: "#E6E7FF", textColor: "#6366F1" },
    { class: "Class 2", containerColor: "#DBEAFE", textColor: "#5A9CB8" },
    { class: "Class 3", containerColor: "#FCE7F3", textColor: "#D18480" },
    { class: "Class 4", containerColor: "#D1FAE5", textColor: "#41AC7D" },
    { class: "Class 5", containerColor: "#FFF2CC", textColor: "#F59E0B" },
    { class: "Class 6", containerColor: "#F3E8FF", textColor: "#8B5CF6" },
    { class: "Class 7", containerColor: "#ECFDF5", textColor: "#059669" },
    { class: "Class 8", containerColor: "#FEF2F2", textColor: "#DC2626" },
    { class: "Class 9", containerColor: "#EEF2FF", textColor: "#3B82F6" },
    { class: "Class 10", containerColor: "#F0FDF4", textColor: "#16A34A" },
  ];

  // Fetch class data from API
  useEffect(() => {
    const fetchClassData = async () => {
      try {
        // //console.log('🚀 Fetching class data from API...');
        // //console.log('📡 API URL:', 'https://sisyaclass.xyz/student/get_class_card');
        
        const response = await fetch('https://sisyaclass.xyz/student/get_class_card', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors', // Explicitly request CORS
        });
        
        // //console.log('📊 API Response status:', response.status);
        // //console.log('📋 API Response headers:', {
        //   'Content-Type': response.headers.get('Content-Type'),
        //   'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
        // });
        
        if (response.ok) {
          const data = await response.json();
          // //console.log('✅ API Data received successfully!');
          // //console.log('📦 Number of classes:', data.length);
          // //console.log('📝 Sample data:', data[0]);
          setClassData(data);
        } else {
          // //console.error('❌ Failed to fetch class data, status:', response.status);
          const responseText = await response.text();
          // //console.error('📄 Response text:', responseText);
          
          // Try alternative endpoints
          // //console.log('🔄 Trying alternative API endpoints...');
          await tryAlternativeEndpoints();
        }
      } catch (error) {
        // //console.error('❌ Error fetching class data:', error);
        // //console.log('🔄 Network error - trying alternative endpoints...');
        await tryAlternativeEndpoints();
      } finally {
        setLoading(false);
        // //console.log('✅ Loading completed');
      }
    };

    const tryAlternativeEndpoints = async () => {
      // const alternativeUrls = [
      //   'https://sisyaclass.xyz/api/student/get_class_card',
      //   'https://sisyaclass.xyz/student/class_cards',
      //   'https://api.sisyaclass.xyz/student/get_class_card',
      // ];

      // for (const url of alternativeUrls) {
      //   try {
      //     //console.log(`🔍 Trying alternative URL: ${url}`);
      //     const response = await fetch(url, {
      //       method: 'GET',
      //       headers: { 'Content-Type': 'application/json' },
      //       mode: 'cors',
      //     });
      //     if (response.ok) {
      //       const data = await response.json();
      //       //console.log('✅ Alternative API Data received successfully!');
      //       //console.log('📦 Data:', data);
      //       setClassData(data);
      //       return;
      //     } else {
      //       //console.log(`❌ ${url} returned status: ${response.status}`);
      //     }
      //   } catch (error) {
      //     //console.log(`❌ Alternative URL ${url} failed:`, error);
      //   }
      // }
      
      // //console.error('❌ ALL API ENDPOINTS FAILED!');
      // //console.error('');
      // //console.error('🚨 BACKEND SETUP REQUIRED:');
      // //console.error('1. Make sure your backend server is running');
      // //console.error('2. Verify the endpoint: https://sisyaclass.xyz/student/get_class_card');
      // //console.error('3. Enable CORS headers in your backend:');
      // //console.error('   - Access-Control-Allow-Origin: *');
      // //console.error('   - Access-Control-Allow-Methods: GET, POST');
      // //console.error('   - Access-Control-Allow-Headers: Content-Type');
      // //console.error('');
      // //console.error('📝 Expected API Response Format:');
      // //console.error('[');
      // //console.error('  { id: 1, class: 1, educatorImage: "url", demoPrice: 19 },');
      // //console.error('  { id: 2, class: 2, educatorImage: "url", demoPrice: 19 },');
      // //console.error('  ... (all 10 classes)');
      // //console.error(']');
      // //console.error('');
    };

    fetchClassData();
  }, []);

  const getFilteredClasses = () => {
    switch (activeClass) {
      case "Class 1-3":
        return allClasses.slice(0, 3);
      case "Class 4-5":
        return allClasses.slice(3, 5);
      case "Class 6-7":
        return allClasses.slice(5, 7);
      case "Class 8-10":
        return allClasses.slice(7, 10);
      default:
        return allClasses;
    }
  };

  const filteredClasses = getFilteredClasses();

  // Helper function to get API data for a specific class
  const getClassApiData = (classNumber: number) => {
    const data = classData.find(data => data.class === classNumber);
    // //console.log(`Getting API data for Class ${classNumber}:`, data);
    return data;
  };

  // Helper function to get demo price for a class
  const getDemoPrice = (classNumber: number) => {
    const apiData = getClassApiData(classNumber);
    const price = apiData?.demoPrice || 19;
    // //console.log(`Demo price for Class ${classNumber}: ₹${price}`);
    return price; // Default to 19 if no data
  };

  // Helper function to get educator image for a class
  const getEducatorImage = (classNumber: number) => {
    const apiData = getClassApiData(classNumber);
    const imageUrl = apiData?.educatorImage || "/teacher.svg";
    // //console.log(`Educator image for Class ${classNumber}:`, imageUrl);
    return imageUrl; // Default to local image if no data
  };

  // Handle payment button click
  const handlePaymentClick = (classNumber: number) => {
    if (isLoggedIn && user) {
      // User is already logged in, proceed to payment directly
      //console.log(`User ${user.name} is already logged in, proceeding directly to payment for Class ${classNumber}`);
      handlePayment(classNumber);
    } else {
      // User not logged in, show login modal
      //console.log('User not logged in, showing login modal for Class', classNumber);
      setSelectedClassForPayment(classNumber);
      setShowLoginModal(true);
    }
  };

  // Handle payment after login (Razorpay checkout)
  const handlePayment = async (classNumber: number) => {
    try {
      const price = getDemoPrice(classNumber);
      const contactFromUser = (user as any)?.phone || (user as any)?.mobile || "";
      const contactFromStorage = typeof window !== 'undefined' ? (localStorage.getItem("mobileNumber") || "") : "";
      const contact = contactFromUser || contactFromStorage;

      //console.log("[PAYMENT] Starting flow", { classNumber, contact });
      // 1) Create registration lead similar to TenX
      try {
        const leadRes = await fetch("https://sisyaclass.xyz/student/new_reg_lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: (user as any)?.name || "SISYA Demo Lead",
            phone: contact,
            class: String(classNumber),
            status: "initiated",
          }),
        });
        const leadJson = await leadRes.json();
        //console.log("[PAYMENT] Lead response", leadJson);
        if (leadJson?.success && leadJson?.lead?.id) {
          localStorage.setItem("leadId", leadJson.lead.id);
          //console.log("[PAYMENT] Lead stored", { leadId: leadJson.lead.id });
        } else {
          //console.warn("[PAYMENT] Lead creation failed", leadJson);
        }
      } catch (e) {
        //console.warn("[PAYMENT] Lead request error", e);
      }

      // Create Razorpay order via Next.js API (amount in INR)
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: price, currency: "INR", description: `Demo for Class ${classNumber}` , contact }),
      });
      const orderJson = await orderRes.json();
      //console.log("[PAYMENT] Order API response", orderJson);
      if (!orderJson?.success) {
        alert("Failed to initialize payment. Please try again.");
        return;
      }

      // Support both shapes (data vs order/keyId)
      const payload = orderJson.data ? orderJson.data : {
        order_id: orderJson.order?.id,
        amount: orderJson.order?.amount,
        currency: orderJson.order?.currency,
        key_id: orderJson.keyId,
        name: "Sisya Class",
        description: `Demo for Class ${classNumber}`,
        prefill: { contact },
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
          const amountLabel = `₹${price}`;
          window.location.href = `/payment/success?transactionId=${encodeURIComponent(
            response.razorpay_payment_id || ""
          )}&amount=${encodeURIComponent(amountLabel)}`;
        },
        modal: {
          ondismiss: function () {
            window.location.href = `/payment/failed?transactionId=${encodeURIComponent(
              `DISMISSED_${Date.now()}`
            )}`;
          },
        },
      };

      // @ts-ignore
      const rzp = new (window as any).Razorpay(options);
      //console.log("[PAYMENT] Opening Razorpay checkout", { order_id: payload.order_id });
      rzp.open();
    } catch (err) {
      //console.error("[ClassSelection] Payment error", err);
      alert("Network error. Please try again.");
    } finally {
      //console.log("[PAYMENT] Flow ended");
    }
  };

  // Handle successful login
  const handleLoginSuccess = (userData: any) => {
    //console.log('ClassSelection: Login successful, user data:', userData);
    //console.log('ClassSelection: User is now logged in:', isLoggedIn);
    
    // User is now logged in via context, proceed with payment if there was a selected class
    // Note: We use userData directly since context state might not be updated immediately
    if (selectedClassForPayment && userData) {
      //console.log('ClassSelection: Proceeding with payment for class:', selectedClassForPayment);
      setTimeout(() => {
        handlePayment(selectedClassForPayment);
        setSelectedClassForPayment(null);
      }, 500);
    }
  };

  // Handle login modal close
  const handleLoginModalClose = () => {
    setShowLoginModal(false);
    setSelectedClassForPayment(null);
  };

  // Helper: get starting global index for a given range
  const getRangeStartIndex = (range: string) => {
    switch (range) {
      case "Class 1-3":
        return 0;
      case "Class 4-5":
        return 3;
      case "Class 6-7":
        return 5;
      case "Class 8-10":
        return 7;
      default:
        return 0;
    }
  };

  // Intersection Observer for initial animation
  useEffect(() => {
    if (!sectionRef.current) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handlePrevSlide = () => {
    setCardsEntered(false);
    const currentIndex = classOptions.indexOf(activeClass);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : classOptions.length - 1;
    setActiveClass(classOptions[prevIndex]);
    setCurrentSlide(0);
    // Re-trigger card animation
    setTimeout(() => setCardsEntered(true), 100);
  };

  const handleNextSlide = () => {
    setCardsEntered(false);
    const currentIndex = classOptions.indexOf(activeClass);
    const nextIndex = currentIndex < classOptions.length - 1 ? currentIndex + 1 : 0;
    setActiveClass(classOptions[nextIndex]);
    setCurrentSlide(0);
    // Re-trigger card animation
    setTimeout(() => setCardsEntered(true), 100);
  };

  useEffect(() => {
    setCurrentSlide(0);
    setMobileCardIndex(0);
    // Ensure mobile single-card starts at the first class of the selected range
    setMobileGlobalIndex(getRangeStartIndex(activeClass));
    // Re-trigger card animation when class changes
    setCardsEntered(false);
    setTimeout(() => setCardsEntered(true), 100);
  }, [activeClass]);

  const getCurrentSlideClasses = () => {
    const startIndex = currentSlide * 4;
    return filteredClasses.slice(startIndex, startIndex + 4);
  };

  const currentSlideClasses = getCurrentSlideClasses();
  
  // Update active class range based on mobile global index
  const updateActiveClassFromIndex = (index: number) => {
    if (index < 3) {
      setActiveClass("Class 1-3");
    } else if (index < 5) {
      setActiveClass("Class 4-5");
    } else if (index < 7) {
      setActiveClass("Class 6-7");
    } else {
      setActiveClass("Class 8-10");
    }
  };

  const handleMobilePrev = () => {
    setCardsEntered(false);
    const newGlobalIndex = mobileGlobalIndex === 0 ? allClasses.length - 1 : mobileGlobalIndex - 1;
    setMobileGlobalIndex(newGlobalIndex);
    updateActiveClassFromIndex(newGlobalIndex);
    setTimeout(() => setCardsEntered(true), 100);
  };
  const handleMobileNext = () => {
    setCardsEntered(false);
    const newGlobalIndex = mobileGlobalIndex >= allClasses.length - 1 ? 0 : mobileGlobalIndex + 1;
    setMobileGlobalIndex(newGlobalIndex);
    updateActiveClassFromIndex(newGlobalIndex);
    setTimeout(() => setCardsEntered(true), 100);
  };

  // Touch handlers for swipe gestures
  const minSwipeDistance = 50;
  
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleMobileNext();
    } else if (isRightSwipe) {
      handleMobilePrev();
    }
  };

  // Show loading state while fetching data
  if (loading) {
    return (
      <div ref={sectionRef} className="pt-5 pb-3 sm:pb-4 md:pb-5 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0595CE] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading class information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="pt-5 pb-3 sm:pb-4 md:pb-5 bg-white">
      {/* Razorpay script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
      <div className="mx-auto max-w-7xl px-4">
        {/* Headline */}
        <RevealOnView from="left" durationMs={1500}>
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="mb-5 sm:mb-6 md:mb-8 font-montserrat font-bold text-[18px] leading-[24px] sm:text-[36px] sm:leading-[40px] md:text-[44px] md:leading-[44px] lg:text-[50px] lg:leading-[45px] capitalize text-[#1A2439]">
              <span className="block mb-2 font-montserrat font-normal text-[17px] leading-[26px] sm:text-[20px] sm:leading-[30px] md:text-[23px] md:leading-[36px] lg:text-[25px] lg:leading-[45px] text-[#1A2439]">
                Explore What You Can Learn
              </span>
              with SISYA, From Class 1 to 10
            </h2>

            {/* Class Selection Buttons */}
            <RevealOnView from="right" durationMs={1500}>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
                {classOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setActiveClass(option);
                      setCurrentSlide(0);
                      // When a range is chosen directly (especially on mobile),
                      // jump the mobile global index to the first class in that range
                      setMobileGlobalIndex(getRangeStartIndex(option));
                    }}
                    className={`cursor-pointer font-montserrat font-semibold text-[13px] sm:text-[14px] md:text-[15px] transition-all duration-300 w-[130px] h-[40px] sm:w-[135px] sm:h-[44px] md:w-[139px] md:h-[46px] rounded-[15px] px-[16px] sm:px-[20px] md:px-[23.66px] py-[10px] sm:py-[11px] md:py-[12.52px] shadow-[0px_5.57px_5.57px_0px_rgba(0,0,0,0.25)] ${
                      activeClass === option
                        ? "bg-[#0595CE] text-white border border-transparent"
                        : "bg-white text-[#1A2439] border border-[#1A2439]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </RevealOnView>
          </div>
        </RevealOnView>

        {/* Carousel */}
        <RevealOnView from="bottom" durationMs={1500}>
          <div className={`relative transition-all duration-[1500ms] ease-out ${entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[160px]"}`}>
            {/* Navigation Arrows */}
            <button
              onClick={handlePrevSlide}
              className="cursor-pointer hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 translate-x-2 items-center justify-center transition-all duration-300 z-10 hover:bg-gray-100 hover:shadow-md w-[40px] h-[40px] border-2 border-[#D9D9D9] rounded-[14px] bg-white group"
            >
              <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-500 group-hover:-translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNextSlide}
              className="cursor-pointer hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 -translate-x-2 items-center justify-center transition-all duration-300 z-10 hover:bg-gray-100 hover:shadow-md w-[40px] h-[40px] border-2 border-[#D9D9D9] rounded-[14px] bg-white group"
            >
              <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Cards - Desktop/Tablet */}
            <div className="hidden md:flex justify-center gap-4 md:gap-5 lg:gap-6 px-6 md:px-8">
              {currentSlideClasses.map((card, index) => (
                <div
                  key={`${activeClass}-${index}`}
                  className={`shadow-lg hover:shadow-xl transition-all duration-[400ms] ease-out relative w-[220px] h-[320px] md:w-[240px] md:h-[330px] lg:w-[250px] lg:h-[338px] rounded-[18px] md:rounded-[20px] ${
                    cardsEntered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: cardsEntered ? `${index * 120}ms` : "0ms",
                    backgroundColor: card.containerColor,
                  }}
                >
                  {/* Teacher Image */}
                  <div className="relative -top-[32px] md:-top-[34px] lg:-top-[35px] left-[6px] md:left-[7px]">
                    <Image 
                      src={getEducatorImage(parseInt(card.class.match(/\d+/)?.[0] || "1"))} 
                      alt={`${card.class} Teacher`} 
                      width={247} 
                      height={246} 
                      className="object-cover w-[215px] h-[215px] md:w-[230px] md:h-[230px] lg:w-[246.56px] lg:h-[246.04px] rounded-full"
                      unoptimized
                    />
                  </div>

                  {/* Class Number */}
                  <div className="absolute top-[46px] md:top-[47px] lg:top-[48px] left-[152px] md:left-[162px] lg:left-[172px]">
                    <h3 className="w-[74px] h-[22px] font-montserrat font-bold text-[17px] md:text-[18px] leading-none text-center text-[#1A2439]">{card.class}</h3>
                  </div>

                  {/* Bottom Half - Course Features */}
                  <div className="absolute w-[208px] h-[165px] md:w-[220px] md:h-[168px] lg:w-[232px] lg:h-[172px] top-[145px] md:top-[152px] lg:top-[160px] left-[8px] md:left-[9px] rounded-[14px] bg-[#1A2439]">
                    <div className="p-3 md:p-4 h-full flex flex-col">
                      <div className="grid grid-cols-2 gap-2 mb-2 flex-1">
                        {courseFeatures.map((feature, featureIndex) => (
                          <button key={featureIndex} className={`transition-colors duration-300 font-montserrat font-semibold text-[7.5px] md:text-[8px] leading-none tracking-[0.02em] rounded-[9.5px] bg-white ${feature === "Olympiad Preparation" ? "col-span-2" : ""}`} style={{ width: feature === "Olympiad Preparation" ? "auto" : "88px", height: "22.73px", color: card.textColor }}>
                            {feature}
                          </button>
                        ))}
                      </div>

                      {/* Book Demo Button */}
                      <div className="flex justify-center">
                        <button 
                          onClick={() => handlePaymentClick(parseInt(card.class.match(/\d+/)?.[0] || "1"))}
                          className="cursor-pointer transition-colors duration-300 w-[118px] md:w-[124px] h-[22px] rounded-[8px] bg-[#FED700] text-[#1A2439] font-montserrat font-semibold text-[8px] leading-none tracking-[0.02em] hover:bg-[#F5C842]"
                        >
                          Book a Demo at ₹{getDemoPrice(parseInt(card.class.match(/\d+/)?.[0] || "1"))}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cards - Mobile single card with arrows (cycles through all 10 classes) */}
            <div className="md:hidden">
              <div className="flex justify-center px-2">
                {allClasses.length > 0 && (
                  <div
                    key={mobileGlobalIndex}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    className={`shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out relative w-[240px] h-[340px] sm:w-[250px] sm:h-[345px] rounded-[20px] touch-none ${
                      cardsEntered ? "opacity-100 scale-100" : "opacity-0 scale-90"
                    }`}
                    style={{ backgroundColor: allClasses[mobileGlobalIndex].containerColor }}
                  >
                    <div className="relative -top-[33px] left-[7px]">
                      <Image 
                        src={getEducatorImage(allClasses[mobileGlobalIndex].class.match(/\d+/)?.[0] ? parseInt(allClasses[mobileGlobalIndex].class.match(/\d+/)?.[0] || "1") : 1)} 
                        alt={`Class ${allClasses[mobileGlobalIndex].class} Teacher`} 
                        width={230} 
                        height={230} 
                        className="object-cover w-[230px] h-[230px] rounded-full"
                        unoptimized
                      />
                    </div>
                    <div className="absolute top-[45px] right-3">
                      <h3 className="w-[74px] h-[22px] font-montserrat font-bold text-[17px] leading-none text-center text-[#1A2439]">{allClasses[mobileGlobalIndex].class}</h3>
                    </div>
                    <div className="absolute w-[216px] h-[170px] top-[152px] left-[9px] rounded-[14px] bg-[#1A2439]">
                      <div className="p-4 h-full flex flex-col">
                        <div className="grid grid-cols-2 gap-2 mb-2 flex-1">
                          {courseFeatures.map((feature, featureIndex) => (
                            <button
                              key={featureIndex}
                              className={`transition-colors duration-300 font-montserrat font-semibold text-[7.5px] leading-none tracking-[0.02em] rounded-[9.5px] bg-white ${
                                feature === "Olympiad Preparation" ? "col-span-2" : ""
                              }`}
                              style={{
                                width: feature === "Olympiad Preparation" ? "auto" : "90px",
                                height: "22.73px",
                                color: allClasses[mobileGlobalIndex].textColor,
                              }}
                            >
                              {feature}
                            </button>
                          ))}
                        </div>
                        <div className="flex justify-center">
                          <button 
                            onClick={() => handlePaymentClick(allClasses[mobileGlobalIndex].class.match(/\d+/)?.[0] ? parseInt(allClasses[mobileGlobalIndex].class.match(/\d+/)?.[0] || "1") : 1)}
                            className="cursor-pointer transition-colors duration-300 w-[116px] h-[22px] rounded-[8px] bg-[#FED700] text-[#1A2439] font-montserrat font-semibold text-[8px] leading-none tracking-[0.02em] hover:bg-[#F5C842]"
                          >
                            Book a Demo at ₹{getDemoPrice(allClasses[mobileGlobalIndex].class.match(/\d+/)?.[0] ? parseInt(allClasses[mobileGlobalIndex].class.match(/\d+/)?.[0] || "1") : 1)}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-center justify-center gap-6">
                <button onClick={handleMobilePrev} className="cursor-pointer w-8 h-8 border border-[#D9D9D9] rounded-lg bg-white flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all duration-300 hover:shadow-md group">
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-500 group-hover:-translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={handleMobileNext} className="cursor-pointer w-8 h-8 border border-[#D9D9D9] rounded-lg bg-white flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all duration-300 hover:shadow-md group">
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>
        </RevealOnView>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={handleLoginModalClose}
        onLoginSuccess={handleLoginSuccess}
        selectedClass={selectedClassForPayment || undefined}
      />
    </div>
  );
};

export default ClassSelection;


