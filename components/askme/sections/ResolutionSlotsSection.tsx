"use client";

import React from "react";
import Image from "next/image";

export default function ResolutionSlotsSection() {
    return (
        <>
            <section id="solutions" className="py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                        {/* Left Side - Mobile App Image */}
                        <div className="flex-1 w-full lg:w-auto relative flex justify-center items-center">
                            <div className="relative w-full max-w-sm mobile-resolution-image" style={{ overflow: 'visible' }}>
                                <Image
                                    src="/askme/mobile_mockup.svg"
                                    alt="Resolution Slots Mobile App Interface"
                                    width={400}
                                    height={600}
                                    className="w-full h-auto"
                                    priority
                                />
                                {/* "New Feature" Badge - Bottom Right */}
                                <div
                                    className="absolute z-10 animate-float-badge mobile-feature-badge"
                                    style={{
                                        top: '50%',
                                        right: 0,
                                        transform: 'translateX(50%) translateY(-50%)',
                                        borderRadius: '21px',
                                        background: 'rgba(255, 255, 255, 0.9)',
                                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                                        padding: '16px'
                                    }}
                                >
                                    <div className="flex flex-col">
                                        <div
                                            style={{
                                                fontFamily: 'Roboto, sans-serif',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                letterSpacing: '0px',
                                                color: 'rgba(0, 0, 0, 1)',
                                                marginBottom: '8px'
                                            }}
                                        >
                                            New Feature
                                        </div>
                                        <div
                                            style={{
                                                fontFamily: 'Roboto, sans-serif',
                                                fontWeight: 700,
                                                fontSize: '18px',
                                                lineHeight: '24px',
                                                letterSpacing: '0px',
                                                color: '#0097D3'
                                            }}
                                        >
                                            Mentor
                                        </div>
                                        <div
                                            style={{
                                                fontFamily: 'Roboto, sans-serif',
                                                fontWeight: 700,
                                                fontSize: '18px',
                                                lineHeight: '24px',
                                                letterSpacing: '0px',
                                                color: '#0097D3'
                                            }}
                                        >
                                            presence
                                        </div>
                                        <div
                                            style={{
                                                fontFamily: 'Roboto, sans-serif',
                                                fontWeight: 700,
                                                fontSize: '18px',
                                                lineHeight: '24px',
                                                letterSpacing: '0px',
                                                color: '#0097D3'
                                            }}
                                        >
                                            guaranteed.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Content */}
                        <div className="flex-1 w-full lg:w-auto flex flex-col justify-center">
                            {/* Badge - "EXCLUSIVELY IN THE APP" */}
                            <div className="mb-6">
                                <div
                                    className="inline-flex items-center justify-center w-full max-w-[200px]"
                                    style={{
                                        minHeight: '36px',
                                        borderRadius: '25.5px',
                                        background: 'rgba(0, 0, 0, 1)',
                                        padding: '6px 14px'
                                    }}
                                >
                                    <span className="text-white text-[10px] font-bold uppercase tracking-wide">
                                        EXCLUSIVELY IN THE APP
                                    </span>
                                </div>
                            </div>

                            {/* Headline */}
                            <h2 className="mb-4">
                                <span
                                    className="block w-full"
                                    style={{
                                        fontFamily: 'Roboto, sans-serif',
                                        fontWeight: 700,
                                        fontSize: 'clamp(28px, 6vw, 49.52px)',
                                        lineHeight: '1.2',
                                        letterSpacing: '0px',
                                        verticalAlign: 'middle',
                                        color: 'rgba(0, 0, 0, 1)'
                                    }}
                                >
                                    Resolution Slots
                                </span>
                                <span
                                    className="block w-full mobile-headline-spacing"
                                    style={{
                                        fontFamily: 'Roboto, sans-serif',
                                        fontWeight: 700,
                                        fontSize: 'clamp(28px, 6vw, 49.52px)',
                                        lineHeight: '1.2',
                                        letterSpacing: '0px',
                                        verticalAlign: 'middle',
                                        background: 'linear-gradient(90deg, #0097D3 0%, #6F79D7 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        marginTop: 'clamp(-10px, -2vw, -20px)'
                                    }}
                                >
                                    For Busy Students.
                                </span>
                            </h2>

                            {/* Description */}
                            <p
                                className="w-full max-w-[506px]"
                                style={{
                                    fontFamily: 'Roboto, sans-serif',
                                    fontWeight: 500,
                                    fontSize: 'clamp(16px, 2.5vw, 19px)',
                                    lineHeight: '1.5',
                                    letterSpacing: '0px',
                                    verticalAlign: 'middle',
                                    color: 'rgba(67, 86, 107, 1)',
                                    marginTop: '-10px',
                                    marginBottom: '32px'
                                }}
                            >
                                We know your time is precious. Our new <strong>Slot Booking System</strong> ensures that when you're ready to study, a master mentor is ready for you. Simply reserve a window in the SISYA App and skip the queue entirely.
                            </p>

                            {/* Benefits List */}
                            <div className="flex flex-col gap-y-6 mb-10">
                                <div className="flex items-start gap-0">
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="flex-shrink-0 rounded-full flex items-center justify-center mt-1"
                                            style={{
                                                width: '17px',
                                                height: '17px',
                                                background: 'rgba(232, 244, 252, 1)'
                                            }}
                                        >
                                            <svg
                                                className="animate-tick-draw"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                style={{
                                                    width: '14px',
                                                    height: '10px',
                                                    strokeDasharray: '20',
                                                    strokeDashoffset: '20',
                                                    color: 'rgba(0, 152, 211, 1)'
                                                }}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3
                                                className="w-full"
                                                style={{
                                                    fontFamily: 'Roboto, sans-serif',
                                                    fontWeight: 600,
                                                    fontSize: 'clamp(13px, 2vw, 14px)',
                                                    lineHeight: '1.5',
                                                    letterSpacing: '0px',
                                                    verticalAlign: 'middle',
                                                    color: 'rgba(0, 0, 0, 1)',
                                                    marginBottom: '4px'
                                                }}
                                            >
                                                Zero Waiting
                                            </h3>
                                            <p
                                                className="w-full"
                                                style={{
                                                    fontFamily: 'Roboto, sans-serif',
                                                    fontWeight: 400,
                                                    fontSize: 'clamp(13px, 2vw, 14px)',
                                                    lineHeight: '1.5',
                                                    letterSpacing: '0px',
                                                    verticalAlign: 'middle',
                                                    color: 'rgba(67, 86, 107, 1)'
                                                }}
                                            >
                                                Pre-book time to get instant attention.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div
                                            className="flex-shrink-0 rounded-full flex items-center justify-center mt-1"
                                            style={{
                                                width: '17px',
                                                height: '17px',
                                                background: 'rgba(232, 244, 252, 1)'
                                            }}
                                        >
                                            <svg
                                                className="animate-tick-draw"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                style={{
                                                    width: '14px',
                                                    height: '10px',
                                                    strokeDasharray: '20',
                                                    strokeDashoffset: '20',
                                                    color: 'rgba(0, 152, 211, 1)'
                                                }}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3
                                                className="w-full"
                                                style={{
                                                    fontFamily: 'Roboto, sans-serif',
                                                    fontWeight: 600,
                                                    fontSize: 'clamp(13px, 2vw, 14px)',
                                                    lineHeight: '1.5',
                                                    letterSpacing: '0px',
                                                    verticalAlign: 'middle',
                                                    color: 'rgba(0, 0, 0, 1)',
                                                    marginBottom: '4px'
                                                }}
                                            >
                                                Study Routine
                                            </h3>
                                            <p
                                                className="w-full"
                                                style={{
                                                    fontFamily: 'Roboto, sans-serif',
                                                    fontWeight: 400,
                                                    fontSize: 'clamp(13px, 2vw, 14px)',
                                                    lineHeight: '1.5',
                                                    letterSpacing: '0px',
                                                    verticalAlign: 'middle',
                                                    color: 'rgba(67, 86, 107, 1)'
                                                }}
                                            >
                                                Sync your doubts with your homework time.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-0">
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="flex-shrink-0 rounded-full flex items-center justify-center mt-1"
                                            style={{
                                                width: '17px',
                                                height: '17px',
                                                background: 'rgba(232, 244, 252, 1)'
                                            }}
                                        >
                                            <svg
                                                className="animate-tick-draw"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                style={{
                                                    width: '14px',
                                                    height: '10px',
                                                    strokeDasharray: '20',
                                                    strokeDashoffset: '20',
                                                    color: 'rgba(0, 152, 211, 1)'
                                                }}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3
                                                className="w-full"
                                                style={{
                                                    fontFamily: 'Roboto, sans-serif',
                                                    fontWeight: 600,
                                                    fontSize: 'clamp(13px, 2vw, 14px)',
                                                    lineHeight: '1.5',
                                                    letterSpacing: '0px',
                                                    verticalAlign: 'middle',
                                                    color: 'rgba(0, 0, 0, 1)',
                                                    marginBottom: '4px'
                                                }}
                                            >
                                                Priority Access
                                            </h3>
                                            <p
                                                className="w-full"
                                                style={{
                                                    fontFamily: 'Roboto, sans-serif',
                                                    fontWeight: 400,
                                                    fontSize: 'clamp(13px, 2vw, 14px)',
                                                    lineHeight: '1.5',
                                                    letterSpacing: '0px',
                                                    verticalAlign: 'middle',
                                                    color: 'rgba(67, 86, 107, 1)'
                                                }}
                                            >
                                                Slot users always get the fastest response.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="flex-shrink-0 rounded-full flex items-center justify-center mt-1"
                                            style={{
                                                width: '17px',
                                                height: '17px',
                                                background: 'rgba(232, 244, 252, 1)'
                                            }}
                                        >
                                            <svg
                                                className="animate-tick-draw"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                style={{
                                                    width: '14px',
                                                    height: '10px',
                                                    strokeDasharray: '20',
                                                    strokeDashoffset: '20',
                                                    color: 'rgba(0, 152, 211, 1)'
                                                }}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3
                                                className="w-full"
                                                style={{
                                                    fontFamily: 'Roboto, sans-serif',
                                                    fontWeight: 600,
                                                    fontSize: 'clamp(13px, 2vw, 14px)',
                                                    lineHeight: '1.5',
                                                    letterSpacing: '0px',
                                                    verticalAlign: 'middle',
                                                    color: 'rgba(0, 0, 0, 1)',
                                                    marginBottom: '4px'
                                                }}
                                            >
                                                Expert Lock
                                            </h3>
                                            <p
                                                className="w-full"
                                                style={{
                                                    fontFamily: 'Roboto, sans-serif',
                                                    fontWeight: 400,
                                                    fontSize: 'clamp(13px, 2vw, 14px)',
                                                    lineHeight: '1.5',
                                                    letterSpacing: '0px',
                                                    verticalAlign: 'middle',
                                                    color: 'rgba(67, 86, 107, 1)'
                                                }}
                                            >
                                                Subject-specific masters reserved for you.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* App Download Buttons */}
                            <div className="flex flex-row gap-2" style={{ marginBottom: '0' }}>
                                <a
                                    href="https://apps.apple.com/in/app/sisya-class-e-learning-app/id6739211295"
                                    className="inline-flex items-center justify-center"
                                    aria-label="Download on the App Store"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image
                                        src="/appstore.svg"
                                        alt="Download on the App Store"
                                        width={180}
                                        height={60}
                                        className="h-14 w-auto"
                                    />
                                </a>
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&hl=en_IN"
                                    className="inline-flex items-center justify-center"
                                    aria-label="GET IT ON Google Play"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image
                                        src="/googleplay.svg"
                                        alt="GET IT ON Google Play"
                                        width={180}
                                        height={60}
                                        className="h-14 w-auto"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <style jsx>{`
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
        .animate-tick-draw {
          animation: tick-draw 2s ease-out infinite;
        }
        @keyframes float-badge {
          0%, 100% {
            transform: translateX(50%) translateY(-50%);
          }
          50% {
            transform: translateX(50%) translateY(calc(-50% - 10px));
          }
        }
        .animate-float-badge {
          animation: float-badge 3s ease-in-out infinite;
        }
        @media (max-width: 640px) {
          .mobile-resolution-image {
            max-width: 240px !important;
          }
          .mobile-feature-badge {
            padding: 10px 12px !important;
            border-radius: 16px !important;
          }
          .mobile-feature-badge > div > div:first-child {
            font-size: 11px !important;
            margin-bottom: 6px !important;
          }
          .mobile-feature-badge > div > div:not(:first-child) {
            font-size: 14px !important;
            line-height: 18px !important;
          }
          .mobile-headline-spacing {
            margin-top: 8px !important;
          }
        }
      `}</style>
        </>
    );
}



