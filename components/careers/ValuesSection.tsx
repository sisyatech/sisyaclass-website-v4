"use client"
import React, { useState, useMemo } from 'react';

const IconMission = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-blue-600">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
    <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
  </svg>
);

const IconStudent = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-blue-600">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const IconInnovation = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-blue-600">
    <path d="M7 12c.5-5 5-8 5-8s4.5 3 5 8c.5 5-2 9-5 9s-5.5-4-5-9z" />
    <path d="M12 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    <path d="M8.5 8.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    <path d="M15.5 8.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
  </svg>
);

const values = [
  {
    icon: <IconMission />,
    title: "Mission Driven",
    description: "We are passionate about making high-quality education accessible to every student, everywhere."
  },
  {
    icon: <IconStudent />,
    title: "Student First",
    description: "Our decisions are driven by what's best for the student's learning journey and success."
  },
  {
    icon: <IconInnovation />,
    title: "Innovate Constantly",
    description: "We embrace technology and new ideas to create more effective and engaging learning experiences."
  }
];



export const ValuesSection = () => (
  <div className="py-10 sm:py-12 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
        Why You'll Love Working Here
      </h2>
      <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
        We're a team of learners and innovators, dedicated to a common goal.
      </p>
      <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {values.map((value) => (
          <div key={value.title} className="flex flex-col items-center p-5 sm:p-6 bg-white rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-105">
            <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-blue-100 rounded-full">
              {value.icon}
            </div>
            <h3 className="mt-4 sm:mt-5 text-lg sm:text-xl font-semibold text-gray-900">{value.title}</h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ValuesSection
