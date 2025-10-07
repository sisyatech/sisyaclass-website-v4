"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
const Impact = () => {
  const numberColorClass = (hex: string) => {
    switch (hex) {
      case '#575CFB':
        return 'text-[#575CFB]';
      case '#41AC7D':
        return 'text-[#41AC7D]';
      case '#1BA8EF':
        return 'text-[#1BA8EF]';
      case '#E78F8E':
        return 'text-[#E78F8E]';
      default:
        return 'text-[#1A2439]';
    }
  };

  const descColorClass = (hex: string) => {
    switch (hex) {
      case '#556A8E':
        return 'text-[#556A8E]';
      default:
        return 'text-[#1A2439]';
    }
  };
  const statistics = [
    {
      number: "2.1+",
      unit: "crore",
      description: "hours of LIVE learning",
      numberColor: "#575CFB",
      descriptionColor: "#556A8E"
    },
    {
      number: "25+", 
      unit: "lakh",
      description: "doubts resolved on the app",
      numberColor: "#41AC7D",
      descriptionColor: "#556A8E"
    },
    {
      number: "10+",
      unit: "thousand",
      description: "success stories across India", 
      numberColor: "#1BA8EF",
      descriptionColor: "#556A8E"
    },
    {
      number: "57+",
      unit: "cities",
      description: "Trusted by parents",
      numberColor: "#E78F8E",
      descriptionColor: "#556A8E"
    }
  ];

  const [hasEntered, setHasEntered] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      // Trigger a bit earlier so inner icons don't lag
      { root: null, threshold: 0.25, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="py-16 sm:py-18 lg:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          
          {/* Left Section - Statistics */}
          <div
            className={`space-y-6 sm:space-y-7 lg:space-y-8 ml-0 lg:ml-18 flex flex-col items-center lg:items-start transition-all duration-[1500ms] ease-out ${
              hasEntered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="space-y-1.5 sm:space-y-2 text-center lg:text-left">
              <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl leading-none text-gray-900">
                SISYA's Impact:
              </h2>
              <p className="font-montserrat font-normal text-xl sm:text-2xl leading-tight text-gray-900">
                Explore What You Can Learn
              </p>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {statistics.map((stat, index) => (
                <div key={index} className="space-y-1 text-center lg:text-left">
                  <div className="space-y-0">
                    <div 
                      className="font-montserrat font-bold text-2xl sm:text-3xl leading-none"
                      style={{
                        color: stat.numberColor
                      }}
                    >
                      {stat.number}
                    </div>
                    <div 
                      className="font-montserrat font-bold text-2xl sm:text-3xl leading-none"
                      style={{
                        color: stat.numberColor
                      }}
                    >
                      {stat.unit}
                    </div>
                  </div>
                  <div 
                    className="font-roboto font-medium text-base sm:text-lg leading-7 sm:leading-8 tracking-wide"
                    style={{
                      color: stat.descriptionColor
                    }}
                  >
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Map */}
          <div 
            className={`relative flex justify-center items-center mt-8 lg:mt-0 w-[280px] h-[308px] sm:w-[360px] sm:h-[396px] md:w-[440px] md:h-[484px] lg:w-[500px] lg:h-[550px] mx-auto transition-all duration-[1200ms] ease-out ${
              hasEntered ? "opacity-100 translate-y-0 lg:translate-x-0" : "opacity-0 translate-y-10 lg:translate-x-10"
            }`}
          >
            {/* Map */}
            <Image 
              src="/map.svg" 
              alt="India Map" 
              width={500}
              height={550}
              className="w-full h-full object-contain"
            />
            
            {/* Student Images positioned on the map */}
            <div
              className={`absolute inset-0 ${
                hasEntered ? "opacity-100" : "opacity-0"
              }`}
              style={{ transition: 'opacity 600ms ease-out 300ms' }}
            >
              {/* Student 1 - Jammu & Kashmir */}
              <div
                className="absolute"
                style={{
                  top: hasEntered ? '67.6%' : '50%',
                  left: hasEntered ? '37.8%' : '50%',
                  transform: 'translate(-50%, -50%)',
                  transition: 'top 900ms ease-out 450ms, left 900ms ease-out 450ms'
                }}
              >
                <Image src="/student1.svg" alt="Student 1" width={48} height={48} className="w-8 h-8 sm:w-12 sm:h-12 object-contain rounded-full" />
              </div>

              {/* Student 2 - Assam */}
              <div
                className="absolute"
                style={{
                  top: hasEntered ? '47.6%' : '50%',
                  left: hasEntered ? '15%' : '50%',
                  transform: 'translate(-50%, -50%)',
                  transition: 'top 900ms ease-out 510ms, left 900ms ease-out 510ms'
                }}
              >
                <Image src="/student2.svg" alt="Student 2" width={48} height={48} className="w-8 h-8 sm:w-12 sm:h-12 object-contain rounded-full" />
              </div>

              {/* Student 3 - Gujarat */}
              <div
                className="absolute"
                style={{
                  top: hasEntered ? '25.5%' : '50%',
                  left: hasEntered ? '26%' : '50%',
                  transform: 'translate(-50%, -50%)',
                  transition: 'top 900ms ease-out 570ms, left 900ms ease-out 570ms'
                }}
              >
                <Image src="/student3.svg" alt="Student 3" width={48} height={48} className="w-8 h-8 sm:w-12 sm:h-12 object-contain rounded-full" />
              </div>

              {/* Student 4 - Maharashtra */}
              <div
                className="absolute"
                style={{
                  top: hasEntered ? '78.2%' : '50%',
                  left: hasEntered ? '30%' : '50%',
                  transform: 'translate(-50%, -50%)',
                  transition: 'top 900ms ease-out 630ms, left 900ms ease-out 630ms'
                }}
              >
                <Image src="/student4.svg" alt="Student 4" width={48} height={48} className="w-8 h-8 sm:w-12 sm:h-12 object-contain rounded-full" />
              </div>

              {/* Student 5 - Karnataka */}
              <div
                className="absolute"
                style={{
                  top: hasEntered ? '67.3%' : '50%',
                  left: '52%',
                  transform: 'translate(-50%, -50%)',
                  transition: 'top 900ms ease-out 690ms, left 900ms ease-out 690ms'
                }}
              >
                <Image src="/student5.svg" alt="Student 5" width={48} height={48} className="w-8 h-8 sm:w-12 sm:h-12 object-contain rounded-full" />
              </div>

              {/* Student 6 - Tamil Nadu */}
              <div
                className="absolute"
                style={{
                  top: hasEntered ? '90.2%' : '50%',
                  left: hasEntered ? '38%' : '50%',
                  transform: 'translate(-50%, -50%)',
                  transition: 'top 900ms ease-out 750ms, left 900ms ease-out 750ms'
                }}
              >
                <Image src="/student6.svg" alt="Student 6" width={48} height={48} className="w-8 h-8 sm:w-12 sm:h-12 object-contain rounded-full" />
              </div>

              {/* Student 7 - Odisha */}
              <div
                className="absolute"
                style={{
                  top: hasEntered ? '36.8%' : '50%',
                  left: hasEntered ? '88%' : '50%',
                  transform: 'translate(-50%, -50%)',
                  transition: 'top 900ms ease-out 810ms, left 900ms ease-out 810ms'
                }}
              >
                <Image src="/student7.svg" alt="Student 7" width={48} height={48} className="w-8 h-8 sm:w-12 sm:h-12 object-contain rounded-full" />
              </div>

              {/* Text Bubble 1 - Unlimited doubt solving (near Gujarat) */}
              <div 
                className="absolute flex items-center justify-center w-[100px] h-[17px] sm:w-[149.25px] sm:h-[23.22px] rounded-[11.61px] bg-[#FFF9F9] shadow-[0_0_5.46px_0_rgba(0,0,0,0.25)]"
                style={{
                  top: hasEntered ? '40.2%' : '50%',
                  left: hasEntered ? '10%' : '50%',
                  transform: 'translate(-50%, -50%)',
                  transition: 'top 900ms ease-out 870ms, left 900ms ease-out 870ms'
                }}
              >
                <span 
                  className="font-montserrat font-normal text-center text-[8px] leading-[14px] sm:text-[9.86px] sm:leading-[17.75px] text-[#1A2439]"
                >
                  Unlimited <span className="font-bold">doubt</span> solving
                </span>
              </div>

              {/* Text Bubble 2 - Daily LIVE classes (near Odisha) */}
              <div 
                className="absolute flex items-center justify-center w-[100px] h-[17px] sm:w-[149.25px] sm:h-[23.22px] rounded-[11.61px] bg-[#FFF9F9] shadow-[0_0_5.46px_0_rgba(0,0,0,0.25)]"
                style={{
                  top: hasEntered ? '60.6%' : '50%',
                  left: hasEntered ? '60%' : '50%',
                  transform: 'translate(-50%, -50%)',
                  transition: 'top 900ms ease-out 930ms, left 900ms ease-out 930ms'
                }}
              >
                <span 
                  className="font-montserrat font-normal text-center text-[8px] leading-[14px] sm:text-[9.86px] sm:leading-[17.75px] text-[#1A2439]"
                >
                  Daily <span className="font-bold">LIVE</span> classes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impact;
