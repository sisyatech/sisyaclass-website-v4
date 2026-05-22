"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavMenu } from "@/components/navbar/NavMenu";
import { NavMenuItem } from "@/components/navbar/NavMenuItem";
import { HoveredLink } from "./HoveredLink";
import { gradeLinks } from "@/lib/gradeLinks";
import { resourcesLinks } from "@/lib/resourcesLinks";
import { useMobileMenu } from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { extractGradeFromLabel, getGradeUrl } from "@/lib/navigation";

// ── Types for Resources For Students API ──────────────────────────────────────
interface NavLink {
  id: string;
  title: string;
  link: string;
  newTab: boolean;
  order: number;
}

interface NavSubItem {
  id: string;
  title: string;
  slug: string;
  order: number;
  isActive: boolean;
  links: NavLink[];
}

interface NavItem {
  id: string;
  title: string;
  slug: string;
  order: number;
  isActive: boolean;
  subItems: NavSubItem[];
}

interface NavGroup {
  id: string;
  title: string;
  slug: string;
  items: NavItem[];
}

// ── Group ID for Resources For Students ──────────────────────────────────────
const RESOURCES_GROUP_ID = "cmpgsimep0000b3ezezmcu99f";

const NavLinks = () => {
  const [active, setActive] = useState<string | null>(null);
  const [hoveredGrade, setHoveredGrade] = useState<string | null>(null);
  type CourseLink = { label: string; type: 'booster' | 'math-longterm' | 'master' };
  const [fetchedCourseLabels, setFetchedCourseLabels] = useState<CourseLink[] | null>(null);
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);
  const { setSelectedGrade } = useMobileMenu();
  const router = useRouter();

  // ── Resources For Students state ─────────────────────────────────────────────
  const [resourceGroup, setResourceGroup] = useState<NavGroup | null>(null);
  const [isLoadingResources, setIsLoadingResources] = useState(false);
  const [resourcesFetched, setResourcesFetched] = useState(false);

  // 3-level hover state: which item (category) and which subItem (grade)
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [hoveredSubItemId, setHoveredSubItemId] = useState<string | null>(null);

  const fetchResourcesGroup = useCallback(async () => {
    if (resourcesFetched || isLoadingResources) return;
    setIsLoadingResources(true);
    try {
      const res = await fetch("https://sisyaclass.xyz/student/nav_groups_get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: RESOURCES_GROUP_ID }),
      });
      if (res.ok) {
        const data: NavGroup[] = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setResourceGroup(data[0]);
        }
      }
    } catch (e) {
      // silently fail
    } finally {
      setIsLoadingResources(false);
      setResourcesFetched(true);
    }
  }, [resourcesFetched, isLoadingResources]);

  // Fetch when the menu opens
  useEffect(() => {
    if (active === "Resources For Students") {
      fetchResourcesGroup();
      // Reset sub-hover state each time menu opens
      setHoveredItemId(null);
      setHoveredSubItemId(null);
    }
  }, [active, fetchResourcesGroup]);

  const handleGradeClick = (gradeLabel: string) => {
    const gradeNumber = extractGradeFromLabel(gradeLabel);
    if (gradeNumber) {
      setSelectedGrade(gradeNumber);
      router.push(getGradeUrl(gradeNumber));
    }
  };

  const handleCourseClick = (gradeLabel: string, courseLabel: string) => {
    const gradeNumber = extractGradeFromLabel(gradeLabel);
    if (gradeNumber) {
      setSelectedGrade(gradeNumber);
      const courseSlug = courseLabel.toLowerCase().replace(/\s+/g, '-');
      router.push(`/grade${gradeNumber}/${courseSlug}`);
    }
  };

  // Fetch backend web labels for hovered grade
  React.useEffect(() => {
    const fetchWebLabels = async () => {
      try {
        if (!hoveredGrade) { setFetchedCourseLabels(null); setIsLoadingCourses(false); return; }
        const gradeNumber = extractGradeFromLabel(hoveredGrade);
        if (!gradeNumber) { setFetchedCourseLabels(null); setIsLoadingCourses(false); return; }
        setIsLoadingCourses(true);
        const res = await fetch('/api/grade-web-label', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ grade: gradeNumber })
        });
        if (res.ok) {
          const data = await res.json();
          const items: CourseLink[] = Array.isArray(data?.courses) ? data.courses : [];
          setFetchedCourseLabels(items.length > 0 ? items : null);
        } else {
          setFetchedCourseLabels(null);
        }
      } catch (e) {
        setFetchedCourseLabels(null);
      } finally {
        setIsLoadingCourses(false);
      }
    };
    fetchWebLabels();
  }, [hoveredGrade]);

  // Derived: current item and subItem objects
  const activeNavItem = resourceGroup?.items.find((i) => i.id === hoveredItemId) ?? null;
  const activeSubItem = activeNavItem?.subItems.find((s) => s.id === hoveredSubItemId) ?? null;

  // Width calculation for 3-panel resources menu
  const resourcesWidth = hoveredSubItemId
    ? (activeSubItem?.links && activeSubItem.links.length > 0 ? "820px" : "600px")
    : hoveredItemId
    ? "600px"
    : "220px";

  return (
    <NavMenu setActive={setActive}>
      <NavMenuItem setActive={setActive} active={active} item="Courses">
        <motion.div 
          className="flex overflow-hidden max-h-[70vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          animate={{ 
            width: hoveredGrade ? "400px" : "140px" 
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onMouseLeave={() => setHoveredGrade(null)}
        >
          {/* Left Column - Grades */}
          <div className="flex flex-col space-y-3 pr-6 pl-2 min-w-[140px] max-h-[70vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
            className="pl-6 flex-1 overflow-y-auto max-h-[70vh] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
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
                    {isLoadingCourses ? (
                      <div className="flex items-center gap-2 text-sm text-gray-500 py-2 px-3">
                        <svg className="h-4 w-4 animate-spin text-gray-400" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                        Loading courses...
                      </div>
                    ) : fetchedCourseLabels && fetchedCourseLabels.length > 0 ? (
                      fetchedCourseLabels.map((item) => (
                        <motion.div
                          key={item.label}
                          onClick={() => handleCourseClick(hoveredGrade, item.label)}
                          className="cursor-pointer hover:text-[#02bdfe] transition-colors text-sm py-2 px-3 rounded hover:bg-gray-50"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {item.label}
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500 py-2 px-3">No courses available</div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </NavMenuItem>

      {/* ── Resources For Students ── */}
      <NavMenuItem setActive={setActive} active={active} item="Resources For Students">
        <motion.div
          className="flex overflow-hidden max-h-[75vh]"
          animate={{ width: resourcesWidth }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* ── Column 1: Item categories (e.g. SYLLABUS, PYQ …) ── */}
          <div className="flex flex-col min-w-[220px] py-6 pl-2 pr-4 max-h-[75vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {isLoadingResources ? (
              <div className="flex items-center gap-2 text-sm text-gray-500 px-3 py-4">
                <svg className="h-4 w-4 animate-spin text-[#02bdfe]" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Loading resources…
              </div>
            ) : resourceGroup ? (
              resourceGroup.items
                .filter((item) => item.isActive)
                .map((item) => (
                  <div
                    key={item.id}
                    onMouseEnter={() => {
                      setHoveredItemId(item.id);
                      setHoveredSubItemId(null);
                    }}
                    className={`cursor-pointer transition-all duration-200 font-semibold text-xs tracking-wider py-2.5 px-3 rounded flex items-center justify-between ${
                      hoveredItemId === item.id
                        ? "text-[#02bdfe] bg-blue-50"
                        : "text-gray-600 hover:text-[#02bdfe] hover:bg-gray-50"
                    }`}
                  >
                    <span className="uppercase whitespace-nowrap">{item.title}</span>
                    <motion.svg
                      className="w-3.5 h-3.5 flex-shrink-0 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{
                        opacity: hoveredItemId === item.id ? 0 : 1,
                        x: hoveredItemId === item.id ? 4 : 0,
                      }}
                      transition={{ duration: 0.15 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </div>
                ))
            ) : (
              <div className="text-sm text-gray-400 px-3 py-4">No resources available</div>
            )}
          </div>

          {/* ── Column 2: SubItems (grades) ── */}
          <AnimatePresence>
            {hoveredItemId && activeNavItem && (
              <motion.div
                key={hoveredItemId}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col min-w-[180px] py-6 pl-4 pr-4 border-l border-gray-100 max-h-[75vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase px-2 mb-3">
                  {activeNavItem.title}
                </p>
                {activeNavItem.subItems
                  .filter((sub) => sub.isActive)
                  .map((sub) => (
                    <div
                      key={sub.id}
                      onMouseEnter={() => setHoveredSubItemId(sub.id)}
                      className={`cursor-pointer transition-all duration-200 text-sm py-2 px-3 rounded flex items-center justify-between ${
                        hoveredSubItemId === sub.id
                          ? "text-[#02bdfe] bg-blue-50 font-medium"
                          : "text-gray-600 hover:text-[#02bdfe] hover:bg-gray-50"
                      }`}
                    >
                      <span>{sub.title}</span>
                      {sub.links.length > 0 && (
                        <motion.svg
                          className="w-3.5 h-3.5 flex-shrink-0 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          animate={{
                            opacity: hoveredSubItemId === sub.id ? 0 : 0.5,
                            x: hoveredSubItemId === sub.id ? 4 : 0,
                          }}
                          transition={{ duration: 0.15 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </motion.svg>
                      )}
                    </div>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Column 3: Links ── */}
          <AnimatePresence>
            {hoveredSubItemId && activeSubItem && activeSubItem.links.length > 0 && (
              <motion.div
                key={hoveredSubItemId}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col min-w-[240px] py-6 pl-4 pr-2 border-l border-gray-100 max-h-[75vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase px-2 mb-3">
                  {activeSubItem.title}
                </p>
                <div className="space-y-1">
                  {activeSubItem.links
                    .sort((a, b) => a.order - b.order)
                    .map((lnk) => (
                      <motion.a
                        key={lnk.id}
                        href={lnk.link}
                        target={lnk.newTab ? "_blank" : "_self"}
                        rel={lnk.newTab ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-2 text-sm py-2 px-3 rounded text-gray-600 hover:text-[#02bdfe] hover:bg-blue-50 transition-colors cursor-pointer"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.15 }}
                      >
                        <svg className="w-3 h-3 text-[#02bdfe] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        {lnk.title}
                      </motion.a>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </NavMenuItem>
    </NavMenu>
  );
};

export default NavLinks;
