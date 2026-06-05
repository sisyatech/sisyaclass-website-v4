"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const cards = [
  {
    title: (
      <>
        IIT/NIT qualified
        <br />
        teachers
      </>
    ),
    description: (
      <>
        Topper-quality
        <br />
        teaching, subject-wise
      </>
    ),
    icon: "/individualsubjectLP/iitnit.png",
  },
  {
    title: (
      <>
        Weekly 1-to-1
        <br />
        session
      </>
    ),
    description: (
      <>
        Just your child and
        <br />
        their teacher
      </>
    ),
    icon: "/individualsubjectLP/weekly1to1.png",
  },
  {
    title: (
      <>
        Pay only for 1
        <br />
        subject
      </>
    ),
    description: (
      <>
        No fully-package
        <br />
        pressure. From ₹4,999
      </>
    ),
    icon: "/individualsubjectLP/Books.png",
  },
  {
    title: (
      <>
        Tests, recordings &
        <br />
        materials
      </>
    ),
    description: (
      <>
        Everything included.
        <br />
        No surprises.
      </>
    ),
    icon: "/individualsubjectLP/exam.png",
  },
];

export default function WhyStartEarly() {
  const [selectedCard, setSelectedCard] = useState(0);

  return (
    <section className="bg-[#f8fafc] py-16 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-3xl md:text-[38px] font-bold text-[#0A387E] mb-12"
        >
          Why SISYA?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              onClick={() => setSelectedCard(idx)}
              className={`w-full max-w-[250px] min-h-[260px] rounded-[24px] flex flex-col items-center p-6 text-center cursor-pointer transition-all duration-300 hover:shadow-md ${
                selectedCard === idx
                  ? "bg-[#DCEEFF] border-2 border-[#1B9CFF] shadow-md"
                  : "bg-[#E9F2FE] border border-transparent"
              }`}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-white rounded-[16px] flex items-center justify-center mb-6 shadow-sm">
                <img
                  src={card.icon}
                  alt="icon"
                  className="w-8 h-8 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-[18px] font-bold text-[#0A387E] leading-tight mb-4">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-[15px] text-slate-800 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}