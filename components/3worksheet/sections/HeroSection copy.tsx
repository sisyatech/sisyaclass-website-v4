"use client";

import Image from "next/image";

type HeroSectionProps = {
  onRegister: () => void;
};

export default function HeroSection({ onRegister }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#01327A] text-white">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 translate-x-1/4 bg-[radial-gradient(circle_at_center,_rgba(0,119,255,0.35),_rgba(1,50,122,0))] blur-3xl lg:block" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 py-12 sm:py-16 lg:flex-row lg:items-stretch lg:py-20">
        <div className="w-full max-w-xl text-center lg:w-1/2 lg:text-left">
          <h1 className="mx-auto max-w-none font-montserrat text-[1.7rem] leading-[1.05] font-bold text-white sm:text-[2.3rem] lg:mx-0 lg:text-[3rem]">
            <span className="block whitespace-nowrap">Get 3 Worksheets Designed By</span>
            <span className="block whitespace-nowrap">IIT Teachers for ₹29</span>
          </h1>

          <p className="mx-auto mt-4 whitespace-nowrap text-lg font-semibold text-white sm:text-xl lg:mx-0 lg:text-[1.45rem]">
            For Grades 7-9 | 10+ tricks | June 22 | 11 AM
          </p>

          <ul className="mx-auto mt-6 flex w-full max-w-xl flex-col items-center gap-3 text-sm text-white sm:text-base lg:items-start">
            <li className="flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-white" />
              Suitable For CBSE, ICSE &amp; State Boards
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-white" />
              Class 1 - 7: 1 Maths, 1 English &amp; 1 EVS
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-white" />
              Class 8 - 10: 1 Maths, 1 Physics &amp; 1 Chemistry
            </li>
          </ul>

          <button
            onClick={onRegister}
            className="mt-8 inline-flex h-[52px] min-w-[220px] items-center justify-center rounded-[12px] bg-[#FFD500] px-8 text-base font-semibold text-[#0B2B68] shadow-lg transition-transform duration-200 hover:scale-[1.02] hover:bg-[#FFE24D] active:scale-[0.98] cursor-pointer"
          >
            Tap To Download Worksheets
          </button>
        </div>

        <div className="relative flex w-full max-w-lg justify-center lg:w-1/2">
          <Image
            src="/3worksheet/h_img.svg"
            alt="Worksheet previews"
            width={520}
            height={340}
            className="w-full max-w-xs sm:max-w-sm lg:max-w-md"
            priority
          />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/10 to-transparent" />
    </section>
  );
}