"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";     
const Testimonials = () => {
  const videoRefs = useRef<(HTMLIFrameElement | null)[]>([]);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [videoTitles, setVideoTitles] = useState<{ [key: string]: string }>({});
  const [entered, setEntered] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // mobile index
  const [cardEntered, setCardEntered] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true); 
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Re-trigger card animation on slide change
  useEffect(() => {
    setCardEntered(false);
    const timer = setTimeout(() => setCardEntered(true), 300);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const testimonials = [
    {
      id: 1,
      videoId: "nDBid7vfx00",
      videoUrl: "https://youtube.com/shorts/nDBid7vfx00?feature=share",
      embedUrl: "https://www.youtube.com/embed/nDBid7vfx00?autoplay=1&mute=0&controls=1&loop=1&playlist=nDBid7vfx00",
      thumbnail: "https://img.youtube.com/vi/nDBid7vfx00/maxresdefault.jpg",
      title: "Student Success Story - Twish Saxena Grade 4",
      name: "Twish Saxena",
      grade: "GRADE - 4",
    },
    {
      id: 2,
      videoId: "dYjbiOenSMA",
      videoUrl: "https://youtube.com/shorts/dYjbiOenSMA?feature=share",
      embedUrl: "https://www.youtube.com/embed/dYjbiOenSMA?autoplay=1&mute=0&controls=1&loop=1&playlist=dYjbiOenSMA",
      thumbnail: "https://img.youtube.com/vi/dYjbiOenSMA/maxresdefault.jpg",
      title: "SISYA Class Student Testimonial",
      name: "Twish Saxena",
      grade: "GRADE - 4",
    },
    {
      id: 3,
      videoId: "MuJzWIjBqVs",
      videoUrl: "https://youtube.com/shorts/MuJzWIjBqVs?feature=share",
      embedUrl: "https://www.youtube.com/embed/MuJzWIjBqVs?autoplay=1&mute=0&controls=1&loop=1&playlist=MuJzWIjBqVs",
      thumbnail: "https://img.youtube.com/vi/MuJzWIjBqVs/maxresdefault.jpg",
      title: "Amazing Learning Experience at SISYA",
      name: "Twish Saxena",
      grade: "GRADE - 4",
    },
    {
      id: 4,
      videoId: "Ze6c4_kSAVs",
      videoUrl: "https://youtube.com/shorts/Ze6c4_kSAVs?feature=share",
      embedUrl: "https://www.youtube.com/embed/Ze6c4_kSAVs?autoplay=1&mute=0&controls=1&loop=1&playlist=Ze6c4_kSAVs",
      thumbnail: "https://img.youtube.com/vi/Ze6c4_kSAVs/maxresdefault.jpg",
      title: "How SISYA Helped Me Improve",
      name: "Twish Saxena",
      grade: "GRADE - 4",
    },
  ];

  const handlePrev = () => {
    setActiveVideo(null);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveVideo(null);
    setCurrentIndex((prev) => (prev >= testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div id="testimonials" ref={sectionRef} className="py-1 sm:py-12 md:py-1 bg-white mb-10 sm:mb-12 md:mb-15">
      <div className="mx-auto max-w-7xl px-4">
        {/* Headline */}
        <div className={`text-center mb-6 sm:mb-8 md:mb-10 transition-all duration-[1200ms] ease-out ${entered ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-[160px]'}`}>
          <h3 
            className="mb-0 font-montserrat font-normal text-[18px] leading-[28px] sm:text-[22px] sm:leading-[36px] md:text-[25px] md:leading-[45px] text-[#1A2439]"
          >
            Hear From
          </h3>
          <h2 
            className="font-montserrat font-bold text-[32px] leading-[36px] sm:text-[42px] sm:leading-[42px] md:text-[50px] md:leading-[45px] text-[#1A2439]"
          >
            Our Brightest Stars!
          </h2>
        </div>

        {/* Desktop grid */}
        <div className={`hidden lg:flex flex-wrap justify-center -mx-2 transition-all duration-[1200ms] ease-out ${entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[160px]'}`}>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`relative group px-2 mb-4 w-[200px] h-[340px] lg:w-[220px] lg:h-[360px] xl:w-[240px] xl:h-[380px] transition-all duration-[1200ms] ease-out ${entered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: entered ? `${index * 120}ms` : '0ms' }}
              onMouseEnter={() => setActiveVideo(index)}
              onMouseLeave={() => setActiveVideo(null)}
            >
              <div 
                className={`relative w-full h-full rounded-2xl overflow-hidden bg-black transition-all duration-300 ${activeVideo === index ? 'border-[3px] border-[#4A9FD8] shadow-[0_8px_16px_rgba(0,0,0,0.2)]' : 'border-[3px] border-transparent shadow-[0_4px_8px_rgba(0,0,0,0.1)]'}`}
              >
                {activeVideo === index ? (
                  <iframe
                    ref={(el) => {
                      videoRefs.current[index] = el!;
                    }}
                    src={testimonial.embedUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ border: 'none' }}
                  />
                    ) : (
                      <div className="w-full h-full relative">
                        <Image width={260} height={400} src={testimonial.thumbnail} alt={`${testimonial.name} - ${testimonial.grade}`} className="w-full h-full object-cover" unoptimized />
                        <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 lg:px-3 lg:py-2" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 70%, transparent 100%)' }}>
                          <div className="text-white text-[11px] lg:text-xs font-semibold font-montserrat leading-[1.2]">{testimonial.title}</div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <div className="rounded-full bg-transparent bg-opacity-90 flex items-center justify-center cursor-pointer shadow-lg w-[54px] h-[54px] lg:w-[60px] lg:h-[60px]">
                            <svg width="24" height="24" className="lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7L8 5z" fill="#FFFFFF"/></svg>
                          </div>
                        </div>
                      </div>
                    )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile & Tablet single card with bottom arrows */}
        <div className={`lg:hidden transition-all duration-[1200ms] ease-out ${entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[160px]'}`}>
          {(() => {
            const t = testimonials[currentIndex % testimonials.length];
            return (
              <div className="flex justify-center px-3 sm:px-4">
                <div 
                  key={currentIndex}
                  className={`relative group w-[240px] h-[370px] min-[375px]:w-[260px] min-[375px]:h-[400px] sm:w-[280px] sm:h-[430px] md:w-[300px] md:h-[460px] transition-all duration-[400ms] ease-in-out ${cardEntered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                >
                  <div 
                    className={`relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black transition-all duration-300 ${activeVideo === currentIndex ? 'border-[3px] border-[#4A9FD8] shadow-[0_8px_16px_rgba(0,0,0,0.2)]' : 'border-[3px] border-transparent shadow-[0_4px_8px_rgba(0,0,0,0.1)]'}`}
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
                        ref={(el) => { videoRefs.current[currentIndex] = el!; }}
                        src={t.embedUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ border: 'none' }}
                      />
                    ) : (
                      <div className="w-full h-full relative cursor-pointer">
                        <Image width={300} height={460} src={t.thumbnail} alt={`${t.name} - ${t.grade}`} className="w-full h-full object-cover" unoptimized />
                        <div className="absolute bottom-0 left-0 right-0 px-3 py-2 sm:px-4 sm:py-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 70%, transparent 100%)' }}>
                          <div className="text-white text-xs sm:text-sm font-semibold font-montserrat leading-[1.3]">{t.title}</div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <div className="rounded-full bg-transparent bg-opacity-90 flex items-center justify-center cursor-pointer shadow-lg w-[60px] h-[60px] sm:w-[70px] sm:h-[70px]">
                            <svg width="28" height="28" className="sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7L8 5z" fill="#FFFFFF"/></svg>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
          <div className="mt-4 sm:mt-5 flex items-center justify-center gap-5 sm:gap-6">
            <button onClick={handlePrev} className="w-10 h-10 border-2 border-[#D9D9D9] rounded-[14px] bg-white flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-transform">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={handleNext} className="w-10 h-10 border-2 border-[#D9D9D9] rounded-[14px] bg-white flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-transform">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

