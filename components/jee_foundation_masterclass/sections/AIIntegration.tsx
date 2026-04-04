"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type AIIntegrationProps = {
  onTryAI: () => void;
};

export default function AIIntegration({ onTryAI }: AIIntegrationProps) {
  const images = [
    "/jee_foundation/pic1.png",
    "/jee_foundation/pic2.png",
    "/jee_foundation/pic3.png",
    "/jee_foundation/pic4.png",
  ];

  return (
    <section className="bg-white py-16 md:py-24 px-4 overflow-hidden">
      <div className="max-w-[1280px] mx-auto text-center">
        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl lg:text-[45px] font-bold text-[#1a1a1a] mb-16"
        >
          Only Edtech with AI Integrated
        </motion.h2>

        {/* Mockups Row - Horizontally scrollable on mobile */}
        <div className="flex overflow-x-auto md:flex-wrap md:justify-center items-end gap-5 md:gap-4 lg:gap-8 mb-16 pb-6 md:pb-0 scrollbar-hide snap-x snap-mandatory px-4 md:px-0">
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="w-[240px] sm:w-[280px] md:w-[220px] lg:w-[260px] flex-shrink-0 snap-center relative transition-transform duration-300"
            >
              <Image
                src={src}
                alt={`AI Phone Mockup ${idx + 1}`}
                width={300}
                height={600}
                className="w-full h-auto drop-shadow-2xl rounded-[32px]"
                priority={idx === 0}
              />
            </motion.div>
          ))}
        </div>

        {/* Description Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-[1000px] mx-auto mb-14"
        >
          <p className="text-[#01317a] font-bold text-xl md:text-2xl lg:text-[28px] leading-tight md:leading-snug">
            Our AI helps Grades 1–10 solve academic questions via text, image, or speech, offering accurate, personalized answers based on their grade and curriculum
          </p>
        </motion.div>

        {/* Button with Click Icon */}
        <div className="flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={onTryAI}
            className="bg-[#ffd500] hover:bg-yellow-400 text-black font-extrabold py-4 px-10 md:px-14 rounded-2xl text-xl md:text-2xl lg:text-[26px] shadow-xl transition-all relative z-10"
          >
            Try SISYA's AI in Action
          </motion.button>

          <Image
            src="/jee_foundation/click 2.png"
            alt="Click Icon"
            width={60}
            height={60}
            className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain hidden md:block"
          />
        </div>
      </div>
    </section>
  );
}
