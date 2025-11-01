"use client";

import React, { useState, useEffect } from "react";
import { Facebook, Twitter, Linkedin, Link as LinkIcon, MessageCircle } from "lucide-react";
import { getBlogById, type Blog } from "../../../lib/blogApi";

interface BlogSocialShareProps {
  blogId: string;
  blogData?: any;
}

const BlogSocialShare = ({ blogId, blogData: serverBlogData }: BlogSocialShareProps) => {
  const [blogData, setBlogData] = useState<Blog | null>(serverBlogData || null);
  const [loading, setLoading] = useState(!serverBlogData);

  useEffect(() => {
    // Only fetch if we don't have server-side data
    if (!serverBlogData) {
      const fetchBlogData = async () => {
        try {
          setLoading(true);
          const blog = await getBlogById(blogId);
          setBlogData(blog);
          console.log("Blog data loaded for sharing:", blog);
        } catch (error) {
          console.error("Error fetching blog for sharing:", error);
          setBlogData(null);
        } finally {
          setLoading(false);
        }
      };

      fetchBlogData();
    }
  }, [blogId, serverBlogData]);

  const handleShare = (platform: string) => {
    // Use the current page URL for LinkedIn and Facebook (for meta tag fetching)
    // Use a custom URL with title slug for Twitter, Copy, and WhatsApp
    // const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const currentUrl = `https://sisyaclass-website-v4.vercel.app/blogs/${blogId}`;
    const title = blogData?.title || "Sisya Class Blog";
    const description = blogData?.des || "Check out this amazing blog post on Sisya Class";

    // Create a formatted share text similar to the example
    const shareText = `Read ${title} - ${description}`;
    // const fullShareText = `${shareText} ${currentUrl}`;

    console.log("Sharing with data:", { title, description, currentUrl, shareText });

    switch (platform) {
      case "facebook":
        // Facebook needs the actual URL to fetch meta tags
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
          "_blank"
        );
        break;
      case "linkedin":
        // LinkedIn needs the actual URL to fetch meta tags
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(currentUrl);
        alert("Blog link copied to clipboard!");
        break;
      case "whatsapp":
        const whatsappText = `Read: ${title}\n${currentUrl}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(whatsappText)}`, "_blank");
        break;
    }
  };

  return (
    <div className="rounded-lg bg-white p-3 shadow-lg sm:p-4 md:p-5 lg:p-6">
      <h3 className="font-montserrat mb-3 text-[16px] font-bold text-[#1A2439] sm:mb-4 sm:text-[18px] md:text-[18px] lg:text-[20px]">
        Share this article
      </h3>
      <div className="flex items-center gap-2 sm:gap-2 md:gap-1 lg:gap-3">
        <button
          onClick={() => handleShare("facebook")}
          disabled={loading || !blogData}
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#1877F2] text-white transition-all hover:scale-110 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 ${
            loading || !blogData ? "cursor-not-allowed opacity-50" : "hover:bg-[#166FE5]"
          }`}
          aria-label="Share on Facebook"
        >
          <Facebook className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 lg:h-6 lg:w-6" />
        </button>
        <button
          onClick={() => handleShare("twitter")}
          disabled={loading || !blogData}
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#1DA1F2] text-white transition-all hover:scale-110 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 ${
            loading || !blogData ? "cursor-not-allowed opacity-50" : "hover:bg-[#1A91DA]"
          }`}
          aria-label="Share on Twitter"
        >
          <Twitter className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 lg:h-6 lg:w-6" />
        </button>
        <button
          onClick={() => handleShare("linkedin")}
          disabled={loading || !blogData}
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#0A66C2] text-white transition-all hover:scale-110 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 ${
            loading || !blogData ? "cursor-not-allowed opacity-50" : "hover:bg-[#095196]"
          }`}
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 lg:h-6 lg:w-6" />
        </button>
        <button
          onClick={() => handleShare("copy")}
          disabled={loading || !blogData}
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gray-600 text-white transition-all hover:scale-110 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 ${
            loading || !blogData ? "cursor-not-allowed opacity-50" : "hover:bg-gray-700"
          }`}
          aria-label="Copy Link"
        >
          <LinkIcon className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 lg:h-6 lg:w-6" />
        </button>
        <button
          onClick={() => handleShare("whatsapp")}
          disabled={loading || !blogData}
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#25D366] text-white transition-all hover:scale-110 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12 ${
            loading || !blogData ? "cursor-not-allowed opacity-50" : "hover:bg-[#20BA5A]"
          }`}
          aria-label="Share on WhatsApp"
        >
          <MessageCircle className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 lg:h-6 lg:w-6" />
        </button>
      </div>
    </div>
  );
};

export default BlogSocialShare;
