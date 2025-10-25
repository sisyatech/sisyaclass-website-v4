"use client";

import React from "react";
import NewsMainContent from "./NewsMainContent";
import NewsSocialShare from "./NewsSocialShare";
import NewsTableOfContents from "./NewsTableOfContents";
import NewsRelatedNews from "./NewsRelatedNews";
import NewsDiscover from "./NewsDiscover";
import NewsSideImage from "./NewsSideImage";
import FAQ from "../../FAQ";

interface NewsDetailContentProps {
  newsId: string;
}

const NewsDetailContent = ({ newsId }: NewsDetailContentProps) => {
  return (
    <div className="min-h-screen py-4 sm:py-6 md:py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6">
          {/* Left Side - News Content */}
          <div className="w-full lg:flex-1 lg:max-w-3xl order-1">
            <NewsMainContent newsId={newsId} />
            
            {/* FAQ Section - Within Left Side Container */}
            <div className="mt-6 sm:mt-8 md:mt-10">
              <FAQ />
            </div>
          </div>

          {/* Right Side - Sidebar */}
          <div className="w-full lg:w-96 xl:w-[28rem] order-2 lg:order-3">
            <div className="space-y-3 sm:space-y-4">
              {/* Social Media Share */}
              <NewsSocialShare newsId={newsId} />

              {/* Table of Contents */}
              <NewsTableOfContents newsId={newsId} />

              {/* Related News */}
              <NewsRelatedNews />

              {/* News Discover */}
              <NewsDiscover />

              {/* News Side Image */}
              <NewsSideImage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailContent;
