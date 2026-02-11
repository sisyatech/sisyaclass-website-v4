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

                <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#d43f21" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onTap}
                    className="bg-[#eb4d2d] text-white px-8 py-3 rounded-full font-bold text-base md:text-lg shadow-lg mb-10 md:mb-16 cursor-pointer"
                >
                    Tap To Learn From IIT Teachers
                </motion.button>

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
                    {[
                        { val: "10,000+", label: "Live Streaming Hours" },
                        { val: "98%", label: "The Choice of Parents" },
                        { val: "1000+", label: "IIT & NIT Crafted Sessions" }
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.1, color: "#eb4d2d" }}
                            className="flex flex-col items-center text-center cursor-default"
                        >
                            <span className="text-[#eb4d2d] text-3xl md:text-5xl font-black mb-2">{stat.val}</span>
                            <p className="text-[#4a5568] font-bold text-xs md:text-sm">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
