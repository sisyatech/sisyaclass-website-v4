"use client";

import React from "react";
import Image from "next/image";

type DownloadWorksheetsSectionProps = {
  onRegister: () => void;
};

export default function DownloadWorksheetsSection({ onRegister }: DownloadWorksheetsSectionProps) {
  const handleDownload = () => {
    // Add download functionality here
    //console.log("Download worksheets clicked");
  };

  return (
    <section className="relative w-full bg-white pt-6 pb-12 md:pt-8 md:pb-16">
      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-6 lg:px-8 flex flex-col items-center">
        {/* Button */}
        <button
          onClick={onRegister}
          className="w-full max-w-[280px] sm:max-w-[300px] md:w-[305.44px] h-[44px] rounded-[11px] bg-[#FFE100] text-black font-roboto font-medium text-[14px] sm:text-[15px] md:text-[17.46px] leading-[18.15px] tracking-[0.03em] text-center cursor-pointer hover:bg-[#FFED4E] transition-colors duration-200 mb-8 flex items-center justify-center mx-auto"
        >
          Tap To Learn From IIT Teachers
        </button>

        {/* Teachers Group Image */}
        <div className="relative w-full max-w-[800px]">
          <Image
            src="/board/teach.svg"
            alt="Teachers Group"
            width={800}
            height={600}
            className="w-full h-auto object-contain"
            priority
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}


