"use client";

import React from "react";
import Image from "next/image";

export default function PersonalMentorSection() {
    return (
        <>
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
                        {/* Left Side - Hero Content */}
                        <div className="flex-1 w-full lg:w-auto">
                            {/* Top Header */}
                            <div className="flex items-center gap-2 mb-1">
                                <div
                                    style={{
                                        width: '30px',
                                        height: '0px',
                                        border: '1.3px solid rgba(5, 149, 206, 1)'
                                    }}
                                ></div>
                                <div
                                    className="w-full"
                                    style={{
                                        fontFamily: 'Roboto, sans-serif',
                                        fontWeight: 700,
                                        fontSize: 'clamp(16px, 2.5vw, 19px)',
                                        lineHeight: '1.5',
                                        letterSpacing: '0px',
                                        verticalAlign: 'middle',
                                        color: 'rgba(5, 149, 206, 1)'
                                    }}
                                >
                                    THE SISYA SOLUTION
                                </div>
                            </div>

                            {/* Main Headline */}
                            <h2 className="mb-3" style={{ lineHeight: '1.2' }}>
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
                                    A Personal Mentor
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
                                        overflow: 'visible',
                                        marginTop: 'clamp(-15px, -2vw, -30px)'
                                    }}
                                >
                                    In Your Pocket.
                                </span>
                            </h2>

                            {/* Description */}
                            <p
                                className="w-full"
                                style={{
                                    fontFamily: 'Roboto, sans-serif',
                                    fontWeight: 600,
                                    fontSize: 'clamp(16px, 2.5vw, 19px)',
                                    lineHeight: '1.5',
                                    letterSpacing: '0px',
                                    verticalAlign: 'middle',
                                    color: 'rgba(67, 86, 107, 1)',
                                    marginBottom: '32px',
                                    maxWidth: '500px'
                                }}
                            >
                                "Ask Me Anything" is more than just a doubt-clearing service. It's an interactive learning ecosystem designed to turn "I can't" into "I can".
                            </p>

                            {/* Statistics Badges */}
                            <div className="flex flex-row gap-2 sm:gap-4">
                                {/* 24/7 Availability Badge */}
                                <div
                                    className="stat-card stat-card-1 mobile-stat-badge w-full sm:w-[202px]"
                                    style={{
                                        minHeight: '106px',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(240, 248, 255, 1)',
                                        background: 'rgba(249, 250, 252, 1)',
                                        padding: '16px 24px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        justifyContent: 'center',
                                        transition: 'border-color 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div
                                        style={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 700,
                                            fontSize: 'clamp(24px, 4vw, 29.48px)',
                                            lineHeight: '1.2',
                                            letterSpacing: '0px',
                                            verticalAlign: 'middle',
                                            color: 'rgba(63, 159, 187, 1)',
                                            marginBottom: '0px'
                                        }}
                                    >
                                        24/7
                                    </div>
                                    <div
                                        style={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '16px',
                                            lineHeight: '28.33px',
                                            letterSpacing: '0px',
                                            verticalAlign: 'middle',
                                            color: 'rgba(144, 165, 186, 1)'
                                        }}
                                    >
                                        AVAILABILITY
                                    </div>
                                </div>

                                {/* 15m Avg Response Badge */}
                                <div
                                    className="stat-card stat-card-2 mobile-stat-badge w-full sm:w-[202px]"
                                    style={{
                                        minHeight: '106px',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(240, 248, 255, 1)',
                                        background: 'rgba(249, 250, 252, 1)',
                                        padding: '16px 24px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        justifyContent: 'center',
                                        transition: 'border-color 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div
                                        style={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 700,
                                            fontSize: 'clamp(24px, 4vw, 29.48px)',
                                            lineHeight: '1.2',
                                            letterSpacing: '0px',
                                            verticalAlign: 'middle',
                                            color: 'rgba(0, 175, 122, 1)',
                                            marginBottom: '0px'
                                        }}
                                    >
                                        15m
                                    </div>
                                    <div
                                        style={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '16px',
                                            lineHeight: '28.33px',
                                            letterSpacing: '0px',
                                            verticalAlign: 'middle',
                                            color: 'rgba(144, 165, 186, 1)'
                                        }}
                                    >
                                        AVG. RESPONSE
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Features Grid */}
                        <div className="flex-1 w-full lg:w-auto">
                            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-6">
                                {/* Subject Mastery Card */}
                                <div
                                    className="feature-card card-1 w-full mobile-feature-card"
                                    style={{
                                        minHeight: '266px',
                                        background: 'rgba(255, 255, 255, 1)',
                                        borderRadius: '20px',
                                        border: '2px solid rgba(220, 235, 242, 1)',
                                        padding: '24px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {/* Books Icon Container */}
                                    <div
                                        className="mb-4"
                                        style={{
                                            width: '59px',
                                            height: '59px',
                                            borderRadius: '13px',
                                            background: 'rgba(255, 255, 255, 1)',
                                            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.05)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Image
                                            src="/askme/pm1.svg"
                                            alt="Subject Mastery"
                                            width={38}
                                            height={38}
                                        />
                                    </div>
                                    <h3
                                        style={{
                                            width: '147px',
                                            height: '28px',
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '20px',
                                            lineHeight: '27.96px',
                                            letterSpacing: '0px',
                                            verticalAlign: 'middle',
                                            color: 'rgba(0, 0, 0, 1)',
                                            marginBottom: '12px'
                                        }}
                                    >
                                        Subject Mastery
                                    </h3>
                                    <p
                                        style={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            lineHeight: '22px',
                                            letterSpacing: '0px',
                                            verticalAlign: 'middle',
                                            color: 'rgba(96, 118, 141, 1)'
                                        }}
                                    >
                                        Expert guidance in Maths, Physics, Chemistry, Biology & Coding
                                    </p>
                                </div>

                                {/* Homework Help Card */}
                                <div
                                    className="feature-card card-2 mobile-feature-card"
                                    style={{
                                        minHeight: '266px',
                                        background: 'rgba(255, 255, 255, 1)',
                                        borderRadius: '20px',
                                        border: '2px solid rgba(251, 229, 230, 1)',
                                        padding: '24px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {/* House Icon Container */}
                                    <div
                                        className="mb-4"
                                        style={{
                                            width: '59px',
                                            height: '59px',
                                            borderRadius: '13px',
                                            background: 'rgba(255, 255, 255, 1)',
                                            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.05)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Image
                                            src="/askme/pm2.svg"
                                            alt="Homework Help"
                                            width={38}
                                            height={38}
                                        />
                                    </div>
                                    <h3
                                        style={{
                                            width: '147px',
                                            height: '28px',
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '20px',
                                            lineHeight: '27.96px',
                                            letterSpacing: '0px',
                                            verticalAlign: 'middle',
                                            color: 'rgba(0, 0, 0, 1)',
                                            marginBottom: '12px'
                                        }}
                                    >
                                        Homework Help
                                    </h3>
                                    <p
                                        style={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            lineHeight: '22px',
                                            letterSpacing: '0px',
                                            verticalAlign: 'middle',
                                            color: 'rgba(96, 118, 141, 1)'
                                        }}
                                    >
                                        Never get stuck again. We walk you through every step of your assignment.
                                    </p>
                                </div>

                                {/* Exam Strategy Card */}
                                <div
                                    className="feature-card card-3 mobile-feature-card"
                                    style={{
                                        minHeight: '266px',
                                        background: 'rgba(255, 255, 255, 1)',
                                        borderRadius: '20px',
                                        border: '2px solid rgba(214, 240, 229, 1)',
                                        padding: '24px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {/* Document Icon Container */}
                                    <div
                                        className="mb-4"
                                        style={{
                                            width: '59px',
                                            height: '59px',
                                            borderRadius: '13px',
                                            background: 'rgba(255, 255, 255, 1)',
                                            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.05)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Image
                                            src="/askme/pm3.svg"
                                            alt="Exam Strategy"
                                            width={38}
                                            height={38}
                                        />
                                    </div>
                                    <h3
                                        style={{
                                            width: '147px',
                                            height: '28px',
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '20px',
                                            lineHeight: '27.96px',
                                            letterSpacing: '0px',
                                            verticalAlign: 'middle',
                                            color: 'rgba(0, 0, 0, 1)',
                                            marginBottom: '12px'
                                        }}
                                    >
                                        Exam Strategy
                                    </h3>
                                    <p
                                        style={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            lineHeight: '22px',
                                            letterSpacing: '0px',
                                            verticalAlign: 'middle',
                                            color: 'rgba(96, 118, 141, 1)'
                                        }}
                                    >
                                        Learn time management and trick-solving for competitive exams.
                                    </p>
                                </div>

                                {/* Career Guidance Card */}
                                <div
                                    className="feature-card card-4 mobile-feature-card"
                                    style={{
                                        minHeight: '266px',
                                        background: 'rgba(255, 255, 255, 1)',
                                        borderRadius: '20px',
                                        border: '2px solid rgba(227, 228, 249, 1)',
                                        padding: '24px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {/* Target Icon Container */}
                                    <div
                                        className="mb-4"
                                        style={{
                                            width: '59px',
                                            height: '59px',
                                            borderRadius: '13px',
                                            background: 'rgba(255, 255, 255, 1)',
                                            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.05)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Image
                                            src="/askme/pm4.svg"
                                            alt="Career Guidance"
                                            width={38}
                                            height={38}
                                        />
                                    </div>
                                    <h3
                                        style={{
                                            width: '147px',
                                            height: '28px',
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '20px',
                                            lineHeight: '27.96px',
                                            letterSpacing: '0px',
                                            verticalAlign: 'middle',
                                            color: 'rgba(0, 0, 0, 1)',
                                            marginBottom: '12px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        Career Guidance
                                    </h3>
                                    <p
                                        style={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            lineHeight: '22px',
                                            letterSpacing: '0px',
                                            verticalAlign: 'middle',
                                            color: 'rgba(96, 118, 141, 1)'
                                        }}
                                    >
                                        Planning your future? Speak to mentors who have been there.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <style jsx>{`
            .feature-card {
                box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
            }

            .feature-card:hover {
                transform: translateY(-8px);
                box-shadow: 0px 12px 24px 0px rgba(0, 0, 0, 0.15);
            }

            /* Card 1 - Light Blue Border */
            .card-1:hover {
                border-color: rgba(0, 151, 211, 1);
                box-shadow: 0px 12px 24px 0px rgba(0, 151, 211, 0.2);
            }

            /* Card 2 - Light Pink Border */
            .card-2:hover {
                border-color: rgba(239, 68, 68, 1);
                box-shadow: 0px 12px 24px 0px rgba(239, 68, 68, 0.2);
            }

            /* Card 3 - Light Green Border */
            .card-3:hover {
                border-color: rgba(16, 185, 129, 1);
                box-shadow: 0px 12px 24px 0px rgba(16, 185, 129, 0.2);
            }

            /* Card 4 - Light Purple Border */
            .card-4:hover {
                border-color: rgba(99, 102, 241, 1);
                box-shadow: 0px 12px 24px 0px rgba(99, 102, 241, 0.2);
            }

            /* Statistics Cards Hover */
            .stat-card-1:hover {
                border-color: rgba(63, 159, 187, 1);
            }

            .stat-card-2:hover {
                border-color: rgba(0, 175, 122, 1);
            }
            @media (max-width: 640px) {
                .mobile-headline-spacing {
                    margin-top: 8px !important;
                }
                .mobile-stat-badge {
                    min-height: 70px !important;
                    padding: 10px 14px !important;
                    border-radius: 10px !important;
                }
                .mobile-stat-badge > div:first-child {
                    font-size: 18px !important;
                    margin-bottom: 2px !important;
                }
                .mobile-stat-badge > div:last-child {
                    font-size: 12px !important;
                    line-height: 18px !important;
                }
                .mobile-feature-card {
                    min-height: 180px !important;
                    padding: 12px !important;
                    border-radius: 12px !important;
                }
                .mobile-feature-card > div:first-child {
                    width: 40px !important;
                    height: 40px !important;
                    border-radius: 10px !important;
                    margin-bottom: 8px !important;
                }
                .mobile-feature-card > div:first-child img {
                    width: 24px !important;
                    height: 24px !important;
                }
                .mobile-feature-card h3 {
                    font-size: 14px !important;
                    line-height: 18px !important;
                    margin-bottom: 6px !important;
                    width: auto !important;
                    height: auto !important;
                }
                .mobile-feature-card p {
                    font-size: 11px !important;
                    line-height: 16px !important;
                }
            }
        `}</style>
        </>
    );
}

