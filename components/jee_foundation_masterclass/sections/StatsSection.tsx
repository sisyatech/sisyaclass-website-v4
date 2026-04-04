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
      className="relative bg-white py-12 px-8 rounded-[26px] max-w-[1150px] mx-auto mt-10 border border-[#e0e7ff] min-h-[180px] z-0 shadow-sm"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="w-full lg:w-[30%] flex flex-col items-center lg:items-start">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-bold text-xl md:text-2xl lg:text-[1.65rem] text-[#01317a] text-center lg:text-left mb-4 flex items-center gap-2"
          >
            Know How To Prepare For IIT!
            <motion.div
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex-shrink-0"
            >
              <Image
                src="/10x/brain.svg"
                alt="Brain Icon"
                width={28}
                height={28}
                className="w-7 h-7"
              />
            </motion.div>
          </motion.h2>

          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-3 group"
          >
            <button className="bg-[#ffd500] hover:bg-yellow-400 text-[#01317a] font-bold px-6 py-2 rounded-xl shadow-md transition-all text-sm md:text-base whitespace-nowrap">
              Choose Your Grade
            </button>
            <Image
              src="/10x/point.svg"
              alt="Pointer Icon"
              width={40}
              height={40}
              className="w-10 transition-transform group-hover:translate-x-1 grayscale"
            />
          </motion.div>
        </div>

        <div className="w-full lg:w-[65%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {[
            { grade: 1, status: "Sold Out", type: "soldout" },
            { grade: 2, status: "Sold Out", type: "soldout" },
            { grade: 3, status: "Sold Out", type: "soldout" },
            { grade: 4, status: "Sold Out", type: "soldout" },
            { grade: 5, status: "Sold Out", type: "soldout" },
            { grade: 6, status: "77% Sold", type: "available" },
            { grade: 7, status: "77% Sold", type: "available" },
            { grade: 8, status: "77% Sold", type: "available" },
            { grade: 9, status: "86% Sold", type: "available" },
            { grade: 10, status: "75% Sold", type: "available" },
            { grade: 11, status: "Sold Out", type: "soldout" },
            { grade: 12, status: "Sold Out", type: "soldout" },
          ].map((item, idx) => (
            <motion.button
              key={item.grade}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.02 }}
              whileHover={item.type === "available" ? { scale: 1.05 } : {}}
              onClick={() => item.type === "available" && onChooseClass(item.grade.toString())}
              className={`
                flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all border border-gray-100 shadow-sm
                ${item.type === "soldout"
                  ? "bg-[#dadada] text-white opacity-70 cursor-not-allowed grayscale"
                  : "bg-[#6b5ae0] text-white hover:bg-[#5a49c9] cursor-pointer"}
              `}
            >
              <h3 className="font-bold text-sm md:text-base">Class {item.grade}</h3>
              <p className="text-[8px] md:text-[10px] font-medium uppercase opacity-90">({item.status})</p>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

