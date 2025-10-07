  "use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
const Hero = () => {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after mount
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <>
      {/* Animations via Tailwind arbitrary utilities */}

      <div className="min-screen bg-white px-4 pb-6 mb-20 sm:pb-8 md:pb-10 lg:pb-2 xl:pb-8 2xl:pb-12 pt-10 sm:pt-30 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <div className={`space-y-8 flex flex-col items-center lg:items-start transition-all duration-[1500ms] ease-out ${entered ? "opacity-100" : "opacity-0"}`}>
              {/* Main Headline */}
              <h1
                className={`font-roboto font-bold text-[#161A38] text-[26px] leading-[34px] sm:text-[32px] sm:leading-[42px] lg:text-[40px] lg:leading-[53px] tracking-[0.03em] text-center lg:text-left transition-all duration-[1500ms] ease-out ${entered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[160px]'}`}
                style={{ transitionDelay: entered ? '0ms' : '0ms' }}
              >
                Start Your Child's Journey to Excellence Today!
              </h1>

              {/* Description */}
              <p
                className={`font-roboto font-medium text-[#556A8E] text-[14px] leading-[24px] sm:text-[16px] sm:leading-[28px] lg:text-[18px] lg:leading-[31px] tracking-[0.03em] text-center lg:text-left transition-all duration-[1500ms] ease-out ${entered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[160px]'}`}
                style={{ transitionDelay: entered ? '150ms' : '0ms' }}
              >
                At SISYA Class, we make learning an exciting journey. Our interactive lessons help your child build confidence and succeed across all subjects.
              </p>

              {/* Target Audience */}
              <p
                className={`font-roboto font-bold text-[#161A38] text-[14px] leading-[22px] sm:text-[16px] sm:leading-[26px] lg:text-[18px] lg:leading-[31px] tracking-[0.03em] inline-block transition-all duration-[1500ms] ease-out ${entered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[160px]'}`}
                style={{ transitionDelay: entered ? '300ms' : '0ms' }}
              >
                From Class 1 to 10
              </p>

              {/* Ratings Section */}
              <div className={`flex flex-col space-y-4 w-full items-center lg:items-start transition-all duration-[1000ms] ease-out ${entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[160px]'}`}
                   style={{ transitionDelay: entered ? '450ms' : '0ms' }}>
                <div
                  className="relative p-4 bg-white w-full max-w-[460px] min-h-[118px] shadow-[0_0_4px_0_rgba(0,0,0,0.25)] rounded-[16px] sm:rounded-[20px] lg:rounded-[22px]"
                >
                  {/* 4.5/5 Rating */}
                  <div className="text-center mb-2">
                    <span
                      className="inline-block font-[Roboto_Serif] font-semibold text-[18px] leading-[28px] sm:text-[22px] sm:leading-[34px] lg:text-[25.26px] lg:leading-[54.85px] tracking-[0.03em] text-[#626AB5]"
                    >
                      4.5/5
                    </span>
                  </div>

                  {/* Stars with curved line below */}
                  <div className="flex justify-center items-center mb-3 relative">
                    <div className="flex items-center space-x-1">
                      {/* 4 full stars */}
                      {[...Array(4)].map((_, i) => (
                        <Image key={i} src="/fullstar.svg" alt="Full Star" width={20} height={20} className="h-4 w-4 sm:h-5 sm:w-5" />
                      ))}
                      {/* 1 half star */}
                      <Image src="/halfstar.svg" alt="Half Star" width={20} height={20} className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>

                    {/* Curved line under stars */}
                    <svg
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1"
                      width="70"
                      height="9"
                      viewBox="0 0 80 10" xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M 10 8 Q 40 0 70 8"
                        stroke="#9CA3AF"
                        strokeWidth="1"
                        fill="none"
                      />
                    </svg>
                  </div>

                  {/* Platform Logos */}
                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                    <Image src="/trust.svg" alt="Trustpilot" width={110} height={27} className="w-[88px] h-[22px] sm:w-[100px] sm:h-[24px] lg:w-[110.26px] lg:h-[27.09px]" />
                    <Image src="/google play.svg" alt="Google Play" width={110} height={27} className="w-[88px] h-[22px] sm:w-[100px] sm:h-[24px] lg:w-[110.26px] lg:h-[27.09px]" />
                    <Image src="/google.svg" alt="Google My Business" width={110} height={27} className="w-[88px] h-[22px] sm:w-[100px] sm:h-[24px] lg:w-[110.26px] lg:h-[27.09px]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Content */}
            <div className={`relative flex justify-center mt-10 lg:mt-0 transition-all duration-[1500ms] ease-out ${entered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[160px]"}`}>
              {/* Main Student Image Container */}
              <div className="relative left-0 h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] md:h-[360px] md:w-[360px] lg:h-96 lg:w-96">
                {/* Outer Border for Student Container */}
                <div
                  className="absolute top-1/2 left-1/2 h-[300px] w-[300px] sm:h-[360px] sm:w-[360px] md:h-[420px] md:w-[420px] lg:h-[460px] lg:w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[#1A2439]"
                ></div>

                {/* Educational Icons positioned on the dotted circle */}
                <div className="absolute inset-0 z-10 animate-[spin_20s_linear_infinite] scale-[0.7] sm:scale-[0.8] md:scale-[0.9] lg:scale-100 origin-center">
                  {/* Math (π) - Top (0 degrees) */}
                  <div className="absolute flex h-[60px] w-[60px] sm:h-[56px] sm:w-[56px] md:h-[60px] md:w-[60px] items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-[210px] sm:-mt-[205px] md:-mt-[220px] lg:-mt-[230px]">
                    <Image src="/1.svg" alt="Math" width={60} height={60} className="h-full w-full" />
                  </div>

                  {/* Science (Chemistry) - Top Right (60 degrees) */}
                  <div className="absolute flex h-[60px] w-[60px] items-center justify-center top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%) rotate(60deg) translateY(-230px) rotate(-60deg)' }}>
                    <Image src="/2.svg" alt="Science" width={60} height={60} className="h-full w-full" />
                  </div>

                  {/* Physics (Atom) - Bottom Right (120 degrees) */}
                  <div className="absolute flex h-[60px] w-[60px] items-center justify-center top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%) rotate(120deg) translateY(-230px) rotate(-120deg)' }}>
                    <Image src="/3.svg" alt="Physics" width={60} height={60} className="h-full w-full" />
                  </div>

                  {/* Language (Aa) - Bottom (180 degrees) */}
                  <div className="absolute flex h-[60px] w-[60px] items-center justify-center top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%) rotate(180deg) translateY(-230px) rotate(-180deg)' }}>
                    <Image src="/4.svg" alt="Language" width={60} height={60} className="h-full w-full" />
                  </div>

                  {/* Coding - Bottom Left (240 degrees) */}
                  <div className="absolute flex h-[60px] w-[60px] items-center justify-center top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%) rotate(240deg) translateY(-230px) rotate(-240deg)' }}>
                    <Image src="/5.svg" alt="Coding" width={60} height={60} className="h-full w-full" />
                  </div>

                  {/* Robotics - Mid Left (300 degrees) */}
                  <div className="absolute flex h-[60px] w-[60px] items-center justify-center top-1/2 left-1/2" style={{ transform: 'translate(-50%, -50%) rotate(300deg) translateY(-230px) rotate(-300deg)' }}>
                    <Image src="/6.svg" alt="Robotics" width={60} height={60} className="h-full w-full" />
                  </div>
                </div>

                {/* Circular Frame for Student */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[340px] md:h-[340px] lg:w-[392px] lg:h-[392px] rounded-full border-[4px] sm:border-[5px] border-[#E5E7EB] bg-[#F3F4F6]"
                >
                  {/* Student Image */}
                  <Image
                    src="/studnet.svg"
                    alt="Successful Student"
                    width={392}
                    height={392}
                    className="h-full w-full object-cover object-center"
                  />  
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
