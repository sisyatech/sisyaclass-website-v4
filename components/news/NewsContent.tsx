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
        console.log("📰 NewsContent: Starting to fetch news...");
        const response = await getAllNews(1, 6); // Get first 6 news items
        console.log("📰 NewsContent: Received response:", response);
        console.log("📰 NewsContent: Setting news:", response.news?.length || 0, "news items");
        setNews(response.news || []);
      } catch (error) {
        console.error("❌ NewsContent: Error fetching news:", error);
        setNews([]);
      } finally {
        setLoading(false);
        console.log("✅ NewsContent: Finished fetching news");
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
          <div className="animate-pulse">
            <div className="mb-4 h-[200px] rounded-lg bg-gray-200 sm:mb-6 sm:h-[240px] md:h-[280px] lg:h-[320px]"></div>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="overflow-hidden rounded-lg bg-white shadow-sm">
                  <div className="h-32 bg-gray-200 sm:h-36"></div>
                  <div className="p-2.5 sm:p-3">
                    <div className="mb-2 h-4 rounded bg-gray-200"></div>
                    <div className="mb-2 h-3 rounded bg-gray-200"></div>
                    <div className="h-3 rounded bg-gray-200"></div>
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

  const featuredNews = news.find((item) => item.featured) || news[0];
  const regularNews = news.filter((item) => item.id !== featuredNews.id);

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

        {/* Featured News - Large Card */}
        <RevealOnView from="bottom" durationMs={800} delayMs={200}>
          <Link href={`/news/${featuredNews.id}`}>
            <div className="group relative mb-4 transform overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:mb-6">
              {/* Featured Image */}
              <div className="relative h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px]">
                <Image
                  src={featuredNews.banner || "/NewAppBanner3.png"}
                  alt={featuredNews.title}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Trending Badge */}
                {featuredNews.trending && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white sm:top-3 sm:right-3 sm:py-1">
                    <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    TRENDING
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-2 left-2 rounded-full bg-[#0595CE] px-2 py-0.5 text-xs font-bold text-white sm:top-3 sm:left-3 sm:py-1">
                  {featuredNews.category || "News"}
                </div>

                {/* Content Overlay */}
                <div className="absolute right-0 bottom-0 left-0 p-3 sm:p-4 md:p-5">
                  <h1 className="mb-1.5 text-base leading-tight font-bold text-white transition-colors group-hover:text-[#0595CE] sm:mb-2 sm:text-lg md:text-xl lg:text-2xl">
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
                        alt={featuredNews.authorName}
                        width={20}
                        height={20}
                        className="h-4 w-4 rounded-full border border-white sm:h-5 sm:w-5"
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
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {regularNews.slice(0, 3).map((newsItem, index) => (
            <RevealOnView
              key={newsItem.id}
              from="bottom"
              durationMs={800}
              delayMs={index * 100 + 400}
            >
              <Link href={`/news/${newsItem.id}`}>
                <div className="group flex h-full transform flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  {/* Card Image */}
                  <div className="relative h-32 overflow-hidden sm:h-36">
                    <Image
                      src={newsItem.banner || "/blogs/blogimage.svg"}
                      alt={newsItem.title}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                    {/* Category Badge */}
                    <div className="absolute top-1.5 left-1.5 rounded-full bg-[#0595CE] px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {newsItem.category || "News"}
                    </div>

                    {/* Trending Badge */}
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
                    <div className="flex items-center justify-between border-t border-gray-100 pt-1.5">
                      <div className="flex items-center gap-1">
                        <Image
                          src={fixProfileImageUrl(newsItem.authorProfile)}
                          alt={newsItem.authorName}
                          width={16}
                          height={16}
                          className="h-4 w-4 rounded-full"
                        />
                        <span className="truncate text-[10px] font-semibold text-[#1A2439]">
                          {newsItem.authorName}
                        </span>
                      </div>
                      <span className="text-[9px] text-gray-500">
                        {formatDate(newsItem.publishedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </RevealOnView>
          ))}
        </div>

        {/* Load More Button - Only on Home Page */}
        {isHomePage && (
          <div className="mt-6 flex justify-center sm:mt-8 md:mt-10">
            <Link
              href="/news"
              // Reduced base padding (px-4 py-2) and text size (text-xs)
              // Kept sm: variants for larger screens, slightly adjusted for proportion
              className="inline-flex transform items-center gap-2 rounded-lg bg-[#0595CE] px-4 py-2 text-xs font-semibold text-white shadow-lg transition-all transition-colors duration-300 hover:scale-105 hover:bg-[#047aa8] hover:shadow-xl sm:px-6 sm:py-3 sm:text-sm"
            >
              <span>Show More News</span>
              {/* Kept icon size */}
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsContent;