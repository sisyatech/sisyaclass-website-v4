"use client";

import React, { useEffect, useState } from "react";
import RevealOnView from "./Reveal/RevealOnView";
import Image from "next/image";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

const ClassSelection = () => {
  const [activeClass, setActiveClass] = useState("Class 1-3");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsEntered, setCardsEntered] = useState(false);
  const [mobileCardIndex, setMobileCardIndex] = useState(0);
  const [mobileGlobalIndex, setMobileGlobalIndex] = useState(0); // For cycling through all 10 classes

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

  const handlePrevSlide = () => {
    const currentIndex = classOptions.indexOf(activeClass);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : classOptions.length - 1;
    setActiveClass(classOptions[prevIndex]);
    setCurrentSlide(0);
  };

  const handleNextSlide = () => {
    const currentIndex = classOptions.indexOf(activeClass);
    const nextIndex = currentIndex < classOptions.length - 1 ? currentIndex + 1 : 0;
    setActiveClass(classOptions[nextIndex]);
    setCurrentSlide(0);
  };

  useEffect(() => {
    setCurrentSlide(0);
    setMobileCardIndex(0);
    // Ensure mobile single-card starts at the first class of the selected range
    setMobileGlobalIndex(getRangeStartIndex(activeClass));
  }, [activeClass]);

  // Fade out/in cards when class range changes
  useEffect(() => {
    setCardsEntered(false);
    const id = requestAnimationFrame(() => setCardsEntered(true));
    return () => cancelAnimationFrame(id);
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
    requestAnimationFrame(() => setCardsEntered(true));
  };
  const handleMobileNext = () => {
    setCardsEntered(false);
    const newGlobalIndex = mobileGlobalIndex >= allClasses.length - 1 ? 0 : mobileGlobalIndex + 1;
    setMobileGlobalIndex(newGlobalIndex);
    updateActiveClassFromIndex(newGlobalIndex);
    requestAnimationFrame(() => setCardsEntered(true));
  };

  return (
    <div className="pt-10 pb-6 sm:pb-8 md:pb-10 bg-white">
      
      <div className="mx-auto max-w-7xl px-4">
        {/* Headline */}
        <RevealOnView from="left" durationMs={1500}>
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="mb-5 sm:mb-6 md:mb-8 font-montserrat font-bold text-[26px] leading-[32px] sm:text-[36px] sm:leading-[40px] md:text-[44px] md:leading-[44px] lg:text-[50px] lg:leading-[45px] capitalize text-[#1A2439]">
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
                    className={`font-montserrat font-semibold text-[13px] sm:text-[14px] md:text-[15px] transition-all duration-300 w-[130px] h-[40px] sm:w-[135px] sm:h-[44px] md:w-[139px] md:h-[46px] rounded-[15px] px-[16px] sm:px-[20px] md:px-[23.66px] py-[10px] sm:py-[11px] md:py-[12.52px] shadow-[0px_5.57px_5.57px_0px_rgba(0,0,0,0.25)] ${
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
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={handlePrevSlide}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 translate-x-2 items-center justify-center transition-colors duration-300 z-10 hover:bg-gray-100 w-[40px] h-[40px] border-2 border-[#D9D9D9] rounded-[14px] bg-white"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNextSlide}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 -translate-x-2 items-center justify-center transition-colors duration-300 z-10 hover:bg-gray-100 w-[40px] h-[40px] border-2 border-[#D9D9D9] rounded-[14px] bg-white"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Cards - Desktop/Tablet */}
            <div className="hidden md:flex justify-center gap-4 md:gap-5 lg:gap-6 px-6 md:px-8">
              {currentSlideClasses.map((card, index) => (
                <div
                  key={index}
                  className={`shadow-lg hover:shadow-xl transition-all duration-[1500ms] ease-out relative w-[220px] h-[320px] md:w-[240px] md:h-[330px] lg:w-[250px] lg:h-[338px] rounded-[18px] md:rounded-[20px] ${
                    cardsEntered ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  style={{
                    transitionDelay: cardsEntered ? `${index * 120}ms` : "0ms",
                    backgroundColor: card.containerColor,
                  }}
                >
                  {/* Teacher Image */}
                  <div className="relative -top-[32px] md:-top-[34px] lg:-top-[35px] left-[6px] md:left-[7px]">
                    <Image src="/teacher.svg" alt="Teacher" width={247} height={246} className="object-cover w-[215px] h-[215px] md:w-[230px] md:h-[230px] lg:w-[246.56px] lg:h-[246.04px]" />
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
                        <button className="transition-colors duration-300 w-[118px] md:w-[124px] h-[22px] rounded-[8px] bg-[#FED700] text-[#1A2439] font-montserrat font-semibold text-[8px] leading-none tracking-[0.02em]">Book a Demo at ₹19</button>
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
                    className={`shadow-lg hover:shadow-xl transition-all duration-[600ms] ease-out relative w-[240px] h-[340px] sm:w-[250px] sm:h-[345px] rounded-[20px] ${
                      cardsEntered ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                    style={{ backgroundColor: allClasses[mobileGlobalIndex].containerColor }}
                  >
                    <div className="relative -top-[33px] left-[7px]">
                      <Image src="/teacher.svg" alt="Teacher" width={230} height={230} className="object-cover w-[230px] h-[230px]" />
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
                          <button className="transition-colors duration-300 w-[116px] h-[22px] rounded-[8px] bg-[#FED700] text-[#1A2439] font-montserrat font-semibold text-[8px] leading-none tracking-[0.02em]">Book a Demo at ₹19</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-center justify-center gap-6">
                <button onClick={handleMobilePrev} className="w-10 h-10 border-2 border-[#D9D9D9] rounded-[14px] bg-white flex items-center justify-center hover:bg-gray-100 active:scale-95">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={handleMobileNext} className="w-10 h-10 border-2 border-[#D9D9D9] rounded-[14px] bg-white flex items-center justify-center hover:bg-gray-100 active:scale-95">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
              {classOptions.map((_, index) => {
                const isActive = activeClass === classOptions[index];
                const dotClasses = "w-3 h-3 rounded-full transition-colors duration-300 " + (isActive ? "bg-blue-600" : "bg-blue-200");
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveClass(classOptions[index]);
                      setCurrentSlide(0);
                      setMobileCardIndex(0);
                    }}
                    className={dotClasses}
                    aria-label={`Go to ${classOptions[index]}`}
                  />
                );
              })}
            </div>
          </div>
        </RevealOnView>
      </div>
    </div>
  );
};

export default ClassSelection;


