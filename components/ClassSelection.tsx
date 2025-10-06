"use client";

import React, { useEffect, useState } from "react";
import RevealOnView from "./Reveal/RevealOnView";
import Image from "next/image";
const ClassSelection = () => {
  const [activeClass, setActiveClass] = useState("Class 1-3");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsEntered, setCardsEntered] = useState(false);

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

  return (
    <div className="pt-0 pb-10 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        {/* Headline */}
        <RevealOnView from="left" durationMs={1500}>
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="mb-6 sm:mb-8 font-montserrat font-bold text-[28px] leading-[34px] sm:text-[40px] sm:leading-[42px] lg:text-[50px] lg:leading-[45px] capitalize text-[#1A2439]">
              <span className="block mb-2 font-montserrat font-normal text-[18px] leading-[28px] sm:text-[22px] sm:leading-[34px] lg:text-[25px] lg:leading-[45px] text-[#1A2439]">
                Explore What You Can Learn
              </span>
              with SISYA, From Class 1 to 10
            </h2>

            {/* Class Selection Buttons */}
            <RevealOnView from="right" durationMs={1500}>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
                {classOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setActiveClass(option)}
                    className={`font-montserrat font-semibold text-[14px] sm:text-[15px] transition-all duration-300 w-[132px] h-[42px] sm:w-[139px] sm:h-[46px] rounded-[15px] px-[18px] sm:px-[23.66px] py-[10px] sm:py-[12.52px] shadow-[0px_5.57px_5.57px_0px_rgba(0,0,0,0.25)] ${
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

            {/* Cards */}
            <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 sm:gap-6 px-2 sm:px-6 md:px-8">
              {currentSlideClasses.map((card, index) => (
                <div
                  key={index}
                  className={`shadow-lg hover:shadow-xl transition-all duration-[1500ms] ease-out relative w-[210px] h-[338px] sm:w-[230px] md:w-[250px] rounded-[20px] ${
                    cardsEntered ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  style={{
                    transitionDelay: cardsEntered ? `${index * 120}ms` : "0ms",
                    backgroundColor: card.containerColor,
                  }}
                >
                  {/* Teacher Image */}
                  <div className="relative -top-[28px] sm:-top-[32px] md:-top-[35px] left-[6px] sm:left-[7px]">
                    <Image src="/teacher.svg" alt="Teacher" width={247} height={246} className="object-cover w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] md:w-[246.56px] md:h-[246.04px]" />
                  </div>

                  {/* Class Number */}
                  <div className="absolute top-[42px] sm:top-[46px] md:top-[48px] right-3 md:left-[172px]">
                    <h3 className="w-[74px] h-[22px] font-montserrat font-bold text-[16px] sm:text-[17px] md:text-[18px] leading-none text-center text-[#1A2439]">
                      {card.class}
                    </h3>
                  </div>

                  {/* Bottom Half - Course Features */}
                  <div className="absolute w-[192px] h-[172px] sm:w-[212px] md:w-[232px] top-[150px] sm:top-[156px] md:top-[160px] left-[9px] rounded-[14px] bg-[#1A2439]">
                    <div className="p-4 h-full flex flex-col">
                      <div className="grid grid-cols-2 gap-2 mb-2 flex-1">
                        {courseFeatures.map((feature, featureIndex) => (
                          <button
                            key={featureIndex}
                            className={`transition-colors duration-300 font-montserrat font-semibold text-[7px] sm:text-[8px] leading-none tracking-[0.02em] rounded-[9.5px] bg-white ${
                              feature === "Olympiad Preparation" ? "col-span-2" : ""
                            }`}
                            style={{
                              width: feature === "Olympiad Preparation" ? "auto" : "86px",
                              height: "22.73px",
                              color: card.textColor,
                            }}
                          >
                            {feature}
                          </button>
                        ))}
                      </div>

                      {/* Book Demo Button */}
                      <div className="flex justify-center">
                        <button className="transition-colors duration-300 w-[112px] sm:w-[124px] h-[22px] rounded-[8px] bg-[#FED700] text-[#1A2439] font-montserrat font-semibold text-[8px] leading-none tracking-[0.02em]">
                          Book a Demo at ₹19
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
              {classOptions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveClass(classOptions[index]);
                    setCurrentSlide(0);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    activeClass === classOptions[index] ? "bg-blue-600" : "bg-blue-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </RevealOnView>
      </div>
    </div>
  );
};

export default ClassSelection;


