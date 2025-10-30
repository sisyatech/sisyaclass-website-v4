"use client";

import React from "react";
import Image from "next/image";

type HeroSectionProps = {
  onRegister: () => void;
};

export default function HeroSection({ onRegister }: HeroSectionProps) {
  return (
    <section className="bg-[#01317a] text-white relative overflow-hidden py-10 md:py-12 min-h-[520px] md:min-h-[600px]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-stretch gap-6 min-h-[500px] relative px-4">
        <div className="flex-1 p-0 md:p-4 flex flex-col justify-center text-center md:text-left">
          <h2 className="text-2xl md:text-[3rem] md:leading-[4rem] font-bold mb-1">IIT/NIT Educators. 24/7 AI Support</h2>
          <h1 className="text-3xl md:text-[3em] md:leading-[4rem] font-bold mb-6">Just @ ₹19 to Begin</h1>
          <h2 className="font-bold text-lg md:text-[1.7rem] md:leading-8 mb-6">Maths | EVS | English | Physics | Chemistry</h2>
          <h2 className="font-bold text-base md:text-[1.7rem] md:leading-8 mb-6 rounded-[5px] border border-[#eeeeee] p-[5px] text-center w-full md:w-[60%] max-w-[420px] mx-auto md:mx-0">
            Class 1-10 Online Classes
          </h2>
          <ul className="mt-4 space-y-[0.6rem]">
            <li>✅ Diwali Offer - Flat 50% Off On All Courses</li>
            <li>✅ CBSE, ICSE &amp; State Boards Covered</li>
            <li>✅ Choose Between 1 PM To 9 PM</li>
            <li>✅ Choose between Crash Course and All-In-One Course</li>
          </ul>
          <div className="mt-4 mb-6 flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              className="inline-flex items-center justify-center font-semibold text-[1.125rem] leading-[1.2] rounded-lg cursor-pointer z-10 min-w-[180px] h-[52px] px-9 bg-[#ffd500] text-black"
              onClick={onRegister}
            >
              Get 3 Days Demo @19
            </button>
          </div>
        </div>

        <div className="flex-1 md:absolute md:right-0 md:bottom-0 md:h-full md:w-1/2 flex justify-center items-center pointer-events-none mt-4 md:mt-0">
          <Image
            src="/10x/girl-image.svg"
            alt="Hero Illustration"
            width={380}
            height={380}
            className="w-3/4 max-w-xs md:max-w-none md:w-auto"
          />
          <Image
            className="hidden md:block absolute w-[70px] object-contain pointer-events-none top-[10%] left-[10%]"
            src="/10x/book-icon.png"
            alt="Book Icon"
            width={70}
            height={70}
            style={{ animation: "float 3s ease-in-out infinite" }}
          />
          <Image
            className="hidden md:block absolute w-[70px] object-contain pointer-events-none bottom-[20%] right-[5%]"
            src="/10x/flask-icon.png"
            alt="Flask Icon"
            width={70}
            height={70}
            style={{ animation: "float 4s ease-in-out infinite 1s" as any }}
          />
          <Image
            className="hidden md:block absolute w-[70px] object-contain pointer-events-none top-[15%] right-[8%]"
            src="/10x/microscope-hand.png"
            alt="Microscope hand Icon"
            width={70}
            height={70}
            style={{ animation: "rotateFloat 5s ease-in-out infinite" }}
          />
        </div>
      </div>
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0); }
        }
        @keyframes rotateFloat {
          0% { transform: rotate(0deg) translateY(0); }
          50% { transform: rotate(5deg) translateY(-8px); }
          100% { transform: rotate(0deg) translateY(0); }
        }
      `}</style>
    </section>
  );
}


