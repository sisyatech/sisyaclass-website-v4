import React from "react";
import Image from "next/image";

export default function CompareSection() {
  const rows = [
    "Includes Coding & Robotics",
    "Live Sessions with IIT/NIT Mentors",
    "AI Chatbot for Instant Doubt Help",
    "Real-Time Feedback & Performance Tracking",
    "Personalized Mentorship (Quadcore Model)",
    "Practice Worksheets + Regular Homework",
    "Certificate + Discounts on Future Courses",
  ];
  return (
    <section className="text-center p-8 px-4" id="sisya-compare-section">
      <h2 className="text-[1.6rem] text-black mb-8 leading-[2.5rem] md:text-[1.3rem] md:leading-normal">
        Why Settle for Less? Choose SISYA<br />Where Smart Learning Begins @ Just ₹19!
      </h2>

      <div className="max-w-[800px] mx-auto bg-[#eaf3ff] rounded-xl overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr_1fr] p-4 border-b border-[#d0e0f0] items-center justify-items-center bg-[#003087] text-white font-semibold">
          <div>Features</div>
          <div>SISYA CLASS</div>
          <div>Others</div>
        </div>
        {rows.map((label) => (
          <div key={label} className="grid grid-cols-[2fr_1fr_1fr] p-4 border-b border-[#d0e0f0] items-center justify-items-center">
            <div>{label}</div>
            <div><Image src="/10x/tick.svg" alt="Yes" width={24} height={24} /></div>
            <div><Image src="/10x/cross.svg" alt="No" width={24} height={24} /></div>
          </div>
        ))}
      </div>

      <div className="mt-8 inline-flex items-center gap-2 mx-auto">
        <a href="#team"><button className="bg-[#ffd500] text-black border-0 py-3 px-6 font-semibold text-base rounded-lg cursor-pointer h-full">Checkout Our Demo Lecture</button></a>
        <Image className="h-full max-h-12 object-contain" src="/10x/down-arrow.gif" alt="Click Icon" width={48} height={48} />
      </div>
    </section>
  );
}


