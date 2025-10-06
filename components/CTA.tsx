import React from "react";
import StickyCTA from "./CTA/StickyCTA";

const CTA = () => {
  return (
    <div className="pt-0 pb-2 bg-white">
      <div className="mx-auto flex justify-center px-8">
        {/* Original CTA in layout (sentinel) */}
        <div id="cta-sentinel" className="relative flex items-center justify-between px-8 w-[1012px] h-[109px] rounded-[20px] bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-4">
            <h2 className="font-montserrat font-semibold text-[23px] leading-none text-[#556A8E]">
              Ready to find the right program for your child?
            </h2>
            <div className="text-4xl">🚀</div>
          </div>
          <button className="transition-all hover:shadow-lg w-[238px] h-[53px] rounded-[12px] bg-[#0595CE] font-montserrat font-semibold text-[23px] leading-none text-center text-white">
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

