import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/config";

interface WebLinksData {
  id: string;
  laptopVideoLink: string;
  webBannerImageLink: string;
}

const InnovativeLearningTools = () => {
  const [entered, setEntered] = useState(false);
  const [videoLink, setVideoLink] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const fetchWebVideos = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_ALL_WEB_VIDEOS}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });

        if (response.ok) {
          const videos = await response.json();
          if (Array.isArray(videos) && videos.length > 0) {
            const v = videos[0];
            const link = v?.laptopVideoLink || v?.videoLink || v?.link || null;
            if (link) {
              setVideoLink(link);
              console.log('✅ Video link loaded from web videos API:', link);
            }
          }
        }
      } catch (error) {
        console.error('❌ Error fetching web videos:', error);
      }
    };

    fetchWebVideos();
  }, []);

  return (
    <div ref={sectionRef} className="py-4 sm:py-6 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div 
          className={`relative mx-auto rounded-[20px] sm:rounded-[32px] md:rounded-[40px] lg:rounded-[50px] p-3 sm:p-5 md:p-6 lg:p-8 w-full max-w-[1176px] bg-[#B9D9EB4D] border border-[#EBEBEB] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-[1200ms] ease-out ${entered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[160px]'}`}
        >
          {/* Top Headlines */}
          <div className="text-center mb-2 sm:mb-3 md:mb-4">
            <h3 
              className="mb-1 font-montserrat font-normal text-[12px] leading-[18px] sm:text-[16px] sm:leading-[24px] md:text-[18px] md:leading-[28px] lg:text-[20px] lg:leading-[30px] text-center text-[#1A2439]"
            >
              Empowering Students
            </h3>
            <h2 
              className="font-montserrat font-bold text-[18px] leading-[24px] sm:text-[26px] sm:leading-[32px] md:text-[34px] md:leading-[38px] lg:text-[40px] lg:leading-[42px] text-center capitalize text-[#1A2439]"
            >
              With <span className="text-[#0595CE]">SISYA's</span> Innovative Learning Tools
            </h2>
          </div>

          {/* Main Content */}
          <div className="flex flex-col items-center space-y-4 sm:space-y-6">
            
            {/* Laptop with Video */}
            <div className="relative w-full max-w-xl">
              <Image 
                src="/session4/pc.svg" 
                alt="Laptop" 
                width={1000}
                height={1000}
                className="w-full h-auto"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 600px"
                priority={false}
              />

              {/* Video Content Overlay - responsive sizing for all devices */}
              {videoLink && <HoverPlayVideo videoLink={videoLink} />}
            </div>

            {/* Features - Two Column Layout Below PC */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 lg:gap-x-8 gap-y-3 lg:gap-y-4 max-w-6xl">
              
              {/* Left Column - Features 1, 2, 3 */}
              <div className="space-y-3">
              
              {/* Feature 1 - Personalized Feedback */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <Image src="/session4/pic1.svg" alt="Personalized Feedback" width={73} height={73} className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] md:w-[52px] md:h-[52px] lg:w-[60px] lg:h-[60px]" />
                </div>
                <div>
                  <h4 className="mb-1 font-roboto font-medium text-[14px] leading-[16px] sm:text-[16px] sm:leading-[18px] md:text-[18px] md:leading-[20px] lg:text-[20px] tracking-[0.03em] text-[#1A2439]">
                    Personalized Feedback:
                  </h4>
                  <p className="font-roboto font-normal text-[11px] leading-[14px] sm:text-[13px] sm:leading-[16px] md:text-[14px] md:leading-[18px] lg:text-[15px] tracking-[0.03em] text-[#1A2439]">
                    Receive tailored insights based on your child's learning progress to boost improvement.
                  </p>
                </div>
              </div>

              {/* Feature 2 - AI Study Buddy */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <Image src="/session4/pic2.svg" alt="AI Study Buddy" width={73} height={73} className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] md:w-[52px] md:h-[52px] lg:w-[60px] lg:h-[60px]" />
                </div>
                <div>
                  <h4 className="mb-1 font-roboto font-medium text-[14px] leading-[16px] sm:text-[16px] sm:leading-[18px] md:text-[18px] md:leading-[20px] lg:text-[20px] tracking-[0.03em] text-[#1A2439]">
                    AI Study Buddy:
                  </h4>
                  <p className="font-roboto font-normal text-[11px] leading-[14px] sm:text-[13px] sm:leading-[16px] md:text-[14px] md:leading-[18px] lg:text-[15px] tracking-[0.03em] text-[#1A2439]">
                    Available round-the-clock to explain concepts and guide your child through challenging problems.
                  </p>
                </div>
              </div>

              {/* Feature 3 - Skill Booster Challenges */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <Image src="/session4/pic3.svg" alt="Skill Booster Challenges" width={73} height={73} className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] md:w-[52px] md:h-[52px] lg:w-[60px] lg:h-[60px]" />
                </div>
                <div>
                  <h4 className="mb-1 font-roboto font-medium text-[14px] leading-[16px] sm:text-[16px] sm:leading-[18px] md:text-[18px] md:leading-[20px] lg:text-[20px] tracking-[0.03em] text-[#1A2439]">
                    Skill Booster Challenges:
                  </h4>
                  <p className="font-roboto font-normal text-[11px] leading-[14px] sm:text-[13px] sm:leading-[16px] md:text-[14px] md:leading-[18px] lg:text-[15px] tracking-[0.03em] text-[#1A2439]">
                    Interactive quizzes and activities that adapt to your child's learning style and reward their efforts.
                  </p>
                </div>
              </div>
              </div>

              {/* Right Column - Features 4, 5, 6 */}
              <div className="space-y-3">

              {/* Feature 4 - Performance Insights */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <Image src="/session4/pic4.svg" alt="Performance Insights" width={73} height={73} className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] md:w-[52px] md:h-[52px] lg:w-[60px] lg:h-[60px]" />
                </div>
                <div>
                  <h4 className="mb-1 font-roboto font-medium text-[14px] leading-[16px] sm:text-[16px] sm:leading-[18px] md:text-[18px] md:leading-[20px] lg:text-[20px] tracking-[0.03em] text-[#1A2439]">
                    Performance Insights:
                  </h4>
                  <p className="font-roboto font-normal text-[11px] leading-[14px] sm:text-[13px] sm:leading-[16px] md:text-[14px] md:leading-[18px] lg:text-[15px] tracking-[0.03em] text-[#1A2439]">
                    Comprehensive reports to monitor accuracy, speed, and improvements across subjects.
                  </p>
                </div>
              </div>

              {/* Feature 5 - SISYA Play */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <Image src="/session4/pic5.svg" alt="SISYA Play" width={73} height={73} className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] md:w-[52px] md:h-[52px] lg:w-[60px] lg:h-[60px]" />
                </div>
                <div>
                  <h4 className="mb-1 font-roboto font-medium text-[14px] leading-[16px] sm:text-[16px] sm:leading-[18px] md:text-[18px] md:leading-[20px] lg:text-[20px] tracking-[0.03em] text-[#1A2439]">
                    SISYA Play:
                  </h4>
                  <p className="font-roboto font-normal text-[11px] leading-[14px] sm:text-[13px] sm:leading-[16px] md:text-[14px] md:leading-[18px] lg:text-[15px] tracking-[0.03em] text-[#1A2439]">
                    Fun, educational games with stats and rankings to make practice exciting and motivating.
                  </p>
                </div>
              </div>

              {/* Feature 6 - Parent Dashboard */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                    <Image src="/session4/pic6.svg" alt="Parent Dashboard" width={73} height={73} className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] md:w-[52px] md:h-[52px] lg:w-[60px] lg:h-[60px]" />
                </div>
                <div>
                  <h4 className="mb-1 font-roboto font-medium text-[14px] leading-[16px] sm:text-[16px] sm:leading-[18px] md:text-[18px] md:leading-[20px] lg:text-[20px] tracking-[0.03em] text-[#1A2439]">
                    Parent Dashboard:
                  </h4>
                  <p className="font-roboto font-normal text-[11px] leading-[14px] sm:text-[13px] sm:leading-[16px] md:text-[14px] md:leading-[18px] lg:text-[15px] tracking-[0.03em] text-[#1A2439]">
                    Get real-time updates on attendance, teacher feedback, and overall learning progress.
                  </p>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovativeLearningTools;

// Inline client-only subcomponent to handle hover-to-play YouTube video
interface HoverPlayVideoProps {
  videoLink: string;
}

const HoverPlayVideo: React.FC<HoverPlayVideoProps> = ({ videoLink }) => {
  const [playing, setPlaying] = useState(false);
  // Convert any YouTube watch/short links to embeddable url
  const toEmbedUrl = (url: string): string => {
    try {
      const u = new URL(url);
      // youtu.be/<id>
      if (u.hostname === "youtu.be" && u.pathname.length > 1) {
        const id = u.pathname.slice(1);
        return `https://www.youtube.com/embed/${id}`;
      }
      // youtube.com/watch?v=<id>
      if (u.hostname.includes("youtube.com")) {
        if (u.pathname === "/watch") {
          const id = u.searchParams.get("v");
          if (id) return `https://www.youtube.com/embed/${id}`;
        }
        // already embed
        if (u.pathname.startsWith("/embed/")) return url;
      }
    } catch (_) {
      // fall through to return original
    }
    return url;
  };

  const base = toEmbedUrl(videoLink);
  const embedSrc = playing
    ? `${base}?autoplay=1&mute=0&controls=1&rel=0`
    : `${base}?autoplay=0&mute=1&controls=0&rel=0`;

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-2 sm:top-3 md:top-4 w-[80%] sm:w-[82%] md:w-[82%] lg:w-[80%] aspect-[16/10] sm:aspect-[16/10] md:aspect-[16/10] lg:aspect-[16/10] overflow-hidden shadow-lg"
      onMouseEnter={() => setPlaying(true)}
      onMouseLeave={() => setPlaying(false)}
      onClick={() => setPlaying(true)}
      role="button"
      aria-label="Play video"
    >
      <iframe
        className="w-full h-full"
        src={embedSrc}
        title="SISYA Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};
