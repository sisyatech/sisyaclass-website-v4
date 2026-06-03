"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type ComparisonSectionProps = {
  onEnroll: () => void;
};

export default function ComparisonSection({ onEnroll }: ComparisonSectionProps) {
  const rows = [
    { feature: "IIT/NIT Teachers?", sisya: true, others: false },
    { feature: "25+ Tricks Covered?", sisya: true, others: false },
    { feature: "Live Classes?", sisya: true, others: false },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-[1000px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-2xl md:text-4xl font-bold text-[#1a1a1a] mb-12 px-4"
        >
          We&apos;re Sure 10,000% Your Kid&apos;ll Love This! Here&apos;s Why.
        </motion.h2>

        {/* Comparison Container */}
        <div className="flex flex-col items-center">
          {/* Table Header Bar */}
          <div className="w-full bg-[#01317a] py-3 px-6 md:px-12 rounded-[14px] flex items-center justify-between text-white font-bold text-sm md:text-lg lg:text-xl shadow relative z-10">
            <div className="flex-1 md:flex-[1.8] text-left uppercase tracking-wider">Feautures</div>
            <div className="flex-1 text-center">SISYA CLASS</div>
            <div className="flex-1 text-center">Others</div>
          </div>

          {/* Table Body - Narrower and more compact */}
          <div className="w-[94%] bg-[#EBF4FF] rounded-b-[16px] overflow-hidden -mt-2 pt-4 shadow-sm border-x border-b border-blue-50">
            {rows.map((row, idx) => (
              <div 
                key={idx} 
                className={`flex items-center justify-between py-3.5 px-6 md:px-12 ${idx !== rows.length - 1 ? 'border-b border-white' : ''}`}
              >
                <div className="flex-1 md:flex-[1.8] text-left font-bold text-[#1a1a1a] text-sm md:text-base lg:text-lg">
                  {row.feature}
                </div>
                
                {/* SISYA Column */}
                <div className="flex-1 flex justify-center items-center border-l border-white h-7">
                  <Image 
                    src="/jee_foundation/correct.png" 
                    alt="Correct" 
                    width={32} 
                    height={32}
                    className="w-6 h-6 md:w-8 md:h-8 object-contain"
                  />
                </div>

                {/* Others Column */}
                <div className="flex-1 flex justify-center items-center border-l border-white h-7">
                  <Image 
                    src="/jee_foundation/wrong.png" 
                    alt="Wrong" 
                    width={32} 
                    height={32}
                    className="w-6 h-6 md:w-8 md:h-8 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex items-center justify-center gap-4 mt-12 transition-all">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnroll}
            className="bg-[#ffd500] hover:bg-yellow-400 text-[#01317a] font-black py-4 px-10 md:px-14 rounded-2xl text-lg md:text-2xl shadow-xl transition-all"
          >
            Enroll For Rs 19 Only
          </motion.button>
          <Image
            src="/jee_foundation/click 2.png"
            alt="Click Icon"
            width={60}
            height={60}
            className="w-10 h-10 md:w-16 md:h-16 object-contain hidden md:block"
          />
        </div>
      </div>
    </section>
  );
}
