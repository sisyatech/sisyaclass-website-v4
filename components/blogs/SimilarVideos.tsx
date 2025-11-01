"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import RevealOnView from "../Reveal/RevealOnView";
import { getAllBlogs, getAllTags, getBlogsByTag, calculateReadTime, type Blog, type Tag } from "../../lib/blogApi";
import { Heart, MessageCircle, Eye, Calendar, Clock } from "lucide-react";

const SimilarVideos = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [allBlogsForFilter, setAllBlogsForFilter] = useState<Blog[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  // Fetch tags on mount (separate from blogs)
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagsResponse = await getAllTags();
        setTags(tagsResponse || []);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    fetchTags();
  }, []);

  // Fetch blogs based on filter and page
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (activeFilter === "All") {
          const blogsResponse = await getAllBlogs(currentPage, itemsPerPage);
          setBlogs(blogsResponse.blogs || []);
          setTotalPages(Math.ceil((blogsResponse.total || 0) / itemsPerPage));
          setAllBlogsForFilter([]);
        } else {
          // Find tagId by name
          const selected = tags.find(t => t.name === activeFilter);
          if (selected) {
            try {
              const byTag = await getBlogsByTag(selected.id);
              const list = Array.isArray(byTag.blogs) ? byTag.blogs : [];
              setAllBlogsForFilter(list);
              setTotalPages(Math.max(1, Math.ceil(list.length / itemsPerPage)));
              const start = (currentPage - 1) * itemsPerPage;
              setBlogs(list.slice(start, start + itemsPerPage));
            } catch (apiError) {
              console.warn('⚠️ Tag API failed, falling back to client-side filter:', apiError);
              // Fallback: Fetch all blogs and filter client-side by tag name
              try {
                const allBlogsRes = await getAllBlogs(1, 1000); // Get many blogs
                const allBlogs = allBlogsRes.blogs || [];
                const filtered = allBlogs.filter(blog => 
                  blog.tags && blog.tags.some(tagItem => tagItem.tag?.name === activeFilter)
                );
                setAllBlogsForFilter(filtered);
                setTotalPages(Math.max(1, Math.ceil(filtered.length / itemsPerPage)));
                const start = (currentPage - 1) * itemsPerPage;
                setBlogs(filtered.slice(start, start + itemsPerPage));
              } catch (fallbackError) {
                console.error('❌ Fallback filter also failed:', fallbackError);
                setAllBlogsForFilter([]);
                setBlogs([]);
                setTotalPages(1);
              }
            }
          } else {
            // Fallback to empty if tag not found
            setAllBlogsForFilter([]);
            setBlogs([]);
            setTotalPages(1);
          }
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogs([]);
        if (activeFilter !== "All") setAllBlogsForFilter([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, activeFilter, tags]);

  const filterButtons = ["All", ...tags.map(tag => tag.name)];

  const filteredVideos = blogs;

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
          <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-2.5 mb-4 sm:mb-6 md:mb-8 justify-center sm:justify-start">
            {filterButtons.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setCurrentPage(1);
                }}
                className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-[8px] text-[10px] sm:text-[11px] md:text-[12px] font-medium transition-all duration-300 hover:scale-105 ${
                  activeFilter === filter
                    ? "bg-[#575CFB] text-white border-[0.25px] border-[#575CFB]"
                    : "bg-white text-[#1F1F39] border-[0.25px] border-[#D1D1D6]"
                }`}
                style={{
                  boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.15)'
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
              <div key={index} className="w-[280px] sm:w-[320px] md:w-[340px] lg:w-[320px] xl:w-[362px] bg-white rounded-lg animate-pulse overflow-hidden">
                <div className="h-[180px] sm:h-[200px] md:h-[210px] lg:h-[205px] xl:h-[231px] bg-gray-200"></div>
                <div className="p-3 sm:p-4">
                  <div className="h-[60px] sm:h-[70px] md:h-[80px] lg:h-[75px] xl:h-[85px] bg-gray-200 rounded mb-3 sm:mb-4"></div>
                  <div className="h-[45px] sm:h-[50px] md:h-[55px] lg:h-[52px] xl:h-[60px] bg-gray-200 rounded mb-4 sm:mb-5"></div>
                  <div className="h-[30px] bg-gray-200 rounded mb-4 sm:mb-5"></div>
                  <div className="h-[20px] bg-gray-200 rounded"></div>
                </div>
              </div>
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
                  <div className="transition-all duration-300 overflow-hidden group cursor-pointer w-[280px] sm:w-[320px] md:w-[340px] lg:w-[320px] xl:w-[362px] bg-white rounded-lg hover:shadow-xl">
                    {/* Blog Image */}
                    <div className="relative w-full h-[180px] sm:h-[200px] md:h-[210px] lg:h-[205px] xl:h-[231px] overflow-hidden">
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
                    
                    {/* Content Container */}
                    <div className="p-3 sm:p-4">
                      {/* Title */}
                      <div className="mb-3 sm:mb-4">
                        <h3 className="font-montserrat font-bold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[19px] xl:text-[22px] leading-[1.4] text-[#1A2439] line-clamp-3 min-h-[60px] sm:min-h-[70px] md:min-h-[80px] lg:min-h-[75px] xl:min-h-[85px] flex items-start">
                          {blog.title}
                        </h3>
                      </div>
                      
                      {/* Description */}
                      <div className="mb-4 sm:mb-5">
                        <p className="font-open-sans font-normal text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] xl:text-[14px] leading-[1.4] text-[#556A8E] line-clamp-3 min-h-[45px] sm:min-h-[50px] md:min-h-[55px] lg:min-h-[52px] xl:min-h-[60px] flex items-start">
                          {blog.des}
                        </p>
                      </div>

                      {/* Tags */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="mb-3 sm:mb-4 flex flex-wrap gap-1.5 sm:gap-2">
                          {blog.tags.slice(0, 3).map((tagItem, idx) => (
                            <span
                              key={tagItem.tag?.id || idx}
                              className="inline-block bg-[#0595CE] text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-medium"
                            >
                              {tagItem.tag?.name || ''}
                            </span>
                          ))}
                          {blog.tags.length > 3 && (
                            <span className="inline-block text-[#0595CE] text-[9px] sm:text-[10px] font-medium px-1">
                              +{blog.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Stats */}
                      <div className="mb-4 sm:mb-5 flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
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
                      <div className="flex items-center justify-between">
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
