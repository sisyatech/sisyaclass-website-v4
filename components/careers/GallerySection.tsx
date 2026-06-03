"use client"
import React from 'react'

const teamPhotos = [
  "/career/event.jpeg",
  "/career/11.jpeg",
  "/career/fun.JPG",
  "/career/mid.jpg",
  "/career/grouppic1.png",
  "/career/work1.jpeg",
];

export const GallerySection = () => (
  <div className="py-10 sm:py-12 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
        Life at SISYA
      </h2>
      <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
        We work hard, have fun, and celebrate our successes together.
      </p>
      <div className="mt-8 sm:mt-10 columns-2 sm:columns-3 md:columns-4 gap-3 sm:gap-4">
        {teamPhotos.map((src, index) => (
          <img 
            key={index} 
            src={src} 
            alt={`Life at SISYA ${index + 1}`} 
            className="w-full h-auto rounded-lg sm:rounded-xl shadow-md mb-3 sm:mb-4 break-inside-avoid"
            onError={(e) => { 
              // Fix: Cast the event target to an HTMLImageElement to access 'src'
              const target = e.target as HTMLImageElement;
              target.src = 'https://placehold.co/400x400/cccccc/3182CE?text=Image'; 
            }}
          />
        ))}
      </div>
    </div>
  </div>
);


export default GallerySection
