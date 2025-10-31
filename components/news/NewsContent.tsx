"use client"; // Required for hooks like useState, useEffect, usePathname

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrendingUp } from "lucide-react"; // Make sure lucide-react is installed

// Assuming these are correctly defined in your lib/newsApi file
import { getAllNews, calculateReadTime, fixProfileImageUrl, type News } from "../../lib/newsApi"; 

// --- Placeholder for RevealOnView (if not installed/imported) ---
// If you have this component, remove this placeholder and import the real one.
interface RevealOnViewProps {
  children: React.ReactNode;
  from?: string; 
  durationMs?: number;
  delayMs?: number;
}
const RevealOnView: React.FC<RevealOnViewProps> = ({ children }) => <>{children}</>; 
// --- End Placeholder ---

const NewsContent = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch news data on component mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // console.log("📰 NewsContent: Starting to fetch news...");
        // Fetch only the necessary number of items (1 featured + 3 regular = 4)
        // Adjust page size if your API supports filtering featured items
        const response = await getAllNews(1, 6); // Fetch a few extra just in case
        // console.log("📰 NewsContent: Received response:", response);
        const fetchedNews = response.news || [];
        // console.log("📰 NewsContent: Setting news:", fetchedNews.length, "news items");
        setNews(fetchedNews);
      } catch (error) {
        console.error("❌ NewsContent: Error fetching news:", error);
        setNews([]); // Set to empty array on error
      } finally {
        setLoading(false);
        // console.log("✅ NewsContent: Finished fetching news");
      }
    };

    fetchNews();
  }, []);

  // Simple date formatter
  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "Date unavailable";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return "Invalid Date";
    }
  };

  // --- Loading State ---
  if (loading) {
    return (
      <div className="min-screen py-2 sm:py-3 md:py-4 lg:py-6">
        <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
          {isHomePage && (
            <div className="mb-4 sm:mb-6 md:mb-4">
              <h1 className="font-montserrat text-[28px] leading-[120%] font-bold text-[#1A2439] sm:text-[32px] md:text-[36px] lg:text-[40px]">
                News
              </h1>
            </div>
          )}
          {/* Skeleton Loader */}
          <div className="animate-pulse space-y-4 sm:space-y-6 md:space-y-8">
             {/* Skeleton for Top Row */}
             <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
                {/* Featured Skeleton (2/3) */}
                <div className="w-full lg:w-2/3 h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] rounded-lg bg-gray-200"></div>
                {/* First Regular Skeleton (1/3) */}
                <div className="w-full lg:w-1/3">
                    <div className="rounded-lg bg-gray-200 h-32 sm:h-36"></div>
                    <div className="p-2.5 sm:p-3 space-y-2 mt-2">
                        <div className="h-4 rounded bg-gray-200 w-3/4"></div>
                        <div className="h-3 rounded bg-gray-200 w-full"></div>
                        <div className="h-3 rounded bg-gray-200 w-5/6"></div>
                    </div>
                </div>
             </div>
             {/* Skeleton for Grid Below */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {[1, 2, 3].map((i) => ( // Skeleton for 3 more cards
                <div key={i} className="overflow-hidden rounded-lg bg-white shadow-sm">
                  <div className="h-32 bg-gray-200 sm:h-36"></div>
                  <div className="p-2.5 sm:p-3 space-y-2">
                    <div className="h-4 rounded bg-gray-200 w-3/4"></div>
                    <div className="h-3 rounded bg-gray-200 w-full"></div>
                    <div className="h-3 rounded bg-gray-200 w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- No News State ---
  if (!news || news.length === 0) {
    return (
      <div className="min-screen py-2 sm:py-3 md:py-4 lg:py-6">
        <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
          {isHomePage && (
            <div className="mb-4 sm:mb-6 md:mb-4">
              <h1 className="font-montserrat text-[28px] leading-[120%] font-bold text-[#1A2439] sm:text-[32px] md:text-[36px] lg:text-[40px]">
                News
              </h1>
            </div>
          )}
          <div className="py-12 text-center">
            <p className="text-lg text-gray-600">No news available at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  // Determine featured and regular news
  const featuredNews = news.find((item) => item.featured) || news[0]; // Fallback to first item if none featured
  const regularNews = news.filter((item) => item.id !== featuredNews.id);
  const firstRegularNews = regularNews[0]; // Get the first regular news item
  // Slice remaining for the grid below (always show up to 3 more)
  const remainingRegularNews = regularNews.slice(1, 4);


  return (
    <div className="min-screen py-2 sm:py-3 md:py-4 lg:py-6">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
        {/* News Title - Only show on home page */}
        {isHomePage && (
          <div className="mb-4 sm:mb-6 md:mb-4">
            <h1 className="font-montserrat text-[28px] leading-[120%] font-bold text-[#1A2439] sm:text-[32px] md:text-[36px] lg:text-[40px]">
              News
            </h1>
          </div>
        )}

        {/* --- Main Content Layout --- */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          
          {/* --- Top Row: Featured (2/3) + First Regular (1/3) --- */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
            
            {/* Featured News (Takes 2/3 width on lg screens) */}
            <div className="w-full lg:w-2/3"> 
              <RevealOnView from="bottom" durationMs={800} delayMs={200}>
                <Link href={`/news/${featuredNews.id}`} className="block h-full"> {/* Make link block and h-full */}
                  <div className="group relative transform overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full">
                    {/* Featured Image */}
                    <div className="relative h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px]">
                      <Image
                        src={featuredNews.banner || "https://placehold.co/800x320/cccccc/333333?text=Featured+News"} // Placeholder
                        alt={featuredNews.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 800px"
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://placehold.co/800x320/cccccc/333333?text=Fallback';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                      {/* Badges */}
                      {featuredNews.trending && (
                        <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white sm:top-3 sm:right-3 sm:py-1">
                          <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          TRENDING
                        </div>
                      )}
                      <div className="absolute top-2 left-2 rounded-full bg-[#0595CE] px-2 py-0.5 text-xs font-bold text-white sm:top-3 sm:left-3 sm:py-1">
                        {featuredNews.category || "News"}
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute right-0 bottom-0 left-0 p-3 sm:p-4 md:p-5">
                        <h1 className="mb-1.5 line-clamp-2 text-base leading-tight font-bold text-white transition-colors group-hover:text-[#0595CE] sm:mb-2 sm:text-lg md:text-xl lg:text-2xl">
                          {featuredNews.title}
                        </h1>
                        <p className="mb-2 line-clamp-1 text-xs text-gray-200 sm:line-clamp-2 sm:text-sm">
                          {featuredNews.des}
                        </p>
                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300">
                          <div className="flex items-center gap-1">
                            <Image
                              src={fixProfileImageUrl(featuredNews.authorProfile)}
                              alt={featuredNews.authorName || 'Author'}
                              width={20}
                              height={20}
                              className="h-4 w-4 rounded-full border border-white sm:h-5 sm:w-5 bg-gray-300"
                              unoptimized
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/logo.png';
                              }}
                            />
                            <span className="font-semibold text-white">{featuredNews.authorName || 'Unknown Author'}</span>
                          </div>
                          <span>{formatDate(featuredNews.publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </RevealOnView>
            </div>

            {/* First Regular News Item (Takes 1/3 width on lg screens) */}
            {firstRegularNews && ( 
              <div className="w-full lg:w-1/3">
                <RevealOnView from="bottom" durationMs={800} delayMs={400}>
                  <Link href={`/news/${firstRegularNews.id}`} className="block">
                    <div className="group flex transform flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                      {/* Card Image */}
                      <div className="relative h-32 overflow-hidden sm:h-36">
                        <Image
                          src={firstRegularNews.banner || "https://placehold.co/400x150/cccccc/333333?text=News+Item"} // Placeholder
                          alt={firstRegularNews.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 400px"
                          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://placehold.co/400x150/cccccc/333333?text=Fallback';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                        {/* Badges */}
                        <div className="absolute top-1.5 left-1.5 rounded-full bg-[#0595CE] px-1.5 py-0.5 text-[10px] font-bold text-white">
                          {firstRegularNews.category || "News"}
                        </div>
                        {firstRegularNews.trending && (
                          <div className="absolute top-1.5 right-1.5 rounded-full bg-red-500 p-0.5 text-white">
                            <TrendingUp className="h-2.5 w-2.5" />
                          </div>
                        )}
                      </div>
                      {/* Card Content */}
                      <div className="flex flex-1 flex-col p-2.5 sm:p-3">
                        <h3 className="mb-1.5 line-clamp-2 text-xs leading-tight font-bold text-[#1A2439] transition-colors group-hover:text-[#0595CE] sm:text-sm">
                          {firstRegularNews.title}
                        </h3>
                        <p className="mb-2 line-clamp-2 flex-1 text-[10px] text-gray-600 sm:text-xs">
                          {firstRegularNews.des}
                        </p>
                        {/* Author & Date */}
                        <div className="flex items-center justify-between border-t border-gray-100 pt-1.5 mt-auto"> 
                          <div className="flex items-center gap-1 overflow-hidden"> {/* Added overflow-hidden */}
                            <Image
                              src={fixProfileImageUrl(firstRegularNews.authorProfile)}
                              alt={firstRegularNews.authorName || 'Author'}
                              width={16}
                              height={16}
                              className="h-4 w-4 rounded-full flex-shrink-0 bg-gray-300"
                              unoptimized
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/logo.png';
                              }}
                            />
                            <span className="truncate text-[10px] font-semibold text-[#1A2439]">
                              {firstRegularNews.authorName || 'Unknown Author'}
                            </span>
                          </div>
                          <span className="text-[9px] text-gray-500 flex-shrink-0 ml-1"> {/* Added flex-shrink-0 and ml-1 */}
                            {formatDate(firstRegularNews.publishedAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </RevealOnView>
              </div>
            )}
          </div> {/* End of Top Row */}

          {/* --- Remaining Regular News Grid --- */}
          {remainingRegularNews.length > 0 && ( 
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"> 
              {remainingRegularNews.map((newsItem, index) => (
                <RevealOnView
                  key={newsItem.id}
                  from="bottom"
                  durationMs={800}
                  // Adjust delay based on original index (index + 1 because we skipped the first)
                  delayMs={(index + 1) * 100 + 400} 
                >
                  <Link href={`/news/${newsItem.id}`} className="block h-full"> {/* Make link block and h-full */}
                    <div className="group flex h-full transform flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                      {/* Card Image */}
                      <div className="relative h-32 overflow-hidden sm:h-36">
                        <Image
                          src={newsItem.banner || "https://placehold.co/400x150/cccccc/333333?text=News+Item"} // Placeholder
                          alt={newsItem.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://placehold.co/400x150/cccccc/333333?text=Fallback';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                        {/* Badges */}
                        <div className="absolute top-1.5 left-1.5 rounded-full bg-[#0595CE] px-1.5 py-0.5 text-[10px] font-bold text-white">
                          {newsItem.category || "News"}
                        </div>
                        {newsItem.trending && (
                          <div className="absolute top-1.5 right-1.5 rounded-full bg-red-500 p-0.5 text-white">
                            <TrendingUp className="h-2.5 w-2.5" />
                          </div>
                        )}
                      </div>
                      {/* Card Content */}
                      <div className="flex flex-1 flex-col p-2.5 sm:p-3">
                        <h3 className="mb-1.5 line-clamp-2 text-xs leading-tight font-bold text-[#1A2439] transition-colors group-hover:text-[#0595CE] sm:text-sm">
                          {newsItem.title}
                        </h3>
                        <p className="mb-2 line-clamp-2 flex-1 text-[10px] text-gray-600 sm:text-xs">
                          {newsItem.des}
                        </p>
                        {/* Author & Date */}
                        <div className="flex items-center justify-between border-t border-gray-100 pt-1.5 mt-auto">
                          <div className="flex items-center gap-1 overflow-hidden"> {/* Added overflow-hidden */}
                            <Image
                              src={fixProfileImageUrl(newsItem.authorProfile)}
                              alt={newsItem.authorName || 'Author'}
                              width={16}
                              height={16}
                              className="h-4 w-4 rounded-full flex-shrink-0 bg-gray-300"
                              unoptimized
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/logo.png';
                              }}
                            />
                            <span className="truncate text-[10px] font-semibold text-[#1A2439]">
                              {newsItem.authorName || 'Unknown Author'}
                            </span>
                          </div>
                          <span className="text-[9px] text-gray-500 flex-shrink-0 ml-1"> {/* Added flex-shrink-0 and ml-1 */}
                            {formatDate(newsItem.publishedAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </RevealOnView>
              ))}
            </div>
          )} {/* End of Remaining Grid */}

           {/* Load More Button - Only on Home Page */}
           {isHomePage && news.length >= 5 && ( // Show if there are 5 or more items
             <div className="mt-6 flex justify-center sm:mt-8 md:mt-10">
               <Link
                 href="/news"
                 className="inline-flex transform items-center gap-2 rounded-lg bg-[#0595CE] px-4 py-2 text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#047aa8] hover:shadow-xl sm:px-6 sm:py-3 sm:text-sm"
               >
                 <span>Show More News</span>
                 <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                 </svg>
               </Link>
             </div>
           )}

        </div> {/* End of main content layout */}
      </div>
    </div>
  );
};

export default NewsContent;