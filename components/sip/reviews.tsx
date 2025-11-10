"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/config";

type ReviewData = {
  id: string;
  name: string;
  class?: string;
  grade?: string;
  role: string;
  review?: string;
  content?: string;
  imageUrl?: string;
  profileImage?: string;
  isVisible?: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
};

const CHAR_LIMIT_MOBILE = 120;
const CHAR_LIMIT_DESKTOP = 150;

const Reviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsEntered, setCardsEntered] = useState(false);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [selectedReview, setSelectedReview] = useState<ReviewData | null>(null);
  const [ratingEntered, setRatingEntered] = useState(false);

  const play = "https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&hl=en";
  const trustpilot = "https://www.trustpilot.com/review/sisyaclass.com";
  const googlelink = "https://share.google/TywRWQy6icOvyHVg2";

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_TESTIMONIAL_CARD}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        });

        if (response.ok) {
          const data: ReviewData[] = await response.json();
          const visibleData = (Array.isArray(data) ? data : []).filter((r) => r.isVisible === true);
          const sortedData = visibleData
            .sort((a, b) => a.order - b.order)
            .map((review) => ({
              ...review,
              imageUrl: review.profileImage || review.imageUrl || "/girl.svg",
              class: review.class || review.grade || "Student",
              review: review.content || review.review || "Great experience!",
            }));
          setReviews(sortedData);
        }
      } catch (error) {
        // console.error("[REVIEWS] Fetch error", error);
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
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 2000);
  };

  const handleNextSlide = () => {
    setCardsEntered(false);
    setCurrentSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    setTimeout(() => setCardsEntered(true), 300);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 2000);
  };

  const handleDotClick = (index: number) => {
    setCardsEntered(false);
    setCurrentSlide(index);
    setTimeout(() => setCardsEntered(true), 300);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 2000);
  };

  useEffect(() => {
    setCardsEntered(true);
    const id = requestAnimationFrame(() => setRatingEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!isPaused && reviews.length > 0) {
      const interval = setInterval(() => {
        setCardsEntered(false);
        setCurrentSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
        setTimeout(() => setCardsEntered(true), 300);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isPaused, reviews.length]);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNextSlide();
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 2000);
    } else if (isRightSwipe) {
      handlePrevSlide();
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="py-6 bg-white overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center py-6">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[#0595CE]"></div>
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
  const desktopVisibleReviews = (() => {
    if (reviews.length === 0) {
      return [] as ReviewData[];
    }
    const count = Math.min(2, reviews.length);
    return Array.from({ length: count }, (_, idx) => reviews[(currentSlide + idx) % reviews.length]);
  })();

  return (
    <>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="py-6 bg-white overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            <div className="w-full lg:max-w-[420px] lg:pt-10">
              <div className="flex w-full flex-col items-center space-y-4 lg:items-start">
                <div
                  className={`relative min-h-[118px] w-full max-w-[460px] rounded-[16px] bg-white p-4 shadow-[0_0_4px_0_rgba(0,0,0,0.25)] transition-all duration-1000 ease-out sm:rounded-[20px] lg:rounded-[22px] ${
                    ratingEntered ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                >
                  <div className="mb-2 text-center">
                    <span className="inline-block font-[Roboto_Serif] text-[18px] leading-[28px] font-semibold tracking-[0.03em] text-[#626AB5] sm:text-[22px] sm:leading-[34px] lg:text-[25.26px] lg:leading-[54.85px]">
                      4.5/5
                    </span>
                  </div>

                  <div className="relative mb-3 flex items-center justify-center">
                    <div className="flex items-center space-x-1">
                      {[...Array(4)].map((_, i) => (
                        <Image
                          key={i}
                          src="heropics/fullstar.svg"
                          alt="Full Star"
                          width={20}
                          height={20}
                          className="h-4 w-4 sm:h-5 sm:w-5"
                        />
                      ))}
                      <Image
                        src="heropics/halfstar.svg"
                        alt="Half Star"
                        width={20}
                        height={20}
                        className="h-4 w-4 sm:h-5 sm:w-5"
                      />
                    </div>

                    <svg
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 transform"
                      width="70"
                      height="9"
                      viewBox="0 0 80 10"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M 10 8 Q 40 0 70 8" stroke="#9CA3AF" strokeWidth="1" fill="none" />
                    </svg>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                      <a
                        href={trustpilot}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Trustpilot Reviews"
                      >
                        <Image
                          src="heropics/trust.svg"
                          alt="Trustpilot"
                          width={110}
                          height={27}
                          className="h-[22px] w-[88px] sm:h-[24px] sm:w-[100px] lg:h-[27.09px] lg:w-[110.26px]"
                        />
                      </a>

                      <a
                        href={play}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Google Play Store"
                      >
                        <Image
                          src="heropics/google play.svg"
                          alt="Google Play"
                          width={110}
                          height={27}
                          className="h-[22px] w-[88px] sm:h-[24px] sm:w-[100px] lg:h-[27.09px] lg:w-[110.26px]"
                        />
                      </a>

                      <a
                        href={googlelink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Google My Business Reviews"
                      >
                        <Image
                          src="heropics/google.svg"
                          alt="Google My Business"
                          width={110}
                          height={27}
                          className="h-[22px] w-[88px] sm:h-[24px] sm:w-[100px] lg:h-[27.09px] lg:w-[110.26px]"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full flex-1">
              <div
                className="md:hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="flex justify-center px-4">
                  {currentReview && (
                    <div
                      key={currentSlide}
                      onTouchStart={onTouchStart}
                      onTouchMove={onTouchMove}
                      onTouchEnd={onTouchEnd}
                      className="flex h-[260px] w-[340px] flex-col touch-none rounded-[20px] bg-white p-5 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="flex min-w-0 flex-1 items-center gap-3">
                          <div className="h-[50px] w-[50px] flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                            {currentReview.imageUrl && (
                              <Image
                                src={currentReview.imageUrl}
                                alt={currentReview.name}
                                width={50}
                                height={50}
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="mb-0.5 truncate font-roboto text-[15px] font-medium leading-[19px] tracking-[0.03em] text-[#161A38]">
                              {currentReview.name}
                            </h3>
                            <p className="font-roboto text-[13px] font-normal leading-[17px] tracking-[0.03em] text-[#161A38]">
                              {currentReview.class}
                            </p>
                          </div>
                        </div>
                        <div className="flex h-[20px] items-center justify-center rounded-[4.61px] bg-[#0595CE] px-2.5 font-rubik text-[10px] font-normal leading-none text-white">
                          {currentReview.role}
                        </div>
                      </div>

                      <p
                        className="flex-1 overflow-hidden font-roboto text-[13px] font-normal leading-[19px] tracking-[0.03em] text-[#161A38]"
                        style={{ display: "-webkit-box", WebkitLineClamp: 6, WebkitBoxOrient: "vertical" as any }}
                      >
                        {currentReview.review}
                      </p>

                      {isMobileReviewTruncated && (
                        <button
                          onClick={() => setSelectedReview(currentReview)}
                          className="mt-1 self-start text-xs font-semibold text-[#0595CE]"
                        >
                          Read more
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-center space-x-2">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide ? "w-6 bg-[#0595CE]" : "w-2 bg-gray-300"
                      }`}
                      aria-label={`Go to review ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="mt-4 flex justify-center space-x-6">
                  <button
                    onClick={handlePrevSlide}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D9D9D9] bg-white transition-transform hover:bg-gray-100 active:scale-95"
                    aria-label="Previous review"
                  >
                    <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D9D9D9] bg-white transition-transform hover:bg-gray-100 active:scale-95"
                    aria-label="Next review"
                  >
                    <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="relative flex items-center justify-center">
                  {reviews.length > 2 && (
                    <button
                      onClick={handlePrevSlide}
                      className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-[14px] border-2 border-[#D9D9D9] bg-white text-[#111826] shadow-[0_8px_18px_rgba(17,24,38,0.12)] transition-transform duration-200 hover:bg-gray-100 hover:scale-105"
                      aria-label="Previous review set"
                    >
                      <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 21L3 12L11 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}

                  <div className="flex w-full justify-center gap-8 px-14">
                    {desktopVisibleReviews.map((review, index) => {
                      const isDesktopReviewTruncated = review.review && review.review.length > CHAR_LIMIT_DESKTOP;
                      return (
                        <div
                          key={`${review.id}-${index}`}
                          className={`flex h-[230px] w-full max-w-[300px] flex-col rounded-[20px] bg-white p-5 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] transition-all duration-500 ${
                            cardsEntered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                          }`}
                          style={{ transitionDelay: cardsEntered ? `${index * 120}ms` : "0ms" }}
                        >
                          <div className="mb-3 flex items-start justify-between gap-3">
                            <div className="flex min-w-0 flex-1 items-center gap-3">
                              <div className="h-[50px] w-[50px] flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                                {review.imageUrl && (
                                  <Image
                                    src={review.imageUrl}
                                    alt={review.name}
                                    width={50}
                                    height={50}
                                    className="h-full w-full object-cover"
                                  />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="mb-0.5 truncate font-roboto text-[16px] font-medium leading-[20px] tracking-[0.03em] text-[#161A38]">
                                  {review.name}
                                </h3>
                                <p className="font-roboto text-[14px] font-normal leading-[20px] tracking-[0.03em] text-[#161A38]">
                                  {review.class}
                                </p>
                              </div>
                            </div>
                            <div className="flex h-[20px] flex-shrink-0 items-center justify-center rounded-[4.61px] bg-[#0595CE] px-3 font-rubik text-[10.38px] font-normal leading-none text-white">
                              {review.role}
                            </div>
                          </div>

                          <p
                            className="flex-1 overflow-hidden font-roboto text-[14px] font-normal leading-[20px] tracking-[0.03em] text-[#161A38]"
                            style={{ display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical" as any }}
                          >
                            {review.review}
                          </p>

                          {isDesktopReviewTruncated && (
                            <button
                              onClick={() => setSelectedReview(review)}
                              className="mt-1 self-start text-sm font-semibold text-[#0595CE]"
                            >
                              Read more
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {reviews.length > 2 && (
                    <button
                      onClick={handleNextSlide}
                      className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-[14px] border-2 border-[#D9D9D9] bg-white text-[#111826] shadow-[0_8px_18px_rgba(17,24,38,0.12)] transition-transform duration-200 hover:bg-gray-100 hover:scale-105"
                      aria-label="Next review set"
                    >
                      <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 3L11 12L3 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="mt-6 flex justify-center space-x-2">
                  {reviews.map((_, index) => (
                    <button
                      key={`desktop-dot-${index}`}
                      onClick={() => handleDotClick(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide ? "w-6 bg-[#0595CE]" : "w-2 bg-gray-300"
                      }`}
                      aria-label={`Go to review ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedReview(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-xl"
            >
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-200">
                    <Image
                      src={selectedReview.imageUrl || "/girl.svg"}
                      alt={selectedReview.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-roboto text-lg font-medium text-[#161A38]">{selectedReview.name}</h3>
                    <p className="font-roboto text-sm font-normal text-gray-600">
                      {selectedReview.class} ({selectedReview.role})
                    </p>
                  </div>
                </div>

                <div className="max-h-[60vh] overflow-y-auto pr-2">
                  <p className="font-roboto text-base font-normal leading-relaxed text-gray-700 whitespace-pre-wrap">
                    {selectedReview.review}
                  </p>
                </div>

                <div className="mt-6 text-right">
                  <button
                    onClick={() => setSelectedReview(null)}
                    className="rounded-lg bg-[#0595CE] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#047aa8]"
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
