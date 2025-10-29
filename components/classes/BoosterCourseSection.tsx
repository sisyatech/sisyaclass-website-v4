"use client";

import React, { useEffect, useState } from "react";
import BoosterCourseCard from "./BoosterCourseCard";
import RevealOnView from "../Reveal/RevealOnView";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/config";

interface BoosterCourseItem {
  title: string;
  startDate: string;
  originalPrice: string;
  currentPrice: string;
}

const BoosterCourseSection = ({ gradeNumber }: { gradeNumber: number }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsEntered, setCardsEntered] = useState(false);
  const [courses, setCourses] = useState<BoosterCourseItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_BIG_COURSE_BY_GRADE}` , {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ grade: String(gradeNumber) })
        });
        if (!response.ok) return;
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const item = data[0];
          const startDate: string = item?.bigCourse?.startDate || '';
          const originalPriceNum: number | undefined = item?.bigCourse?.price;
          const currentPriceNum: number | undefined = item?.bigCourse?.currentPrice;
          const originalPrice = typeof originalPriceNum === 'number' ? `₹ ${originalPriceNum}` : '';
          const currentPrice = typeof currentPriceNum === 'number' ? `₹ ${currentPriceNum}` : '';

          // Show only one course (not per-subject)
          // Format date to a readable form (e.g., 17 Feb 2025)
          const formattedStart = startDate
            ? new Date(startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
            : '';

          const singleCourse: BoosterCourseItem = {
            title: item?.bigCourse?.name || 'Booster Course',
            startDate: formattedStart,
            originalPrice,
            currentPrice,
          };
          setCourses([singleCourse]);
          setCurrentSlide(0);
        }
      } catch (e) {
        // silently ignore; no hardcoded fallback
      }
    };
    fetchData();
  }, [gradeNumber]);

  const handlePrevSlide = () => {
    setCardsEntered(false);
    setCurrentSlide((prev) => (prev === 0 ? courses.length - 1 : prev - 1));
    setTimeout(() => setCardsEntered(true), 300);
  };

  const handleNextSlide = () => {
    setCardsEntered(false);
    setCurrentSlide((prev) => (prev === courses.length - 1 ? 0 : prev + 1));
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
    <div className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <RevealOnView from="top" durationMs={800} delayMs={0}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A2439] mb-4">
              Booster Courses
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Accelerate your learning with our intensive booster courses designed by IIT/NIT experts
            </p>
          </div>
        </RevealOnView>

        {/* Horizontal scrollable list (all screens) */}
        {courses.length === 0 ? (
          <div className="text-center text-sm text-gray-500 py-8">No booster courses found.</div>
        ) : (
          <div className="mt-2 -mx-3 px-3">
            <div className="overflow-x-auto pb-2 hide-scrollbar">
              <div className="flex gap-3 w-max snap-x snap-mandatory">
                {courses.map((course, index) => (
                  <div key={`${course.title}-${index}`} className="snap-center shrink-0 px-1">
                    <RevealOnView from="bottom" durationMs={600} delayMs={index * 120}>
                      <div className="transform scale-[0.9] sm:scale-100 origin-top-left">
                        <BoosterCourseCard
                          title={course.title}
                          startDate={course.startDate}
                          originalPrice={course.originalPrice}
                          currentPrice={course.currentPrice}
                          href={`/grade${gradeNumber}`}
                        />
                      </div>
                    </RevealOnView>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </div>
  );
};

export default BoosterCourseSection;
