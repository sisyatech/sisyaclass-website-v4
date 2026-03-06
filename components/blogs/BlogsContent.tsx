"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import RevealOnView from "../Reveal/RevealOnView";
import { getAllBlogs, getBlogsByTag, calculateReadTime, fixProfileImageUrl, type Blog } from "../../lib/blogApi";
import { Heart, MessageCircle, Eye, Calendar, Clock, User } from "lucide-react";

const BlogsContent = () => {
  const [selectedBlog, setSelectedBlog] = useState(0);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const params = useSearchParams();
  const tagId = params?.get('tagId') || '';

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        if (tagId) {
          //console.log("🚀 BlogsContent: Fetching blogs by tag:", tagId);
          const response = await getBlogsByTag(tagId);
          const list = Array.isArray(response.blogs) ? response.blogs : [];
          //console.log("📄 BlogsContent: Setting tag blogs:", list.length);
          setBlogs(list.slice(0, 6));
        } else {
          //console.log("🚀 BlogsContent: Starting to fetch blogs...");
          const response = await getAllBlogs(1, 6); // Get first 6 blogs
          //console.log("📊 BlogsContent: Received response:", response);
          //console.log("📄 BlogsContent: Setting blogs:", response.blogs?.length || 0, "blogs");
          setBlogs(response.blogs || []);
        }
      } catch (error) {
        //console.error("❌ BlogsContent: Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
        //console.log("✅ BlogsContent: Finished fetching blogs");
      }
    };

    fetchBlogs();
  }, [tagId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const currentBlog = blogs[selectedBlog];

  // Log current blog data when it changes
  useEffect(() => {
    if (currentBlog) {
      // //console.log("📋 BlogsContent: Current blog data:", {
      //   id: currentBlog.id,
      //   title: currentBlog.title,
      //   author: currentBlog.authorName,
      //   authorProfile: currentBlog.authorProfile,
      //   banner: currentBlog.banner,
      //   reads: currentBlog.activityReads,
      //   tags: currentBlog.tags?.length || 0,
      // });
      //console.log("🔧 Fixed profile URL:", fixProfileImageUrl(currentBlog.authorProfile));
    }
  }, [currentBlog]);

  if (loading) {
    return (
      <div className="min-screen">
        <div className="pt-2 pb-0 sm:pt-3">
          <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
            {isHomePage && (
              <div className="mb-4 sm:mb-6 md:mb-4">
                <h1 className="font-montserrat text-[28px] leading-[120%] font-bold text-[#1A2439] sm:text-[32px] md:text-[36px] lg:text-[40px]">
                  Blogs
                </h1>
              </div>
            )}
            <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:gap-8">
              {/* Loading skeleton */}
              <div className="w-full lg:max-w-4xl lg:flex-1">
                <div className="overflow-hidden rounded-lg bg-white shadow-lg sm:rounded-xl">
                  <div className="relative aspect-[16/9] animate-pulse bg-gray-200"></div>
                  <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                    <div className="mb-3 h-6 animate-pulse rounded bg-gray-200"></div>
                    <div className="mb-2 h-4 animate-pulse rounded bg-gray-200"></div>
                    <div className="mb-4 h-4 animate-pulse rounded bg-gray-200"></div>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
                      <div className="h-4 flex-1 animate-pulse rounded bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-80 xl:w-96">
                <div className="space-y-3 sm:space-y-4">
                  <h2 className="mb-3 text-base font-bold text-[#1A2439] sm:mb-4 sm:text-lg md:text-xl">
                    Related Blogs
                  </h2>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex gap-2 rounded-lg p-2 sm:gap-3 sm:p-3">
                      <div className="h-16 w-20 animate-pulse rounded-md bg-gray-200 sm:h-20 sm:w-24 md:h-22 md:w-28 lg:h-24 lg:w-32 xl:w-36"></div>
                      <div className="flex-1">
                        <div className="mb-1 h-4 animate-pulse rounded bg-gray-200"></div>
                        <div className="mb-1 h-3 animate-pulse rounded bg-gray-200"></div>
                        <div className="h-3 animate-pulse rounded bg-gray-200"></div>
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
        <div className="pt-2 pb-0 sm:pt-3">
          <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
            {isHomePage && (
              <div className="mb-4 sm:mb-6 md:mb-4">
                <h1 className="font-montserrat text-[28px] leading-[120%] font-bold text-[#1A2439] sm:text-[32px] md:text-[36px] lg:text-[40px]">
                  Blogs
                </h1>
              </div>
            )}
            <div className="py-12 text-center">
              <p className="text-lg text-gray-600">No blogs available at the moment.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-screen">
      {/* Main Content */}
      <div className="pt-2 pb-0 sm:pt-3">
        <div className="mx-auto max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
          {/* Blogs Title - Only show on home page */}
          {isHomePage && (
            <div className="mb-4 sm:mb-6 md:mb-4">
              <h1 className="font-montserrat text-[28px] leading-[120%] font-bold text-[#1A2439] sm:text-[32px] md:text-[36px] lg:text-[40px]">
                Blogs
              </h1>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:gap-6">
            {/* Main Blog Section */}
            <div className="w-full lg:max-w-3xl lg:flex-1">
              <RevealOnView from="left" durationMs={800} delayMs={200}>
                <Link href={`/blogs/${currentBlog.id}`}>
                  <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl sm:rounded-xl">
                    {/* Blog Image Area */}
                    <div className="relative h-[240px] bg-black sm:h-[280px] md:h-[320px] lg:h-[360px]">
                      <Image
                        src={currentBlog.banner || "/blogs/blogimage.svg"}
                        alt={currentBlog.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 800px"
                        unoptimized
                      />
                    </div>

                    {/* Blog Info */}
                    <div className="p-2 sm:p-3 md:p-4 lg:p-5">
                      {/* Title */}
                      <h1 className="mb-2 text-sm leading-tight font-bold text-[#1A2439] sm:text-base md:text-lg">
                        {currentBlog.title}
                      </h1>

                      {/* Description */}
                      <p className="mb-2 line-clamp-2 text-xs leading-relaxed text-gray-700 sm:mb-3 sm:text-sm">
                        {currentBlog.des}
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center gap-2 pb-1 sm:gap-3">
                        <Image
                          src={fixProfileImageUrl(currentBlog.authorProfile)}
                          alt={currentBlog.authorName}
                          width={28}
                          height={28}
                          className="h-6 w-6 flex-shrink-0 rounded-full sm:h-7 sm:w-7 md:h-8 md:w-8"
                          unoptimized
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/logo.png';
                          }}
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-xs font-semibold text-[#1A2439] sm:text-sm">
                            {currentBlog.authorName}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-gray-500 sm:gap-2">
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              <span>{currentBlog.activityReads || 0} reads</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
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
            <div className="w-full lg:w-96 xl:w-[28rem]">
              <RevealOnView from="right" durationMs={800} delayMs={400}>
                <div className="space-y-1 sm:space-y-2">
                  <h2 className="mb-2 text-sm font-bold text-[#1A2439] sm:mb-3 sm:text-base md:text-lg">
                    Related Blogs
                  </h2>

                  {blogs
                    .filter((_, index) => index !== selectedBlog)
                    .slice(0, 4)
                    .map((blog, index) => (
                      <Link
                        key={blog.id}
                        href={`/blogs/${blog.id}`}
                        className="group flex flex-shrink-0 cursor-pointer gap-2 rounded-lg p-2 transition-all duration-300 hover:bg-white hover:shadow-md"
                      >
                        {/* Thumbnail */}
                        <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md bg-black sm:h-20 sm:w-28 md:h-22 md:w-32 lg:h-24 lg:w-36 xl:w-40">
                          <Image
                            src={blog.banner || "/blogs/blogimage.svg"}
                            alt={blog.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 240px"
                            unoptimized
                          />
                        </div>

                        {/* Blog Info */}
                        <div className="min-w-0 flex-1">
                          <h3 className="mb-1 line-clamp-2 text-xs leading-tight font-semibold text-[#1A2439] transition-colors duration-300 group-hover:text-[#0595CE] sm:text-sm">
                            {blog.title}
                          </h3>
                          <p className="mb-1 text-xs text-gray-600">{blog.authorName}</p>
                          <div className="flex flex-col gap-1 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              <span>{blog.activityReads || 0} reads</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(blog.publishedAt)}</span>
                            </div>
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
            <div className="mt-6 flex justify-center sm:mt-8 md:mt-10">
              <Link
                href="/blogs"
                // Reduced base padding (px-4 py-2) and text size (text-xs)
                // Kept sm: variants for larger screens, slightly adjusted for proportion
                className="inline-flex transform items-center gap-2 rounded-lg bg-[#0595CE] px-4 py-2 text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#047aa8] hover:shadow-xl sm:px-6 sm:py-3 sm:text-sm"
              >
                <span>Show More Blogs</span>
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
    </div>
  );
};

export default BlogsContent;
