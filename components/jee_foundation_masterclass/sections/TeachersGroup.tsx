"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TeachersGroup() {
  return (
    <section className="bg-white py-16 md:py-24 px-4 overflow-hidden">
      <div className="max-w-[1280px] mx-auto text-center">
        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl lg:text-[45px] font-bold text-[#1a1a1a] mb-4"
        >
          Learn with IIT/NIT Educators
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[#01317a] text-lg md:text-2xl lg:text-[26px] font-medium mb-16"
        >
          Give your child the advantage of learning from the best
        </motion.p>

        {/* Group Presentation - Direct Image without card background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-[850px] mx-auto"
        >
          <Image
            src="/jee_foundation/techergroup.png"
            alt="IIT/NIT Educators Group"
            width={1000}
            height={600}
            className="w-full h-auto object-contain"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
