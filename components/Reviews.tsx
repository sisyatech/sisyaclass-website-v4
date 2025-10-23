"use client";

import React, { useState, useEffect } from "react";
import NextImage from "next/image";

interface ReviewData {
  id: string;
  name: string;
  class?: string;
  grade?: string;
  role: string;
  review?: string;
  content?: string;
  imageUrl?: string;
  profileImage?: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

const Reviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsEntered, setCardsEntered] = useState(false);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // console.log('🚀 [REVIEWS] Fetching data from API...');
        
        const response = await fetch('https://sisyaclass.xyz/student/get_testimonial_card', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });

        if (response.ok) {
          const data: ReviewData[] = await response.json();
          // console.log('✅ [REVIEWS] Data received:', data);
          
          // Sort by order field and normalize field names
          const sortedData = data
            .sort((a, b) => a.order - b.order)
            .map(review => ({
              ...review,
              // Map profileImage to imageUrl
              imageUrl: review.profileImage || review.imageUrl || '/girl.svg',
              // Map grade to class if class is not present
              class: review.class || review.grade || 'Student',
              // Map content to review if review is not present
              review: review.content || review.review || 'Great experience!',
            }));
          
          // console.log('✅ [REVIEWS] Processed reviews:', sortedData);
          setReviews(sortedData);
        } else {
          // console.error('❌ [REVIEWS] API request failed');
        }
      } catch (error) {
        // console.error('❌ [REVIEWS] Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

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

  // console.log('🎨 [REVIEWS] Rendering component');
  // console.log('🎨 [REVIEWS] Loading:', loading);
  // console.log('🎨 [REVIEWS] Reviews:', reviews);
  // console.log('🎨 [REVIEWS] Reviews length:', reviews.length);
  // console.log('🎨 [REVIEWS] Current slide:', currentSlide);
  // console.log('🎨 [REVIEWS] Cards entered:', cardsEntered);
  // console.log('🎨 [REVIEWS] Current review:', reviews[currentSlide]);
  
  // Show loading state
  if (loading) {
    // console.log('⏳ [REVIEWS] Showing loading state');
    return (
      <div className="py-20 bg-white overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0595CE] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading reviews...</p>
          </div>
        </div>
      </div>
    );
  }

  // Don't render if no reviews
  if (reviews.length === 0) {
    // console.log('⚠️ [REVIEWS] No reviews to display');
    return null;
  }

  // console.log('✅ [REVIEWS] Rendering reviews content');

  return (
    <div className="py-20 bg-white overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4">
        {/* Reviews Carousel Container */}
        <div className="relative mx-auto w-full">
          {/* Mobile: Single card with dots */}
          <div className="md:hidden">
            <div className="flex justify-center px-4">
              {reviews[currentSlide] && (
                <div 
                  key={currentSlide}
                  className="bg-white p-4 w-[280px] h-[220px] rounded-[20px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                >
                {/* Header with Profile */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {/* Profile Image */}
                    <div className="rounded-full overflow-hidden flex-shrink-0 w-[44px] h-[44px] bg-gray-200">
                      {reviews[currentSlide].imageUrl && (
                        <img 
                          src={reviews[currentSlide].imageUrl}
                          alt={reviews[currentSlide].name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/girl.svg';
                          }}
                        />
                      )}
                    </div>

                    {/* Name and Grade */}
                    <div>
                      <h3 className="font-roboto font-medium text-[14px] leading-[18px] tracking-[0.03em] text-[#161A38] mb-0.5 truncate max-w-[150px]">
                        {reviews[currentSlide].name}
                      </h3>
                      <p className="font-roboto font-normal text-[12px] leading-[16px] tracking-[0.03em] text-[#161A38]">
                        {reviews[currentSlide].class}
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
              )}
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
                          <div className="rounded-full overflow-hidden flex-shrink-0 w-[50px] h-[50px] bg-gray-200">
                            {review.imageUrl && (
                              <img 
                                src={review.imageUrl}
                          alt={review.name}
                          className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = '/girl.svg';
                                }}
                        />
                            )}
                      </div>

                      {/* Name and Grade */}
                      <div>
                            <h3 className="font-roboto font-medium text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] mb-0.5 truncate max-w-[200px]">
                          {review.name}
                        </h3>
                            <p className="font-roboto font-normal text-[14px] leading-[20px] tracking-[0.03em] text-[#161A38]">
                              {review.class}
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

