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
    name: "Where speed meets smart\nthinking — instantly",
    tagline: "Where speed meets smart thinking — instantly",
    bgColor: "bg-[#E8F1FF]",
    titleColor: "text-[#003179]",
    cards: [
      {
        title: "Square Tricks Made Simple",
        description: "Square 2, 3 & 4-digit numbers in seconds — no pen, no panic.",
        icon: "/vadic-maths/grid/grid-1.svg",
      },
      {
        title: "Cube Any Number Quickly",
        description: "Learn the fastest way to cube any 2-digit number mentally.",
        icon: "/vadic-maths/grid/grid-2.svg",
      },
      {
        title: "Smart Subtractions",
        description: "Tricks to subtract from 100, 1000, 10000 — with 100% accuracy.",
        icon: "/vadic-maths/grid/grid-3.svg",
      },
    ],
  },
  {
    name: "Multiplication is where the\nmagic begins",
    tagline: "Multiplication is where the magic begins",
    bgColor: "bg-[#E2F9E9]",
    titleColor: "text-[#1C4031]",
    cards: [
      {
        title: "Multiply by 11, 99, 999",
        description: "Master the sandwich method and shortcut multipliers — no long steps.",
        icon: "/vadic-maths/grid/grid-4.svg",
      },
      {
        title: "Nikhilam & Urdhva Tiryak",
        description: "Ancient Vedic methods to multiply faster than a calculator.",
        icon: "/vadic-maths/grid/grid-5.svg",
      },
      {
        title: "Best Friend & Double Niner",
        description: "Fun tricks to play with 9s and speed up your calculations.",
        icon: "/vadic-maths/grid/grid-6.svg",
      },
    ],
  },
  {
    name: "Olympiad skills begin with\nsharp techniques",
    tagline: "Olympiad skills begin with sharp techniques",
    bgColor: "bg-[#FFEBDC]",
    titleColor: "text-[#5A2F1F]",
    cards: [
      {
        title: "Butterfly for Fractions",
        description: "Compare any fractions visually — no need for LCM.",
        icon: "/vadic-maths/grid/grid-7.svg",
      },
      {
        title: "Divisibility Hacks",
        description: "2, 3, 4, 5... all the way to 19 — in just 5 minutes.",
        icon: "/vadic-maths/grid/grid-8.svg",
      },
      {
        title: "Dice, Triangles & Squares",
        description: "Learn to count shapes and understand visual maths questions.",
        icon: "/vadic-maths/grid/grid-9.svg",
      },
    ],
  },
  {
    name: "Logic must meet speed",
    tagline: "Logic must meet speed",
    bgColor: "bg-[#FFE6F2]",
    titleColor: "text-[#6B009E]",
    cards: [
      {
        title: "Left-to-Right Addition",
        description: "A powerful way to solve sums faster than traditional right-to-left method.",
        icon: "/vadic-maths/grid/grid-10.svg",
      },
      {
        title: "Zeroes in Factorials",
        description: "A trick to count how many zeroes end 100! — and beyond.",
        icon: "/vadic-maths/grid/grid-11.svg",
      },
      {
        title: "Factors & Remainders Made Easy",
        description: "Understand how to find factors and remainders when dividing by 9.",
        icon: "/vadic-maths/grid/grid-12.svg",
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
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-2xl md:text-3xl lg:text-[45px] font-bold text-[#1e293b] mb-8 md:mb-16 leading-tight max-w-[900px] mx-auto px-4"
        >
          What Your Child Will Learn In Vedic<br /> Maths Course
        </motion.h2>

        <div className="space-y-16">
          {advantageZones.map((zone, zIdx) => (
            <div key={zIdx} className="flex flex-col lg:flex-row gap-6 md:gap-10 items-start justify-center">
              {/* Zone Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-[320px] pt-15 shrink-0 flex flex-col items-center lg:items-end"
              >
                <h3 className={`text-xl md:text-2xl lg:text-[24px] font-bold ${zone.titleColor} mb-1 lg:mb-2 leading-tight text-center lg:text-right whitespace-pre-line`}>
                  {zone.name}
                </h3>
              </motion.div>

              {/* Cards Grid */}
              <div className="flex flex-wrap gap-4 md:gap-6 justify-center md:justify-start lg:max-w-[800px] lg:pl-6">
                {zone.cards.map((card, cIdx) => (
                  <motion.div
                    key={cIdx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: cIdx * 0.1 }}
                    viewport={{ once: true }}
                    className={`${zone.bgColor} p-4 rounded-[22px] flex flex-col items-center text-center min-h-[210px] w-[210px] group hover:shadow-md transition-shadow shrink-0 py-5 gap-1`}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 mb-3 flex items-center justify-center">
                        <Image
                          src={card.icon}
                          alt={card.title}
                          width={64}
                          height={64}
                          className="object-contain"
                        />
                      </div>
                      <h4 className="text-[15px] font-bold text-[#002B71] mb-1 leading-tight px-1">
                        {card.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-black leading-[1.3] opacity-90 group-hover:opacity-100 transition-opacity">
                      {card.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          <button
            onClick={onStartJourney}
            className="bg-[#FFE100] hover:bg-[#F2D600] text-black font-extrabold py-3.5 px-10 rounded-xl text-base md:text-lg lg:text-[18px] transition-transform active:scale-95 shadow-lg shadow-black/10"
          >
            Start Vedic Maths Journey Today
          </button>
        </motion.div>
      </div>
    </section>
  );
}
