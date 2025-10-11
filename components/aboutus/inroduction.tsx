"use client";

import React from "react";
import Image from "next/image";
import RevealOnView from "../Reveal/RevealOnView";

const NewSection = () => {
  return (
    <div className="w-full min-h-[400px] sm:min-h-[500px] md:min-h-[550px] lg:min-h-[594px] bg-[#D8EEE4] relative flex items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
      {/* Inner Container */}
      <div className="w-full max-w-[1000px] sm:max-w-[1100px] md:max-w-[1215px] min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[472px] bg-white rounded-[27px] opacity-100 relative flex flex-col lg:flex-row items-center justify-center p-4 sm:p-6 md:p-8 gap-6 sm:gap-8">
        {/* Left Side - Image with animation from left */}
        <RevealOnView from="left" durationMs={1200} delayMs={0}>
          <div className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[362px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[358px] rounded-lg overflow-hidden flex-shrink-0">
          <Image 
            src="/about/ramkisir.svg" 
            alt="Mr. Ramakrishna Pillamudi" 
            width={362}
            height={358}
            className="w-full h-full object-cover"
            unoptimized={true}
          />
        </div>
        </RevealOnView>

        {/* Right Side - Content with animation from right */}
        <RevealOnView from="right" durationMs={1200} delayMs={200}>
          <div className="flex-1 w-full lg:w-auto lg:ml-5 sm:lg:ml-6 md:lg:ml-8 lg:mr-16 xl:mr-20 flex flex-col justify-center ml-1.5 sm:ml-2 md:ml-0 md:lg:ml-8">
          {/* Description */}
          <div className="w-full max-w-[500px] sm:max-w-[550px] md:max-w-[584px] h-auto relative">
            {/* Opening Quote */}
            <div className="absolute -top-2 -left-4 sm:-left-7">
              <Image 
                src="/about/openingquote.svg" 
                alt="Opening Quote" 
                width={25}
                height={21}
                className="w-[15px] h-[13px] sm:w-[18px] sm:h-[15px] md:w-[20px] md:h-[17px] lg:w-[25px] lg:h-[21px]"
                unoptimized={true}
              />
            </div>
            
            {/* Closing Quote */}
            <div className="absolute -bottom-2 -right-1">
              <Image 
                src="/about/closingquote.svg" 
                alt="Closing Quote" 
                width={25}
                height={21}
                className="w-[15px] h-[13px] sm:w-[18px] sm:h-[15px] md:w-[20px] md:h-[17px] lg:w-[25px] lg:h-[21px]"
                unoptimized={true}
              />
            </div>
            
            <p className="font-roboto font-medium text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15.37px] leading-[15px] sm:leading-[16px] md:leading-[18px] lg:leading-[19.21px] tracking-[0%] text-black">
              Mr. Ramakrishna Pillamudi is the Founder & CEO of SISYA CLASS, dedicated to making high-quality k-12 + STEM education accessible to students in cities across India. A graduate of Zhejiang University and recipient of the prestigious Asian Future Leaders Scholarship, he brings a global perspective and a deep belief in the transformative power of education.
            </p>
            <p className="font-roboto font-medium text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15.37px] leading-[15px] sm:leading-[16px] md:leading-[18px] lg:leading-[19.21px] tracking-[0%] text-black mt-3 sm:mt-4">
              With nearly a decade of EdTech experience at leading firms like NetEase, Youdao, Alibaba and Yuanfudao, his work on apps such as U-Dictionary Creta Class and Oda Class has impacted millions of learners worldwide.
            </p>
            <p className="font-roboto font-medium text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15.37px] leading-[15px] sm:leading-[16px] md:leading-[18px] lg:leading-[19.21px] tracking-[0%] text-black mt-3 sm:mt-4">
              Driven by this journey, he launched SISYA CLASS to deliver AI-powered learning in coding, robotics, math, science, and Motivational Classes —empowering students with real-world skills.
            </p>
          </div>
        </div>
        </RevealOnView>
      </div>
    </div>
  );
};

export default NewSection;
