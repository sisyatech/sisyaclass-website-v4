"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RevealOnView from "../Reveal/RevealOnView";

const SimilarNews = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = 100;

  const filterButtons = [
    "All",
    "Technology",
    "Education",
    "World",
    "Science",
    "Health"
  ];

  const similarNews = [
    {
      id: 7,
      title: "SISYA CLASS • Technology",
      subtitle: "AI Revolution in Education AI Revolution in Education",
      description: "Discover how artificial intelligence is transforming the educational landscape and creating new opportunities for personalized learning.",
      author: "Tech Reporter",
      date: "Dec 15, 2024",
      readTime: "8 Min Read",
      reads: "1.2K Reads",
      category: "Technology",
      thumbnail: "/blogs/blogimage.svg"
    },
    {
      id: 8,
      title: "SISYA CLASS • Health",
      subtitle: "Mental Wellness for Students AI Revolution in Education",
      description: "Explore effective strategies and techniques to maintain mental health and well-being while managing academic pressures.",
      author: "Health Expert",
      date: "Dec 14, 2024",
      readTime: "6 Min Read",
      reads: "2.8K Reads",
      category: "Health",
      thumbnail: "/blogs/blogimage.svg"
    },
    {
      id: 9,
      title: "SISYA CLASS • Education",
      subtitle: "Future of Digital Learning AI Revolution in Education",
      description: "Learn about the latest trends in online education and how digital platforms are reshaping the learning experience.",
      author: "EdTech News",
      date: "Dec 13, 2024",
      readTime: "7 Min Read",
      reads: "1.5K Reads",
      category: "Education",
      thumbnail: "/blogs/blogimage.svg"
    },
    {
      id: 10,
      title: "SISYA CLASS • Science",
      subtitle: "Space Exploration Updates AI Revolution in Education",
      description: "Stay informed about the latest discoveries and breakthroughs in space exploration and astronomical research.",
      author: "Science Daily",
      date: "Dec 12, 2024",
      readTime: "5 Min Read",
      reads: "3.1K Reads",
      category: "Science",
      thumbnail: "/blogs/blogimage.svg"
    },
    {
      id: 11,
      title: "SISYA CLASS • World",
      subtitle: "Global Education Initiatives AI Revolution in Education",
      description: "Understand the impact of international education programs and their role in shaping future generations.",
      author: "World News",
      date: "Dec 11, 2024",
      readTime: "4 Min Read",
      reads: "2.2K Reads",
      category: "World",
      thumbnail: "/blogs/blogimage.svg"
    },
    {
      id: 12,
      title: "SISYA CLASS • Technology",
      subtitle: "Coding for Beginners Guide AI Revolution in Education",
      description: "Start your programming journey with essential coding concepts and practical exercises for absolute beginners.",
      author: "Tech Mentor",
      date: "Dec 10, 2024",
      readTime: "9 Min Read",
      reads: "1.8K Reads",
      category: "Technology",
      thumbnail: "/blogs/blogimage.svg"
    }
  ];

  const filteredNews = activeFilter === "All" 
    ? similarNews 
    : similarNews.filter(news => news.category === activeFilter);

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="py-2 sm:py-2 md:py-4 lg:py-1">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Filter Buttons */}
        <RevealOnView from="top" durationMs={600} delayMs={0}>
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8 justify-center sm:justify-start">
            {filterButtons.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setCurrentPage(1);
                }}
                className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-[10px] text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 hover:scale-105 ${
                  activeFilter === filter
                    ? "bg-[#575CFB] text-white border-[0.25px] border-[#575CFB]"
                    : "bg-white text-[#1F1F39] border-[0.25px] border-[#D1D1D6]"
                }`}
                style={{
                  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </RevealOnView>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-6 xl:gap-8 justify-items-center">
          {filteredNews.map((news, index) => (
            <RevealOnView
              key={news.id}
              from="bottom"
              durationMs={800}
              delayMs={index * 100}
            >
              <Link href={`/news/${news.id}`}>
                <div className="transition-all duration-300 overflow-hidden group cursor-pointer w-[280px] sm:w-[320px] md:w-[340px] lg:w-[320px] xl:w-[362px] h-[440px] sm:h-[480px] md:h-[510px] lg:h-[490px] xl:h-[540px] relative hover:shadow-xl">
                {/* SISYA CLASS Text */}
                <div className="absolute top-0 left-[1px] font-montserrat font-bold text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] xl:text-[14px] leading-[160%] text-[#0595CE]">
                  {news.title}
                </div>
                
                {/* News Image */}
                <div className="absolute top-[22px] sm:top-[24px] md:top-[26px] lg:top-[24px] xl:top-[28px] left-0 w-full h-[180px] sm:h-[200px] md:h-[210px] lg:h-[200px] xl:h-[220px] overflow-hidden">
                  <Image
                    src={news.thumbnail}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Subtitle */}
                <div className="absolute top-[210px] sm:top-[230px] md:top-[245px] lg:top-[230px] xl:top-[258px] left-[2px] w-[calc(100%-4px)] h-[50px] sm:h-[55px] md:h-[60px] lg:h-[56px] xl:h-[62px] flex items-start">
                  <h3 className="font-montserrat font-bold text-[17px] sm:text-[19px] md:text-[21px] lg:text-[19px] xl:text-[22px] leading-[1.3] text-[#1A2439] line-clamp-2">
                    {news.subtitle}
                  </h3>
                </div>
                
                {/* Description */}
                <div className="absolute top-[268px] sm:top-[292px] md:top-[312px] lg:top-[292px] xl:top-[328px] left-[2px] w-[calc(100%-4px)] h-[65px] sm:h-[75px] md:h-[85px] lg:h-[80px] xl:h-[90px] flex items-start">
                  <p className="font-open-sans font-normal text-[13px] sm:text-[14px] md:text-[15px] lg:text-[14px] xl:text-[15px] leading-[1.4] text-[#556A8E] line-clamp-3">
                    {news.description}
                  </p>
                </div>

                {/* Read Time Badge */}
                <div className="absolute top-[340px] sm:top-[373px] md:top-[403px] lg:top-[378px] xl:top-[425px] left-[2px] w-[100px] sm:w-[110px] md:w-[115px] lg:w-[110px] xl:w-[118px] h-[26px] sm:h-[28px] md:h-[29px] lg:h-[28px] xl:h-[30px] bg-[#F5F7F9] border-2 border-[#D9DBDF] rounded-[40px] flex items-center justify-center gap-1">
                  <svg className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-[#556A8E]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="font-open-sans font-normal text-[10px] sm:text-[11px] md:text-[12px] lg:text-[11px] xl:text-[12px] leading-[1] text-[#556A8E] capitalize">
                    {news.readTime}
                  </span>
                </div>
                
                {/* Reads Badge */}
                <div className="absolute top-[340px] sm:top-[373px] md:top-[403px] lg:top-[378px] xl:top-[425px] left-[110px] sm:left-[120px] md:left-[125px] lg:left-[120px] xl:left-[130px] w-[100px] sm:w-[110px] md:w-[115px] lg:w-[110px] xl:w-[118px] h-[26px] sm:h-[28px] md:h-[29px] lg:h-[28px] xl:h-[30px] bg-[#F5F7F9] border-2 border-[#D9DBDF] rounded-[40px] flex items-center justify-center gap-1">
                  <svg className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-[#556A8E]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-open-sans font-normal text-[10px] sm:text-[11px] md:text-[12px] lg:text-[11px] xl:text-[12px] leading-[1] text-[#556A8E] capitalize">
                    {news.reads}
                  </span>
                </div>
                
                {/* Author and Date */}
                <div className="absolute top-[375px] sm:top-[408px] md:top-[440px] lg:top-[413px] xl:top-[463px] left-[2px] flex items-center gap-2">
                  <span className="font-montserrat font-normal text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] xl:text-[14px] leading-[160%] text-[#1A2439]">
                    By {news.author}
                  </span>
                  <span className="font-open-sans font-normal text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] xl:text-[14px] leading-[160%] text-[#556A8E]">
                    • {news.date}
                  </span>
                </div>
                </div>
              </Link>
            </RevealOnView>
          ))}
        </div>

        {/* Pagination */}
        <RevealOnView from="bottom" durationMs={600} delayMs={600}>
          <div className="flex justify-center items-center gap-1 sm:gap-2 mt-4 sm:mt-6 md:mt-8 overflow-x-auto px-4">
            {/* Page 1 */}
            <button
              onClick={() => handlePageChange(1)}
              className={`w-[28px] sm:w-[30px] md:w-[32px] lg:w-[33px] h-[28px] sm:h-[30px] md:h-[32px] lg:h-[33px] rounded-[4px] flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-105 ${
                currentPage === 1
                  ? "bg-[#1A2439]"
                  : "bg-transparent"
              }`}
            >
              <span className={`font-montserrat font-semibold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16.1px] leading-[100%] tracking-[1%] ${
                currentPage === 1 ? "text-white" : "text-[#0595CE]"
              }`}>
                1
              </span>
            </button>

            {/* Page 2 */}
            <button
              onClick={() => handlePageChange(2)}
              className={`w-[28px] sm:w-[30px] md:w-[32px] lg:w-[33px] h-[28px] sm:h-[30px] md:h-[32px] lg:h-[33px] rounded-[4px] flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-105 ${
                currentPage === 2
                  ? "bg-[#1A2439]"
                  : "bg-transparent"
              }`}
            >
              <span className={`font-montserrat font-semibold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16.1px] leading-[100%] tracking-[1%] ${
                currentPage === 2 ? "text-white" : "text-[#0595CE]"
              }`}>
                2
              </span>
            </button>

            {/* Page 3 */}
            <button
              onClick={() => handlePageChange(3)}
              className={`w-[28px] sm:w-[30px] md:w-[32px] lg:w-[33px] h-[28px] sm:h-[30px] md:h-[32px] lg:h-[33px] rounded-[4px] flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-105 ${
                currentPage === 3
                  ? "bg-[#1A2439]"
                  : "bg-transparent"
              }`}
            >
              <span className={`font-montserrat font-semibold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16.1px] leading-[100%] tracking-[1%] ${
                currentPage === 3 ? "text-white" : "text-[#0595CE]"
              }`}>
                3
              </span>
            </button>

            {/* Ellipsis */}
            {currentPage > 3 && currentPage < totalPages - 2 && (
              <div className="w-[28px] sm:w-[30px] md:w-[32px] lg:w-[33px] h-[28px] sm:h-[30px] md:h-[32px] lg:h-[33px] flex items-center justify-center flex-shrink-0">
                <span className="font-montserrat font-semibold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16.1px] leading-[100%] tracking-[1%] text-[#0595CE]">
                  ...
                </span>
              </div>
            )}

            {/* Current Page (if not 1, 2, 3, or 100) */}
            {currentPage > 3 && currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage)}
                className="w-[28px] sm:w-[30px] md:w-[32px] lg:w-[33px] h-[28px] sm:h-[30px] md:h-[32px] lg:h-[33px] bg-[#1A2439] rounded-[4px] flex items-center justify-center flex-shrink-0"
              >
                <span className="font-montserrat font-semibold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16.1px] leading-[100%] tracking-[1%] text-white">
                  {currentPage}
                </span>
              </button>
            )}

            {/* Ellipsis before 100 */}
            {currentPage < totalPages - 2 && (
              <div className="w-[28px] sm:w-[30px] md:w-[32px] lg:w-[33px] h-[28px] sm:h-[30px] md:h-[32px] lg:h-[33px] flex items-center justify-center flex-shrink-0">
                <span className="font-montserrat font-semibold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16.1px] leading-[100%] tracking-[1%] text-[#0595CE]">
                  ...
                </span>
              </div>
            )}

            {/* Page 100 */}
            <button
              onClick={() => handlePageChange(100)}
              className={`w-[28px] sm:w-[30px] md:w-[32px] lg:w-[33px] h-[28px] sm:h-[30px] md:h-[32px] lg:h-[33px] rounded-[4px] flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-105 ${
                currentPage === 100
                  ? "bg-[#1A2439]"
                  : "bg-transparent"
              }`}
            >
              <span className={`font-montserrat font-semibold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16.1px] leading-[100%] tracking-[1%] ${
                currentPage === 100 ? "text-white" : "text-[#0595CE]"
              }`}>
                100
              </span>
            </button>

            {/* Next Button */}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`w-auto px-2 sm:px-3 h-[28px] sm:h-[30px] md:h-[32px] lg:h-[33px] flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-105 ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <span className="font-montserrat font-semibold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16.1px] leading-[100%] tracking-[1%] text-[#0595CE]">
                Next
              </span>
            </button>

            {/* Next Icon */}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`w-[28px] sm:w-[30px] md:w-[32px] lg:w-[33px] h-[28px] sm:h-[30px] md:h-[32px] lg:h-[33px] flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-105 ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <svg className="w-3 sm:w-3.5 md:w-4 h-3 sm:h-3.5 md:h-4 text-[#0595CE]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10l-4.293-4.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </RevealOnView>
      </div>
    </div>
  );
};

export default SimilarNews;
