"use client";

import React, { useState, createContext, useContext } from "react";
import Image from "next/image";
import Logo from "@/public/nav/logo.svg";
import ScrollEffect from "@/components/navbar/ScrollEffect";
import NavLinks from "@/components/navbar/NavLinks";
import Link from "next/link";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { gradeLinks } from "@/lib/gradeLinks";
import { resourcesLinks } from "@/lib/resourcesLinks";
import { useRouter } from "next/navigation";
import { extractGradeFromLabel, getGradeUrl, routes } from "@/lib/navigation";

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
  
  const handleGradeClick = (gradeLabel: string) => {
    const gradeNumber = extractGradeFromLabel(gradeLabel);
    if (gradeNumber) {
      setSelectedGrade(gradeNumber);
      setIsMobileMenuOpen(false);
      setCurrentView('main'); // Reset to main view
      router.push(getGradeUrl(gradeNumber));
    }
  };

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
    setCurrentView('main'); // Reset to main view
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

                {/* Terms Button */}
                <Link
                  href="/terms"
                  onClick={handleCloseMenu}
                  className="flex items-center justify-between w-full text-left py-4 text-lg font-medium text-gray-900 hover:text-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-gray-50 rounded-lg px-4 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Terms</span>
                  <svg className="h-5 w-5 text-gray-500 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                {/* Policy Button */}
                <Link
                  href="/policy"
                  onClick={handleCloseMenu}
                  className="flex items-center justify-between w-full text-left py-4 text-lg font-medium text-gray-900 hover:text-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-gray-50 rounded-lg px-4 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Policy</span>
                  <svg className="h-5 w-5 text-gray-500 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}

            {/* Courses View */}
            {currentView === 'courses' && (
              <div className={cn(
                "space-y-3 transition-all duration-400 ease-out",
                currentView === 'courses' ? "animate-in slide-in-from-right-4 fade-in" : "animate-out slide-out-to-right-4 fade-out"
              )}>
                <div className="grid grid-cols-2 gap-3">
                  {gradeLinks.map((link, index) => (
                    <button
                      key={link.href}
                      className={cn(
                        "block w-full text-left py-4 px-4 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-blue-50 hover:border-blue-200 border border-gray-200 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-white group",
                        `animate-in slide-in-from-bottom-2 fade-in delay-${index * 50}`
                      )}
                      onClick={() => handleGradeClick(link.label)}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Resources View */}
            {currentView === 'resources' && (
              <div className={cn(
                "space-y-3 transition-all duration-400 ease-out",
                currentView === 'resources' ? "animate-in slide-in-from-right-4 fade-in" : "animate-out slide-out-to-right-4 fade-out"
              )}>
                {resourcesLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block py-4 px-4 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-blue-50 hover:border-blue-200 border border-gray-200 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-white group",
                      `animate-in slide-in-from-bottom-2 fade-in delay-${index * 100}`
                    )}
                    onClick={handleCloseMenu}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
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
  const router = useRouter();

  const handleLogoClick = () => {
    setSelectedGrade(null); // Reset to home page
    setCurrentPage("home"); // Reset to home page
    router.push(routes.home);
  };

  return (
    <ScrollEffect>
      <nav className="relative flex h-16 sm:h-18 items-center px-4 sm:px-6">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button onClick={handleLogoClick} className="cursor-pointer">
            <Image src={Logo} alt="Logo" className="object-cover w-[110px] sm:w-auto h-auto" />
          </button>
          <div className="hidden lg:block">
            <NavLinks />
          </div>
        </div>

        <div className="flex-grow" />

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Contact Us Button - Hidden on mobile and tablet */}
          <a
            href="tel:+917330897291"
            className="hidden lg:flex items-center space-x-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-500 transition hover:bg-orange-300 hover:text-orange-700"
          >
            <Phone className="h-4 w-4" />
            <span>Contact Us : +91 7330897291</span>
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

      </nav>
    </ScrollEffect>
  );
};

export default Navbar;