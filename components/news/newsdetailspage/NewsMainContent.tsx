"use client";

import React from "react";
import Image from "next/image";

interface NewsMainContentProps {
  newsData: {
    id: string;
    title: string;
    description: string;
    content: string;
    author: string;
    authorImage: string;
    authorBio: string;
    date: string;
    reads: string;
    readTime: string;
    category: string;
    thumbnail: string;
    tags: string[];
  };
}

const NewsMainContent = ({ newsData }: NewsMainContentProps) => {
  return (
    <article className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
      {/* News Header - Above Image */}
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 pb-4 sm:pb-6">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="bg-[#0595CE] text-white px-3 py-1.5 rounded-full text-sm font-semibold">
            {newsData.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-montserrat font-bold text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] leading-tight text-[#1A2439] mb-4 sm:mb-6">
          {newsData.title}
        </h1>

        {/* Description */}
        <div className="mb-4 sm:mb-6">
          <p className="font-roboto text-[16px] sm:text-[18px] leading-relaxed text-gray-700">
            {newsData.description}
          </p>
        </div>

        {/* Author Info and Date */}
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Image
            src={newsData.authorImage}
            alt={newsData.author}
            width={48}
            height={48}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
          />
          <div className="flex-1">
            <h3 className="font-montserrat font-semibold text-[14px] sm:text-[16px] text-[#1A2439]">
              {newsData.author}
            </h3>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <span>{newsData.date}</span>
              <span>•</span>
              <span>{newsData.readTime}</span>
              <span>•</span>
              <span>{newsData.reads}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative aspect-[16/9] bg-black">
        <Image
          src={newsData.thumbnail}
          alt={newsData.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* News Content */}
      <div className="p-4 sm:p-6 md:p-8 lg:p-10">
        {/* News Content */}
        <div 
          className="prose prose-lg max-w-none mb-8 sm:mb-10"
          dangerouslySetInnerHTML={{ __html: newsData.content }}
        />

        {/* Tags */}
        <div className="border-t border-gray-200 pt-6 sm:pt-8 mt-6 sm:mt-8">
          <h3 className="font-montserrat font-bold text-[16px] sm:text-[18px] text-[#1A2439] mb-3 sm:mb-4">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {newsData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsMainContent;
