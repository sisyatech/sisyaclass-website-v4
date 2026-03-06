"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/config";

interface TestimonialData {
  id: string;
  url: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ProcessedTestimonial {
  id: string;
  videoId: string;
  videoUrl: string;
  embedUrl: string;
  thumbnail: string;
  title: string;
  name: string;
  grade: string;
}

const Testimonials = () => {
  const videoRefs = useRef<(HTMLIFrameElement | null)[]>([]);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [videoTitles, setVideoTitles] = useState<{ [key: string]: string }>({});
  const [entered, setEntered] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // mobile index
  const [cardEntered, setCardEntered] = useState(false);
  const [testimonials, setTestimonials] = useState<ProcessedTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Trigger animations on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setEntered(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // //console.log('🚀 [TESTIMONIALS] Fetching data from API...');

        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_TESTIMONIAL_REEL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        });

        if (response.ok) {
          const data: TestimonialData[] = await response.json();
          // //console.log('✅ [TESTIMONIALS] Data received:', data);

          // Process the data to extract video IDs and create embed URLs
          const processed: ProcessedTestimonial[] = data
            .sort((a, b) => a.order - b.order)
            .map((item) => {
              // Extract video ID from YouTube URL
              const videoId = item.url.match(/shorts\/([^?]+)/)?.[1] || "";

              return {
                id: item.id,
                videoId,
                videoUrl: item.url,
                embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&loop=1&playlist=${videoId}`,
                thumbnail: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
                title: "Student Testimonial",
                name: "SISYA Student",
                grade: "SISYA CLASS",
              };
            });

          // //console.log('✅ [TESTIMONIALS] Processed testimonials:', processed);
          setTestimonials(processed);
        } else {
          // //console.error('❌ [TESTIMONIALS] API request failed');
        }
      } catch (error) {
        // //console.error('❌ [TESTIMONIALS] Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Fetch YouTube titles via oEmbed for each testimonial
  useEffect(() => {
    if (testimonials.length === 0) return;
    let cancelled = false;
    const load = async () => {
      try {
        const entries = await Promise.all(
          testimonials.map(async (t) => {
            try {
              const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(
                `https://www.youtube.com/watch?v=${t.videoId}`
              )}&format=json`;
              const res = await fetch(url, { method: "GET" });
              if (!res.ok) return [t.videoId, undefined] as const;
              const json = await res.json();
              return [t.videoId, json?.title as string | undefined] as const;
            } catch {
              return [t.videoId, undefined] as const;
            }
          })
        );
        if (cancelled) return;
        const map: { [k: string]: string } = {};
        for (const [id, title] of entries) {
          if (title) map[id] = title;
        }
        setVideoTitles(map);
      } catch {
        // ignore
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [testimonials]);

  // Re-trigger card animation on slide change
  useEffect(() => {
    setCardEntered(false);
    const timer = setTimeout(() => setCardEntered(true), 100);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Touch handlers for swipe gestures
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const handlePrev = () => {
    setActiveVideo(null);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveVideo(null);
    setCurrentIndex((prev) => (prev >= testimonials.length - 1 ? 0 : prev + 1));
  };

  // Keep index in range when data changes
  useEffect(() => {
    if (currentIndex >= testimonials.length) setCurrentIndex(0);
  }, [testimonials.length, currentIndex]);

  // Visible items for desktop (up to 4). Do NOT duplicate when total <= 4
  const getVisibleTestimonials = (): ProcessedTestimonial[] => {
    if (testimonials.length === 0) return [];
    if (testimonials.length <= 4) return testimonials;
    const arr: ProcessedTestimonial[] = [];
    for (let i = 0; i < 4; i++) {
      const idx = (currentIndex + i) % testimonials.length;
      arr.push(testimonials[idx]);
    }
    return arr;
  };
  const visibleDesktop = getVisibleTestimonials();

  // Show loading state
  if (loading) {
    return (
      <div id="testimonials" className="mb-5 bg-white py-1 sm:mb-6 sm:py-6 md:mb-8 md:py-1">
        <div className="mx-auto max-w-7xl px-4">
          <div className="py-20 text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[#0595CE]"></div>
            <p className="mt-4 text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </div>
    );
  }

  // Don't render if no testimonials
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div
      id="testimonials"
      ref={sectionRef}
      className="mb-5 bg-white py-1 sm:mb-6 sm:py-6 md:mb-8 md:py-1"
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Headline */}
        <div
          className={`mb-6 text-center transition-all duration-[1200ms] ease-out sm:mb-8 md:mb-10 ${entered ? "-translate-x-0 opacity-100" : "-translate-x-[160px] opacity-0"}`}
        >
          <h2 className="font-montserrat text-[24px] leading-[28px] font-bold text-[#1A2439] sm:text-[32px] sm:leading-[34px] md:text-[38px] md:leading-[40px]">
            Watch Why Students & Parents Love SISYA
          </h2>
        </div>

        {/* Desktop: horizontal row with arrows (no wrap) */}
        <div
          className={`relative hidden transition-all duration-[1200ms] ease-out lg:block ${entered ? "translate-y-0 opacity-100" : "translate-y-[160px] opacity-0"}`}
        >
          {testimonials.length > 4 && (
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-0 z-10 flex h-10 w-10 -translate-x-2 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-[14px] border-2 border-[#D9D9D9] bg-white transition-colors duration-300 hover:bg-gray-100"
            >
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
          <div className="flex justify-center gap-5 px-8 xl:px-16">
            {visibleDesktop.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`group relative w-[220px] transition-all duration-[1200ms] ease-out xl:w-[240px] ${entered ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
                style={{
                  transitionDelay: entered ? `${index * 120}ms` : "0ms",
                  aspectRatio: "9/16",
                }}
                onMouseEnter={() => setActiveVideo(index)}
                onMouseLeave={() => setActiveVideo(null)}
              >
                <div
                  className={`relative h-full w-full overflow-hidden rounded-2xl bg-black transition-all duration-300 ${activeVideo === index ? "border-[3px] border-[#4A9FD8] shadow-[0_8px_16px_rgba(0,0,0,0.2)]" : "border-[3px] border-transparent shadow-[0_4px_8px_rgba(0,0,0,0.1)]"}`}
                >
                  {activeVideo === index ? (
                    <iframe
                      ref={(el) => {
                        videoRefs.current[index] = el!;
                      }}
                      src={testimonial.embedUrl}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ border: "none", aspectRatio: "9/16" }}
                    />
                  ) : (
                    <div className="relative h-full w-full">
                      <Image
                        width={260}
                        height={400}
                        src={testimonial.thumbnail}
                        alt={`${testimonial.name} - ${testimonial.grade}`}
                        className="h-full w-full object-cover"
                        sizes="(max-width: 1024px) 220px, 240px"
                      />
                      <div
                        className="absolute right-0 bottom-0 left-0 px-2 py-1.5 lg:px-3 lg:py-2"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 70%, transparent 100%)",
                        }}
                      >
                        <div
                          className="font-montserrat truncate text-[11px] leading-[1.2] font-semibold text-white lg:text-xs"
                          title={videoTitles[testimonial.videoId] || testimonial.title}
                        >
                          {videoTitles[testimonial.videoId] || testimonial.title}
                        </div>
                      </div>
                      <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <div className="bg-opacity-90 flex h-[54px] w-[54px] cursor-pointer items-center justify-center rounded-full bg-transparent shadow-lg lg:h-[60px] lg:w-[60px]">
                          <svg
                            width="24"
                            height="24"
                            className="lg:h-7 lg:w-7"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M8 5v14l11-7L8 5z" fill="#FFFFFF" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {testimonials.length > 4 && (
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-0 z-10 flex h-10 w-10 translate-x-2 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-[14px] border-2 border-[#D9D9D9] bg-white transition-colors duration-300 hover:bg-gray-100"
            >
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile & Tablet single card with bottom arrows */}
        <div
          className={`transition-all duration-[1200ms] ease-out lg:hidden ${entered ? "translate-y-0 opacity-100" : "translate-y-[160px] opacity-0"}`}
        >
          {(() => {
            const t = testimonials[currentIndex % testimonials.length];
            return (
              <div className="flex justify-center px-3 sm:px-4">
                <div
                  key={currentIndex}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  className={`group relative w-[240px] touch-none transition-all duration-300 ease-in-out min-[375px]:w-[260px] sm:w-[280px] md:w-[300px] ${cardEntered ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
                  style={{ aspectRatio: "9/16" }}
                >
                  <div
                    className={`relative h-full w-full overflow-hidden rounded-2xl bg-black transition-all duration-300 sm:rounded-3xl ${activeVideo === currentIndex ? "border-[3px] border-[#4A9FD8] shadow-[0_8px_16px_rgba(0,0,0,0.2)]" : "border-[3px] border-transparent shadow-[0_4px_8px_rgba(0,0,0,0.1)]"}`}
                    onClick={() => {
                      if (activeVideo === currentIndex) {
                        setActiveVideo(null);
                      } else {
                        setActiveVideo(currentIndex);
                      }
                    }}
                  >
                    {activeVideo === currentIndex ? (
                      <iframe
                        ref={(el) => {
                          videoRefs.current[currentIndex] = el!;
                        }}
                        src={t.embedUrl}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ border: "none", aspectRatio: "9/16" }}
                      />
                    ) : (
                      <div className="relative h-full w-full cursor-pointer">
                        <Image
                          width={300}
                          height={460}
                          src={t.thumbnail}
                          alt={`${t.name} - ${t.grade}`}
                          className="h-full w-full object-cover"
                          sizes="(max-width: 640px) 260px, (max-width: 768px) 280px, 300px"
                        />
                        <div
                          className="absolute right-0 bottom-0 left-0 px-3 py-2 sm:px-4 sm:py-3"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 70%, transparent 100%)",
                          }}
                        >
                          <div
                            className="font-montserrat truncate text-xs leading-[1.3] font-semibold text-white sm:text-sm"
                            title={videoTitles[t.videoId] || t.title}
                          >
                            {videoTitles[t.videoId] || t.title}
                          </div>
                        </div>
                        <div className="absolute inset-0 z-10 flex items-center justify-center">
                          <div className="bg-opacity-90 flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full bg-transparent shadow-lg sm:h-[70px] sm:w-[70px]">
                            <svg
                              width="28"
                              height="28"
                              className="sm:h-8 sm:w-8"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 5v14l11-7L8 5z" fill="#FFFFFF" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
          <div className="mt-4 flex items-center justify-center gap-5 sm:mt-5 sm:gap-6">
            <button
              onClick={handlePrev}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[#D9D9D9] bg-white transition-transform hover:bg-gray-100 active:scale-95"
            >
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[#D9D9D9] bg-white transition-transform hover:bg-gray-100 active:scale-95"
            >
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
