"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type FeatureItem = {
    title: string;
    imageSrc: string;
};

const features: FeatureItem[] = [
    {
        title: "60+ Hours Of Live Classes",
        imageSrc: "/summercamp/icon/1.svg",
    },
    {
        title: "Get 60+ Free Digital Worksheets",
        imageSrc: "/summercamp/icon/2.svg",
    },
    {
        title: "Ten 1-1 special classes by IIT experts",
        imageSrc: "/summercamp/icon/5.svg",
    },
    {
        title: "24/7 AI Doubt Solving / AI Quizes",
        imageSrc: "/summercamp/icon/6.svg",
    },
    {
        title: "Get Detailed Performance Insights of students",
        imageSrc: "/summercamp/icon/7.svg",
    },
    {
        title: "Certification of completion",
        imageSrc: "/summercamp/icon/3.svg",
    },
    {
        title: "Dedicated Academic Mentor",
        imageSrc: "/summercamp/icon/4.svg",
    },
    {
        title: "SISYA Coins",
        imageSrc: "/summercamp/icon/10.svg",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TopperBatchSection() {
    return (
        <section className="py-12 md:py-20 px-4 bg-white relative overflow-hidden">
            {/* Floating Balloons */}
            <motion.div
                initial={{ y: 20 }}
                animate={{ y: -20 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none"
            >
                <Image src="/summercamp/Group (2).png" alt="balloon" width={100} height={150} className="object-contain" />
            </motion.div>

            <motion.div
                initial={{ y: -20 }}
                animate={{ y: 20 }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="absolute right-10 top-1/3 hidden xl:block pointer-events-none"
            >
                <Image src="/summercamp/Group (3).png" alt="balloon" width={80} height={120} className="object-contain scale-x-[1] opacity-80" />
            </motion.div>

            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-[#1A2439] font-montserrat text-3xl md:text-5xl font-bold mb-4"
                    >
                        Here&apos;s What You Get In SISYA&apos;s Summer Camp
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-[#556A8E] font-medium text-sm md:text-base opacity-80"
                    >
                        Apart From A Promise That Your Child Will Learn Something New Every Single Day
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap justify-center gap-3 md:gap-8"
                >
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className={`
                                bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] border-2 border-transparent
                                hover:border-[#2196F3] py-4 px-3 md:py-8 md:px-6 flex flex-col items-center justify-between text-center 
                                transition-all duration-300 w-full lg:w-[220px] min-h-[160px] md:min-h-[220px]
                                ${idx === 0 ? 'border-[#2196F3]' : ''}
                            `}
                        >
                            <div className="mb-3 md:mb-6 relative w-10 h-10 md:w-16 md:h-16 flex-shrink-0">
                                <Image
                                    src={feature.imageSrc}
                                    alt={feature.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <p className="text-[#1A2439] font-bold text-sm md:text-base leading-snug">
                                {feature.title}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
