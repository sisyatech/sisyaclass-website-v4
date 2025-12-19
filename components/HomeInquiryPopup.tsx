"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HomeInquiryPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HomeInquiryPopup({ isOpen, onClose }: HomeInquiryPopupProps) {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [board, setBoard] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!grade) {
      setError("Please select a grade");
      return;
    }
    if (!board) {
      setError("Please select a board");
      return;
    }
    if (!phone.trim() || phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare common data
      const commonData = {
        name: name.trim(),
        phone: phone.trim() || undefined,
        email: email.trim() || undefined,
        message: message.trim() || undefined,
        targetClass: grade,
        classBoard: board,
      };

      // Send to both APIs in parallel
      const [inqResponse, merrittoResponse] = await Promise.allSettled([
        // API 1: create_inq
        fetch("https://sisyaclass.xyz/student/create_inq", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...commonData,
            isTrialRequest: false,
          }),
        }),
        // API 2: create_merrito_lead
        fetch("https://sisyaclass.xyz/student/create_merrito_lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: commonData.name,
            phone: phone.trim(),
            cf_class: grade,
            state: undefined,
            source: "web",
            medium: "web",
            campaign: "homepage inquiry",
            email: commonData.email,
            message: commonData.message,
          }),
        }),
      ]);

      // Check results (we consider it successful if at least one succeeds)
      const inqSuccess = inqResponse.status === "fulfilled" && inqResponse.value.ok;
      const merrittoSuccess = merrittoResponse.status === "fulfilled" && merrittoResponse.value.ok;

      if (inqSuccess || merrittoSuccess) {
        setSuccess(true);
        // Reset form
        setName("");
        setGrade("");
        setBoard("");
        setPhone("");
        setEmail("");
        setMessage("");
        // Close popup after 2 seconds
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 2000);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting inquiry:", err);
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-transparent border-none text-2xl cursor-pointer text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors duration-200"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close"
        >
          ×
        </button>

        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#02BDFD] to-[#01317a] rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#01317a] mb-2">
            Get Started with SISYA
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Fill in your details and we'll get in touch!
          </p>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h3>
            <p className="text-gray-600">We'll contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#02BDFD] focus:border-transparent transition-all"
                placeholder="Enter your name"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Grade */}
            <div>
              <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                Grade <span className="text-red-500">*</span>
              </label>
              <Select
                value={grade}
                onValueChange={setGrade}
                disabled={isSubmitting}
                required
              >
                <SelectTrigger className="w-full h-12 text-base border-gray-300 focus:ring-2 focus:ring-[#02BDFD]">
                  <SelectValue placeholder="Select Grade" />
                </SelectTrigger>
                <SelectContent className="z-[10001]">
                  <SelectItem value="1">Class 1</SelectItem>
                  <SelectItem value="2">Class 2</SelectItem>
                  <SelectItem value="3">Class 3</SelectItem>
                  <SelectItem value="4">Class 4</SelectItem>
                  <SelectItem value="5">Class 5</SelectItem>
                  <SelectItem value="6">Class 6</SelectItem>
                  <SelectItem value="7">Class 7</SelectItem>
                  <SelectItem value="8">Class 8</SelectItem>
                  <SelectItem value="9">Class 9</SelectItem>
                  <SelectItem value="10">Class 10</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Board */}
            <div>
              <label htmlFor="board" className="block text-sm font-medium text-gray-700 mb-2">
                Board <span className="text-red-500">*</span>
              </label>
              <Select
                value={board}
                onValueChange={setBoard}
                disabled={isSubmitting}
                required
              >
                <SelectTrigger className="w-full h-12 text-base border-gray-300 focus:ring-2 focus:ring-[#02BDFD]">
                  <SelectValue placeholder="Select Board" />
                </SelectTrigger>
                <SelectContent className="z-[10001]">
                  <SelectItem value="CBSE">CBSE</SelectItem>
                  <SelectItem value="ICSE">ICSE</SelectItem>
                  <SelectItem value="State Board">State Board</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <div className="flex items-center justify-center w-14 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-700 text-sm font-medium">
                  +91
                </div>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
                  className="flex-1 p-3 rounded-r-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-[#02BDFD] focus:border-transparent transition-all"
                  placeholder="Enter phone number"
                  maxLength={10}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Email (Optional) */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#02BDFD] focus:border-transparent transition-all"
                placeholder="Enter your email"
                disabled={isSubmitting}
              />
            </div>

            {/* Message (Optional) */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#02BDFD] focus:border-transparent transition-all resize-none"
                placeholder="Any questions or concerns?"
                disabled={isSubmitting}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#02BDFD] to-[#01317a] text-white py-3 px-6 rounded-lg font-semibold text-base cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Inquiry"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

