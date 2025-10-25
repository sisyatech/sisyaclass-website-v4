
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllNews, calculateReadTime, type News } from "../../../lib/newsApi";

const NewsRelatedNews = () => {
  const [relatedNews, setRelatedNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedNews = async () => {
      try {
        setLoading(true);
        const response = await getAllNews(1, 3); // Get first 3 news items
        setRelatedNews(response.news || []);
      } catch (error) {
        console.error('Error fetching related news:', error);
        setRelatedNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedNews();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-5 lg:p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-16 h-16 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (relatedNews.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-5 lg:p-6">
      <h3 className="font-montserrat font-bold text-[16px] sm:text-[18px] md:text-[18px] lg:text-[20px] text-[#1A2439] mb-3 sm:mb-4">
        Related News
      </h3>
      <div className="space-y-3 sm:space-y-4">
        {relatedNews.map((news) => (
          <Link
            key={news.id}
            href={`/news/${news.id}`}
            className="flex gap-2 sm:gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-all"
          >
            <div className="relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={news.banner || "/blogs/blogimage.svg"}
                alt={news.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-[#1A2439] text-xs sm:text-sm line-clamp-2 group-hover:text-[#0595CE] transition-colors mb-1">
                {news.title}
              </h4>
              <p className="text-xs text-gray-500">{calculateReadTime(news.content)}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-3 sm:mt-4">
        <Link
          href="/news"
          className="py-2 px-4 sm:px-6 md:px-8 lg:px-10 bg-[#0595CE] text-white rounded-lg hover:bg-[#047aa8] transition-colors font-semibold text-sm sm:text-base text-center"
        >
          View All News
        </Link>
      </div>
    </div>
  );
};

export default NewsRelatedNews;
