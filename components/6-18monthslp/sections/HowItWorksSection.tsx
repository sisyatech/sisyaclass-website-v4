import React from "react";

export default function HowItWorksSection() {
  return (
    <section className="w-full px-5 py-10 text-center">
      <h2 className="text-[28px] font-bold text-[#222] mb-10">How It Works?</h2>
      <div className="flex flex-wrap justify-center gap-[30px]">
        {/* Step 1 */}
        <div className="flex-1 min-w-[250px] max-w-[280px] p-5 rounded-[12px] text-center transition-[transform,box-shadow] duration-300 ease-linear bg-[#fff3dc] hover:-translate-y-2 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
          <div className="mb-4">
            <img src="/3daylp/st1.svg" alt="Step 1 Icon" className="w-[50px] h-[50px] inline" />
          </div>
          <div className="font-bold mb-2 text-[18px] inline-block px-[30px] py-[6px] rounded-[30px] text-[#b14b01] bg-[#f8e2c7]">Step-1</div>
          <div className="text-[14px] leading-[1.5] text-[#b14b01]">Register For 3 Days Demo Class @ ₹19</div>
        </div>

        {/* Step 2 */}
        <a
          href="tel:+917330897291"
          className="flex-1 min-w-[250px] max-w-[280px] p-5 rounded-[12px] text-center transition-[transform,box-shadow] duration-300 ease-linear bg-[#ebf9e3] hover:-translate-y-2 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] no-underline text-inherit"
        >
          <div className="mb-4">
            <img src="/3daylp/st2.svg" alt="Step 2 Icon" className="w-[50px] h-[50px] inline" />
          </div>
          <div className="font-bold mb-2 text-[18px] inline-block px-[30px] py-[6px] rounded-[30px] text-[#2e7d32] bg-[#d8efd0]">Step-2</div>
          <div className="text-[14px] leading-[1.5] text-[#2e7d32]">Our Mentor Will Call You To Discuss Date & Time</div>
        </a>

        {/* Step 3 */}
        <div className="flex-1 min-w-[250px] max-w-[280px] p-5 rounded-[12px] text-center transition-[transform,box-shadow] duration-300 ease-linear bg-[#e7f3ff] hover:-translate-y-2 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
          <div className="mb-4">
            <img src="/3daylp/st3.svg" alt="Step 3 Icon" className="w-[50px] h-[50px] inline" />
          </div>
          <div className="font-bold mb-2 text-[18px] inline-block px-[30px] py-[6px] rounded-[30px] text-[#1560d0] bg-[#d3e5fb]">Step-3</div>
          <div className="text-[14px] leading-[1.5] text-[#1560d0]">IIT Teachers Will Conduct The Demo Class</div>
        </div>
      </div>
    </section>
  );
}


