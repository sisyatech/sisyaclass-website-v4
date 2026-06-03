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
    name: "Classroom Zone",
    tagline: "Where the journey begins – the right way.",
    bgColor: "bg-[#E9F2FE]",
    titleColor: "text-[#01317A]",
    cards: [
      {
        title: "Structured PCM Curriculum",
        description: "Learn Physics, Chemistry & Maths with clarity, depth & a roadmap to IIT.",
        icon: "/jee_foundation/grid/grid-1.svg",
      },
      {
        title: "Live Classes by IITians",
        description: "Train with the best — every concept taught by those who've cracked IIT-JEE themselves.",
        icon: "/jee_foundation/grid/grid-2.svg",
      },
      {
        title: "Recorded Access Anytime",
        description: "Never miss a class. Learn, revise, and re-learn on your own schedule.",
        icon: "/jee_foundation/grid/grid-3.svg",
      },
    ],
  },
  {
    name: "Mastery Zone",
    tagline: "Practice isn't optional. It's everything.",
    bgColor: "bg-[#D4F7DC]",
    titleColor: "text-[#1C4031]",
    cards: [
      {
        title: "Mock Tests + PYQs",
        description: "Solve real exam-level problems. Track where you stand, and how to level up.",
        icon: "/jee_foundation/grid/grid-4.svg",
      },
      {
        title: "Live Quizzes & HOTs Discussions",
        description: "Boost retention & problem-solving with concept-challenging practice sessions.",
        icon: "/jee_foundation/grid/grid-5.svg",
      },
      {
        title: "DPPs, Olympiad & NTSE Edge",
        description: "Practice daily. Improve consistently. Go beyond JEE. Strengthen your base for national-level excellence.",
        icon: "/jee_foundation/grid/grid-6.svg",
      },
    ],
  },
  {
    name: "Support Zone",
    tagline: "Because no one should face JEE prep alone.",
    bgColor: "bg-[#FFE5D0]",
    titleColor: "text-[#5A2F1F]",
    cards: [
      {
        title: "1:1 Mentor Guidance",
        description: "Every question matters. Get answers from real mentors and AI – instantly.",
        icon: "/jee_foundation/grid/grid-7.svg",
      },
      {
        title: "SISYA IIT-JEE Learning Community",
        description: "Never study alone. Be part of a driven, supportive peer group.",
        icon: "/jee_foundation/grid/grid-8.svg",
      },
      {
        title: "Digital Study Material",
        description: "All notes, formulas, and resources available in one tap — wherever you go.",
        icon: "/jee_foundation/grid/grid-9.svg",
      },
    ],
  },
  {
    name: "Success Zone",
    tagline: "Because results speak louder than intent.",
    bgColor: "bg-[#FFE5D0]",
    titleColor: "text-[#6B009E]",
    cards: [
      {
        title: "Bi-Weekly/Monthly Test",
        description: "Regular Tests will be conducted to assess students understanding and progress.",
        icon: "/jee_foundation/grid/grid-10.svg",
      },
      {
        title: "Performance Tracking",
        description: "See your progress. Fix your weakness. Accelerate your journey to IIT.",
        icon: "/jee_foundation/grid/grid-11.svg",
      },
      {
        title: "All India Test Series",
        description: "Compete nationwide. Know where you stand before JEE does.",
        icon: "/jee_foundation/grid/grid-12.svg",
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
          className="text-center text-2xl md:text-3xl lg:text-[45px] font-bold text-[#002B71] mb-8 md:mb-16 leading-tight max-w-[800px] mx-auto px-4"
        >
          12 Advantages That You Get With SISYA Online JEE Classes
        </motion.h2>

        <div className="space-y-16">
          {advantageZones.map((zone, zIdx) => (
            <div key={zIdx} className="flex flex-col lg:flex-row gap-6 md:gap-10 items-start justify-center">
              {/* Zone Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-full lg:w-[200px] pt-4 shrink-0"
              >
                <h3 className={`text-xl md:text-2xl lg:text-[40px] font-black ${zone.titleColor} mb-1 lg:mb-2 leading-tight text-center lg:text-right whitespace-nowrap lg:whitespace-normal`}>
                  {zone.name.split(' ')[0]}{" "}
                  <span className="lg:block">{zone.name.split(' ')[1]}</span>
                </h3>
                <p className={`italic ${zone.titleColor} opacity-70 text-xs sm:text-sm md:text-base lg:text-[16px] font-medium leading-normal text-center lg:text-right`}>
                  {zone.tagline}
                </p>
              </motion.div>

              {/* Cards Grid */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start lg:max-w-[700px]">
                {zone.cards.map((card, cIdx) => (
                  <motion.div
                    key={cIdx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: cIdx * 0.1 }}
                    viewport={{ once: true }}
                    className={`${zone.bgColor} p-4 rounded-[22px] flex flex-col items-center text-center min-h-[210px] w-[210px] group hover:shadow-md transition-shadow shrink-0 justify-between py-5`}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 mb-2 flex items-center justify-center">
                        <Image
                          src={card.icon}
                          alt={card.title}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                      <h4 className="text-[15px] font-bold text-[#002B71] mb-1.5 leading-tight px-1">
                        {card.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-black leading-[1.3] opacity-90 group-hover:opacity-100 transition-opacity flex-1 flex items-center">
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
            Start Your JEE Journey Today
          </button>
        </motion.div>
      </div>
    </section>
  );
}
