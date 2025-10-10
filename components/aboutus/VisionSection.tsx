"use client";

import React from "react";
import Image from "next/image";
import RevealOnView from "../Reveal/RevealOnView";

const VisionSection = () => {
  return (
    <RevealOnView from="right" durationMs={2000} delayMs={0}>
      <div className="w-full min-h-[200px] sm:min-h-[240px] md:min-h-[284px] bg-[#1A2439] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 relative">
      {/* Left Images - Hidden on mobile and tablet, visible on lg+ */}
      <div className="hidden lg:block absolute left-[50px] top-[32px]">
        <div className="w-[130px] h-[130px] xl:w-[154px] xl:h-[154px] rounded-[19px] overflow-hidden">
          <Image 
            src="/about/left1.svg" 
            alt="Left Image 1" 
            width={154}
            height={154}
            className="w-full h-full object-cover"
            unoptimized={true}
          />
        </div>
      </div>

      <div className="hidden lg:block absolute left-[180px] top-[120px]">
        <div className="w-[130px] h-[130px] xl:w-[154px] xl:h-[154px] rounded-[19px] overflow-hidden">
          <Image 
            src="/about/left2.svg" 
            alt="Left Image 2" 
            width={154}
            height={154}
            className="w-full h-full object-cover"
            unoptimized={true}
          />
        </div>
      </div>

      {/* Right Images - Hidden on mobile and tablet, visible on lg+ */}
      <div className="hidden lg:block absolute right-8 xl:right-[20px] top-[32px]">
        <div className="w-[130px] h-[130px] xl:w-[154px] xl:h-[154px] rounded-[19px] overflow-hidden">
          <Image 
            src="/about/right1.svg" 
            alt="Right Image 1" 
            width={154}
            height={154}
            className="w-full h-full object-cover"
            unoptimized={true}
          />
        </div>
      </div>

      <div className="hidden lg:block absolute right-[143px] top-[120px]">
        <div className="w-[130px] h-[130px] xl:w-[154px] xl:h-[154px] rounded-[19px] overflow-hidden">
          <Image 
            src="/about/right2.svg" 
            alt="Right Image 2" 
            width={154}
            height={154}
            className="w-full h-full object-cover"
            unoptimized={true}
          />
        </div>
      </div>

      {/* Our Vision Heading */}
      <div className="w-auto sm:w-[150px] md:w-[170px] lg:w-[193px] h-auto flex items-center justify-center mb-4 sm:mb-6 z-10">
        <h2 className="font-rubik font-medium text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[30px] leading-[1.2] sm:leading-[1.3] md:leading-[1.4] lg:leading-[1.5] tracking-[0%] text-center capitalize text-white">
          Our Vision
        </h2>
      </div>

      {/* Vision Description */}
      <div className="w-full max-w-[280px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[550px] xl:max-w-[620px] h-auto flex items-center justify-center z-10 px-4">
        <p className="font-rubik font-normal text-[11px] sm:text-[12px] md:text-[14px] lg:text-[15px] xl:text-[16px] leading-[1.4] sm:leading-[1.5] md:leading-[1.6] lg:leading-[1.7] tracking-[0%] text-center text-white">
          By 2030, SISYA CLASS will touch the lives of five million students by partnering with over a thousand schools and government institutions, creating vibrant learning experiences where every child masters coding and robotics.
        </p>
      </div>
    </div>
    </RevealOnView>
  );
};

export default VisionSection;
