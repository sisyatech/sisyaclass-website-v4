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
      { root: null, threshold: 0.7, rootMargin: "0px 0px -10% 0px" }
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
            className={`space-y-6 sm:space-y-7 lg:space-y-8 ml-0 md:ml-8 lg:ml-18 transition-all duration-[1500ms] ease-out ${
              hasEntered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="space-y-1.5 sm:space-y-2">
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
                <div key={index} className="space-y-1">
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
            className={`relative flex justify-center items-center ml-8 sm:ml-4 md:ml-12 lg:ml-20 w-[280px] h-[308px] sm:w-[360px] sm:h-[396px] md:w-[440px] md:h-[484px] lg:w-[500px] lg:h-[550px] transition-all duration-[1500ms] ease-out ${
              hasEntered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
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
              className={`absolute inset-0 transition-opacity duration-[900ms] ease-out ${
                hasEntered ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Student 1 - Jammu & Kashmir */}
              <div className="absolute" style={{ top: '63.6%', left: '34.8%' }}>
                <Image src="/student1.svg" alt="Student 1" width={48} height={48} className="w-8 h-8 sm:w-12 sm:h-12 object-contain rounded-full" />
              </div>

              {/* Student 2 - Assam */}
              <div className="absolute" style={{ top: '43.6%', right: '80%' }}>
                <Image src="/student2.svg" alt="Student 2" width={48} height={48} className="w-8 h-8 sm:w-12 sm:h-12 object-contain rounded-full" />
              </div>

              {/* Student 3 - Gujarat */}
              <div className="absolute" style={{ top: '25.5%', left: '26%' }}>
                <Image src="/student3.svg" alt="Student 3" width={48} height={48} className="w-8 h-8 sm:w-12 sm:h-12 object-contain rounded-full" />
              </div>

              {/* Student 4 - Maharashtra */}
              <div className="absolute" style={{ top: '78.2%', right: '64%' }}>
                <Image src="/student4.svg" alt="Student 4" width={48} height={48} className="w-8 h-8 sm:w-12 sm:h-12 object-contain rounded-full" />
              </div>

              {/* Student 5 - Karnataka */}
              <div className="absolute" style={{ bottom: '32.7%', left: '50%' }}>
                <Image src="/student5.svg" alt="Student 5" width={48} height={48} className="w-8 h-8 sm:w-12 sm:h-12 object-contain rounded-full" />
              </div>

              {/* Student 6 - Tamil Nadu */}
              <div className="absolute" style={{ bottom: '1.8%', right: '60%' }}>
                <Image src="/student6.svg" alt="Student 6" width={48} height={48} className="w-8 h-8 sm:w-12 sm:h-12 object-contain rounded-full" />
              </div>

              {/* Student 7 - Odisha */}
              <div className="absolute" style={{ bottom: '58.2%', right: '8%' }}>
                <Image src="/student7.svg" alt="Student 7" width={48} height={48} className="w-8 h-8 sm:w-12 sm:h-12 object-contain rounded-full" />
              </div>

              {/* Text Bubble 1 - Unlimited doubt solving (near Gujarat) */}
              <div 
                className="absolute flex items-center justify-center w-[120px] h-[20px] sm:w-[149.25px] sm:h-[23.22px] rounded-[11.61px] bg-[#FFF9F9] shadow-[0_0_5.46px_0_rgba(0,0,0,0.25)]"
                style={{ top: '38.2%', left: 0 }}
              >
                <span 
                  className="font-montserrat font-normal text-center text-[8px] leading-[14px] sm:text-[9.86px] sm:leading-[17.75px] text-[#1A2439]"
                >
                  Unlimited <span className="font-bold">doubt</span> solving
                </span>
              </div>

              {/* Text Bubble 2 - Daily LIVE classes (near Odisha) */}
              <div 
                className="absolute flex items-center justify-center w-[120px] h-[20px] sm:w-[149.25px] sm:h-[23.22px] rounded-[11.61px] bg-[#FFF9F9] shadow-[0_0_5.46px_0_rgba(0,0,0,0.25)]"
                style={{ top: '53.6%', right: '20%' }}
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
