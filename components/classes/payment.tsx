"use client";

import React from "react";
import Image from "next/image";
import RevealOnView from "../Reveal/RevealOnView";

const NewSection = () => {
  return (
    <RevealOnView from="bottom" durationMs={1000} delayMs={200}>
      <div className="w-full max-w-[1442px] h-auto min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[809px] -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-19 opacity-100 bg-[#DDDEFE80] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      {/* Course Details Title - Outside container on mobile/tablet, inside on desktop */}
      <h1 className="block lg:hidden text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 animate-in fade-in slide-in-from-top-4 duration-500 delay-1100">Course Details</h1>
      
      {/* Inner Container */}
      <div className="w-full max-w-[1136px] h-auto min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[551px] mt-8 sm:mt-12 md:mt-20 lg:mt-30 opacity-100 rounded-[22px] bg-white shadow-[2px_2px_10px_0px_rgba(0,0,0,0.25)] p-4 sm:p-6 md:p-8 relative animate-in fade-in zoom-in-95 duration-700 delay-1200">
        {/* Course Details Title - Inside container on desktop only */}
        <h1 className="hidden lg:block text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 -mt-16 sm:-mt-18 md:-mt-20 animate-in fade-in slide-in-from-left-4 duration-500 delay-1300">Course Details</h1>
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 relative mt-6 sm:mt-12 md:mt-18">
          {/* Vertical Divider Line - Hidden on mobile and tablet */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#E8E8E8] transform -translate-x-1/2"></div>
          
          {/* Left Column - Features and Batch Details */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 animate-in fade-in slide-in-from-left-6 duration-700 delay-1400">
            {/* Batch Start Date */}
            <div className="inline-block w-full max-w-[300px] sm:max-w-[350px] md:max-w-[379px] h-auto min-h-[40px] sm:min-h-[42px] md:min-h-[44.93735885620117px] px-3 sm:px-4 py-2 rounded-[10.17px] border-[1.7px] border-dashed border-[#0595CE] bg-[#EAF4F9] opacity-100">
              <span className="text-[#0595CE] font-medium text-sm sm:text-base">Batch Start date: 20 Sept 2025</span>
            </div>
            
            {/* Features Section */}
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#575CFB] mb-3 sm:mb-4">Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <div className="flex items-center space-x-2 p-2 rounded border-2 border-[#E8E8E8]">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-4 h-4"
                  />
                  <span className="text-black text-sm sm:text-base">In Class doubt-Solving</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded border-2 border-[#E8E8E8]">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-4 h-4"
                  />
                  <span className="text-black text-sm sm:text-base">1-1 Mentorship</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded bg-[#EDEEFE80] border-2 border-[#E8E8E8]">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-4 h-4"
                  />
                  <span className="text-black text-xs sm:text-sm">Live Classes by IIT/NIT Educators</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded bg-[#EDEEFE80] border-2 border-[#E8E8E8]">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-4 h-4"
                  />
                  <span className="text-black text-sm sm:text-base">Motivational Classes</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded border-2 border-[#E8E8E8]">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-4 h-4"
                  />
                  <span className="text-black text-sm sm:text-base">Class Materials</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded border-2 border-[#E8E8E8]">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-4 h-4"
                  />
                  <span className="text-black text-sm sm:text-base">Study Materials</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded bg-[#EDEEFE80] border-2 border-[#E8E8E8]">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-4 h-4"
                  />
                  <span className="text-black text-sm sm:text-base">Assignments</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded bg-[#EDEEFE80] border-2 border-[#E8E8E8]">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-4 h-4"
                  />
                  <span className="text-black text-sm sm:text-base">Access to SISYA AI</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Payment Information */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 animate-in fade-in slide-in-from-right-6 duration-700 delay-1400">
            {/* Choose Payment Method */}
            <div>
              <h3 className="mb-3 font-montserrat font-medium text-xs sm:text-[13.41px] leading-none tracking-[0.01em] text-[#ABABAB]">
                Choose payment method
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center border-[1.34px] border-[#ABABAB] bg-[#0595CE]">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Full payment</span>
                  <span className="px-2 py-1 bg-red-100 border border-red-300 text-red-600 text-xs rounded">Recommended</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center border-[1.34px] border-[#ABABAB]">
                  </div>
                  <span className="text-gray-700">Part payment</span>
                </div>
              </div>
            </div>
            
            {/* Payment Details */}
            <div>
              <h3 className="mb-3 font-montserrat font-medium text-xs sm:text-[13.41px] leading-none tracking-[0.01em] text-[#ABABAB]">
                Payment details
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-montserrat font-normal text-sm sm:text-[16.1px] leading-none tracking-[0.01em] text-[#1F1F39]">
                    Course price (excluding GST)
                  </span>
                  <span className="font-montserrat font-semibold text-sm sm:text-[16.1px] leading-none tracking-[0.01em] text-right text-[#1F1F39]">
                    ₹ 24.58
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-montserrat font-semibold text-sm sm:text-[16.1px] leading-none tracking-[0.01em] text-[#1F1F39]">
                    Coupon applied
                  </span>
                  <span className="font-montserrat font-semibold text-sm sm:text-[16.1px] leading-none tracking-[0.01em] text-right text-[#1F1F39]">
                    - ₹0
                  </span>
                </div>
                {/* Divider line between Coupon applied and Final amount */}
                <div className="border-t border-gray-300 my-4"></div>
                <div className="flex justify-between">
                  <span className="font-montserrat font-semibold text-sm sm:text-[16.1px] leading-none tracking-[0.01em] text-[#1F1F39]">
                    Final amount
                  </span>
                  <span className="font-montserrat font-semibold text-sm sm:text-[16.1px] leading-none tracking-[0.01em] text-right text-[#1F1F39]">
                    ₹ 29
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-montserrat font-normal text-sm sm:text-[16.1px] leading-none tracking-[0.01em] text-[#1F1F39]">
                    GST (18%)
                  </span>
                  <span className="font-montserrat font-semibold text-sm sm:text-[16.1px] leading-none tracking-[0.01em] text-right text-[#1F1F39]">
                    ₹4.42
                  </span>
                </div>
              </div>
            </div>
            
            {/* Total Amount */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-[#0595CE]">Total Amount</span>
                <span className="text-xl font-bold text-[#0595CE]">₹29</span>
              </div>
            </div>
            
            {/* Make Payment Button */}
            <button className="w-full max-w-[200px] sm:max-w-[220px] md:max-w-[233px] h-[45px] sm:h-[52px] md:h-[59px] mx-8 lg:ml-20 xl:ml-40 rounded-[30px] bg-[#0595CE] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] font-roboto font-medium text-sm sm:text-base leading-none tracking-normal text-center text-white">
              Make Payment
            </button>
          </div>
        </div>
      </div>
    </div>
    </RevealOnView>
  );
};

export default NewSection;
