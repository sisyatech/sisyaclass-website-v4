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
  // Sample news data - in a real app, this would come from an API or database
  const newsData = {
    id: newsId,
    title: "New AI Technology Revolutionizes Online Learning Platforms",
    description: "Educational institutions worldwide are adopting cutting-edge AI technology to enhance student learning experiences and improve academic outcomes through personalized learning paths and intelligent tutoring systems.",
    content: `
      <p>The landscape of education is undergoing a revolutionary transformation as artificial intelligence technology becomes increasingly integrated into online learning platforms. This groundbreaking development is reshaping how students learn, teachers instruct, and educational institutions operate in the digital age.</p>
      
      <h2>The Rise of AI in Education</h2>
      <p>Artificial Intelligence has emerged as a game-changer in the educational sector, offering unprecedented opportunities to personalize learning experiences. Unlike traditional one-size-fits-all approaches, AI-powered platforms can adapt to individual student needs, learning styles, and pace of comprehension.</p>
      
      <h2>Key Benefits for Students</h2>
      <p>Students are experiencing remarkable improvements in their learning outcomes through AI-driven educational tools. These platforms can identify knowledge gaps, provide targeted practice exercises, and offer real-time feedback that helps students understand complex concepts more effectively.</p>
      
      <h2>Impact on Educational Institutions</h2>
      <p>Schools and universities are witnessing significant improvements in student engagement and academic performance. The ability to track individual progress and provide personalized recommendations has proven invaluable for both students and educators.</p>
      
      <h2>Future Prospects</h2>
      <p>As AI technology continues to evolve, we can expect even more sophisticated educational tools that will further revolutionize the learning experience. The future of education looks bright with AI leading the way toward more effective and personalized learning solutions.</p>
    `,
    author: "Tech Reporter",
    authorImage: "/girl.svg",
    authorBio: "Technology journalist with expertise in AI and educational innovation",
    date: "December 15, 2024",
    reads: "2.5K reads",
    readTime: "5 Min Read",
    category: "Technology",
    thumbnail: "/blogs/blogimage.svg",
    tags: ["AI", "Education", "Technology", "Learning", "Innovation"]
  };

  return (
    <div className="min-h-screen py-4 sm:py-6 md:py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-10">
          {/* Left Side - News Content */}
          <div className="w-full lg:flex-1 lg:max-w-4xl order-1">
            <NewsMainContent newsData={newsData} />
            
            {/* FAQ Section - Within Left Side Container */}
            <div className="mt-6 sm:mt-8 md:mt-10">
              <FAQ />
            </div>
          </div>

          {/* Right Side - Sidebar */}
          <div className="w-full lg:w-80 xl:w-96 order-2 lg:order-3">
            <div className="lg:sticky lg:top-4 space-y-4 sm:space-y-6">
              {/* Social Media Share */}
              <NewsSocialShare title={newsData.title} />

              {/* Table of Contents */}
              <NewsTableOfContents />

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
