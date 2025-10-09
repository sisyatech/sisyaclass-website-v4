"use client";

import React from "react";
import Image from "next/image";

const NewSection = () => {
  return (
    <div className="w-[1442px] h-[809px] -mt-9 left-[-1px] opacity-100 bg-[#DDDEFE80] flex flex-col items-center justify-center">
      {/* Course Details Title - Just Above Container */}
      <h1 className="text-3xl font-bold text-gray-800 mb-1 mr-250">Course Details</h1>
      
      {/* Inner Container */}
      <div className="w-[1136px] h-[551px] mt-4 mr-33 opacity-100 rounded-[22px] bg-white shadow-[2px_2px_10px_0px_rgba(0,0,0,0.25)] p-8 relative">
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          {/* Vertical Divider Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#E8E8E8] transform -translate-x-1/2"></div>
          
          {/* Left Column - Features and Batch Details */}
          <div className="space-y-6">
            {/* Batch Start Date */}
            <div 
              className="inline-block px-4 py-2 rounded-[10.17px]"
              style={{
                width: '379px',
                height: '44.93735885620117px',
                top: '1102px',
                left: '128px',
                opacity: 1,
                borderRadius: '10.17px',
                borderWidth: '1.7px',
                borderStyle: 'dashed',
                background: '#EAF4F9',
                border: '1.7px dashed #0595CE'
              }}
            >
              <span className="text-[#0595CE] font-medium">Batch Start date: 20 Sept 2025</span>
            </div>
            
            {/* Features Section */}
            <div>
              <h2 className="text-2xl font-bold text-[#575CFB] mb-4">Features</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 p-2 rounded  border-[#E8E8E8]">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-4 h-4"
                  />
                  <span className="text-black">In Class doubt-Solving</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded  border-[#E8E8E8]">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-4 h-4"
                  />
                  <span className="text-black">1-1 Mentorship</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded bg-[#EDEEFE80]  border-[#E8E8E8]">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-4 h-4"
                  />
                  <span className="text-black text-sm">Live Classes by IIT/NIT Educators</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded bg-[#EDEEFE80] ">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-4 h-4"
                  />
                  <span className="text-black">Motivational Classes</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded  ">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-4 h-4"
                  />
                  <span className="text-black">Class Materials</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded  ">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-4 h-4"
                  />
                  <span className="text-black">Study Materials</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded bg-[#EDEEFE80] ">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-4 h-4"
                  />
                  <span className="text-black">Assignments</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded  bg-[#EDEEFE80]">
                  <Image 
                    src="/grades/verify.svg" 
                    alt="Check" 
                    width={22} 
                    height={22}
                    className="w-4 h-4"
                  />
                  <span className="text-black">Access to SISYA AI</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Payment Information */}
          <div className="space-y-6">
            {/* Choose Payment Method */}
            <div>
              <h3 className="mb-3 font-montserrat font-medium text-[13.41px] leading-none tracking-[0.01em] text-[#ABABAB]">
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
              <h3 className="mb-3 font-montserrat font-medium text-[13.41px] leading-none tracking-[0.01em] text-[#ABABAB]">
                Payment details
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-montserrat font-normal text-[16.1px] leading-none tracking-[0.01em] text-[#1F1F39]">
                    Course price (excluding GST)
                  </span>
                  <span className="font-montserrat font-semibold text-[16.1px] leading-none tracking-[0.01em] text-right text-[#1F1F39]">
                    ₹ 24.58
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-montserrat font-semibold text-[16.1px] leading-none tracking-[0.01em] text-[#1F1F39]">
                    Coupon applied
                  </span>
                  <span className="font-montserrat font-semibold text-[16.1px] leading-none tracking-[0.01em] text-right text-[#1F1F39]">
                    - ₹0
                  </span>
                </div>
                {/* Divider line between Coupon applied and Final amount */}
                <div className="border-t border-gray-300 my-4"></div>
                <div className="flex justify-between">
                  <span className="font-montserrat font-semibold text-[16.1px] leading-none tracking-[0.01em] text-[#1F1F39]">
                    Final amount
                  </span>
                  <span className="font-montserrat font-semibold text-[16.1px] leading-none tracking-[0.01em] text-right text-[#1F1F39]">
                    ₹ 29
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-montserrat font-normal text-[16.1px] leading-none tracking-[0.01em] text-[#1F1F39]">
                    GST (18%)
                  </span>
                  <span className="font-montserrat font-semibold text-[16.1px] leading-none tracking-[0.01em] text-right text-[#1F1F39]">
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
            <button className="w-[233px] h-[59px] ml-40 rounded-[30px] bg-[#0595CE] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] font-roboto font-medium text-base leading-none tracking-normal text-center text-white">
              Make Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSection;
