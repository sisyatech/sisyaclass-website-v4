"use client";

import React from "react";
import Image from "next/image";
import RevealOnView from "../Reveal/RevealOnView";

interface SubjectCourseProps {
  gradeNumber: number;
  subject: string;
}

const SubjectCourse = ({ gradeNumber, subject }: SubjectCourseProps) => {
  const getSubjectData = () => {
    switch (subject.toLowerCase()) {
      case 'maths':
        return {
          title: "Master Core Maths Concepts With Star Teachers in 2 Days",
          icon: "/grades/math.svg",
          iconBg: "bg-[#DDDEFE]",
          titleColor: "text-[#575CFB]",
          subjects: ["Numbers and Operations", "Algebra Basics", "Geometry", "Data Handling"],
          buttonColor: "bg-[#575CFB]",
          description: "Build strong mathematical foundations with our comprehensive maths course designed for Class 8 students."
        };
      case 'science':
        return {
          title: "Master Core Science Concepts With Star Teachers in 2 Days",
          icon: "/grades/sciens.svg",
          iconBg: "bg-[#41AC7D4D]",
          titleColor: "text-[#41AC7D]",
          subjects: ["Physics", "Chemistry", "Biology", "Environmental Science"],
          buttonColor: "bg-[#41AC7D]",
          description: "Explore the fascinating world of science with our interactive course covering all essential Class 8 science topics."
        };
      case 'english':
        return {
          title: "Master Core English Concepts With Star Teachers in 2 Days",
          icon: "/grades/eng.svg",
          iconBg: "bg-[#FAE9E8]",
          titleColor: "text-[#E78F8E]",
          subjects: ["Grammar", "Literature", "Writing Skills", "Comprehension"],
          buttonColor: "bg-[#E78F8E]",
          description: "Enhance your English language skills with our comprehensive course designed to improve reading, writing, and communication."
        };
      default:
        return {
          title: "Master Core Concepts With Star Teachers in 2 Days",
          icon: "/grades/math.svg",
          iconBg: "bg-[#DDDEFE]",
          titleColor: "text-[#575CFB]",
          subjects: ["Topic 1", "Topic 2", "Topic 3", "Topic 4"],
          buttonColor: "bg-[#575CFB]",
          description: "Comprehensive course designed for optimal learning outcomes."
        };
    }
  };

  const subjectData = getSubjectData();

  return (
    <div className="relative w-full min-h-screen bg-[#F0F7FA] pt-20 pb-16">
      {/* Background Container */}
      <div className="absolute top-40 inset-x-0 w-full h-[587px] opacity-100 bg-[#F0F7FA]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-2 xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-center lg:items-start space-y-8 lg:pr-8">
            
            {/* Class Badge */}
            <RevealOnView from="top" durationMs={800} delayMs={0}>
              <div className="flex flex-row items-center gap-2 sm:gap-3 mb-4">
                <div className="w-[120px] h-[40px] sm:w-[140px] sm:h-[45px] md:w-[160px] md:h-[50px] relative">
                  <Image 
                    src="/grades/coursebaner.svg" 
                    alt="Course Banner" 
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-montserrat font-semibold text-[#1BA8EF] text-xl sm:text-2xl whitespace-nowrap">
                  Class {gradeNumber}
                </h3>
              </div>
            </RevealOnView>

            {/* Main Headline */}
            <RevealOnView from="left" durationMs={1000} delayMs={200}>
              <h1 className="font-roboto font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[36px] leading-tight text-[#161A38] text-center lg:text-left">
                {subjectData.title}
              </h1>
            </RevealOnView>

            {/* Subjects Covered */}
            <RevealOnView from="left" durationMs={1000} delayMs={400}>
              <div className="w-full">
                <h3 className="font-roboto font-medium text-[18px] leading-[31px] tracking-[3%] text-[#556A8E] mb-4">
                  Subjects Covered:
                </h3>
                <div className="flex flex-wrap gap-3">
                  {subjectData.subjects.map((subject, index) => (
                    <div
                      key={index}
                      className="w-auto h-[24.71px] px-3 py-1 rounded-[4.63px] bg-white border border-[#556A8E] flex items-center justify-center"
                    >
                      <span className="font-montserrat font-medium text-[13.9px] leading-[169%] tracking-[0%] text-[#556A8E] text-center whitespace-nowrap">
                        {subject}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnView>

            {/* Rating Card */}
            <RevealOnView from="bottom" durationMs={1000} delayMs={600}>
              <div className="w-full max-w-[340px] sm:max-w-[400px] md:max-w-[447px] bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-2xl font-bold text-[#161A38]">4.5/5.0</div>
                </div>
                <p className="text-[#556A8E] text-sm">
                  Rated by 10,000+ students
                </p>
              </div>
            </RevealOnView>

            {/* CTA Button */}
            <RevealOnView from="bottom" durationMs={1000} delayMs={800}>
              <button className="w-full sm:w-full md:w-full lg:max-w-[447px] h-[46px] sm:h-[50px] md:h-[53px] rounded-xl bg-[#0595CE] text-white font-montserrat font-semibold text-base sm:text-lg md:text-xl lg:text-[23px] px-4 hover:bg-[#047aa8] transition-colors">
                Register for demo at just ₹29
              </button>
            </RevealOnView>
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-center lg:items-end lg:pl-8">
            
            {/* Guarantee Badge */}
            <RevealOnView from="top" durationMs={800} delayMs={300}>
              <div className="w-full max-w-[371px] h-[40px] sm:h-[32px] md:h-[28px] bg-[#41AC7D] rounded-[6px] flex items-center justify-center mb-6 sm:mb-8">
                <span className="font-rubik font-normal text-[16px] sm:text-[17px] md:text-[18px] leading-[100%] tracking-[0%] text-center text-white">
                  The Guaranteed Path to Higher Scores
                </span>
              </div>
            </RevealOnView>

            {/* Subject Icon and Video Container */}
            <div className="flex flex-col items-center gap-4">
              {/* Subject Icon */}
              <RevealOnView from="top" durationMs={600} delayMs={400}>
                <div className={`w-16 h-16 ${subjectData.iconBg} rounded-full flex items-center justify-center`}>
                  <Image 
                    src={subjectData.icon}
                    alt={subject}
                    width={32}
                    height={32}
                  />
                </div>
              </RevealOnView>

              {/* Video Container */}
              <RevealOnView from="right" durationMs={1200} delayMs={500}>
                <div className="relative w-full max-w-[350px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[606px] h-[240px] sm:h-[300px] md:h-[360px] lg:h-[400px] rounded-[20px] overflow-hidden shadow-xl mx-auto lg:mx-0">
                  <iframe
                    className="w-full h-full rounded-[20px]"
                    src="https://www.youtube.com/embed/sRCYjcVijew?autoplay=1&mute=1&loop=1&playlist=sRCYjcVijew&controls=1&modestbranding=1&rel=0"
                    title="Course Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </RevealOnView>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectCourse;
