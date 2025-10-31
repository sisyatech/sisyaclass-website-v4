"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getNewsById, calculateReadTime, fixProfileImageUrl, type News } from "../../../lib/newsApi";
import { Calendar, User } from "lucide-react";

interface NewsMainContentProps {
  newsId: string;
}

const NewsMainContent = ({ newsId }: NewsMainContentProps) => {
  const [newsData, setNewsData] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        setLoading(true);
        console.log('📰 NewsMainContent: Fetching news with ID:', newsId);
        const news = await getNewsById(newsId);
        console.log('📰 NewsMainContent: Received news data:', news);
        setNewsData(news);
      } catch (error) {
        console.error('❌ NewsMainContent: Error fetching news:', error);
        setNewsData(null);
      } finally {
        setLoading(false);
      }
    };

    if (newsId) {
      fetchNewsData();
    }
  }, [newsId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderNewsContent = (content: any): React.ReactNode => {
    // If content is a string, render as HTML
    if (typeof content === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }

    // If content is an object with content property (TipTap format)
    if (content && typeof content === 'object' && content.content) {
      return renderTipTapContent(content.content);
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
                  {item.content ? item.content.map((paragraph: any, pIndex: number) => {
                    if (paragraph.type === 'paragraph') {
                      return (
                        <span key={pIndex}>
                          {paragraph.content ? renderInlineContent(paragraph.content) : ''}
                        </span>
                      );
                    }
                    return renderTipTapContent([paragraph]);
                  }) : ''}
                </li>
              )) : ''}
            </ul>
          );

        case 'orderedList':
          return (
            <ol key={index} className="list-decimal list-inside mb-4">
              {block.content ? block.content.map((item: any, itemIndex: number) => (
                <li key={itemIndex} className="mb-2">
                  {item.content ? item.content.map((paragraph: any, pIndex: number) => {
                    if (paragraph.type === 'paragraph') {
                      return (
                        <span key={pIndex}>
                          {paragraph.content ? renderInlineContent(paragraph.content) : ''}
                        </span>
                      );
                    }
                    return renderTipTapContent([paragraph]);
                  }) : ''}
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
                title={block.attrs?.title || ''}
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          );

        case 'table':
          return (
            <div key={index} className="overflow-x-auto mb-4">
              <table className="min-w-full border-collapse border border-gray-300">
                <tbody>
                  {block.content ? block.content.map((row: any, rowIndex: number) => {
                    return (
                      <tr key={rowIndex}>
                        {row.content ? row.content.map((cell: any, cellIndex: number) => {
                          const isHeaderCell = cell.type === 'tableHeader';
                          const CellTag = isHeaderCell ? 'th' : 'td';
                          const cellClass = isHeaderCell 
                            ? 'border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left'
                            : 'border border-gray-300 px-4 py-2';
                          
                          return (
                            <CellTag key={cellIndex} className={cellClass}>
                              {cell.content ? (
                                cell.content.map((paragraph: any, pIndex: number) => {
                                  if (paragraph.type === 'paragraph') {
                                    return (
                                      <span key={pIndex}>
                                        {paragraph.content ? renderInlineContent(paragraph.content) : ''}
                                      </span>
                                    );
                                  }
                                  return renderInlineContent(paragraph);
                                })
                              ) : ''}
                            </CellTag>
                          );
                        }) : ''}
                      </tr>
                    );
                  }) : ''}
                </tbody>
              </table>
            </div>
          );

        case 'horizontalRule':
          return (
            <hr key={index} className="my-6 border-gray-300" />
          );

        case 'iframe':
          return (
            <div key={index} className="my-6">
              <iframe
                src={block.attrs?.src}
                width={block.attrs?.width || '100%'}
                height={block.attrs?.height || '400'}
                frameBorder={block.attrs?.frameborder || '0'}
                allowFullScreen={block.attrs?.allowfullscreen === 'true'}
                allow={block.attrs?.allow}
                className="rounded-lg"
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
          let style: React.CSSProperties = {};
          
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
                case 'subscript':
                  text = <sub key={`${index}-subscript`}>{text}</sub>;
                  break;
                case 'superscript':
                  text = <sup key={`${index}-superscript`}>{text}</sup>;
                  break;
                case 'highlight':
                  const highlightColor = mark.attrs?.color || '#ffff00';
                  text = <mark key={`${index}-highlight`} style={{ backgroundColor: highlightColor }}>{text}</mark>;
                  break;
                case 'textStyle':
                  if (mark.attrs?.color) {
                    style.color = mark.attrs.color;
                  }
                  if (mark.attrs?.fontFamily) {
                    style.fontFamily = mark.attrs.fontFamily;
                  }
                  if (mark.attrs?.fontSize) {
                    style.fontSize = mark.attrs.fontSize;
                  }
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
          
          // Apply text style if any
          if (Object.keys(style).length > 0) {
            text = <span style={style}>{text}</span>;
          }
          
          return <span key={index}>{text}</span>;

        case 'hardBreak':
          return <br key={index} />;

        default:
          return <span key={index}>{item.text || ''}</span>;
      }
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

  if (!newsData) {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Unable to Load News</h2>
          <p className="text-gray-600 mb-4">
            There was an error loading this news article. This might be due to:
          </p>
          <ul className="text-left text-gray-600 mb-6 max-w-md mx-auto">
            <li className="mb-2">• The news article doesn't exist</li>
            <li className="mb-2">• Server is temporarily unavailable</li>
            <li className="mb-2">• Network connection issues</li>
          </ul>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-[#0595CE] text-white px-6 py-3 rounded-lg hover:bg-[#047aa8] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
      {/* News Header - Above Image */}
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 pb-4 sm:pb-6">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="bg-[#0595CE] text-white px-3 py-1.5 rounded-full text-sm font-semibold">
            {newsData.category || "News"}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-montserrat font-bold text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] leading-tight text-[#1A2439] mb-4 sm:mb-6">
          {newsData.title}
        </h1>

        {/* Description */}
        <div className="mb-4 sm:mb-6">
          <p className="font-roboto text-[16px] sm:text-[18px] leading-relaxed text-gray-700">
            {newsData.des}
          </p>
        </div>

        {/* Author Info and Date */}
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Image
            src={fixProfileImageUrl(newsData.authorProfile)}
            alt={newsData.authorName}
            width={48}
            height={48}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex-shrink-0"
            unoptimized
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/logo.png';
            }}
          />
          <div className="flex-1">
            <h3 className="font-montserrat font-semibold text-[14px] sm:text-[16px] text-[#1A2439]">
              {newsData.authorName}
            </h3>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(newsData.publishedAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative aspect-[16/6] bg-black">
        <Image
          src={newsData.banner}
          alt={newsData.title}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* News Content */}
      <div className="p-4 sm:p-6 md:p-8 lg:p-10">
        {/* News Content */}
        <div className="prose prose-lg max-w-none mb-8 sm:mb-10">
          {renderNewsContent(newsData.content)}
        </div>

        {/* Tags */}
        {newsData.tags && newsData.tags.length > 0 && (
        <div className="border-t border-gray-200 pt-6 sm:pt-8 mt-6 sm:mt-8">
          <h3 className="font-montserrat font-bold text-[16px] sm:text-[18px] text-[#1A2439] mb-3 sm:mb-4">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
              {newsData.tags.map((tagItem, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                  #{typeof tagItem === 'string' ? tagItem : tagItem.tag?.name || 'Untitled'}
              </span>
            ))}
          </div>
        </div>
        )}
      </div>
    </article>
  );
};

export default NewsMainContent;
