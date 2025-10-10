"use client";

import React from "react";
import Image from "next/image";
import RevealOnView from "../Reveal/RevealOnView";

const UniqueSection = () => {
  const features = [
    {
      id: 1,
      icon: "/about/books.svg",
      title: "All IIT Teachers:",
      description: "Our passionate IIT experts not only teach but inspire curiosity and confidence in every class."
    },
    {
      id: 2,
      icon: "/about/online-class.svg",
      title: "Live Online Classes:",
      description: "Join our live, interactive sessions where every student stays engaged and supported to succeed."
    },
    {
      id: 3,
      icon: "/about/ai.svg",
      title: "24x7 Doubt Solving:",
      description: "If you get stuck on a problem our AI-powered chatbot and mentors are ready to help anytime day or night."
    },
    {
      id: 4,
      icon: "/about/mentor.svg",
      title: "Mentor's Support:",
      description: "Personal mentors guide you every step of the way keeping you motivated and focused on your goals."
    }
  ];

  return (
    <div className="w-full min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[575px] bg-[#FAE9E8] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Title with animation from bottom */}
        <RevealOnView from="bottom" durationMs={1000} delayMs={0}>
          <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            <h2 className="font-rubik font-medium text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px] leading-[1.4] sm:leading-[1.5] md:leading-[1.6] lg:leading-[1.7] tracking-[0%] text-center capitalize text-black">
              What Makes SISYA Unique
            </h2>
          </div>
        </RevealOnView>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <RevealOnView 
              key={feature.id}
              from="bottom" 
              durationMs={800} 
              delayMs={index * 150}
            >
              <div className="relative pt-3 pl-3 pb-3 pr-3 sm:pt-4 sm:pl-4 sm:pb-4 sm:pr-4">
               {/* Orange Square - Top Left (Background) */}
               <div className="absolute top-0 left-0 w-[50px] h-[45px] sm:w-[60px] sm:h-[55px] md:w-[70px] md:h-[65px] lg:w-[80px] lg:h-[75px] xl:w-[91.76px] xl:h-[79.35px] rounded-[10px] bg-gradient-to-b from-[#F6A52F] to-[#E26F17]"></div>
               
               {/* Orange Square - Bottom Right (Background) */}
               <div className="absolute bottom-0 right-0 w-[50px] h-[45px] sm:w-[60px] sm:h-[55px] md:w-[70px] md:h-[65px] lg:w-[80px] lg:h-[75px] xl:w-[91.76px] xl:h-[79.35px] rounded-[10px] bg-gradient-to-b from-[#F6A52F] to-[#E26F17]"></div>

               {/* Blue Card (Foreground - overlays the orange squares) */}
               <div className="relative bg-[#01317A] rounded-[10.37px] p-2 sm:p-3 md:p-4 lg:p-6 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 md:gap-4 w-full min-h-[50px] sm:min-h-[55px] md:min-h-[60px] lg:min-h-[70px] xl:min-h-[80px] z-10">
                {/* Icon Circle */}
                <div className="flex-shrink-0 w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px] lg:w-[110px] lg:h-[110px] xl:w-[120px] xl:h-[120px] bg-white rounded-full flex items-center justify-center mb-3 sm:mb-0">
                  <Image 
                    src={feature.icon} 
                    alt={feature.title}
                    width={70}
                    height={70}
                    className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[65px] md:h-[65px] lg:w-[70px] lg:h-[70px]"
                  />
                </div>

                 {/* Text Content */}
                 <div className="flex-1 text-center sm:text-left">
                   <h3 className="font-montserrat font-semibold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[19.59px] leading-[1.4] sm:leading-[1.5] md:leading-[1.6] lg:leading-[1.7] tracking-[0%] text-white mb-2 sm:mb-3">
                     {feature.title}
                   </h3>
                   <p className="font-montserrat font-medium text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15.83px] leading-[1.4] sm:leading-[1.5] md:leading-[1.6] lg:leading-[1.7] tracking-[0%] text-white">
                     {feature.description}
                   </p>
                 </div>
              </div>
            </div>
            </RevealOnView>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniqueSection;