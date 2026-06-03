"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TrustBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-[650px] mx-auto bg-white border border-[#e0e7ff] rounded-[32px] py-8 px-12 shadow-sm mt-8 mb-12 flex items-center justify-center gap-12 sm:gap-20"
    >
      {/* Left Item: IIT Teachers */}
      <div className="flex flex-col items-center text-center min-w-[140px]">
        <Image
          src="/jee_foundation/star.png"
          alt="IIT Teachers Icon"
          width={80}
          height={80}
          className="mb-4 object-contain h-14 w-auto"
        />
        <h4 className="text-[#5b4dcf] font-bold text-xl mb-1">IIT Teachers</h4>
        <p className="text-black font-semibold text-sm">10K+ Hrs Experience</p>
      </div>

      {/* Vertical Divider */}
      <div className="hidden sm:block w-[1.5px] h-24 bg-[#5b4dcf]/20"></div>

      {/* Right Item: 50 Seats */}
      <div className="flex flex-col items-center text-center min-w-[140px]">
        <Image
          src="/jee_foundation/chair.png"
          alt="50 Seats Icon"
          width={80}
          height={80}
          className="mb-4 object-contain h-14 w-auto"
        />
        <h4 className="text-[#5b4dcf] font-bold text-xl mb-1">50 Seats</h4>
        <p className="text-black font-semibold text-sm">Only</p>
      </div>
    </motion.div>
  );
}
