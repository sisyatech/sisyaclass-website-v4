"use client";

import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Pick your subject",
    description:
      "Choose from 6 subjects. See exactly what's included and what it costs.",
  },
  {
    number: "2",
    title: "Attend a demo class",
    description:
      "One full class. See how your child responds to the teaching.",
  },
  {
    number: "3",
    title: "Enroll only when you're sure",
    description:
      "Monthly program. No long-term contract. Cancel anytime.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#F5F7FA] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-3xl md:text-5xl font-bold text-[#1C2B2A] mb-14"
        >
          How it works?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#083B8C] rounded-[24px] p-8 text-center min-h-[180px] flex flex-col items-center justify-center"
            >
              {/* Number Circle */}
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4">
                <span className="text-[#083B8C] text-3xl font-bold">
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-white text-xl font-bold mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-white text-base leading-relaxed max-w-[240px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
<HowItWorks />