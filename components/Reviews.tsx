"use client";

import React, { useState } from "react";

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
        <div 
          className="relative mx-auto"
          style={{
            maxWidth: '1086px', // 346px * 3 + 24px * 2 (gaps)
            overflow: 'visible'
          }}
        >
          <div style={{ overflow: 'hidden', padding: '0 20px' }}>
          {/* Cards Container */}
            <div 
              className="flex transition-transform duration-500 ease-in-out py-4"
              style={{
                gap: '24px',
                transform: `translateX(-${currentSlide * 100}%)`
              }}
            >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0"
              >
                {/* Review Card */}
                <div 
                  className="bg-white p-6"
                  style={{
                    width: '346px',
                    height: '257px',
                    borderRadius: '27px',
                    background: '#FFFFFF',
                    boxShadow: '0px 4px 4px 0px #00000040'
                  }}
                >
                  {/* Header with Profile */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      {/* Profile Image */}
                      <div 
                        className="rounded-full overflow-hidden flex-shrink-0"
                        style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: '100px'
                        }}
                      >
                        <img 
                          src={review.image}
                          alt={review.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Name and Grade */}
                      <div>
                        <h3 
                          style={{
                            fontFamily: 'Roboto',
                            fontWeight: 500,
                            fontSize: '16px',
                            lineHeight: '20px',
                            letterSpacing: '3%',
                            color: '#161A38',
                            marginBottom: '4px'
                          }}
                        >
                          {review.name}
                        </h3>
                        <p 
                          style={{
                            fontFamily: 'Roboto',
                            fontWeight: 400,
                            fontSize: '14px',
                            lineHeight: '20px',
                            letterSpacing: '3%',
                            color: '#161A38'
                          }}
                        >
                          {review.grade}
                        </p>
                      </div>
                    </div>

                    {/* Role Badge */}
                    <div 
                      className="flex items-center justify-center"
                      style={{
                        width: '73px',
                        height: '20px',
                        borderRadius: '4.61px',
                        background: '#0595CE',
                        fontFamily: 'Rubik',
                        fontWeight: 400,
                        fontSize: '10.38px',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        textAlign: 'center',
                        color: '#FFFFFF'
                      }}
                    >
                      {review.role}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#161A38'
                    }}
                  >
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

