"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function TrialIncludedSection() {
  const [visibleSections, setVisibleSections] = useState({
    title: false,
    section1: false,
    section2: false,
    section3: false,
  });

  const titleRef = useRef<HTMLHeadingElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const createObserver = (
      ref: React.RefObject<HTMLElement | null>,
      key: keyof typeof visibleSections,
      threshold = 0.2
    ) => {
      if (!ref.current) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => ({ ...prev, [key]: true }));
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold, rootMargin: "0px 0px -50px 0px" }
      );

      observer.observe(ref.current);
      return observer;
    };

    const titleObserver = createObserver(titleRef as React.RefObject<HTMLElement | null>, "title");
    const section1Observer = createObserver(section1Ref as React.RefObject<HTMLElement | null>, "section1");
    const section2Observer = createObserver(section2Ref as React.RefObject<HTMLElement | null>, "section2");
    const section3Observer = createObserver(section3Ref as React.RefObject<HTMLElement | null>, "section3");

    if (titleObserver) observers.push(titleObserver);
    if (section1Observer) observers.push(section1Observer);
    if (section2Observer) observers.push(section2Observer);
    if (section3Observer) observers.push(section3Observer);

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="relative w-full bg-white py-12 md:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-6 lg:px-8">
        {/* Main Title */}
        <h2 
          ref={titleRef}
          className={`font-roboto font-black text-[32px] leading-[42px] tracking-[0.03em] text-center md:text-[36px] md:leading-[48px] lg:text-[40px] lg:leading-[53px] mb-12 md:mb-16 transition-all duration-[1000ms] ease-out ${visibleSections.title ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'}`}
        >
          What&apos;s Included in Your{" "}
          <span className="text-[#FF6B35]">₹19</span> Trial
        </h2>

        {/* Section 1: 3 Live Classes with IIT Teachers */}
        <div 
          ref={section1Ref}
          className={`mb-16 md:mb-20 lg:mb-24 transition-all duration-[1000ms] ease-out ${visibleSections.section1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'}`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-0 md:gap-1">
            {/* Text Content - Right Aligned */}
            <div className={`md:w-1/2 md:text-right order-2 md:order-1 transition-all duration-[1000ms] ease-out ${visibleSections.section1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[60px]'}`} style={{ transitionDelay: visibleSections.section1 ? '200ms' : '0ms' }}>
              <h3 className="mb-4 font-bold text-[28px] leading-[34px] tracking-normal text-right md:text-[38px] md:leading-[46.67px]">
                3 Live Classes with IIT <br /> Teachers
              </h3>
              <p className="text-[#595959] font-semibold text-[16px] leading-[1.8] tracking-normal text-right md:text-[20px]">
                Maths, Physics, Chemistry and Biology
              </p>
            </div>

            {/* Image - Left Side */}
            <div className={`md:w-1/2 order-1 md:order-2 transition-all duration-[1000ms] ease-out ${visibleSections.section1 ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-[60px] scale-95'}`} style={{ transitionDelay: visibleSections.section1 ? '300ms' : '0ms' }}>
              <div className="relative w-full max-w-[600px] mx-auto md:mx-0">
                <Image
                  src="/board/livepic.svg"
                  alt="Live Classes with IIT Teachers"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: 10+ Daily Practice Papers */}
        <div 
          ref={section2Ref}
          className={`mb-16 md:mb-20 lg:mb-24 transition-all duration-[1000ms] ease-out ${visibleSections.section2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'}`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-0 md:gap-1">
            {/* Image - Left Side */}
            <div className={`md:w-1/2 flex justify-center items-center transition-all duration-[1000ms] ease-out ${visibleSections.section2 ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-[60px] scale-95'}`} style={{ transitionDelay: visibleSections.section2 ? '200ms' : '0ms' }}>
              <div className="relative w-full max-w-[500px] mx-auto md:mx-0">
                <Image
                  src="/board/questionpaper.svg"
                  alt="Daily Practice Papers"
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Text Content - Right Aligned */}
            <div className={`md:w-1/2 md:text-right transition-all duration-[1000ms] ease-out ${visibleSections.section2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[60px]'}`} style={{ transitionDelay: visibleSections.section2 ? '300ms' : '0ms' }}>
              <h3 className="mb-4 font-bold text-[28px] leading-[34px] tracking-normal text-left md:text-[38px] md:leading-[46.67px]">
                10+ Daily Practice Papers
              </h3>
              <p className="text-[#595959] font-semibold text-[16px] leading-[1.8] tracking-normal text-left md:text-[20px]">
                Track learning progress daily
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: SISYA AI */}
        <div 
          ref={section3Ref}
          className={`transition-all duration-[1000ms] ease-out ${visibleSections.section3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'}`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-10">
            {/* Text Content - Left Side */}
            <div className={`md:w-1/2 text-center md:text-left transition-all duration-[1000ms] ease-out ${visibleSections.section3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[60px]'}`} style={{ transitionDelay: visibleSections.section3 ? '200ms' : '0ms' }}>
              <h3 className="mb-4 font-bold text-[28px] leading-[34px] tracking-normal text-right md:text-[38px] md:leading-[46.67px]">
                SISYA AI
              </h3>
              <p className="text-[#595959] font-semibold text-[16px] leading-[1.8] tracking-normal text-right md:text-[20px]">
                24/7 Doubt Solving Assistance
              </p>
            </div>

            {/* Images - Right Side */}
            <div className={`md:w-1/2 transition-all duration-[1000ms] ease-out ${visibleSections.section3 ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-[60px] scale-95'}`} style={{ transitionDelay: visibleSections.section3 ? '300ms' : '0ms' }}>
              <div className="relative w-full max-w-[400px] mx-auto md:mx-0 flex gap-2">
                <div className={`w-1/2 transition-all duration-[800ms] ease-out ${visibleSections.section3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`} style={{ transitionDelay: visibleSections.section3 ? '400ms' : '0ms' }}>
                  <Image
                    src="/board/mobile1.svg"
                    alt="SISYA AI Mobile App 1"
                    width={200}
                    height={200}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
                <div className={`w-1/2 transition-all duration-[800ms] ease-out ${visibleSections.section3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`} style={{ transitionDelay: visibleSections.section3 ? '500ms' : '0ms' }}>
                  <Image
                    src="/board/mobile2.svg"
                    alt="SISYA AI Mobile App 2"
                    width={200}
                    height={200}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

