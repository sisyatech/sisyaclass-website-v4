"use client";

import React from "react";
import RevealOnView from "../Reveal/RevealOnView";

const MissionSection = () => {
  return (
    <RevealOnView from="left" durationMs={2000} delayMs={0}>
      <div className="w-full min-h-[180px] sm:min-h-[200px] md:min-h-[225px] bg-[#EDEEFE] flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
      {/* Our Mission Heading */}
      <div className="w-auto sm:w-[150px] md:w-[170px] lg:w-[193px] h-auto flex items-center justify-center mb-4 sm:mb-6">
        <h2 className="font-rubik font-medium text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[30px] leading-[1.2] sm:leading-[1.3] md:leading-[1.4] lg:leading-[1.5] tracking-[0%] text-center capitalize text-black">
          Our Mission
        </h2>
      </div>

      {/* Mission Description */}
      <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[436px] xl:max-w-[500px] h-auto flex items-center justify-center">
        <p className="font-rubik font-normal text-[11px] sm:text-[12px] md:text-[14px] lg:text-[15px] xl:text-[16px] leading-[1.4] sm:leading-[1.5] md:leading-[1.6] lg:leading-[1.7] tracking-[0%] text-center text-black">
          We are committed to empowering one million students by 2027 through affordable STEM education that closes learning gaps and strengthens problem-solving skills.
        </p>
      </div>
    </div>
    </RevealOnView>
  );
};

export default MissionSection;
