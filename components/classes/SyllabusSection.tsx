"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import RevealOnView from "../Reveal/RevealOnView";
import { useRouter, useSearchParams } from "next/navigation";
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
  const [courseData, setCourseData] = useState<BigCourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage] = useState(3);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

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
            setMobileIndex(0);
            setCurrentPage(0);
          }
        }
      } catch (error) {
        console.error("Error fetching syllabus data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [gradeNumber, searchParams]);

  // Map API subjects to component format
  const subjects = courseData?.subjects.map((subject) => {
    const style = getSubjectStyle(subject.name);
    return {
      id: subject.id,
      title: subject.name,
      subtitle: subject.subtitle,
      iconBg: style.iconBg,
      titleColor: style.titleColor,
      buttonBg: style.buttonBg,
      buttonText: `Explore ${subject.name} Subject`,
      topics: subject.taglinePoints
    };
  }) || [];

  // Calculate pagination
  const totalPages = Math.ceil(subjects.length / cardsPerPage);
  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentSubjects = subjects.slice(startIndex, endIndex);

  const handleExploreClick = (subject: string) => {
    // Get current course from URL or use the course's webLabel
    const currentCourse = searchParams?.get('course') || courseData?.webLabel || '';
    const subjectParam = encodeURIComponent(subject);
    const courseParam = currentCourse ? `&course=${encodeURIComponent(currentCourse)}` : '';
    // Navigate to the grade page with subject and course query parameters, then scroll to chapters
    router.push(`/grade${gradeNumber || 8}?subject=${subjectParam}${courseParam}#chapters`);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleMobilePrev = () => {
    if (subjects.length === 0) return;
    setMobileIndex((prev) => (prev === 0 ? subjects.length - 1 : prev - 1));
  };

  const handleMobileNext = () => {
    if (subjects.length === 0) return;
    setMobileIndex((prev) => (prev === subjects.length - 1 ? 0 : prev + 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const deltaX = touchStartX - touchEndX;
    const threshold = 50;
    if (deltaX > threshold) {
      handleMobileNext();
    } else if (deltaX < -threshold) {
      handleMobilePrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Build compact dots for mobile when there are many subjects
  const getMobileDots = (): Array<number | 'ellipsis'> => {
    const total = subjects.length;
    if (total <= 10) {
      return Array.from({ length: total }, (_, i) => i);
    }
    const neighbors = [mobileIndex - 1, mobileIndex, mobileIndex + 1].filter(
      (i) => i >= 0 && i < total
    );
    const base = [0, 1, 'ellipsis' as const, ...neighbors, 'ellipsis' as const, total - 2, total - 1];
    const seen = new Set<string>();
    const result: Array<number | 'ellipsis'> = [];
    for (const item of base) {
      const key = item === 'ellipsis' ? 'e' : `${item}`;
      if (!seen.has(key)) {
        seen.add(key);
        result.push(item as any);
      }
    }
    // Ensure order makes sense visually
    return result
      .map((it) => it)
      .filter((it) => it === 'ellipsis' || (typeof it === 'number' && it >= 0 && it < total));
  };

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

  // Hide syllabus section when a subject is selected (chapters will show instead)
  const selectedSubject = searchParams?.get('subject');
  if (selectedSubject) {
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
          <div className="text-left mb-12">
            <h2 className="font-montserrat font-bold text-[32px] leading-none tracking-normal text-[#1A2439] mb-4">
              Syllabus for class {gradeNumber}
            </h2>
            <p className="font-montserrat font-medium text-[18px] leading-[14.79px] tracking-normal text-[#556A8E] text-left">
              ({subjects.length} Subject{subjects.length > 1 ? 's' : ''}) - {courseData.webLabel}
            </p>
          </div>
        </RevealOnView>

        {/* Subject Cards - Mobile: single card with swipe and arrows */}
        <div className="md:hidden">
          <RevealOnView from="bottom" durationMs={600} delayMs={500}>
            {subjects.length > 0 && (
              <div 
                className="relative flex flex-col items-center"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {(() => {
                  const subject = subjects[mobileIndex];
                  return (
                    <div className="w-full flex flex-col items-center">
                      <div className="w-full max-w-[380px] rounded-[24px] border border-[#EBEBEB] bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)] p-6 hover:shadow-xl transition-shadow mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={cn(`w-[44px] h-[44px] rounded-[6px] flex items-center justify-center flex-shrink-0`, subject.iconBg )}>
                            {getSubjectIcon(subject.title) === 'math' && (
                              <Image src="/grades/math.svg" alt="Math" width={29} height={29} />
                            )}
                            {getSubjectIcon(subject.title) === 'science' && (
                              <Image src="/grades/sciens.svg" alt="Science" width={29} height={29} />
                            )}
                            {getSubjectIcon(subject.title) === 'english' && (
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
                      <button onClick={() => handleExploreClick(subject.title)} className={`${subject.buttonBg} w-[250.42px] h-[39.22px] text-white rounded-[10px] font-montserrat font-semibold text-[14px] leading-[10px] tracking-[0%] text-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:opacity-90 transition-opacity cursor-pointer`}>{subject.buttonText}</button>
                    </div>
                  );
                })()}

                <div className="flex items-center justify-center mt-4 space-x-3">
                  <button onClick={handleMobilePrev} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-[#0595CE] transition-all duration-300 group" aria-label="Previous">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 group-hover:text-[#0595CE] group-hover:-translate-x-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <div className="flex items-center space-x-2">
                    {getMobileDots().map((item, idx) => {
                      if (item === 'ellipsis') {
                        return (
                          <span key={`ellipsis-${idx}`} className="px-1 text-xs text-gray-400">…</span>
                        );
                      }
                      const dotIndex = item as number;
                      return (
                        <button
                          key={dotIndex}
                          onClick={() => setMobileIndex(dotIndex)}
                          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                            mobileIndex === dotIndex ? 'bg-[#0595CE] scale-125' : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                          aria-label={`Go to ${dotIndex + 1}`}
                        />
                      );
                    })}
                  </div>
                  <button onClick={handleMobileNext} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-[#0595CE] transition-all duration-300 group" aria-label="Next">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 group-hover:text-[#0595CE] group-hover:translate-x-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            )}
          </RevealOnView>
        </div>

        {/* Subject Cards - Horizontal Scroll (Desktop/Tablet) */}
        <div className="hidden md:block">
        <RevealOnView from="bottom" durationMs={600} delayMs={500}>
          <div className="relative">
            {/* Cards Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentPage * 100}%)` }}
              >
                {Array.from({ length: totalPages }, (_, pageIndex) => (
                  <div key={pageIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                      {subjects.slice(pageIndex * cardsPerPage, (pageIndex + 1) * cardsPerPage).map((subject, index) => (
                        <div key={subject.id} className="flex flex-col items-center">
                          {/* Subject Card */}
                          <div className="w-full max-w-[380px] rounded-[24px] border border-[#EBEBEB] bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)] p-6 hover:shadow-xl transition-shadow mb-6">
                            {/* Subject Icon and Title */}
                            <div className="flex items-center gap-3 mb-4">
                              <div className={cn(`w-[44px] h-[44px] rounded-[6px] flex items-center justify-center flex-shrink-0`, subject.iconBg )}>
                                {getSubjectIcon(subject.title) === 'math' && (
                                  <Image 
                                    src="/grades/math.svg" 
                                    alt="Math" 
                                    width={29} 
                                    height={29}
                                  />
                                )}
                                {getSubjectIcon(subject.title) === 'science' && (
                                  <Image 
                                    src="/grades/sciens.svg" 
                                    alt="Science" 
                                    width={29} 
                                    height={29}
                                  />
                                )}
                                {getSubjectIcon(subject.title) === 'english' && (
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

                            {/* Divider Line */}
                            <div className="w-full h-0 border-t border-[#E8E8E8] mb-6"></div>

                            {/* You will Learn Section */}
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

                          {/* Explore Button - Outside the card */}
                          <button 
                            onClick={() => handleExploreClick(subject.title)}
                            className={`w-[250.42px] h-[39.22px] ${subject.buttonBg} text-white rounded-[10px] font-montserrat font-semibold text-[14px] leading-[10px] tracking-[0%] text-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:opacity-90 transition-opacity cursor-pointer`}
                          >
                            {subject.buttonText}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination with Arrows */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-8 space-x-4">
                {/* Previous Arrow */}
                <button
                  onClick={() => goToPage(currentPage === 0 ? totalPages - 1 : currentPage - 1)}
                  className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-[#0595CE] transition-all duration-300 group"
                  aria-label="Previous page"
                >
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-[#0595CE] group-hover:-translate-x-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Pagination Dots */}
                <div className="flex space-x-2">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => goToPage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentPage === index 
                          ? 'bg-[#0595CE] scale-125' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Next Arrow */}
                <button
                  onClick={() => goToPage(currentPage === totalPages - 1 ? 0 : currentPage + 1)}
                  className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-[#0595CE] transition-all duration-300 group"
                  aria-label="Next page"
                >
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-[#0595CE] group-hover:translate-x-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </RevealOnView>
        </div>
      </div>
    </div>
    </RevealOnView>
  );
};

export default SyllabusSection;
