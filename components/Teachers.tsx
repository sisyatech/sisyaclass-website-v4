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

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Re-trigger card fade/scale on slide change
  useEffect(() => {
    setCardsEntered(false);
    const timer = setTimeout(() => setCardsEntered(true), 300);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const teachers = [
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
    },
    {
      name: "Snehal Raj",
      title: "Maths Master Teacher 1",
      institution: "BIT",
      experience: "10+ Years of Experience",
      image: "/teacher.svg"
    },
    {
      name: "Snehal Raj",
      title: "Maths Master Teacher 3",
      institution: "BIT",
      experience: "10+ Years of Experience",
      image: "/teacher.svg"
    },
    {
      name: "Snehal Raj",
      title: "Maths Master Teacher 4",
      institution: "BIT",
      experience: "10+ Years of Experience",
      image: "/teacher.svg"
    }
  ];

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => {
      if (prev === 0) {
        return teachers.length - 1;
      }
      return prev - 1;
    });
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => {
      if (prev >= teachers.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  const visibleTeachers = teachers.slice(currentSlide, Math.min(currentSlide + 4, teachers.length));

  return (
    <div ref={sectionRef} className="py-10 sm:py-0 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        
        {/* Top Headlines */}
        <div className={`text-center mb-8 sm:mb-10 md:mb-12 transition-all duration-[1200ms] ease-out ${entered ? "opacity-100 -translate-x-0" : "opacity-0 -translate-x-[160px]"}`}>
          <h3 className="font-montserrat font-normal text-[16px] leading-[24px] sm:text-[19px] sm:leading-[28px] md:text-[22px] md:leading-[32px] text-center text-[#1A2439]">
            Meet the Minds
          </h3>
          <h2 className="font-montserrat font-bold text-[26px] leading-[32px] sm:text-[36px] sm:leading-[40px] md:text-[44px] md:leading-[42px] lg:text-5xl lg:leading-[45px] text-center capitalize mb-4 sm:mb-6 md:mb-7 text-[#1A2439]">
            Behind Your Child's Success
          </h2>
          <p className="font-montserrat font-semibold text-[13px] sm:text-[15px] md:text-[16px] lg:text-[18px] leading-tight text-center text-[#556A8E] px-4">
            Learn from India's top educators — 98% IIT/NIT-qualified, with years of<br className="hidden sm:inline" />experience in nurturing young minds.
          </p>
        </div>

        {/* Teachers Carousel */}
        <div className={`relative transition-all duration-[1500ms] ease-out ${entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[160px]"}`}>
          {/* Desktop: 4 cards with side arrows */}
          <div className="hidden lg:block relative">
            {/* Left Arrow */}
            <button 
              onClick={handlePrevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 translate-x-2 w-10 h-10 border-2 border-[#D9D9D9] rounded-[14px] bg-white flex items-center justify-center transition-colors duration-300 z-10 hover:bg-gray-100"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Cards */}
            <div className="flex justify-center gap-6 px-8">
              {visibleTeachers.map((teacher, index) => (
                <div 
                  key={`${currentSlide}-${index}`}
                  className={`overflow-hidden w-[251.6px] h-[406.7px] rounded-[26.04px] bg-[#2C3E50] p-5 transition-all duration-[800ms] ease-out ${cardsEntered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}
                  style={{ transitionDelay: cardsEntered ? `${index * 120}ms` : '0ms' }}
                >
                  {/* Teacher Image */}
                  <div className="flex justify-center mb-4">
                    <div className="rounded-[20px] overflow-hidden w-[196.56px] h-[226.04px] bg-[#D9E3F0]">
                      <Image src={teacher.image} alt={teacher.name} width={196.56} height={226.04} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  {/* Experience Badge */}
                  <div className="flex justify-center mb-3">
                    <div className="inline-block px-4 py-2 rounded-full bg-white font-roboto font-medium text-sm text-[#1A2439]">{teacher.experience}</div>
                  </div>
                  {/* Info */}
                  <div className="text-white text-center">
                    <h3 className="font-montserrat font-black text-lg leading-none mb-3 tracking-[0.02em]">{teacher.name}</h3>
                    <p className="font-montserrat font-semibold leading-none mb-3 text-[12.4px] tracking-[0.02em]">{teacher.title}</p>
                    <p className="font-montserrat font-semibold leading-none text-[12.4px] tracking-[0.02em]">{teacher.institution}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button 
              onClick={handleNextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-2 w-10 h-10 border-2 border-[#D9D9D9] rounded-[14px] bg-white flex items-center justify-center transition-colors duration-300 z-10 hover:bg-gray-100"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Mobile & Tablet: single card with bottom arrows */}
          <div className="lg:hidden">
            <div className="flex justify-center px-3 sm:px-4 md:px-6">
              {(() => {
                const teacher = teachers[currentSlide];
                return (
                  <div 
                    key={currentSlide}
                    className={`overflow-hidden w-[210px] h-[370px] min-[375px]:w-[230px] min-[375px]:h-[390px] sm:w-[250px] sm:h-[410px] md:w-[270px] md:h-[420px] rounded-[22px] min-[375px]:rounded-[24px] md:rounded-[26px] bg-[#2C3E50] p-3.5 min-[375px]:p-4 md:p-5 transition-all duration-[400ms] ease-in-out ${cardsEntered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                  >
                    <div className="flex justify-center mb-2.5 min-[375px]:mb-3 md:mb-4">
                      <div className="rounded-[16px] min-[375px]:rounded-[18px] md:rounded-[20px] overflow-hidden w-[170px] h-[200px] min-[375px]:w-[186px] min-[375px]:h-[214px] sm:w-[200px] sm:h-[230px] md:w-[210px] md:h-[240px] bg-[#D9E3F0]">
                        <Image src={teacher.image} alt={teacher.name} width={210} height={240} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="flex justify-center mb-2 md:mb-3">
                      <div className="inline-block px-3 py-1.5 min-[375px]:px-4 min-[375px]:py-2 rounded-full bg-white font-roboto font-medium text-xs min-[375px]:text-sm text-[#1A2439]">{teacher.experience}</div>
                    </div>
                    <div className="text-white text-center">
                      <h3 className="font-montserrat font-black text-[16px] min-[375px]:text-[17px] md:text-[18px] leading-none mb-2 md:mb-3 tracking-[0.02em]">{teacher.name}</h3>
                      <p className="font-montserrat font-semibold leading-none mb-2 md:mb-3 text-[11.5px] min-[375px]:text-[12.4px] tracking-[0.02em]">{teacher.title}</p>
                      <p className="font-montserrat font-semibold leading-none text-[11.5px] min-[375px]:text-[12.4px] tracking-[0.02em]">{teacher.institution}</p>
                    </div>
                  </div>
                );
              })()}
            </div>
            {/* Bottom arrows */}
            <div className="mt-4 md:mt-5 flex items-center justify-center gap-5 sm:gap-6">
              <button onClick={handlePrevSlide} className="w-10 h-10 border-2 border-[#D9D9D9] rounded-[14px] bg-white flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-transform">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={handleNextSlide} className="w-10 h-10 border-2 border-[#D9D9D9] rounded-[14px] bg-white flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-transform">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
