"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import RevealOnView from "../Reveal/RevealOnView";

const SyllabusSection = () => {
  const subjects = [
    {
      id: 1,
      title: "Mathematics",
      subtitle: "Numbers and comparision",
      iconBg: "bg-[#DDDEFE]",
      titleColor: "text-[#575CFB]",
      buttonBg: "bg-[#575CFB]",
      buttonText: "Explore Maths Champ Course",
      topics: [
        "Ascending and Descending Order",
        "Number system",
        "Number Line",
        "Place Value",
        "Missing Numbers",
        "Comparing Numbers",
        "History of Maths"
      ]
    },
    {
      id: 2,
      title: "Science",
      subtitle: "Numbers and comparision",
      iconBg: "bg-[#41AC7D4D]",
      titleColor: "text-[#41AC7D]",
      buttonBg: "bg-[#41AC7D]",
      buttonText: "Explore Science Champ Course",
      topics: [
        "Ascending and Descending Order",
        "Number system",
        "Number Line",
        "Place Value",
        "Missing Numbers",
        "Comparing Numbers",
        "History of Maths"
      ]
    },
    {
      id: 3,
      title: "English",
      subtitle: "Numbers and comparision",
      iconBg: "bg-[#FAE9E8]",
      titleColor: "text-[#E78F8E]",
      buttonBg: "bg-[#E78F8E]",
      buttonText: "Explore English Champ Course",
      topics: [
        "Ascending and Descending Order",
        "Number system",
        "Number Line",
        "Place Value",
        "Missing Numbers",
        "Comparing Numbers",
        "History of Maths"
      ]
    }
  ];

  return (
    <RevealOnView from="bottom" durationMs={600} delayMs={200}>
      <div className="w-full bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Top Buttons */}
        <RevealOnView from="top" durationMs={500} delayMs={300}>
          <div className="flex flex-col items-start gap-4 mb-8">
            <button className="w-[486px] h-[53px] rounded-xl bg-[#0595CE] text-white font-montserrat font-semibold text-[23px] leading-none tracking-normal text-center">
              Batch Schedule & Syllabus
            </button>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <button className="w-[250.42px] h-[39.22px] rounded-[10px] border-[0.25px] border-[#575CFB] bg-[#1F1F39] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] font-montserrat font-semibold text-[14px] leading-[10px] tracking-normal text-center text-white">
                Latest Batch : 20 Sept 2025
              </button>
              <button className="w-[221.62px] h-[39.22px] rounded-[10px] border-[0.25px] border-[#D1D1D6] bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] font-montserrat font-semibold text-[14px] leading-[10px] tracking-normal text-center text-black">
                Next Batch (Coming Soon)
              </button>
            </div>
          </div>
        </RevealOnView>

        {/* Main Heading */}
        <RevealOnView from="left" durationMs={500} delayMs={400}>
          <div className="text-left mb-12">
            <h2 className="w-[348px] h-[39px] font-montserrat font-bold text-[32px] leading-none tracking-normal text-[#1A2439] mb-4">
              Syllabus for class 8
            </h2>
            <p className="font-montserrat font-medium text-[18px] leading-[14.79px] tracking-normal text-[#556A8E] text-left">
              (20 Sessions) includes 3 modules
            </p>
          </div>
        </RevealOnView>

        {/* Subject Cards */}
     {/* Subject Cards */}
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {subjects.map((subject, index) => (
            <RevealOnView 
              key={subject.id}
              from={index === 0 ? "left" : index === 1 ? "bottom" : "right"} 
              durationMs={600} 
              delayMs={500 + (index * 150)}
            >
              <div className="flex flex-col items-center">
              {/* Subject Card */}
              <div className="w-full max-w-[380px] rounded-[24px] border border-[#EBEBEB] bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)] p-6 hover:shadow-xl transition-shadow mb-6">
                {/* Subject Icon and Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn(`w-[44px] h-[44px] rounded-[6px] flex items-center justify-center flex-shrink-0`, subject.iconBg )}>
                    {subject.title === "Mathematics" && (
                      <Image 
                        src="/grades/math.svg" 
                        alt="Math" 
                        width={29} 
                        height={29}
                      />
                    )}
                   {subject.title === "Science" && (
                      <Image 
                        src="/grades/sciens.svg" 
                        alt="Science" 
                        width={29} 
                        height={29}
                      />
                    )}
                    {subject.title === "English" && (
                      <Image 
                        src="/grades/eng.svg" 
                        alt="English" 
                        width={29} 
                        height={29}
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <h3 className={`font-montserrat font-semibold text-[18px] leading-[14.79px] tracking-[0%] ${subject.titleColor}`}>
                      {subject.title}
                    </h3>
                    <p className="font-montserrat font-medium text-[14px] leading-[18px] tracking-normal text-[#556A8E] mt-1">
                      {subject.subtitle}
                    </p>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="w-full h-0 border-t border-[#E8E8E8] mb-6"></div>

                {/* You will Learn Section */}
                <div>
                  <h4 className="font-montserrat font-semibold text-[16px] leading-[20px] text-[#1A2439] mb-4">
                    You will Learn
                  </h4>
                  <ul className="space-y-3">
                    {subject.topics.map((topic, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <Image 
                            src="/grades/correct.svg" 
                            alt="Check" 
                            width={13} 
                            height={13}
                          />
                        </div>
                        <span className="font-montserrat font-medium text-[14px] leading-[18px] tracking-normal text-[#556A8E]">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Explore Button - Outside the card */}
              <button className={`w-[250.42px] h-[39.22px] ${subject.buttonBg} text-white rounded-[10px] font-montserrat font-semibold text-[14px] leading-[10px] tracking-[0%] text-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] hover:opacity-90 transition-opacity`}>
                {subject.buttonText}
              </button>
            </div>
            </RevealOnView>
          ))}
        </div>

        {/* Pagination Indicators */}
        <RevealOnView from="bottom" durationMs={400} delayMs={1000}>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </RevealOnView>
      </div>
    </div>
    </RevealOnView>
  );
};

export default SyllabusSection;
