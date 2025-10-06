"use client";

import React, { useEffect, useRef, useState } from "react";

const CTA = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const lastYRef = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const y = window.scrollY;
      const scrollingDown = y > lastYRef.current;
      lastYRef.current = y;
      // Dock when CTA's top reaches/stays above top AND we're scrolling down
      if (scrollingDown && rect.top <= 0) {
        setIsSticky(true);
      }
      // Release when scrolling up
      if (!scrollingDown) {
        setIsSticky(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pt-0 pb-2 bg-white">
      <div className="mx-auto flex justify-center px-8">
        {/* CTA Container */}
        <div 
          ref={sectionRef}
          className={`flex items-center justify-between px-8 w-[1012px] h-[109px] rounded-[20px] bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] ${
            isSticky ? 'fixed left-1/2 -translate-x-1/2 bottom-4 z-40' : 'relative'
          }`}
        >
          {/* Left Side - Text Content */}
          <div className="flex items-center gap-4">
            <h2 
              className="font-montserrat font-semibold text-[23px] leading-none text-[#556A8E]"
            >
              Ready to find the right program for your child?
            </h2>
            
            {/* Rocket Icon */}
            <div className="text-4xl">
              🚀
            </div>
          </div>

          {/* Right Side - CTA Button */}
          <button
            className="transition-all hover:shadow-lg w-[238px] h-[53px] rounded-[12px] bg-[#0595CE] font-montserrat font-semibold text-[23px] leading-none text-center text-white"
          >
            Book a Demo
          </button>
        </div>
      </div>

      {/* Spacer to avoid layout jump when fixed */}
      {isSticky && <div className="h-[120px]" />}
    </div>
  );
};

export default CTA;

