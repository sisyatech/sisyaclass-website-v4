"use client";
import React from "react";
import Image from "next/image";

type PromoSectionProps = { onRegister: () => void };

export default function PromoSection({ onRegister }: PromoSectionProps) {
  return (
    <section className="text-center p-5">
      <div className="relative inline-block">
        <Image src="/10x/child.svg" alt="Mother and Child Studying" className="max-w-full w-[600px] block" width={400} height={400} />
        <div className="absolute top-[6%] md:top-[10%] left-1/2 transform -translate-x-1/2 bg-[#ffd700] text-black py-1.5 px-3 md:py-2.5 md:px-5 rounded-[5px] font-bold text-xs md:text-sm cursor-pointer inline-block shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-colors hover:bg-[#ffed4e] whitespace-nowrap" onClick={onRegister}>
          Try Now for ₹19 - Limited Time
        </div>
      </div>
    </section>
  );
}


