"use client";

import React, { useState } from "react";
import NextImage from "next/image";
const Reviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsEntered, setCardsEntered] = useState(false);

  const reviews = [
    {
      id: 1,
      name: "Shivaji Kamble",
      grade: "Grade 7",
      role: "Student",
      image: "/girl.svg",
      review: "We enrolled our daughter Riddhima in Sisya E-Learning Classes for Standard 1, and we are truly happy with the experience! The teachers are very kind, patient, and engaging, which makes learning enjoyable for young children. The class content is well-structured and age-appropriate, blending fun with education perfectly."
    },
    {
      id: 2,
      name: "Shivaji Kamble",
      grade: "Grade 7",
      role: "Student",
      image: "/girl.svg",
      review: "We enrolled our daughter Riddhima in Sisya E-Learning Classes for Standard 1, and we are truly happy with the experience! The teachers are very kind, patient, and engaging, which makes learning enjoyable for young children. The class content is well-structured and age-appropriate, blending fun with education perfectly."
    },
    {
      id: 3,
      name: "Shivaji Kamble",
      grade: "Grade 7",
      role: "Student",
      image: "/girl.svg",
      review: "We enrolled our daughter Riddhima in Sisya E-Learning Classes for Standard 1, and we are truly happy with the experience! The teachers are very kind, patient, and engaging, which makes learning enjoyable for young children. The class content is well-structured and age-appropriate, blending fun with education perfectly."
    },
    {
      id: 4,
      name: "Shivaji Kamble",
      grade: "Grade 7",
      role: "Student",
      image: "/girl.svg",
      review: "We enrolled our daughter Riddhima in Sisya E-Learning Classes for Standard 1, and we are truly happy with the experience! The teachers are very kind, patient, and engaging, which makes learning enjoyable for young children. The class content is well-structured and age-appropriate, blending fun with education perfectly."
    },
    {
      id: 5,
      name: "Shivaji Kamble",
      grade: "Grade 7",
      role: "Student",
      image: "/girl.svg",
      review: "We enrolled our daughter Riddhima in Sisya E-Learning Classes for Standard 1, and we are truly happy with the experience! The teachers are very kind, patient, and engaging, which makes learning enjoyable for young children. The class content is well-structured and age-appropriate, blending fun with education perfectly."
    }
  ];

  const handlePrevSlide = () => {
    setCardsEntered(false);
    setCurrentSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
    setTimeout(() => setCardsEntered(true), 300);
  };

  const handleNextSlide = () => {
    setCardsEntered(false);
    setCurrentSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    setTimeout(() => setCardsEntered(true), 300);
  };

  const handleDotClick = (index: number) => {
    setCardsEntered(false);
    setCurrentSlide(index);
    setTimeout(() => setCardsEntered(true), 300);
  };

  // Initialize cards animation
  React.useEffect(() => {
    setCardsEntered(true);
  }, []);

  return (
    <div className="py-20 bg-white overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4">
        {/* Reviews Carousel Container */}
        <div className="relative mx-auto w-full">
          {/* Mobile: Single card with dots */}
          <div className="md:hidden">
            <div className="flex justify-center px-4">
              <div 
                key={currentSlide}
                className={`bg-white p-4 w-[280px] h-[220px] rounded-[20px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] transition-all duration-[600ms] ease-in-out ${
                  cardsEntered ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
              >
                {/* Header with Profile */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {/* Profile Image */}
                    <div className="rounded-full overflow-hidden flex-shrink-0 w-[44px] h-[44px]">
                      <NextImage 
                        src={reviews[currentSlide].image}
                        alt={reviews[currentSlide].name}
                        width={44}
                        height={44}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Name and Grade */}
                    <div>
                      <h3 className="font-roboto font-medium text-[14px] leading-[18px] tracking-[0.03em] text-[#161A38] mb-0.5 truncate max-w-[150px]">
                        {reviews[currentSlide].name}
                      </h3>
                      <p className="font-roboto font-normal text-[12px] leading-[16px] tracking-[0.03em] text-[#161A38]">
                        {reviews[currentSlide].grade}
                      </p>
                    </div>
                  </div>

                  {/* Role Badge */}
                  <div className="flex items-center justify-center w-[64px] h-[18px] rounded-[4.61px] bg-[#0595CE] font-rubik font-normal text-[9.5px] leading-none text-center text-white">
                    {reviews[currentSlide].role}
                  </div>
                </div>

                {/* Review Text */}
                <p className="font-roboto font-normal text-[12px] leading-[18px] tracking-[0.03em] text-[#161A38] overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 6, WebkitBoxOrient: 'vertical' as any }}>
                  {reviews[currentSlide].review}
                </p>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-[#0595CE] w-6" : "bg-gray-300"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center mt-4 space-x-6">
              <button 
                onClick={handlePrevSlide}
                className="w-10 h-10 border-2 border-[#D9D9D9] rounded-[14px] bg-white flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all duration-300 hover:shadow-md group"
                aria-label="Previous review"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-500 group-hover:-translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={handleNextSlide}
                className="w-10 h-10 border-2 border-[#D9D9D9] rounded-[14px] bg-white flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all duration-300 hover:shadow-md group"
                aria-label="Next review"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop/Tablet: Horizontal scroll */}
          <div className="hidden md:block">
            <div className="overflow-x-auto px-4 pb-2">
              <div className="flex py-3 gap-5 w-max snap-x snap-mandatory">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex-shrink-0 snap-center"
                  >
                    {/* Review Card */}
                    <div className="bg-white p-5 w-[300px] h-[230px] rounded-[20px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                      {/* Header with Profile */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {/* Profile Image */}
                          <div className="rounded-full overflow-hidden flex-shrink-0 w-[50px] h-[50px]">
                            <NextImage 
                              src={review.image}
                              alt={review.name}
                              width={50}
                              height={50}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Name and Grade */}
                          <div>
                            <h3 className="font-roboto font-medium text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] mb-0.5 truncate max-w-[200px]">
                              {review.name}
                            </h3>
                            <p className="font-roboto font-normal text-[14px] leading-[20px] tracking-[0.03em] text-[#161A38]">
                              {review.grade}
                            </p>
                          </div>
                        </div>

                        {/* Role Badge */}
                        <div className="flex items-center justify-center w-[73px] h-[20px] rounded-[4.61px] bg-[#0595CE] font-rubik font-normal text-[10.38px] leading-none text-center text-white">
                          {review.role}
                        </div>
                      </div>

                      {/* Review Text */}
                      <p className="font-roboto font-normal text-[14px] leading-[20px] tracking-[0.03em] text-[#161A38] overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 6, WebkitBoxOrient: 'vertical' as any }}>
                        {review.review}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;

