"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type AdvantageCard = {
  title: string;
  description: string;
  icon: string;
};

type AdvantageZone = {
  name: string;
  tagline: string;
  bgColor: string;
  titleColor: string;
  cards: AdvantageCard[];
};

const advantageZones: AdvantageZone[] = [
  {
    name: "Where concepts become confidence — fast",
    tagline: "",
    bgColor: "bg-[#E9F2FE]",
    titleColor: "text-[#01317A]",
    cards: [
      {
        title: "Smart Algebra Tricks",
        description: "",
        icon: "/jee_foundation/a+b.png",
      },
      {
        title: "Visual Trigonometry",
        description: "",
        icon: "/jee_foundation/sin.png",
      },
    ],
  },
  {
    name: "Build IIT + Olympiad Strength, Brick by Brick",
    tagline: "",
    bgColor: "bg-[#D4F7DC]",
    titleColor: "text-[#1C4031]",
    cards: [
      {
        title: "Board + JEE Foundation",
        description: "",
        icon: "/jee_foundation/list.png",
      },
      {
        title: "Olympiad-Ready Thinking",
        description: "",
        icon: "/jee_foundation/box.png",
      },
    ],
  },
  {
    name: "Smart Learning = Sharp Competition",
    tagline: "",
    bgColor: "bg-[#FFE5D0]",
    titleColor: "text-[#5A2F1F]",
    cards: [
      {
        title: "Learn how toppers save 20+ mins in exams — and score higher",
        description: "",
        icon: "/jee_foundation/cup.png",
      },
      {
        title: "This isn't tuition. This is the first step to cracking JEE early.",
        description: "",
        icon: "/jee_foundation/star2.png",
      },
    ],
  },
];

type AdvantagesGridProps = {
  onStartJourney: () => void;
};

export default function AdvantagesGrid({ onStartJourney }: AdvantagesGridProps) {
  return (
    <section className="bg-white py-16 px-4 font-roboto">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-3xl md:text-5xl font-bold text-[#1a1a1a] mb-16 leading-tight max-w-[800px] mx-auto px-4"
        >
          What Your Child Will Learn In 1 Hour Masterclass
        </motion.h2>

        <div className="space-y-12 md:space-y-16">
          {advantageZones.map((zone, zIdx) => (
            <div key={zIdx} className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center">
              {/* Zone Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-[350px] shrink-0"
              >
                <h3 className={`text-2xl md:text-3xl lg:text-[28px] font-bold ${zone.titleColor} leading-tight text-center lg:text-right`}>
                  {zone.name}
                </h3>
              </motion.div>

              {/* Cards Grid - Forced 2 columns */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-[460px] lg:max-w-[480px]">
                {zone.cards.map((card, cIdx) => (
                  <motion.div
                    key={cIdx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: cIdx * 0.1 }}
                    viewport={{ once: true }}
                    className={`${zone.bgColor} p-4 md:p-6 rounded-[32px] flex flex-col items-center text-center min-h-[220px] md:min-h-[250px] w-full group hover:shadow-xl transition-all duration-300 justify-center`}
                  >
                    <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] mb-4 flex items-center justify-center relative bg-white/50 rounded-2xl p-2 group-hover:scale-110 transition-transform">
                      <Image
                        src={card.icon}
                        alt={card.title}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                    <h4 className={`text-[13px] md:text-[15px] font-bold ${zone.titleColor === 'text-[#5A2F1F]' ? 'text-[#854d0e]' : zone.titleColor} leading-tight px-1`}>
                      {card.title}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
