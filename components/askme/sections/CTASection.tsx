"use client";

import React from "react";

export default function CTASection() {
    return (
        <section className="py-16 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center w-full">
                    {/* Central Blue Box */}
                    <div
                        className="text-center w-full max-w-[1024px]"
                        style={{
                            minHeight: '434px',
                            borderRadius: '35px',
                            background: 'rgba(0, 152, 211, 1)',
                            padding: 'clamp(24px, 4vw, 40px)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {/* Headline */}
                        <h2
                            className="w-full max-w-[655px]"
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: 700,
                                fontSize: 'clamp(28px, 5vw, 49.52px)',
                                lineHeight: '1.2',
                                letterSpacing: '0px',
                                textAlign: 'center',
                                verticalAlign: 'middle',
                                color: 'rgba(255, 255, 255, 1)',
                                marginBottom: '20px'
                            }}
                        >
                            Don't Let a Single Doubt<br />
                            Hold You Back.
                        </h2>

                        {/* Descriptive Text */}
                        <p
                            className="w-full max-w-[525px]"
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: 500,
                                fontSize: 'clamp(14px, 2vw, 16px)',
                                lineHeight: '1.5',
                                letterSpacing: '0px',
                                textAlign: 'center',
                                verticalAlign: 'middle',
                                color: 'rgba(255, 255, 255, 1)',
                                marginBottom: '48px'
                            }}
                        >
                            Join thousands of students who are learning smarter, not harder. Start
                            your first doubt session today.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                            <button
                                className="rounded-lg font-semibold transition-opacity hover:opacity-90 w-full sm:w-[235px]"
                                style={{
                                    minHeight: '61px',
                                    borderRadius: '12px',
                                    background: 'rgba(255, 255, 255, 1)',
                                    color: 'rgba(0, 151, 211, 1)',
                                    fontFamily: 'Roboto, sans-serif',
                                    fontWeight: 600,
                                    fontSize: 'clamp(14px, 2vw, 16px)',
                                    lineHeight: '24px',
                                    letterSpacing: '0px',
                                    cursor: 'pointer',
                                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.3)'
                                }}
                            >
                                Get started for ₹29
                            </button>
                            <button
                                className="rounded-lg font-semibold transition-opacity hover:opacity-90 w-full sm:w-[169px]"
                                style={{
                                    minHeight: '61px',
                                    borderRadius: '12px',
                                    background: 'rgba(0, 100, 139, 1)',
                                    color: 'rgba(255, 255, 255, 1)',
                                    fontFamily: 'Roboto, sans-serif',
                                    fontWeight: 600,
                                    fontSize: 'clamp(14px, 2vw, 16px)',
                                    lineHeight: '24px',
                                    letterSpacing: '0px',
                                    cursor: 'pointer',
                                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.3)'
                                }}
                            >
                                See all plans
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

