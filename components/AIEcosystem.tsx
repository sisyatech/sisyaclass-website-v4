"use client";

import React from "react";

const AIEcosystem = () => {
  return (
    <div className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div 
          className="relative mx-auto rounded-[50px] border p-12"
          style={{
            width: '1176px',
            height: '746px',
            background: '#1A2439',
            border: '1px solid #EBEBEB',
            boxShadow: '4px 4px 4px 0px #00000040'
          }}
        >
          {/* Top Headlines */}
          <div className="text-center mb-20">
            <h1 className="text-white text-2xl mb-2">Revolutionizing Learning</h1>
            <h2 className="text-yellow-400 text-4xl font-bold">With SISYA's AI Ecosystem</h2>
          </div>

          {/* Main Content - Centered */}
          <div className="flex justify-center items-start">
            
            {/* Text Content */}
            <div className="text-center space-y-8 max-w-2xl">
              {/* Main Title */}
              <div>
                <h3 className="text-white text-4xl mb-4">
                  Meet Your <span className="text-yellow-400 font-bold">Child's 24/7 AI Learning Partner</span>
                </h3>
                <p className="text-white text-xl">
                  India's first EdTech with real AI-powered doubt solving
                </p>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">Interactive Learning</h4>
                  <p className="text-white text-sm leading-relaxed">
                    Get instant answers anytime with SISYA's AI-powered chat, making study time engaging and effective.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-bold text-lg mb-2">Step-by-Step Guidance</h4>
                  <p className="text-white text-sm leading-relaxed">
                    SISYA breaks down concepts clearly and guides your child through problems, step by step.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-bold text-lg mb-2">Personalized Feedback</h4>
                  <p className="text-white text-sm leading-relaxed">
                    Receive tailored insights based on your child's learning progress to boost improvement.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-bold text-lg mb-2">Grade-Specific Assistance</h4>
                  <p className="text-white text-sm leading-relaxed">
                    SISYA delivers fun, easy-to-understand explanations aligned with your child's grade and syllabus.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
            <button className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white">
              ←
            </button>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-white"></div>
              <div className="w-3 h-3 rounded-full bg-white"></div>
            </div>
            <button className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white">
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIEcosystem;
