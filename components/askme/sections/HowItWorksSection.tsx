"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const steps = [
    {
        number: "1",
        title: "Snap or Type",
        description: "Upload a photo of your handwritten doubt or type it out simply.",
        iconBg: "rgba(214, 240, 229, 1)", // Light green
        iconSrc: "/askme/hw1.svg"
    },
    {
        number: "2",
        title: "Expert Analysis",
        description: "Our SISYA CLASS Teachers (real humans, not bots!) analyze your query.",
        iconBg: "rgba(251, 229, 230, 1)", // Light pink
        iconSrc: "/askme/hw2.svg"
    },
    {
        number: "3",
        title: "Master the Concept",
        description: "Receive a clear, step-by-step video or text explanation within minutes.",
        iconBg: "rgba(227, 228, 249, 1)", // Light purple
        iconSrc: "/askme/hw3.svg"
    }
];

export default function HowItWorksSection() {
    const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        stepRefs.current.forEach((ref, index) => {
            if (ref) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                // Add step when scrolling down and it enters viewport
                                setVisibleSteps((prev) => {
                                    if (!prev.includes(index)) {
                                        return [...prev, index];
                                    }
                                    return prev;
                                });
                            } else {
                                // Remove step when scrolling up and it leaves viewport
                                setVisibleSteps((prev) => {
                                    return prev.filter((stepIndex) => stepIndex !== index);
                                });
                            }
                        });
                    },
                    {
                        threshold: 0.2,
                        rootMargin: '0px 0px -50px 0px'
                    }
                );

                observer.observe(ref);
                observers.push(observer);
            }
        });

        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, []);

    return (
        <>
            <style jsx>{`
                .step-container .number-badge {
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .step-container:hover .number-badge {
                    opacity: 1;
                }
                @media (max-width: 1024px) {
                    .step-container .number-badge {
                        opacity: 1;
                    }
                    .step-container {
                        opacity: 0;
                        transform: translateY(30px);
                        transition: opacity 0.6s ease, transform 0.6s ease;
                        transition-delay: var(--step-delay, 0s);
                    }
                    .step-container.visible {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2
                            className="w-full"
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: 700,
                                fontSize: 'clamp(28px, 5vw, 40px)',
                                lineHeight: '1.2',
                                letterSpacing: '0px',
                                color: 'rgba(0, 0, 0, 1)',
                                marginBottom: '8px'
                            }}
                        >
                            How it works
                        </h2>
                        <p
                            className="w-full"
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: 400,
                                fontSize: 'clamp(16px, 2.5vw, 18px)',
                                lineHeight: '1.5',
                                letterSpacing: '0px',
                                color: 'rgba(67, 86, 107, 1)'
                            }}
                        >
                            Getting your doubts cleared is as easy as ABC.
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4">
                        {steps.map((step, index) => (
                            <React.Fragment key={index}>
                                <div
                                    ref={(el) => { stepRefs.current[index] = el; }}
                                    className={`flex flex-col items-center relative step-container ${visibleSteps.includes(index) ? 'visible' : ''}`}
                                    style={{
                                        flex: '1',
                                        maxWidth: '300px',
                                        '--step-delay': visibleSteps.includes(index) ? `${index * 0.15}s` : '0s'
                                    } as React.CSSProperties}
                                >
                                    {/* Connecting Line - After */}
                                    {index < steps.length - 1 && (
                                        <div
                                            className="hidden lg:block absolute"
                                            style={{
                                                left: 'calc(50% + 49.5px)',
                                                top: '49.5px',
                                                width: 'calc(50% + 16px + 49.5px)',
                                                height: '0px',
                                                borderTop: '1px solid rgba(96, 118, 141, 1)',
                                                zIndex: 1,
                                                transform: 'translateY(-50%)'
                                            }}
                                        />
                                    )}

                                    {/* Icon Box */}
                                    <div
                                        className="relative icon-box-container"
                                        style={{
                                            width: '99px',
                                            height: '99px',
                                            borderRadius: '20px',
                                            border: '3px solid rgba(255, 255, 255, 1)',
                                            background: step.iconBg,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '24px',
                                            position: 'relative',
                                            zIndex: 10,
                                            boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.1)'
                                        }}
                                    >
                                        {/* Number Badge */}
                                        <div
                                            className="number-badge"
                                            style={{
                                                position: 'absolute',
                                                top: '-12px',
                                                right: '-12px',
                                                width: '31px',
                                                height: '31px',
                                                borderRadius: '50%',
                                                border: '2px solid rgba(255, 255, 255, 1)',
                                                background: 'rgba(255, 104, 0, 1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                zIndex: 20,
                                                boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)'
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontFamily: 'Roboto, sans-serif',
                                                    fontWeight: 700,
                                                    fontSize: '18px',
                                                    lineHeight: '22px',
                                                    color: 'rgba(255, 255, 255, 1)'
                                                }}
                                            >
                                                {step.number}
                                            </span>
                                        </div>

                                        {/* Icon */}
                                        <Image
                                            src={step.iconSrc}
                                            alt={step.title}
                                            width={37}
                                            height={37}
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3
                                        style={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '22px',
                                            lineHeight: '28px',
                                            letterSpacing: '0px',
                                            color: 'rgba(0, 0, 0, 1)',
                                            marginBottom: '12px',
                                            textAlign: 'center'
                                        }}
                                    >
                                        {step.title}
                                    </h3>

                                    {/* Description */}
                                    <p
                                        style={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 400,
                                            fontSize: '16px',
                                            lineHeight: '24px',
                                            letterSpacing: '0px',
                                            color: 'rgba(67, 86, 107, 1)',
                                            textAlign: 'center',
                                            maxWidth: '280px'
                                        }}
                                    >
                                        {step.description}
                                    </p>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
