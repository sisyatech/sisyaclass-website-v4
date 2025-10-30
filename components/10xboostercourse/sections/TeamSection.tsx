"use client";
import React from "react";
import Image from "next/image";

type TeamSectionProps = { onRegister: () => void };

export default function TeamSection({ onRegister }: TeamSectionProps) {
  return (
    <section className="text-center py-0 px-4 bg-white" id="team">
      <div className="mb-4 inline-flex items-center gap-2 mx-auto">
        <button className="bg-[#fdda00] text-black font-semibold border-0 py-3 px-5 rounded-lg text-sm md:text-xs cursor-pointer shadow-[0_2px_6px_rgba(0,0,0,0.1)]" onClick={onRegister}>
          Have Your Child Experience SISYA AI
        </button>
        <Image src="/10x/down-arrow.gif" alt="Click Icon" width={44} height={44} className="h-full max-h-11" />
      </div>
      <h2 className="text-[2.5rem] mb-6 text-[#1a1a1a] mt-6">Our Team</h2>
      <div className="max-w-[600px] mx-auto">
        <Image src="/10x/team_sisy.svg" alt="SISYA Team Group Photo" width={600} height={400} className="w-full h-auto rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)]" />
      </div>
    </section>
  );
}


