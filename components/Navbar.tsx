"use client";

import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Image from "next/image";
import Logo from "@/public/nav/logo.svg";
import ScrollEffect from "@/components/navbar/ScrollEffect";
import NavLinks from "@/components/navbar/NavLinks";
import Link from "next/link";
import { Phone, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { gradeLinks } from "@/lib/gradeLinks";
import { resourcesLinks } from "@/lib/resourcesLinks";
import { usePathname, useRouter } from "next/navigation";
import {
  extractGradeFromLabel,
  getGradeUrl,
  routes,
} from "@/lib/navigation";
import { useUser } from "@/components/UserContext";

// =============================
// Store links + helper
// =============================
const ANDROID_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&hl=en_IN"; // TODO: replace with real
const IOS_STORE_URL =
  "https://apps.apple.com/in/app/sisya-class-e-learning-app/id6739211295"; // TODO: replace with real

const openStoreForPlatform = () => {
  if (typeof window === "undefined") return;

  const ua = navigator.userAgent || navigator.vendor || (window as any).opera;

  // Android
  if (/android/i.test(ua)) {
    window.open(ANDROID_STORE_URL, "_blank");
    return;
  }

  // iOS (iPhone / iPad / iPod)
  if (/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream) {
    window.open(IOS_STORE_URL, "_blank");
    return;
  }

  // Fallback → open Play Store
  window.open(ANDROID_STORE_URL, "_blank");
};

// =============================
// Context
// =============================
const MobileMenuContext = createContext<{
  isMobileMenuOpen: boolean;
  expandedSection: string | null;
  selectedGrade: number | null;
  currentPage: string;
  toggleMobileMenu: () => void;
  toggleSection: (section: string) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  setSelectedGrade: (grade: number | null) => void;
  setCurrentPage: (page: string) => void;
} | null>(null);

export const MobileMenuProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<string>("home");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    if (isMobileMenuOpen) {
      setExpandedSection(null);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  return (
    <MobileMenuContext.Provider
      value={{
        isMobileMenuOpen,
        expandedSection,
        selectedGrade,
        currentPage,
        toggleMobileMenu,
        toggleSection,
        setIsMobileMenuOpen,
        setSelectedGrade,
        setCurrentPage,
      }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
};

export const useMobileMenu = () => {
  const ctx = useContext(MobileMenuContext);
  if (!ctx) throw new Error("useMobileMenu must be used within provider");
  return ctx;
};

// =============================
// Mobile Menu Component
// =============================
export const MobileMenu = () => {
  const {
    isMobileMenuOpen,
    expandedSection,
    toggleSection,
    setIsMobileMenuOpen,
    setSelectedGrade,
    setCurrentPage,
  } = useMobileMenu();
  const router = useRouter();
  const [currentView, setCurrentView] = useState<
    "main" | "courses" | "resources"
  >("main");
  const [expandedGrade, setExpandedGrade] = useState<string | null>(null);

  // ── Resources For Students (mobile) ──
  type NavMobileLink = { id: string; title: string; link: string; newTab: boolean; order: number };
  type NavMobileSubItem = { id: string; title: string; slug: string; isActive: boolean; links: NavMobileLink[] };
  type NavMobileItem = { id: string; title: string; slug: string; isActive: boolean; subItems: NavMobileSubItem[] };
  type NavMobileGroup = { id: string; title: string; slug: string; items: NavMobileItem[] };

  const RESOURCES_GROUP_ID = "cmpgsimep0000b3ezezmcu99f";
  const [resourceGroup, setResourceGroup] = useState<NavMobileGroup | null>(null);
  const [isLoadingResources, setIsLoadingResources] = useState(false);
  const [resourcesFetched, setResourcesFetched] = useState(false);
  // accordion state for 3-level mobile hierarchy
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [expandedSubItemId, setExpandedSubItemId] = useState<string | null>(null);

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
        const data: NavMobileGroup[] = await res.json();
        if (Array.isArray(data) && data.length > 0) setResourceGroup(data[0]);
      }
    } catch {
      // silently fail
    } finally {
      setIsLoadingResources(false);
      setResourcesFetched(true);
    }
  }, [resourcesFetched, isLoadingResources]);

  useEffect(() => {
    if (currentView === "resources") {
      fetchResourcesGroup();
      setExpandedItemId(null);
      setExpandedSubItemId(null);
    }
  }, [currentView, fetchResourcesGroup]);

  type CourseLink = {
    label: string;
    type: "booster" | "math-longterm" | "master";
  };
  const [fetchedCourseLabels, setFetchedCourseLabels] = useState<
    CourseLink[] | null
  >(null);
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);

  const fallbackCourses: never[] = [];

  const handleGradeClick = (gradeLabel: string) => {
    setExpandedGrade((prev) => (prev === gradeLabel ? null : gradeLabel));
  };

  const handleResourceClick = (resourceLabel: string) => {
    // kept for potential legacy use
  };

  const handleCourseClick = (gradeLabel: string, courseLabel: string) => {
    const gradeNumber = extractGradeFromLabel(gradeLabel);
    if (gradeNumber) {
      setSelectedGrade(gradeNumber);
      setIsMobileMenuOpen(false);
      setCurrentView("main");
      setExpandedGrade(null);
      const courseSlug = courseLabel.toLowerCase().replace(/\s+/g, '-');
      router.push(`/grade${gradeNumber}/${courseSlug}`);
    }
  };

  // fetch backend web labels for expanded grade
  useEffect(() => {
    const fetchWebLabels = async () => {
      try {
        if (!expandedGrade) {
          setFetchedCourseLabels(null);
          setIsLoadingCourses(false);
          return;
        }
        const gradeNumber = extractGradeFromLabel(expandedGrade);
        if (!gradeNumber) {
          setFetchedCourseLabels(null);
          setIsLoadingCourses(false);
          return;
        }
        setIsLoadingCourses(true);
        const res = await fetch("/api/grade-web-label", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ grade: gradeNumber }),
        });
        if (res.ok) {
          const data = await res.json();
          const items: CourseLink[] = Array.isArray(data?.courses)
            ? data.courses
            : [];
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
  }, [expandedGrade]);

  const handleResourceSubClick = (resourceLabel: string, subject: string) => {
    setIsMobileMenuOpen(false);
    setCurrentView("main");
    setExpandedResource(null);

    if (resourceLabel === "NCERT Solutions") {
      router.push(`/ncert-solutions/${subject}`);
    } else {
      router.push(
        `/resources/${resourceLabel.toLowerCase().replace(/\s+/g, "-")}/${subject}`
      );
    }
  };

  const handleBackToMain = () => {
    setCurrentView("main");
    setExpandedGrade(null);
    setExpandedItemId(null);
    setExpandedSubItemId(null);
  };

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
    setCurrentView("main");
    setExpandedGrade(null);
    setExpandedItemId(null);
    setExpandedSubItemId(null);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={handleCloseMenu}
      />

      {/* Slide-in Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full bg-white shadow-xl z-50 transform transition-all duration-500 ease-out",
          isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 animate-in slide-in-from-top-4 fade-in duration-300">
            {currentView !== "main" && (
              <button
                onClick={handleBackToMain}
                className="p-2 rounded-md hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-md group"
                aria-label="Back to main menu"
              >
                <svg
                  className="h-5 w-5 text-gray-600 group-hover:text-blue-500 group-hover:-translate-x-1 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            <h2 className="text-lg font-semibold text-gray-900 flex-1 text-center transition-all duration-300">
              <span
                className={cn(
                  "inline-block transition-all duration-300",
                  currentView === "main"
                    ? "animate-in slide-in-from-left-4 fade-in"
                    : "animate-in slide-in-from-right-4 fade-in"
                )}
              >
                {currentView === "main"
                  ? "Menu"
                  : currentView === "courses"
                  ? "Courses"
                  : "Resources"}
              </span>
            </h2>
            <button
              onClick={handleCloseMenu}
              className="p-2 rounded-md hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-md group"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-gray-600 group-hover:text-red-500 group-hover:rotate-90 transition-all duration-300" />
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {/* MAIN VIEW */}
            {currentView === "main" && (
              <div
                className={cn(
                  "space-y-4 transition-all duration-400 ease-out",
                  "animate-in slide-in-from-left-4 fade-in"
                )}
              >
                <button
                  onClick={() => setCurrentView("courses")}
                  className="flex items-center justify-between w-full text-left py-4 text-lg font-medium text-gray-900 hover:text-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-gray-50 rounded-lg px-4 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    Courses
                  </span>
                  <svg
                    className="h-5 w-5 text-gray-500 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => setCurrentView("resources")}
                  className="flex items-center justify-between w-full text-left py-4 text-lg font-medium text-gray-900 hover:text-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-gray-50 rounded-lg px-4 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    Resources
                  </span>
                  <svg
                    className="h-5 w-5 text-gray-500 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <Link
                  href="/scholarship-exam"
                  onClick={handleCloseMenu}
                  className="flex items-center justify-between w-full rounded-2xl bg-[linear-gradient(135deg,#0f172a_0%,#0c5896_52%,#02bdfe_100%)] px-4 py-4 text-left text-lg font-semibold text-white shadow-lg shadow-sky-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    Scholarship
                  </span>
                  <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white/90">
                    30 Min
                  </span>
                </Link>

                <Link
                  href="/about"
                  onClick={handleCloseMenu}
                  className="flex items-center justify-between w-full text-left py-4 text-lg font-medium text-gray-900 hover:text-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-gray-50 rounded-lg px-4 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    About Us
                  </span>
                  <svg
                    className="h-5 w-5 text-gray-500 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                <Link
                  href="/contact"
                  onClick={handleCloseMenu}
                  className="flex items-center justify-between w-full text-left py-4 text-lg font-medium text-gray-900 hover:text-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-gray-50 rounded-lg px-4 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    Contact Us
                  </span>
                  <svg
                    className="h-5 w-5 text-gray-500 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                <Link
                  href="/privacy-policy"
                  onClick={handleCloseMenu}
                  className="flex items-center justify-between w-full text-left py-4 text-lg font-medium text-gray-900 hover:text-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-gray-50 rounded-lg px-4 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    Privacy Policy
                  </span>
                  <svg
                    className="h-5 w-5 text-gray-500 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                <Link
                  href="/terms-and-conditions"
                  onClick={handleCloseMenu}
                  className="flex items-center justify-between w-full text-left py-4 text-lg font-medium text-gray-900 hover:text-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-gray-50 rounded-lg px-4 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    Terms &amp; Conditions
                  </span>
                  <svg
                    className="h-5 w-5 text-gray-500 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                <Link
                  href="/refund-policy"
                  onClick={handleCloseMenu}
                  className="flex items-center justify-between w-full text-left py-4 text-lg font-medium text-gray-900 hover:text-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-gray-50 rounded-lg px-4 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    Refund Policy
                  </span>
                  <svg
                    className="h-5 w-5 text-gray-500 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            )}

            {/* COURSES VIEW */}
            {currentView === "courses" && (
              <div className="space-y-2">
                {gradeLinks.map((link, index) => (
                  <div
                    key={link.href}
                    className="animate-in slide-in-from-right-4 fade-in"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationDuration: "400ms",
                    }}
                  >
                    <button
                      className={cn(
                        "w-full flex items-center justify-between py-3 px-4 text-sm font-semibold rounded-lg border-2 transition-all duration-300",
                        expandedGrade === link.label
                          ? "bg-[#02bdfe] text-white border-[#02bdfe] shadow-lg"
                          : "bg-white text-gray-700 border-gray-300 hover:border-[#02bdfe] hover:text-[#02bdfe] hover:shadow-md"
                      )}
                      onClick={() => handleGradeClick(link.label)}
                    >
                      <span>{link.label}</span>
                      <svg
                        className={cn(
                          "w-4 h-4 transition-transform duration-300",
                          expandedGrade === link.label ? "rotate-180" : ""
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {expandedGrade === link.label && (
                      <div className="mt-2 ml-4 space-y-2">
                        {isLoadingCourses ? (
                          <div className="flex items-center gap-2 text-sm text-gray-500 py-2 px-4">
                            <svg
                              className="h-4 w-4 animate-spin text-gray-400"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                              ></path>
                            </svg>
                            Loading courses...
                          </div>
                        ) : fetchedCourseLabels && fetchedCourseLabels.length > 0 ? (
                          fetchedCourseLabels.map((item, courseIndex) => (
                            <button
                              key={item.label}
                              className="w-full text-left py-2.5 px-4 text-sm font-medium text-gray-600 hover:text-white hover:bg-[#02bdfe] border border-gray-200 rounded-lg transition-all duration-300 hover:scale-[1.02] bg-gray-50 group animate-in slide-in-from-right-4 fade-in"
                              onClick={() =>
                                handleCourseClick(link.label, item.label)
                              }
                              style={{
                                animationDelay: `${courseIndex * 100}ms`,
                                animationDuration: "400ms",
                              }}
                            >
                              <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                                {item.label}
                              </span>
                            </button>
                          ))
                        ) : (
                          <div className="text-sm text-gray-500 py-2 px-4">
                            No courses available
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* RESOURCES VIEW */}
            {currentView === "resources" && (
              <div className="space-y-2">
                {isLoadingResources ? (
                  <div className="flex items-center gap-3 px-4 py-6 text-sm text-gray-500">
                    <svg className="h-5 w-5 animate-spin text-[#02bdfe]" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Loading resources…
                  </div>
                ) : resourceGroup ? (
                  resourceGroup.items
                    .filter((item) => item.isActive)
                    .map((item, index) => (
                      <div
                        key={item.id}
                        className="animate-in slide-in-from-right-4 fade-in"
                        style={{ animationDelay: `${index * 80}ms`, animationDuration: "350ms" }}
                      >
                        {/* Level 1: Category button */}
                        <button
                          className={cn(
                            "w-full flex items-center justify-between py-3 px-4 text-sm font-semibold rounded-lg border-2 transition-all duration-300 uppercase tracking-wider",
                            expandedItemId === item.id
                              ? "bg-[#02bdfe] text-white border-[#02bdfe] shadow-lg"
                              : "bg-white text-gray-700 border-gray-200 hover:border-[#02bdfe] hover:text-[#02bdfe] hover:shadow-md"
                          )}
                          onClick={() => {
                            setExpandedItemId((prev) => (prev === item.id ? null : item.id));
                            setExpandedSubItemId(null);
                          }}
                        >
                          <span>{item.title}</span>
                          <svg
                            className={cn(
                              "w-4 h-4 transition-transform duration-300 flex-shrink-0",
                              expandedItemId === item.id ? "rotate-180" : ""
                            )}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Level 2: SubItems (grades) */}
                        {expandedItemId === item.id && (
                          <div className="mt-2 ml-3 space-y-1.5">
                            {item.subItems
                              .filter((sub) => sub.isActive)
                              .map((sub, subIdx) => (
                                <div key={sub.id}>
                                  <button
                                    className={cn(
                                      "w-full flex items-center justify-between py-2.5 px-4 text-sm rounded-lg border transition-all duration-300",
                                      expandedSubItemId === sub.id
                                        ? "bg-sky-50 text-[#02bdfe] border-[#02bdfe] font-semibold"
                                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-[#02bdfe] hover:text-[#02bdfe]"
                                    )}
                                    style={{ animationDelay: `${subIdx * 60}ms` }}
                                    onClick={() =>
                                      setExpandedSubItemId((prev) =>
                                        prev === sub.id ? null : sub.id
                                      )
                                    }
                                  >
                                    <span>{sub.title}</span>
                                    {sub.links.length > 0 && (
                                      <svg
                                        className={cn(
                                          "w-3.5 h-3.5 flex-shrink-0 transition-transform duration-300",
                                          expandedSubItemId === sub.id ? "rotate-180" : ""
                                        )}
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                      </svg>
                                    )}
                                    {sub.links.length === 0 && (
                                      <span className="text-xs text-gray-300">—</span>
                                    )}
                                  </button>

                                  {/* Level 3: Links */}
                                  {expandedSubItemId === sub.id && sub.links.length > 0 && (
                                    <div className="mt-1.5 ml-3 space-y-1">
                                      {sub.links
                                        .sort((a, b) => a.order - b.order)
                                        .map((lnk, lnkIdx) => (
                                          <a
                                            key={lnk.id}
                                            href={lnk.link}
                                            target={lnk.newTab ? "_blank" : "_self"}
                                            rel={lnk.newTab ? "noopener noreferrer" : undefined}
                                            onClick={handleCloseMenu}
                                            className="flex items-center gap-2 py-2 px-3 text-sm text-gray-600 hover:text-[#02bdfe] hover:bg-blue-50 rounded-lg transition-colors animate-in slide-in-from-right-4 fade-in group"
                                            style={{ animationDelay: `${lnkIdx * 50}ms`, animationDuration: "300ms" }}
                                          >
                                            <svg className="w-3 h-3 text-[#02bdfe] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                                              {lnk.title}
                                            </span>
                                          </a>
                                        ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    ))
                ) : (
                  <div className="text-sm text-gray-400 px-4 py-6">No resources available</div>
                )}
              </div>
            )}
          </div>

          {/* bottom buttons - only on main */}
          {currentView === "main" && (
            <div className="pt-6 space-y-3 px-4 pb-4 animate-in slide-in-from-bottom-4 fade-in delay-300">
              <a
                href="tel:+917330897291"
                className="flex items-center space-x-3 rounded-lg bg-orange-100 px-4 py-3 text-sm font-medium text-orange-600 transition-all duration-300 hover:bg-orange-200 hover:scale-[1.02] hover:shadow-md group"
                onClick={handleCloseMenu}
              >
                <Phone className="h-4 w-4 flex-shrink-0 group-hover:rotate-12 transition-transform duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  Contact Us: +91 7330897291
                </span>
              </a>

              {/* ✅ mobile: platform-aware store opener */}
              <Button
                type="button"
                className="w-full bg-[#02bdfe] hover:bg-[#02bdfe]/90 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                onClick={() => {
                  handleCloseMenu();
                  openStoreForPlatform();
                }}
              >
                Get the app
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// =============================
// Navbar Component
// =============================
const Navbar = () => {
  const {
    isMobileMenuOpen,
    toggleMobileMenu,
    setSelectedGrade,
    setCurrentPage,
  } = useMobileMenu();
  const { user, isLoggedIn, logout } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const isSipPage = pathname?.startsWith("/sip");
  const isScholarshipExamPage = pathname?.startsWith("/scholarship-exam");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const handleLogoClick = () => {
    setSelectedGrade(null);
    setCurrentPage("home");
    router.push(routes.home);
  };

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    if (isUserDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserDropdownOpen]);

  return (
    <ScrollEffect>
      <nav className="relative flex h-16 sm:h-18 items-center px-4 sm:px-6">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button onClick={handleLogoClick} className="cursor-pointer">
              <Image
                src={Logo}
                alt="Logo"
                width={200}
                height={53}
                priority
                fetchPriority="high"
                className="object-cover w-[110px] sm:w-auto h-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/logo.png";
                }}
              />
            </button>
            <div className="hidden lg:block">
              <NavLinks />
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* user dropdown */}
            {isLoggedIn && (
              <div
                ref={userDropdownRef}
                className="flex items-center space-x-2 relative"
              >
                <div
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
                  onClick={() => setIsUserDropdownOpen((p) => !p)}
                >
                  <div className="w-8 h-8 bg-[#02bdfe] rounded-full flex items-center justify-center hover:bg-[#02bdfe]/80 transition-colors">
                    <User className="h-5 w-5 text-white" />
                  </div>
                </div>

                <div
                  className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 z-50 ${
                    isUserDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                >
                  <div className="py-2">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                      <div className="font-medium">{user?.name}</div>
                      <div className="text-xs text-gray-500">{user?.email}</div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => router.push("/sip")}
              className="group relative flex h-[28px] w-[81px] items-center justify-center overflow-hidden rounded-[14px] bg-[#0C5896] text-xs font-semibold uppercase tracking-[0.08em] text-white transition-colors cursor-pointer"
            >
              <span className="relative z-10">SIP</span>
              <span className="pointer-events-none absolute top-0 left-[-80%] h-full w-[70%] -skew-x-12 bg-white/35 opacity-0 transition-all duration-700 ease-out group-hover:left-[130%] group-hover:opacity-100" />
            </button>

            <Link
              href="/scholarship-exam"
              className={cn(
                "hidden lg:inline-flex group relative overflow-hidden items-center justify-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300",
                isScholarshipExamPage
                  ? "border-amber-300 bg-amber-300 text-slate-950 shadow-lg shadow-amber-200"
                  : "border-[#02bdfe] bg-[#02bdfe] text-white hover:-translate-y-0.5 hover:bg-[#02bdfe]/80 hover:shadow-lg hover:shadow-[#02bdfe]/30"
              )}
            >
              <span className="relative z-10">Scholarship</span>
              <div className="absolute top-0 -left-[100%] h-full w-[120%] -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent transition-all duration-700 ease-in-out group-hover:left-[100%]" />
            </Link>

            {/* contact */}
            <a
              href="tel:+917330897291"
              className="hidden lg:flex items-center space-x-2 rounded-full bg-orange-100 px-3 py-2 text-xs font-medium text-orange-500 transition hover:bg-orange-300 hover:text-orange-700 whitespace-nowrap"
            >
              <Phone className="h-4 w-4 flex-shrink-0" />
              <span className="hidden xl:inline">Contact Us : +91 7330897291</span>
              <span className="xl:hidden">Contact</span>
            </a>

            {/* desktop get the app → can also be platform aware */}
            <Button
              type="button"
              className={cn(
                "hidden lg:flex group relative cursor-pointer items-center justify-center overflow-hidden rounded-md border border-white bg-[#02bdfe] px-6 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-[#02bdfe]/80 focus:ring-2 focus:ring-[#02bdfe] focus:ring-offset-2 focus:outline-none active:scale-95"
              )}
              onClick={openStoreForPlatform}
            >
              <span className="relative z-10">Get the App</span>
              <div className="absolute top-0 left-[-75%] h-full w-1/2 -rotate-12 bg-white opacity-20 transition-all duration-500 ease-in-out group-hover:left-[150%]" />
            </Button>

            {/* hamburger */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </ScrollEffect>
  );
};

export default Navbar;
