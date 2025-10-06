import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-3">
        <div className="flex justify-center">
          <Image 
            src="/backendbanner.svg" 
            alt="Banner" 
            width={1200}
            height={300}
            className="w-full h-auto max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
