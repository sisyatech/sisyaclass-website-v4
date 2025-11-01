
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import RevealOnView from "../Reveal/RevealOnView";
import { getAllNews, calculateReadTime, fixProfileImageUrl, type News } from "../../lib/newsApi";
import { Clock, Eye, Calendar } from "lucide-react";

const SimilarNews = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [allNews, setAllNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  // Fetch all news once
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch a larger set to filter client-side
        const newsResponse = await getAllNews(1, 1000);
        setAllNews(newsResponse.news || []);
      } catch (error) {
        console.error('Error fetching news:', error);
        setAllNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Time-based filter options
  const filterButtons = ["All", "Recent", "Oldest", "3 Days", "7 Days", "1 Month"];

  // Filter news based on time
  const filteredNews = useMemo(() => {
    if (activeFilter === "All") {
      return [...allNews].sort((a, b) => {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateB - dateA; // Most recent first
      });
    }
    
    if (activeFilter === "Oldest") {
      // Show all news sorted by oldest first
      return [...allNews]
        .filter(newsItem => newsItem.publishedAt)
        .sort((a, b) => {
          const dateA = new Date(a.publishedAt!).getTime();
          const dateB = new Date(b.publishedAt!).getTime();
          return dateA - dateB; // Oldest first
        });
    }
    
    const now = new Date();
    let cutoffDate: Date;

    switch (activeFilter) {
      case "Recent":
        // Last 24 hours
        cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case "3 Days":
        cutoffDate = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
        break;
      case "7 Days":
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "1 Month":
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        return allNews;
    }

    return allNews
      .filter(newsItem => {
        if (!newsItem.publishedAt) return false;
        const publishedDate = new Date(newsItem.publishedAt);
        return publishedDate >= cutoffDate;
      })
      .sort((a, b) => {
        const dateA = new Date(a.publishedAt!).getTime();
        const dateB = new Date(b.publishedAt!).getTime();
        return dateB - dateA; // Most recent first
      });
  }, [allNews, activeFilter]);

  // Paginate filtered news
  const paginatedNews = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredNews.slice(start, start + itemsPerPage);
  }, [filteredNews, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

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

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-6 xl:gap-8 justify-items-center items-stretch">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="w-[260px] sm:w-[300px] md:w-[320px] lg:w-[300px] xl:w-[340px] h-[400px] sm:h-[440px] md:h-[470px] lg:h-[450px] xl:h-[490px] bg-gray-200 rounded-xl animate-pulse" />
            ))
          ) : paginatedNews.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <p className="text-gray-600">No news found for the selected filter.</p>
            </div>
          ) : (
            paginatedNews.map((news, index) => (
            <RevealOnView
              key={news.id}
              from="bottom"
              durationMs={800}
              delayMs={index * 100}
            >
              <Link href={`/news/${news.id}`} className="block h-full">
                <div className="transition-all duration-300 overflow-hidden group cursor-pointer w-[260px] sm:w-[300px] md:w-[320px] lg:w-[300px] xl:w-[340px] bg-white hover:shadow-xl rounded-xl flex flex-col h-full">
                {/* News Image */}
                <div className="relative w-full h-[160px] sm:h-[180px] md:h-[190px] lg:h-[180px] xl:h-[200px] flex-shrink-0 overflow-hidden rounded-t-xl">
                  <Image
                    src={news.banner || "/blogs/blogimage.svg"}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Content Container */}
                <div className="p-2 sm:p-3 flex flex-col flex-1">
                  {/* Title */}
                  <div className="mb-2 sm:mb-3">
                    <h3 className="font-montserrat font-bold text-[17px] sm:text-[19px] md:text-[21px] lg:text-[19px] xl:text-[22px] leading-[1.3] text-[#1A2439] line-clamp-2">
                      {news.title}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <div className="mb-3 sm:mb-4 flex-1">
                    <p className="font-open-sans font-normal text-[13px] sm:text-[14px] md:text-[15px] lg:text-[14px] xl:text-[15px] leading-[1.4] text-[#556A8E] line-clamp-3">
                      {news.des}
                    </p>
                  </div>
                
                  {/* Author and Date */}
                  <div className="flex items-center gap-2 mt-auto">
                    <span className="font-montserrat font-normal text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] xl:text-[14px] leading-[160%] text-[#1A2439]">
                      {news.authorName}
                    </span>
                    <span className="font-open-sans font-normal text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] xl:text-[14px] leading-[160%] text-[#556A8E]">
                      {formatDate(news.publishedAt)}
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
        {!loading && filteredNews.length > 0 && totalPages > 1 && (
          <RevealOnView from="bottom" durationMs={600} delayMs={600}>
            <div className="flex justify-center items-center gap-1 sm:gap-2 mt-4 sm:mt-6 md:mt-8 overflow-x-auto px-4">
            {/* Previous Button */}
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`w-auto px-2 sm:px-3 h-[28px] sm:h-[30px] md:h-[32px] lg:h-[33px] flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-105 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <span className="font-montserrat font-semibold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16.1px] leading-[100%] tracking-[1%] text-[#0595CE]">
                Prev
              </span>
            </button>

            {/* Previous Icon */}
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`w-[28px] sm:w-[30px] md:w-[32px] lg:w-[33px] h-[28px] sm:h-[30px] md:h-[32px] lg:h-[33px] flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-105 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <svg className="w-3 sm:w-3.5 md:w-4 h-3 sm:h-3.5 md:h-4 text-[#0595CE]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 4.293a1 1 0 010 1.414L5.414 10l4.293 4.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M15.707 4.293a1 1 0 010 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>

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
            {totalPages >= 2 && (
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
            )}

            {/* Page 3 */}
            {totalPages >= 3 && (
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
            )}

            {/* Ellipsis */}
            {currentPage > 3 && currentPage < totalPages - 2 && totalPages > 4 && (
              <div className="w-[28px] sm:w-[30px] md:w-[32px] lg:w-[33px] h-[28px] sm:h-[30px] md:h-[32px] lg:h-[33px] flex items-center justify-center flex-shrink-0">
                <span className="font-montserrat font-semibold text-[14px] sm:text-[15px] md:text-[16px] lg:text-[16.1px] leading-[100%] tracking-[1%] text-[#0595CE]">
                  ...
                </span>
              </div>
            )}

            {/* Current Page (if not 1, 2, 3, or last page) */}
            {currentPage > 3 && currentPage < totalPages && totalPages > 4 && (
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
            {currentPage < totalPages - 2 && totalPages > 4 && (
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
        )}
      </div>
    </div>
  );
};

export default SimilarNews;
