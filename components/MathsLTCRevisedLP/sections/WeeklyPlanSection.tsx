"use client";

import React from "react";

const rows = [
  {
    title: "Every Week",
    highlight: "5 Classes (Monday - Friday)",
    text: "Choose From 4 PM to 9 PM",
  },
  {
    title: "Every 2 Weeks",
    highlight: "Regular Parent-Teacher Meetings on Student Progress",
    text: "",
  },
  {
    title: "Every Saturday",
    highlight: "Doubt Sessions & Subjective Test",
    text: "",
  },
  {
    title: "Every 4 Weeks",
    highlight: "1 Major Test (Subjective + Objective)",
    text: "(120 Min)",
  },
];

type WeeklyPlanSectionProps = {
  onBookDemo: () => void;
};

export default function WeeklyPlanSection({ onBookDemo }: WeeklyPlanSectionProps) {
  return (
    <section className="mt-10 md:mt-16 px-4">
      <div className="max-w-[700px] mx-auto">
        <div className="space-y-3 sm:space-y-4 max-w-[820px] mx-auto">
          {rows.map((row, idx) => (
            <div
              key={row.title}
              className="flex flex-row items-stretch rounded-[22px] md:rounded-[26px] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.10)] overflow-hidden border border-[#e5e7eb]"
            >
              <div className="w-[38%] md:w-[32%] bg-white px-4 sm:px-6 py-3 sm:py-4 md:py-5 flex items-center justify-center md:justify-start">
                <p className="text-[#4846cf] font-extrabold text-sm sm:text-base md:text-2xl text-center md:text-left">
                  {row.title}
                </p>
              </div>
              <div className="w-px my-2 md:my-3 border-l border-dashed border-[#d4d4ff]" />
              <div className="w-[62%] md:w-[68%] bg-white px-4 sm:px-6 py-3 sm:py-4 md:py-5 flex flex-col justify-center">
                <p className="text-[#111827] font-semibold text-xs sm:text-sm md:text-lg leading-snug">
                  {row.highlight}
                </p>
                {row.text && (
                  <p className="text-[#4b5563] text-[0.7rem] sm:text-xs md:text-base mt-0.5 sm:mt-1">
                    {row.text}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 sm:mt-8 mb-2">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-2xl bg-[#ffd500] px-6 sm:px-8 md:px-12 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base md:text-lg font-semibold text-black shadow-[0_10px_25px_rgba(0,0,0,0.18)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.2)] transition-transform duration-200 hover:-translate-y-0.5"
            onClick={onBookDemo}
          >
            Get Demo @ ₹19
          </button>
        </div>
      </div>
    </section>
  );
}


