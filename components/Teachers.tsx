"use client";

import React, { useState } from "react";

const Teachers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
    <div className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        
        {/* Top Headlines */}
        <div className="text-center mb-12">
          <h3 className="font-montserrat font-normal text-[25px] leading-[45px] text-center text-[#1A2439]">
            Meet the Minds
          </h3>
          <h2 className="font-montserrat font-bold text-5xl leading-[45px] text-center capitalize mb-7 text-[#1A2439]">
            Behind Your Child's Success
          </h2>
          <p className="font-montserrat font-semibold text-[18px] leading-tight text-center text-[#556A8E]">
            Learn from India's top educators — 98% IIT/NIT-qualified, with years of<br />experience in nurturing young minds.
          </p>
        </div>

        {/* Teachers Carousel */}
        <div className="relative">
          
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 translate-x-2 w-10 h-10 border-2 border-gray-300 rounded-2xl bg-white flex items-center justify-center transition-colors duration-300 z-10 hover:bg-gray-100"
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
          <div className="flex justify-center gap-6 px-8">
            {visibleTeachers.map((teacher, index) => (
              <div 
                key={index}
                className="overflow-hidden w-[251.6px] h-[406.7px] rounded-[26.04px] bg-[#2C3E50] p-5"
              >
                {/* Teacher Image */}
                <div className="flex justify-center mb-4">
                  <div 
                    className="rounded-[20px] overflow-hidden w-[196.56px] h-[226.04px] bg-[#D9E3F0]"
                  >
                    <img 
                      src={teacher.image} 
                      alt={teacher.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Experience Badge */}
                <div className="flex justify-center mb-3">
                  <div className="inline-block px-4 py-2 rounded-full bg-white font-roboto font-medium text-sm text-[#1A2439]">
                    {teacher.experience}
                  </div>
                </div>

                {/* Teacher Info */}
                <div className="text-white text-center">
                  <h3 className="font-montserrat font-black text-lg leading-none text-center mb-3 tracking-[0.02em]">
                    {teacher.name}
                  </h3>
                  <p className="font-montserrat font-semibold leading-none text-center mb-3 text-[12.4px] tracking-[0.02em]">
                    {teacher.title}
                  </p>
                  <p className="font-montserrat font-semibold leading-none text-center text-[12.4px] tracking-[0.02em]">
                    {teacher.institution}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={handleNextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-2 w-10 h-10 border-2 border-gray-300 rounded-2xl bg-white flex items-center justify-center transition-colors duration-300 z-10 hover:bg-gray-100"
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
