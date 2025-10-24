import React, { useState, useEffect, useRef } from "react";

const CTA = () => {
  const [showSticky, setShowSticky] = useState(false);
  const [hasReachedCTA, setHasReachedCTA] = useState(false);
  const ctaRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 1. Original CTA is 100% visible on screen
          setHasReachedCTA(true); // Mark it as "seen"
          setShowSticky(false);   // Hide the sticky bar
        } else {
          // 2. Original CTA is NOT 100% visible
          if (hasReachedCTA) {
            // We have seen it at least once
            
            // Check if the element's *top* edge is *above* (or touching) the viewport's top edge
            // This is the "touching the navbar" condition
            const isTouchingOrPastNavbar = entry.boundingClientRect.top <= 0;

            if (isTouchingOrPastNavbar) {
              // User has scrolled PAST (or is scrolling past) the element's top
              setShowSticky(true);
            } else {
              // Element is not 100% visible, but it's not past the top
              // (e.g., it's scrolling *into* view from the bottom, or user scrolled up)
              setShowSticky(false);
            }
          }
          // else: page load, not 100% visible, hasNotReached. Do nothing.
        }
      },
      {
        threshold: 1.0, // Triggers when visibility crosses 100%
        rootMargin: '0px'
      }
    );

    const currentRef = ctaRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasReachedCTA]);

  const handleBookDemo = () => {
    // Add your booking logic here
    console.log('Book a Demo clicked');
  };

  return (
    <>
      {/* Original CTA section */}
      <div className="pt-0 pb-2 bg-white">
        <div className="mx-auto flex justify-center px-4 sm:px-6">
          <div
            ref={ctaRef}
            id="cta-sentinel"
            className="relative flex flex-col gap-3 sm:gap-2 sm:flex-row sm:items-center sm:justify-between px-3 sm:px-4 md:px-6 lg:px-8 w-full max-w-[1012px] min-h-[100px] sm:min-h-[109px] py-4 sm:py-3 md:py-4 rounded-[12px] sm:rounded-[16px] md:rounded-[20px] bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
          >
            <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3 md:gap-4 flex-1">
              <h2 className="font-montserrat font-semibold text-[14px] leading-tight sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[23px] text-[#556A8E] flex-1 pr-2">
                Ready to find the right program for your child?🚀
              </h2>
            </div>
            <button
              onClick={handleBookDemo}
              className="cursor-pointer transition-all hover:shadow-lg w-full sm:w-[200px] md:w-[220px] lg:w-[238px] h-[36px] sm:h-[40px] md:h-[48px] lg:h-[53px] rounded-[8px] sm:rounded-[10px] md:rounded-[12px] bg-[#0595CE] font-montserrat font-semibold text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[23px] leading-none text-center text-white hover:bg-[#047aa8] active:scale-95"
            >
              Book a Demo
            </button>
          </div>
        </div>
      </div>

      {/* Sticky bar at bottom - only shows after reaching CTA and scrolling past it */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out pb-2
          ${showSticky ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        {/* The inner container of the sticky bar now matches the original CTA's design */}
        <div className="mx-auto flex justify-center px-4 sm:px-6"> {/* This div defines max-width and horizontal padding */}
          <div 
            className="relative flex flex-col gap-2 sm:gap-2 sm:flex-row sm:items-center sm:justify-between px-3 sm:px-4 md:px-6 lg:px-8 w-full max-w-[1012px] min-h-0 sm:min-h-0 py-3 sm:py-3 md:py-6 rounded-[12px] sm:rounded-[16px] md:rounded-[20px] bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
          >
            <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3 md:gap-4 flex-1">
              <h3 className="font-montserrat font-semibold text-[14px] leading-tight sm:text-[16px] md:text-[18px] text-[#556A8E] flex-1 pr-2">
                Ready to find the right program for your child? 🚀
              </h3>
            </div>
            <button
              onClick={handleBookDemo}
              className="cursor-pointer transition-all hover:shadow-lg active:scale-95 w-full sm:w-[200px] md:w-[220px] lg:w-[238px] h-[36px] sm:h-[40px] md:h-[44px] lg:h-[48px] rounded-[8px] sm:rounded-[10px] md:rounded-[12px] bg-[#0595CE] hover:bg-[#047aa8] font-montserrat font-semibold text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[20px] leading-none text-center text-white whitespace-nowrap"
            >
              Book a Demo
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CTA;