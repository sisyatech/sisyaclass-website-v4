"use client";

import React from "react";
import Image from "next/image";

type StatsSectionProps = {
  onChooseClass: (grade: string) => void;
};

export default function StatsSection({ onChooseClass }: StatsSectionProps) {
  return (
    <section className="relative bg-white py-12 px-8 rounded-[26px] max-w-[1150px] mx-auto mt-10 border border-[#e0e7ff] min-h-[180px] z-0">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="w-full md:basis-[36%] md:w-auto">
          <h2 className="font-bold text-[1.75rem] leading-tight md:text-[2.0rem] md:leading-[2.4rem] text-[#6f57e4] text-center md:text-left">
            <span className="inline-flex items-center justify-center md:justify-start md:whitespace-nowrap">
              Become 10X Smarter
              <Image
                src="/10x/brain.svg"
                alt="Brain Icon"
                className="ml-1 h-6 w-6 md:h-8 md:w-8 align-middle"
                width={32}
                height={32}
              />
            </span>
          </h2>
          <div className="flex items-center gap-2 mt-4">
            <span className="bg-[#ffd500] text-black font-semibold px-4 py-2 rounded-md shadow whitespace-nowrap">
              Choose a Class to Enroll Now
            </span>
            <Image
              src="/10x/point.svg"
              alt="Pointer Icon"
              className="w-14 rotate-90 md:rotate-0"
              width={56}
              height={56}
            />
          </div>
        </div>
        <div className="w-full md:basis-[60%] grid grid-cols-3 gap-3 md:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((grade) => (
            <button
              key={grade}
              className="bg-[#685edb] text-white border-0 py-1.5 px-2 font-semibold rounded-[10px] cursor-pointer text-sm min-h-[42px] w-full flex flex-col justify-center items-center text-center leading-[1.2] transition ease-in-out hover:scale-105 md:py-2 md:text-[0.9rem] md:min-h-[48px]"
              onClick={() => onChooseClass(grade.toString())}
            >
              Class {grade}
            </button>
          ))}
          <button
            className="text-white font-medium mt-0 py-1.5 px-2 rounded-[10px] min-h-[42px] w-full flex flex-col justify-center items-center text-center md:py-2 md:min-h-[48px]"
            style={{ background: "linear-gradient(135deg, #d2d2d2, #ada29f)" }}
          >
            <div className="text-xs md:text-sm">Class 11</div>
            <span className="text-[9px] md:text-[10px]">
              <span>(Sold Out)</span>
            </span>
          </button>
          <button
            className="text-white font-medium mt-0 py-1.5 px-2 rounded-[10px] min-h-[42px] w-full flex flex-col justify-center items-center text-center md:py-2 md:min-h-[48px]"
            style={{ background: "linear-gradient(135deg, #d2d2d2, #ada29f)" }}
          >
            <div className="text-xs md:text-sm">Class 12</div>
            <span className="text-[9px] md:text-[10px]">
              <span>(Sold Out)</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}


