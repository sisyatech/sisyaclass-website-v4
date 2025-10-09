"use client";

import React from "react";
import Image from "next/image";

const QuickLinks = () => {
  return (
    <div className="relative z-10 w-full  max-w-[1238px] h-auto min-h-[120px] sm:min-h-[140px] md:h-[158px] opacity-100 rounded-[27px] bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] mx-auto mt-8 flex flex-col sm:flex-row items-center justify-center px-4 sm:px-6 md:px-8 py-6 sm:py-4 md:py-0">
      {/* Quick Links Title and Arrow */}
      <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-0 sm:mr-6 md:mr-8">
        <h2 className="font-montserrat font-semibold text-lg sm:text-xl md:text-2xl lg:text-[28px] leading-none tracking-normal bg-[#1A2439] bg-clip-text text-transparent">
          Quick Links
        </h2>
        <Image 
          src="/grades/arrow.svg" 
          alt="Arrow" 
          width={63} 
          height={63}
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
        />
      </div>

      {/* Quick Links Cards */}
      <div className="flex flex-wrap sm:flex-nowrap justify-center gap-2 sm:gap-2 md:gap-3 lg:gap-6">
        {/* Teachers Card */}
        <div className="cursor-pointer hover:scale-105 transition-transform">
          <div className="w-[70px] h-[53px] sm:w-[80px] sm:h-[60px] md:w-[85px] md:h-[64px] lg:w-[121px] lg:h-[93px] bg-white border-2 border-[#41AC7D] border-opacity-30 rounded-xl flex items-center justify-center">
            <Image 
              src="/grades/card.svg"
              alt="Teachers" 
              width={121} 
              height={93}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Schedule Card */}
        <div className="cursor-pointer hover:scale-105 transition-transform">
          <div className="w-[70px] h-[53px] sm:w-[80px] sm:h-[60px] md:w-[85px] md:h-[64px] lg:w-[121px] lg:h-[93px] bg-white border-2 border-[#41AC7D] border-opacity-30 rounded-xl flex items-center justify-center">
            <Image 
              src="/grades/card-1.svg"
              alt="Schedule" 
              width={121} 
              height={93}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Results Card */}
        <div className="cursor-pointer hover:scale-105 transition-transform">
          <div className="w-[70px] h-[53px] sm:w-[80px] sm:h-[60px] md:w-[85px] md:h-[64px] lg:w-[121px] lg:h-[93px] bg-white border-2 border-[#41AC7D] border-opacity-30 rounded-xl flex items-center justify-center">
            <Image 
              src="/grades/card-2.svg"
              alt="Results" 
              width={121} 
              height={93}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Testimonials Card */}
        <div className="cursor-pointer hover:scale-105 transition-transform">
          <div className="w-[70px] h-[53px] sm:w-[80px] sm:h-[60px] md:w-[85px] md:h-[64px] lg:w-[121px] lg:h-[93px] bg-white border-2 border-[#41AC7D] border-opacity-30 rounded-xl flex items-center justify-center">
            <Image 
              src="/grades/card-5.svg"
              alt="Testimonials" 
              width={121} 
              height={93}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* FAQs Card */}
        <div className="cursor-pointer hover:scale-105 transition-transform">
          <div className="w-[70px] h-[53px] sm:w-[80px] sm:h-[60px] md:w-[85px] md:h-[64px] lg:w-[121px] lg:h-[93px] bg-white border-2 border-[#41AC7D] border-opacity-30 rounded-xl flex items-center justify-center">
            <Image 
              src="/grades/card-4.svg"
              alt="FAQs" 
              width={121} 
              height={93}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Demo Card */}
        <div className="cursor-pointer hover:scale-105 transition-transform">
          <div className="w-[70px] h-[53px] sm:w-[80px] sm:h-[60px] md:w-[85px] md:h-[64px] lg:w-[121px] lg:h-[93px] bg-white border-2 border-[#41AC7D] border-opacity-30 rounded-xl flex items-center justify-center">
            <Image 
              src="/grades/card-3.svg"
              alt="Demo" 
              width={121} 
              height={93}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickLinks;
