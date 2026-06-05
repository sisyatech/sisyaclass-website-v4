"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lightbulb, 
  Calculator, 
  FlaskConical, 
  Atom, 
  Beaker, 
  Code, 
  Code2,
  Microscope
} from "lucide-react";

type StatsSectionProps = {
  onChooseSubject: (subjectName: string, defaultClass: string) => void;
};

const subjects = [
  {
    name: "Spoken English",
    icon: Lightbulb,
    price: "₹6,999/year",
    grades: "Grades 1–10",
    frequency: "2 Classes/Week",
    quote: `"For the child who scores well in English but hesitates to speak."`,
    bullets: [
      "Weekly 1-to-1 speaking session",
      "Real conversation practice — not grammar drills",
      "Confidence you can hear in 30 days"
    ],
    defaultClass: "6",
  },
  {
    name: "Maths",
    icon: Calculator,
    price: "₹9,999/year",
    grades: "Grades 1–10",
    frequency: "3days/Week • 12 classes/month",
    quote: `"For the child who puts in the effort but still loses marks"`,
    bullets: [
      "Daily & weekly tests + homework support",
      "Class recordings included",
      "Study materials - no extra cost"
    ],
    defaultClass: "6",
  },
  {
    name: "Science",
    icon: Microscope,
    price: "₹4,999/year",
    grades: "Grades 1–5",
    frequency: "2 Classes/Week",
    quote: `"For the curious child whose questions deserve real answers."`,
    bullets: [
      "Weekly 1-to-1 special class",
      "Curiosity-led concept teaching",
      "CBSE & ICSE aligned"
    ],
    defaultClass: "6",
  },
  {
    name: "Physics",
    icon: Atom,
    price: "₹4,999/year",
    grades: "Grades 6–10",
    frequency: "2 Classes/Week",
    quote: `"For the child who reads chapters but still can't crack the paper."`,
    bullets: [
      "Weekly 1-to-1 special class",
      "Concept-first teaching by IIT/NIT teacher",
      "Regular performance tracking"
    ],
    defaultClass: "8",
  },
  {
    name: "Chemistry",
    icon: FlaskConical,
    price: "₹4,999/year",
    grades: "Grades 6–10",
    frequency: "2 Classes/Week",
    quote: `"For the child stuck on organic - or confused by reactions."`,
    bullets: [
      "Weekly 1-to-1 special class",
      "Chapter-wise doubt cleaning",
      "Test performance tracking"
    ],
    defaultClass: "8",
  },
  {
    name: "Coding & Robotics",
    icon: Code2,
    price: "₹7,999/year",
    grades: "Grades 1–10",
    frequency: "2 Classes/Week",
    quote: `"For the child who should be building the future - not just watching it."`,
    bullets: [
      "Weekly 1-to-1 special class",
      "Real projects from Day 1 - games, animations, robots",
      "Block coding + introductory robotics"
    ],
    defaultClass: "6",
  }
];

export default function StatsSection({ onChooseSubject }: StatsSectionProps) {
  const [activeSubject, setActiveSubject] = useState(subjects[0].name);

  const currentSubject = subjects.find((s) => s.name === activeSubject) || subjects[0];

  return (
    <section className="bg-white py-12 px-4 md:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-[28px] md:text-[38px] font-bold text-[#0A387E] mb-8">
          Choose your child's subject
        </h2>

        {/* Subject Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
          {subjects.map((sub) => {
            const SubIcon = sub.icon;
            const isActive = sub.name === activeSubject;
            return (
              <button
                key={sub.name}
                onClick={() => setActiveSubject(sub.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-[13px] md:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#0A387E] text-white border-[#0A387E] shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <SubIcon className="w-4 h-4 shrink-0" />
                <span>{sub.name}</span>
              </button>
            );
          })}
        </div>

        {/* Card Component */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSubject}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-[24px] border border-slate-100 shadow-md overflow-hidden"
            >
              {/* Card Header */}
              <div className="bg-[#0A387E] px-6 py-4 md:px-8 md:py-5 flex justify-between items-center">
                <span className="text-white text-lg md:text-2xl font-bold">
                  {currentSubject.name}
                </span>
                <span className="text-yellow-300 text-lg md:text-2xl font-bold">
                  {currentSubject.price}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-6 md:p-8 flex flex-col">
                <div className="text-[#0A387E] font-semibold text-sm md:text-base mb-3">
                  {currentSubject.grades} • {currentSubject.frequency}
                </div>

                <div className="text-slate-800 italic text-sm md:text-base mb-6 font-medium">
                  {currentSubject.quote}
                </div>

                <ul className="space-y-3 mb-8">
                  {currentSubject.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-800 text-sm md:text-base font-medium">
                      <span className="text-[#0A387E] font-bold text-lg leading-none">✓</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onChooseSubject(currentSubject.name, currentSubject.defaultClass)}
                    className="bg-[#FFE100] text-black font-bold py-3 px-12 md:px-16 rounded-xl shadow hover:bg-[#F2D600] transition-colors text-base md:text-lg cursor-pointer"
                  >
                    Book A Demo @ ₹9
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
