import React from "react";
import StickyCTA from "./CTA/StickyCTA";

const CTA = () => {
  return (
    <div className="pt-0 pb-2 bg-white">
      <div className="mx-auto flex justify-center px-4 sm:px-6">
        {/* Original CTA in layout (sentinel) */}
        <div 
          id="cta-sentinel" 
          className="relative flex flex-col gap-3 sm:gap-2 sm:flex-row sm:items-center sm:justify-between px-3 sm:px-4 md:px-6 lg:px-8 w-full max-w-[1012px] min-h-[100px] sm:min-h-[109px] py-4 sm:py-3 md:py-4 rounded-[12px] sm:rounded-[16px] md:rounded-[20px] bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
        >
          <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3 md:gap-4 flex-1">
            <h2 className="font-montserrat font-semibold text-[14px] leading-tight sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[23px] text-[#556A8E] flex-1 pr-2">
              Ready to find the right program for your child?🚀
            </h2>
          </div>
          <button className="transition-all hover:shadow-lg w-full sm:w-[200px] md:w-[220px] lg:w-[238px] h-[36px] sm:h-[40px] md:h-[48px] lg:h-[53px] rounded-[8px] sm:rounded-[10px] md:rounded-[12px] bg-[#0595CE] font-montserrat font-semibold text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[23px] leading-none text-center text-white hover:bg-[#047aa8] active:scale-95">
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

