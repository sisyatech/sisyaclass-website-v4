"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
const InnovativeLearningTools = () => {
  const [entered, setEntered] = useState(false);
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
      { threshold: 0.4 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div 
          className={`relative mx-auto rounded-[24px] sm:rounded-[40px] lg:rounded-[50px] p-6 sm:p-10 lg:p-12 w-full max-w-[1176px] bg-[#B9D9EB4D] border border-[#EBEBEB] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-[1500ms] ease-out ${entered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[160px]'}`}
        >
          {/* Top Headlines */}
          <div className="text-center mb-8 sm:mb-12">
            <h3 
              className="mb-1 sm:mb-2 font-montserrat font-normal text-[18px] leading-[28px] sm:text-[22px] sm:leading-[34px] text-center text-[#1A2439]"
            >
              Empowering Students
            </h3>
            <h2 
              className="font-montserrat font-bold text-[28px] leading-[34px] sm:text-[40px] sm:leading-[42px] lg:text-[50px] lg:leading-[45px] text-center capitalize text-[#1A2439]"
            >
              With <span className="text-[#0595CE]">SISYA's</span> Innovative Learning Tools
            </h2>
          </div>

          {/* Main Content */}
          <div className="flex flex-col items-center space-y-10 sm:space-y-12">
            
            {/* Laptop with Video */}
            <div className="relative w-full max-w-3xl">
              <Image 
                src="/session4/pc.svg" 
                alt="Laptop" 
                width={1000}
                height={1000}
                className="w-full h-auto"
              />
              
              {/* Video Content Overlay */}
              <HoverPlayVideo />
            </div>

            {/* Features - Two Column Layout Below PC */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-6 lg:gap-y-8 max-w-6xl">
              
              {/* Left Column - Features 1, 2, 3 */}
              <div className="space-y-6">
              
              {/* Feature 1 - Personalized Feedback */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Image src="/session4/pic1.svg" alt="Personalized Feedback" width={73} height={73} className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] md:w-[73px] md:h-[73px]" />
                </div>
                <div>
                  <h4 className="mb-1 font-roboto font-medium text-[20px] leading-[22px] sm:text-[22px] sm:leading-[23.69px] md:text-[24px] tracking-[0.03em] text-[#1A2439]">
                    Personalized Feedback:
                  </h4>
                  <p className="font-roboto font-normal text-[16px] leading-[20px] sm:text-[17px] md:text-[18px] tracking-[0.03em] text-[#1A2439]">
                    Receive tailored insights based on your child's learning progress to boost improvement.
                  </p>
                </div>
              </div>

              {/* Feature 2 - AI Study Buddy */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Image src="/session4/pic2.svg" alt="AI Study Buddy" width={73} height={73} className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] md:w-[73px] md:h-[73px]" />
                </div>
                <div>
                  <h4 className="mb-1 font-roboto font-medium text-[20px] leading-[22px] sm:text-[22px] sm:leading-[23.69px] md:text-[24px] tracking-[0.03em] text-[#1A2439]">
                    AI Study Buddy:
                  </h4>
                  <p className="font-roboto font-normal text-[16px] leading-[20px] sm:text-[17px] md:text-[18px] tracking-[0.03em] text-[#1A2439]">
                    Available round-the-clock to explain concepts and guide your child through challenging problems.
                  </p>
                </div>
              </div>

              {/* Feature 3 - Skill Booster Challenges */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Image src="/session4/pic3.svg" alt="Skill Booster Challenges" width={73} height={73} className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] md:w-[73px] md:h-[73px]" />
                </div>
                <div>
                  <h4 className="mb-1 font-roboto font-medium text-[20px] leading-[22px] sm:text-[22px] sm:leading-[23.69px] md:text-[24px] tracking-[0.03em] text-[#1A2439]">
                    Skill Booster Challenges:
                  </h4>
                  <p className="font-roboto font-normal text-[16px] leading-[20px] sm:text-[17px] md:text-[18px] tracking-[0.03em] text-[#1A2439]">
                    Interactive quizzes and activities that adapt to your child's learning style and reward their efforts.
                  </p>
                </div>
              </div>
              </div>

              {/* Right Column - Features 4, 5, 6 */}
              <div className="space-y-6">

              {/* Feature 4 - Performance Insights */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Image src="/session4/pic4.svg" alt="Performance Insights" width={73} height={73} className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] md:w-[73px] md:h-[73px]" />
                </div>
                <div>
                  <h4 className="mb-1 font-roboto font-medium text-[20px] leading-[22px] sm:text-[22px] sm:leading-[23.69px] md:text-[24px] tracking-[0.03em] text-[#1A2439]">
                    Performance Insights:
                  </h4>
                  <p className="font-roboto font-normal text-[16px] leading-[20px] sm:text-[17px] md:text-[18px] tracking-[0.03em] text-[#1A2439]">
                    Comprehensive reports to monitor accuracy, speed, and improvements across subjects.
                  </p>
                </div>
              </div>

              {/* Feature 5 - SISYA Play */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Image src="/session4/pic5.svg" alt="SISYA Play" width={73} height={73} className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] md:w-[73px] md:h-[73px]" />
                </div>
                <div>
                  <h4 className="mb-1 font-roboto font-medium text-[20px] leading-[22px] sm:text-[22px] sm:leading-[23.69px] md:text-[24px] tracking-[0.03em] text-[#1A2439]">
                    SISYA Play:
                  </h4>
                  <p className="font-roboto font-normal text-[16px] leading-[20px] sm:text-[17px] md:text-[18px] tracking-[0.03em] text-[#1A2439]">
                    Fun, educational games with stats and rankings to make practice exciting and motivating.
                  </p>
                </div>
              </div>

              {/* Feature 6 - Parent Dashboard */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                    <Image src="/session4/pic6.svg" alt="Parent Dashboard" width={73} height={73} className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] md:w-[73px] md:h-[73px]" />
                </div>
                <div>
                  <h4 className="mb-1 font-roboto font-medium text-[20px] leading-[22px] sm:text-[22px] sm:leading-[23.69px] md:text-[24px] tracking-[0.03em] text-[#1A2439]">
                    Parent Dashboard:
                  </h4>
                  <p className="font-roboto font-normal text-[16px] leading-[20px] sm:text-[17px] md:text-[18px] tracking-[0.03em] text-[#1A2439]">
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
const HoverPlayVideo: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const embedSrc = hovered
    ? "https://www.youtube.com/embed/v_VJ-BizfOY?autoplay=1&mute=0&controls=1&rel=0"
    : "https://www.youtube.com/embed/v_VJ-BizfOY?autoplay=0&mute=1&controls=0&rel=0";

  return (
    <div
      className="absolute top-2.5 sm:top-5 left-1/2 -translate-x-1/2 w-[217px] h-[135px] sm:w-[360px] sm:h-[220px] md:w-[480px] md:h-[295px] lg:w-[600px] lg:h-[385px] rounded-[0px] overflow-hidden shadow-lg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <iframe
        className="w-full h-full"
        src={embedSrc}
        title="SISYA Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
