'use client';

import { useState } from "react";
import BookAppointmentModal from "./BookAppointmentModal";

const highlights = [
  "Deliver board + competitive excellence within campus",
  "Become a preferred choice for parents",
  "Build a long-term model of results, revenue, and reputation",
];

const ConclusionSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="mx-auto flex w-full max-w-[820px] flex-col items-center gap-8 px-4 text-center sm:gap-10 sm:px-6 md:px-0">
        <div className="w-full overflow-hidden rounded-t-[24px] rounded-b-[0px] bg-[#0E5D9A] px-5 py-8 text-white sm:rounded-t-[32px] sm:px-10 sm:py-12 md:rounded-t-[32px] md:px-16 md:py-16">
          <h2 className="text-[26px] font-bold sm:text-[34px] md:text-[44px]">
            Conclusion
          </h2>
          <p className="mt-3 text-xs font-medium text-white/90 sm:text-base md:text-lg">
            By partnering with SISYA CLASS, your school will:
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:gap-6 md:mt-10">
            {highlights.map((item) => (
              <div
                key={item}
                className="relative mx-auto w-full max-w-full sm:max-w-[720px]"
              >
                <div className="pointer-events-none absolute inset-0 translate-y-[4px] rounded-[6px] bg-[#0495CE] opacity-90 sm:translate-y-[6px]" />
                <div className="relative rounded-[6px] border border-white/40 bg-[#FFFBFB] px-5 py-4 text-left text-[#0E5D9A] shadow-[8.06px_6.45px_0px_-1.61px_#0495CE] sm:px-7 sm:py-6 md:px-8 md:py-6">
                  <p className="text-[13px] font-semibold leading-[18px] sm:text-base sm:leading-[22px] md:text-lg md:leading-[26px]">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center gap-5 px-4 text-center  sm:gap-6 sm:px-6 md:px-0">
        <div className="w-full bg-[#0595CE] px-5 py-5 font-['Roboto'] text-[13px] font-normal leading-[18px] text-white sm:px-10 sm:text-[16px] sm:leading-[22px] md:text-[18px] md:leading-[24px]">
          Together, we can create schools that are not only centres of learning,{" "}
          <br className="hidden sm:inline" />
          but also centres of success, growth, and trust.
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex h-[42px] items-center justify-center rounded-[10px] bg-[#0595CE] px-10 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105 hover:bg-[#047bb1] sm:h-[40px] sm:px-14 sm:text-base"
        >
          Get Started
        </button>
      </div>

      <BookAppointmentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default ConclusionSection;

