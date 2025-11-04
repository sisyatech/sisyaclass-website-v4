"use client";

import React, { useEffect, useState } from "react";
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

const Chapters = ({ gradeNumber }: { gradeNumber?: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [courseData, setCourseData] = useState<BigCourseData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Get subject from URL path (e.g., /grade8/mathematics -> "mathematics")
  // or fallback to query parameter for backward compatibility
  const pathParts = pathname?.split('/').filter(Boolean) || [];
  // pathParts[0] = 'grade8', pathParts[1] = 'mathematics' (if subject page)
  const subjectFromPath = pathParts.length > 1 ? decodeURIComponent(pathParts[1]).replace(/-/g, ' ') : '';
  const selectedSubjectFromUrl = subjectFromPath || searchParams?.get('subject') || '';
  
  // Debug: Log component render
  console.log('[CHAPTERS] Component rendered:', { 
    gradeNumber, 
    pathname,
    subjectFromPath,
    selectedSubjectFromUrl,
    decoded: selectedSubjectFromUrl.toLowerCase()
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage] = useState(3);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

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
            // Reset mobile index and pagination when course data changes
            setMobileIndex(0);
            setCurrentPage(0);
          }
        }
      } catch (error) {
        console.error("Error fetching chapters data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [gradeNumber, searchParams]);

  // Get selected subject from URL path or query parameter
  const selectedSubject = selectedSubjectFromUrl.toLowerCase();

  // Reset mobile index and pagination when subject filter changes
  useEffect(() => {
    setMobileIndex(0);
    setCurrentPage(0);
  }, [selectedSubject]);

  // Scroll to chapters section when subject is selected (centering in viewport)
  useEffect(() => {
    if (selectedSubject && !loading && courseData) {
      // Longer delay to ensure the component has fully rendered and layout is complete
      setTimeout(() => {
        const chaptersElement = document.getElementById('chapters');
        if (chaptersElement) {
          // Get the element's position relative to the document
          const rect = chaptersElement.getBoundingClientRect();
          const elementTop = rect.top + window.pageYOffset;
          const elementHeight = chaptersElement.offsetHeight || rect.height;
          const viewportHeight = window.innerHeight;
          
          // Calculate scroll position to center the element vertically in viewport
          // Position element so its center aligns with viewport center
          const scrollPosition = elementTop + (elementHeight / 2) - (viewportHeight / 2);

          window.scrollTo({
            top: Math.max(0, scrollPosition), // Ensure we don't scroll to negative position
            behavior: 'smooth'
          });
        }
      }, 300); // Increased delay to ensure layout is complete
    }
  }, [selectedSubject, loading, courseData]);

  // Get all chapters from all subjects, filtered by selected subject if provided
  const allChapters = courseData?.subjects
    .filter(subject => {
      // If no subject filter is provided, show all subjects
      if (!selectedSubject) return true;
      
      // Normalize both names for comparison
      const subjectNameLower = subject.name.toLowerCase().trim();
      const filterLower = selectedSubject.toLowerCase().trim();
      
      console.log('[CHAPTERS] Checking match:', { 
        subjectName: subject.name,
        subjectNameLower,
        filterLower,
        selectedSubject,
        chaptersCount: subject.chapters?.length || 0
      });
      
      // Direct exact match (case-insensitive)
      if (subjectNameLower === filterLower) {
        console.log('[CHAPTERS] ✅ Exact match found!');
        return true;
      }
      
      // Handle common variations and partial matches
      // Map variations to standard names
      const getStandardName = (name: string) => {
        const lower = name.toLowerCase();
        if (lower.includes('math')) return 'mathematics';
        if (lower.includes('science') || lower.includes('sciens')) return 'science';
        if (lower.includes('english') || lower.includes('eng')) return 'english';
        return lower;
      };
      
      const standardSubject = getStandardName(subjectNameLower);
      const standardFilter = getStandardName(filterLower);
      
      if (standardSubject === standardFilter) {
        console.log('[CHAPTERS] ✅ Standardized match found!');
        return true;
      }
      
      // Try partial match in either direction
      if (subjectNameLower.includes(filterLower) || filterLower.includes(subjectNameLower)) {
        console.log('[CHAPTERS] ✅ Partial match found!');
        return true;
      }
      
      console.log('[CHAPTERS] ❌ No match');
      return false;
    })
    .flatMap(subject => {
      console.log('[CHAPTERS] Processing subject:', { 
        name: subject.name, 
        chaptersCount: subject.chapters?.length || 0,
        chapters: subject.chapters 
      });
      return subject.chapters.map(chapter => ({
      ...chapter,
      subjectName: subject.name,
      iconBg: "bg-[#DDDEFE]",
      titleColor: "text-[#575CFB]"
      }));
    }) || [];

  // Debug: Log final chapters count
  console.log('[CHAPTERS] Final allChapters:', {
    selectedSubject,
    totalChapters: allChapters.length,
    chapters: allChapters.map(ch => ({ id: ch.id, title: ch.title, subjectName: ch.subjectName }))
  });

  useEffect(() => {
    if (courseData && selectedSubject) {
      console.log('[CHAPTERS] Final result:', {
        selectedSubject,
        totalChapters: allChapters.length,
        courseLabel: courseData.webLabel,
        subjectsWithChapters: courseData.subjects
          .filter(s => {
            const sLower = s.name.toLowerCase();
            const filterLower = selectedSubject.toLowerCase();
            return sLower.includes(filterLower) || filterLower.includes(sLower) || 
                   sLower.includes('sciens') && filterLower.includes('science') ||
                   sLower.includes('science') && filterLower.includes('sciens');
          })
          .map(s => ({ name: s.name, chaptersCount: s.chapters?.length || 0 }))
      });
    }
  }, [allChapters.length, selectedSubject, courseData]);

  // Calculate pagination
  const totalPages = Math.ceil(allChapters.length / cardsPerPage);
  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentChapters = allChapters.slice(startIndex, endIndex);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleExploreClick = (subject: string) => {
    const subjectSlug = subject.toLowerCase().replace(/\s+/g, '-');
    router.push(`/grade${gradeNumber || 8}/${subjectSlug}`);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleMobilePrev = () => {
    if (allChapters.length === 0) return;
    setMobileIndex((prev) => (prev === 0 ? allChapters.length - 1 : prev - 1));
  };

  const handleMobileNext = () => {
    if (allChapters.length === 0) return;
    setMobileIndex((prev) => (prev === allChapters.length - 1 ? 0 : prev + 1));
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

  const getMobileDots = (): Array<number | 'ellipsis'> => {
    const total = allChapters.length;
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
    return result.filter((it) => it === 'ellipsis' || (typeof it === 'number' && it >= 0 && it < total));
  };

  // Show loading state
  if (loading) {
    return (
      <div className="w-full bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0595CE] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading chapters...</p>
          </div>
        </div>
      </div>
    );
  }

  // Don't render if no course data
  if (!courseData) {
    return null;
  }

  // Only show chapters when a subject is selected (when user clicks "Explore Subject" or on subject page)
  // If no subject is selected, this component will be hidden (SyllabusSection will show instead)
  // Check if we're on a subject page (pathname has subject) or if subject is in query params
  const isSubjectPage = pathname && pathname.includes('/grade') && pathParts.length > 1;
  if (!selectedSubject && !isSubjectPage) {
    return null;
  }

  // Show message if no chapters found (helpful for debugging)
  if (allChapters.length === 0) {
    return (
      <div className="w-full bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center py-20">
            <p className="text-gray-600 mb-2">
              {selectedSubject 
                ? `No chapters found for subject "${selectedSubject}" in ${courseData.webLabel}`
                : `No chapters available for ${courseData.webLabel}`
              }
            </p>
            <p className="text-sm text-gray-500">
              Available subjects: {courseData.subjects.map(s => s.name).join(', ')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <RevealOnView from="bottom" durationMs={600} delayMs={200}>
      <div id="chapters" className="w-full bg-white py-12 sm:py-16 md:py-20">
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
              {selectedSubject && courseData 
                ? `${courseData.subjects.find(s => {
                    const sLower = s.name.toLowerCase().trim();
                    const filterLower = selectedSubject.toLowerCase().trim();
                    return sLower === filterLower || sLower.includes(filterLower) || filterLower.includes(sLower);
                  })?.name || selectedSubject} Chapters for class ${gradeNumber}`
                : `Chapters for class ${gradeNumber}`
              }
            </h2>
            <p className="font-montserrat font-medium text-[18px] leading-[14.79px] tracking-normal text-[#556A8E] text-left">
              {allChapters.length} Chapter{allChapters.length > 1 ? 's' : ''} - {courseData.webLabel}
            </p>
          </div>
        </RevealOnView>

        {/* Chapter Cards - Mobile: single card with swipe and compact dots */}
        <div className="md:hidden">
          <RevealOnView from="bottom" durationMs={600} delayMs={500}>
            {allChapters.length > 0 && (
              <div
                className="relative flex flex-col items-center"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {(() => {
                  const chapter = allChapters[mobileIndex];
                  return (
                    <div className="w-full flex flex-col items-center">
                      <div className="w-full max-w-[360px] sm:max-w-[380px] rounded-[24px] border border-[#EBEBEB] bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)] p-5 sm:p-6 hover:shadow-xl transition-shadow mb-5 sm:mb-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={cn(`w-[40px] h-[40px] rounded-[6px] flex items-center justify-center flex-shrink-0`, chapter.iconBg )}>
                            <Image src={(() => { const s = (chapter.subjectName || '').toLowerCase(); if (s.includes('english') || s.includes('eng')) return '/grades/eng.svg'; if (s.includes('science') || s.includes('physics') || s.includes('chemistry') || s.includes('bio')) return '/grades/sciens.svg'; return '/grades/math.svg'; })()} alt={chapter.subjectName} width={26} height={26} />
                          </div>
                          <div className="flex flex-col">
                            <h3 className={`font-montserrat font-semibold text-[16px] leading-[14.79px] tracking-[0%] ${chapter.titleColor}`}>Chapter {chapter.chapterNumber}</h3>
                            <p className="font-montserrat font-medium text-[13px] leading-[18px] tracking-normal text-[#556A8E] mt-1">{chapter.title}</p>
                          </div>
                        </div>
                        <div className="w-full h-0 border-t border-[#E8E8E8] mb-5"></div>
                        <div>
                          <h4 className="font-montserrat font-semibold text-[15px] leading-[20px] text-[#1A2439] mb-3">You will Learn</h4>
                          <ul className="space-y-2.5">
                            {chapter.syllabusPoints.map((topic, topicIndex) => (
                              <li key={topicIndex} className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-1"><Image src="/grades/correct.svg" alt="Check" width={12} height={12} /></div>
                                <span className="font-montserrat font-medium text-[13px] leading-[18px] tracking-normal text-[#556A8E]">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
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
                        return <span key={`ellipsis-${idx}`} className="px-1 text-xs text-gray-400">…</span>;
                      }
                      const dotIndex = item as number;
                      return (
                        <button
                          key={dotIndex}
                          onClick={() => setMobileIndex(dotIndex)}
                          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${mobileIndex === dotIndex ? 'bg-[#0595CE] scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
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

        {/* Chapter Cards - Horizontal Scroll (Desktop/Tablet) */}
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
                      {allChapters.slice(pageIndex * cardsPerPage, (pageIndex + 1) * cardsPerPage).map((chapter, index) => (
                        <div key={chapter.id} className="flex flex-col items-center">
                          {/* Chapter Card */}
                          <div className="w-full max-w-[380px] rounded-[24px] border border-[#EBEBEB] bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)] p-6 hover:shadow-xl transition-shadow mb-6">
                            {/* Chapter Icon and Title */}
                            <div className="flex items-center gap-3 mb-4">
                              <div className={cn(`w-[44px] h-[44px] rounded-[6px] flex items-center justify-center flex-shrink-0`, chapter.iconBg )}>
                                <Image 
                                  src={("" + (() => { const s = (chapter.subjectName || '').toLowerCase(); if (s.includes('english') || s.includes('eng')) return '/grades/eng.svg'; if (s.includes('science') || s.includes('physics') || s.includes('chemistry') || s.includes('bio')) return '/grades/sciens.svg'; return '/grades/math.svg'; })())}
                                  alt={chapter.subjectName} 
                                  width={29} 
                                  height={29}
                                />
                              </div>
                              <div className="flex flex-col">
                                <h3 className={`font-montserrat font-semibold text-[18px] leading-[14.79px] tracking-[0%] ${chapter.titleColor}`}>
                                  Chapter {chapter.chapterNumber}
                                </h3>
                                <p className="font-montserrat font-medium text-[14px] leading-[18px] tracking-normal text-[#556A8E] mt-1">
                                  {chapter.title}
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
                                {chapter.syllabusPoints.map((topic, topicIndex) => (
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

export default Chapters;
