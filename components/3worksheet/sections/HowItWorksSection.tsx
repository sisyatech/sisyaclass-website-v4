import React from "react";

export default function HowItWorksSection() {
  return (
    <section className="w-full px-5 py-10 text-center">
      <h2 className="mb-10 text-[28px] font-bold text-[#222]">How It Works?</h2>
      <div className="flex flex-wrap justify-center gap-[30px]">
        {/* Step 1 */}
        <div className="max-w-[280px] min-w-[250px] flex-1 rounded-[12px] bg-[#fff3dc] p-5 text-center transition-[transform,box-shadow] duration-300 ease-linear hover:-translate-y-2 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
          <div className="mb-4">
            <img src="/3daylp/st1.svg" alt="Step 1 Icon" className="inline h-[50px] w-[50px]" />
          </div>
          <div className="mb-2 inline-block rounded-[30px] bg-[#f8e2c7] px-[30px] py-[6px] text-[18px] font-bold text-[#b14b01]">
            Step-1
          </div>
          <div className="text-[14px] leading-[1.5] text-[#b14b01]">
            Download 3 worksheets For ₹29
          </div>
        </div>

        {/* Step 2 */}
        <a
          href="tel:+917330897291"
          className="max-w-[280px] min-w-[250px] flex-1 rounded-[12px] bg-[#ebf9e3] p-5 text-center text-inherit no-underline transition-[transform,box-shadow] duration-300 ease-linear hover:-translate-y-2 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
        >
          <div className="mb-4">
            <img src="/3daylp/st2.svg" alt="Step 2 Icon" className="inline h-[50px] w-[50px]" />
          </div>
          <div className="mb-2 inline-block rounded-[30px] bg-[#d8efd0] px-[30px] py-[6px] text-[18px] font-bold text-[#2e7d32]">
            Step-2
          </div>
          <div className="text-[14px] leading-[1.5] text-[#2e7d32]">
            Let Your Child Solve All 3 Sheets
          </div>
        </a>

        {/* Step 3 */}
        <div className="max-w-[280px] min-w-[250px] flex-1 rounded-[12px] bg-[#e7f3ff] p-5 text-center transition-[transform,box-shadow] duration-300 ease-linear hover:-translate-y-2 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
          <div className="mb-4">
            <img src="/3daylp/st3.svg" alt="Step 3 Icon" className="inline h-[50px] w-[50px]" />
          </div>
          <div className="mb-2 inline-block rounded-[30px] bg-[#d3e5fb] px-[30px] py-[6px] text-[18px] font-bold text-[#1560d0]">
            Step-3
          </div>
          <div className="text-[14px] leading-[1.5] text-[#1560d0]">
            Get a Free Performance Review Call
          </div>
        </div>
      </div>
    </section>
  );
}
