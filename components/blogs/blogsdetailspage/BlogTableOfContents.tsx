"use client";

import React, { useState, useEffect } from "react";
import { getBlogById, type Blog } from "../../../lib/blogApi";

interface BlogTableOfContentsProps {
  blogId: string;
}

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

const BlogTableOfContents = ({ blogId }: BlogTableOfContentsProps) => {
  const [tocItems, setTocItems] = useState<TableOfContentsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogAndGenerateTOC = async () => {
      try {
        setLoading(true);
        const blog = await getBlogById(blogId);
        
        if (blog && blog.content) {
          const headings = extractHeadingsFromContent(blog.content);
          setTocItems(headings);
        } else {
          setTocItems([]);
        }
      } catch (error) {
        //console.error('Error fetching blog for TOC:', error);
        setTocItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogAndGenerateTOC();
  }, [blogId]);

  const extractHeadingsFromContent = (content: any): TableOfContentsItem[] => {
    const headings: TableOfContentsItem[] = [];
    
    // If content is a string (HTML), extract headings using regex
    if (typeof content === 'string') {
      const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi;
      let match;
      
      while ((match = headingRegex.exec(content)) !== null) {
        const level = parseInt(match[1]);
        const text = match[2].replace(/<[^>]*>/g, '').trim(); // Remove HTML tags
        const id = generateId(text);
        
        headings.push({
          id,
          text,
          level
        });
      }
    }
    // If content is TipTap format (object with content array)
    else if (content && typeof content === 'object' && content.content) {
      extractHeadingsFromTipTap(content.content, headings);
    }
    // If content is direct array
    else if (Array.isArray(content)) {
      extractHeadingsFromTipTap(content, headings);
    }
    
    return headings;
  };

  const extractHeadingsFromTipTap = (blocks: any[], headings: TableOfContentsItem[]) => {
    blocks.forEach((block) => {
      if (block && block.type === 'heading') {
        const level = block.attrs?.level || 2;
        const text = extractTextFromTipTapContent(block.content);
        const id = generateId(text);
        
        headings.push({
          id,
          text,
          level
        });
      }
      
      // Recursively check nested content
      if (block.content && Array.isArray(block.content)) {
        extractHeadingsFromTipTap(block.content, headings);
      }
    });
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

  const generateId = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  };

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h3 className="font-montserrat font-bold text-[18px] sm:text-[20px] text-[#1A2439] mb-4">
          On This Page
        </h3>
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-4 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (tocItems.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h3 className="font-montserrat font-bold text-[18px] sm:text-[20px] text-[#1A2439] mb-4">
          On This Page
        </h3>
        <p className="text-gray-500 text-sm">No headings found in this blog</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <h3 className="font-montserrat font-bold text-[18px] sm:text-[20px] text-[#1A2439] mb-4">
        On This Page
      </h3>
      <ul className="space-y-2">
        {tocItems.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => scrollToHeading(item.id)}
              className={`text-[#0595CE] hover:underline text-sm sm:text-base text-left w-full transition-colors ${
                item.level === 1 ? 'font-semibold' : 
                item.level === 2 ? 'ml-0' : 
                item.level === 3 ? 'ml-4' : 
                'ml-8'
              }`}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogTableOfContents;

