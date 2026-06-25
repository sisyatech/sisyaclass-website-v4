"use client";
import React from "react";

type ReservationPopupProps = {
  open: boolean;
  selectedClass: string;
  phoneNumber: string;
  locationStr: string;
  onChangeClass: (value: string) => void;
  onChangePhone: (value: string) => void;
  onChangeLocation: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
};

export default function ReservationPopup({ open, selectedClass, phoneNumber,
  locationStr,
  onChangeClass, onChangePhone,
  onChangeLocation,
  onSubmit, onClose }: ReservationPopupProps) {
  if (!open) return null;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    onChangePhone(value);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[10000] p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-transparent border-none text-2xl cursor-pointer text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors duration-200"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-lg sm:text-xl font-bold text-[#01317a] mb-3 text-center pr-8">
          Book 1 PYQ Solutions Class @ ₹19
        </h2>
        <p className="text-center text-sm sm:text-base text-[#415252] mb-6">
          Class Link Will Be Shared On WhatsApp
        </p>
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="relative w-full">
            <label htmlFor="childClass" className="block text-center text-sm font-medium text-[#333] mb-2">
              Select Grade
            </label>
            <div className="relative">
              <select
                id="childClass"
                value={selectedClass}
                onChange={(e) => onChangeClass(e.target.value)}
                className="w-full p-3 pr-10 border border-[#c3d3ea] rounded-lg text-base bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#01317a] focus:border-transparent transition-all"
              >
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
              </select>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#555]"
              >
                <path fill="currentColor" d="M7 10l5 5 5-5z" />
              </svg>
            </div>
          </div>
          <div className="relative w-full">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#333] mb-2">
              Enter your phone number
            </label>
            <div className="flex items-center border border-[#c3d3ea] rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#01317a] focus-within:border-transparent transition-all">
              <div className="px-3 py-3 bg-[#f0f2f5] text-[#333] border-r border-[#c3d3ea] text-base font-medium">
                +91
              </div>
              <input
                type="tel"
                id="phoneNumber"
                className="flex-1 p-3 border-none outline-none text-base bg-transparent placeholder:text-gray-400"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={handlePhoneChange}
                maxLength={10}
                inputMode="numeric"
              />
            </div>
          </div>
          <div className="relative w-full">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-[#333] mb-2"
            >
              Enter your location
            </label>
            <input
              type="text"
              id="location"
              required
              className="w-full p-3 border border-[#c3d3ea] rounded-lg text-base bg-white outline-none focus:border-[#01317a]"
              placeholder="e.g. City, State"
              value={locationStr}
              onChange={(e) => onChangeLocation(e.target.value.replace(/[^a-zA-Z0-9\s]/g, ""))}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#01317a] text-white py-3 px-5 rounded-lg font-semibold text-base cursor-pointer transition-all duration-300 hover:bg-[#001d4a] active:scale-[0.98] shadow-md hover:shadow-lg"
          >
            Book 1 Class @ ₹19
          </button>
        </form>
      </div>
    </div>
  );
}

