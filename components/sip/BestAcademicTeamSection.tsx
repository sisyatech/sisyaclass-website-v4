"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const teacherProfiles = [
  { name: "Srikesh Iyer", institute: "IIT Gandhinagar", image: "/sippics/teacher1.png" },
  { name: "Nidhi", institute: "IIT Bhubaneshwar", image: "/sippics/teacher2.png" },
  { name: "Tharun", institute: "IIT Madras", image: "/sippics/teacher3.png" },
  { name: "Ajay", institute: "IIT Ropar", image: "/sippics/teacher1.png" },
  { name: "Gopesh", institute: "IIT Kanpur", image: "/sippics/teacher2.png" },
  { name: "Neha", institute: "IIT Gandhinagar", image: "/sippics/teacher3.png" },
  { name: "Rutika", institute: "IIT Palakkad", image: "/sippics/teacher1.png" },
  { name: "Kriti Kochar", institute: "IIT Ropar", image: "/sippics/teacher2.png" },
  { name: "Pranav", institute: "IIT Bombay", image: "/sippics/teacher3.png" },
  { name: "Anjali", institute: "IIT Delhi", image: "/sippics/teacher1.png" },
  { name: "Rohit", institute: "IIT Kharagpur", image: "/sippics/teacher2.png" },
  { name: "Meera", institute: "IIT Hyderabad", image: "/sippics/teacher3.png" },
];

const VISIBLE_COUNT = 8;

const BestAcademicTeamSection = () => {
  const [startIndex, setStartIndex] = useState(0);

  const visibleTeachers = useMemo(() => {
    return Array.from({ length: Math.min(VISIBLE_COUNT, teacherProfiles.length) }, (_, idx) => {
      const index = (startIndex + idx) % teacherProfiles.length;
      return teacherProfiles[index];
    });
  }, [startIndex]);

  const moveLeft = () => {
    setStartIndex((prev) => (prev - 4 + teacherProfiles.length) % teacherProfiles.length);
  };

  const moveRight = () => {
    setStartIndex((prev) => (prev + 4) % teacherProfiles.length);
  };

  if (!teacherProfiles.length) {
    return null;
  }

  return (
    <section className="w-full bg-white py-6 md:py-8">
      <div className="mx-auto w-full max-w-6xl px-6 text-center md:px-10 lg:px-12">
        <div className="space-y-1">
          <h2 className="text-[26px] font-bold leading-tight text-[#0595CE] sm:text-[32px] md:text-[44px]">
            Best Academic
          </h2>
          <p className="text-[20px] font-semibold text-[#111826] sm:text-[24px] md:text-[30px]">Team</p>
        </div>

        <div className="relative mt-10 flex flex-col items-center justify-center gap-6 md:mt-12 md:flex-row md:gap-0">
          <button
            type="button"
            onClick={moveLeft}
            aria-label="Previous"
            className="hidden h-10 w-10 items-center justify-center rounded-[14px] border-2 border-[#D9D9D9] bg-white text-[#111826] shadow-[0_8px_18px_rgba(17,24,38,0.12)] transition-transform duration-200 hover:bg-gray-100 hover:scale-105 md:absolute md:left-0 md:top-1/2 md:z-10 md:flex md:-translate-x-2 md:-translate-y-1/2 md:transform"
          >
            <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 21L3 12L11 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="w-full overflow-hidden px-2 sm:px-4 md:mx-14 md:px-0">
            <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-6 md:grid-cols-4 md:gap-x-6 md:gap-y-4">
              {visibleTeachers.map((teacher, idx) => (
                <div
                  key={`${teacher.name}-${idx}`}
                  className={`${idx >= 4 ? "hidden md:flex" : "flex"} flex-col items-center gap-2 text-center`}
                >
                  <div className="flex h-[96px] w-[96px] items-center justify-center rounded-full bg-[#D9EFFFB2] sm:h-[108px] sm:w-[108px] md:h-[120px] md:w-[120px]">
                    <Image
                      src={teacher.image}
                      alt={teacher.name}
                      width={120}
                      height={120}
                      className="h-[88px] w-[88px] rounded-full object-cover sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px]"
                    />
                  </div>
                  <p className="text-[13px] font-semibold text-[#111826] sm:text-[15px] md:text-[16px]">
                    {teacher.name}
                  </p>
                  <p className="text-[12px] font-semibold text-[#0595CE] sm:text-[14px] md:text-[16px]">
                    {teacher.institute}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={moveRight}
            aria-label="Next"
            className="hidden h-10 w-10 items-center justify-center rounded-[14px] border-2 border-[#D9D9D9] bg-white text-[#111826] shadow-[0_8px_18px_rgba(17,24,38,0.12)] transition-transform duration-200 hover:bg-gray-100 hover:scale-105 md:absolute md:right-0 md:top-1/2 md:z-10 md:flex md:translate-x-2 md:-translate-y-1/2 md:transform"
          >
            <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3L11 12L3 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-4 md:hidden">
          <button
            type="button"
            onClick={moveLeft}
            aria-label="Previous"
            className="flex h-10 w-10 items-center justify-center rounded-[14px] border-2 border-[#D9D9D9] bg-white text-[#111826] shadow-[0_8px_18px_rgba(17,24,38,0.12)] transition-transform duration-200 hover:bg-gray-100 hover:scale-105"
          >
            <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 21L3 12L11 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={moveRight}
            aria-label="Next"
            className="flex h-10 w-10 items-center justify-center rounded-[14px] border-2 border-[#D9D9D9] bg-white text-[#111826] shadow-[0_8px_18px_rgba(17,24,38,0.12)] transition-transform duration-200 hover:bg-gray-100 hover:scale-105"
          >
            <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3L11 12L3 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestAcademicTeamSection;
