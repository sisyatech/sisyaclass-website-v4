"use client";

import React from "react";
import Image from "next/image";

type HeroSectionProps = {
  onRegister?: () => void;
  onGetCallback?: () => void;
};

export default function HeroSection({ onRegister, onGetCallback }: HeroSectionProps) {
  const handleAskQuestion = () => {
    if (onRegister) {
      onRegister();
    } else {
      // Default action - could scroll to a form or open a modal
      console.log('Ask question clicked');
    }
  };

  const handleBrowsePlans = () => {
    if (onGetCallback) {
      onGetCallback();
    } else {
      // Default action - could scroll to plans section
      console.log('Browse plans clicked');
    }
  };

  return (
    <section className="relative overflow-hidden py-8 md:py-10 min-h-[450px] md:min-h-[500px]" style={{ background: 'linear-gradient(180deg, #EFEFFB 0%, #F9F9F9 48.56%, #F2F9F6 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          {/* Left Side - Content */}
          <div className="flex-1 w-full lg:w-auto flex flex-col justify-center text-center lg:text-left">
            {/* Top Badge */}
            <div
              className="inline-flex items-center justify-center gap-2 bg-white mb-4 mx-auto lg:mx-0 border w-full max-w-[312px]"
              style={{
                minHeight: '40px',
                borderRadius: '25.5px',
                borderWidth: '1px',
                borderColor: 'rgba(0, 0, 0, 0.1)',
                padding: '8px 16px',
                fontFamily: 'Roboto, sans-serif',
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
              }}
            >
              <div
                className="relative flex items-center justify-center"
                style={{
                  width: '8px',
                  height: '8px',
                  flexShrink: 0
                }}
              >
                <div
                  className="absolute rounded-full"
                  style={{
                    width: '8px',
                    height: '8px',
                    background: 'rgba(0, 124, 173, 1)',
                    animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
                  }}
                ></div>
                <div
                  className="absolute rounded-full"
                  style={{
                    width: '8px',
                    height: '8px',
                    background: 'rgba(0, 124, 173, 1)'
                  }}
                ></div>
              </div>
              <span
                className="text-xs sm:text-sm whitespace-nowrap"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  lineHeight: '24px',
                  letterSpacing: '0px',
                  verticalAlign: 'middle',
                  color: 'rgba(0, 124, 173, 1)'
                }}
              >
                EMPOWERING 3,000+ STUDENTS DAILY
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mb-4" style={{ lineHeight: '1.1' }}>
              <span
                className="block sm:inline-block w-full sm:w-auto"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(32px, 8vw, 76.52px)',
                  lineHeight: '1.2',
                  letterSpacing: '0px',
                  verticalAlign: 'top',
                  color: 'rgba(0, 0, 0, 1)'
                }}
              >
                Stop Stressing.{" "}
              </span>
              <span
                className="inline-block w-full sm:w-auto mobile-headline-spacing"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(32px, 8vw, 76.52px)',
                  lineHeight: '1.2',
                  letterSpacing: '0px',
                  verticalAlign: 'top',
                  background: 'linear-gradient(90deg, #0097D3 0%, #6F79D7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  overflow: 'visible',
                  marginTop: 'clamp(-20px, -3vw, -50px)'
                }}
              >
                Start Winning.
              </span>
            </h1>

            {/* Description */}
            <p
              className="w-full max-w-[506px]"
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(14px, 2vw, 17px)',
                lineHeight: '1.5',
                letterSpacing: '0px',
                verticalAlign: 'middle',
                color: 'rgba(67, 86, 107, 1)',
                marginTop: 'clamp(8px, 1.5vw, 16px)',
                marginBottom: '24px'
              }}
            >
              Stick on a tricky math problem or confused by science? Get instant, clear, and human-led explanations for any academic doubt 24x7.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-row gap-2 sm:gap-4 justify-center lg:justify-start w-full sm:w-auto">
              <button
                onClick={handleAskQuestion}
                className="inline-flex items-center justify-center font-semibold text-white transition-colors arrow-hover-button flex-1 sm:flex-none sm:w-[333px] mobile-button"
                style={{
                  minHeight: '61px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 104, 0, 1)',
                  background: 'rgba(255, 104, 0, 1)',
                  boxShadow: '0px 4px 4px 0px rgba(255, 104, 0, 0.3)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 94, 0, 1)';
                  e.currentTarget.style.boxShadow = '0px 4px 4px 0px rgba(255, 104, 0, 0.4), 0 0 20px rgba(255, 104, 0, 0.6), 0 0 40px rgba(255, 104, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 104, 0, 1)';
                  e.currentTarget.style.boxShadow = '0px 4px 4px 0px rgba(255, 104, 0, 0.3)';
                }}
              >
                <span className="mobile-button-text">Ask Your First Question Now</span> <span className="arrow-icon" style={{ marginLeft: '4px' }}>→</span>
              </button>
              <button
                onClick={handleBrowsePlans}
                className="inline-flex items-center justify-center font-semibold text-gray-700 transition-colors flex-1 sm:flex-none sm:w-[169px] mobile-button"
                style={{
                  minHeight: '61px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 1)',
                  background: 'rgba(255, 255, 255, 1)',
                  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.3)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0px 4px 4px 0px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0px 4px 4px 0px rgba(0, 0, 0, 0.3)';
                }}
              >
                <span className="mobile-button-text">Browse Plans</span>
              </button>
            </div>
          </div>

          {/* Right Side - Image Card with Overlays */}
          <div className="flex-1 w-full lg:w-auto relative flex justify-center items-center mt-8 lg:mt-0">
            {/* Main White Card Container */}
            <div
              className="relative bg-white overflow-visible w-full max-w-[417px] aspect-[417/455] mobile-hero-image"
              style={{
                borderRadius: '18px',
                border: 'clamp(8px, 2vw, 13px) solid rgba(255, 255, 255, 1)',
                boxShadow: '10px 10px 20px 0px rgba(0, 140, 214, 0.25)'
              }}
            >
              {/* Main Image - Teacher working */}
              <div className="relative w-full h-full overflow-hidden bg-gray-100" style={{ borderRadius: '5px' }}>
                <Image
                  src="/askme/snehal.png"
                  alt="Teacher working on laptop"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* "Snehal Sir" Status Bubble - Left Side */}
              <div
                className="absolute flex items-center gap-2 sm:gap-3 z-10 animate-fade-in animate-float mobile-badge-snehal"
                style={{
                  top: '15%',
                  left: 0,
                  transform: 'translateX(-40%)',
                  borderRadius: '21px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                  padding: '8px 12px'
                }}
              >
                <div
                  className="relative flex-shrink-0"
                  style={{
                    width: 'clamp(32px, 4vw, 40px)',
                    height: 'clamp(32px, 4vw, 40px)'
                  }}
                >
                  <div
                    className="rounded-full overflow-hidden"
                    style={{
                      width: '100%',
                      height: '100%',
                      border: '2px solid rgba(5, 149, 206, 1)'
                    }}
                  >
                    <Image
                      src="/askme/snehal2.png"
                      alt="Snehal Sir"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Green online indicator with ping animation */}
                  <div
                    className="absolute"
                    style={{
                      bottom: '0px',
                      right: '0px'
                    }}
                  >
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: '12px',
                        height: '12px',
                        background: 'rgba(34, 197, 94, 1)',
                        border: '2px solid white',
                        animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                        bottom: '0px',
                        right: '0px'
                      }}
                    ></div>
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: '12px',
                        height: '12px',
                        background: 'rgba(34, 197, 94, 1)',
                        border: '2px solid white',
                        bottom: '0px',
                        right: '0px'
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-xs sm:text-sm"
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 600,
                      lineHeight: '22px',
                      letterSpacing: '0px',
                      verticalAlign: 'middle',
                      color: 'rgba(11, 23, 43, 1)'
                    }}
                  >
                    Snehal Sir
                  </span>
                  <span
                    className="text-xs sm:text-sm"
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 600,
                      lineHeight: '22px',
                      letterSpacing: '0px',
                      verticalAlign: 'middle',
                      color: 'rgba(5, 149, 206, 1)'
                    }}
                  >
                    ONLINE NOW
                  </span>
                </div>
              </div>

              {/* "Doubt Resolved!" Notification - Bottom Right */}
              <div
                className="absolute bottom-2 sm:bottom-4 z-10 animate-float-badge w-[calc(100%-16px)] sm:w-[230px] max-w-[230px] mobile-badge-doubt"
                style={{
                  right: 0,
                  transform: 'translateX(50%)',
                  borderRadius: '21px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                  padding: '12px 16px'
                }}
              >
                <div className="flex flex-col">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600 animate-tick-draw" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ strokeDasharray: '20', strokeDashoffset: '20' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div
                        className="text-xs sm:text-sm"
                        style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontWeight: 600,
                          letterSpacing: '0px',
                          verticalAlign: 'middle',
                          color: 'rgba(144, 165, 186, 1)',
                        }}
                      >
                        STATUS
                      </div>
                      <div
                        className="text-xs sm:text-sm"
                        style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontWeight: 600,
                          lineHeight: '22px',
                          letterSpacing: '0px',
                          verticalAlign: 'middle',
                          color: 'rgba(11, 23, 43, 1)',
                        }}
                      >
                        Doubt Resolved!
                      </div>
                    </div>
                  </div>
                  <div
                    className="italic text-[10px] sm:text-xs"
                    style={{
                      color: 'rgba(67, 86, 107, 1)'
                    }}
                  >
                    &quot;Quadratic equations are finally easy to understand now!&quot;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateX(50%) translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateX(50%) translateY(0);
          }
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateX(-40%) translateY(0);
          }
          50% {
            transform: translateX(-40%) translateY(-10px);
          }
        }
        @keyframes float-badge {
          0%, 100% {
            transform: translateX(50%) translateY(0);
          }
          50% {
            transform: translateX(50%) translateY(-10px);
          }
        }
        @keyframes float-badge-mobile {
          0%, 100% {
            transform: translateX(20%) translateY(0);
          }
          50% {
            transform: translateX(20%) translateY(-10px);
          }
        }
        @keyframes tick-draw {
          0% {
            stroke-dashoffset: 20;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out 0.3s both;
        }
        .animate-ping-circle {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-badge {
          animation: float-badge 3s ease-in-out infinite;
        }
        .animate-tick-draw {
          animation: tick-draw 2s ease-out infinite;
        }
        .arrow-hover-button .arrow-icon {
          display: inline-block;
          transition: transform 0.3s ease;
          transform: translateX(0px) scale(1.2);
        }
        .arrow-hover-button:hover .arrow-icon {
          transform: translateX(5px) scale(1.2);
        }
        @media (max-width: 640px) {
          .mobile-headline-spacing {
            margin-top: 6px !important;
          }
          .mobile-button {
            min-height: 44px !important;
            padding: 6px 10px !important;
            font-size: 12px !important;
          }
          .mobile-button-text {
            font-size: 12px !important;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
          }
          .mobile-hero-image {
            max-width: 280px !important;
          }
          .mobile-badge-snehal {
            padding: 6px 8px !important;
            gap: 6px !important;
            border-radius: 16px !important;
          }
          .mobile-badge-snehal .relative {
            width: 28px !important;
            height: 28px !important;
          }
          .mobile-badge-snehal .relative > div:first-child {
            border-width: 1.5px !important;
          }
          .mobile-badge-snehal .relative > div:last-child > div {
            width: 8px !important;
            height: 8px !important;
            border-width: 1.5px !important;
          }
          .mobile-badge-snehal span {
            font-size: 10px !important;
            line-height: 14px !important;
          }
          .mobile-badge-doubt {
            width: calc(100% - 16px) !important;
            max-width: 180px !important;
            padding: 8px 10px !important;
            border-radius: 16px !important;
          }
          .mobile-badge-doubt.animate-float-badge {
            animation: float-badge-mobile 3s ease-in-out infinite !important;
          }
          .mobile-badge-doubt .w-10 {
            width: 28px !important;
            height: 28px !important;
          }
          .mobile-badge-doubt .w-6 {
            width: 14px !important;
            height: 14px !important;
          }
          .mobile-badge-doubt .gap-3 {
            gap: 8px !important;
          }
          .mobile-badge-doubt .mb-2 {
            margin-bottom: 6px !important;
          }
          .mobile-badge-doubt .text-xs {
            font-size: 9px !important;
            line-height: 14px !important;
          }
          .mobile-badge-doubt .italic {
            font-size: 8px !important;
          }
        }
      `}</style>
    </section>
  );
}


