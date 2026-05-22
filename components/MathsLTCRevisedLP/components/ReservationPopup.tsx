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

export default function ReservationPopup({
  open,
  selectedClass,
  phoneNumber,
  onChangeClass,
  onChangePhone,
  onSubmit,
  onClose,
}: ReservationPopupProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-10000 p-4 opacity-100 transition-opacity duration-300"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl p-8 max-w-md w-full relative shadow-lg">
        <button
          className="absolute top-4 right-4 bg-transparent border-none text-2xl cursor-pointer text-[#333] hover:text-black"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-[#01317a] mb-4 text-center">
          See the Difference in Just One Class
        </h2>
        <p className="text-center text-base text-[#415252] mb-4">
          Get Live Class, Recorded Sessions, Doubt-Solving &amp; Performance Reports
        </p>
        <br />
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="relative w-full">
            <label
              htmlFor="childClass"
              className="block text-center text-sm font-medium text-[#333] mb-2"
            >
              Select Grade
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
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-[#333] mb-2"
            >
              Enter your phone number
            </label>
            <div className="flex items-center border border-[#c3d3ea] rounded-lg overflow-hidden bg-white">
              <div className="px-3 py-2 bg-[#f0f2f5] text-[#333] border-r border-[#c3d3ea]">
                +91
              </div>
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
          <button
            type="submit"
            className="bg-[#01317a] text-white py-3 px-5 rounded-lg font-semibold text-base cursor-pointer transition-all duration-300 hover:bg-[#001d4a]"
          >
            Try a Class @ ₹19 Only
          </button>
        </form>
      </div>
    </div>
  );
}


