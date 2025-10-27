"use client"; 

import React, { useEffect, useState } from "react";

export const HeroSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative flex h-[70vh] min-h-[400px] md:h-[65vh] lg:h-[70vh] items-end justify-center px-4 sm:px-6 lg:px-8 text-center text-white pb-8 sm:pb-12 md:pb-16">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/about/grouppic.png')" }}
      ></div>
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 max-w-4xl px-2">
        {/* Responsive heading */}
        <h1 className={`text-2xl leading-tight font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Shape Your Future at <span className="text-blue-400">SISYA</span>
        </h1>

        {/* Responsive paragraph */}
        <p className={`mx-auto mt-4 sm:mt-5 md:mt-6 max-w-2xl sm:max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 transition-all duration-1000 ease-out delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          We're looking for passionate, innovative individuals to join our mission. Help us build the
          most loved and effective learning platform for students everywhere.
        </p>
        
        {/* Responsive button */}
        <div className={`transition-all duration-1000 ease-out delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a
            href="#open-positions"
            className="mt-5 sm:mt-6 md:mt-8 inline-block transform rounded-full bg-blue-400 px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 text-sm sm:text-base md:text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-500"
          >
            View Open Positions
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;