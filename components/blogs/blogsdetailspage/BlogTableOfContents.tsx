"use client";

import React from "react";

const BlogTableOfContents = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <h3 className="font-montserrat font-bold text-[18px] sm:text-[20px] text-[#1A2439] mb-4">
        On This Page
      </h3>
      <ul className="space-y-2">
        <li>
          <a href="#section-1" className="text-[#0595CE] hover:underline text-sm sm:text-base">
            Create a Dedicated Study Space
          </a>
        </li>
        <li>
          <a href="#section-2" className="text-[#0595CE] hover:underline text-sm sm:text-base">
            Set Realistic Goals 
          </a>
        </li>
        <li>
          <a href="#section-3" className="text-[#0595CE] hover:underline text-sm sm:text-base">
            Use Active Learning Techniques
          </a>
        </li>
        <li>
          <a href="#section-4" className="text-[#0595CE] hover:underline text-sm sm:text-base">
            Take Regular Breaks
          </a>
        </li>
        <li>
          <a href="#section-5" className="text-[#0595CE] hover:underline text-sm sm:text-base">
            Practice Regularly
          </a>
        </li>
      </ul>
    </div>
  );
};

export default BlogTableOfContents;

