"use client";

import React from "react";

export default function WhatChildWillLearnSection() {
  return (
    <section className="mt-8 md:mt-10 px-4">
      <div className="max-w-[1150px] mx-auto rounded-[24px] md:rounded-[32px] bg-white border border-[#e5e7eb] shadow-[0_10px_30px_rgba(15,23,42,0.08)] px-4 sm:px-6 md:px-10 py-7 sm:py-8 md:py-12">
        <h2 className="text-center text-[1.4rem] sm:text-[1.7rem] md:text-[2.3rem] font-bold text-[#111827] mb-5 sm:mb-7 md:mb-8">
          What Your Child Will Learn
        </h2>

        <div className="flex justify-center mb-10 sm:mb-14 md:mb-20">
          <div className="inline-flex items-center justify-center rounded-2xl bg-[#05449c] px-6 sm:px-8 md:px-10 py-2.5 sm:py-3">
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg">
              50+ Doubt Sessions
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-6 sm:gap-y-8 gap-x-4 sm:gap-x-6 md:gap-x-10 text-center">
          <div>
            <div className="text-[1.9rem] sm:text-[2.2rem] md:text-[2.8rem] font-extrabold text-[#4846cf] leading-none mb-1 sm:mb-2">
              80
            </div>
            <div className="text-xs sm:text-sm md:text-base font-semibold text-[#111827] leading-snug">
              Revision Classes
              <br />
              For Finals
            </div>
          </div>

          <div className="border-l border-[#505484] pl-4 sm:pl-6 md:pl-8">
            <div className="text-[1.9rem] sm:text-[2.2rem] md:text-[2.8rem] font-extrabold text-[#4846cf] leading-none mb-1 sm:mb-2">
              120
            </div>
            <div className="text-xs sm:text-sm md:text-base font-semibold text-[#111827] leading-snug">
              Math
              <br />
              Classes
            </div>
          </div>

          <div className="md:border-l md:border-[#505484] md:pl-8">
            <div className="text-[1.9rem] sm:text-[2.2rem] md:text-[2.8rem] font-extrabold text-[#4846cf] leading-none mb-1 sm:mb-2">
              20
            </div>
            <div className="text-xs sm:text-sm md:text-base font-semibold text-[#111827] leading-snug">
              Vedic Math
              <br />
              Classes
            </div>
          </div>

          <div className="border-l border-[#505484] pl-4 sm:pl-6 md:pl-8">
            <div className="text-[1.9rem] sm:text-[2.2rem] md:text-[2.8rem] font-extrabold text-[#4846cf] leading-none mb-1 sm:mb-2">
              20
            </div>
            <div className="text-xs sm:text-sm md:text-base font-semibold text-[#111827] leading-snug">
              Mental Ability
              <br />
              Classes
            </div>
          </div>

          <div className="md:border-l md:border-[#505484] md:pl-8 col-span-2 md:col-span-1">
            <div className="text-[1.9rem] sm:text-[2.2rem] md:text-[2.8rem] font-extrabold text-[#4846cf] leading-none mb-1 sm:mb-2">
              40
            </div>
            <div className="text-xs sm:text-sm md:text-base font-semibold text-[#111827] leading-snug">
              Foundation/
              <br />
              Olympiad
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-7 sm:mt-9 md:mt-10">
          <div className="inline-flex items-center justify-center rounded-2xl bg-[#05449c] px-6 sm:px-8 md:px-10 py-2.5 sm:py-3">
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg">
              Total 300+ Classes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}


