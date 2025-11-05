"use client";

import React, { useState, useEffect } from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  MessageCircle
} from "lucide-react";
import { getNewsById, type News } from "../../../lib/newsApi";

interface NewsSocialShareProps {
  newsId: string;
}

const NewsSocialShare = ({ newsId }: NewsSocialShareProps) => {
  const [newsData, setNewsData] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        setLoading(true);
        const news = await getNewsById(newsId);
        setNewsData(news);
      } catch (error) {
        console.error('Error fetching news:', error);
        setNewsData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, [newsId]);

  const handleShare = (platform: string) => {
    if (!newsData) return;
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://sisyaclass.xyz';
    const currentUrl = typeof window !== 'undefined' ? window.location.href : `${origin}/news/${newsData.id}`;
    const customUrl = `${origin}/news/${newsData.id}`;
    const title = newsData.title;
    const description = newsData.des;
    
    // Format text for sharing
    const twitterText = `Read ${title} - ${description} ${customUrl}`;
    const facebookText = `Read ${title} - ${description}\n\n${currentUrl}`;
    const linkedinText = `Read ${title} - ${description}\n\n${currentUrl}`;
    
    switch(platform) {
      case 'facebook':
        // Try Facebook Messenger first, fallback to regular sharing
        const messengerUrl = `fb-messenger://share?text=${encodeURIComponent(facebookText)}`;
        window.open(messengerUrl, '_blank');
        // Fallback if messenger doesn't work
        setTimeout(() => {
          window.open(`https://www.facebook.com/dialog/send?text=${encodeURIComponent(facebookText)}&redirect_uri=${encodeURIComponent(currentUrl)}`, '_blank');
        }, 1000);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`, '_blank');
        break;
      case 'linkedin':
        // Try LinkedIn messaging first
        window.open(`https://www.linkedin.com/messaging/compose/?text=${encodeURIComponent(linkedinText)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(customUrl);
        alert('Link copied to clipboard!');
        break;
      case 'whatsapp':
        const whatsappText = `Read ${title} - ${description} ${customUrl}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(whatsappText)}`, '_blank');
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
          disabled={loading}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-all hover:scale-110 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-6 lg:h-6" />
        </button>
        <button
          onClick={() => handleShare('twitter')}
          disabled={loading}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1A91DA] transition-all hover:scale-110 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-6 lg:h-6" />
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          disabled={loading}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#0A66C2] text-white rounded-lg hover:bg-[#095196] transition-all hover:scale-110 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-6 lg:h-6" />
        </button>
        <button
          onClick={() => handleShare('whatsapp')}
          disabled={loading}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#25D366] text-white rounded-lg hover:bg-[#22C55E] transition-all hover:scale-110 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-6 lg:h-6" />
        </button>
        <button
          onClick={() => handleShare('copy')}
          disabled={loading}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all hover:scale-110 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Copy Link"
        >
          <LinkIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-6 lg:h-6" />
        </button>
      </div>
    </div>
  );
};

export default NewsSocialShare;
