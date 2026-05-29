"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { getWebPageBySlug, type WebPage } from "@/lib/webPageApi";
import { Calendar, User, X, Download, FileText } from "lucide-react";
import PdfLeadFormPopup from "./PdfLeadFormPopup";

interface WebPageDetailProps {
  slug: string;
  initialData?: WebPage | null;
}

// ---------------------------------------------------------------------------
// PDF Viewer Modal
// ---------------------------------------------------------------------------
function PdfViewerModal({
  src,
  name,
  onClose,
}: {
  src: string;
  name: string;
  onClose: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.78)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          width: "100%",
          maxWidth: "920px",
          maxHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 30px 70px rgba(0,0,0,0.45)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderBottom: "1px solid #e5e7eb",
            background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#fff",
              minWidth: 0,
            }}
          >
            <FileText
              style={{ flexShrink: 0, color: "#fca5a5", width: 22, height: 22 }}
            />
            <span
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "none",
              color: "#fff",
              borderRadius: "50%",
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
            aria-label="Close PDF viewer"
          >
            <X size={18} />
          </button>
        </div>

        {/* PDF iframe */}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <iframe
            src={`${src}#toolbar=1&navpanes=0&scrollbar=1`}
            title={name}
            style={{
              width: "100%",
              height: "68vh",
              border: "none",
              display: "block",
            }}
          />
        </div>

        {/* Footer — form-based download */}
        <div
          style={{
            padding: "14px 20px",
            borderTop: "1px solid #e5e7eb",
            background: "#f9fafb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>
            Click Download to save a copy of this PDF.
          </span>
          {/* Hidden form — triggers a GET to the GCS URL opening in a new tab which downloads */}
          <form
            ref={formRef}
            method="get"
            action={src}
            target="_blank"
            style={{ display: "none" }}
          />
          <button
            onClick={() => formRef.current?.submit()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 22px",
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(37,99,235,0.35)",
            }}
          >
            <Download size={16} /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

const WebPageDetail = ({ slug, initialData }: WebPageDetailProps) => {
  const [pageData, setPageData] = useState<WebPage | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [pdfViewer, setPdfViewer] = useState<{ src: string; name: string } | null>(null);
  const [pendingPdfDownload, setPendingPdfDownload] = useState<{ url: string; name: string } | null>(null);

  useEffect(() => {
    if (initialData && initialData.slug === slug) {
      setPageData(initialData);
      setLoading(false);
      return;
    }

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
  }, [slug, initialData]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const executeDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      // ensure extension
      a.download = filename.toLowerCase().endsWith('.pdf') ? filename : `${filename}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed via blob, falling back to new tab', error);
      window.open(url, '_blank');
    }
  };

  const handleDownloadClick = (e: React.MouseEvent, url: string, filename: string, requireLeadForm: boolean) => {
    e.preventDefault();
    if (requireLeadForm) {
      setPendingPdfDownload({ url, name: filename });
    } else {
      executeDownload(url, filename);
    }
  };

  const renderContent = (content: any): React.ReactNode => {
    // Debug: log the content type and structure
    console.log('[WebPageDetail] content type:', typeof content, content);

    // If content is a string, try to parse it as JSON first
    if (typeof content === 'string') {
      try {
        const parsed = JSON.parse(content);
        if (parsed && parsed.type === 'doc' && Array.isArray(parsed.content)) {
          console.log('[WebPageDetail] parsed string content as TipTap JSON');
          return renderTipTapContent(parsed.content);
        }
      } catch {
        // not JSON — fall through to raw HTML
      }
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }

    if (content && typeof content === 'object' && content.content) {
      return renderTipTapContent(content.content);
    }

    return <div>Content not available</div>;
  };

  const renderTipTapContent = (blocks: any[], inTable = false): React.ReactNode => {
    if (!Array.isArray(blocks)) return null;

    return blocks.map((block, index) => {
      if (!block) return null;

      switch (block.type) {
        case 'paragraph': {
          const textAlign = block.attrs?.textAlign || 'left';

          // If this paragraph contains a pdfBlock
          const pdfItem = block.content?.find((c: any) => c.type === 'pdfBlock');
          if (pdfItem) {
            const pdfSrc  = pdfItem.attrs?.src  || '';
            const pdfName = pdfItem.attrs?.name || 'PDF Document';
            const requireLeadForm = !!pdfItem.attrs?.requireLeadForm;

            // ── Inside a table cell: compact chip + download button ─────────
            if (inTable) {
              return (
                <div
                  key={index}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 10px',
                    background: '#f5f3ff',
                    border: '1px solid #c4b5fd',
                    borderRadius: 8,
                    maxWidth: '100%',
                  }}
                >
                  <FileText size={14} style={{ color: '#7c3aed', flexShrink: 0 }} />
                  <span style={{
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    color: '#4c1d95',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: 160,
                  }}>
                    {pdfName}
                  </span>
                  <button
                    onClick={(e) => handleDownloadClick(e, pdfSrc, pdfName, requireLeadForm)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: '4px 10px',
                      background: '#02bdfe',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 5,
                      fontWeight: 700,
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      boxShadow: '0 2px 6px rgba(2,189,254,0.35)',
                    }}
                  >
                    <Download size={11} /> Download
                  </button>
                </div>
              );
            }

            const pdfBannerTitle = pdfItem.attrs?.bannerTitle || 'Do you need help with your Homework?\nAre you preparing for Exams?';
            const pdfBannerSubtitle = pdfItem.attrs?.bannerSubtitle || 'Study without internet (offline)';

            // ── Standalone in content: full embedded card ───────────────────
            return (
              <div
                key={index}
                style={{
                  margin: '32px 0',
                  borderRadius: 14,
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                  background: '#fff',
                }}
              >
                {/* Download banner */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 16,
                    padding: '20px 28px',
                    background: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
                    borderBottom: '1px solid #c4b5fd',
                  }}
                >
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '1rem', color: '#1e1b4b', marginBottom: 4, whiteSpace: 'pre-line' }}>
                      {pdfBannerTitle}
                    </p>
                    <p style={{ fontSize: '0.82rem', color: '#5b21b6', margin: 0 }}>
                      {pdfBannerSubtitle}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleDownloadClick(e, pdfSrc, pdfName, requireLeadForm)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '12px 26px',
                      background: '#02bdfe',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 10,
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(2,189,254,0.4)',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    <Download size={16} /> Download full PDF
                  </button>
                </div>

                {/* PDF name row */}
                <div
                  style={{
                    padding: '14px 28px',
                    borderBottom: '1px solid #f3f4f6',
                    background: '#fafafa',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <FileText size={18} style={{ color: '#7c3aed', flexShrink: 0 }} />
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1f2937' }}>
                    {pdfName}
                  </span>
                </div>

                {/* Embedded PDF preview */}
                <iframe
                  src={`${pdfSrc}#toolbar=0&navpanes=0&scrollbar=1`}
                  title={pdfName}
                  style={{
                    width: '100%',
                    height: 580,
                    border: 'none',
                    display: 'block',
                    background: '#f9fafb',
                  }}
                />
              </div>
            );
          }

          return (
            <p
              key={index}
              className="mb-4 text-gray-700 leading-relaxed"
              style={{ textAlign: textAlign as any }}
            >
              {block.content ? renderInlineContent(block.content) : ''}
            </p>
          );
        }


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
              <table
                className="border-collapse border border-gray-200 rounded-lg overflow-hidden"
                style={{ width: 'auto', tableLayout: 'auto' }}
              >
                <tbody>
                  {block.content?.map((row: any, ri: number) => (
                    <tr key={ri}>
                      {row.content?.map((cell: any, ci: number) => {
                        const isHeader = cell.type === 'tableHeader';
                        const Tag = isHeader ? 'th' : 'td';
                        // Check if cell contains a pdfBlock so we can shrink the column
                        const hasPdf = cell.content?.some(
                          (b: any) => b.type === 'pdfBlock' ||
                            b.content?.some((c: any) => c.type === 'pdfBlock')
                        );
                        return (
                          <Tag
                            key={ci}
                            className={`border border-gray-200 px-4 py-3 text-left ${isHeader ? 'bg-gray-50 font-bold' : ''}`}
                            style={hasPdf ? { width: '1%', whiteSpace: 'nowrap' } : undefined}
                          >
                            {cell.content ? renderTipTapContent(cell.content, true) : ''}
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

        case 'pdfBlock': {
          const pdfSrc = block.attrs?.src || '';
          const pdfName = block.attrs?.name || 'PDF Document';
          return (
            <div
              key={index}
              style={{
                margin: '32px 0',
                borderRadius: 14,
                overflow: 'hidden',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                background: '#fff',
              }}
            >
              {/* Download banner — matches the Vedantu style */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 16,
                  padding: '20px 28px',
                  background: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
                  borderBottom: '1px solid #c4b5fd',
                }}
              >
                <div>
                  <p style={{ fontWeight: 700, fontSize: '1rem', color: '#1e1b4b', marginBottom: 4 }}>
                    Do you need help with your Homework?<br />Are you preparing for Exams?
                  </p>
                  <p style={{ fontSize: '0.82rem', color: '#5b21b6', margin: 0 }}>
                    Study without internet (offline)
                  </p>
                </div>
                <form method="get" action={pdfSrc} target="_blank" style={{ display: 'contents' }}>
                  <button
                    type="submit"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '12px 26px',
                      background: 'linear-gradient(135deg, #f97316, #ea580c)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 10,
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(249,115,22,0.4)',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    <Download size={16} /> Download full PDF
                  </button>
                </form>
              </div>

              {/* PDF title row */}
              <div
                style={{
                  padding: '14px 28px',
                  borderBottom: '1px solid #f3f4f6',
                  background: '#fafafa',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <FileText size={18} style={{ color: '#7c3aed', flexShrink: 0 }} />
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1f2937' }}>
                  {pdfName}
                </span>
              </div>

              {/* Embedded PDF preview */}
              <iframe
                src={`${pdfSrc}#toolbar=0&navpanes=0&scrollbar=1`}
                title={pdfName}
                style={{
                  width: '100%',
                  height: 580,
                  border: 'none',
                  display: 'block',
                  background: '#f9fafb',
                }}
              />
            </div>
          );
        }

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
        // pdfBlock can also appear inline (inside a table cell paragraph)
        case 'pdfBlock':
          return (
            <span
              key={index}
              onClick={() =>
                setPdfViewer({ src: item.attrs?.src, name: item.attrs?.name || 'PDF Document' })
              }
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 12px',
                background: '#fee2e2',
                border: '1px solid #fca5a5',
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: '0.85rem',
                color: '#b91c1c',
                fontWeight: 700,
                margin: '2px 4px',
              }}
              title={`Click to view: ${item.attrs?.name}`}
            >
              📄 {item.attrs?.name || 'PDF Document'}
            </span>
          );
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
      {/* PDF Viewer Modal */}
      {pdfViewer && (
        <PdfViewerModal
          src={pdfViewer.src}
          name={pdfViewer.name}
          onClose={() => setPdfViewer(null)}
        />
      )}

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

      <PdfLeadFormPopup
        pageType={pageData.type}
        open={!!pendingPdfDownload}
        onClose={() => setPendingPdfDownload(null)}
        onTriggerDownload={() => {
          if (pendingPdfDownload) {
            executeDownload(pendingPdfDownload.url, pendingPdfDownload.name);
          }
        }}
      />
    </article>
  );
};

export default WebPageDetail;
