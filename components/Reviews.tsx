"use client";

import React, { useState } from "react";
import NextImage from "next/image";
const Reviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // kept for potential future use

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

  // switched to native horizontal scroll; pagination unused for now

  return (
    <div className="py-20 bg-white overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4">
        {/* Reviews Carousel Container */}
        <div className="relative mx-auto w-full">
          <div className="overflow-x-auto px-4 pb-2">
          {/* Cards Container - horizontal scroll */}
            <div 
              className="flex py-3 gap-4 sm:gap-5 w-max snap-x snap-mandatory"
            >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 snap-center"
              >
                {/* Review Card */}
                <div 
                  className="bg-white p-4 sm:p-5 w-[240px] h-[210px] sm:w-[300px] sm:h-[230px] rounded-[20px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                >
                  {/* Header with Profile */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {/* Profile Image */}
                      <div className="rounded-full overflow-hidden flex-shrink-0 w-[44px] h-[44px] sm:w-[50px] sm:h-[50px]">
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
                        <h3 className="font-roboto font-medium text-[14px] leading-[18px] sm:text-[16px] sm:leading-[20px] tracking-[0.03em] text-[#161A38] mb-0.5 truncate max-w-[150px] sm:max-w-[200px]">
                          {review.name}
                        </h3>
                        <p className="font-roboto font-normal text-[12px] leading-[16px] sm:text-[14px] sm:leading-[20px] tracking-[0.03em] text-[#161A38]">
                          {review.grade}
                        </p>
                      </div>
                    </div>

                    {/* Role Badge */}
                    <div className="flex items-center justify-center w-[64px] h-[18px] sm:w-[73px] sm:h-[20px] rounded-[4.61px] bg-[#0595CE] font-rubik font-normal text-[9.5px] sm:text-[10.38px] leading-none text-center text-white">
                      {review.role}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="font-roboto font-normal text-[12px] leading-[18px] sm:text-[14px] sm:leading-[20px] tracking-[0.03em] text-[#161A38] overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 6, WebkitBoxOrient: 'vertical' as any }}>
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
  );
};

export default Reviews;

