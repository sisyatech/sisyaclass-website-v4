import React from "react";

const FooterBottom = () => {
  return (
    <div className="py-6 sm:py-6 md:py-8 lg:py-8 px-4 sm:px-6 md:px-8 lg:px-6 mb-10 sm:mb-12 md:mb-14 lg:mb-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-5 lg:gap-0 justify-between">
          {/* Copyright */}
          <div className="text-center lg:text-left w-full lg:w-auto order-1 lg:order-1">
            <p className="font-roboto font-normal text-[13px] sm:text-[13px] md:text-[13px] lg:text-[14px] text-[#1A2439] leading-relaxed">
              Copyright © 2025 SISYA Class. All rights reserved.
            </p>
          </div>

          {/* Policy Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-8 w-full lg:w-auto order-3 lg:order-2">
            <a 
              href="#" 
              className="hover:opacity-70 transition-opacity font-roboto font-normal text-[13px] sm:text-[13px] md:text-[13px] lg:text-[14px] text-[#1A2439] no-underline whitespace-nowrap"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="hover:opacity-70 transition-opacity font-roboto font-normal text-[13px] sm:text-[13px] md:text-[13px] lg:text-[14px] text-[#1A2439] no-underline whitespace-nowrap"
            >
              Terms & Conditions
            </a>
            <a 
              href="#" 
              className="hover:opacity-70 transition-opacity font-roboto font-normal text-[13px] sm:text-[13px] md:text-[13px] lg:text-[14px] text-[#1A2439] no-underline whitespace-nowrap"
            >
              Refund Policy
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-3 sm:gap-3 md:gap-4 lg:gap-4 order-2 lg:order-3">
            {/* Facebook */}
            <a 
              href="https://www.facebook.com/people/SISYA-CLASS/61569281738662/" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-9 sm:h-9 md:w-9 md:h-9 lg:w-8 lg:h-8 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity touch-manipulation"
              style={{
                background: '#1A2439'
              }}
              aria-label="Visit our Facebook page"
            >
              <span 
                className="text-white font-bold"
                style={{
                  fontFamily: 'Arial',
                  fontSize: '13px'
                }}
              >
                f
              </span>
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/sisyaclass/" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-9 sm:h-9 md:w-9 md:h-9 lg:w-8 lg:h-8 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity touch-manipulation"
              style={{
                background: '#1A2439'
              }}
              aria-label="Visit our Instagram page"
            >
              <svg className="w-[14px] h-[14px] sm:w-[14px] sm:h-[14px] md:w-[14px] md:h-[14px] lg:w-[14px] lg:h-[14px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="#FFFFFF"/>
              </svg>
            </a>

            {/* YouTube */}
            <a 
              href="https://www.youtube.com/@SISYACLASS" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-9 sm:h-9 md:w-9 md:h-9 lg:w-8 lg:h-8 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity touch-manipulation"
              style={{
                background: '#1A2439'
              }}
              aria-label="Visit our YouTube channel"
            >
              <svg className="w-[14px] h-[14px] sm:w-[14px] sm:h-[14px] md:w-[14px] md:h-[14px] lg:w-[14px] lg:h-[14px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FFFFFF"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/company/sisyaclass/?viewAsMember=true" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-9 sm:h-9 md:w-9 md:h-9 lg:w-8 lg:h-8 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity touch-manipulation"
              style={{
                background: '#1A2439'
              }}
              aria-label="Visit our LinkedIn page"
            >
              <span 
                className="text-white font-bold"
                style={{
                  fontFamily: 'Arial',
                  fontSize: '11px'
                }}
              >
                in
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
