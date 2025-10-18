"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Eye, TrendingUp } from "lucide-react";
import RevealOnView from "../Reveal/RevealOnView";

const NewsContent = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const news = [
    {
      id: 1,
      title: "New AI Technology Revolutionizes Online Learning Platforms",
      description: "Educational institutions worldwide are adopting cutting-edge AI technology to enhance student learning experiences and improve academic outcomes.",
      author: "Tech Reporter",
      authorImage: "/girl.svg",
      date: "Dec 15, 2024",
      reads: "2.5K",
      readTime: "5 Min",
      category: "Technology",
      thumbnail: "/NewAppBanner3.png",
      trending: true,
      featured: true
    },
    {
      id: 2,
      title: "Global Climate Summit Reaches Historic Agreement on Education Funding",
      description: "World leaders commit to unprecedented investment in climate education and green technology training programs.",
      author: "World News",
      authorImage: "/girl.svg",
      date: "Dec 14, 2024",
      reads: "1.8K",
      readTime: "7 Min",
      category: "World",
      thumbnail: "/blogs/blogimage.svg",
      trending: false,
      featured: false
    },
    {
      id: 3,
      title: "Breakthrough in Quantum Computing Opens New Possibilities",
      description: "Scientists achieve major milestone in quantum computing that could revolutionize data processing.",
      author: "Science Daily",
      authorImage: "/girl.svg",
      date: "Dec 13, 2024",
      reads: "3.2K",
      readTime: "6 Min",
      category: "Science",
      thumbnail: "/blogs/blogimage.svg",
      trending: true,
      featured: false
    },
    {
      id: 4,
      title: "Digital Learning Platforms See 300% Growth",
      description: "Educational technology companies report unprecedented growth as schools embrace digital solutions.",
      author: "EdTech News",
      authorImage: "/girl.svg",
      date: "Dec 12, 2024",
      reads: "2.1K",
      readTime: "4 Min",
      category: "Education",
      thumbnail: "/blogs/blogimage.svg",
      trending: false,
      featured: false
    },
    
  ];

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
                  src={featuredNews.thumbnail}
                  alt={featuredNews.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
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
                  {featuredNews.category}
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5">
                  <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1.5 sm:mb-2 leading-tight group-hover:text-[#0595CE] transition-colors">
                    {featuredNews.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-200 mb-2 line-clamp-1 sm:line-clamp-2">
                    {featuredNews.description}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300">
                    <div className="flex items-center gap-1">
                      <Image
                        src={featuredNews.authorImage}
                        alt={featuredNews.author}
                        width={20}
                        height={20}
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-white"
                      />
                      <span className="font-semibold text-white">{featuredNews.author}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{featuredNews.readTime}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Eye className="w-3 h-3" />
                      <span>{featuredNews.reads}</span>
                    </div>
                    <span>{featuredNews.date}</span>
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
                      src={newsItem.thumbnail}
                      alt={newsItem.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-1.5 left-1.5 bg-[#0595CE] text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                      {newsItem.category}
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
                      {newsItem.description}
                    </p>

                    {/* Author & Meta */}
                    <div className="flex items-center justify-between pt-1.5 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        <Image
                          src={newsItem.authorImage}
                          alt={newsItem.author}
                          width={16}
                          height={16}
                          className="w-4 h-4 rounded-full"
                        />
                        <span className="text-[10px] font-semibold text-[#1A2439] truncate">{newsItem.author}</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-[10px] text-gray-500">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{newsItem.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </RevealOnView>
          ))}
        </div>

        {/* Load More Button */}
        <RevealOnView from="bottom" durationMs={600} delayMs={800}>
          <div className="text-center mt-8 sm:mt-12">
            <button className="bg-gradient-to-r from-[#0595CE] to-[#0475A8] text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-bold text-sm sm:text-base">
              Load More News
            </button>
          </div>
        </RevealOnView>
      </div>
    </div>
  );
};

export default NewsContent;
