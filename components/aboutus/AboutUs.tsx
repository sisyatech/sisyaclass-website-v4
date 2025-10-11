"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
  import { TypingAnimation } from "../ui/typing-animation";

const AboutUs = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Get initial value
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate transform values for whole component
  const scale = Math.max(0.90, 1 - scrollY / 3000); // Compress from 1 to 0.90 (very subtle)
  const translateY = -scrollY / 10; // Move up as you scroll (minimal movement)
  const borderRadius = Math.min(20, scrollY / 20); // Radius increases as you scroll (0 to 20px)
  return (
    <>
      {/* Hero Section - Entire component animates */}
      <div 
        className="relative w-full min-h-screen overflow-hidden"
        style={{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease-out, border-radius 0.1s ease-out',
          willChange: 'transform, border-radius',
          borderRadius: `${borderRadius}px`,
        }}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url('/about/grouppic.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-70"></div>
        
        {/* Overlay Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-12">
          {/* Badge */}
          <div className="w-[180px] sm:w-[200px] md:w-[217px] h-[32px] sm:h-[35px] md:h-[39px] bg-white rounded-[25.5px] flex items-center justify-center mb-6 sm:mb-8">
            <span className="w-[150px] sm:w-[170px] md:w-[185px] h-[18px] sm:h-[19px] md:h-[21px] font-rubik font-medium text-[14px] sm:text-[16px] md:text-[18px] leading-[14px] sm:leading-[16px] md:leading-[18px] tracking-[1%] text-center text-black">
            About SISYA CLASS
            </span>
          </div>

          {/* Main Headlines with Typing Animation */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-32 h-[140px] sm:h-[160px] md:h-[180px] lg:h-[240px] xl:h-[260px] flex flex-col justify-center">
            <div className="h-[45px] sm:h-[50px] md:h-[58px] lg:h-[78px] xl:h-[85px] flex items-center justify-center">
              <TypingAnimation 
                as="h1"
                duration={50}
                delay={0}
                showCursor={false}
                startOnView={false}
                className="font-rubik font-medium text-[24px] sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[43.71px] leading-[20px] sm:leading-[24px] md:leading-[28px] lg:leading-[40px] xl:leading-[43.71px] tracking-[1%] text-center text-white"
              >
                Affordable Education
              </TypingAnimation>
            </div>
            <div className="h-[45px] sm:h-[50px] md:h-[58px] lg:h-[78px] xl:h-[85px] flex items-center justify-center">
              <TypingAnimation 
                as="h1"
                duration={50}
                delay={700}
                showCursor={false}
                startOnView={false}
                className="font-rubik font-medium text-[24px] sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[43.71px] leading-[20px] sm:leading-[24px] md:leading-[28px] lg:leading-[40px] xl:leading-[43.71px] tracking-[1%] text-center text-white"
              >
                Accessible Anywhere
              </TypingAnimation>
            </div>
            <div className="h-[45px] sm:h-[50px] md:h-[58px] lg:h-[78px] xl:h-[85px] flex items-center justify-center">
              <TypingAnimation 
                as="h1"
                duration={50}
                delay={1400}
                showCursor={false}
                startOnView={false}
                className="font-rubik font-medium text-[24px] sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[43.71px] leading-[20px] sm:leading-[24px] md:leading-[28px] lg:leading-[40px] xl:leading-[43.71px] tracking-[1%] text-center text-white"
              >
                Available 24/7
              </TypingAnimation>
            </div>
          </div>

          {/* Description Text */}
          <div className="w-full mt-25 max-w-[280px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1054px] flex items-center justify-center px-4 sm:px-6 md:px-8 mb-4 sm:mb-6">
            <p className="font-rubik font-normal text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[18px] sm:leading-[20px] md:leading-[22px] lg:leading-[24px] xl:leading-[26px] tracking-[0%] text-center text-white">
              SISYA CLASS is more than just a learning app. It is a trusted companion for young minds from Class 1 to 10. We combine expert IIT/NIT teachers, live online classes, and intelligent AI tools to create a learning experience that feels natural, exciting, and personal. Our goal is to help every student discover the joy of learning, from core subjects like math and science to future-ready skills such as coding and robotics. Recognized by Google Startups, SISYA CLASS is committed to making high-quality education affordable and available all over India. Our AI-powered chatbot is available 24/7 to answer questions and support students at their own pace, ensuring no one is left behind.
            </p>
          </div>

          {/* Button */}
          <div className="w-[40px] mt-0 h-[40px] sm:w-[45px] sm:h-[45px] md:w-[51px] md:h-[51px] opacity-100 rounded-[9px]">
            <Image 
              src="/about/button.gif" 
              alt="Download The App" 
              width={51}
              height={51}
              className="w-full h-full cursor-pointer hover:opacity-90 transition-opacity rounded-[9px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;

