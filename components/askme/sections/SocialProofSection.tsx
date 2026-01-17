"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const testimonials = [
    {
        rating: 5,
        text: "Getting guidance directly from IIT faculty made complex topics much easier to understand. Their explanations are clear, practical, and very motivating.",
        studentName: "Aryan Kapoor",
        studentClass: "CLASS 8 STUDENT",
        avatar: "/askme/student_o.png"
    },
    {
        rating: 5,
        text: "The SISYA AI Chatbot answers my doubts instantly and accurately. It feels like having a personal tutor available anytime",
        studentName: "Riya Sharma",
        studentClass: "CLASS 10 STUDENT",
        avatar: "/askme/student_o.png"
    },
    {
        rating: 5,
        text: "The Ask Me Anything feature is amazing. I can ask real questions without hesitation and get clear, useful responses every time.",
        studentName: "Karthik Reddy",
        studentClass: "CLASS 9 STUDENT",
        avatar: "/askme/student_o.png"
    }
];

export default function SocialProofSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const desktopScrollContainerRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isDesktopScrolling, setIsDesktopScrolling] = useState(false);
    const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const desktopScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Mobile auto-scroll effect
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let scrollPosition = 0;
        let manualScrollTimeout: NodeJS.Timeout | null = null;
        const scrollSpeed = 0.5; // pixels per frame
        let lastScrollLeft = 0;

        const autoScroll = () => {
            if (!isScrolling && container) {
                const totalWidth = container.scrollWidth;
                const viewportWidth = container.clientWidth;
                const maxScroll = Math.max(totalWidth - viewportWidth, 0);

                scrollPosition += scrollSpeed;

                // Reset to beginning when we've scrolled through all testimonials
                if (scrollPosition >= maxScroll) {
                    scrollPosition = 0;
                }

                container.scrollLeft = scrollPosition;
            }
        };

        // Handle manual scroll
        const handleScroll = () => {
            const currentScroll = container.scrollLeft;

            // Detect if user is manually scrolling
            if (Math.abs(currentScroll - lastScrollLeft) > 2) {
                setIsScrolling(true);
                scrollPosition = currentScroll;

                if (manualScrollTimeout) {
                    clearTimeout(manualScrollTimeout);
                }

                // Resume auto-scroll after 3 seconds of no manual scrolling
                manualScrollTimeout = setTimeout(() => {
                    setIsScrolling(false);
                }, 3000);
            }

            lastScrollLeft = currentScroll;
        };

        const handleTouchStart = () => {
            setIsScrolling(true);
        };

        const handleTouchEnd = () => {
            if (manualScrollTimeout) {
                clearTimeout(manualScrollTimeout);
            }
            manualScrollTimeout = setTimeout(() => {
                setIsScrolling(false);
                scrollPosition = container.scrollLeft;
            }, 3000);
        };

        container.addEventListener('scroll', handleScroll);
        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchend', handleTouchEnd);

        scrollIntervalRef.current = setInterval(autoScroll, 16); // ~60fps

        return () => {
            container.removeEventListener('scroll', handleScroll);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchend', handleTouchEnd);
            if (scrollIntervalRef.current) {
                clearInterval(scrollIntervalRef.current);
            }
            if (manualScrollTimeout) {
                clearTimeout(manualScrollTimeout);
            }
        };
    }, [isScrolling]);

    // Desktop auto-scroll effect
    useEffect(() => {
        const container = desktopScrollContainerRef.current;
        if (!container) return;

        let scrollPosition = 0;
        let manualScrollTimeout: NodeJS.Timeout | null = null;
        const scrollSpeed = 0.5; // pixels per frame
        let lastScrollLeft = 0;

        const autoScroll = () => {
            if (!isDesktopScrolling && container) {
                const totalWidth = container.scrollWidth;
                const viewportWidth = container.clientWidth;
                const maxScroll = Math.max(totalWidth - viewportWidth, 0);

                scrollPosition += scrollSpeed;

                // Reset to beginning when we've scrolled through all testimonials
                if (scrollPosition >= maxScroll) {
                    scrollPosition = 0;
                }

                container.scrollLeft = scrollPosition;
            }
        };

        // Handle manual scroll
        const handleScroll = () => {
            const currentScroll = container.scrollLeft;

            // Detect if user is manually scrolling
            if (Math.abs(currentScroll - lastScrollLeft) > 2) {
                setIsDesktopScrolling(true);
                scrollPosition = currentScroll;

                if (manualScrollTimeout) {
                    clearTimeout(manualScrollTimeout);
                }

                // Resume auto-scroll after 3 seconds of no manual scrolling
                manualScrollTimeout = setTimeout(() => {
                    setIsDesktopScrolling(false);
                }, 3000);
            }

            lastScrollLeft = currentScroll;
        };

        const handleMouseDown = () => {
            setIsDesktopScrolling(true);
        };

        const handleMouseUp = () => {
            if (manualScrollTimeout) {
                clearTimeout(manualScrollTimeout);
            }
            manualScrollTimeout = setTimeout(() => {
                setIsDesktopScrolling(false);
                scrollPosition = container.scrollLeft;
            }, 3000);
        };

        container.addEventListener('scroll', handleScroll);
        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('mouseup', handleMouseUp);
        container.addEventListener('mouseleave', handleMouseUp);

        desktopScrollIntervalRef.current = setInterval(autoScroll, 16); // ~60fps

        return () => {
            container.removeEventListener('scroll', handleScroll);
            container.removeEventListener('mousedown', handleMouseDown);
            container.removeEventListener('mouseup', handleMouseUp);
            container.removeEventListener('mouseleave', handleMouseUp);
            if (desktopScrollIntervalRef.current) {
                clearInterval(desktopScrollIntervalRef.current);
            }
            if (manualScrollTimeout) {
                clearTimeout(manualScrollTimeout);
            }
        };
    }, [isDesktopScrolling]);

    return (
        <section className="py-16 pb-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <p
                        className="w-full max-w-[347px] mx-auto"
                        style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 600,
                            fontSize: 'clamp(16px, 2.5vw, 19px)',
                            lineHeight: '1.2',
                            letterSpacing: '0px',
                            textAlign: 'center',
                            verticalAlign: 'middle',
                            textTransform: 'uppercase',
                            color: 'rgba(5, 149, 206, 1)',
                            margin: '0 auto 8px'
                        }}
                    >
                        SOCIAL PROOF
                    </p>
                    <h2
                        className="w-full max-w-[655px] mx-auto"
                        style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 700,
                            fontSize: 'clamp(28px, 6vw, 49.52px)',
                            lineHeight: '1.2',
                            letterSpacing: '0px',
                            textAlign: 'center',
                            verticalAlign: 'middle',
                            color: 'rgba(0, 0, 0, 1)',
                            margin: '0 auto'
                        }}
                    >
                        Choose Your Path to Success
                    </h2>
                </div>

                {/* Desktop Auto-Scrolling Testimonials */}
                <div className="hidden md:block" style={{ background: 'transparent', border: 'none', outline: 'none' }}>
                    <div className="testimonial-scroll-container-desktop" ref={desktopScrollContainerRef}>
                        <div className="testimonial-scroll-wrapper-desktop">
                            {Array.from({ length: 12 }).map((_, index) => {
                                const testimonial = testimonials[index % testimonials.length];
                                return (
                                    <div
                                        key={index}
                                        className="bg-white rounded-lg p-6 shadow-lg testimonial-card-desktop flex-shrink-0 mb-6"
                                        style={{
                                            border: '1px solid rgba(220, 220, 220, 0.5)',
                                            borderRadius: '16px',
                                            width: '281px',
                                            margin: '0 12px'
                                        }}
                                    >
                                        {/* Rating Stars */}
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    width="12"
                                                    height="12"
                                                    viewBox="0 0 24 24"
                                                    fill="rgba(255, 104, 0, 1)"
                                                    style={{ color: 'rgba(255, 104, 0, 1)' }}
                                                >
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                </svg>
                                            ))}
                                        </div>

                                        {/* Testimonial Text */}
                                        <p
                                            className="w-full"
                                            style={{
                                                fontFamily: 'Roboto, sans-serif',
                                                fontWeight: 400,
                                                fontSize: 'clamp(14px, 2vw, 16px)',
                                                lineHeight: '1.5',
                                                letterSpacing: '0px',
                                                fontStyle: 'italic',
                                                verticalAlign: 'middle',
                                                color: 'rgba(38, 38, 38, 1)',
                                                marginBottom: '20px'
                                            }}
                                        >
                                            {testimonial.text}
                                        </p>

                                        {/* Student Info */}
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="relative overflow-hidden flex-shrink-0"
                                                style={{
                                                    width: '46px',
                                                    height: '46px',
                                                    borderRadius: '5px'
                                                }}
                                            >
                                                <Image
                                                    src={testimonial.avatar}
                                                    alt={testimonial.studentName}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h4
                                                    style={{
                                                        width: '107px',
                                                        height: '22px',
                                                        fontFamily: 'Roboto, sans-serif',
                                                        fontWeight: 700,
                                                        fontSize: '16px',
                                                        lineHeight: '22px',
                                                        letterSpacing: '0px',
                                                        verticalAlign: 'middle',
                                                        color: 'rgba(38, 38, 38, 1)',
                                                        marginBottom: '4px'
                                                    }}
                                                >
                                                    {testimonial.studentName}
                                                </h4>
                                                <p
                                                    style={{
                                                        width: '149px',
                                                        height: '22px',
                                                        fontFamily: 'Roboto, sans-serif',
                                                        fontWeight: 700,
                                                        fontSize: '12px',
                                                        lineHeight: '22px',
                                                        letterSpacing: '0px',
                                                        verticalAlign: 'middle',
                                                        color: 'rgba(5, 149, 206, 1)',
                                                        textTransform: 'uppercase'
                                                    }}
                                                >
                                                    {testimonial.studentClass}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Mobile Auto-Scrolling Testimonials */}
                <div className="md:hidden" style={{ background: 'transparent', border: 'none', outline: 'none' }}>
                    <div className="testimonial-scroll-container" ref={scrollContainerRef}>
                        <div className="testimonial-scroll-wrapper">
                            {[...testimonials, ...testimonials].map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg p-6 shadow-lg testimonial-card-mobile flex-shrink-0 mb-6"
                                    style={{
                                        border: '1px solid rgba(220, 220, 220, 0.5)',
                                        borderRadius: '16px',
                                        width: 'calc(100vw - 32px)',
                                        maxWidth: '281px',
                                        margin: '0 12px'
                                    }}
                                >
                                    {/* Rating Stars */}
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <svg
                                                key={i}
                                                width="12"
                                                height="12"
                                                viewBox="0 0 24 24"
                                                fill="rgba(255, 104, 0, 1)"
                                                style={{ color: 'rgba(255, 104, 0, 1)' }}
                                            >
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                        ))}
                                    </div>

                                    {/* Testimonial Text */}
                                    <p
                                        className="w-full"
                                        style={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 400,
                                            fontSize: 'clamp(14px, 2vw, 16px)',
                                            lineHeight: '1.5',
                                            letterSpacing: '0px',
                                            fontStyle: 'italic',
                                            verticalAlign: 'middle',
                                            color: 'rgba(38, 38, 38, 1)',
                                            marginBottom: '20px'
                                        }}
                                    >
                                        {testimonial.text}
                                    </p>

                                    {/* Student Info */}
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="relative overflow-hidden flex-shrink-0"
                                            style={{
                                                width: '46px',
                                                height: '46px',
                                                borderRadius: '5px'
                                            }}
                                        >
                                            <Image
                                                src={testimonial.avatar}
                                                alt={testimonial.studentName}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4
                                                style={{
                                                    width: '107px',
                                                    height: '22px',
                                                    fontFamily: 'Roboto, sans-serif',
                                                    fontWeight: 700,
                                                    fontSize: '16px',
                                                    lineHeight: '22px',
                                                    letterSpacing: '0px',
                                                    verticalAlign: 'middle',
                                                    color: 'rgba(38, 38, 38, 1)',
                                                    marginBottom: '4px'
                                                }}
                                            >
                                                {testimonial.studentName}
                                            </h4>
                                            <p
                                                style={{
                                                    width: '149px',
                                                    height: '22px',
                                                    fontFamily: 'Roboto, sans-serif',
                                                    fontWeight: 700,
                                                    fontSize: '12px',
                                                    lineHeight: '22px',
                                                    letterSpacing: '0px',
                                                    verticalAlign: 'middle',
                                                    color: 'rgba(5, 149, 206, 1)',
                                                    textTransform: 'uppercase'
                                                }}
                                            >
                                                {testimonial.studentClass}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .testimonial-scroll-container {
                    overflow-x: auto;
                    overflow-y: hidden;
                    width: 100%;
                    position: relative;
                    -webkit-overflow-scrolling: touch;
                    scroll-snap-type: x mandatory;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    border: none;
                    outline: none;
                    background: transparent;
                    box-shadow: none;
                    margin: 0;
                    padding: 0 0 24px 0;
                }
                .testimonial-scroll-container::-webkit-scrollbar {
                    display: none;
                    width: 0;
                    height: 0;
                    background: transparent;
                }
                .testimonial-scroll-container::-webkit-scrollbar-track {
                    display: none;
                    background: transparent;
                }
                .testimonial-scroll-container::-webkit-scrollbar-thumb {
                    display: none;
                    background: transparent;
                }
                .testimonial-scroll-wrapper {
                    display: flex;
                    width: max-content;
                    border: none;
                    outline: none;
                    background: transparent;
                    box-shadow: none;
                    margin: 0;
                    padding: 0;
                }
                .testimonial-card-mobile {
                    scroll-snap-align: center;
                    scroll-snap-stop: always;
                }
                .testimonial-scroll-container-desktop {
                    overflow-x: auto;
                    overflow-y: hidden;
                    width: 100%;
                    position: relative;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    border: none;
                    outline: none;
                    background: transparent;
                    box-shadow: none;
                    margin: 0;
                    padding: 0 0 24px 0;
                }
                .testimonial-scroll-container-desktop::-webkit-scrollbar {
                    display: none;
                    width: 0;
                    height: 0;
                    background: transparent;
                }
                .testimonial-scroll-container-desktop::-webkit-scrollbar-track {
                    display: none;
                    background: transparent;
                }
                .testimonial-scroll-container-desktop::-webkit-scrollbar-thumb {
                    display: none;
                    background: transparent;
                }
                .testimonial-scroll-wrapper-desktop {
                    display: flex;
                    width: max-content;
                    border: none;
                    outline: none;
                    background: transparent;
                    box-shadow: none;
                    margin: 0;
                    padding: 0;
                }
                .testimonial-card-desktop {
                    scroll-snap-align: center;
                }
            `}</style>
        </section>
    );
}

