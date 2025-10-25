"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getBlogById, updateBlogReadCount, toggleLikeBlog, calculateReadTime, fixProfileImageUrl, type Blog } from "../../../lib/blogApi";
import { useUser } from "../../UserContext";
import { Heart, MessageCircle, Eye, Calendar, Clock, User } from "lucide-react";

interface BlogMainContentProps {
  blogId: string;
}

const BlogMainContent = ({ blogId }: BlogMainContentProps) => {
  const [blogData, setBlogData] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { user } = useUser();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        const blog = await getBlogById(blogId);
        setBlogData(blog);
        setLikeCount(blog.activityLikes);
        
        // Check if current user has liked this blog
        if (user && blog.likedBy) {
          const userLiked = blog.likedBy.some(like => like.userId === user.id);
          setLiked(userLiked);
        }

        // Update read count
        await updateBlogReadCount(blogId);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setBlogData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [blogId, user]);

  const handleLike = async () => {
    if (!user) {
      alert('Please login to like this blog');
      return;
    }

    try {
      await toggleLikeBlog(blogId, user.id);
      setLiked(!liked);
      setLikeCount(prev => liked ? prev - 1 : prev + 1);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const extractTextFromContent = (content: any[]): string => {
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

  const renderBlogContent = (content: any): React.ReactNode => {
    // If content is a string, render as HTML
    if (typeof content === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }

    // If content is an object with blocks (TipTap format)
    if (content && typeof content === 'object' && content.content) {
      return renderTipTapContent(content.content);
    }

    // If content is an object with blocks array
    if (content && typeof content === 'object' && Array.isArray(content)) {
      return renderTipTapContent(content);
    }

    // Fallback
    return <div>Content not available</div>;
  };

  const renderTipTapContent = (blocks: any[]): React.ReactNode => {
    if (!Array.isArray(blocks)) return null;

    return blocks.map((block, index) => {
      if (!block) return null;

      switch (block.type) {
        case 'paragraph':
          return (
            <p key={index} className="mb-4">
              {block.content ? renderInlineContent(block.content) : ''}
            </p>
          );

        case 'heading':
          const level = block.attrs?.level || 2;
          const headingClass = "font-bold mb-4 mt-6 " + 
            (level === 1 ? "text-3xl" : 
             level === 2 ? "text-2xl" : 
             level === 3 ? "text-xl" : "text-lg");
          
          const headingText = block.content ? extractTextFromContent(block.content) : '';
          const headingId = generateHeadingId(headingText);

          if (level === 1) {
            return (
              <h1 key={index} id={headingId} className={headingClass}>
                {block.content ? renderInlineContent(block.content) : ''}
              </h1>
            );
          } else if (level === 2) {
            return (
              <h2 key={index} id={headingId} className={headingClass}>
                {block.content ? renderInlineContent(block.content) : ''}
              </h2>
            );
          } else if (level === 3) {
            return (
              <h3 key={index} id={headingId} className={headingClass}>
                {block.content ? renderInlineContent(block.content) : ''}
              </h3>
            );
          } else {
            return (
              <h4 key={index} id={headingId} className={headingClass}>
                {block.content ? renderInlineContent(block.content) : ''}
              </h4>
            );
          }

        case 'bulletList':
          return (
            <ul key={index} className="list-disc list-inside mb-4">
              {block.content ? block.content.map((item: any, itemIndex: number) => (
                <li key={itemIndex} className="mb-2">
                  {item.content ? renderInlineContent(item.content) : ''}
                </li>
              )) : ''}
            </ul>
          );

        case 'orderedList':
          return (
            <ol key={index} className="list-decimal list-inside mb-4">
              {block.content ? block.content.map((item: any, itemIndex: number) => (
                <li key={itemIndex} className="mb-2">
                  {item.content ? renderInlineContent(item.content) : ''}
                </li>
              )) : ''}
            </ol>
          );

        case 'blockquote':
          return (
            <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic mb-4">
              {block.content ? renderTipTapContent(block.content) : ''}
            </blockquote>
          );

        case 'codeBlock':
          return (
            <pre key={index} className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
              <code>{block.content ? renderInlineContent(block.content) : ''}</code>
            </pre>
          );

        case 'image':
          return (
            <div key={index} className="my-6">
              <img 
                src={block.attrs?.src} 
                alt={block.attrs?.alt || ''} 
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          );

        default:
          return (
            <div key={index} className="mb-4">
              {block.content ? renderInlineContent(block.content) : ''}
            </div>
          );
      }
    });
  };

  const renderInlineContent = (content: any[]): React.ReactNode => {
    if (!Array.isArray(content)) return '';

    return content.map((item, index) => {
      if (!item) return '';

      switch (item.type) {
        case 'text':
          let text = item.text || '';
          
          // Apply marks (bold, italic, etc.)
          if (item.marks) {
            item.marks.forEach((mark: any) => {
              switch (mark.type) {
                case 'bold':
                  text = <strong key={`${index}-bold`}>{text}</strong>;
                  break;
                case 'italic':
                  text = <em key={`${index}-italic`}>{text}</em>;
                  break;
                case 'underline':
                  text = <u key={`${index}-underline`}>{text}</u>;
                  break;
                case 'strike':
                  text = <s key={`${index}-strike`}>{text}</s>;
                  break;
                case 'code':
                  text = <code key={`${index}-code`} className="bg-gray-100 px-1 rounded">{text}</code>;
                  break;
                case 'link':
                  text = (
                    <a 
                      key={`${index}-link`} 
                      href={mark.attrs?.href} 
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {text}
                    </a>
                  );
                  break;
              }
            });
          }
          
          return <span key={index}>{text}</span>;

        case 'hardBreak':
          return <br key={index} />;

        default:
          return <span key={index}>{item.text || ''}</span>;
      }
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-6"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 text-center">
          <p className="text-gray-500">Blog not found</p>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
      {/* Blog Header - Above Image */}
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 pb-4 sm:pb-6">
        {/* Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {blogData.tags.map((tagItem, index) => (
              <span
                key={index}
                className="bg-[#0595CE] text-white px-3 py-1.5 rounded-full text-sm font-semibold"
              >
                {tagItem.tag.name}
          </span>
            ))}
          </div>
        </div>

        {/* Title */}
        <h1 className="font-montserrat font-bold text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] leading-tight text-[#1A2439] mb-4 sm:mb-6">
          {blogData.title}
        </h1>

        {/* Description */}
        <div className="mb-4 sm:mb-6">
          <p className="font-roboto text-[16px] sm:text-[18px] leading-relaxed text-gray-700">
            {blogData.des}
          </p>
        </div>

        {/* Author Info and Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gray-200">
              {blogData.authorProfile ? (
          <Image
                  src={fixProfileImageUrl(blogData.authorProfile)}
                  alt={blogData.authorName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
          <div className="flex-1">
            <h3 className="font-montserrat font-semibold text-[14px] sm:text-[16px] text-[#1A2439]">
                {blogData.authorName}
            </h3>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(blogData.publishedAt)}</span>
              <span>•</span>
                <Clock className="w-3 h-3" />
                <span>{calculateReadTime(blogData.content)}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                liked 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{likeCount}</span>
            </button>
            
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{blogData.activityComments}</span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg">
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">{blogData.activityReads}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {blogData.banner && (
      <div className="relative aspect-[16/6] bg-black">
        <Image
            src={blogData.banner}
          alt={blogData.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      )}

      {/* Blog Content */}
      <div className="p-4 sm:p-6 md:p-8 lg:p-10">
        {/* Blog Content */}
        <div className="prose prose-lg max-w-none mb-8 sm:mb-10">
          {renderBlogContent(blogData.content)}
        </div>

        {/* Tags */}
        <div className="border-t border-gray-200 pt-6 sm:pt-8 mt-6 sm:mt-8">
          <h3 className="font-montserrat font-bold text-[16px] sm:text-[18px] text-[#1A2439] mb-3 sm:mb-4">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {blogData.tags.map((tagItem, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
              >
                #{tagItem.tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogMainContent;

