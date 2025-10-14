"use client";

import React from "react";

const NewsTableOfContents = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <h3 className="font-montserrat font-bold text-[18px] sm:text-[20px] text-[#1A2439] mb-4">
        On This Page
      </h3>
      <div className="space-y-2">
        <a href="#rise-of-ai" className="block text-[#0595CE] hover:text-[#047aa8] text-sm transition-colors">
          The Rise of AI in Education
        </a>
        <a href="#benefits-students" className="block text-[#0595CE] hover:text-[#047aa8] text-sm transition-colors">
          Key Benefits for Students
        </a>
        <a href="#impact-institutions" className="block text-[#0595CE] hover:text-[#047aa8] text-sm transition-colors">
          Impact on Educational Institutions
        </a>
        <a href="#future-prospects" className="block text-[#0595CE] hover:text-[#047aa8] text-sm transition-colors">
          Future Prospects
        </a>
      </div>
    </div>
  );
};

export default NewsTableOfContents;
