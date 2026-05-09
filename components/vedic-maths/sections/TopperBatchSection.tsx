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
        title: "500+ Hours Of Live Classes",
        imageSrc: "/ltc/icon/1.svg",
    },
    {
        title: "2 Months Free Revision Classes",
        imageSrc: "/ltc/icon/2.svg",
    },
    {
        title: "2 Months Free Summer Camp",
        imageSrc: "/ltc/icon/3.svg",
    },
    {
        title: "Monthly Workshops",
        imageSrc: "/ltc/icon/4.svg",
    },
    {
        title: "Four 1-1 special classes by IIT experts/month",
        imageSrc: "/ltc/icon/5.svg",
    },
    {
        title: "24/7 AI Doubt Solving / AI Quizes",
        imageSrc: "/ltc/icon/6.svg",
    },
    {
        title: "Get Detailed Performance Insights of students",
        imageSrc: "/ltc/icon/7.svg",
    },
    {
        title: "Advanced Study Material prepared by IITians",
        imageSrc: "/ltc/icon/8.svg",
    },
    {
        title: "Dedicated Academic Mentor",
        imageSrc: "/ltc/icon/9.svg",
    },
    {
        title: "SISYA Coins",
        imageSrc: "/ltc/icon/10.svg",
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
        <section className="py-8 md:py-12 px-4 bg-gradient-to-b from-white to-blue-50/50">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8 md:mb-10">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-[#1A2439] font-montserrat text-lg md:text-2xl font-bold mb-2"
                    >
                        Here&apos;s What You Get In SISYA&apos;s Topper Batch
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-[#556A8E] font-medium text-[11px] md:text-xs"
                    >
                        Apart From A Promise That Your Child Will Score 90% In Finals*
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4"
                >
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 py-4 px-2 md:py-6 md:px-3 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow duration-300 min-h-[110px] md:min-h-[140px]"
                        >
                            <div className="mb-3 relative w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
                                <Image
                                    src={feature.imageSrc}
                                    alt={feature.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <p className="text-[#1A2439] font-semibold text-[10px] md:text-xs leading-tight w-full">
                                {feature.title}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
