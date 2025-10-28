
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/config";

interface WebLinksData {
  id: string;
  laptopVideoLink: string;
  webBannerImageLink: string;
}

const Banner = () => {
  const [webLinks, setWebLinks] = useState<WebLinksData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWebLinks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_WEB_LINKS}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });
        
        if (response.ok) {
          const rawData = await response.json();
          
          // Handle if response is an array, take first item
          const data = Array.isArray(rawData) ? rawData[0] : rawData;
          
          if (data?.webBannerImageLink) {
            setWebLinks(data);
          } else {
            // Missing banner link
          }
        } else {
          // Failed response
        }
      } catch (error) {
        // Swallow fetch errors to avoid blocking render
      } finally {
        setLoading(false);
      }
    };

    fetchWebLinks();
  }, []);

  // If API fails, use fallback banner image (compute before any early returns)
  const bannerImageLink = webLinks?.webBannerImageLink || "/backendbanner.svg";
  // Track current src to allow graceful fallback on error (declare before early returns to keep hooks order stable)
  const [currentSrc, setCurrentSrc] = useState<string>(bannerImageLink);
  useEffect(() => {
    setCurrentSrc(bannerImageLink);
  }, [bannerImageLink]);
  const isExternal = useMemo(() => /^https?:\/\//i.test(currentSrc), [currentSrc]);

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
        <div className="flex justify-center">
          <Image 
            src={currentSrc} 
            alt="Banner" 
            width={1200}
            height={300}
            className="w-full h-auto max-w-full"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
            priority={false}
            unoptimized={isExternal}
            onError={() => setCurrentSrc('/backendbanner.svg')}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
