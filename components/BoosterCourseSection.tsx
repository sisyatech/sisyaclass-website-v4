"use client";

import React, { useState } from "react";
import BoosterCourseCard from "./BoosterCourseCard";
import RevealOnView from "./Reveal/RevealOnView";

const BoosterCourseSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsEntered, setCardsEntered] = useState(false);

  const courses = [
    {
      title: "Quick Learning Big Impact in 7 Days with IIT/NIT Experts",
      startDate: "25 June 2025",
      originalPrice: "₹ 499",
      currentPrice: "₹ 29"
    },
    {
      title: "Advanced Problem Solving in Mathematics",
      startDate: "30 June 2025", 
      originalPrice: "₹ 599",
      currentPrice: "₹ 39"
    },
    {
      title: "Science Mastery with Practical Experiments",
      startDate: "5 July 2025",
      originalPrice: "₹ 449", 
      currentPrice: "₹ 29"
    }
  ];

  const handlePrevSlide = () => {
    setCardsEntered(false);
    setCurrentSlide((prev) => (prev === 0 ? courses.length - 1 : prev - 1));
    setTimeout(() => setCardsEntered(true), 300);
  };

  const handleNextSlide = () => {
    setCardsEntered(false);
    setCurrentSlide((prev) => (prev === courses.length - 1 ? 0 : prev + 1));
    setTimeout(() => setCardsEntered(true), 300);
  };

  const handleDotClick = (index: number) => {
    setCardsEntered(false);
    setCurrentSlide(index);
    setTimeout(() => setCardsEntered(true), 300);
  };

  // Initialize cards animation
  React.useEffect(() => {
    setCardsEntered(true);
  }, []);

  return (
    <div className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <RevealOnView from="top" durationMs={800} delayMs={0}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A2439] mb-4">
              Booster Courses
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Accelerate your learning with our intensive booster courses designed by IIT/NIT experts
            </p>
          </div>
        </RevealOnView>

        {/* Mobile/Tablet: Single card with dots and arrows */}
        <div className="lg:hidden">
          <div className="flex justify-center px-4">
            <div 
              key={currentSlide}
              className={`transition-all duration-[600ms] ease-in-out ${
                cardsEntered ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              <BoosterCourseCard
                title={courses[currentSlide].title}
                startDate={courses[currentSlide].startDate}
                originalPrice={courses[currentSlide].originalPrice}
                currentPrice={courses[currentSlide].currentPrice}
              />
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {courses.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-[#0595CE] w-6" : "bg-gray-300"
                }`}
                aria-label={`Go to course ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center mt-4 space-x-6">
            <button 
              onClick={handlePrevSlide}
              className="w-10 h-10 border-2 border-[#D9D9D9] rounded-[14px] bg-white flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all duration-300 hover:shadow-md group"
              aria-label="Previous course"
            >
              <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-500 group-hover:-translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNextSlide}
              className="w-10 h-10 border-2 border-[#D9D9D9] rounded-[14px] bg-white flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all duration-300 hover:shadow-md group"
              aria-label="Next course"
            >
              <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-8 justify-items-center">
            {courses.map((course, index) => (
              <RevealOnView 
                key={index}
                from="bottom" 
                durationMs={800} 
                delayMs={index * 200}
              >
                <BoosterCourseCard
                  title={course.title}
                  startDate={course.startDate}
                  originalPrice={course.originalPrice}
                  currentPrice={course.currentPrice}
                />
              </RevealOnView>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoosterCourseSection;
