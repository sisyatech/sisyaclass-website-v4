"use client";

import React, { useState, useEffect } from "react";

const ClassSelection = () => {
  const [activeClass, setActiveClass] = useState("Class 1-3");
  const [currentSlide, setCurrentSlide] = useState(0);

  const classOptions = [
    "Class 1-3",
    "Class 4-5", 
    "Class 6-7",
    "Class 8-10"
  ];

  const courseFeatures = [
    "Online Courses",
    "Detailed Syllabus", 
    "Textbook Solutions",
    "Sample Papers",
    "Olympiad Preparation",
    "Worksheets",
    "Revision Notes"
  ];

  // All 10 classes with colors
  const allClasses = [
    { 
      class: "Class 1", 
      containerColor: "#E6E7FF", 
      textColor: "#6366F1" 
    },
    { 
      class: "Class 2", 
      containerColor: "#DBEAFE", 
      textColor: "#5A9CB8" 
    },
    { 
      class: "Class 3", 
      containerColor: "#FCE7F3", 
      textColor: "#D18480" 
    },
    { 
      class: "Class 4", 
      containerColor: "#D1FAE5", 
      textColor: "#41AC7D" 
    },
    { 
      class: "Class 5", 
      containerColor: "#FFF2CC", 
      textColor: "#F59E0B" 
    },
    { 
      class: "Class 6", 
      containerColor: "#F3E8FF", 
      textColor: "#8B5CF6" 
    },
    { 
      class: "Class 7", 
      containerColor: "#ECFDF5", 
      textColor: "#059669" 
    },
    { 
      class: "Class 8", 
      containerColor: "#FEF2F2", 
      textColor: "#DC2626" 
    },
    { 
      class: "Class 9", 
      containerColor: "#EEF2FF", 
      textColor: "#3B82F6" 
    },
    { 
      class: "Class 10", 
      containerColor: "#F0FDF4", 
      textColor: "#16A34A" 
    }
  ];

  // Get classes based on active filter
  const getFilteredClasses = () => {
    switch (activeClass) {
      case "Class 1-3":
        return allClasses.slice(0, 3);
      case "Class 4-5":
        return allClasses.slice(3, 5);
      case "Class 6-7":
        return allClasses.slice(5, 7);
      case "Class 8-10":
        return allClasses.slice(7, 10);
      default:
        return allClasses;
    }
  };

  const filteredClasses = getFilteredClasses();
  const totalSlides = Math.ceil(filteredClasses.length / 4);

  // Handle arrow navigation between class ranges
  const handlePrevSlide = () => {
    const currentIndex = classOptions.indexOf(activeClass);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : classOptions.length - 1;
    setActiveClass(classOptions[prevIndex]);
    setCurrentSlide(0);
  };

  const handleNextSlide = () => {
    const currentIndex = classOptions.indexOf(activeClass);
    const nextIndex = currentIndex < classOptions.length - 1 ? currentIndex + 1 : 0;
    setActiveClass(classOptions[nextIndex]);
    setCurrentSlide(0);
  };

  // Reset slide when filter changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeClass]);

  // Get current slide classes
  const getCurrentSlideClasses = () => {
    const startIndex = currentSlide * 4;
    return filteredClasses.slice(startIndex, startIndex + 4);
  };

  const currentSlideClasses = getCurrentSlideClasses();

  return (
    <div className="pt-0 pb-10 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        {/* Main Headline */}
        <div className="text-center mb-12">
            <h2 
              className="mb-8"
              style={{
                fontFamily: 'Montserrat',
                fontWeight: 700,
                fontSize: '50px',
                lineHeight: '45px',
                letterSpacing: '0%',
                textAlign: 'center',
                textTransform: 'capitalize',
                color: '#1A2439'
              }}
            >
              <span 
                style={{
                  fontFamily: 'Montserrat',
                  fontWeight: 400,
                  fontSize: '25px',
                  lineHeight: '45px',
                  letterSpacing: '0%',
                  textAlign: 'center',
                  display: 'block',
                  marginBottom: '8px',
                  color: '#1A2439'
                }}
              >
                Explore What You Can Learn
              </span>
              with SISYA, From Class 1 to 10
            </h2>
          
          {/* Class Selection Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-19">
            {classOptions.map((option) => (
              <button
                key={option}
                onClick={() => setActiveClass(option)}
                className="font-semibold transition-all duration-300"
                style={{
                  width: '139px',
                  height: '46px',
                  borderRadius: '15px',
                  paddingTop: '12.52px',
                  paddingRight: '23.66px',
                  paddingBottom: '12.52px',
                  paddingLeft: '23.66px',
                  gap: '13.92px',
                  backgroundColor: activeClass === option ? '#0595CE' : '#FFFFFF',
                  color: activeClass === option ? '#FFFFFF' : '#1A2439',
                  border: activeClass === option ? 'none' : '1px solid #1A2439',
                  boxShadow: '0px 5.57px 5.57px 0px #00000040'
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 translate-x-2 flex items-center justify-center transition-colors duration-300 z-10 hover:bg-gray-100"
            style={{
              width: '40px',
              height: '40px',
              border: '2px solid #D9D9D9',
              borderRadius: '14px',
              backgroundColor: '#FFFFFF'
            }}
          >
            <svg 
              className="w-5 h-5 text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{
                opacity: 1
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={handleNextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-2 flex items-center justify-center transition-colors duration-300 z-10 hover:bg-gray-100"
            style={{
              width: '40px',
              height: '40px',
              border: '2px solid #D9D9D9',
              borderRadius: '14px',
              backgroundColor: '#FFFFFF'
            }}
          >
            <svg 
              className="w-5 h-5 text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{
                opacity: 1
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Course Cards */}
          <div className="flex justify-center gap-6 px-8">
            {currentSlideClasses.map((card, index) => (
                
               <div 
                 key={index} 
                 className="shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
                 style={{
                   width: '250px',
                   height: '338px',
                   borderRadius: '20px',
                   backgroundColor: card.containerColor
                 }}
               >
                 {/* Teacher Image */}
                 <div className="relative" style={{ top: '-35px', left: '7.29px' }}>
                   <img 
                     src="/teacher.svg" 
                     alt="Teacher" 
                     className="object-cover"
                     style={{
                       width: '246.56px',
                       height: '246.04px'
                     }}
                   />
                 </div>
                 
                 {/* Class Number */}
                 <div className="absolute" style={{ top: '48px', left: '172px' }}>
                   <h3 
                     style={{
                       width: '74px',
                       height: '22px',
                       fontFamily: 'Montserrat',
                       fontWeight: 700,
                       fontSize: '18px',
                       lineHeight: '100%',
                       letterSpacing: '0%',
                       textAlign: 'center',
                       color: '#1A2439'
                     }}
                   >
                     {card.class}
                   </h3>
                 </div>

                {/* Bottom Half - Course Features */}
                <div 
                  className="absolute"
                  style={{
                    width: '232px',
                    height: '172px',
                    top: '160px',
                    left: '9px',
                    borderRadius: '14px',
                    backgroundColor: '#1A2439'
                  }}
                >
                  <div className="p-4 h-full flex flex-col">
                    <div className="grid grid-cols-2 gap-2 mb-2 flex-1">
                      {courseFeatures.map((feature, featureIndex) => (
                        <button
                          key={featureIndex}
                          className={`transition-colors duration-300 ${
                            feature === "Olympiad Preparation" ? "col-span-2" : ""
                          }`}
                          style={{
                            width: feature === "Olympiad Preparation" ? 'auto' : '91.71px',
                            height: '22.73px',
                            borderRadius: '9.5px',
                            backgroundColor: '#FFFFFF',
                            color: card.textColor,
                            fontFamily: 'Montserrat',
                            fontWeight: 600,
                            fontSize: '8px',
                            lineHeight: '100%',
                            letterSpacing: '2%',
                            textAlign: 'center',
                            border: 'none',
                            padding: '0'
                          }}
                        >
                          {feature}
                        </button>
                      ))}
                    </div>
                    
                    {/* Book Demo Button */}
                    <div className="flex justify-center">
                      <button 
                        className="transition-colors duration-300"
                        style={{
                          width: '124px',
                          height: '22px',
                          borderRadius: '8px',
                          backgroundColor: '#FED700',
                          color: '#1A2439',
                          fontFamily: 'Montserrat',
                          fontWeight: 600,
                          fontSize: '8px',
                          lineHeight: '100%',
                          letterSpacing: '2%',
                          textAlign: 'center',
                          border: 'none',
                          padding: '0'
                        }}
                      >
                        Book a Demo at ₹19
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {classOptions.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveClass(classOptions[index]);
                  setCurrentSlide(0);
                }}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  activeClass === classOptions[index] ? "bg-blue-600" : "bg-blue-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassSelection;
