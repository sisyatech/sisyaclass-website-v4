
import React from "react";
import Image from "next/image";
import RevealOnView from "../Reveal/RevealOnView";

const NewsBanner = () => {
  return (
    <RevealOnView from="bottom" durationMs={800} delayMs={0}>
      <div className="w-full py-20 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full h-auto rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/blogs/blogbanner.png"
              alt="SISYA CLASS Blog Banner"
              width={1200}
              height={400}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </RevealOnView>
  );
};

export default NewsBanner;
