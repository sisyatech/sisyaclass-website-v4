
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import RevealOnView from "../Reveal/RevealOnView";
import { getAllNews, getAllTags, calculateReadTime, fixProfileImageUrl, type News, type Tag } from "../../lib/newsApi";
import { Clock, Eye, Calendar } from "lucide-react";

const SimilarNews = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [news, setNews] = useState<News[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [newsResponse, tagsResponse] = await Promise.all([
          getAllNews(currentPage, itemsPerPage),
          getAllTags()
        ]);
        
        setNews(newsResponse.news || []);
        setTotalPages(Math.ceil((newsResponse.total || 0) / itemsPerPage));
        setTags(tagsResponse || []);
      } catch (error) {
        console.error('Error fetching news:', error);
        setNews([]);
        setTags([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const filterButtons = ["All", ...tags.map(tag => tag.name)];

  const filteredNews = activeFilter === "All" 
    ? news 
    : news.filter(newsItem => 
        newsItem.tags?.some(tagItem => tagItem.tag.name === activeFilter) ||
        newsItem.category === activeFilter
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-6 xl:gap-8 justify-items-center">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="w-[280px] sm:w-[320px] md:w-[340px] lg:w-[320px] xl:w-[362px] h-[440px] sm:h-[480px] md:h-[510px] lg:h-[490px] xl:h-[540px] bg-gray-200 rounded-lg animate-pulse" />
            ))
          ) : (
            filteredNews.map((news, index) => (
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
                    src={news.banner || "/blogs/blogimage.svg"}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Subtitle */}
                <div className="absolute top-[210px] sm:top-[230px] md:top-[245px] lg:top-[230px] xl:top-[258px] left-[2px] w-[calc(100%-4px)] h-[50px] sm:h-[55px] md:h-[60px] lg:h-[56px] xl:h-[62px] flex items-start">
                  <h3 className="font-montserrat font-bold text-[17px] sm:text-[19px] md:text-[21px] lg:text-[19px] xl:text-[22px] leading-[1.3] text-[#1A2439] line-clamp-2">
                    {news.title}
                  </h3>
                </div>
                
                {/* Description */}
                <div className="absolute top-[268px] sm:top-[292px] md:top-[312px] lg:top-[292px] xl:top-[328px] left-[2px] w-[calc(100%-4px)] h-[65px] sm:h-[75px] md:h-[85px] lg:h-[80px] xl:h-[90px] flex items-start">
                  <p className="font-open-sans font-normal text-[13px] sm:text-[14px] md:text-[15px] lg:text-[14px] xl:text-[15px] leading-[1.4] text-[#556A8E] line-clamp-3">
                    {news.des}
                  </p>
                </div>

                
                {/* Author and Date */}
                <div className="absolute top-[340px] sm:top-[373px] md:top-[403px] lg:top-[378px] xl:top-[425px] left-[2px] flex items-center gap-2">
                  <span className="font-montserrat font-normal text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] xl:text-[14px] leading-[160%] text-[#1A2439]">
                    {news.authorName}
                  </span>
                  <span className="font-open-sans font-normal text-[12px] sm:text-[13px] md:text-[14px] lg:text-[13px] xl:text-[14px] leading-[160%] text-[#556A8E]">
                    {formatDate(news.publishedAt)}
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
      </div>
    </div>
  );
};

export default SimilarNews;
