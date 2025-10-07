import React from "react";
import RevealOnView from "./Reveal/RevealOnView";
import Image from "next/image";

const AIEcosystem = () => {
    return (
        <div className="py-16 sm:py-20 bg-white">
            <div className="mx-auto max-w-7xl px-4">
                <RevealOnView from="left" durationMs={1200}>
                    <div
                        className="relative mx-auto rounded-[24px] sm:rounded-[36px] md:rounded-[44px] lg:rounded-[50px] p-5 sm:p-8 md:p-10 lg:p-12 w-full max-w-[1176px] min-h-[480px] md:min-h-[600px] lg:min-h-[746px] bg-[#1A2439] border border-[#EBEBEB] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]"
                    >
                        {/* Top Headlines */}
                        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
                            <h1 className="text-white text-lg sm:text-xl md:text-2xl mb-2">Revolutionizing Learning</h1>
                            <h2 className="text-yellow-400 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">With SISYA's AI Ecosystem</h2>
                        </div>

                        {/* Main Content - Two columns: left text, right phone mockups */}
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-stretch gap-6 sm:gap-8 md:gap-10">

                            {/* Left - Text Content */}
                            <div className="text-left space-y-6 sm:space-y-8 max-w-full md:max-w-2xl">
                                {/* Main Title */}
                                <div>
                                    <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4">
                                        Meet Your <span className="text-yellow-400 font-bold">Child's 24/7 AI Learning Partner</span>
                                    </h3>
                                    <p className="text-white text-base sm:text-lg lg:text-xl">
                                        India's first EdTech with real AI-powered doubt solving
                                    </p>
                                </div>

                                {/* Features List */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
                                    <div>
                                        <h4 className="text-white font-bold text-base sm:text-lg mb-2">Interactive Learning</h4>
                                        <p className="text-white text-sm sm:text-base leading-relaxed">
                                            Get instant answers anytime with SISYA's AI-powered chat, making study time engaging and effective.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-white font-bold text-base sm:text-lg mb-2">Step-by-Step Guidance</h4>
                                        <p className="text-white text-sm sm:text-base leading-relaxed">
                                            SISYA breaks down concepts clearly and guides your child through problems, step by step.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-white font-bold text-base sm:text-lg mb-2">Personalized Feedback</h4>
                                        <p className="text-white text-sm sm:text-base leading-relaxed">
                                            Receive tailored insights based on your child's learning progress to boost improvement.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-white font-bold text-base sm:text-lg mb-2">Grade-Specific Assistance</h4>
                                        <p className="text-white text-sm sm:text-base leading-relaxed">
                                            SISYA delivers fun, easy-to-understand explanations aligned with your child's grade and syllabus.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right - Phone mockups */}
                            <div className="relative w-full md:w-[520px] h-[320px] md:h-[480px] hidden md:block">
                                {/* Left phone (eco1) */}
                                <Image
                                    src="/eco1.svg"
                                    alt="SISYA AI Assistant"
                                    width={220}
                                    height={440}
                                    className="absolute left-0 bottom-0 h-[380px] md:h-[440px] w-auto drop-shadow-xl z-10"
                                />
                                {/* Right phone (eco2) */}
                                <Image
                                    src="/eco2.svg"
                                    alt="Get Started with AI Learning"
                                    width={220}
                                    height={440}
                                    className="absolute right-0 top-0 h-[380px] md:h-[440px] w-auto drop-shadow-xl z-20"
                                />
                            </div>
                        </div>

                        {/* Navigation Controls */}
                        <div className="mt-10 md:mt-0 md:absolute md:bottom-6 left-1/2 md:-translate-x-1/2 flex items-center justify-center gap-4">
                            <button className="w-10 h-10 border-2 border-gray-400 rounded-[14px] bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 active:scale-95 transition-colors duration-300">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div className="flex gap-2">
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gray-400"></div>
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gray-400"></div>
                            </div>
                            <button className="w-10 h-10 border-2 border-gray-400 rounded-[14px] bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 active:scale-95 transition-colors duration-300">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </RevealOnView>
            </div>
        </div>
    );
};

export default AIEcosystem;
