"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const NewsRelatedNews = () => {
  const relatedNews = [
    {
      id: 2,
      title: "Global Climate Summit Reaches Historic Agreement on Education Funding",
      thumbnail: "/blogs/blogimage.svg",
      readTime: "7 Min Read"
    },
    {
      id: 3,
      title: "Breakthrough in Quantum Computing Opens New Possibilities for Research",
      thumbnail: "/blogs/blogimage.svg",
      readTime: "6 Min Read"
    },
    {
      id: 4,
      title: "Digital Learning Platforms See 300% Growth During Global Transition",
      thumbnail: "/blogs/blogimage.svg",
      readTime: "4 Min Read"
    }
  ];

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
                src={news.thumbnail}
                alt={news.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-[#1A2439] text-xs sm:text-sm line-clamp-2 group-hover:text-[#0595CE] transition-colors mb-1">
                {news.title}
              </h4>
              <p className="text-xs text-gray-500">{news.readTime}</p>
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
