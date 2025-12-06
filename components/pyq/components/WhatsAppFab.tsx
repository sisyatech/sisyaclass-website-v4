import React from "react";
import Image from "next/image";

export default function WhatsAppFab() {
  return (
    <div className="fixed z-[1000] bottom-5 right-5">
      <a href="https://wa.me/917393939143" target="_blank" rel="noopener noreferrer">
        <div className="w-[50px] h-[50px] flex items-center justify-center cursor-pointer transition-transform duration-200 ease-in hover:scale-125" title="whatsapp">
          <Image src="/10x/whatsapp.svg" alt="whatsapp" width={30} height={30} className="w-full h-full" />
        </div>
      </a>
    </div>
  );
}

