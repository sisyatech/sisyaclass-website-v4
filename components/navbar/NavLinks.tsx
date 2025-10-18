"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavMenu } from "@/components/navbar/NavMenu";
import { NavMenuItem } from "@/components/navbar/NavMenuItem";
import { HoveredLink } from "./HoveredLink";
import { gradeLinks } from "@/lib/gradeLinks";
import { resourcesLinks } from "@/lib/resourcesLinks";
import { useMobileMenu } from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { extractGradeFromLabel, getGradeUrl } from "@/lib/navigation";

const NavLinks = () => {
  const [active, setActive] = useState<string | null>(null);
  const [hoveredGrade, setHoveredGrade] = useState<string | null>(null);
  const [hoveredResource, setHoveredResource] = useState<string | null>(null);
  const { setSelectedGrade } = useMobileMenu();
  const router = useRouter();
  
  const handleGradeClick = (gradeLabel: string) => {
    const gradeNumber = extractGradeFromLabel(gradeLabel);
    if (gradeNumber) {
      setSelectedGrade(gradeNumber);
      router.push(getGradeUrl(gradeNumber));
    }
  };

  const handleCourseClick = (gradeLabel: string, courseType: string) => {
    const gradeNumber = extractGradeFromLabel(gradeLabel);
    if (gradeNumber) {
      setSelectedGrade(gradeNumber);
      if (courseType === "booster") {
        router.push(`/grade${gradeNumber}`);
      } else if (courseType === "math-longterm") {
        router.push(`/grade${gradeNumber}/mathematics`);
      } else if (courseType === "master") {
        router.push(`/grade${gradeNumber}`);
      }
    }
  };

  const courses = [
    { label: "Booster Course", type: "booster" },
    { label: "Math Long Term Course", type: "math-longterm" },
    { label: "Long Term Master Course", type: "master" }
  ];

  const handleResourceClick = (resourceLabel: string, subject?: string) => {
    if (resourceLabel === "NCERT solutions") {
      router.push(`/ncert-solutions/${subject || 'class-12'}`);
    } else {
      router.push(`/resources/${resourceLabel.toLowerCase().replace(/\s+/g, '-')}`);
    }
  };

  const ncertSubjects = [
    { label: "Maths", value: "maths" },
    { label: "Physics", value: "physics" },
    { label: "Science", value: "science" },
    { label: "English", value: "english" },
    { label: "Hindi", value: "hindi" }
  ];

  const resourceItems = [
    { label: "NCERT solutions", type: "ncert" },
    { label: "Sample Papers", type: "sample" },
    { label: "Previous Year Papers", type: "previous" },
    { label: "Study Materials", type: "study" }
  ];

  return (
    <NavMenu setActive={setActive}>
      <NavMenuItem setActive={setActive} active={active} item="Courses">
        <motion.div 
          className="flex overflow-hidden"
          animate={{ 
            width: hoveredGrade ? "400px" : "140px" 
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onMouseLeave={() => setHoveredGrade(null)}
        >
          {/* Left Column - Grades */}
          <div className="flex flex-col space-y-3 pr-6 pl-2 min-w-[140px]">
            {gradeLinks.map((link) => (
              <div 
                key={link.href}
                onMouseEnter={() => setHoveredGrade(link.label)}
                className={`cursor-pointer transition-all duration-200 font-medium text-sm py-2 px-3 rounded flex items-center justify-between ${
                  hoveredGrade === link.label 
                    ? 'text-[#02bdfe] bg-blue-50' 
                    : 'text-gray-700 hover:text-[#02bdfe] hover:bg-gray-50'
                }`}
              >
                <span>{link.label}</span>
                <motion.svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{
                    opacity: hoveredGrade === link.label ? 0 : 1,
                    x: hoveredGrade === link.label ? 5 : 0
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </div>
            ))}
          </div>
          
          {/* Right Column - Course Options */}
          <motion.div 
            className="pl-6 flex-1 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredGrade ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait">
              {hoveredGrade && (
                <motion.div
                  key={hoveredGrade}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="space-y-4"
                >
                  <h3 className="font-semibold text-sm text-gray-800 mb-3">
                    {hoveredGrade} Courses
                  </h3>
                  <div className="space-y-2">
                    {courses.map((course) => (
                      <motion.div
                        key={course.type}
                        onClick={() => handleCourseClick(hoveredGrade, course.type)}
                        className="cursor-pointer hover:text-[#02bdfe] transition-colors text-sm py-2 px-3 rounded hover:bg-gray-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {course.label}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </NavMenuItem>
      <NavMenuItem setActive={setActive} active={active} item="Resources For Students">
        <motion.div 
          className="flex overflow-hidden"
          animate={{ 
            width: hoveredResource ? "600px" : "200px",
            height: hoveredResource ? "300px" : "auto"
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          onMouseLeave={() => setHoveredResource(null)}
        >
          {/* Left Column - Resource Categories */}
          <div className="flex flex-col space-y-4 pr-6 pl-2 min-w-[200px] py-8 min-h-[400px]">
            {resourceItems.map((item) => (
              <div 
                key={item.type}
                onMouseEnter={() => setHoveredResource(item.label)}
                className={`cursor-pointer transition-all duration-200 font-medium text-sm py-2 px-3 rounded flex items-center justify-between ${
                  hoveredResource === item.label 
                    ? 'text-[#02bdfe] bg-blue-50' 
                    : 'text-gray-700 hover:text-[#02bdfe] hover:bg-gray-50'
                }`}
              >
                <span className="whitespace-nowrap flex-shrink-0">{item.label}</span>
                <motion.svg 
                  className="w-4 h-4 flex-shrink-0 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{
                    opacity: hoveredResource === item.label ? 0 : 1,
                    x: hoveredResource === item.label ? 5 : 0
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </div>
            ))}
          </div>
          
          {/* Right Column - Resource Options */}
          <motion.div 
            className="pl-6 flex-1 overflow-hidden py-8 min-h-[400px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredResource ? 1 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait">
              {hoveredResource && (
                <motion.div
                  key={hoveredResource}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <h3 className="font-semibold text-sm text-gray-800 mb-3">
                    {hoveredResource} for class 12
                  </h3>
                  {hoveredResource === "NCERT solutions" ? (
                    <div className="space-y-2">
                      {ncertSubjects.map((subject) => (
                        <motion.div
                          key={subject.value}
                          onClick={() => handleResourceClick(hoveredResource, subject.value)}
                          className="cursor-pointer hover:text-[#02bdfe] transition-colors text-sm py-2 px-3 rounded hover:bg-gray-50"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {subject.label}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <motion.div
                        onClick={() => handleResourceClick(hoveredResource)}
                        className="cursor-pointer hover:text-[#02bdfe] transition-colors text-sm py-2 px-3 rounded hover:bg-gray-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {hoveredResource} for class 12
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </NavMenuItem>
    </NavMenu>
  );
};

export default NavLinks;
