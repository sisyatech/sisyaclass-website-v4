"use client";

import React, { useState } from "react";
import NextImage from "next/image";
const Reviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const visibleCards = 3;
  const totalSlides = Math.ceil(reviews.length / visibleCards);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        {/* Reviews Carousel Container */}
        <div className="relative mx-auto max-w-[1086px] overflow-visible">
          <div className="overflow-hidden px-5">
          {/* Cards Container */}
            <div 
              className="flex transition-transform duration-500 ease-in-out py-4 gap-6"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0"
              >
                {/* Review Card */}
                <div 
                  className="bg-white p-6 w-[346px] h-[257px] rounded-[27px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                >
                  {/* Header with Profile */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      {/* Profile Image */}
                      <div className="rounded-full overflow-hidden flex-shrink-0 w-[54px] h-[54px]">
                        <NextImage 
                          src={review.image}
                          alt={review.name}
                          width={54}
                          height={54}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Name and Grade */}
                      <div>
                        <h3 className="font-roboto font-medium text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] mb-1">
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
                  <p className="font-roboto font-normal text-[14px] leading-[20px] tracking-[0.03em] text-[#161A38]">
                    {review.review}
                  </p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className="rounded-full transition-all"
              style={{
                width: currentSlide === index ? '12px' : '10px',
                height: currentSlide === index ? '12px' : '10px',
                backgroundColor: currentSlide === index ? '#1A2439' : '#D1D5DB',
                border: 'none',
                cursor: 'pointer'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;

