"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import RevealOnView from "../Reveal/RevealOnView";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/config";

interface Chapter {
  id: number;
  subjectWebId: number;
  title: string;
  chapterNumber: number;
  syllabusPoints: string[];
}

interface SubjectData {
  id: number;
  bigCourseWebId: number;
  name: string;
  subtitle: string;
  taglinePoints: string[];
  chapters: Chapter[];
}

interface BigCourseData {
  id: number;
  courseDemoPrice: number;
  webLabel: string;
  courseVideoLink: string;
  bigCourse: {
    name: string;
    startDate: string;
    endDate: string;
  };
  subjects: SubjectData[];
}

const SyllabusSection = ({ gradeNumber }: { gradeNumber?: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [courseData, setCourseData] = useState<BigCourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);

  // Subject styling configuration
  const subjectStyles: { [key: string]: { iconBg: string; titleColor: string; buttonBg: string } } = {
    Mathematics: {
      iconBg: "bg-[#DDDEFE]",
      titleColor: "text-[#575CFB]",
      buttonBg: "bg-[#575CFB]"
    },
    Maths: {
      iconBg: "bg-[#DDDEFE]",
      titleColor: "text-[#575CFB]",
      buttonBg: "bg-[#575CFB]"
    },
    Math: {
      iconBg: "bg-[#DDDEFE]",
      titleColor: "text-[#575CFB]",
      buttonBg: "bg-[#575CFB]"
    },
    Science: {
      iconBg: "bg-[#41AC7D4D]",
      titleColor: "text-[#41AC7D]",
      buttonBg: "bg-[#41AC7D]"
    },
    Physics: {
      iconBg: "bg-[#41AC7D4D]",
      titleColor: "text-[#41AC7D]",
      buttonBg: "bg-[#41AC7D]"
    },
    Chemistry: {
      iconBg: "bg-[#41AC7D4D]",
      titleColor: "text-[#41AC7D]",
      buttonBg: "bg-[#41AC7D]"
    },
    English: {
      iconBg: "bg-[#FAE9E8]",
      titleColor: "text-[#E78F8E]",
      buttonBg: "bg-[#E78F8E]"
    }
  };

  // Helper function to get subject style with flexible matching
  const getSubjectStyle = (subjectName: string) => {
    const normalized = subjectName.trim();
    // Try exact match first
    if (subjectStyles[normalized]) {
      return subjectStyles[normalized];
    }
    // Try case-insensitive match
    const lowerName = normalized.toLowerCase();
    for (const [key, value] of Object.entries(subjectStyles)) {
      if (key.toLowerCase() === lowerName) {
        return value;
      }
    }
    // Try partial match for common variations
    if (lowerName.includes('math')) {
      return subjectStyles.Mathematics;
    }
    if (lowerName.includes('science') || lowerName.includes('physics') || lowerName.includes('chemistry') || lowerName.includes('bio')) {
      return subjectStyles.Science;
    }
    if (lowerName.includes('english') || lowerName.includes('eng')) {
      return subjectStyles.English;
    }
    // Default to Mathematics
    return subjectStyles.Mathematics;
  };

  // Helper function to determine which icon to show
  const getSubjectIcon = (subjectName: string) => {
    const lowerName = subjectName.toLowerCase();
    if (lowerName.includes('math')) {
      return 'math';
    }
    if (lowerName.includes('science') || lowerName.includes('physics') || lowerName.includes('chemistry') || lowerName.includes('bio')) {
      return 'science';
    }
    if (lowerName.includes('english') || lowerName.includes('eng')) {
      return 'english';
    }
    return 'math'; // default
  };

  // Fetch course data from API
  useEffect(() => {
    const fetchCourseData = async () => {
      if (!gradeNumber) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}${API_ENDPOINTS.GET_BIG_COURSE_BY_GRADE}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              grade: gradeNumber.toString()
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            // Get the course query parameter and filter the data
            const desiredLabel = (searchParams?.get('course') || '').toLowerCase();
            let picked = data[0];
            
            if (desiredLabel) {
              // Try exact match first
              const exact = data.find((d: BigCourseData) => 
                String(d?.webLabel || '').toLowerCase() === desiredLabel
              );
              // Fallback to partial match
              const partial = exact || data.find((d: BigCourseData) => 
                String(d?.webLabel || '').toLowerCase().includes(desiredLabel)
              );
              if (partial) picked = partial;
            }
            
            setCourseData(picked);
            // Reset mobile index when course data changes
            // setMobileIndex(0); // This line is removed as per the edit hint
            // setCurrentPage(0); // This line is removed as per the edit hint
          }
        }
      } catch (error) {
        //console.error("Error fetching syllabus data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [gradeNumber, searchParams]);

  // Map API subjects to component format
  const subjects = courseData?.subjects.map((subject) => {
    const style = getSubjectStyle(subject.name);
    const iconType = getSubjectIcon(subject.name);
    return {
      id: subject.id,
      title: subject.name,
      subtitle: subject.subtitle,
      iconBg: style.iconBg,
      titleColor: style.titleColor,
      buttonBg: style.buttonBg,
      buttonText: `Explore ${subject.name} Subject`,
      topics: subject.taglinePoints,
      iconType,
      showExploreButton: iconType !== 'english'
    };
  }) || [];

  const scrollContainer = (ref: { current: HTMLDivElement | null }, direction: -1 | 1) => {
    const container = ref.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.85 || 320;
    container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  };

  const handleMobilePrev = () => scrollContainer(mobileScrollRef, -1);
  const handleMobileNext = () => scrollContainer(mobileScrollRef, 1);
  const handleDesktopPrev = () => scrollContainer(desktopScrollRef, -1);
  const handleDesktopNext = () => scrollContainer(desktopScrollRef, 1);

  const showMobileArrows = subjects.length > 1;
  const showDesktopArrows = subjects.length > 3;

  const handleExploreClick = (subject: string) => {
    // Get current course from URL or use the course's webLabel
    const currentCourse = searchParams?.get('course') || courseData?.webLabel || '';
    // Convert subject name to URL-friendly slug (e.g., "Mathematics" -> "mathematics")
    const subjectSlug = subject.toLowerCase().replace(/\s+/g, '-');
    // Build URL with course query parameter if available
    const courseParam = currentCourse ? `?course=${encodeURIComponent(currentCourse)}` : '';
    // Navigate to the subject page
    router.push(`/grade${gradeNumber || 8}/${subjectSlug}${courseParam}`);
  };

  // Touch scrolling is handled natively by the browser since the carousel is now scrollable.

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Show loading state
  if (loading) {
    return (
      <div className="w-full bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0595CE] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading syllabus...</p>
          </div>
        </div>
      </div>
    );
  }

  // Don't render if no data
  if (!courseData || subjects.length === 0) {
    return null;
  }

  // Syllabus section only shows on the main grade page, not on subject pages
  // This check ensures we don't show it on subject routes
  const pathParts = pathname?.split('/').filter(Boolean) || [];
  const isSubjectPage = pathname && pathname.includes('/grade') && pathParts.length > 1;
  if (isSubjectPage) {
    return null;
  }

  return (
    <RevealOnView from="bottom" durationMs={600} delayMs={200}>
      <div id="syllabus" className="w-full bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Top Buttons */}
        <RevealOnView from="top" durationMs={500} delayMs={300}>
          <div className="flex flex-col items-start gap-4 mb-8">
            <button className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[486px] h-[48px] sm:h-[50px] md:h-[53px] rounded-xl bg-[#0595CE] text-white font-montserrat font-semibold text-lg sm:text-xl md:text-[23px] leading-none tracking-normal text-center px-4">
              Batch Schedule & Syllabus
            </button>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <button className="w-[250.42px] h-[39.22px] rounded-[10px] border-[0.25px] border-[#575CFB] bg-[#1F1F39] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] font-montserrat font-semibold text-[14px] leading-[10px] tracking-normal text-center text-white">
                Latest Batch: {formatDate(courseData.bigCourse.startDate)}
              </button>
              <button className="w-[221.62px] h-[39.22px] rounded-[10px] border-[0.25px] border-[#D1D1D6] bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] font-montserrat font-semibold text-[14px] leading-[10px] tracking-normal text-center text-black">
                Next Batch (Coming Soon)
              </button>
            </div>
          </div>
        </RevealOnView>

        {/* Main Heading */}
        <RevealOnView from="left" durationMs={500} delayMs={400}>
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="text-left">
                <h2 className="font-montserrat font-bold text-[32px] leading-none tracking-normal text-[#1A2439] mb-4">
                  Syllabus for class {gradeNumber}
                </h2>
                <p className="font-montserrat font-medium text-[18px] leading-[14.79px] tracking-normal text-[#556A8E] text-left">
                  ({subjects.length} Subject{subjects.length > 1 ? 's' : ''}) - {courseData.webLabel}
                </p>
              </div>
            </div>
          </div>
        </RevealOnView>

        {/* Subject Cards - Mobile: single card with swipe and arrows */}
        <div className="md:hidden">
          <RevealOnView from="bottom" durationMs={600} delayMs={500}>
            {subjects.length > 0 && (
              <div className="flex flex-col items-center gap-3">
                <div
                  ref={mobileScrollRef}
                  className="flex w-full gap-4 overflow-x-auto px-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {subjects.map((subject) => (
                    <div
                      key={subject.id}
                      className="flex flex-col items-center flex-shrink-0 snap-start"
                      style={{ flex: '0 0 calc(100% - 56px)', maxWidth: '360px' }}
                    >
                      <div className="w-full rounded-[24px] border border-[#EBEBEB] bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)] p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={cn(`w-[44px] h-[44px] rounded-[6px] flex items-center justify-center flex-shrink-0`, subject.iconBg )}>
                            {subject.iconType === 'math' && (
                              <Image src="/grades/math.svg" alt="Math" width={29} height={29} />
                            )}
                            {subject.iconType === 'science' && (
                              <Image src="/grades/sciens.svg" alt="Science" width={29} height={29} />
                            )}
                            {subject.iconType === 'english' && (
                              <Image src="/grades/eng.svg" alt="English" width={29} height={29} />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <h3 className={`font-montserrat font-semibold text-[18px] leading-[14.79px] tracking-[0%] ${subject.titleColor}`}>{subject.title}</h3>
                            <p className="font-montserrat font-medium text-[14px] leading-[18px] tracking-normal text-[#556A8E] mt-1">{subject.subtitle}</p>
                          </div>
                        </div>
                        <div className="w-full h-0 border-t border-[#E8E8E8] mb-6"></div>
                        <div>
                          <h4 className="font-montserrat font-semibold text-[16px] leading-[20px] text-[#1A2439] mb-4">You will Learn</h4>
                          <ul className="space-y-3">
                            {subject.topics.map((topic, topicIndex) => (
                              <li key={topicIndex} className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-1"><Image src="/grades/correct.svg" alt="Check" width={13} height={13} /></div>
                                <span className="font-montserrat font-medium text-[14px] leading-[18px] tracking-normal text-[#556A8E]">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {subject.showExploreButton && (
                        <button onClick={() => handleExploreClick(subject.title)} className={`${subject.buttonBg} mt-3 w-[250.42px] h-[39.22px] text-white rounded-[10px] font-montserrat font-semibold text-[14px] leading-[10px] tracking-[0%] text-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:opacity-90 transition-opacity cursor-pointer`}>
                          {subject.buttonText}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {showMobileArrows && (
                  <div className="mt-3 flex items-center justify-center gap-6">
                    <button
                      onClick={handleMobilePrev}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D9D9D9] bg-white shadow-sm transition-transform hover:bg-gray-100 active:scale-95"
                      aria-label="Previous subject"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                      onClick={handleMobileNext}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D9D9D9] bg-white shadow-sm transition-transform hover:bg-gray-100 active:scale-95"
                      aria-label="Next subject"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                )}
              </div>
            )}
          </RevealOnView>
        </div>

        {/* Subject Cards - Horizontal Scroll (Desktop/Tablet) */}
        <div className="hidden md:block">
        <RevealOnView from="bottom" durationMs={600} delayMs={500}>
          {subjects.length > 0 && (
            <div className="relative">
              <div
                ref={desktopScrollRef}
                className="flex gap-6 overflow-x-auto px-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="flex flex-col items-center flex-shrink-0 w-full max-w-[380px]"
                    style={{ flex: '0 0 100%' }}
                  >
                    <div className="w-full rounded-[24px] border border-[#EBEBEB] bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)] p-6 hover:shadow-xl transition-shadow mb-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={cn(`w-[44px] h-[44px] rounded-[6px] flex items-center justify-center flex-shrink-0`, subject.iconBg )}>
                          {subject.iconType === 'math' && (
                            <Image 
                              src="/grades/math.svg" 
                              alt="Math" 
                              width={29} 
                              height={29}
                            />
                          )}
                          {subject.iconType === 'science' && (
                            <Image 
                              src="/grades/sciens.svg" 
                              alt="Science" 
                              width={29} 
                              height={29}
                            />
                          )}
                          {subject.iconType === 'english' && (
                            <Image 
                              src="/grades/eng.svg" 
                              alt="English" 
                              width={29} 
                              height={29}
                            />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <h3 className={`font-montserrat font-semibold text-[18px] leading-[14.79px] tracking-[0%] ${subject.titleColor}`}>
                            {subject.title}
                          </h3>
                          <p className="font-montserrat font-medium text-[14px] leading-[18px] tracking-normal text-[#556A8E] mt-1">
                            {subject.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="w-full h-0 border-t border-[#E8E8E8] mb-6"></div>

                      <div>
                        <h4 className="font-montserrat font-semibold text-[16px] leading-[20px] text-[#1A2439] mb-4">
                          You will Learn
                        </h4>
                        <ul className="space-y-3">
                          {subject.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-1">
                                <Image 
                                  src="/grades/correct.svg" 
                                  alt="Check" 
                                  width={13} 
                                  height={13}
                                />
                              </div>
                              <span className="font-montserrat font-medium text-[14px] leading-[18px] tracking-normal text-[#556A8E]">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {subject.showExploreButton && (
                      <button 
                        onClick={() => handleExploreClick(subject.title)}
                        className={`w-[250.42px] h-[39.22px] ${subject.buttonBg} text-white rounded-[10px] font-montserrat font-semibold text-[14px] leading-[10px] tracking-[0%] text-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:opacity-90 transition-opacity cursor-pointer`}
                      >
                        {subject.buttonText}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {showDesktopArrows && (
                <>
                  <button
                    onClick={handleDesktopPrev}
                    className="absolute top-1/2 left-3 -translate-y-1/2 -translate-x-full flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#D9D9D9] bg-white shadow-sm transition-colors hover:bg-gray-100"
                    aria-label="Previous subjects"
                  >
                    <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button
                    onClick={handleDesktopNext}
                    className="absolute top-1/2 right-3 -translate-y-1/2 translate-x-full flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#D9D9D9] bg-white shadow-sm transition-colors hover:bg-gray-100"
                    aria-label="Next subjects"
                  >
                    <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </>
              )}
            </div>
          )}
        </RevealOnView>
        </div>
      </div>
    </div>
    </RevealOnView>
  );
};

export default SyllabusSection;
