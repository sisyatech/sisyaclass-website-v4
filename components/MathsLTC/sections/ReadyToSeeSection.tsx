"use client";

import React from "react";

type ReadyToSeeSectionProps = {
  onBookDemo: () => void;
};

export default function ReadyToSeeSection({ onBookDemo }: ReadyToSeeSectionProps) {
  return (
    <section className="pb-6 md:pb-10 pt-0 bg-white flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-xl md:text-2xl font-semibold text-[#374151] mb-6">
        Ready to See How Your Child Performs?
      </h2>
      <button
        onClick={onBookDemo}
        className="bg-[#ffd500] text-black font-bold py-4 px-10 rounded-2xl text-lg md:text-xl shadow-md hover:bg-[#ffdf33] transition-colors"
      >
        Get Demo @19
      </button>
    </section>
  );
}
