"use client";
import React from "react";

type ReservationPopupProps = {
  open: boolean;
  selectedClass: string;
  phoneNumber: string;
  onChangeClass: (value: string) => void;
  onChangePhone: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
};

export default function ReservationPopup({ open, selectedClass, phoneNumber, onChangeClass, onChangePhone, onSubmit, onClose }: ReservationPopupProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[10000] p-4 opacity-100 transition-opacity duration-300"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl p-7 max-w-md w-full relative shadow-lg">
        <button className="absolute top-4 right-4 bg-transparent border-none text-2xl cursor-pointer text-[#333] hover:text-black" onClick={onClose}>
          ×
        </button>
        <h2 className="text-[1.65rem] font-bold text-[#01327A] text-center leading-tight">Unlock the ₹29 Worksheet Bundle</h2>
        <p className="mt-3 text-center text-sm text-[#415252]">
          Get 3 IIT teacher–designed worksheets + Get a Free Performance Review Call.
        </p>
        {/* <div className="mt-4 rounded-lg border border-[#D7E5FF] bg-[#F4F8FF] px-4 py-3 text-sm text-[#11315E]">
          <ul className="space-y-1">
            <li>• Class-wise Maths, Science & English practice</li>
            <li>• Tricks, concept drills & scoring tips</li>
            <li>• Download links valid for 48 hours</li>
          </ul>
        </div> */}
        <form
          className="mt-5 flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="relative w-full">
            <label htmlFor="childClass" className="block text-sm font-medium text-[#1C2B49] mb-2">
              Select your child&apos;s class
            </label>
            <select
              id="childClass"
              value={selectedClass}
              onChange={(e) => onChangeClass(e.target.value)}
              className="w-full p-3 pr-10 border border-[#c3d3ea] rounded-lg text-base bg-white appearance-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((grade) => (
                <option key={grade} value={grade.toString()}>
                  Class {grade}
                </option>
              ))}
            </select>
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#555]"
            >
              <path fill="currentColor" d="M7 10l5 5 5-5z" />
            </svg>
          </div>
          <div className="relative w-full">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#333] mb-2">
              Enter your phone number
            </label>
            <div className="flex items-center border border-[#c3d3ea] rounded-lg overflow-hidden bg-white">
              <div className="px-3 py-2 bg-[#f0f2f5] text-[#333] border-r border-[#c3d3ea]">+91</div>
              <input
                type="tel"
                id="phoneNumber"
                className="flex-1 p-3 border-none outline-none text-base bg-transparent"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => onChangePhone(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="bg-[#FFD500] text-[#0B2B68] py-3 px-5 rounded-lg font-semibold text-base cursor-pointer transition-all duration-300 hover:bg-[#FFC800]">
            Get Worksheets for ₹29
          </button>
        </form>
      </div>
    </div>
  );
}


