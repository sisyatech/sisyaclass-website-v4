"use client";

import React from "react";
import Image from "next/image";

const features = [
    {
        icon: "/askme/f1.svg",
        iconColor: "rgba(0, 175, 122, 1)",
        iconBg: "rgba(14, 33, 42, 1)",
        title: "Human-Centric Learning",
        description: "We don't just give answers; we teach you how to solve them using real mentor insights."
    },
    {
        icon: "/askme/f2.svg",
        iconColor: "rgba(63, 159, 187, 1)",
        iconBg: "rgba(18, 32, 48, 1)",
        title: "No complicated language",
        description: "We speak your language— simple, clear, and extremely easy to grasp for all age groups."
    },
    {
        icon: "/askme/f3.svg",
        iconColor: "rgba(222, 128, 125, 1)",
        iconBg: "rgba(35, 30, 43, 1)",
        title: "Affordable for All",
        description: "High-quality expert mentorship for less than the price of a small evening snack."
    },
    {
        icon: "/askme/f4.svg",
        iconColor: "rgba(114, 120, 215, 1)",
        iconBg: "rgba(22, 28, 52, 1)",
        title: "Available Anywhere",
        description: "On your phone, tablet, or laptop. Learning never stops, no matter where you are."
    }
];

export default function FeaturesSection() {
    return (
        <>
            <style jsx>{`
                .feature-card {
                    position: relative;
                    transition: border-color 0.3s ease, box-shadow 0.3s ease;
                }
                .feature-card:hover {
                    border-color: var(--icon-color) !important;
                    box-shadow: 0 0 20px var(--icon-color), 0 0 40px var(--icon-color);
                }
                @media (max-width: 768px) {
                    .mobile-feature-card {
                        min-height: 240px !important;
                        padding: 16px !important;
                        border-radius: 20px !important;
                        max-width: 100% !important;
                    }
                    .mobile-feature-icon {
                        width: 40px !important;
                        height: 40px !important;
                        border-radius: 10px !important;
                        margin-bottom: 12px !important;
                    }
                    .mobile-icon-image {
                        width: 18px !important;
                        height: 18px !important;
                    }
                    .mobile-feature-title {
                        width: 100% !important;
                        height: auto !important;
                        font-size: 14px !important;
                        line-height: 20px !important;
                        margin-bottom: 8px !important;
                    }
                    .mobile-feature-description {
                        width: 100% !important;
                        height: auto !important;
                        font-size: 11px !important;
                        line-height: 16px !important;
                    }
                    .mobile-feature-line {
                        width: 100% !important;
                        margin-bottom: 12px !important;
                    }
                }
            `}</style>
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Features Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="rounded-lg shadow-lg transition-all duration-300 relative flex flex-col feature-card mobile-feature-card w-full max-w-[271px] mx-auto"
                                style={{
                                    minHeight: '324px',
                                    borderRadius: '40px',
                                    border: '3px solid rgba(27, 41, 62, 1)',
                                    background: 'rgba(12, 18, 33, 1)',
                                    padding: '24px',
                                    '--icon-color': feature.iconColor
                                } as React.CSSProperties & { '--icon-color': string }}
                            >
                                {/* Icon */}
                                <div
                                    className="mb-4 rounded-lg flex items-center justify-center mobile-feature-icon"
                                    style={{
                                        width: '59px',
                                        height: '59px',
                                        borderRadius: '13px',
                                        background: feature.iconBg,
                                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.05)'
                                    }}
                                >
                                    <Image
                                        src={feature.icon}
                                        alt={feature.title}
                                        width={26}
                                        height={26}
                                        className="mobile-icon-image"
                                    />
                                </div>

                                {/* Title */}
                                <h3
                                    className="mobile-feature-title"
                                    style={{
                                        width: '178px',
                                        height: '48px',
                                        fontFamily: 'Roboto, sans-serif',
                                        fontWeight: 700,
                                        fontSize: '20px',
                                        lineHeight: '28px',
                                        letterSpacing: '0px',
                                        verticalAlign: 'middle',
                                        color: 'rgba(255, 255, 255, 1)',
                                        marginBottom: '12px'
                                    }}
                                >
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p
                                    className="mobile-feature-description"
                                    style={{
                                        width: '223px',
                                        height: '73px',
                                        fontFamily: 'Roboto, sans-serif',
                                        fontWeight: 500,
                                        fontSize: '16px',
                                        lineHeight: '22px',
                                        letterSpacing: '0px',
                                        color: 'rgba(96, 118, 141, 1)',
                                        marginBottom: 'auto'
                                    }}
                                >
                                    {feature.description}
                                </p>

                                {/* Bottom Line */}
                                <div
                                    className="mobile-feature-line"
                                    style={{
                                        width: '223px',
                                        height: '0px',
                                        border: '0.5px solid rgba(96, 118, 141, 1)',
                                        marginBottom: '20px'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

