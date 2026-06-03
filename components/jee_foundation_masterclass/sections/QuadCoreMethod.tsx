"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function QuadCoreMethod() {
  return (
    <section className="bg-[#f8fbff] pt-12 md:pt-8 pb-0 px-4 overflow-hidden">
      <div className="max-w-[1200px] mx-auto text-center">
        {/* Real Text Header Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block bg-[#01317a] text-white px-8 md:px-16 py-3 md:py-4 rounded-full text-xl md:text-3xl font-bold shadow-lg mb-6"
        >
          Quad Core Teaching Method
        </motion.div>

        {/* Real Text Subheading */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[#01317a] text-lg md:text-2xl lg:text-[28px] font-bold mb-8 md:mb-10"
        >
          It is like a perfect blend of AI & Expert Guidance
        </motion.h3>

        {/* Info Graphic Container - Clean centered cropping */}
        <div className="flex justify-center -mb-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full max-w-[800px] aspect-[1.8] overflow-hidden rounded-2xl"
          >
            <div className="absolute inset-0 top-[-20%] flex justify-center items-center">
              <Image
                src="/jee_foundation/aiteacher.png"
                alt="Teaching Method Diagram"
                width={1200}
                height={1200}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
