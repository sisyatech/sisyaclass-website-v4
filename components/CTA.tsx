import React from "react";
import StickyCTA from "./CTA/StickyCTA";

const CTA = () => {
  return (
    <div className="pt-0 pb-2 bg-white">
      <div className="mx-auto flex justify-center px-4 sm:px-6">
        {/* Original CTA in layout (sentinel) */}
        <div 
          id="cta-sentinel" 
          className="relative flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 lg:px-8 w-full max-w-[1012px] min-h-[96px] sm:h-[109px] rounded-[16px] sm:rounded-[20px] bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
        >
          <div className="flex items-start sm:items-center justify-between sm:justify-start gap-3 sm:gap-4">
            <h2 className="font-montserrat font-semibold text-[16px] leading-tight sm:text-[20px] lg:text-[23px] text-[#556A8E]">
              Ready to find the right program for your child?
            </h2>
            <div className="text-2xl sm:text-3xl lg:text-4xl">🚀</div>
          </div>
          <button className="transition-all hover:shadow-lg w-full sm:w-[238px] h-[40px] sm:h-[53px] rounded-[8px] sm:rounded-[12px] bg-[#0595CE] font-montserrat font-semibold text-[14px] sm:text-[20px] lg:text-[23px] leading-none text-center text-white">
            Book a Demo
          </button>
        </div>
      </div>

      {/* Sticky bar (client component) */}
      <StickyCTA sentinelId="cta-sentinel" testimonialsId="testimonials" />
    </div>
  );
};

export default CTA;

