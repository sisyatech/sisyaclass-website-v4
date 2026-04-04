"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function OurTeam() {
  return (
    <section className="bg-white py-10 md:py-5 px-4 overflow-hidden">
      <div className="max-w-[1280px] mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl lg:text-[45px] font-bold text-[#1a1a1a] mb-12"
        >
          Our Team
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-[850px] mx-auto"
        >
          <Image
            src="/jee_foundation/sisyagroup.png"
            alt="Sisya Our Team Group"
            width={1100}
            height={600}
            className="w-full h-auto object-contain"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
