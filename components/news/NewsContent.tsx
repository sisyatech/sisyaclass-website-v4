
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrendingUp } from "lucide-react";
import RevealOnView from "../Reveal/RevealOnView";
import { getAllNews, calculateReadTime, fixProfileImageUrl, type News } from "../../lib/newsApi";

const NewsContent = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        console.log('📰 NewsContent: Starting to fetch news...');
        const response = await getAllNews(1, 6); // Get first 6 news items
        console.log('📰 NewsContent: Received response:', response);
        console.log('📰 NewsContent: Setting news:', response.news?.length || 0, 'news items');
        setNews(response.news || []);
      } catch (error) {
        console.error('❌ NewsContent: Error fetching news:', error);
        setNews([]);
      } finally {
        setLoading(false);
        console.log('✅ NewsContent: Finished fetching news');
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-screen py-2 sm:py-3 md:py-4 lg:py-6">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          {isHomePage && (
            <div className="mb-4 sm:mb-6 md:mb-4">
              <h1 className="font-montserrat font-bold text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-[120%] text-[#1A2439]">
                News
              </h1>
            </div>
          )}
          <div className="animate-pulse">
            <div className="h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] bg-gray-200 rounded-lg mb-4 sm:mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="h-32 sm:h-36 bg-gray-200"></div>
                  <div className="p-2.5 sm:p-3">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="min-screen py-2 sm:py-3 md:py-4 lg:py-6">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          {isHomePage && (
            <div className="mb-4 sm:mb-6 md:mb-4">
              <h1 className="font-montserrat font-bold text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-[120%] text-[#1A2439]">
                News
              </h1>
            </div>
          )}
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No news available at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  const featuredNews = news.find(item => item.featured) || news[0];
  const regularNews = news.filter(item => item.id !== featuredNews.id);

  return (
    <div className="min-screen py-2 sm:py-3 md:py-4 lg:py-6">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        
        {/* News Title - Only show on home page */}
        {isHomePage && (
          <div className="mb-4 sm:mb-6 md:mb-4">
            <h1 className="font-montserrat font-bold text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-[120%] text-[#1A2439]">
              News
            </h1>
          </div>
        )}

        {/* Featured News - Large Card */}
        <RevealOnView from="bottom" durationMs={800} delayMs={200}>
          <Link href={`/news/${featuredNews.id}`}>
            <div className="relative group mb-4 sm:mb-6 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              {/* Featured Image */}
              <div className="relative h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px]">
                <Image
                  src={featuredNews.banner || "/NewAppBanner3.png"}
                  alt={featuredNews.title}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Trending Badge */}
                {featuredNews.trending && (
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-red-500 text-white px-2 py-0.5 sm:py-1 rounded-full flex items-center gap-1 text-xs font-bold">
                    <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    TRENDING
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-[#0595CE] text-white px-2 py-0.5 sm:py-1 rounded-full text-xs font-bold">
                  {featuredNews.category || "News"}
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5">
                  <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1.5 sm:mb-2 leading-tight group-hover:text-[#0595CE] transition-colors">
                    {featuredNews.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-200 mb-2 line-clamp-1 sm:line-clamp-2">
                    {featuredNews.des}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300">
                    <div className="flex items-center gap-1">
                      <Image
                        src={fixProfileImageUrl(featuredNews.authorProfile)}
                        alt={featuredNews.authorName}
                        width={20}
                        height={20}
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-white"
                      />
                      <span className="font-semibold text-white">{featuredNews.authorName}</span>
                    </div>
                    <span>{formatDate(featuredNews.publishedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </RevealOnView>

        {/* News Grid - Modern Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {regularNews.map((newsItem, index) => (
            <RevealOnView
              key={newsItem.id}
              from="bottom"
              durationMs={800}
              delayMs={index * 100 + 400}
            >
              <Link href={`/news/${newsItem.id}`}>
                <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                  {/* Card Image */}
                  <div className="relative h-32 sm:h-36 overflow-hidden">
                    <Image
                      src={newsItem.banner || "/blogs/blogimage.svg"}
                      alt={newsItem.title}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-1.5 left-1.5 bg-[#0595CE] text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                      {newsItem.category || "News"}
                    </div>

                    {/* Trending Badge */}
                    {newsItem.trending && (
                      <div className="absolute top-1.5 right-1.5 bg-red-500 text-white p-0.5 rounded-full">
                        <TrendingUp className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-2.5 sm:p-3 flex-1 flex flex-col">
                    <h3 className="font-bold text-xs sm:text-sm text-[#1A2439] mb-1.5 line-clamp-2 group-hover:text-[#0595CE] transition-colors leading-tight">
                      {newsItem.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-600 mb-2 line-clamp-2 flex-1">
                      {newsItem.des}
                    </p>

                    {/* Author & Date */}
                    <div className="flex items-center justify-between pt-1.5 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        <Image
                          src={fixProfileImageUrl(newsItem.authorProfile)}
                          alt={newsItem.authorName}
                          width={16}
                          height={16}
                          className="w-4 h-4 rounded-full"
                        />
                        <span className="text-[10px] font-semibold text-[#1A2439] truncate">{newsItem.authorName}</span>
                      </div>
                      <span className="text-[9px] text-gray-500">{formatDate(newsItem.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </RevealOnView>
          ))}
        </div>

        {/* Load More Button - Only on Home Page */}
        {isHomePage && (
            <div className="flex justify-center mt-6 sm:mt-8 md:mt-10">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#0595CE] text-white rounded-lg hover:bg-[#047aa8] transition-colors font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <span>Show More News</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
      </div>
    </div>
  );
};

export default NewsContent;
