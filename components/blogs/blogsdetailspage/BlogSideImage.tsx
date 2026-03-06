"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/config";

const BlogSideImage = () => {
  const [imageUrl, setImageUrl] = useState<string>("/blogs/blogsidepic.svg");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdBanner = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_ALL_BLOG_AD_BANNERS}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });
        
        if (response.ok) {
          const data = await response.json();
          const banners = Array.isArray(data) ? data : [];
          
          if (banners.length > 0) {
            // Try to extract image link from various possible fields
            const imageLink = banners[0]?.imageLink || 
                             banners[0]?.bannerLink || 
                             banners[0]?.link || 
                             banners[0]?.webBannerImageLink ||
                             banners[0]?.imageUrl;
            
            if (imageLink) {
              setImageUrl(imageLink);
            }
          }
        }
      } catch (error) {
        //console.error("Error fetching blog ad banner:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdBanner();
  }, []);

  return (
    <div className="relative w-full h-auto">
      {loading ? (
        <div className="w-full h-[300px] bg-gray-200 rounded-lg animate-pulse" />
      ) : (
        <Image
          src={imageUrl}
          alt="Blog Side Image"
          width={400}
          height={300}
          className="w-full h-auto rounded-lg object-cover"
          priority={false}
          unoptimized={imageUrl.startsWith('http')}
        />
      )}
    </div>
  );
};

export default BlogSideImage;
