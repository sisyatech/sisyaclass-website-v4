import React from "react";
import Image from "next/image";

type AISectionProps = {
  typewriterText: string;
  aiImageRowRef: React.RefObject<HTMLDivElement>;
};

export default function AISection({ typewriterText, aiImageRowRef }: AISectionProps) {
  return (
    <section className="max-w-6xl py-12 px-5 mx-auto md:py-10 md:px-0">
      <h1 className="text-lg md:text-2xl text-[#162525] mb-10 mx-auto text-center px-3" style={{ position: "relative" }}>
        {typewriterText}
        <span className="inline-block w-[3px] h-[1em] bg-black ml-1 align-middle animate-[blink_1s_steps(2,start)_infinite]"></span>
      </h1>

      <div className="flex gap-4 mb-8 overflow-x-auto overflow-y-hidden w-screen px-5 ml-[calc(-50vw+50%)] box-content snap-x snap-mandatory md:justify-center md:w-auto md:ml-0" ref={aiImageRowRef}>
        {[
          { src: "/10x/102 5.svg", alt: "AI Screen 1" },
          { src: "/10x/102 6 (1).svg", alt: "AI Screen 2" },
          { src: "/10x/102 7.svg", alt: "AI Screen 3" },
          { src: "/10x/102 8.svg", alt: "AI Screen 4" },
        ].map((img) => (
          <Image key={img.src} src={img.src} alt={img.alt} width={200} height={300} className="w-[200px] h-auto rounded-[15px] flex-none snap-start" />
        ))}
      </div>

      <p className="text-[0.9rem] max-w-[700px] mx-auto text-[#01317a] font-semibold text-center mb-6">
        Our AI helps Grades 1–10 solve academic questions via text, image, or speech, offering accurate, personalized answers based on their grade and recommendations
      </p>
    </section>
  );
}


