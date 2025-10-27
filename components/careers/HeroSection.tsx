"use client"; 

import React from "react";
// Assuming TypingAnimation is correctly imported and works
import { TypingAnimation } from "../ui/typing-animation";

export const HeroSection = () => (
  // Adjusted height for mobile: h-[80vh] min-h-[450px], kept sm+ heights
  <div className="relative flex h-[80vh] min-h-[450px] items-center justify-center px-4 text-center text-white sm:h-[70vh] sm:min-h-[500px]">
    <div
      className="absolute inset-0 bg-cover bg-center"
      // Ensure this image path is correct relative to your public folder
      style={{ backgroundImage: "url('/about/grouppic.png')" }}
    ></div>
    <div className="absolute inset-0 bg-black/60"></div>
    <div className="relative z-10 max-w-4xl">
      {/* Adjusted heading font sizes for mobile */}
      <h1 className="text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-7xl lg:whitespace-nowrap">
        <TypingAnimation duration={50} delay={0}>
          Shape Your Future at SISYA
        </TypingAnimation>
      </h1>

      {/* Adjusted paragraph font size for mobile */}
      <p className="mx-auto mt-6 max-w-3xl text-base text-gray-200 sm:text-lg md:text-xl">
        We're looking for passionate, innovative individuals to join our mission. Help us build the
        most loved and effective learning platform for students everywhere.
      </p>
      {/* Adjusted button padding/text size for mobile AND reduced top margin */}
      <a
        href="#open-positions"
        // Changed mt-10 to mt-8
        className="mt-8 inline-block transform rounded-full bg-blue-600 px-6 py-2.5 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700 sm:px-8 sm:py-3 sm:text-lg"
      >
        View Open Positions
      </a>
    </div>
  </div>
);

export default HeroSection;