"use client";

import React from "react";
import { motion } from "framer-motion";

const columns = [
    {
        title: "Vedic Maths",
        subtitle: "[Fun + Speed + Confidence]",
        headerBg: "bg-[#ffeceb]",
        titleColor: "text-[#d63a3a]",
        subtitleColor: "text-[#d63a3a]",
        items: [
            "300+ Mental calculation techniques",
            "Daily 3 minute speed challenges",
            "Real-life applications",
        ],
    },
    {
        title: "Coding & Robotics",
        subtitle: "[Logic + Creativity + Future Skills]",
        headerBg: "bg-[#e1eaff]",
        titleColor: "text-[#3a56d6]",
        subtitleColor: "text-[#3a56d6]",
        items: [
            "Scratch / Tinker Cad",
            "Mini projects every week",
            "Storytelling through code",
        ],
    },
    {
        title: "Brain Development Classes",
        subtitle: "",
        headerBg: "bg-[#fff7d1]",
        titleColor: "text-[#a88a00]",
        subtitleColor: "text-[#a88a00]",
        items: [
            "Memory improvement techniques",
            "Focus & attention training",
            "Observation & recall games",
        ],
    },
    {
        title: "Olympiads (IMO, NSO, etc.)",
        subtitle: "[Concepts + Logic + Exam Excellence]",
        headerBg: "bg-[#d1ffeb]",
        titleColor: "text-[#008a4f]",
        subtitleColor: "text-[#008a4f]",
        items: [
            "Concept-first learning",
            "Previous year questions + HOTS",
            "Weekly Olympiad Challenges",
        ],
    },
    {
        title: "Spoken English",
        subtitle: "[Confidence + Communication + Clarity]",
        headerBg: "bg-[#e1f5ff]",
        titleColor: "text-[#006ca8]",
        subtitleColor: "text-[#006ca8]",
        items: [
            "Vocabulary and sentence framing",
            "Pronunciation & fluency drills",
            "Confidence & Personality Building",
        ],
    },
];

export default function SkillsConfidenceSection() {
    return (
        <section className="py-12 md:py-20 px-4 bg-[#f8fbff]">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-3xl lg:text-4xl font-black text-[#1a2439] text-center mb-10 md:mb-16"
                >
                    We&apos;ll Build Skills & Confidence All While Having Fun!
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
                    {columns.map((col, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{
                                y: -10,
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                                transition: { duration: 0.3 }
                            }}
                            className="flex flex-col rounded-3xl overflow-hidden border border-white/50 bg-white shadow-lg transition-all max-w-[280px] sm:max-w-none mx-auto w-full"
                        >
                            {/* Header */}
                            <div className={`${col.headerBg} p-5 flex flex-col items-center justify-center text-center min-h-[100px] md:min-h-[120px]`}>
                                <motion.h3
                                    whileHover={{ scale: 1.05 }}
                                    className={`${col.titleColor} font-black text-base md:text-lg mb-1`}
                                >
                                    {col.title}
                                </motion.h3>
                                {col.subtitle && (
                                    <p className={`${col.subtitleColor} text-[9px] md:text-[10px] font-bold uppercase tracking-wider`}>
                                        {col.subtitle}
                                    </p>
                                )}
                            </div>

                            {/* Items */}
                            <div className="flex flex-col flex-1">
                                {col.items.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: (idx * 0.1) + (i * 0.1) }}
                                        className="p-4 md:p-5 flex items-center justify-center text-center border-t border-gray-100 min-h-[70px] md:min-h-[85px] last:border-b-0"
                                    >
                                        <p className="text-[#4a5568] text-xs md:text-sm font-semibold leading-relaxed">
                                            {item}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
