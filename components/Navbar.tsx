"use client";

import React, { useState, createContext, useContext, useEffect, useRef } from "react";
import Image from "next/image";
import Logo from "@/public/nav/logo.svg";
import ScrollEffect from "@/components/navbar/ScrollEffect";
import NavLinks from "@/components/navbar/NavLinks";
import Link from "next/link";
import { Phone, Menu, X, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { gradeLinks } from "@/lib/gradeLinks";
import { resourcesLinks } from "@/lib/resourcesLinks";
import { useRouter } from "next/navigation";
import { extractGradeFromLabel, getGradeUrl, routes } from "@/lib/navigation";
import { useUser } from "@/components/UserContext";

// Create context for mobile menu, selected grade, and page view
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

export const MobileMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<string>("home");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Reset expanded section when menu closes
    if (isMobileMenuOpen) {
      setExpandedSection(null);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <MobileMenuContext.Provider value={{
      isMobileMenuOpen,
      expandedSection,
      selectedGrade,
      currentPage,
      toggleMobileMenu,
      toggleSection,
      setIsMobileMenuOpen,
      setSelectedGrade,
      setCurrentPage
    }}>
      {children}
    </MobileMenuContext.Provider>
  );
};

export const useMobileMenu = () => {
  const context = useContext(MobileMenuContext);
  if (!context) {
    throw new Error('useMobileMenu must be used within MobileMenuProvider');
  }
  return context;
};

