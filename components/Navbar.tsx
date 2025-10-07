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

// Create context for mobile menu
const MobileMenuContext = createContext<{
  isMobileMenuOpen: boolean;
  expandedSection: string | null;
  toggleMobileMenu: () => void;
  toggleSection: (section: string) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
} | null>(null);

export const MobileMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

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
      toggleMobileMenu,
      toggleSection,
      setIsMobileMenuOpen
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
  const { isMobileMenuOpen, expandedSection, toggleSection, setIsMobileMenuOpen } = useMobileMenu();
  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      
      {/* Slide-in Menu */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-72 max-w-[80vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {/* Navigation Links - Mobile Version */}
            <div className="space-y-3">
              {/* Courses Section */}
              <div className="border-b border-gray-100 pb-3">
                <button
                  onClick={() => toggleSection('courses')}
                  className="flex items-center justify-between w-full text-left py-3 text-base font-medium text-gray-900 hover:text-gray-700 transition-colors"
                >
                  <span>Courses</span>
                  <ChevronDown 
                    className={cn(
                      "h-4 w-4 transition-transform duration-200 text-gray-500",
                      expandedSection === 'courses' ? "rotate-180" : ""
                    )}
                  />
                </button>
                {expandedSection === 'courses' && (
                  <div className="mt-2 pl-0 space-y-1">
                    {gradeLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block py-2 px-4 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Resources Section */}
              <div className="border-b border-gray-100 pb-3">
                <button
                  onClick={() => toggleSection('resources')}
                  className="flex items-center justify-between w-full text-left py-3 text-base font-medium text-gray-900 hover:text-gray-700 transition-colors"
                >
                  <span>Resources</span>
                  <ChevronDown 
                    className={cn(
                      "h-4 w-4 transition-transform duration-200 text-gray-500",
                      expandedSection === 'resources' ? "rotate-180" : ""
                    )}
                  />
                </button>
                {expandedSection === 'resources' && (
                  <div className="mt-2 pl-0 space-y-1">
                    {resourcesLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block py-2 px-4 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Mobile-specific buttons */}
            <div className="pt-6 space-y-3">
              {/* Contact Us Button */}
              <a
                href="tel:+917330897291"
                className="flex items-center space-x-3 rounded-lg bg-orange-100 px-4 py-3 text-sm font-medium text-orange-600 transition hover:bg-orange-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>Contact Us: +91 7330897291</span>
              </a>

              {/* Download App Button */}
              <Button
                type="button"
                className="w-full bg-[#02bdfe] hover:bg-[#02bdfe]/90 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get the App
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Navbar = () => {
  const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu();

  return (
    <ScrollEffect>
      <nav className="relative flex h-16 sm:h-18 items-center px-4 sm:px-6">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <Link href="/">
            <Image src={Logo} alt="Logo" className="object-cover w-[110px] sm:w-auto h-auto" />
          </Link>
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