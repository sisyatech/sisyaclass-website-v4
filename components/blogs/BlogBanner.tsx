"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import RevealOnView from "../Reveal/RevealOnView";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/config";

const BlogBanner = () => {
  const [bannerLinks, setBannerLinks] = useState<string[]>([]);
  const [bannerHrefs, setBannerHrefs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_ALL_COURSE_PAGE_BANNERS}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });
        
        if (response.ok) {
          const raw = await response.json();
          const list: any[] = Array.isArray(raw) ? raw : [];
          // Try to extract image link fields commonly used
          const links = list
            .map((item) => item?.imageLink || item?.bannerLink || item?.link || item?.webBannerImageLink || item?.imageUrl)
            .flat()
            .filter(Boolean);
          const hrefs = list.map((item) => item?.href || '').filter(() => true);

          if (links && links.length > 0) {
            setBannerLinks(links);
            setBannerHrefs(hrefs);
          } else {
            // Fallback to default image
            setBannerLinks(["/blogs/blogbanner.png"]);
          }
        } else {
          // Fallback to default image on error
          setBannerLinks(["/blogs/blogbanner.png"]);
        }
      } catch (error) {
        //console.error("Error fetching course page banner:", error);
        // Fallback to default image on error
        setBannerLinks(["/blogs/blogbanner.png"]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Auto-scroll banners if more than one
  useEffect(() => {
    if (!trackRef.current || bannerLinks.length <= 1) return;
    const container = trackRef.current;
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const next = (prev + 1) % bannerLinks.length;
        const width = container.clientWidth;
        container.scrollTo({ left: next * width, behavior: 'smooth' });
        return next;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [bannerLinks.length]);

  const isExternalUrl = (url: string) => /^https?:\/\//i.test(url);

  if (loading) {
    return (
      <RevealOnView from="bottom" durationMs={800} delayMs={0}>
        <div className="w-full py-2 sm:py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full h-[400px] bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>
      </RevealOnView>
    );
  }

  return (
    <RevealOnView from="bottom" durationMs={800} delayMs={0}>
      <div className="w-full py-2 sm:py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Horizontal scroll container with snap */}
          <div 
            ref={trackRef}
            className="relative overflow-x-auto hide-scrollbar rounded-xl overflow-hidden shadow-lg"
          >
            <div className="flex w-full snap-x snap-mandatory">
              {bannerLinks.map((link, idx) => (
                <div key={`${link}-${idx}`} className="snap-center shrink-0 w-full">
                  <div className="flex justify-center">
                    {bannerHrefs[idx] ? (
                      <a href={bannerHrefs[idx]} target="_blank" rel="noopener noreferrer" className="block w-full">
                        <Image
                          src={link}
                          alt={`Blog Banner ${idx + 1}`}
                          width={1200}
                          height={400}
                          className="w-full h-auto object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                          priority={idx === 0}
                          unoptimized={isExternalUrl(link)}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/blogs/blogbanner.png';
                          }}
                        />
                      </a>
                    ) : (
                      <Image
                        src={link}
                        alt={`Blog Banner ${idx + 1}`}
                        width={1200}
                        height={400}
                        className="w-full h-auto object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                        priority={idx === 0}
                        unoptimized={isExternalUrl(link)}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/blogs/blogbanner.png';
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style jsx>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
        </div>
      </div>
    </RevealOnView>
  );
};

export default BlogBanner;
