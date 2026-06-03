import React from "react";
import Image from "next/image";

export default function TestimonialsSection() {
  return (
    <section className="text-center py-12 px-4 bg-white max-w-6xl mx-auto" id="testimonial-section">
      <div className="overflow-x-auto scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory touch-pan-x px-4 pb-4 mx-auto max-w-full">
        <div className="flex gap-8 w-max">
          <div className="bg-white rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.06)] py-8 px-6 w-[350px] flex-shrink-0 snap-start flex flex-col gap-4 h-[300px]">
            <div className="w-12 h-12 text-[#eeeeee] self-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block w-full h-full">
                <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
              </svg>
            </div>
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
              <p className="m-0 text-base text-left text-[#444] leading-relaxed p-0">My daughter is much more confident now! She understands things better and gets better marks in school.</p>
            </div>
            <div className="flex justify-start items-center gap-3">
              <Image src="/10x/t1.jpeg" alt="Priya Sharma" width={48} height={48} className="rounded-full w-12 h-12 object-cover" />
              <div className="flex flex-col items-start justify-center">
                <div className="text-[13px] text-[#555] flex gap-[5px] flex-wrap items-center">
                  <span className="font-semibold text-[15px] text-[#222] mb-1">Priya Sharma</span>
                  <span className="text-[#4a4ef5] text-[10px] font-medium">Parent</span>
                </div>
                <span className="stars">⭐⭐⭐⭐⭐</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.06)] py-8 px-6 w-[350px] flex-shrink-0 snap-start flex flex-col gap-4 h-[320px]">
            <div className="w-12 h-12 text-[#eeeeee] self-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
              </svg>
            </div>
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
              <p className="m-0 text-base text-left text-[#444] leading-relaxed p-0">The AI learning and games keep my child interested. Learning is actually fun now!</p>
            </div>
            <div className="flex justify-start items-center gap-3">
              <Image src="/10x/t2.jpeg" alt="Harsha" width={48} height={48} className="rounded-full w-12 h-12 object-cover" />
              <div className="flex flex-col items-start justify-center">
                <div className="text-[13px] text-[#555] flex gap-[5px] flex-wrap items-center">
                  <span className="font-semibold text-[15px] text-[#222] mb-1">Harsha</span>
                  <span className="text-[#4a4ef5] text-[10px] font-medium">Parent</span>
                </div>
                <span className="stars">⭐⭐⭐⭐⭐</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.06)] py-8 px-6 w-[350px] flex-shrink-0 snap-start flex flex-col gap-4 h-[300px]">
            <div className="w-12 h-12 text-[#eeeeee] self-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block w-full h-full">
                <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
              </svg>
            </div>
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
              <p className="m-0 text-base text-left text-[#444] leading-relaxed p-0">SISYA Class made learning easy! The teachers explain everything well, and now I understand my school classes better.</p>
            </div>
            <div className="flex justify-start items-center gap-3">
              <Image src="/10x/t3.jpeg" alt="Varshini" width={48} height={48} className="rounded-full w-12 h-12 object-cover" />
              <div className="flex flex-col items-start justify-center">
                <div className="text-[13px] text-[#555] flex gap-[5px] flex-wrap items-center">
                  <span className="font-semibold text-[15px] text-[#222] mb-1">Varshini</span>
                  <span className="text-[#4a4ef5] text-[10px] font-medium">Class 9 Student</span>
                </div>
                <span className="stars">⭐⭐⭐⭐⭐</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


