"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TransformationJourney() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-[40px] font-bold text-[#1a1a1a] mb-12 px-4 leading-tight tracking-tight"
        >
          Here&apos;s How To Transform Your Child&apos;s Learning
        </motion.h2>

        <div className="relative w-full flex justify-center">
          {/* Desktop/Tablet View */}
          <div className="hidden md:block w-full max-w-[1080px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image 
                src="/jee_foundation/bicpic.png" 
                alt="Transformation Journey Desktop" 
                width={1200}
                height={800}
                className="w-full h-auto drop-shadow-md"
                priority
              />
            </motion.div>
          </div>

          {/* Mobile View */}
          <div className="block md:hidden w-full max-w-[600px]">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Image 
                src="/jee_foundation/formobile.png" 
                alt="Transformation Journey Mobile" 
                width={600}
                height={1200}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
