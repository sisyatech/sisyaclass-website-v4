"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RevealOnView from "../Reveal/RevealOnView";

const BlogsContent = () => {
  const [selectedBlog, setSelectedBlog] = useState(0);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const blogs = [
    {
      id: 1,
      title: "10 Effective Study Tips for Class 8 Students",
      description: "Discover proven study techniques that will help Class 8 students excel in their academics and develop strong learning habits for future success. This comprehensive guide covers time management, note-taking strategies, and effective revision methods.",
      author: "Dr. Priya Sharma",
      authorImage: "/girl.svg",
      date: "December 15, 2024",
      reads: "125K reads",
      readTime: "5 Min Read",
      category: "Study Tips",
      thumbnail: "/blogs/blogimage.svg",
      tags: ["Class 8", "Study Tips", "Academic Success"]
    },
    {
      id: 2,
      title: "Understanding Mathematics: Fun Ways to Learn Algebra",
      description: "Make algebra enjoyable with these creative learning methods that help students understand mathematical concepts through real-world applications. Learn how to solve equations step by step.",
      author: "Prof. Rajesh Kumar",
      authorImage: "/girl.svg",
      date: "December 12, 2024",
      reads: "89K reads",
      readTime: "7 Min Read",
      category: "Mathematics",
      thumbnail: "/blogs/blogimage.svg",
      tags: ["Algebra", "Mathematics", "Learning Methods"]
    },
    {
      id: 3,
      title: "Science Experiments You Can Do at Home",
      description: "Explore fascinating science experiments that students can safely perform at home to enhance their understanding of scientific concepts. Perfect for curious minds!",
      author: "Dr. Anjali Patel",
      authorImage: "/girl.svg",
      date: "December 10, 2024",
      reads: "156K reads",
      readTime: "6 Min Read",
      category: "Science",
      thumbnail: "/blogs/blogimage.svg",
      tags: ["Science", "Experiments", "Home Learning"]
    },
    {
      id: 4,
      title: "Building Strong Foundation in English Grammar",
      description: "Master English grammar fundamentals with these structured approaches that help students develop strong communication skills and writing abilities.",
      author: "Ms. Sneha Gupta",
      authorImage: "/girl.svg",
      date: "December 8, 2024",
      reads: "98K reads",
      readTime: "8 Min Read",
      category: "English",
      thumbnail: "/blogs/blogimage.svg",
      tags: ["English", "Grammar", "Communication"]
    },
    {
      id: 5,
      title: "Time Management for Students: Balancing Studies and Life",
      description: "Learn essential time management skills that help students maintain a healthy balance between academic responsibilities and personal interests.",
      author: "Dr. Vikram Singh",
      authorImage: "/girl.svg",
      date: "December 5, 2024",
      reads: "73K reads",
      readTime: "6 Min Read",
      category: "Life Skills",
      thumbnail: "/blogs/blogimage.svg",
      tags: ["Time Management", "Life Skills", "Student Success"]
    },
    {
      id: 6,
      title: "Preparing for Board Exams: A Complete Guide",
      description: "Get comprehensive guidance on board exam preparation, including study plans, stress management, and effective revision techniques for success.",
      author: "Dr. Meera Joshi",
      authorImage: "/girl.svg",
      date: "December 3, 2024",
      reads: "203K reads",
      readTime: "10 Min Read",
      category: "Exam Preparation",
      thumbnail: "/blogs/blogimage.svg",
      tags: ["Board Exams", "Preparation", "Study Plans"]
    }
  ];

  const currentBlog = blogs[selectedBlog];

  return (
    <div className="min-screen">

      {/* Main Content */}
      <div className="pt-2 sm:pt-3 pb-0">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          {/* Blogs Title - Only show on home page */}
          {isHomePage && (
            <div className="mb-4 sm:mb-6 md:mb-4">
              <h1 className="font-montserrat font-bold text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-[120%] text-[#1A2439]">
                Blogs
              </h1>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
            {/* Main Blog Section */}
            <div className="w-full lg:flex-1 lg:max-w-4xl">
              <RevealOnView from="left" durationMs={800} delayMs={200}>
                <Link href={`/blogs/${currentBlog.id}`}>
                  <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300">
                  {/* Blog Image Area */}
                  <div className="relative aspect-[16/9] sm:aspect-[16/9] bg-black">
                    <Image
                      src={currentBlog.thumbnail}
                      alt={currentBlog.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Blog Info */}
                  <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                    {/* Title */}
                    <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#1A2439] mb-2 sm:mb-3 leading-tight">
                      {currentBlog.title}
                    </h1>

                    {/* Blog Stats */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-xs sm:text-sm text-gray-600">
                      <span>{currentBlog.reads}</span>
                      <span>•</span>
                      <span>{currentBlog.date}</span>
                      <span>•</span>
                      <span className="bg-[#0595CE] text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                        {currentBlog.category}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 md:mb-5 line-clamp-2 sm:line-clamp-3">
                      {currentBlog.description}
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-2 sm:gap-3 pb-1">
                      <Image
                        src={currentBlog.authorImage}
                        alt={currentBlog.author}
                        width={32}
                        height={32}
                        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-[#1A2439] text-xs sm:text-sm truncate">
                          {currentBlog.author}
                        </h3>
                        <p className="text-gray-600 text-xs truncate">
                          Educational Content Writer
                        </p>
                      </div>
                    </div>
                  </div>
                  </div>
                </Link>
              </RevealOnView>
            </div>

            {/* Sidebar - Related Blogs */}
            <div className="w-full lg:w-80 xl:w-96">
              <RevealOnView from="right" durationMs={800} delayMs={400}>
                <div className="space-y-3 sm:space-y-4 lg:max-h-[700px] lg:overflow-y-auto lg:pr-2 scrollbar-hide">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#1A2439] mb-3 sm:mb-4 lg:sticky lg:top-0 lg:bg-white lg:z-10 lg:pb-2">
                    Related Blogs
                  </h2>
                  
                  {blogs.filter((_, index) => index !== selectedBlog).map((blog, index) => (
                    <Link
                      key={blog.id}
                      href={`/blogs/${blog.id}`}
                      className="flex gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer group flex-shrink-0"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 h-16 sm:h-20 md:h-22 lg:h-24 flex-shrink-0 rounded-md sm:rounded-lg overflow-hidden bg-black">
                        <Image
                          src={blog.thumbnail}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Blog Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#1A2439] text-xs sm:text-sm md:text-base leading-tight mb-1 line-clamp-2 group-hover:text-[#0595CE] transition-colors duration-300">
                          {blog.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-1 truncate">
                          {blog.author}
                        </p>
                        <div className="flex items-center gap-1 sm:gap-2 text-xs text-gray-500">
                          <span className="truncate">{blog.reads}</span>
                          <span>•</span>
                          <span className="truncate">{blog.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </RevealOnView>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default BlogsContent;