export const MobileMenu = () => {
  const { isMobileMenuOpen, expandedSection, toggleSection, setIsMobileMenuOpen, setSelectedGrade } = useMobileMenu();
  const router = useRouter();
  const [currentView, setCurrentView] = useState<'main' | 'courses' | 'resources'>('main');
  const [expandedGrade, setExpandedGrade] = useState<string | null>(null);
  const [expandedResource, setExpandedResource] = useState<string | null>(null);
  
  const handleGradeClick = (gradeLabel: string) => {
    // Toggle dropdown instead of navigating
    setExpandedGrade(expandedGrade === gradeLabel ? null : gradeLabel);
  };

  const handleResourceClick = (resourceLabel: string) => {
    // Toggle dropdown instead of navigating
    setExpandedResource(expandedResource === resourceLabel ? null : resourceLabel);
  };

  const handleCourseClick = (gradeLabel: string, courseType: string) => {
    const gradeNumber = extractGradeFromLabel(gradeLabel);
    if (gradeNumber) {
      setSelectedGrade(gradeNumber);
      setIsMobileMenuOpen(false);
      setCurrentView('main');
      setExpandedGrade(null);
      
      if (courseType === "booster") {
        router.push(`/grade${gradeNumber}`);
      } else if (courseType === "math-longterm") {
        router.push(`/grade${gradeNumber}/mathematics`);
      } else if (courseType === "master") {
        router.push(`/grade${gradeNumber}`);
      }
    }
  };

  const handleResourceSubClick = (resourceLabel: string, subject: string) => {
    setIsMobileMenuOpen(false);
    setCurrentView('main');
    setExpandedResource(null);
    
    if (resourceLabel === "NCERT Solutions") {
      router.push(`/ncert-solutions/${subject}`);
    } else {
      router.push(`/resources/${resourceLabel.toLowerCase().replace(/\s+/g, '-')}/${subject}`);
    }
  };

  const courses = [
    { label: "Booster Course", type: "booster" },
    { label: "Math Long Term Course", type: "math-longterm" },
    { label: "Long Term Master Course", type: "master" }
  ];

  const resourceSubjects = [
    { label: "Maths", value: "maths" },
    { label: "Physics", value: "physics" },
    { label: "Science", value: "science" },
    { label: "English", value: "english" },
    { label: "Hindi", value: "hindi" }
  ];

  const handleBackToMain = () => {
    setCurrentView('main');
    setExpandedGrade(null);
    setExpandedResource(null);
  };

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
    setCurrentView('main');
    setExpandedGrade(null);
    setExpandedResource(null);
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
      <div className={cn(
        "fixed top-0 right-0 h-full w-full bg-white shadow-xl z-50 transform transition-all duration-500 ease-out",
        isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Header with Back/Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 animate-in slide-in-from-top-4 fade-in duration-300">
            {currentView !== 'main' && (
              <button
                onClick={handleBackToMain}
                className="p-2 rounded-md hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-md group"
                aria-label="Back to main menu"
              >
                <svg className="h-5 w-5 text-gray-600 group-hover:text-blue-500 group-hover:-translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <h2 className="text-lg font-semibold text-gray-900 flex-1 text-center transition-all duration-300">
              <span className={cn(
                "inline-block transition-all duration-300",
                currentView === 'main' ? "animate-in slide-in-from-left-4 fade-in" : 
                currentView === 'courses' ? "animate-in slide-in-from-right-4 fade-in" : 
                "animate-in slide-in-from-right-4 fade-in"
              )}>
                {currentView === 'main' ? 'Menu' : currentView === 'courses' ? 'Courses' : 'Resources'}
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
            {/* Main Menu View */}
            {currentView === 'main' && (
              <div className={cn(
                "space-y-4 transition-all duration-400 ease-out",
                currentView === 'main' ? "animate-in slide-in-from-left-4 fade-in" : "animate-out slide-out-to-left-4 fade-out"
              )}>
                {/* Courses Button */}
                <button
                  onClick={() => setCurrentView('courses')}
                  className="flex items-center justify-between w-full text-left py-4 text-lg font-medium text-gray-900 hover:text-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-gray-50 rounded-lg px-4 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Courses</span>
                  <svg className="h-5 w-5 text-gray-500 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Resources Button */}
                <button
                  onClick={() => setCurrentView('resources')}
                  className="flex items-center justify-between w-full text-left py-4 text-lg font-medium text-gray-900 hover:text-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-gray-50 rounded-lg px-4 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Resources</span>
                  <svg className="h-5 w-5 text-gray-500 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* About Us Button */}
                <Link
                  href="/about"
                  onClick={handleCloseMenu}
                  className="flex items-center justify-between w-full text-left py-4 text-lg font-medium text-gray-900 hover:text-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-gray-50 rounded-lg px-4 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">About Us</span>
                  <svg className="h-5 w-5 text-gray-500 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                {/* Contact Us Button */}
                <Link
                  href="/contact"
                  onClick={handleCloseMenu}
                  className="flex items-center justify-between w-full text-left py-4 text-lg font-medium text-gray-900 hover:text-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-gray-50 rounded-lg px-4 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Contact Us</span>
                  <svg className="h-5 w-5 text-gray-500 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                {/* Privacy Policy Button */}
                <Link
                  href="/privacy-policy"
                  onClick={handleCloseMenu}
                  className="flex items-center justify-between w-full text-left py-4 text-lg font-medium text-gray-900 hover:text-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-gray-50 rounded-lg px-4 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Privacy Policy</span>
                  <svg className="h-5 w-5 text-gray-500 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                {/* Terms & Conditions Button */}
                <Link
                  href="/terms-and-conditions"
                  onClick={handleCloseMenu}
                  className="flex items-center justify-between w-full text-left py-4 text-lg font-medium text-gray-900 hover:text-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-gray-50 rounded-lg px-4 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Terms & Conditions</span>
                  <svg className="h-5 w-5 text-gray-500 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                {/* Refund Policy Button */}
                <Link
                  href="/refund-policy"
                  onClick={handleCloseMenu}
                  className="flex items-center justify-between w-full text-left py-4 text-lg font-medium text-gray-900 hover:text-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-gray-50 rounded-lg px-4 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Refund Policy</span>
                  <svg className="h-5 w-5 text-gray-500 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}

            {/* Courses View */}
            {currentView === 'courses' && (
              <div className="space-y-2">
                {/* Vertical grades list */}
                {gradeLinks.map((link, index) => (
                  <div 
                    key={link.href}
                    className="animate-in slide-in-from-right-4 fade-in"
                    style={{ animationDelay: `${index * 100}ms`, animationDuration: '400ms' }}
                  >
                    {/* Grade Button */}
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown course options */}
                    {expandedGrade === link.label && (
                      <div className="mt-2 ml-4 space-y-2">
                        {courses.map((course, courseIndex) => (
                          <button
                            key={course.type}
                            className="w-full text-left py-2.5 px-4 text-sm font-medium text-gray-600 hover:text-white hover:bg-[#02bdfe] border border-gray-200 rounded-lg transition-all duration-300 hover:scale-[1.02] bg-gray-50 group animate-in slide-in-from-right-4 fade-in"
                            onClick={() => handleCourseClick(link.label, course.type)}
                            style={{ animationDelay: `${courseIndex * 100}ms`, animationDuration: '400ms' }}
                          >
                            <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                              {course.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Resources View */}
            {currentView === 'resources' && (
              <div className="space-y-2">
                {/* Vertical resources list */}
                {resourcesLinks.map((link, index) => (
                  <div 
                    key={link.href}
                    className="animate-in slide-in-from-right-4 fade-in"
                    style={{ animationDelay: `${index * 100}ms`, animationDuration: '400ms' }}
                  >
                    {/* Resource Button */}
                    <button
                      className={cn(
                        "w-full flex items-center justify-between py-3 px-4 text-sm font-semibold rounded-lg border-2 transition-all duration-300",
                        expandedResource === link.label
                          ? "bg-[#02bdfe] text-white border-[#02bdfe] shadow-lg"
                          : "bg-white text-gray-700 border-gray-300 hover:border-[#02bdfe] hover:text-[#02bdfe] hover:shadow-md"
                      )}
                      onClick={() => handleResourceClick(link.label)}
                    >
                      <span>{link.label}</span>
                      <svg 
                        className={cn(
                          "w-4 h-4 transition-transform duration-300",
                          expandedResource === link.label ? "rotate-180" : ""
                        )}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown subjects */}
                    {expandedResource === link.label && (
                      <div className="mt-2 ml-4 space-y-2">
                        {resourceSubjects.map((subject, subIndex) => (
                          <button
                            key={subject.value}
                            className="w-full text-left py-2.5 px-4 text-sm font-medium text-gray-600 hover:text-white hover:bg-[#02bdfe] border border-gray-200 rounded-lg transition-all duration-300 hover:scale-[1.02] bg-gray-50 group animate-in slide-in-from-right-4 fade-in"
                            onClick={() => handleResourceSubClick(link.label, subject.value)}
                            style={{ animationDelay: `${subIndex * 100}ms`, animationDuration: '400ms' }}
                          >
                            <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">
                              {subject.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
            
          {/* Mobile-specific buttons - Only show on main view */}
          {currentView === 'main' && (
            <div className="pt-6 space-y-3 px-4 pb-4 animate-in slide-in-from-bottom-4 fade-in delay-300">
              {/* Contact Us Button */}
              <a
                href="tel:+917330897291"
                className="flex items-center space-x-3 rounded-lg bg-orange-100 px-4 py-3 text-sm font-medium text-orange-600 transition-all duration-300 hover:bg-orange-200 hover:scale-[1.02] hover:shadow-md group"
                onClick={handleCloseMenu}
              >
                <Phone className="h-4 w-4 flex-shrink-0 group-hover:rotate-12 transition-transform duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">Contact Us: +91 7330897291</span>
              </a>

              {/* Download App Button */}
              <Button
                type="button"
                className="w-full bg-[#02bdfe] hover:bg-[#02bdfe]/90 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                onClick={handleCloseMenu}
              >
                Get the App
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const Navbar = () => {
  const { isMobileMenuOpen, toggleMobileMenu, setSelectedGrade, setCurrentPage } = useMobileMenu();
  const { user, isLoggedIn, logout } = useUser();
  const router = useRouter();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const handleLogoClick = () => {
    setSelectedGrade(null); // Reset to home page
    setCurrentPage("home"); // Reset to home page
    router.push(routes.home);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    if (isUserDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
                target.src = '/logo.png';
              }}
            />
          </button>
          <div className="hidden lg:block">
            <NavLinks />
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* User Icon - Show when logged in */}
          {isLoggedIn && (
            <div ref={userDropdownRef} className="flex items-center space-x-2 relative">
              <div 
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                <div className="w-8 h-8 bg-[#02bdfe] rounded-full flex items-center justify-center hover:bg-[#02bdfe]/80 transition-colors">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="hidden lg:block text-sm font-medium text-gray-700 whitespace-nowrap">
                  {user?.name || 'User'}
                </span>
              </div>
              
              {/* Dropdown menu */}
              <div className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 z-50 ${
                isUserDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}>
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

          {/* Contact Us Button - Hidden on mobile and tablet */}
          <a
            href="tel:+917330897291"
            className="hidden lg:flex items-center space-x-2 rounded-full bg-orange-100 px-3 py-2 text-xs font-medium text-orange-500 transition hover:bg-orange-300 hover:text-orange-700 whitespace-nowrap"
          >
            <Phone className="h-4 w-4 flex-shrink-0" />
            <span className="hidden xl:inline">Contact Us : +91 7330897291</span>
            <span className="xl:hidden">Contact</span>
          </a>

          {/* Download App Button - Hidden on mobile and tablet */}
          <Button
            type="button"
            className={cn(
              "hidden lg:flex group relative cursor-pointer items-center justify-center overflow-hidden rounded-md border border-white bg-[#02bdfe] px-6 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-[#02bdfe]/80 focus:ring-2 focus:ring-[#02bdfe] focus:ring-offset-2 focus:outline-none active:scale-95"
            )}
          >
            <span className="relative z-10">Get the App</span>
            {/* Animated diagonal overlay */}
            <div className="absolute top-0 left-[-75%] h-full w-1/2 -rotate-12 bg-white opacity-20 transition-all duration-500 ease-in-out group-hover:left-[150%]" />
          </Button>

          {/* Hamburger Menu Button - Visible on mobile and tablet */}
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