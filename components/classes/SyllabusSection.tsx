"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import RevealOnView from "../Reveal/RevealOnView";
import { useRouter } from "next/navigation";

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
  const [courseData, setCourseData] = useState<BigCourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage] = useState(3);

  // Subject styling configuration
  const subjectStyles: { [key: string]: { iconBg: string; titleColor: string; buttonBg: string } } = {
    Mathematics: {
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
          'https://sisyaclass.xyz/student/get_big_course_web_by_grade',
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
            setCourseData(data[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching syllabus data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [gradeNumber]);

  // Map API subjects to component format
  const subjects = courseData?.subjects.map((subject) => {
    const style = subjectStyles[subject.name] || subjectStyles.Mathematics;
    return {
      id: subject.id,
      title: subject.name,
      subtitle: subject.subtitle,
      iconBg: style.iconBg,
      titleColor: style.titleColor,
      buttonBg: style.buttonBg,
      buttonText: `Explore ${subject.name} Champ Course`,
      topics: subject.taglinePoints
    };
  }) || [];

  // Calculate pagination
  const totalPages = Math.ceil(subjects.length / cardsPerPage);
  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentSubjects = subjects.slice(startIndex, endIndex);

  const handleExploreClick = (subject: string) => {
    const subjectSlug = subject.toLowerCase().replace(/\s+/g, '-');
    router.push(`/grade${gradeNumber || 8}/${subjectSlug}`);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
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

        {/* Subject Cards - Horizontal Scroll */}
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
                                {(subject.title === "Mathematics" || subject.title === "Maths") && (
                                  <Image 
                                    src="/grades/math.svg" 
                                    alt="Math" 
                                    width={29} 
                                    height={29}
                                  />
                                )}
                               {(subject.title === "Science" || subject.title === "Physics" || subject.title === "Chemistry") && (
                                  <Image 
                                    src="/grades/sciens.svg" 
                                    alt="Science" 
                                    width={29} 
                                    height={29}
                                  />
                                )}
                                {subject.title === "English" && (
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
    </RevealOnView>
  );
};

export default SyllabusSection;
