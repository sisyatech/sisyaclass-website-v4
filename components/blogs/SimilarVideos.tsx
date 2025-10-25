"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import RevealOnView from "../Reveal/RevealOnView";
import { getAllBlogs, getAllTags, calculateReadTime, type Blog, type Tag } from "../../lib/blogApi";
import { Heart, MessageCircle, Eye, Calendar, Clock } from "lucide-react";

const SimilarVideos = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [blogsResponse, tagsResponse] = await Promise.all([
          getAllBlogs(currentPage, itemsPerPage),
          getAllTags()
        ]);
        
        setBlogs(blogsResponse.blogs || []);
        setTotalPages(Math.ceil((blogsResponse.total || 0) / itemsPerPage));
        setTags(tagsResponse || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogs([]);
        setTags([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const filterButtons = ["All", ...tags.map(tag => tag.name)];

  const filteredVideos = activeFilter === "All" 
    ? blogs 
    : blogs.filter(blog => 
        blog.tags.some(tagItem => tagItem.tag.name === activeFilter)
      );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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
          {loading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="w-[280px] sm:w-[320px] md:w-[340px] lg:w-[320px] xl:w-[362px] h-[480px] sm:h-[550px] md:h-[580px] lg:h-[560px] xl:h-[612px] bg-gray-200 rounded-lg animate-pulse" />
            ))
          ) : (
            filteredVideos.map((blog, index) => (
              <RevealOnView
                key={blog.id}
                from="bottom"
                durationMs={800}
                delayMs={index * 100}
              >
                <Link href={`/blogs/${blog.id}`}>
                  <div className="transition-all duration-300 overflow-hidden group cursor-pointer w-[280px] sm:w-[320px] md:w-[340px] lg:w-[320px] xl:w-[362px] h-[480px] sm:h-[550px] md:h-[580px] lg:h-[560px] xl:h-[612px] relative hover:shadow-xl bg-white rounded-lg">
                    {/* Blog Image */}
                    <div className="absolute top-0 left-0 w-full h-[180px] sm:h-[200px] md:h-[210px] lg:h-[205px] xl:h-[231px] overflow-hidden">
                      {blog.banner ? (
                        <Image
                          src={blog.banner}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">No Image</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Title */}
                    <div className="absolute top-[200px] sm:top-[220px] md:top-[240px] lg:top-[230px] xl:top-[265px] left-2 right-2 h-[80px] sm:h-[90px] md:h-[100px] lg:h-[95px] xl:h-[108px] flex items-start">
                      <h3 className="font-montserrat font-bold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[19px] xl:text-[22px] leading-[1.4] text-[#1A2439] line-clamp-3">
                        {blog.title}
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <div className="absolute top-[290px] sm:top-[320px] md:top-[350px] lg:top-[340px] xl:top-[385px] left-2 right-2 h-[60px] sm:h-[70px] md:h-[80px] lg:h-[75px] xl:h-[85px] flex items-start">
                      <p className="font-open-sans font-normal text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] xl:text-[14px] leading-[1.4] text-[#556A8E] line-clamp-3">
                        {blog.des}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="absolute top-[360px] sm:top-[400px] md:top-[440px] lg:top-[425px] xl:top-[480px] left-2 right-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 bg-[#F5F7F9] border border-[#D9DBDF] rounded-full px-2 py-1">
                          <Clock className="w-3 h-3 text-[#556A8E]" />
                          <span className="font-open-sans font-normal text-[10px] sm:text-[11px] text-[#556A8E]">
                            {calculateReadTime(blog.content)}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1 bg-[#F5F7F9] border border-[#D9DBDF] rounded-full px-2 py-1">
                          <Eye className="w-3 h-3 text-[#556A8E]" />
                          <span className="font-open-sans font-normal text-[10px] sm:text-[11px] text-[#556A8E]">
                            {blog.activityReads}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 bg-[#F5F7F9] border border-[#D9DBDF] rounded-full px-2 py-1">
                        <MessageCircle className="w-3 h-3 text-[#556A8E]" />
                        <span className="font-open-sans font-normal text-[10px] sm:text-[11px] text-[#556A8E]">
                          {blog.activityComments}
                        </span>
                      </div>
                    </div>
                    
                    {/* Author and Date */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-montserrat font-normal text-[11px] sm:text-[12px] text-[#1A2439]">
                          {blog.authorName}
                        </span>
                      </div>
                      <span className="font-open-sans font-normal text-[11px] sm:text-[12px] text-[#556A8E]">
                        {formatDate(blog.publishedAt)}
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealOnView>
            ))
          )}
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

            {/* Ellipsis before last page */}
            {currentPage < totalPages - 2 && totalPages > 3 && (
              <div className="w-[28px] sm:w-[30px] md:w-[32px] lg:w-[33px] h-[28px] sm:h-[30px] md:h-[32px] lg:h-[33px] flex items-center justify-center flex-shrink-0">
                <span className="font-montserrat font-semibold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16.1px] leading-[100%] tracking-[1%] text-[#0595CE]">
                  ...
                </span>
              </div>
            )}

            {/* Last Page */}
            {totalPages > 3 && (
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`w-[28px] sm:w-[30px] md:w-[32px] lg:w-[33px] h-[28px] sm:h-[30px] md:h-[32px] lg:h-[33px] rounded-[4px] flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-105 ${
                  currentPage === totalPages
                    ? "bg-[#1A2439]"
                    : "bg-transparent"
                }`}
              >
                <span className={`font-montserrat font-semibold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16.1px] leading-[100%] tracking-[1%] ${
                  currentPage === totalPages ? "text-white" : "text-[#0595CE]"
                }`}>
                  {totalPages}
                </span>
              </button>
            )}

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
