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

      <div className="min-h-screen bg-white px-4 pb-0 pt-30 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <div className={`space-y-8 transition-all duration-[1500ms] ease-out ${entered ? "opacity-100" : "opacity-0"}`}>
              {/* Main Headline */}
              <h1
                className={`lg:text-5xl font-roboto font-bold text-[#161A38] text-[40px] leading-[53px] tracking-[0.03em] transition-all duration-[1500ms] ease-out ${entered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[160px]'}`}
                style={{ transitionDelay: entered ? '0ms' : '0ms' }}
              >
                Start Your Child's Journey to Excellence Today!
              </h1>

              {/* Description */}
              <p
                className={`font-roboto font-medium text-[#556A8E] text-[18px] leading-[31px] tracking-[0.03em] transition-all duration-[1500ms] ease-out ${entered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[160px]'}`}
                style={{ transitionDelay: entered ? '150ms' : '0ms' }}
              >
                At SISYA Class, we make learning an exciting journey. Our interactive lessons help your child build confidence and succeed across all subjects.
              </p>

              {/* Target Audience */}
              <p
                className={`font-roboto font-bold text-[#161A38] text-[18px] leading-[31px] tracking-[0.03em] w-[189px] h-[31px] transition-all duration-[1500ms] ease-out ${entered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[160px]'}`}
                style={{ transitionDelay: entered ? '300ms' : '0ms' }}
              >
                From Class 1 to 10
              </p>

              {/* Ratings Section */}
              <div className={`flex flex-col space-y-4 transition-all duration-[1000ms] ease-out ${entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[160px]'}`}
                   style={{ transitionDelay: entered ? '450ms' : '0ms' }}>
                <div
                  className="relative p-4 bg-white w-[460px] h-[130px] shadow-[0_0_4px_0_rgba(0,0,0,0.25)] rounded-[22px]"
                >
                  {/* 4.5/5 Rating */}
                  <div className="text-center mb-2">
                    <span
                      className="inline-block font-[Roboto_Serif] font-semibold text-[25.26px] leading-[54.85px] tracking-[0.03em] text-[#626AB5] w-[158.24px] h-[34.62px]"
                    >
                      4.5/5
                    </span>
                  </div>

                  {/* Stars with curved line below */}
                  <div className="flex justify-center items-center mb-3 relative">
                    <div className="flex items-center space-x-1">
                      {/* 4 full stars */}
                      {[...Array(4)].map((_, i) => (
                        <Image key={i} src="/fullstar.svg" alt="Full Star" width={20} height={20} className="h-5 w-5" />
                      ))}
                      {/* 1 half star */}
                      <Image src="/halfstar.svg" alt="Half Star" width={20} height={20} className="h-5 w-5" />
                    </div>

                    {/* Curved line under stars */}
                    <svg
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1"
                      width="80"
                      height="10"
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
                  <div className="flex items-center justify-center space-x-6">
                    <Image src="/trust.svg" alt="Trustpilot" width={110} height={27} className="w-[110.26px] h-[27.09px]" />
                    <Image src="/google play.svg" alt="Google Play" width={110} height={27} className="w-[110.26px] h-[27.09px]" />
                    <Image src="/google.svg" alt="Google My Business" width={110} height={27} className="w-[110.26px] h-[27.09px]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Content */}
            <div className={`relative flex justify-center transition-all duration-[1500ms] ease-out ${entered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[160px]"}`}>
              {/* Main Student Image Container */}
              <div className="relative left-0 h-96 w-96">
                {/* Outer Border for Student Container */}
                <div
                  className="absolute top-1/2 left-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[#1A2439]"
                ></div>

                {/* Educational Icons positioned on the dotted circle */}
                <div className="absolute inset-0 z-10 animate-[spin_20s_linear_infinite]">
                  {/* Math (π) - Top (0 degrees) */}
                  <div className="absolute flex h-[60px] w-[60px] items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-[230px]">
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
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden w-[392px] h-[392px] rounded-[196px] border-[5px] border-[#E5E7EB] bg-[#F3F4F6]"
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
