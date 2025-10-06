"use client";

import React, { useEffect, useRef, useState } from "react";

interface StickyCTAProps {
  sentinelId?: string; // element to measure original position (in-flow CTA)
  testimonialsId?: string; // gate appearance until testimonials reached
}

const StickyCTA: React.FC<StickyCTAProps> = ({ sentinelId = "cta-sentinel", testimonialsId = "testimonials" }) => {
  const [isSticky, setIsSticky] = useState(false);
  const lastYRef = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      const sentinel = document.getElementById(sentinelId);
      if (!sentinel) return;
      const rect = sentinel.getBoundingClientRect();
      const testimonials = document.getElementById(testimonialsId);
      const testimonialsRect = testimonials?.getBoundingClientRect();

      const y = window.scrollY;
      const scrollingDown = y > lastYRef.current;
      lastYRef.current = y;

      const reachedTestimonials = testimonialsRect ? testimonialsRect.top <= 0 : false;

      if (rect.top <= 0 && reachedTestimonials) {
        setIsSticky(true);
      }
      if (!scrollingDown || rect.top > 0) {
        setIsSticky(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sentinelId, testimonialsId]);

  return (
    <div className={`pointer-events-none fixed left-1/2 -translate-x-1/2 bottom-28 z-40 w-full px-4 transition-all duration-500 ease-out ${isSticky ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
      <div className="pointer-events-auto mx-auto flex justify-center">
        <div className="flex items-center justify-between px-8 w-[1012px] h-[109px] rounded-[20px] bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.25)]">
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
    </div>
  );
};

export default StickyCTA;


