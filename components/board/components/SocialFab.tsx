"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function SocialFab() {
  const [expanded, setExpanded] = useState(false);
  const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  return (
    <div className="fixed z-[1000] bottom-5 left-5">
      <div
        className={`flex flex-col items-center transition-all duration-300 ease-in w-[50px] rounded-[30px] py-2.5 px-[5px] bg-white gap-[5px] overflow-visible ${expanded ? "expanded" : ""}`}
        onMouseEnter={() => {
          if (!isTouch) setExpanded(true);
        }}
        onMouseLeave={() => {
          if (!isTouch) setTimeout(() => setExpanded(false), 150);
        }}
      >
        <div className="rounded-full rotate-180 transition-transform duration-300 ease-in w-[30px] h-[30px] flex items-center justify-center cursor-pointer hover:scale-125" onClick={() => setExpanded(!expanded)} title="Toggle Menu">
          <Image src="/10x/down-arrow.gif" alt="Arrow Icon" width={30} height={30} style={{ transform: expanded ? "rotate(0deg)" : "rotate(180deg)" }} />
        </div>

        <div className={`flex flex-col items-center mt-0 gap-2.5 transition-all duration-300 ease-in ${expanded ? "opacity-100 translate-y-0 max-h-64 pointer-events-auto" : "opacity-0 translate-y-2.5 max-h-0 pointer-events-none"}`}>
          <a href="https://www.facebook.com/profile.php?id=61569281738662" target="_blank" rel="noopener noreferrer" className="contents no-underline">
            <div className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer transition-[transform,background] duration-200 ease-in hover:scale-125" title="facebook">
              <Image src="/10x/facebook.svg" alt="facebook" width={30} height={30} className="w-full h-full" />
            </div>
          </a>
          <a href="https://www.instagram.com/sisyaclass/" target="_blank" rel="noopener noreferrer" className="contents no-underline">
            <div className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer transition-[transform,background] duration-200 ease-in hover:scale-125" title="instagram">
              <Image src="/10x/instagram.svg" alt="instagram" width={30} height={30} className="w-full h-full" />
            </div>
          </a>
          <a href="https://in.linkedin.com/company/sisyaclass" target="_blank" rel="noopener noreferrer" className="contents no-underline">
            <div className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer transition-[transform,background] duration-200 ease-in hover:scale-125" title="linkedin">
              <Image src="/10x/linkedin.svg" alt="linkedin" width={30} height={30} className="w-full h-full" />
            </div>
          </a>
          <a href="http://t.me/sisyaclass" target="_blank" rel="noopener noreferrer" className="contents no-underline">
            <div className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer transition-[transform,background] duration-200 ease-in hover:scale-125" title="telegram">
              <Image src="/10x/telegram.svg" alt="telegram" width={30} height={30} className="w-full h-full" />
            </div>
          </a>
        </div>

        <a href="https://www.youtube.com/@SISYACLASS" target="_blank" rel="noopener noreferrer" className="contents no-underline">
          <div className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer transition-[transform,background] duration-200 ease-in hover:scale-125" title="youtube">
            <Image src="/10x/youtube.svg" alt="youtube" width={30} height={30} className="w-full h-full" />
          </div>
        </a>
      </div>
    </div>
  );
}

