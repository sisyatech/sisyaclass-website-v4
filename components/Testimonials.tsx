"use client";

import React, { useRef, useState, useEffect } from "react";

const Testimonials = () => {
  const videoRefs = useRef<(HTMLIFrameElement | null)[]>([]);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [videoTitles, setVideoTitles] = useState<{ [key: string]: string }>({});

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

  return (
    <div className="py-2 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        {/* Headline */}
        <div className="text-center mb-6">
          <h3 
            className="mb-0"
            style={{
              fontFamily: 'Montserrat',
              fontWeight: 400,
              fontSize: '25px',
              lineHeight: '45px',
              color: '#1A2439'
            }}
          >
            Hear From
          </h3>
          <h2 
            style={{
              fontFamily: 'Montserrat',
              fontWeight: 700,
              fontSize: '50px',
              lineHeight: '45px',
              color: '#1A2439'
            }}
          >
            Our Brightest Stars!
          </h2>
        </div>

        {/* Video Cards Grid */}
        <div className="flex flex-wrap justify-center -mx-2">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="relative group px-2 mb-4"
              style={{
                width: '260px',
                height: '400px',
              }}
              onMouseEnter={() => setActiveVideo(index)}
              onMouseLeave={() => setActiveVideo(null)}
            >
              {/* Card Container - Full Video */}
              <div 
                className="relative w-full h-full rounded-3xl overflow-hidden"
                style={{
                  backgroundColor: '#000000',
                  border: activeVideo === index ? '3px solid #4A9FD8' : '3px solid transparent',
                  boxShadow: activeVideo === index ? '0 8px 16px rgba(0,0,0,0.2)' : '0 4px 8px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease'
                }}
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
                    {/* YouTube Thumbnail */}
                    <img 
                      src={testimonial.thumbnail}
                      alt={`${testimonial.name} - ${testimonial.grade}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Video Title Overlay at Bottom when not Playing */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 px-4 py-3"
                      style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 70%, transparent 100%)'
                      }}
                    >
                      <div 
                        className="text-white text-sm font-semibold"
                        style={{
                          fontFamily: 'Montserrat',
                          fontWeight: 600,
                          fontSize: '14px',
                          lineHeight: '1.3'
                        }}
                      >
                        {testimonial.title}
                      </div>
                    </div>

                    {/* Play button overlay */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center z-10"
                    >
                      <div 
                        className="rounded-full bg-white bg-opacity-90 flex items-center justify-center cursor-pointer shadow-lg"
                        style={{
                          width: '70px',
                          height: '70px'
                        }}
                      >
                        <svg 
                          width="32" 
                          height="32" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            d="M8 5v14l11-7L8 5z" 
                            fill="#FF0000"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

