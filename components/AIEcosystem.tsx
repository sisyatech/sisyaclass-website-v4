import React from "react";
import RevealOnView from "./Reveal/RevealOnView";
import Image from "next/image";

const AIEcosystem = () => {
    return (
        <div className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-4">
                <RevealOnView from="left" durationMs={1500}>
                    <div
                        className="relative mx-auto rounded-[50px] p-12 w-[1176px] h-[746px] bg-[#1A2439] border border-[#EBEBEB] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]"
                    >
                        {/* Top Headlines */}
                        <div className="text-center mb-20">
                            <h1 className="text-white text-2xl mb-2">Revolutionizing Learning</h1>
                            <h2 className="text-yellow-400 text-4xl font-bold">With SISYA's AI Ecosystem</h2>
                        </div>

                        {/* Main Content - Two columns: left text, right phone mockups */}
                        <div className="flex justify-between items-start gap-10">

                            {/* Left - Text Content */}
                            <div className="text-left space-y-8 max-w-2xl">
                                {/* Main Title */}
                                <div>
                                    <h3 className="text-white text-4xl mb-4">
                                        Meet Your <span className="text-yellow-400 font-bold">Child's 24/7 AI Learning Partner</span>
                                    </h3>
                                    <p className="text-white text-xl">
                                        India's first EdTech with real AI-powered doubt solving
                                    </p>
                                </div>

                                {/* Features List */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-2">Interactive Learning</h4>
                                        <p className="text-white text-sm leading-relaxed">
                                            Get instant answers anytime with SISYA's AI-powered chat, making study time engaging and effective.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-2">Step-by-Step Guidance</h4>
                                        <p className="text-white text-sm leading-relaxed">
                                            SISYA breaks down concepts clearly and guides your child through problems, step by step.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-2">Personalized Feedback</h4>
                                        <p className="text-white text-sm leading-relaxed">
                                            Receive tailored insights based on your child's learning progress to boost improvement.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-2">Grade-Specific Assistance</h4>
                                        <p className="text-white text-sm leading-relaxed">
                                            SISYA delivers fun, easy-to-understand explanations aligned with your child's grade and syllabus.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right - Phone mockups */}
                            <div className="relative w-[520px] h-[480px] hidden md:block">
                                {/* Left phone (eco1) */}
                                <Image
                                    src="/eco1.svg"
                                    alt="SISYA AI Assistant"
                                    width={220}
                                    height={440}
                                    className="absolute left-0 bottom-0 h-[440px] w-auto drop-shadow-xl z-10"
                                />
                                {/* Right phone (eco2) */}
                                <Image
                                    src="/eco2.svg"
                                    alt="Get Started with AI Learning"
                                    width={220}
                                    height={440}
                                    className="absolute right-0 top-0 h-[440px] w-auto drop-shadow-xl z-20"
                                />
                            </div>
                        </div>

                        {/* Navigation Controls */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                            <button className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white">
                                ←
                            </button>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-white"></div>
                                <div className="w-3 h-3 rounded-full bg-white"></div>
                            </div>
                            <button className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white">
                                →
                            </button>
                        </div>
                    </div>
                </RevealOnView>
            </div>
        </div>
    );
};

export default AIEcosystem;
