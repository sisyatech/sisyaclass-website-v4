"use client";

import React from "react";
import Image from "next/image";

export default function TrialIncludedSection() {
  return (
    <section className="relative w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-6 lg:px-8">
        {/* Main Title */}
        <h2 className="font-roboto font-black text-[32px] leading-[42px] tracking-[0.03em] text-center md:text-[36px] md:leading-[48px] lg:text-[40px] lg:leading-[53px] mb-12 md:mb-16">
          What&apos;s Included in Your{" "}
          <span className="text-[#FF6B35]">₹19</span> Trial
        </h2>

        {/* Section 1: 3 Live Classes with IIT Teachers */}
        <div className="mb-16 md:mb-20 lg:mb-24">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-0 md:gap-1">
            {/* Text Content - Right Aligned */}
            <div className="md:w-1/2 md:text-right order-2 md:order-1">
              <h3 className="mb-4 font-bold text-[28px] leading-[34px] tracking-normal text-right md:text-[38px] md:leading-[46.67px]">
                3 Live Classes with IIT <br /> Teachers
              </h3>
              <p className="text-[#595959] font-semibold text-[16px] leading-[1.8] tracking-normal text-right md:text-[20px]">
                Maths, Physics, Chemistry and Biology
              </p>
            </div>

            {/* Image - Left Side */}
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="relative w-full max-w-[600px] mx-auto md:mx-0">
                <Image
                  src="/board/livepic.svg"
                  alt="Live Classes with IIT Teachers"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: 10+ Daily Practice Papers */}
        <div className="mb-16 md:mb-20 lg:mb-24">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-0 md:gap-1">
            {/* Image - Left Side */}
            <div className="md:w-1/2 flex justify-center items-center">
              <div className="relative w-full max-w-[500px] mx-auto md:mx-0">
                <Image
                  src="/board/questionpaper.svg"
                  alt="Daily Practice Papers"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Text Content - Right Aligned */}
            <div className="md:w-1/2 md:text-right">
              <h3 className="mb-4 font-bold text-[28px] leading-[34px] tracking-normal text-left md:text-[38px] md:leading-[46.67px]">
                10+ Daily Practice Papers
              </h3>
              <p className="text-[#595959] font-semibold text-[16px] leading-[1.8] tracking-normal text-left md:text-[20px]">
                Track learning progress daily
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: SISYA AI */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-10">
            {/* Text Content - Left Side */}
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="mb-4 font-bold text-[28px] leading-[34px] tracking-normal text-right md:text-[38px] md:leading-[46.67px]">
                SISYA AI
              </h3>
              <p className="text-[#595959] font-semibold text-[16px] leading-[1.8] tracking-normal text-right md:text-[20px]">
                24/7 Doubt Solving Assistance
              </p>
            </div>

            {/* Images - Right Side */}
            <div className="md:w-1/2">
              <div className="relative w-full max-w-[400px] mx-auto md:mx-0 flex gap-2">
                <div className="w-1/2">
                  <Image
                    src="/board/mobile1.svg"
                    alt="SISYA AI Mobile App 1"
                    width={200}
                    height={200}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
                <div className="w-1/2">
                  <Image
                    src="/board/mobile2.svg"
                    alt="SISYA AI Mobile App 2"
                    width={200}
                    height={200}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

