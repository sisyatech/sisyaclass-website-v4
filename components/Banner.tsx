
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/config";

interface WebLinksData {
  id: string;
  laptopVideoLink: string;
  webBannerImageLink: string | string[];
}

const Banner = () => {
  const [webLinks, setWebLinks] = useState<WebLinksData | null>(null);
  const [bannerHrefs, setBannerHrefs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWebBanners = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_ALL_WEB_BANNERS}`, {
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
            .map((item) => item?.imageLink || item?.bannerLink || item?.link || item?.webBannerImageLink)
            .flat()
            .filter(Boolean);
          const hrefs = list.map((item) => item?.href || '').filter(() => true);

          if (links && links.length > 0) {
            // Normalize into our local shape
            //console.log("banners data", links);
            setWebLinks({ id: 'web-banners', laptopVideoLink: '', webBannerImageLink: links });
            setBannerHrefs(hrefs);
          }
        }
      } catch (error) {
        // Swallow fetch errors to avoid blocking render
      } finally {
        setLoading(false);
      }
    };

    fetchWebBanners();
  }, []);

  // Normalize banners list
  const rawLinks = webLinks?.webBannerImageLink;
  const bannerLinks: string[] = useMemo(() => {
    if (Array.isArray(rawLinks)) {
      return rawLinks.filter(Boolean);
    }
    if (typeof rawLinks === 'string' && rawLinks.trim().length > 0) {
      // Support comma separated list
      const parts = rawLinks.split(',').map(s => s.trim()).filter(Boolean);
      return parts.length > 0 ? parts : [rawLinks.trim()];
    }
    return ["/backendbanner.svg"];
  }, [rawLinks]);

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
      <div className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-3">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0595CE] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading banner...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 bg-white">
      <div className="mx-auto max-w-6xl px-3">
        {/* Horizontal scroll container with snap */}
        <div 
          ref={trackRef}
          className="relative overflow-x-auto hide-scrollbar"
        >
          <div className="flex w-full snap-x snap-mandatory">
            {bannerLinks.map((link, idx) => (
              <div key={`${link}-${idx}`} className="snap-center shrink-0 w-full">
                <div className="flex justify-center px-2 sm:px-3">
                  {bannerHrefs[idx] ? (
                    <a href={bannerHrefs[idx]} target="_blank" rel="noopener noreferrer" className="block w-full">
                      <Image
                        src={link}
                        alt={`Banner ${idx + 1}`}
                        width={1200}
                        height={300}
                        className="w-full h-auto max-w-full"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                        priority={idx === 0}
                        unoptimized={isExternalUrl(link)}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/backendbanner.svg';
                        }}
                      />
                    </a>
                  ) : (
                    <Image
                      src={link}
                      alt={`Banner ${idx + 1}`}
                      width={1200}
                      height={300}
                      className="w-full h-auto max-w-full"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                      priority={idx === 0}
                      unoptimized={isExternalUrl(link)}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/backendbanner.svg';
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Banner;
