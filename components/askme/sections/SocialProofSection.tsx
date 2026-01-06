"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const testimonials = [
    {
        rating: 5,
        text: "I used to spend hours on one Physics problem. With SISYA AMA, I got the logic in 5 minutes! Best ₹29 I ever spent.",
        studentName: "Aryan Kapoor",
        studentClass: "CLASS 10 STUDENT",
        avatar: "/askme/student_o.png"
    },
    {
        rating: 5,
        text: "I used to spend hours on one Physics problem. With SISYA AMA, I got the logic in 5 minutes! Best ₹29 I ever spent.",
        studentName: "Aryan Kapoor",
        studentClass: "CLASS 10 STUDENT",
        avatar: "/askme/student_o.png"
    },
    {
        rating: 5,
        text: "I used to spend hours on one Physics problem. With SISYA AMA, I got the logic in 5 minutes! Best ₹29 I ever spent.",
        studentName: "Aryan Kapoor",
        studentClass: "CLASS 10 STUDENT",
        avatar: "/askme/student_o.png"
    }
];

export default function SocialProofSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
                const halfWidth = totalWidth / 2;

                scrollPosition += scrollSpeed;

                // Reset to beginning when we've scrolled through all testimonials
                if (scrollPosition >= halfWidth) {
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

    return (
        <section className="py-16 bg-white">
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

                {/* Testimonial Cards */}
                <div className="hidden md:flex md:flex-row items-center justify-center gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-6 shadow-lg w-full max-w-[281px]"
                            style={{
                                border: '1px solid rgba(220, 220, 220, 0.5)',
                                borderRadius: '16px'
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

                {/* Mobile Auto-Scrolling Testimonials */}
                <div className="md:hidden">
                    <div className="testimonial-scroll-container" ref={scrollContainerRef}>
                        <div className="testimonial-scroll-wrapper">
                            {[...testimonials, ...testimonials].map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg p-6 shadow-lg testimonial-card-mobile flex-shrink-0"
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
                }
                .testimonial-scroll-container::-webkit-scrollbar {
                    display: none;
                }
                .testimonial-scroll-wrapper {
                    display: flex;
                    width: max-content;
                }
                .testimonial-card-mobile {
                    scroll-snap-align: center;
                    scroll-snap-stop: always;
                }
            `}</style>
        </section>
    );
}

