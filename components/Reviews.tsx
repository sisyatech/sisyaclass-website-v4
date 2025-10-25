"use client";

import React, { useState, useEffect } from "react";
// Import motion for modal animations
import { motion, AnimatePresence } from "framer-motion";

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

// Define character limits for showing "Read more"
const CHAR_LIMIT_MOBILE = 120;
const CHAR_LIMIT_DESKTOP = 150;

const Reviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsEntered, setCardsEntered] = useState(false);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State to manage the review modal
  const [selectedReview, setSelectedReview] = useState<ReviewData | null>(null);

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://sisyaclass.xyz/student/get_testimonial_card', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });

        if (response.ok) {
          const data: ReviewData[] = await response.json();
          const sortedData = data
            .sort((a, b) => a.order - b.order)
            .map(review => ({
              ...review,
              imageUrl: review.profileImage || review.imageUrl || '/girl.svg', // Use placeholder
              class: review.class || review.grade || 'Student',
              review: review.content || review.review || 'Great experience!',
            }));
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

  if (loading) {
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

  if (reviews.length === 0) {
    return null;
  }
  
  const currentReview = reviews[currentSlide];
  const isMobileReviewTruncated = currentReview?.review && currentReview.review.length > CHAR_LIMIT_MOBILE;

  return (
    <>
      {/* CSS to hide the scrollbar */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
      
      <div className="py-20 bg-white overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4">
          {/* Reviews Carousel Container */}
          <div className="relative mx-auto w-full">
            {/* Mobile: Single card with dots */}
            <div className="md:hidden">
              <div className="flex justify-center px-4">
                {currentReview && (
                  <div 
                    key={currentSlide}
                    className="bg-white p-4 w-[280px] h-[220px] rounded-[20px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] flex flex-col"
                  >
                    {/* Header with Profile - UPDATED FOR FLEXBOX */}
                    <div className="flex items-start justify-between mb-3 gap-3">
                      {/* Left side: Image + Name/Grade - Added flex-1 and min-w-0 */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Profile Image */}
                        <div className="rounded-full overflow-hidden flex-shrink-0 w-[44px] h-[44px] bg-gray-200">
                          {currentReview.imageUrl && (
                            <img 
                              src={currentReview.imageUrl}
                              alt={currentReview.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://placehold.co/50x50/EBF8FF/3182CE?text=S'; // Fallback
                              }}
                            />
                          )}
                        </div>

                        {/* Name and Grade - Added flex-1 and min-w-0 */}
                        <div className="flex-1 min-w-0">
                          {/* Removed max-w-[150px] and let truncate work */}
                          <h3 className="font-roboto font-medium text-[14px] leading-[18px] tracking-[0.03em] text-[#161A38] mb-0.5 truncate">
                            {currentReview.name}
                          </h3>
                          <p className="font-roboto font-normal text-[12px] leading-[16px] tracking-[0.03em] text-[#161A38]">
                            {currentReview.class}
                          </p>
                        </div>
                      </div>

                      {/* Role Badge - Removed fixed width w-[64px] and added px-2 */}
                      <div className="flex-shrink-0 flex items-center justify-center h-[18px] rounded-[4.61px] bg-[#0595CE] font-rubik font-normal text-[9.5px] leading-none text-center text-white px-2">
                        {currentReview.role}
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="font-roboto font-normal text-[12px] leading-[18px] tracking-[0.03em] text-[#161A38] overflow-hidden flex-1" style={{ display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical' as any }}>
                      {currentReview.review}
                    </p>
                    
                    {/* Read more button for mobile */}
                    {isMobileReviewTruncated && (
                      <button
                        onClick={() => setSelectedReview(currentReview)}
                        className="text-[#0595CE] font-semibold text-xs mt-1 text-left self-start cursor-pointer"
                      >
                        Read more
                      </button>
                    )}
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
              {/* Added 'hide-scrollbar' class here */}
              <div className="overflow-x-auto px-4 pb-2 hide-scrollbar">
                <div className="flex py-3 gap-5 w-max snap-x snap-mandatory">
                  {reviews.map((review) => {
                    const isDesktopReviewTruncated = review.review && review.review.length > CHAR_LIMIT_DESKTOP;
                    return (
                      <div
                        key={review.id}
                        className="flex-shrink-0 snap-center"
                      >
                        {/* Review Card */}
                        <div className="bg-white p-5 w-[300px] h-[230px] rounded-[20px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] flex flex-col">
                          {/* Header with Profile - UPDATED FOR FLEXBOX */}
                          <div className="flex items-start justify-between mb-3 gap-3">
                            {/* Left Side: Image + Name/Grade - Added flex-1 and min-w-0 */}
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              {/* Profile Image */}
                              <div className="rounded-full overflow-hidden flex-shrink-0 w-[50px] h-[50px] bg-gray-200">
                                {review.imageUrl && (
                                  <img 
                                    src={review.imageUrl}
                                    alt={review.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = 'https://placehold.co/50x50/EBF8FF/3182CE?text=S'; // Fallback
                                    }}
                                  />
                                )}
                              </div>
                              {/* Name and Grade - Added flex-1 and min-w-0 */}
                              <div className="flex-1 min-w-0">
                                {/* Removed max-w-[200px] and let truncate work */}
                                <h3 className="font-roboto font-medium text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] mb-0.5 truncate">
                                  {review.name}
                                </h3>
                                <p className="font-roboto font-normal text-[14px] leading-[20px] tracking-[0.03em] text-[#161A38]">
                                  {review.class}
                                </p>
                              </div>
                            </div>
                            {/* Role Badge - Removed fixed width w-[73px] and added px-3 */}
                            <div className="flex-shrink-0 flex items-center justify-center h-[20px] rounded-[4.61px] bg-[#0595CE] font-rubik font-normal text-[10.38px] leading-none text-center text-white px-3">
                              {review.role}
                            </div>
                          </div>
                          {/* Review Text */}
                          <p className="font-roboto font-normal text-[14px] leading-[20px] tracking-[0.03em] text-[#161A38] overflow-hidden flex-1" style={{ display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical' as any }}>
                            {review.review}
                          </p>
                          {/* Read more button for desktop */}
                          {isDesktopReviewTruncated && (
                            <button
                              onClick={() => setSelectedReview(review)}
                              className="text-[#0595CE] font-semibold text-sm mt-1 text-left self-start cursor-pointer"
                            >
                              Read more
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Review Modal */}
      <AnimatePresence>
        {selectedReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedReview(null)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
              className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full overflow-hidden flex-shrink-0 w-12 h-12 bg-gray-200">
                    <img 
                      src={selectedReview.imageUrl}
                      alt={selectedReview.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/50x50/EBF8FF/3182CE?text=S';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-roboto font-medium text-lg text-[#161A38]">
                      {selectedReview.name}
                    </h3>
                    <p className="font-roboto font-normal text-sm text-gray-600">
                      {selectedReview.class} ({selectedReview.role})
                    </p>
                  </div>
                </div>
                
                {/* Modal Content */}
                <div className="max-h-[60vh] overflow-y-auto pr-2">
                  <p className="font-roboto font-normal text-base leading-relaxed text-gray-700 whitespace-pre-wrap">
                    {selectedReview.review}
                  </p>
                </div>
                
                {/* Modal Footer */}
                <div className="text-right mt-6">
                  <button
                    onClick={() => setSelectedReview(null)}
                    className="bg-[#0595CE] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#047aa8] transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Reviews;