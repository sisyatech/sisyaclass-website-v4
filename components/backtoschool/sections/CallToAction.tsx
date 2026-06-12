"use client";

import React from "react";

interface CallToActionProps {
  onBookDemo: () => void;
}

export default function CallToAction({ onBookDemo }: CallToActionProps) {
  return (
    <section className="py-12 md:py-16 bg-white flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-[#000000] text-[1.2rem] sm:text-[1.5rem] md:text-[2rem] font-medium mb-6">
        Ready to See How Your Child Performs?
      </h2>
      <button
        onClick={onBookDemo}
        className="bg-[#ffd500] text-black font-semibold text-[0.9rem] sm:text-[1.1rem] md:text-[1.25rem] py-2 sm:py-3 px-6 sm:px-10 rounded-xl shadow-md hover:shadow-lg transition-all"
      >
        Book a Demo @19
      </button>
    </section>
  );
}
