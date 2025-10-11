"use client";

import React from "react";
import Image from "next/image";

import RevealOnView from "../Reveal/RevealOnView";

interface CourseProps {
  gradeNumber: number;
}

const Course = ({ gradeNumber }: CourseProps) => {
  const classTitle = `Class ${gradeNumber}`;
  
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-8 sm:py-12 md:py-16">
          {/* Hero Section - Cleaner Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
            
            {/* Left Content */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:pr-8 flex flex-col items-center lg:items-start">
              {/* Class Badge */}
              <RevealOnView from="top" durationMs={800} delayMs={0}>
                <div className="flex flex-row items-center gap-2 sm:gap-3">
                  <div className="relative w-[160px] sm:w-[180px] md:w-[202px] h-[28px] sm:h-[32px] md:h-[36px]">
                    <Image 
                      src="/grades/coursebaner.svg" 
                      alt="Booster Course" 
                      width={202} 
                      height={36}
                      className="w-full h-full"
                      priority
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-white text-xs sm:text-sm font-semibold">
                      Booster Course
                    </span>
                  </div>
                  <div className="font-montserrat font-semibold text-[#1BA8EF] text-xl sm:text-2xl whitespace-nowrap">
                    {classTitle}
                  </div>
                </div>
              </RevealOnView>

              {/* Main Headline */}
              <RevealOnView from="left" durationMs={1000} delayMs={200}>
                <h1 className="font-roboto font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[36px] leading-tight text-[#161A38] text-center lg:text-left">
                  Master Core Concepts With <br className="hidden sm:block" /> Star Teachers in 2 Days
                </h1>
              </RevealOnView>

              {/* Subjects */}
              <RevealOnView from="left" durationMs={1000} delayMs={400}>
                <div className="space-y-2 sm:space-y-3 text-center lg:text-left w-full">
                  <h3 className="font-roboto font-medium text-base sm:text-lg text-[#556A8E]">Subjects Covered:</h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
                    {subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="px-3 sm:px-4 py-1 rounded bg-white text-[#556A8E] font-montserrat font-medium text-sm"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealOnView>

              {/* Rating Card */}
              <RevealOnView from="bottom" durationMs={1000} delayMs={600}>
                <div className="p-3 sm:p-4 bg-white w-full max-w-[340px] sm:max-w-[400px] md:max-w-[447px] shadow-md rounded-[16px] sm:rounded-[20px]">
                  <div className="text-center mb-2">
                    <span className="font-[Roboto_Serif] font-semibold text-xl sm:text-2xl text-[#626AB5]">
                      4.5/5
                    </span>
                  </div>
                  <div className="flex justify-center items-center gap-1 mb-3">
                    {[...Array(4)].map((_, i) => (
                      <Image key={i} src="/fullstar.svg" alt="Star" width={18} height={18} className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
                    ))}
                    <Image src="/halfstar.svg" alt="Half Star" width={18} height={18} className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
                  </div>
                  <div className="flex justify-center items-center gap-2 sm:gap-4">
                    <Image src="/trust.svg" alt="Trustpilot" width={90} height={22} className="w-[80px] h-[20px] sm:w-[90px] sm:h-[22px] md:w-[110px] md:h-[27px]" />
                    <Image src="/google play.svg" alt="Google Play" width={90} height={22} className="w-[80px] h-[20px] sm:w-[90px] sm:h-[22px] md:w-[110px] md:h-[27px]" />
                    <Image src="/google.svg" alt="Google My Business" width={90} height={22} className="w-[80px] h-[20px] sm:w-[90px] sm:h-[22px] md:w-[110px] md:h-[27px]" />
                  </div>
                </div>
              </RevealOnView>

              {/* CTA Button */}
              <RevealOnView from="bottom" durationMs={1000} delayMs={800}>
                <button className="w-full sm:w-full md:w-full lg:max-w-[447px] h-[46px] sm:h-[50px] md:h-[53px] rounded-xl bg-[#0595CE] text-white font-montserrat font-semibold text-base sm:text-lg md:text-xl lg:text-[23px] px-4">
                  Register for demo at just ₹29
                </button>
              </RevealOnView>
            </div>

            {/* Right Content - Video */}
            <div className="relative mt-8 lg:mt-0 ">
              {/* Guarantee Badge - Right Above Video */}
              <RevealOnView from="top" durationMs={800} delayMs={300}>
                <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[371px] h-[40px] sm:h-[32px] md:h-[28px] rounded-md bg-[#28A745] text-white flex items-center justify-center mb-6 sm:mb-8 shadow-lg mx-auto lg:ml-8 xl:ml-16">
                  <span className="text-xs sm:text-sm font-medium px-2">
                    The Guaranteed Path to Higher Scores
                  </span>
                </div>
              </RevealOnView>

              {/* YouTube Video */}
              <RevealOnView from="right" durationMs={1200} delayMs={500}>
                <div className="relative w-full max-w-[350px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[606px] h-[240px] sm:h-[300px] md:h-[360px] lg:h-[400px] rounded-[20px] overflow-hidden shadow-xl mx-auto lg:mx-0">
                  <iframe
                    className="w-full h-full rounded-[20px]"
                    src="https://www.youtube.com/embed/sRCYjcVijew?autoplay=1&mute=1&loop=1&playlist=sRCYjcVijew&controls=1&modestbranding=1&rel=0"
                    title="Course Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </RevealOnView>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Course;