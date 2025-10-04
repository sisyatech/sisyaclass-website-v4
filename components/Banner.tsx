"use client";

import React from "react";

const Banner = () => {
  return (
    <div className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-3">
        <div className="flex justify-center">
          <img 
            src="/backendbanner.svg" 
            alt="Banner" 
            className="w-full h-auto max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
