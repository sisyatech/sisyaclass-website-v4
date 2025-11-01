"use client";

import React, { useState } from "react";
import Image from "next/image";
import RevealOnView from "../Reveal/RevealOnView";

const StudyMaterials = () => {
  const [selectedClass, setSelectedClass] = useState(1);

  const classes = Array.from({ length: 10 }, (_, i) => i + 1);

  const materials = [
    {
      id: 1,
      title: "NCERT",
      image: "/blogs/ncrt.png",
      description: "National Council of Educational Research and Training materials"
    },
    {
      id: 2,
      title: "Previous Year",
      image: "/blogs/ncrt.png", 
      description: "Central Board of Secondary Education study materials"
    },
    {
      id: 3,
      title: "Sample paper",
      image: "/blogs/ncrt.png",
      description: "Comprehensive practice tests and mock exams"
    },
    {
      id: 4,
      title: "Important material",
      image: "/blogs/ncrt.png",
      description: "Previous year question papers and sample tests"
    },
    
  ];

  return (
    <>
    <div className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-25">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <RevealOnView from="bottom" durationMs={800} delayMs={0}>
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {/* Header */}
            <div className="text-center">
              <h2 
                className="font-montserrat font-bold text-[24px] sm:text-[28px] md:text-[30px] lg:text-[32px] leading-[120%] sm:leading-[110%] md:leading-[100%] tracking-[0%] text-[#1A2439] mx-auto"
              >
                Study Materials
              </h2>
            </div>

            {/* Class Selection Buttons */}
            <div className="flex flex-nowrap justify-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 overflow-x-auto px-2 sm:px-4 pb-2 hide-scrollbar">
              {classes.map((classNum) => (
                <button
                  key={classNum}
                  onClick={() => setSelectedClass(classNum)}
                  className={`font-montserrat font-semibold text-[12px] sm:text-[13px] md:text-[14px] leading-[10px] tracking-[0%] text-center rounded-[8px] sm:rounded-[9px] md:rounded-[10px] border transition-all duration-300 flex-shrink-0 flex items-center justify-center ${
                    selectedClass === classNum
                      ? 'border-[#575CFB] bg-[#575CFB] text-white shadow-[0px_4px_4px_0px_#00000040]'
                      : 'border-[#D1D1D6] bg-white text-[#1F1F39] shadow-[0px_4px_4px_0px_#00000040] hover:bg-gray-50'
                  }`}
                  style={{ 
                    width: 'clamp(85px, 90px, 102.93px)', 
                    height: 'clamp(32px, 36px, 39.22px)',
                    borderWidth: '0.25px',
                    minWidth: '85px'
                  }}
                >
                  Class {classNum}
                </button>
              ))}
            </div>

            {/* Materials Horizontal Scroll */}
            <div className="py-2 sm:py-3 md:py-4 px-2 sm:px-4 flex justify-center">
              <div className="overflow-x-auto overflow-y-hidden hide-scrollbar">
                <div className="flex flex-nowrap gap-4 sm:gap-5 md:gap-6 justify-center" style={{ width: 'max-content' }}>
                {materials.map((material, index) => (
                  <RevealOnView 
                    key={material.id}
                    from="bottom" 
                    durationMs={600} 
                    delayMs={index * 150}
                  >
                    <div 
                      className="relative bg-[#DDDEFE] rounded-[18px] sm:rounded-[20px] md:rounded-[21px] p-3 sm:p-3.5 md:p-4 transition-all duration-300 hover:shadow-lg hover:scale-105 flex-shrink-0 w-[170px] sm:w-[180px] md:w-[190px] lg:w-[203px] h-[250px] sm:h-[260px] md:h-[270px] lg:h-[274px] overflow-hidden"
                      style={{ 
                        minWidth: '170px',
                        maxHeight: '274px'
                      }}
                    >
                      {/* Image Container */}
                      <div 
                        className="relative mx-auto mb-3 sm:mb-3.5 md:mb-4 mt-2 sm:mt-3 md:mt-4 overflow-hidden w-[110px] sm:w-[120px] md:w-[130px] lg:w-[137px] h-[110px] sm:h-[120px] md:h-[130px] lg:h-[137px]"
                        style={{ 
                          border: '4px solid #FFFFFF',
                          backgroundColor: '#FFFFFF80',
                          borderRadius: '100px'
                        }}
                      >
                        <Image
                          src={material.image}
                          alt={material.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Title */}
                      <div className="text-center mt-2 sm:mt-2.5 md:mt-3">
                        <div className="font-montserrat font-black text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] leading-[120%] sm:leading-[110%] md:leading-[100%] tracking-[0.02em] text-[#1A2439]">
                          {material.title}
                        </div>
                        <div className="font-montserrat font-semibold text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[120%] sm:leading-[110%] md:leading-[100%] tracking-[0.02em] text-[#1A2439] mt-0.5 sm:mt-0.75 md:mt-1">
                          Solutions
                        </div>
                      </div>
                    </div>
                  </RevealOnView>
                ))}
                </div>
              </div>
            </div>
          </div>
        </RevealOnView>
      </div>
    </div>
    <style>{`
      .hide-scrollbar::-webkit-scrollbar { display: none; }
      .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `}</style>
    </>
  );
};

export default StudyMaterials;
