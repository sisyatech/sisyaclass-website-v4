"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RevealOnView from "../Reveal/RevealOnView";

const SimilarVideos = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = 100;

  const filterButtons = [
    "All",
    "School Syllabus CBSE", 
    "Mathematics",
    "Science",
    "English"
  ];

  const similarVideos = [
    {
      id: 1,
      title: "SISYA CLASS • English",
      subtitle: "Complete Grammar Guide for Class 8",
      description: "Master all essential English grammar concepts with our comprehensive guide designed specifically for Class 8 students.",
      author: "Dr. Priya Sharma",
      date: "Dec 15, 2024",
      readTime: "5 Min Read",
      reads: "700 Reads",
      category: "English",
      thumbnail: "/blogs/blogimage.svg"
    },
    {
      id: 2,
      title: "SISYA CLASS • Mathematics",
      subtitle: "Algebra Fundamentals Explained",
      description: "Learn algebra from basics to advanced concepts with step-by-step explanations and practice problems.",
      author: "Prof. Rajesh Kumar",
      date: "Dec 12, 2024",
      readTime: "7 Min Read",
      reads: "890 Reads",
      category: "Mathematics",
        thumbnail: "/blogs/blogimage.svg"
    },
    {
      id: 3,
      title: "SISYA CLASS • Science",
      subtitle: "Physics Laws and Applications",
      description: "Understand fundamental physics laws through real-world examples and practical applications.",
      author: "Dr. Anjali Patel",
      date: "Dec 10, 2024",
      readTime: "6 Min Read",
      reads: "650 Reads",
      category: "Science",
      thumbnail: "/blogs/blogimage.svg"
    },
    {
      id: 4,
      title: "SISYA CLASS • English",
      subtitle: "Creative Writing Techniques",
      description: "Develop your creative writing skills with proven techniques and exercises for better expression.",
      author: "Ms. Sneha Gupta",
      date: "Dec 8, 2024",
      readTime: "8 Min Read",
      reads: "920 Reads",
      category: "English",
      thumbnail: "/blogs/blogimage.svg"
    },
    {
      id: 5,
      title: "SISYA CLASS • Mathematics",
      subtitle: "Geometry Made Simple",
      description: "Master geometric concepts with visual aids and interactive examples for better understanding.",
      author: "Dr. Vikram Singh",
      date: "Dec 5, 2024",
      readTime: "9 Min Read",
      reads: "780 Reads",
      category: "Mathematics",
      thumbnail: "/blogs/blogimage.svg"
    },
    {
      id: 6,
      title: "SISYA CLASS • Science",
      subtitle: "Chemistry Basics for Beginners",
      description: "Start your chemistry journey with fundamental concepts explained in simple, easy-to-understand language.",
      author: "Dr. Meera Joshi",
      date: "Dec 3, 2024",
      readTime: "6 Min Read",
      reads: "1.2K Reads",
      category: "Science",
      thumbnail: "/blogs/blogimage.svg"
    },
   
  ];

  const filteredVideos = activeFilter === "All" 
    ? similarVideos 
    : similarVideos.filter(video => 
        video.category === activeFilter || 
        (activeFilter === "School Syllabus CBSE" && ["Mathematics", "Science", "English"].includes(video.category))
      );

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
    <div className="py-4 sm:py-6 md:py-8 lg:py-12">
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

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-6 xl:gap-8 justify-items-center">
          {filteredVideos.map((blog, index) => (
            <RevealOnView
              key={blog.id}
              from="bottom"
              durationMs={800}
              delayMs={index * 100}
            >
              <Link href={`/blogs/${blog.id}`}>
                <div className="transition-all duration-300 overflow-hidden group cursor-pointer w-[280px] sm:w-[320px] md:w-[340px] lg:w-[320px] xl:w-[362px] h-[480px] sm:h-[550px] md:h-[580px] lg:h-[560px] xl:h-[612px] relative hover:shadow-xl">
                {/* SISYA CLASS Text */}
                <div className="absolute top-0 left-[1px] font-montserrat font-bold text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] xl:text-[14px] leading-[160%] text-[#0595CE]">
                  SISYA CLASS . English
                </div>
                
                {/* Blog Image */}
                <div className="absolute top-[24px] sm:top-[28px] md:top-[30px] lg:top-[28px] xl:top-[32px] left-0 w-full h-[180px] sm:h-[200px] md:h-[210px] lg:h-[205px] xl:h-[231px] overflow-hidden">
                  <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Title */}
                <div className="absolute top-[220px] sm:top-[240px] md:top-[260px] lg:top-[250px] xl:top-[285px] left-[2px] w-[calc(100%-4px)] h-[90px] sm:h-[100px] md:h-[110px] lg:h-[110px] xl:h-[123px] flex items-center">
                  <h3 className="font-montserrat font-bold text-[18px] sm:text-[20px] md:text-[22px] lg:text-[21px] xl:text-[24px] leading-[1.5] text-[#1A2439]">
                    Ready to Master 20 New<br />
                    English Words Every Week?<br />
                    The SISYA CLASS Challenge<br />
                    is ON!
                  </h3>
                </div>
                
                {/* Description */}
                <div className="absolute top-[320px] sm:top-[350px] md:top-[380px] lg:top-[370px] xl:top-[432px] left-[2px] w-[calc(100%-4px)] h-[70px] sm:h-[80px] md:h-[90px] lg:h-[85px] xl:h-[101px] flex items-start">
                  <p className="font-open-sans font-normal text-[14px] sm:text-[15px] md:text-[16px] lg:text-[15px] xl:text-[16px] leading-[1.5] text-[#556A8E]">
                    In today's competitive and globally connected world, a strong command of the English language is not just an advantage — it is essential.
                  </p>
                </div>

                {/* Read Time Badge */}
                <div className="absolute top-[400px] sm:top-[440px] md:top-[480px] lg:top-[465px] xl:top-[533px] left-[2px] w-[100px] sm:w-[110px] md:w-[115px] lg:w-[110px] xl:w-[118px] h-[26px] sm:h-[28px] md:h-[29px] lg:h-[28px] xl:h-[30px] bg-[#F5F7F9] border-2 border-[#D9DBDF] rounded-[40px] flex items-center justify-center gap-1">
                  <svg className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-[#556A8E]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="font-open-sans font-normal text-[10px] sm:text-[11px] md:text-[12px] lg:text-[11px] xl:text-[12px] leading-[1] text-[#556A8E] capitalize">
                    5 Min Read
                  </span>
                </div>
                
                {/* Reads Badge */}
                <div className="absolute top-[400px] sm:top-[440px] md:top-[480px] lg:top-[465px] xl:top-[533px] left-[110px] sm:left-[120px] md:left-[125px] lg:left-[120px] xl:left-[130px] w-[100px] sm:w-[110px] md:w-[115px] lg:w-[110px] xl:w-[118px] h-[26px] sm:h-[28px] md:h-[29px] lg:h-[28px] xl:h-[30px] bg-[#F5F7F9] border-2 border-[#D9DBDF] rounded-[40px] flex items-center justify-center gap-1">
                  <svg className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-[#556A8E]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-open-sans font-normal text-[10px] sm:text-[11px] md:text-[12px] lg:text-[11px] xl:text-[12px] leading-[1] text-[#556A8E] capitalize">
                    700 Reads
                  </span>
                </div>
                
                {/* Author and Date */}
                <div className="absolute top-[440px] sm:top-[480px] md:top-[520px] lg:top-[505px] xl:top-[575px] left-[2px] flex items-center gap-2">
                  <span className="font-montserrat font-normal text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] xl:text-[14px] leading-[160%] text-[#1A2439]">
                    By Author
                  </span>
                  <span className="font-open-sans font-normal text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] xl:text-[14px] leading-[160%] text-[#556A8E]">
                    • May 22, 2025
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

export default SimilarVideos;
