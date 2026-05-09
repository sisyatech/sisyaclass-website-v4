"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type WhyStartEarlyProps = {
  onEnroll: () => void;
};

const cards = [
  {
    title: "Makes silly calculation mistakes",
    icon: "/vedic-maths/gifs/gif-1.gif",
  },
  {
    title: "Has lost confidence in maths",
    icon: "/vedic-maths/gifs/gif-2.gif",
  },
  {
    title: "Builds Confidence for Olympiads & NTSE",
    icon: "/vedic-maths/gifs/gif-3.gif",
  },
  {
    title: "Takes too long to solve simple problems",
    icon: "/vedic-maths/gifs/gif-4.gif",
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
          className="text-[28px] md:text-[45px] font-bold text-[#1e293b] mb-8 md:mb-12 tracking-[0.45px] leading-tight"
        >
          Is Your Child Facing These Challenges?
        </motion.h2>

        <div className="grid grid-cols-2 lg:flex lg:flex-wrap justify-items-center justify-center gap-4 md:gap-6 mb-12 md:mb-16">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="w-full h-[220px] md:w-[260px] md:h-[260px] bg-[#E8F1FF] rounded-[24px] shadow-sm flex flex-col items-center justify-center p-6 hover:shadow-md transition-shadow shrink-0"
            >
              <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] mb-4 relative bg-white rounded-2xl flex items-center justify-center">
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <p className="text-[#0f172a] font-medium text-sm md:text-lg leading-snug">
                {card.title}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg md:text-2xl font-bold text-[#1e293b] mb-10 max-w-4xl mx-auto italic leading-tight"
          >
            You&apos;re not alone. 6 out of 10 kids struggle with maths not because of concepts — but because of speed &amp; confidence.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnroll}
            className="bg-[#ffd500] text-black font-bold py-2 px-12 rounded-xl shadow-lg text-lg hover:bg-[#ffdf33] transition-colors"
          >
            Enroll Now
          </motion.button>
        </div>
      </div>
    </section>
  );
}
