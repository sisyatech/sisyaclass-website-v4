"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type StatsSectionProps = {
  onChooseClass: (grade: string) => void;
};

export default function StatsSection({ onChooseClass }: StatsSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative bg-white py-12 px-8 rounded-[26px] max-w-[1150px] mx-auto mt-[-20px] md:mt-[-60px] border border-[#e0e7ff] min-h-[180px] z-10 shadow-lg"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="w-full md:basis-[36%] md:w-auto">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-bold text-[1.75rem] leading-tight md:text-[2.5rem] md:leading-[2.8rem] text-[#003179] text-center md:text-left"
          >
            Learn 300+ Tricks In Just 30 hours!
          </motion.h2>
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 mt-4"
          >
            <span className="bg-[#ffd500] text-black font-bold px-4 py-2 rounded-md shadow whitespace-nowrap">
              Choose A Class To Enroll
            </span>
            <Image
              src="/10x/point.svg"
              alt="Pointer Icon"
              className="w-14 rotate-90 md:rotate-0"
              width={56}
              height={56}
            />
          </motion.div>
        </div>
        <div className="w-full md:basis-[60%] grid grid-cols-3 gap-3 md:grid-cols-4">
          {[1, 2].map((grade, idx) => (
            <motion.button
              key={grade}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className="text-white font-medium mt-0 py-1.5 px-2 rounded-[10px] min-h-[42px] w-full flex flex-col justify-center items-center text-center md:py-2 md:min-h-[48px] opacity-60 grayscale cursor-not-allowed shadow-md"
              style={{ background: "linear-gradient(135deg, #d2d2d2, #ada29f)" }}
            >
              <div className="text-xs md:text-lg font-bold">Class {grade}</div>
              <span className="text-[9px] md:text-[10px]">
                <span>(Sold Out)</span>
              </span>
            </motion.button>
          ))}
          {[3, 4, 5, 6, 7, 8, 9, 10].map((grade, idx) => (
            <motion.button
              key={grade}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.05, backgroundColor: "#6358db" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#6358db] text-white border-0 py-1.5 px-2 font-bold rounded-[10px] cursor-pointer text-sm min-h-[42px] w-full flex flex-col justify-center items-center text-center leading-[1.2] transition-colors md:py-2 md:text-lg md:min-h-[48px] shadow-lg shadow-indigo-200"
              onClick={() => onChooseClass(grade.toString())}
            >
              Class {grade}
            </motion.button>
          ))}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55 }}
            className="text-white font-medium mt-0 py-1.5 px-2 rounded-[10px] min-h-[42px] w-full flex flex-col justify-center items-center text-center md:py-2 md:min-h-[48px] opacity-60 grayscale cursor-not-allowed shadow-md"
            style={{ background: "linear-gradient(135deg, #d2d2d2, #ada29f)" }}
          >
            <div className="text-xs md:text-lg font-bold">Class 11</div>
            <span className="text-[9px] md:text-[10px]">
              <span>(Sold Out)</span>
            </span>
          </motion.button>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-white font-medium mt-0 py-1.5 px-2 rounded-[10px] min-h-[42px] w-full flex flex-col justify-center items-center text-center md:py-2 md:min-h-[48px] opacity-60 grayscale cursor-not-allowed shadow-md"
            style={{ background: "linear-gradient(135deg, #d2d2d2, #ada29f)" }}
          >
            <div className="text-xs md:text-lg font-bold">Class 12</div>
            <span className="text-[9px] md:text-[10px]">
              <span>(Sold Out)</span>
            </span>
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}

