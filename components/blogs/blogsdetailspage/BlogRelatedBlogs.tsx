"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getTrendingBlogs, calculateReadTime, type Blog } from "../../../lib/blogApi";
import { Clock, Eye, MessageCircle } from "lucide-react";

const BlogRelatedBlogs = () => {
  const [trendingBlogs, setTrendingBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchTrendingBlogs = async (retryAttempt = 0) => {
      try {
        setLoading(true);
        console.log(`🔄 Fetching trending blogs (attempt ${retryAttempt + 1})`);
        
        const response = await getTrendingBlogs();
        console.log('📊 Trending blogs response:', response);
        
        // Check if response has trending property and it's an array with content
        if (response && response.trending && Array.isArray(response.trending) && response.trending.length > 0) {
          console.log(`✅ Found ${response.trending.length} trending blogs`);
          setTrendingBlogs(response.trending.slice(0, 3)); // Show only top 3
          setRetryCount(0); // Reset retry count on success
        } else {
          console.warn('⚠️ No trending blogs data received or empty array:', response);
          setTrendingBlogs([]);
          
          // Retry if we haven't exceeded max retries (increased to 5 attempts)
          if (retryAttempt < 4) {
            const delay = retryAttempt < 2 ? 1000 : 2000; // Shorter delay for first few attempts
            console.log(`🔄 Retrying in ${delay/1000} seconds... (attempt ${retryAttempt + 2})`);
            setTimeout(() => {
              setRetryCount(retryAttempt + 1);
              fetchTrendingBlogs(retryAttempt + 1);
            }, delay);
            return;
          }
        }
      } catch (error) {
        console.error('❌ Error fetching trending blogs:', error);
        setTrendingBlogs([]);
        
        // Retry on error if we haven't exceeded max retries
        if (retryAttempt < 4) {
          const delay = retryAttempt < 2 ? 2000 : 3000; // Longer delay for errors
          console.log(`🔄 Retrying after error in ${delay/1000} seconds... (attempt ${retryAttempt + 2})`);
          setTimeout(() => {
            setRetryCount(retryAttempt + 1);
            fetchTrendingBlogs(retryAttempt + 1);
          }, delay);
          return;
        }
      } finally {
        setLoading(false);
      }
    };

    // Add a small initial delay to ensure the page is fully loaded
    const timeoutId = setTimeout(() => {
      fetchTrendingBlogs();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);


  return (
    <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-5 lg:p-6">
      <div className="mb-3 sm:mb-4">
        <h3 className="font-montserrat font-bold text-[16px] sm:text-[18px] md:text-[18px] lg:text-[20px] text-[#1A2439]">
          Trending Blogs
        </h3>
      </div>
      <div className="space-y-3 sm:space-y-4">
        {loading ? (
          // Loading skeleton
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex gap-2 sm:gap-3 p-2 rounded-lg">
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gray-200 rounded-lg animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
            {retryCount > 0 && (
              <div className="text-center text-gray-500 text-xs">
                Loading trending blogs... (attempt {retryCount + 1}/5)
              </div>
            )}
          </div>
        ) : trendingBlogs.length === 0 ? (
          <div className="text-center text-gray-500 text-sm">
            No trending blogs available
            {retryCount > 0 && (
              <div className="text-xs mt-1">
                Failed after {retryCount + 1} attempts
              </div>
            )}
          </div>
        ) : (
          trendingBlogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.id}`}
              className="flex gap-2 sm:gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-all"
            >
              <div className="relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden">
                {blog.banner ? (
                  <Image
                    src={blog.banner}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-xs">No Image</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[#1A2439] text-xs sm:text-sm line-clamp-2 group-hover:text-[#0595CE] transition-colors mb-1">
                  {blog.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{calculateReadTime(blog.content)}</span>
                  <span>•</span>
                  <Eye className="w-3 h-3" />
                  <span>{blog.activityReads}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      <div className="flex justify-center mt-3 sm:mt-4">
        <Link
          href="/blogs"
          className="py-2 px-4 sm:px-6 md:px-8 lg:px-10 bg-[#0595CE] text-white rounded-lg hover:bg-[#047aa8] transition-colors font-semibold text-sm sm:text-base text-center"
        >
          View All Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogRelatedBlogs;

