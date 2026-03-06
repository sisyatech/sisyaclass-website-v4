import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/config";

interface TeacherData {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  experienceText: string;
  experienceYears: number;
  imageUrl: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const Teachers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [entered, setEntered] = useState(false);
  const [cardsEntered, setCardsEntered] = useState(false);
  const [teachers, setTeachers] = useState<TeacherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Trigger animations immediately on mount
    const timer = setTimeout(() => {
      setEntered(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Fetch teachers from API
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        // //console.log('==============================================');
        //console.log('🚀 [TEACHERS] STARTING API FETCH');

        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_ALL_FACULTY_MEMBER_CARD}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        });

        //console.log('📊 [TEACHERS] Response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          //console.log('✅ [TEACHERS] DATA RECEIVED:', data);

          if (Array.isArray(data) && data.length > 0) {
            // Sort by order field
            const sortedData = data.sort((a: TeacherData, b: TeacherData) => a.order - b.order);
            // //console.log('✅ [TEACHERS] Setting teachers:', sortedData);
            setTeachers(sortedData);
          } else {
            // //console.warn('⚠️ [TEACHERS] No data or invalid format received');
          }
        } else {
          // //console.error('❌ [TEACHERS] API request failed');
        }
      } catch (error) {
        // //console.error('❌ [TEACHERS] FETCH ERROR:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Re-trigger card fade/scale on slide change
  useEffect(() => {
    setCardsEntered(false);
    const timer = setTimeout(() => setCardsEntered(true), 100);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Trigger card animation after loading completes
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setCardsEntered(true), 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const validTeachers = useMemo(() => (
    (teachers || []).filter((t) => typeof t.imageUrl === 'string' && t.imageUrl.trim().length > 0)
  ), [teachers]);

  // Ensure currentSlide is in range when data length changes
  useEffect(() => {
    if (currentSlide >= validTeachers.length) {
      setCurrentSlide(0);
    }
  }, [validTeachers.length, currentSlide]);

  const handlePrevSlide = () => {
    if (validTeachers.length === 0) return;
    setCurrentSlide((prev) => (prev === 0 ? validTeachers.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    if (validTeachers.length === 0) return;
    setCurrentSlide((prev) => (prev >= validTeachers.length - 1 ? 0 : prev + 1));
  };

  // Render only backend data; no local hardcoded fallback

  // Touch handlers for swipe gestures
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
    } else if (isRightSwipe) {
      handlePrevSlide();
    }
  };

  // //console.log('🎨 [TEACHERS] Rendering component');
  // //console.log('🎨 [TEACHERS] Loading:', loading);
  // //console.log('🎨 [TEACHERS] Teachers from API:', teachers);
  // //console.log('🎨 [TEACHERS] Display teachers:', displayTeachers);
  // //console.log('🎨 [TEACHERS] Entered:', entered);
  // //console.log('🎨 [TEACHERS] Cards entered:', cardsEntered);

  // Get visible teachers for desktop (up to 4). Do NOT duplicate when total < 4
  const getVisibleTeachers = (): TeacherData[] => {
    if (validTeachers.length === 0) return [];
    if (validTeachers.length <= 4) return validTeachers;
    const result: TeacherData[] = [];
    for (let i = 0; i < 4; i++) {
      const index = (currentSlide + i) % validTeachers.length;
      result.push(validTeachers[index]);
    }
    return result;
  };

  const visibleTeachers = getVisibleTeachers();

  // Show loading state
  if (loading) {
    // //console.log('⏳ [TEACHERS] Showing loading state');
    return (
      <div className="bg-white py-5 sm:py-0">
        <div className="mx-auto max-w-7xl px-4">
          <div className="py-20 text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[#0595CE]"></div>
            <p className="mt-4 text-gray-600">Loading teachers...</p>
          </div>
        </div>
      </div>
    );
  }

  // //console.log('✅ [TEACHERS] Rendering main content');

  // Don't render if no backend data
  if (validTeachers.length === 0) {
    return null;
  }

  return (
    <div ref={sectionRef} className="bg-white py-5 sm:py-0">
      <div className="mx-auto max-w-7xl px-4">
        {/* Top Headlines */}
        <div
          className={`mb-8 text-center transition-all duration-[1200ms] ease-out sm:mb-10 md:mb-12 ${entered ? "translate-x-0 opacity-100" : "-translate-x-[160px] opacity-0"}`}
        >
          <h3 className="font-montserrat text-center text-[16px] leading-[24px] font-normal text-[#1A2439] sm:text-[19px] sm:leading-[28px] md:text-[22px] md:leading-[32px]">
            Meet the Minds
          </h3>
          <h2 className="font-montserrat mb-4 text-center text-[26px] leading-[32px] font-bold text-[#1A2439] capitalize sm:mb-6 sm:text-[36px] sm:leading-[40px] md:mb-7 md:text-[44px] md:leading-[42px] lg:text-5xl lg:leading-[45px]">
            Behind Your Child's Success
          </h2>
          <p className="font-montserrat px-4 text-center text-[13px] leading-tight font-semibold text-[#556A8E] sm:text-[15px] md:text-[16px] lg:text-[18px]">
            Learn from India's top educators — 98% IIT/NIT-qualified, with years of
            <br className="hidden sm:inline" />
            experience in nurturing young minds.
          </p>
        </div>

        {/* Teachers Carousel */}
        <div
          className={`relative transition-all duration-[1500ms] ease-out ${entered ? "translate-y-0 opacity-100" : "translate-y-[160px] opacity-0"}`}
        >
          {/* Desktop: up to 4 cards (no duplicates when fewer than 4) */}
          <div className="relative hidden lg:block">
            {/* Left Arrow - shown only when more than 4 teachers */}
            {validTeachers.length > 4 && (
              <button
                onClick={handlePrevSlide}
                className="absolute top-1/2 left-0 z-10 flex h-10 w-10 -translate-x-2 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-[14px] border-2 border-[#D9D9D9] bg-white transition-colors duration-300 hover:bg-gray-100"
              >
                <svg
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}

            {/* Cards */}
            <div className="flex justify-center gap-5 px-8 xl:px-16">
              {visibleTeachers.map((teacher, index) => (
                <div
                  key={`${teacher.id}-${index}`}
                  className={`h-[360px] w-[220px] overflow-hidden rounded-[24px] bg-[#2C3E50] p-4 transition-all duration-[400ms] ease-out ${cardsEntered ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                  style={{ transitionDelay: cardsEntered ? `${index * 120}ms` : "0ms" }}
                >
                  {/* Teacher Image */}
                  <div className="mb-3 flex justify-center">
                    <div className="h-[190px] w-[170px] overflow-hidden rounded-[18px] bg-[#D9E3F0]">
                      <Image
                        src={teacher.imageUrl}
                        alt={teacher.name}
                        width={170}
                        height={190}
                        className="h-full w-full object-cover"
                        sizes="(max-width: 1024px) 170px, 170px"
                      />
                    </div>
                  </div>
                  {/* Experience Badge */}
                  <div className="mb-2 flex justify-center">
                    <div className="font-roboto inline-block whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-medium text-[#1A2439]">
                      {teacher.experienceText}
                    </div>
                  </div>
                  {/* Info */}
                  <div className="text-center text-white">
                    <h3 className="font-montserrat mb-2 text-base leading-none font-black tracking-[0.02em]">
                      {teacher.name}
                    </h3>
                    <p className="font-montserrat mb-2 text-[11.5px] leading-none font-semibold tracking-[0.02em]">
                      {teacher.designation}
                    </p>
                    <p className="font-montserrat text-[11.5px] leading-none font-semibold tracking-[0.02em]">
                      {teacher.qualification}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow - shown only when more than 4 teachers */}
            {validTeachers.length > 4 && (
              <button
                onClick={handleNextSlide}
                className="absolute top-1/2 right-0 z-10 flex h-10 w-10 translate-x-2 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-[14px] border-2 border-[#D9D9D9] bg-white transition-colors duration-300 hover:bg-gray-100"
              >
                <svg
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Mobile & Tablet: single card with bottom arrows */}
          <div className="lg:hidden">
            <div className="flex justify-center px-3 sm:px-4 md:px-6">
              {(() => {
                const teacher = validTeachers[currentSlide];
                return (
                  <div
                    key={teacher.id}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    className={`h-[370px] w-[210px] overflow-hidden rounded-[22px] bg-[#2C3E50] p-3.5 transition-all duration-300 ease-in-out min-[375px]:h-[390px] min-[375px]:w-[230px] min-[375px]:rounded-[24px] min-[375px]:p-4 sm:h-[410px] sm:w-[250px] md:h-[420px] md:w-[270px] md:rounded-[26px] md:p-5 touch-none ${cardsEntered ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
                  >
                    <div className="mb-2.5 flex justify-center min-[375px]:mb-3 md:mb-4">
                      <div className="h-[200px] w-[170px] overflow-hidden rounded-[16px] bg-[#D9E3F0] min-[375px]:h-[214px] min-[375px]:w-[186px] min-[375px]:rounded-[18px] sm:h-[230px] sm:w-[200px] md:h-[240px] md:w-[210px] md:rounded-[20px]">
                        <Image
                          src={teacher.imageUrl}
                          alt={teacher.name}
                          width={210}
                          height={240}
                          className="h-full w-full object-cover"
                          sizes="(max-width: 768px) 200px, (max-width: 1024px) 210px, 210px"
                        />
                      </div>
                    </div>
                    <div className="mb-2 flex justify-center md:mb-3">
                      <div className="font-roboto inline-block rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#1A2439] min-[375px]:px-4 min-[375px]:py-2 min-[375px]:text-sm">
                        {teacher.experienceText}
                      </div>
                    </div>
                    <div className="text-center text-white">
                      <h3 className="font-montserrat mb-2 text-[16px] leading-none font-black tracking-[0.02em] min-[375px]:text-[17px] md:mb-3 md:text-[18px]">
                        {teacher.name}
                      </h3>
                      <p className="font-montserrat mb-2 text-[11.5px] leading-none font-semibold tracking-[0.02em] min-[375px]:text-[12.4px] md:mb-3">
                        {teacher.designation}
                      </p>
                      <p className="font-montserrat text-[11.5px] leading-none font-semibold tracking-[0.02em] min-[375px]:text-[12.4px]">
                        {teacher.qualification}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
            {/* Bottom arrows */}
            <div className="mt-4 flex items-center justify-center gap-5 sm:gap-6 md:mt-5">
              <button
                onClick={handlePrevSlide}
                // Reduced size: w-8 h-8 (was w-10 h-10)
                // Reduced border: border (was border-2)
                // Reduced radius: rounded-lg (was rounded-[14px])
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[#D9D9D9] bg-white transition-transform hover:bg-gray-100 active:scale-95"
              >
                {/* Reduced SVG size: w-4 h-4 (was w-5 h-5) */}
                <svg
                  className="h-4 w-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={handleNextSlide}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[#D9D9D9] bg-white transition-transform hover:bg-gray-100 active:scale-95"
              >
                <svg
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teachers;