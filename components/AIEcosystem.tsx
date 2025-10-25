

import React, { useEffect, useState } from "react";
import RevealOnView from "./Reveal/RevealOnView";
import Image from "next/image";

interface Feature {
    id: string;
    sectionId: string;
    title: string;
    description: string;
    order: number;
}

interface ImageData {
    id: string;
    sectionId: string;
    url: string;
    alt: string;
    position: string;
    order: number | null;
}

interface SectionData {
    id: string;
    headingTop: string;
    headingMain: string;
    headingMainStyled: {
        text: string;
        color: string;
    };
    title: string;
    titleStyled: {
        color: string;
    };
    subtitle: string;
    background: string;
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    features: Feature[];
    images: ImageData[];
}

const AIEcosystem = () => {
    const [sectionData, setSectionData] = useState<SectionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchSectionData = async () => {
            try {
                // console.log('🚀 Fetching AI Ecosystem section data from API...');
                // console.log('📡 API URL:', 'https://sisyaclass.xyz/student/get_all_feature_showcase_section');
                
                const response = await fetch('https://sisyaclass.xyz/student/get_all_feature_showcase_section', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                });
                
                // console.log('📊 API Response status:', response.status);
                
                if (response.ok) {
                    const data = await response.json();
                    // console.log('✅ API Data received successfully!');
                    // console.log('📦 Number of sections:', data.length);
                    // console.log('📝 Section data:', data[0]);
                    
                    // Get the first active section (order 1)
                    const activeSection = data.find((section: SectionData) => section.isActive && section.order === 1);
                    if (activeSection) {
                        setSectionData(activeSection);
                        // console.log('✅ Active section set:', activeSection);
                    } else {
                        // console.warn('⚠️ No active section found, using first section');
                        setSectionData(data[0]);
                    }
                } else {
                    // console.error('❌ Failed to fetch section data, status:', response.status);
                    const responseText = await response.text();
                    // console.error('📄 Response text:', responseText);
                }
            } catch (error) {
                // console.error('❌ Error fetching section data:', error);
                // console.error('');
                // console.error('🚨 BACKEND SETUP REQUIRED:');
                // console.error('1. Make sure your backend server is running');
                // console.error('2. Verify the endpoint: https://sisyaclass.xyz/student/get_all_feature_showcase_section');
                // console.error('3. Enable CORS headers in your backend');
            } finally {
                setLoading(false);
                // console.log('✅ Loading completed');
            }
        };

        fetchSectionData();
    }, []);

    const handlePrevSlide = () => {
        if (sectionData && sectionData.images.length > 0) {
            setCurrentSlide((prev) => (prev === 0 ? sectionData.images.length - 1 : prev - 1));
        }
    };

    const handleNextSlide = () => {
        if (sectionData && sectionData.images.length > 0) {
            setCurrentSlide((prev) => (prev === sectionData.images.length - 1 ? 0 : prev + 1));
        }
    };

    if (loading) {
        return (
            <div className="py-8 sm:py-10 bg-white">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0595CE] mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading AI Ecosystem...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!sectionData) {
        return null;
    }

    // Parse the title to extract styled text
    const getTitleWithStyledText = () => {
        const styledText = sectionData.title.match(/Child's 24\/7 AI Learning Partner/)?.[0] || "Child's 24/7 AI Learning Partner";
        const beforeStyled = sectionData.title.split(styledText)[0];
        return { beforeStyled, styledText };
    };

    const { beforeStyled, styledText } = getTitleWithStyledText();

    return (
        <div className="py-8 sm:py-10 bg-white">
            <div className="mx-auto max-w-7xl px-4">
                <RevealOnView from="left" durationMs={1200}>
                    <div
                        className="relative mx-auto rounded-[24px] sm:rounded-[36px] md:rounded-[44px] lg:rounded-[50px] p-5 sm:p-8 md:p-10 lg:p-12 w-full max-w-[1176px] min-h-[480px] md:min-h-[600px] lg:min-h-[746px] border border-[#EBEBEB] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)]"
                        style={{ backgroundColor: sectionData.background }}
                    >
                        {/* Top Headlines */}
                        <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
                            <h1 className="text-white text-lg sm:text-xl md:text-2xl mb-2">{sectionData.headingTop}</h1>
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                                With <span style={{ color: sectionData.headingMainStyled.color }}>SISYA's AI</span> Ecosystem
                            </h2>
                        </div>

                        {/* Main Content - Two columns: left text, right phone mockups */}
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-stretch gap-6 sm:gap-8 md:gap-10">

                            {/* Left - Text Content */}
                            <div className="text-left space-y-4 sm:space-y-5 max-w-full md:max-w-2xl">
                                {/* Main Title */}
                                <div>
                                    <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4">
                                        {beforeStyled}
                                        <span className="font-bold" style={{ color: sectionData.titleStyled.color }}>
                                            {styledText}
                                        </span>
                                    </h3>
                                    <p className="text-white text-base sm:text-lg lg:text-xl">
                                        {sectionData.subtitle}
                                    </p>
                                </div>

                                {/* Features List */}
                                <div className="grid grid-cols-1 gap-3 sm:gap-4 text-left">
                                    {sectionData.features
                                        .sort((a, b) => a.order - b.order)
                                        .map((feature) => (
                                            <div key={feature.id}>
                                                <h4 className="text-white font-bold text-base sm:text-lg mb-1.5">
                                                    {feature.title}
                                                </h4>
                                                <p className="text-white text-sm sm:text-base leading-relaxed">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            {/* Right - Image */}
                            <div className="relative w-full md:w-[520px] h-[320px] md:h-[480px] hidden md:block">
                                {sectionData.images.length > 0 && (
                                    <Image
                                        src={sectionData.images[currentSlide].url}
                                        alt={sectionData.images[currentSlide].alt}
                                        fill
                                        className="object-contain drop-shadow-xl"
                                        unoptimized
                                    />
                                )}
                            </div>
                        </div>

                        {/* Navigation Controls - Only show if there are multiple images */}
                        {sectionData.images.length > 1 && (
                            <div className="mt-10 md:mt-0 md:absolute md:bottom-6 left-1/2 md:-translate-x-1/2 flex items-center justify-center gap-4">
                                <button 
                                    onClick={handlePrevSlide}
                                    className="cursor-pointer w-10 h-10 border-2 border-gray-400 rounded-[14px] bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 active:scale-95 transition-colors duration-300"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <div className="flex gap-2">
                                    {sectionData.images.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${
                                                currentSlide === index ? 'bg-yellow-400' : 'bg-gray-400'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <button 
                                    onClick={handleNextSlide}
                                    className="cursor-pointer w-10 h-10 border-2 border-gray-400 rounded-[14px] bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 active:scale-95 transition-colors duration-300"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </RevealOnView>
            </div>
        </div>
    );
};

export default AIEcosystem;
