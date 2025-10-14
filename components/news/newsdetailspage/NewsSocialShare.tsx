"use client";

import React from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Mail
} from "lucide-react";

interface NewsSocialShareProps {
  title: string;
}

const NewsSocialShare = ({ title }: NewsSocialShareProps) => {
  const handleShare = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = title;
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
        break;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-5 lg:p-6">
      <h3 className="font-montserrat font-bold text-[16px] sm:text-[18px] md:text-[18px] lg:text-[20px] text-[#1A2439] mb-3 sm:mb-4">
        Share this news
      </h3>
      <div className="flex items-center gap-1 sm:gap-2 md:gap-1 lg:gap-3">
        <button
          onClick={() => handleShare('facebook')}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-all hover:scale-110 flex-shrink-0"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-6 lg:h-6" />
        </button>
        <button
          onClick={() => handleShare('twitter')}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1A91DA] transition-all hover:scale-110 flex-shrink-0"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-6 lg:h-6" />
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#0A66C2] text-white rounded-lg hover:bg-[#095196] transition-all hover:scale-110 flex-shrink-0"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-6 lg:h-6" />
        </button>
        <button
          onClick={() => handleShare('copy')}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all hover:scale-110 flex-shrink-0"
          aria-label="Copy Link"
        >
          <LinkIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-6 lg:h-6" />
        </button>
        <button
          onClick={() => handleShare('email')}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#EA4335] text-white rounded-lg hover:bg-[#D93025] transition-all hover:scale-110 flex-shrink-0"
          aria-label="Share via Email"
        >
          <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-6 lg:h-6" />
        </button>
      </div>
    </div>
  );
};

export default NewsSocialShare;
