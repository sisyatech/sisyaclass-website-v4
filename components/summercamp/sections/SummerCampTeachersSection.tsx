"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface SummerCampTeachersSectionProps {
    onTap?: () => void;
}

export default function SummerCampTeachersSection({ onTap }: SummerCampTeachersSectionProps) {
    return (
        <section className="py-12 md:py-20 px-4 bg-[#f8fbff]">
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                <h2 className="text-[#008be2] font-bold text-center text-lg md:text-xl mb-4">
                    Tap To Learn From The Best
                </h2>

                <button
                    onClick={onTap}
                    className="bg-[#eb4d2d] text-white px-8 py-3 rounded-full font-bold text-base md:text-lg shadow-lg mb-10 md:mb-16 hover:bg-[#d43f21] transition-all active:scale-95 cursor-pointer"
                >
                    Tap To Learn From IIT Teachers
                </button>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="w-full max-w-2xl mx-auto mb-10 md:mb-16"
                >
                    <Image
                        src="/summercamp/Frame 7 (4).png"
                        alt="Teachers"
                        width={600}
                        height={300}
                        className="w-full h-auto"
                    />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
                    <div className="flex flex-col items-center text-center">
                        <span className="text-[#eb4d2d] text-3xl md:text-5xl font-black mb-2">10,000+</span>
                        <p className="text-[#4a5568] font-bold text-xs md:text-sm">Live Streaming Hours</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <span className="text-[#eb4d2d] text-3xl md:text-5xl font-black mb-2">98%</span>
                        <p className="text-[#4a5568] font-bold text-xs md:text-sm">The Choice of Parents</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <span className="text-[#eb4d2d] text-3xl md:text-5xl font-black mb-2">1000+</span>
                        <p className="text-[#4a5568] font-bold text-xs md:text-sm">IIT & NIT Crafted Sessions</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
