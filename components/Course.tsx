"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import QuickLinks from "./QuickLinks";
import NewSection from "./NewSection";

interface CourseProps {
  gradeNumber: number;
}

const Course = ({ gradeNumber }: CourseProps) => {
  const classTitle = `Class ${gradeNumber}`;
  
  // Fixed subjects to match the image
  const subjects = ["Maths", "Physics", "Chemistry", "English"];

  return (
    <div className="min-screen mb-10 pt-2 sm:pt-4 md:pt-6 lg:pt-8 relative">
        
      {/* Background Container */}
      <div 
        className="absolute w-full"
        style={{
          top: '40px',
          height: '587px',
          opacity: 1,
          background: '#F0F7FA'
        }}
      ></div>
      
      <div className="flex items-center px-4 sm:px-8 md:px-12 lg:px-16 justify-center relative z-10">
        <div className="py-8 sm:py-10 md:py-12">
          {/* Hero Section - Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-7 md:space-y-8 -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-5">
              {/* Class Badge */}
              <div className="flex flex-row  items-center space-x-2 sm:space-x-3">
                <div 
                  className="relative w-[150px] sm:w-[180px] md:w-[201.76px] h-[27px] sm:h-[32px] md:h-[36px]"
                >
                  <Image 
                    src="/grades/coursebaner.svg" 
                    alt="Booster Course" 
                    width={202} 
                    height={36}
                    className="w-full h-full"
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-white text-xs sm:text-sm font-semibold">
                    Booster Course
                  </span>
                </div>
                <div 
                  className="px-3 sm:px-4 py-1 sm:py-2 rounded-full font-montserrat font-semibold text-[#1BA8EF] text-lg sm:text-xl md:text-2xl leading-none tracking-normal flex items-center"
                >
                  {classTitle}
                </div>
              </div>

              {/* Main Headline */}
              <h1 
                className="leading-tight font-roboto font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[36px] sm:leading-[40px] md:leading-[44px] lg:leading-[48px] tracking-[3%] bg-[#161A38] bg-clip-text text-transparent"
              >
                Master Core Concepts With <br /> Star Teachers in 2 Days
              </h1>

              {/* Subjects */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="font-roboto font-medium text-base sm:text-lg leading-[31px] tracking-[3%] text-[#556A8E]">Subjects Covered:</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="w-[80px] sm:w-[90px] md:w-[103.26px] h-[20px] sm:h-[22px] md:h-[24.71px] opacity-100 rounded-[4.63px] bg-white text-[#556A8E] flex items-center justify-center font-montserrat font-medium text-[10px] sm:text-[12px] md:text-[13.9px] leading-[169%] tracking-normal text-center"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rating Card */}
              <div className="relative p-3 sm:p-4 bg-white w-full max-w-[320px] sm:max-w-[380px] md:max-w-[460px] min-h-[100px] sm:min-h-[118px] shadow-[0_0_4px_0_rgba(0,0,0,0.25)] rounded-[16px] sm:rounded-[20px] lg:rounded-[22px]">
                {/* 4.5/5 Rating */}
                <div className="text-center mb-2">
                  <span className="inline-block font-[Roboto_Serif] font-semibold text-[16px] sm:text-[18px] md:text-[22px] lg:text-[25.26px] leading-[28px] sm:leading-[34px] lg:leading-[54.85px] tracking-[0.03em] text-[#626AB5]">
                    4.5/5
                  </span>
                </div>

                {/* Stars */}
                <div className="flex justify-center items-center space-x-1 mb-3">
                  {[...Array(4)].map((_, i) => (
                    <Image key={i} src="/fullstar.svg" alt="Star" width={20} height={20} className="h-4 w-4 sm:h-5 sm:w-5" />
                  ))}
                  <Image src="/halfstar.svg" alt="Half Star" width={20} height={20} className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>

                {/* Trust Badges */}
                <div className="flex justify-center items-center space-x-2 sm:space-x-4">
                  <Image src="/trust.svg" alt="Trustpilot" width={110} height={27} className="w-[60px] h-[15px] sm:w-[88px] sm:h-[22px] md:w-[100px] md:h-[24px] lg:w-[110.26px] lg:h-[27.09px]" />
                  <Image src="/google play.svg" alt="Google Play" width={110} height={27} className="w-[60px] h-[15px] sm:w-[88px] sm:h-[22px] md:w-[100px] md:h-[24px] lg:w-[110.26px] lg:h-[27.09px]" />
                  <Image src="/google.svg" alt="Google My Business" width={110} height={27} className="w-[60px] h-[15px] sm:w-[88px] sm:h-[22px] md:w-[100px] md:h-[24px] lg:w-[110.26px] lg:h-[27.09px]" />
                </div>
              </div>

              {/* CTA Button */}
              <div className="w-full max-w-[300px] sm:max-w-[380px] md:max-w-[447px] h-[40px] sm:h-[46px] md:h-[53px] opacity-100 rounded-xl bg-[#0595CE] text-white flex items-center justify-center">
                <span className="font-montserrat font-semibold text-lg sm:text-xl md:text-[23px] leading-none tracking-normal text-center px-2">
                  Register for demo at just ₹29
                </span>
              </div>
            </div>

            {/* Right Content */}
            <div className="relative mt-8 sm:mt-12 md:mt-16 lg:mt-45">
              {/* Guarantee Badge */}
              <div className="absolute -top-9 sm:-top-4 md:-top-10 left-1 sm:left-12 md:left-24 w-[280px] sm:w-[320px] md:w-[371px] h-[24px] sm:h-[26px] md:h-[28px] opacity-100 rounded-md bg-[#28A745] text-white flex items-center justify-center z-10">
                <span className="text-xs sm:text-sm font-medium px-2">
                  The Guaranteed Path to Higher Scores
                </span>
              </div>

              {/* Study Materials - Course Picture */}
              <div 
                className="relative w-full max-w-[400px] sm:max-w-[500px] md:max-w-[606px] h-[200px] sm:h-[250px] md:h-[340.875px] opacity-100 rounded-[20px] bg-[#00000052] mx-auto"
              >
                <Image 
                  src="/grades/coursepic.svg" 
                  alt="Course Video" 
                  width={606} 
                  height={341}
                  className="w-full h-full rounded-[20px] object-cover"
                  unoptimized={true}
                />

                {/* Play Button */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-blue-600 hover:bg-blue-700 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center cursor-pointer transition-colors shadow-lg">
                    <div className="w-0 h-0 border-l-[4px] sm:border-l-[5px] md:border-l-[6px] border-l-white border-y-[3px] sm:border-y-[3.5px] md:border-y-[4px] border-y-transparent ml-0.5 sm:ml-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuickLinks />
      <NewSection />
    </div>
  );
};

export default Course;
