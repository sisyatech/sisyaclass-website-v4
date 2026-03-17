"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type WhyStartEarlyProps = {
  onEnroll: () => void;
};

const cards = [
  {
    title: "Strong Exposure to STEM Learning",
    icon: "/jee_foundation/gifs/gif-1.gif",
  },
  {
    title: "Critical Thinking Development",
    icon: "/jee_foundation/gifs/gif-2.gif",
  },
  {
    title: "Builds Confidence for Olympiads & NTSE",
    icon: "/jee_foundation/gifs/gif-3.gif",
  },
  {
    title: "Better JEE Rank with Early Prep",
    icon: "/jee_foundation/gifs/gif-4.gif",
  },
];

export default function WhyStartEarly({ onEnroll }: WhyStartEarlyProps) {
  return (
    <section className="bg-white py-16 px-4 font-roboto">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[28px] md:text-[45px] font-bold text-[#002B71] mb-8 md:mb-12 tracking-[0.45px] leading-tight"
        >
          Why Start Early for JEE?
        </motion.h2>

        <div className="grid grid-cols-2 lg:flex lg:flex-wrap justify-items-center justify-center gap-4 md:gap-6 mb-12 md:mb-16">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="w-full max-w-[165px] h-[180px] md:w-[200px] md:h-[200px] bg-[#E8F1FF] rounded-[24px] shadow-sm flex flex-col items-center justify-center p-3 hover:shadow-md transition-shadow shrink-0"
            >
              <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] mb-2 relative overflow-hidden rounded-[12px]">
                <Image
                  src={card.icon}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[14px] md:text-[18px] font-normal text-black leading-[1.2] max-w-[190px]">
                {card.title}
              </h3>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6">
          <p className="italic font-bold text-[#002B71] text-[18px] md:text-[24px] tracking-[0.24px] leading-tight px-4">
            Start now to be 2 steps ahead by of your friends
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnroll}
            className="w-[216px] h-[44px] bg-[#FFE100] text-black font-bold rounded-[11px] shadow hover:bg-[#F2D600] transition-colors text-[16px]"
          >
            Enroll Now
          </motion.button>
        </div>
      </div>
    </section>
  );
}
