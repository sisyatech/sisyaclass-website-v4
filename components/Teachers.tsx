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
          <h3 className="font-montserrat font-400 text-2xl leading-[45px] text-center font-size-25px line-height-45px letter-spacing-0.01em" style={{ color: '#1A2439' }}>
            Meet the Minds
          </h3>
          <h2 className="font-montserrat font-bold text-5xl leading-[45px] text-center capitalize mb-7" style={{ color: '#1A2439' }}>
            Behind Your Child's Success
          </h2>
          <p className="font-montserrat font-semibold  font-size-18px text-lg leading-tight text-center" style={{ color: '#556A8E' }}>
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
                className="overflow-hidden"
                style={{
                  width: '251.6px',
                  height: '406.7px',
                  borderRadius: '26.04px',
                  backgroundColor: '#2C3E50',
                  padding: '20px'
                }}
              >
                {/* Teacher Image */}
                <div className="flex justify-center mb-4">
                  <div 
                    className="rounded-2xl overflow-hidden"
                    style={{
                      backgroundColor: '#D9E3F0',
                      width: '196.56px',
                      height: '226.04px',
                      borderRadius: '20px'
                    }}
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
                  <div className="inline-block px-4 py-2 rounded-full bg-white font-roboto font-medium text-sm" style={{ color: '#1A2439' }}>
                    {teacher.experience}
                  </div>
                </div>

                {/* Teacher Info */}
                <div className="text-white text-center">
                  <h3 className="font-montserrat font-black text-lg leading-none text-center mb-3" style={{ letterSpacing: '2%' }}>
                    {teacher.name}
                  </h3>
                  <p className="font-montserrat font-semibold leading-none text-center mb-3" style={{ fontSize: '12.4px', letterSpacing: '2%' }}>
                    {teacher.title}
                  </p>
                  <p className="font-montserrat font-semibold leading-none text-center" style={{ fontSize: '12.4px', letterSpacing: '2%' }}>
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
