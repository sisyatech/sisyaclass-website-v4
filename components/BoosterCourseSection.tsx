"use client";

import React from "react";
import BoosterCourseCard from "./BoosterCourseCard";
import RevealOnView from "./Reveal/RevealOnView";

const BoosterCourseSection = () => {
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

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
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
  );
};

export default BoosterCourseSection;
