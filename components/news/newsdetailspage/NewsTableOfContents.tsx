
import React, { useState, useEffect } from "react";
import { getNewsById, type News } from "../../../lib/newsApi";

interface NewsTableOfContentsProps {
  newsId: string;
}

const NewsTableOfContents = ({ newsId }: NewsTableOfContentsProps) => {
  const [newsData, setNewsData] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        setLoading(true);
        const news = await getNewsById(newsId);
        setNewsData(news);
        
        // Extract headings from content
        const extractedHeadings = extractHeadingsFromContent(news.content);
        setHeadings(extractedHeadings);
      } catch (error) {
        console.error('Error fetching news:', error);
        setNewsData(null);
        setHeadings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, [newsId]);

  const extractHeadingsFromContent = (content: any): Array<{ id: string; text: string; level: number }> => {
    const headings: Array<{ id: string; text: string; level: number }> = [];
    
    if (typeof content === 'string') {
      // If content is HTML string, extract headings using regex
      const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi;
      let match;
      while ((match = headingRegex.exec(content)) !== null) {
        const level = parseInt(match[1]);
        const text = match[2].replace(/<[^>]*>/g, ''); // Remove HTML tags
        const id = generateHeadingId(text);
        headings.push({ id, text, level });
      }
    } else if (content && typeof content === 'object' && content.content) {
      // If content is TipTap format
      headings.push(...extractHeadingsFromTipTap(content.content));
    }
    
    return headings;
  };

  const extractHeadingsFromTipTap = (blocks: any[]): Array<{ id: string; text: string; level: number }> => {
    const headings: Array<{ id: string; text: string; level: number }> = [];
    
    if (!Array.isArray(blocks)) return headings;
    
    blocks.forEach(block => {
      if (block && block.type === 'heading') {
        const level = block.attrs?.level || 2;
        const text = extractTextFromTipTapContent(block.content);
        const id = generateHeadingId(text);
        headings.push({ id, text, level });
      }
    });
    
    return headings;
  };

  const extractTextFromTipTapContent = (content: any[]): string => {
    if (!Array.isArray(content)) return '';
    
    return content.map(item => {
      if (item.type === 'text') {
        return item.text || '';
      }
      return '';
    }).join('');
  };

  const generateHeadingId = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  };

  const scrollToHeading = (headingId: string) => {
    const element = document.getElementById(headingId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!newsData || headings.length === 0) {
    return null; // Don't show TOC if no headings found
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <h3 className="font-montserrat font-bold text-[18px] sm:text-[20px] text-[#1A2439] mb-4">
        On This Page
      </h3>
      <div className="space-y-2">
        {headings.map((heading, index) => (
          <button
            key={index}
            onClick={() => scrollToHeading(heading.id)}
            className={`block text-[#0595CE] hover:text-[#047aa8] text-sm transition-colors text-left w-full ${
              heading.level === 1 ? 'ml-0' :
              heading.level === 2 ? 'ml-2' :
              heading.level === 3 ? 'ml-4' :
              heading.level === 4 ? 'ml-6' : 'ml-8'
            }`}
          >
            {heading.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NewsTableOfContents;
