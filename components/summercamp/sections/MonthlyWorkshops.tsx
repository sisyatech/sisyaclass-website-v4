"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const items = [
    {
        title: "Coding",
        icon: "/summercamp/mw1.svg",
        roundedClass: "rounded-xl rounded-tl-[20px] rounded-br-[40px] md:rounded-tl-[30px] md:rounded-br-[50px]",
        textClass: "text-[10px] pr-8 text-right md:text-left md:text-xl md:p-0 md:pl-4 md:font-bold",
        iconWrapperClass: "relative w-6 h-6 ml-2 md:w-12 md:h-12 md:mr-8 md:ml-0",
        layout: "text-left",
    },
    {
        title: "Robotics",
        icon: "/summercamp/mw2.svg",
        roundedClass: "rounded-xl rounded-tr-[20px] rounded-bl-[40px] md:rounded-tr-[30px] md:rounded-bl-[50px]",
        textClass: "text-[10px] pl-8 text-left md:text-right md:text-xl md:p-0 md:pr-4 order-1 md:order-2",
        iconWrapperClass: "relative w-6 h-6 mr-2 md:w-12 md:h-12 md:ml-8 md:mr-0 order-2 md:order-1",
        layout: "text-right",
    },
    {
        title: "Vedic Maths +\nOlympiad\nClasses",
        icon: "/summercamp/mw3.svg",
        roundedClass: "rounded-xl rounded-bl-[20px] rounded-tr-[40px] md:rounded-bl-[30px] md:rounded-tr-[50px]",
        textClass: "text-[9px] pr-8 text-right md:text-left md:text-lg md:p-0 md:pl-4 md:font-bold whitespace-pre-line leading-tight",
        iconWrapperClass: "relative w-6 h-6 ml-2 md:w-10 md:h-10 md:mr-8 md:ml-0",
        layout: "text-left",
    },
    {
        title: "Brain\nDevelopment\nClasses",
        icon: "/summercamp/mw4.svg",
        roundedClass: "rounded-xl rounded-br-[20px] rounded-tl-[40px] md:rounded-br-[30px] md:rounded-tl-[50px]",
        textClass: "text-[9px] pl-8 text-left md:text-right md:text-lg md:p-0 md:pr-4 whitespace-pre-line leading-tight order-1 md:order-2",
        iconWrapperClass: "relative w-6 h-6 mr-2 md:w-10 md:h-10 md:ml-8 md:mr-0 order-2 md:order-1",
        layout: "text-right",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function MonthlyWorkshops() {
    return (
        <section className="bg-white py-6 md:py-12 px-2 md:px-4">
            <div className="max-w-3xl mx-auto relative cursor-default">
                {/* Main Grid Container */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 gap-1.5 md:gap-3"
                >
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            className={`bg-[#002f6c] rounded-xl ${item.roundedClass} p-2 md:p-3 h-20 md:h-28 flex ${item.layout === 'text-left' ? 'flex-row-reverse md:flex-row' : ''} items-center justify-between md:justify-around relative overflow-hidden group border-2 border-white`}
                        >
                            {/* For text-left layout (Coding, Vedic Maths) */}
                            {item.layout === "text-left" && (
                                <>
                                    <h3 className={`text-white ${item.textClass}`}>{item.title}</h3>
                                    <div className={item.iconWrapperClass}>
                                        <Image
                                            src={item.icon}
                                            alt={item.title.replace(/\n/g, " ")}
                                            fill
                                            className="object-contain invert brightness-0"
                                        />
                                    </div>
                                </>
                            )}

                            {/* For text-right layout (Robotics, Brain Development) */}
                            {item.layout === "text-right" && (
                                <>
                                    <div className={item.iconWrapperClass}>
                                        <Image
                                            src={item.icon}
                                            alt={item.title.replace(/\n/g, " ")}
                                            fill
                                            className="object-contain invert brightness-0"
                                        />
                                    </div>
                                    <h3 className={`text-white ${item.textClass}`}>{item.title}</h3>
                                </>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Center Circle Overlay */}
                <motion.div
                    initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
                    whileInView={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{
                        type: "spring", stiffness: 260, damping: 20, delay: 0.3,
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    viewport={{ once: true }}
                    className="flex absolute top-1/2 left-1/2 w-24 h-24 md:w-36 md:h-36 bg-white rounded-full items-center justify-center shadow-lg border-4 border-white z-10"
                >
                    <div className="w-full h-full rounded-full flex flex-col items-center justify-center p-2 md:p-3 border-2 border-[#002f6c]">
                        <div className="relative w-6 h-6 md:w-10 md:h-10 mb-0.5 md:mb-1">
                            <Image src="/summercamp/mwmid.svg" alt="Workshops" fill className="object-contain" />
                        </div>
                        <div className="text-center">
                            <p className="text-[#002f6c] font-bold text-[8px] md:text-sm leading-tight mb-0.5">Monthly Workshops</p>
                            <p className="text-[#333] text-[6px] md:text-[9px] leading-tight">Featured: Coding and Robotics</p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}


