"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type WhyStartEarlyProps = {
  onEnroll: () => void;
};

const cards = [
  {
    title: "Feels overwhelmed by JEE-level maths",
    icon: "/jee_foundation/gifs/gif-1.gif",
  },
  {
    title: "Struggles with algebra and equations",
    icon: "/jee_foundation/gifs/gif-2.gif",
  },
  {
    title: "Wants to compete in IIT-JEE",
    icon: "/jee_foundation/gifs/gif-3.gif",
  },
  {
    title: "Loses marks due to careless mistakes",
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
          className="text-[28px] md:text-[40px] font-bold text-[#1a1a1a] mb-8 md:mb-12 tracking-tight leading-tight"
        >
          Is Your Child Facing These Challenges?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center justify-center gap-6 mb-12 md:mb-16">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="w-full max-w-[280px] min-h-[220px] bg-[#E8F1FF] rounded-[24px] shadow-sm flex flex-col items-center justify-center p-6 hover:shadow-lg transition-all group"
            >
              <div className="w-[100px] h-[100px] mb-4 relative overflow-hidden rounded-2xl bg-white p-2 shadow-sm group-hover:scale-110 transition-transform">
                <Image
                  src={card.icon}
                  alt={card.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-[16px] md:text-[18px] font-medium text-[#2d2d2d] leading-[1.3]">
                {card.title}
              </h3>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto">
          <p className="italic font-bold text-[#2d2d2d] text-lg md:text-xl tracking-tight leading-relaxed px-4 opacity-90">
            Most students don't fall behind in JEE prep due to intelligence — but due to a lack of speed, clarity, and the right mentor.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnroll}
            className="bg-[#ffd500] hover:bg-[#e6c100] text-black font-bold py-3 px-12 rounded-xl text-lg md:text-xl shadow-lg transition-all"
          >
            Enroll Now
          </motion.button>
        </div>
      </div>
    </section>
  );
}
