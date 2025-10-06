"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
const Teachers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [entered, setEntered] = useState(false);
  const [cardsEntered, setCardsEntered] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Show as soon as section is mostly in view (helps on small screens)
    const isAlreadyInView = () => {
      const rect = sectionRef.current!.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.9; // 90% viewport height
    };

    if (isAlreadyInView()) {
      setEntered(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -15% 0px" }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Re-trigger card fade/scale on slide change
  useEffect(() => {
    setCardsEntered(false);
    const id = requestAnimationFrame(() => setCardsEntered(true));
    return () => cancelAnimationFrame(id);
  }, [currentSlide]);

  const teachers = [
    {
      name: "Snehal Raj",
      title: "Maths Master Teacher",
      institution: "BIT",
      experience: "10+ Years of Experience",
      image: "/teacher.svg" // Using placeholder, replace with actual teacher images
    },
    {
      name: "Snehal Raj",
      title: "Maths Master Teacher",
      institution: "BIT",
      experience: "10+ Years of Experience",
      image: "/teacher.svg"
    },
    {
      name: "Snehal Raj",
      title: "Maths Master Teacher",
      institution: "BIT",
      experience: "10+ Years of Experience",
      image: "/teacher.svg"
    },
    {
      name: "Snehal Raj",
      title: "Maths Master Teacher",
      institution: "BIT",
      experience: "10+ Years of Experience",
      image: "/teacher.svg"
    }
  ];

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? teachers.length - 4 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev >= teachers.length - 4 ? 0 : prev + 1));
  };

  const visibleTeachers = teachers.slice(currentSlide, currentSlide + 4);

  return (
    <div ref={sectionRef} className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        
        {/* Top Headlines */}
        <div className={`text-center mb-10 sm:mb-12 transition-all duration-[1500ms] ease-out ${entered ? "opacity-100 -translate-x-0" : "opacity-0 -translate-x-[160px]"}`}>
          <h3 className="font-montserrat font-normal text-[18px] leading-[28px] sm:text-[22px] sm:leading-[34px] text-center text-[#1A2439]">
            Meet the Minds
          </h3>
          <h2 className="font-montserrat font-bold text-[32px] leading-[36px] sm:text-[44px] sm:leading-[42px] lg:text-5xl lg:leading-[45px] text-center capitalize mb-5 sm:mb-7 text-[#1A2439]">
            Behind Your Child's Success
          </h2>
          <p className="font-montserrat font-semibold text-[14px] sm:text-[16px] lg:text-[18px] leading-tight text-center text-[#556A8E]">
            Learn from India's top educators — 98% IIT/NIT-qualified, with years of<br />experience in nurturing young minds.
          </p>
        </div>

        {/* Teachers Carousel */}
        <div className={`relative transition-all duration-[1500ms] ease-out ${entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[160px]"}`}>
          
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrevSlide}
            className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 translate-x-2 w-10 h-10 border-2 border-gray-300 rounded-2xl bg-white items-center justify-center transition-colors duration-300 z-10 hover:bg-gray-100"
          >
            <svg 
              className="w-5 h-5 text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Teacher Cards */}
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 sm:gap-6 px-2 sm:px-6 md:px-8">
            {visibleTeachers.map((teacher, index) => (
              <div 
                key={index}
                className={`overflow-hidden w-[210px] sm:w-[230px] md:w-[251.6px] h-[380px] sm:h-[400px] md:h-[406.7px] rounded-[22px] sm:rounded-[24px] md:rounded-[26.04px] bg-[#2C3E50] p-4 sm:p-5 transition-all duration-[1500ms] ease-out ${cardsEntered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: cardsEntered ? `${index * 120}ms` : '0ms' }}
              >
                {/* Teacher Image */}
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div 
                    className="rounded-[16px] sm:rounded-[18px] md:rounded-[20px] overflow-hidden w-[175px] h-[200px] sm:w-[186px] sm:h-[214px] md:w-[196.56px] md:h-[226.04px] bg-[#D9E3F0]"
                  >
                    <Image 
                      src={teacher.image}   
                      alt={teacher.name}
                      width={196.56}
                      height={226.04}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Experience Badge */}
                <div className="flex justify-center mb-2 sm:mb-3">
                  <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white font-roboto font-medium text-xs sm:text-sm text-[#1A2439]">
                    {teacher.experience}
                  </div>
                </div>

                {/* Teacher Info */}
                <div className="text-white text-center">
                  <h3 className="font-montserrat font-black text-[16px] sm:text-[17px] md:text-lg leading-none text-center mb-2 sm:mb-3 tracking-[0.02em]">
                    {teacher.name}
                  </h3>
                  <p className="font-montserrat font-semibold leading-none text-center mb-2 sm:mb-3 text-[11.5px] sm:text-[12.4px] tracking-[0.02em]">
                    {teacher.title}
                  </p>
                  <p className="font-montserrat font-semibold leading-none text-center text-[11.5px] sm:text-[12.4px] tracking-[0.02em]">
                    {teacher.institution}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={handleNextSlide}
            className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-2 w-10 h-10 border-2 border-gray-300 rounded-2xl bg-white items-center justify-center transition-colors duration-300 z-10 hover:bg-gray-100"
          >
            <svg 
              className="w-5 h-5 text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
