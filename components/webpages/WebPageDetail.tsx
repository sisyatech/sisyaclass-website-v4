"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getWebPageBySlug, type WebPage } from "@/lib/webPageApi";
import { Calendar, User } from "lucide-react";

interface WebPageDetailProps {
  slug: string;
}

const WebPageDetail = ({ slug }: WebPageDetailProps) => {
  const [pageData, setPageData] = useState<WebPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        const data = await getWebPageBySlug(slug);
        setPageData(data);
      } catch (error) {
        console.error('Error fetching web page:', error);
        setPageData(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPageData();
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderContent = (content: any): React.ReactNode => {
    if (typeof content === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }

    if (content && typeof content === 'object' && content.content) {
      return renderTipTapContent(content.content);
    }

    return <div>Content not available</div>;
  };

  const renderTipTapContent = (blocks: any[]): React.ReactNode => {
    if (!Array.isArray(blocks)) return null;

    return blocks.map((block, index) => {
      if (!block) return null;

      switch (block.type) {
        case 'paragraph':
          const textAlign = block.attrs?.textAlign || 'left';
          return (
            <p 
              key={index} 
              className="mb-4 text-gray-700 leading-relaxed"
              style={{ textAlign: textAlign as any }}
            >
              {block.content ? renderInlineContent(block.content) : ''}
            </p>
          );


        case 'heading':
          const level = block.attrs?.level || 2;
          const headingClass = "font-bold mb-4 mt-8 text-[#1A2439] " + 
            (level === 1 ? "text-4xl md:text-5xl" : 
             level === 2 ? "text-3xl md:text-4xl" : 
             level === 3 ? "text-2xl md:text-3xl" : "text-xl md:text-2xl");
          
          return React.createElement(
            `h${level}`,
            { key: index, className: headingClass },
            block.content ? renderInlineContent(block.content) : ''
          );

        case 'bulletList':
          return (
            <ul key={index} className="list-disc ml-6 mb-6 space-y-2">
              {block.content?.map((item: any, i: number) => (
                <li key={i} className="text-gray-700">
                  {item.content?.map((child: any, ci: number) => {
                    if (child.type === 'paragraph') {
                      return <span key={ci}>{child.content ? renderInlineContent(child.content) : ''}</span>;
                    }
                    return renderTipTapContent([child]);
                  })}
                </li>
              ))}
            </ul>
          );

        case 'orderedList':
          return (
            <ol key={index} className="list-decimal ml-6 mb-6 space-y-2">
              {block.content?.map((item: any, i: number) => (
                <li key={i} className="text-gray-700">
                  {item.content?.map((child: any, ci: number) => {
                    if (child.type === 'paragraph') {
                      return <span key={ci}>{child.content ? renderInlineContent(child.content) : ''}</span>;
                    }
                    return renderTipTapContent([child]);
                  })}
                </li>
              ))}
            </ol>
          );


        case 'image':
          return (
            <div key={index} className="my-8">
              <img 
                src={block.attrs?.src} 
                alt={block.attrs?.alt || ''} 
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          );

        case 'table':
          return (
            <div key={index} className="overflow-x-auto my-8">
              <table className="min-w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
                <tbody>
                  {block.content?.map((row: any, ri: number) => (
                    <tr key={ri}>
                      {row.content?.map((cell: any, ci: number) => {
                        const isHeader = cell.type === 'tableHeader';
                        const Tag = isHeader ? 'th' : 'td';
                        return (
                          <Tag key={ci} className={`border border-gray-200 px-4 py-3 text-left ${isHeader ? 'bg-gray-50 font-bold' : ''}`}>
                            {cell.content ? renderTipTapContent(cell.content) : ''}
                          </Tag>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );

        case 'iframe':
          return (
            <div key={index} className="my-8 aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                src={block.attrs?.src}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          );

        case 'horizontalRule':
          return <hr key={index} className="my-10 border-gray-200" />;

        default:
          return null;
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
          if (item.marks) {
            item.marks.forEach((mark: any) => {
              if (mark.type === 'bold') text = <strong key={index}>{text}</strong>;
              if (mark.type === 'italic') text = <em key={index}>{text}</em>;
              if (mark.type === 'underline') text = <u key={index}>{text}</u>;
              if (mark.type === 'link') {
                text = (
                  <a 
                    key={index} 
                    href={mark.attrs?.href} 
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {text}
                  </a>
                );
              }
            });
          }
          return <span key={index}>{text}</span>;
        case 'hardBreak':
          return <br key={index} />;
        default:
          return item.text || '';
      }
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-6 animate-pulse">
        <div className="h-4 bg-gray-200 w-24 rounded-full mb-6"></div>
        <div className="h-12 bg-gray-200 w-3/4 rounded-lg mb-8"></div>
        <div className="h-[400px] bg-gray-200 w-full rounded-2xl mb-12"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 w-full rounded"></div>
          <div className="h-4 bg-gray-200 w-full rounded"></div>
          <div className="h-4 bg-gray-200 w-2/3 rounded"></div>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600">The content you are looking for is unavailable.</p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-8">
        <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
          {pageData.type.replace(/_/g, ' ')}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A2439] leading-tight mb-6">
          {pageData.title}
        </h1>
        <div className="flex items-center gap-6 text-gray-500 text-sm font-medium">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-500" />
            <span>{pageData.authorName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>{formatDate(pageData.publishedAt || pageData.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="relative aspect-[16/9] mb-12 rounded-2xl overflow-hidden shadow-2xl">
        <img 
          src={pageData.banner} 
          alt={pageData.bannerAlt || pageData.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="mb-10 text-xl text-gray-600 leading-relaxed font-medium italic border-l-4 border-blue-600 pl-6">
          {pageData.des}
        </div>
        {renderContent(pageData.content)}
      </div>
    </article>
  );
};

export default WebPageDetail;
