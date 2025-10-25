"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RevealOnView from "../Reveal/RevealOnView";
import { getAllBlogs, calculateReadTime, fixProfileImageUrl, type Blog } from "../../lib/blogApi";
import { Heart, MessageCircle, Eye, Calendar, Clock, User } from "lucide-react";

const BlogsContent = () => {
  const [selectedBlog, setSelectedBlog] = useState(0);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        console.log('🚀 BlogsContent: Starting to fetch blogs...');
        const response = await getAllBlogs(1, 6); // Get first 6 blogs
        console.log('📊 BlogsContent: Received response:', response);
        console.log('📄 BlogsContent: Setting blogs:', response.blogs?.length || 0, 'blogs');
        setBlogs(response.blogs || []);
      } catch (error) {
        console.error('❌ BlogsContent: Error fetching blogs:', error);
        setBlogs([]);
      } finally {
        setLoading(false);
        console.log('✅ BlogsContent: Finished fetching blogs');
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const currentBlog = blogs[selectedBlog];

  // Log current blog data when it changes
  useEffect(() => {
    if (currentBlog) {
      console.log('📋 BlogsContent: Current blog data:', {
        id: currentBlog.id,
        title: currentBlog.title,
        author: currentBlog.authorName,
        authorProfile: currentBlog.authorProfile,
        banner: currentBlog.banner,
        reads: currentBlog.activityReads,
        tags: currentBlog.tags?.length || 0
      });
      console.log('🔧 Fixed profile URL:', fixProfileImageUrl(currentBlog.authorProfile));
    }
  }, [currentBlog]);

  if (loading) {
    return (
      <div className="min-screen">
        <div className="pt-2 sm:pt-3 pb-0">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
            {isHomePage && (
              <div className="mb-4 sm:mb-6 md:mb-4">
                <h1 className="font-montserrat font-bold text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-[120%] text-[#1A2439]">
                  Blogs
                </h1>
              </div>
            )}
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
              {/* Loading skeleton */}
              <div className="w-full lg:flex-1 lg:max-w-4xl">
                <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
                  <div className="relative aspect-[16/9] bg-gray-200 animate-pulse"></div>
                  <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse flex-1"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-80 xl:w-96">
                <div className="space-y-3 sm:space-y-4">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#1A2439] mb-3 sm:mb-4">
                    Related Blogs
                  </h2>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg">
                      <div className="w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 h-16 sm:h-20 md:h-22 lg:h-24 bg-gray-200 rounded-md animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="min-screen">
        <div className="pt-2 sm:pt-3 pb-0">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
            {isHomePage && (
              <div className="mb-4 sm:mb-6 md:mb-4">
                <h1 className="font-montserrat font-bold text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-[120%] text-[#1A2439]">
                  Blogs
                </h1>
              </div>
            )}
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No blogs available at the moment.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6">
            {/* Main Blog Section */}
            <div className="w-full lg:flex-1 lg:max-w-3xl">
              <RevealOnView from="left" durationMs={800} delayMs={200}>
                <Link href={`/blogs/${currentBlog.id}`}>
                  <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300">
                  {/* Blog Image Area */}
                  <div className="relative aspect-[16/8] sm:aspect-[16/8] bg-black">
                    <Image
                      src={currentBlog.banner || "/blogs/blogimage.svg"}
                      alt={currentBlog.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Blog Info */}
                  <div className="p-2 sm:p-3 md:p-4 lg:p-5">
                    {/* Title */}
                    <h1 className="text-sm sm:text-base md:text-lg font-bold text-[#1A2439] mb-2 leading-tight">
                      {currentBlog.title}
                    </h1>

                    {/* Description */}
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3 line-clamp-2">
                      {currentBlog.des}
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-2 sm:gap-3 pb-1">
                      <Image
                        src={fixProfileImageUrl(currentBlog.authorProfile)}
                        alt={currentBlog.authorName}
                        width={28}
                        height={28}
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-[#1A2439] text-xs sm:text-sm truncate">
                          {currentBlog.authorName}
                        </h3>
                        <div className="flex items-center gap-1 sm:gap-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{currentBlog.activityReads || 0} reads</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(currentBlog.publishedAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </Link>
              </RevealOnView>
            </div>

            {/* Sidebar - Related Blogs */}
            <div className="w-full lg:w-72 xl:w-80">
              <RevealOnView from="right" durationMs={800} delayMs={400}>
                <div className="space-y-2 sm:space-y-3 lg:max-h-[600px] lg:overflow-y-auto lg:pr-2 scrollbar-hide">
                  <h2 className="text-sm sm:text-base md:text-lg font-bold text-[#1A2439] mb-2 sm:mb-3 lg:sticky lg:top-0 lg:bg-white lg:z-10 lg:pb-2">
                    Related Blogs
                  </h2>
                  
                  {blogs.filter((_, index) => index !== selectedBlog).map((blog, index) => (
                    <Link
                      key={blog.id}
                      href={`/blogs/${blog.id}`}
                      className="flex gap-2 p-2 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer group flex-shrink-0"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 h-16 sm:h-20 md:h-22 lg:h-24 flex-shrink-0 rounded-md overflow-hidden bg-black">
                        <Image
                          src={blog.banner || "/blogs/blogimage.svg"}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Blog Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#1A2439] text-xs sm:text-sm leading-tight mb-1 line-clamp-2 group-hover:text-[#0595CE] transition-colors duration-300">
                          {blog.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-1 truncate">
                          {blog.authorName}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <span className="truncate">{blog.activityReads || 0} reads</span>
                          <span>•</span>
                          <span className="truncate">{formatDate(blog.publishedAt)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </RevealOnView>
            </div>
          </div>

          {/* Show More Button - Only on Home Page */}
          {isHomePage && (
            <div className="flex justify-center mt-6 sm:mt-8 md:mt-10">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#0595CE] text-white rounded-lg hover:bg-[#047aa8] transition-colors font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <span>Show More Blogs</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default BlogsContent;
