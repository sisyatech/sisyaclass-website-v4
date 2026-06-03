"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ReadyToSeeSectionProps {
    onBookDemo: () => void;
}

export default function ReadyToSeeSection({ onBookDemo }: ReadyToSeeSectionProps) {
    return (
        <section className="py-12 md:py-20 px-4 bg-[#f8fbff] overflow-hidden relative">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                {/* Left Balloon */}
                <motion.div
                    initial={{ y: 10 }}
                    animate={{ y: -10 }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    className="hidden sm:block"
                >
                    <Image
                        src="/summercamp/Group (2).png"
                        alt="Red Balloon"
                        width={100}
                        height={150}
                        className="object-contain"
                    />
                </motion.div>

                {/* Center Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center"
                >
                    <motion.h2
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="text-2xl md:text-3xl lg:text-4xl font-black text-[#1a2439] mb-8"
                    >
                        Ready to See How Your Child Performs?
                    </motion.h2>
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(235, 77, 45, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onBookDemo}
                        className="bg-[#eb4d2d] text-white font-bold text-lg md:text-xl py-3 px-10 rounded-xl shadow-[0_4px_10px_rgba(235,77,45,0.3)] transition-colors border-b-4 border-[#b53a22]"
                    >
                        Get 3 Demos @ ₹19
                    </motion.button>
                </motion.div>

                {/* Right Balloon */}
                <motion.div
                    initial={{ y: -10 }}
                    animate={{ y: 10 }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    className="hidden sm:block"
                >
                    <Image
                        src="/summercamp/Group (3).png"
                        alt="Blue Balloon"
                        width={100}
                        height={150}
                        className="object-contain"
                    />
                </motion.div>
            </div>
        </section>
    );
}
