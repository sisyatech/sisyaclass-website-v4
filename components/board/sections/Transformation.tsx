"use client";

import React from "react";

type TransformationSectionProps = {
    onRegister: () => void;
};

export default function TransformationSection({ onRegister }: TransformationSectionProps) {
    return (
        <section className="relative w-full bg-[#01317A] text-white">
            <div className="mx-auto w-full max-w-[1440px] min-h-[140px] py-6 md:h-[223px] md:py-0 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-12 md:gap-20 px-4 sm:px-6 md:px-8">
                {/* Text Content */}
                <div className="text-center md:text-left">
                    <h2 className="mb-2 font-bold text-[22px] leading-[28px] tracking-normal text-white sm:text-[28px] sm:leading-[34px] md:text-[38px] md:leading-[46.67px]">
                        You've Tried Tuition.
                        <br />
                        Now Try Transformation!
                    </h2>
                    <p className="text-white font-semibold text-[14px] leading-[1.6] tracking-normal sm:text-[16px] sm:leading-[1.7] md:text-[20px] md:leading-[1.8]">
                        Your child deserves the IIT-level guidance
                    </p>
                </div>

                {/* Button */}
                <button
                    onClick={onRegister}
                    className="w-full max-w-[280px] mx-auto sm:max-w-none sm:w-[180px] md:w-[200px] lg:w-[220px] xl:w-[233px] h-[44px] sm:h-[42px] md:h-[44px] rounded-[11px] bg-[#FFE100] text-black font-roboto font-medium text-[15px] sm:text-[15px] md:text-[16px] xl:text-[17.46px] leading-[18.15px] tracking-[0.03em] text-center cursor-pointer hover:bg-[#FFED4E] transition-colors duration-200 flex-shrink-0 flex items-center justify-center"
                >
                    Book 3 Demos @ ₹19
                </button>
            </div>
        </section>
    );
}

