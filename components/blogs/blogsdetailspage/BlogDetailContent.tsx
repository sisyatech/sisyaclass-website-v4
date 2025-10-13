"use client";

import React from "react";
import RevealOnView from "../../Reveal/RevealOnView";
import BlogMainContent from "./BlogMainContent";
import BlogSocialShare from "./BlogSocialShare";
import BlogTableOfContents from "./BlogTableOfContents";
import BlogRelatedBlogs from "./BlogRelatedBlogs";
import BlogDiscover from "./BlogDiscover";
import BlogSideImage from "./BlogSideImage";
import FAQ from "../../FAQ";

interface BlogDetailContentProps {
  blogId: string;
}

const BlogDetailContent = ({ blogId }: BlogDetailContentProps) => {
  // Sample blog data - in a real app, this would come from an API or database
  const blogData = {
    id: blogId,
    title: "10 Effective Study Tips for Class 8 Students",
    description: "Discover proven study techniques that will help Class 8 students excel in their academics and develop strong learning habits for future success.",
    content: `
      <p>Education is the foundation of success, and developing effective study habits early in your academic journey can make a significant difference. For Class 8 students, this is a crucial time to build strong learning foundations that will serve you throughout your educational career.</p>
      
      <h2>1. Create a Dedicated Study Space</h2>
      <p>Having a quiet, organized space for studying helps improve focus and productivity. Make sure your study area is well-lit, comfortable, and free from distractions.</p>
      
      <h2>2. Set Realistic Goals</h2>
      <p>Break down your study sessions into manageable chunks. Set specific, achievable goals for each session to maintain motivation and track progress.</p>
      
      <h2>3. Use Active Learning Techniques</h2>
      <p>Instead of passively reading, engage with the material through note-taking, summarizing, and teaching concepts to others.</p>
      
      <h2>4. Take Regular Breaks</h2>
      <p>The Pomodoro Technique suggests studying for 25 minutes followed by a 5-minute break. This helps maintain focus and prevents burnout.</p>
      
      <h2>1. Create a Dedicated Study Space</h2>
      <p>Having a quiet, organized space for studying helps improve focus and productivity. Make sure your study area is well-lit, comfortable, and free from distractions.</p>
      
      <h2>2. Set Realistic Goals</h2>
      <p>Break down your study sessions into manageable chunks. Set specific, achievable goals for each session to maintain motivation and track progress.</p>
      
      <h2>3. Use Active Learning Techniques</h2>
      <p>Instead of passively reading, engage with the material through note-taking, summarizing, and teaching concepts to others.</p>
      
      <h2>4. Take Regular Breaks</h2>
      <p>The Pomodoro Technique suggests studying for 25 minutes followed by a 5-minute break. This helps maintain focus and prevents burnout.</p>
      
      <h2>1. Create a Dedicated Study Space</h2>
      <p>Having a quiet, organized space for studying helps improve focus and productivity. Make sure your study area is well-lit, comfortable, and free from distractions.</p>
      
      <h2>2. Set Realistic Goals</h2>
      <p>Break down your study sessions into manageable chunks. Set specific, achievable goals for each session to maintain motivation and track progress.</p>
      
      <h2>3. Use Active Learning Techniques</h2>
      <p>Instead of passively reading, engage with the material through note-taking, summarizing, and teaching concepts to others.</p>
      
      <h2>4. Take Regular Breaks</h2>
      <p>The Pomodoro Technique suggests studying for 25 minutes followed by a 5-minute break. This helps maintain focus and prevents burnout.</p>
      
      <h2>1. Create a Dedicated Study Space</h2>
      <p>Having a quiet, organized space for studying helps improve focus and productivity. Make sure your study area is well-lit, comfortable, and free from distractions.</p>
      
      <h2>2. Set Realistic Goals</h2>
      <p>Break down your study sessions into manageable chunks. Set specific, achievable goals for each session to maintain motivation and track progress.</p>
      
      <h2>3. Use Active Learning Techniques</h2>
      <p>Instead of passively reading, engage with the material through note-taking, summarizing, and teaching concepts to others.</p>
      
      <h2>4. Take Regular Breaks</h2>
      <p>The Pomodoro Technique suggests studying for 25 minutes followed by a 5-minute break. This helps maintain focus and prevents burnout.</p>
      
      <h2>1. Create a Dedicated Study Space</h2>
      <p>Having a quiet, organized space for studying helps improve focus and productivity. Make sure your study area is well-lit, comfortable, and free from distractions.</p>
      
      <h2>2. Set Realistic Goals</h2>
      <p>Break down your study sessions into manageable chunks. Set specific, achievable goals for each session to maintain motivation and track progress.</p>
      
      <h2>3. Use Active Learning Techniques</h2>
      <p>Instead of passively reading, engage with the material through note-taking, summarizing, and teaching concepts to others.</p>
      
      <h2>4. Take Regular Breaks</h2>
      <p>The Pomodoro Technique suggests studying for 25 minutes followed by a 5-minute break. This helps maintain focus and prevents burnout.</p>
      
      <h2>1. Create a Dedicated Study Space</h2>
      <p>Having a quiet, organized space for studying helps improve focus and productivity. Make sure your study area is well-lit, comfortable, and free from distractions.</p>
      
      <h2>2. Set Realistic Goals</h2>
      <p>Break down your study sessions into manageable chunks. Set specific, achievable goals for each session to maintain motivation and track progress.</p>
      
      <h2>3. Use Active Learning Techniques</h2>
      <p>Instead of passively reading, engage with the material through note-taking, summarizing, and teaching concepts to others.</p>
      
      <h2>4. Take Regular Breaks</h2>
      <p>The Pomodoro Technique suggests studying for 25 minutes followed by a 5-minute break. This helps maintain focus and prevents burnout.</p>
      
      <h2>5. Practice Regularly</h2>
      <p>Consistent practice is key to mastering any subject. Review your notes daily and solve practice problems regularly.</p>
    `,
    author: "Dr. Priya Sharma",
    authorImage: "/girl.svg",
    authorBio: "Educational Content Writer with 10+ years of experience",
    date: "December 15, 2024",
    reads: "125K reads",
    readTime: "5 Min Read",
    category: "Study Tips",
    thumbnail: "/blogs/blogimage.svg",
    tags: ["Class 8", "Study Tips", "Academic Success", "Learning Methods", "Education"]
  };

  return (
    <div className="min-h-screen py-4 sm:py-6 md:py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-10">
          {/* Left Side - Blog Content */}
          <div className="w-full lg:flex-1 lg:max-w-4xl order-1">
            <BlogMainContent blogData={blogData} />
            
            {/* FAQ Section - Within Left Side Container */}
            <div className="mt-6 sm:mt-8 md:mt-10">
              <FAQ />
            </div>
          </div>

          {/* Right Side - Sidebar */}
          <div className="w-full lg:w-80 xl:w-96 order-2 lg:order-3">
            <div className="lg:sticky lg:top-4 space-y-4 sm:space-y-6">
              {/* Social Media Share */}
              <BlogSocialShare title={blogData.title} />

              {/* Table of Contents */}
              <BlogTableOfContents />

              {/* Related Blogs */}
              <BlogRelatedBlogs />

              {/* Blog Discover */}
              <BlogDiscover />

              {/* Blog Side Image */}
              <BlogSideImage />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailContent;

