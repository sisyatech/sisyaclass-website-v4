"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type HeroSectionProps = {
  onRegister: () => void;
};

type Placement = "left" | "center" | "right";

const CARDS = [
  { id: "math", src: "/3worksheet/left_.svg", alt: "Math worksheet preview" },
  { id: "science", src: "/3worksheet/center_.svg", alt: "Science worksheet preview" },
  { id: "chemistry", src: "/3worksheet/right_.svg", alt: "Chemistry worksheet preview" },
];

const DESKTOP_PLACEMENT_STYLES: Record<Placement, { x: number; rotate: number; scale: number; zIndex: number }> = {
  left: { x: -120, rotate: -10, scale: 0.94, zIndex: 10 },
  center: { x: 0, rotate: 0, scale: 1, zIndex: 30 },
  right: { x: 120, rotate: 10, scale: 0.94, zIndex: 20 },
};

const MOBILE_PLACEMENT_STYLES: Record<Placement, { x: number; rotate: number; scale: number; zIndex: number }> = {
  left: { x: -85, rotate: -8, scale: 0.96, zIndex: 10 },
  center: { x: 0, rotate: 0, scale: 1, zIndex: 30 },
  right: { x: 85, rotate: 8, scale: 0.96, zIndex: 20 },
};

export default function HeroSection({ onRegister }: HeroSectionProps) {
  const [placements, setPlacements] = useState<Placement[]>(["left", "center", "right"]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlacements((prev) => [prev[1], prev[2], prev[0]]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateMatch = () => setIsMobile(mediaQuery.matches);
    updateMatch();
    mediaQuery.addEventListener("change", updateMatch);
    return () => mediaQuery.removeEventListener("change", updateMatch);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#01327A] text-white">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 translate-x-1/4 bg-[radial-gradient(circle_at_center,_rgba(0,119,255,0.35),_rgba(1,50,122,0))] blur-3xl lg:block" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-0 px-4 py-10 sm:gap-12 sm:py-16 lg:flex-row lg:items-stretch lg:py-20">
        <div className="w-full max-w-xl text-center lg:w-1/2 lg:text-left">
          <h1 className="font-montserrat mx-auto max-w-none text-[1.7rem] leading-[1.05] font-bold text-white sm:text-[2.3rem] lg:mx-0 lg:text-[3rem]">
            <span className="block whitespace-nowrap">Get 3 Worksheets Designed By</span>
            <span className="block whitespace-nowrap">IIT Teachers for ₹29</span>
          </h1>

        

          <ul className="mx-auto mt-6 flex w-full max-w-xl flex-col items-center gap-3 text-sm text-white sm:text-base lg:items-start">
            <li className="flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-white" />
              Suitable For CBSE, ICSE &amp; State Boards
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-white" />
              Class 1 - 5: 2 Maths &amp; 1 EVS
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-white" />
              Class 6 - 10: 1 Maths, 1 Physics &amp; 1 Chemistry
            </li>
          </ul>

          <button
            onClick={onRegister}
            className="mt-8 inline-flex h-[52px] min-w-[220px] cursor-pointer items-center justify-center rounded-[12px] bg-[#FFD500] px-8 text-base font-semibold text-[#0B2B68] shadow-lg transition-transform duration-200 hover:scale-[1.02] hover:bg-[#FFE24D] active:scale-[0.98]"
          >
            Tap To Download Worksheets
          </button>
        </div>

        <div className="relative flex w-full max-w-lg justify-center lg:w-1/2">
          <div className="relative h-[300px] w-full max-w-[360px] sm:h-[420px] sm:max-w-[560px]">
            {CARDS.map((card, index) => {
              const placement = placements[index];
              const target = (isMobile ? MOBILE_PLACEMENT_STYLES : DESKTOP_PLACEMENT_STYLES)[placement];
              return (
                <motion.div
                  key={card.id}
                  className="absolute bottom-0 left-1/2 w-[58%] -translate-x-1/2 origin-bottom sm:w-[40%]"
                  animate={{ x: target.x, rotate: target.rotate, scale: target.scale }}
                  whileHover={
                    placement === "center"
                      ? { scale: 1.03 }
                      : placement === "left"
                      ? { rotate: target.rotate - 2, scale: 0.92 }
                      : { rotate: target.rotate + 2, scale: 0.92 }
                  }
                  style={{ zIndex: target.zIndex }}
                  transition={{ type: "spring", stiffness: 200, damping: 24 }}
                >
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={card.src}
                      alt={card.alt}
                      fill
                      priority
                      className="object-contain drop-shadow-[0_26px_48px_rgba(0,0,0,0.35)]"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/10 to-transparent" />
    </section>
  );
}