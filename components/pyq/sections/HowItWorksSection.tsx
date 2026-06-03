import React from "react";
import Image from "next/image";

type HowItWorksSectionProps = {
  onRegister: () => void;
};

export default function HowItWorksSection({ onRegister }: HowItWorksSectionProps) {
  return (
    <section className="w-full bg-white px-5 py-10 text-center">
      <h2 className="mb-10 text-[28px] font-bold text-[#222]">Book This Session Only If Your Child</h2>
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-6 px-4 sm:gap-8 md:gap-10">
        {/* Card 1 - Orange/Beige */}
        <div className="max-w-[300px] min-w-[250px] flex-1 rounded-[12px] bg-[#fff3dc] p-6 text-center transition-[transform,box-shadow] duration-300 ease-linear hover:-translate-y-2 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
          <div className="mb-4 flex justify-center">
            <Image
              src="/doubt-solving/fi_9704250.svg"
              alt="Question mark icon"
              width={60}
              height={60}
              className="h-[60px] w-[60px]"
            />
          </div>
          <div className="text-[16px] leading-[1.5] font-medium text-[#b14b01]">
            Panics during exams or gets stuck on the first few questions
          </div>
        </div>

        {/* Card 2 - Green */}
        <div className="max-w-[300px] min-w-[250px] flex-1 rounded-[12px] bg-[#ebf9e3] p-6 text-center transition-[transform,box-shadow] duration-300 ease-linear hover:-translate-y-2 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
          <div className="mb-4 flex justify-center">
            <Image
              src="/doubt-solving/fi_8799413.svg"
              alt="Brain icon"
              width={60}
              height={60}
              className="h-[60px] w-[60px]"
            />
          </div>
          <div className="text-[16px] leading-[1.5] font-medium text-[#2e7d32]">
            Writes slowly and cannot finish the full paper
          </div>
        </div>

        {/* Card 3 - Blue */}
        <div className="max-w-[300px] min-w-[250px] flex-1 rounded-[12px] bg-[#e7f3ff] p-6 text-center transition-[transform,box-shadow] duration-300 ease-linear hover:-translate-y-2 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
          <div className="mb-4 flex justify-center">
            <Image
              src="/doubt-solving/fi_2877773.svg"
              alt="Anxious child icon"
              width={60}
              height={60}
              className="h-[60px] w-[60px]"
            />
          </div>
          <div className="text-[16px] leading-[1.5] font-medium text-[#1560d0]">
            Has never solved previous-year papers under time pressure
          </div>
        </div>
      </div>
      
      {/* Call-to-Action Button */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={onRegister}
          className="rounded-[11px] bg-[#ffd500] px-8 py-3 text-[16px] font-bold text-black transition-colors duration-200 hover:bg-[#ffed4e] sm:px-10 sm:py-4 sm:text-[18px] md:px-12 md:py-4"
        >
          Book A Session Just @ ₹19
        </button>
      </div>
    </section>
  );
}
