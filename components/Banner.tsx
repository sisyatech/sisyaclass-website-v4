
import React, { useEffect, useState } from "react";
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
        console.log('🚀 [Banner] Fetching banner image from API...');
        console.log('📡 [Banner] API URL:', `${API_BASE_URL}${API_ENDPOINTS.GET_WEB_LINKS}`);
        
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_WEB_LINKS}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });
        
        console.log('📊 [Banner] API Response status:', response.status);
        
        if (response.ok) {
          const rawData = await response.json();
          console.log('✅ [Banner] Data received successfully!');
          console.log('📝 [Banner] Full API response:', JSON.stringify(rawData, null, 2));
          console.log('📝 [Banner] Type of response:', typeof rawData);
          console.log('📝 [Banner] Is Array?:', Array.isArray(rawData));
          
          // Handle if response is an array, take first item
          const data = Array.isArray(rawData) ? rawData[0] : rawData;
          
          console.log('📝 [Banner] Processed data:', data);
          console.log('📝 [Banner] Available keys:', data ? Object.keys(data) : []);
          console.log('📝 [Banner] webBannerImageLink:', data?.webBannerImageLink);
          
          if (data?.webBannerImageLink) {
            setWebLinks(data);
            console.log('✅ [Banner] Banner link set successfully');
            console.log('✅ [Banner] Image URL:', data.webBannerImageLink);
          } else {
            console.error('❌ [Banner] Missing webBannerImageLink in API response');
            console.error('[Banner] Received keys:', data ? Object.keys(data) : []);
            console.error('[Banner] Received values:', data);
          }
        } else {
          console.error('❌ [Banner] Failed to fetch banner data, status:', response.status);
          const errorText = await response.text();
          console.error('[Banner] Error response:', errorText);
        }
      } catch (error) {
        console.error('❌ [Banner] Error fetching banner data:', error);
      } finally {
        setLoading(false);
        console.log('✅ [Banner] Loading completed');
      }
    };

    fetchWebLinks();
  }, []);

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

  // If API fails, use fallback banner image
  const bannerImageLink = webLinks?.webBannerImageLink || "/backendbanner.svg";

  return (
    <div className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-3">
        <div className="flex justify-center">
          <Image 
            src={bannerImageLink} 
            alt="Banner" 
            width={1200}
            height={300}
            className="w-full h-auto max-w-full"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
