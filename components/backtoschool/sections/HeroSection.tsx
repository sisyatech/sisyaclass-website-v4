"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type HeroSectionProps = {
  onRegister: () => void;
  onGetCallback?: () => void; // optional: open callback popup
};

export default function HeroSection({ onRegister, onGetCallback }: HeroSectionProps) {
  const [showCallback, setShowCallback] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const isValidMobile = (num: string) => /^[6-9]\d{9}$/.test(num);

  const handleOpenCallback = () => {
    if (onGetCallback) {
      //console.log("[BACKTOSCHOOL][CALLBACK] External onGetCallback handler invoked");
      onGetCallback();
      return;
    }
    //console.log("[BACKTOSCHOOL][CALLBACK] Opening internal callback modal");
    setShowCallback(true);
  };

  const handleSubmitCallback = async () => {
    setError(null);
    if (!name.trim()) {
      //console.log("[BACKTOSCHOOL][CALLBACK][VALIDATION] Missing name");
      setError("Please enter your name");
      return;
    }
    if (!isValidMobile(phone)) {
      //console.log("[BACKTOSCHOOL][CALLBACK][VALIDATION] Invalid phone:", phone);
      setError("Enter a valid 10-digit mobile number");
      return;
    }
    setSubmitting(true);
    try {
      const email = `${phone}@gmail.com`;
      const payload = {
        name,
        phone,
        cf_class: "Class 1",
        message: question,
        email,
        source: "callback_requested",
        medium: "web",
        campaign: "CALLBACK",
      };
      //console.log("[BACKTOSCHOOL][CALLBACK][REQUEST] create_merrito_lead →", payload);
      const res = await fetch("https://sisyaclass.xyz/student/create_merrito_lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      //console.log("[BACKTOSCHOOL][CALLBACK][RESPONSE] status:", res.status);
      const text = await res.text();
      //console.log("[BACKTOSCHOOL][CALLBACK][RESPONSE] raw:", text);
      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch { }
      //console.log("[BACKTOSCHOOL][CALLBACK][RESPONSE] parsed:", data);
      if (res.ok && (data?.success ?? true)) {
        //console.log("[BACKTOSCHOOL][CALLBACK] Success - showing success state");
        setIsSuccess(true);
      } else {
        let msg = data?.message || data?.error || `Request failed (${res.status})`;
        if (res.status === 400 && typeof msg === "string" && msg.toLowerCase().includes("lead not created")) {
          msg = "Too many attempts, try again after some time";
        }
        //console.warn("[BACKTOSCHOOL][CALLBACK] Failed:", msg);
        setError(msg);
      }
    } catch (e) {
      //console.error("[BACKTOSCHOOL][CALLBACK] Network error:", e);
      setError("Network error. Please try again.");
    } finally {
      //console.log("[BACKTOSCHOOL][CALLBACK] Submit finished");
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-[#01317a] text-white relative overflow-hidden pt-8 pb-0 md:py-10 min-h-[420px] md:min-h-[500px]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-stretch gap-0 md:gap-6 min-h-[380px] relative px-4">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:block absolute top-[40%] left-[50px] lg:left-[-80px] z-20"
        >
          <Image
            src="/backtoschool/bookbook.png"
            alt="book"
            width={70}
            height={70}
            className="pointer-events-none"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 p-0 md:p-4 flex flex-col justify-center text-center md:text-left"
        >
          <div className="flex flex-wrap items-center gap-1 md:gap-2 mb-1 md:mb-2 text-[0.7rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.1rem] font-semibold tracking-wide justify-center md:justify-start">
            <span className="text-[#ffd500] text-[0.9rem] md:text-[1.3rem]">4.8★</span>
            <span className="text-center sm:text-left">on Google | 10,000+ Happy Parents | Classes 1-10</span>
          </div>

          <h1 className="text-[1.5rem] sm:text-[1.8rem] md:text-[2rem] lg:text-[2.5rem] leading-tight md:leading-[1.1] font-bold mb-2 whitespace-normal md:whitespace-nowrap">
            <span className="block">New grade. Harder syllabus.</span>
            <span className="block mt-0 md:mt-1">Is your child ready?</span>
          </h1>

          <p className="text-[1.2rem] sm:text-[1.5rem] md:text-[2rem] mt-2 md:mt-3 mb-3 font-semibold max-w-md mx-auto md:mx-0">
            Score 90%+ In Mid Terms
          </p>
          <ul className="mt-0 space-y-[0.3rem] md:space-y-2 text-left mx-auto md:mx-0 max-w-xl text-[0.9rem] sm:text-[1rem] md:text-[1.1rem] font-medium">
            <li className="flex items-start gap-2"><span>•</span> Identify last year&apos;s learning gaps</li>
            <li className="flex items-start gap-2"><span>•</span> Check your child&apos;s Maths & Science readiness</li>
            <li className="flex items-start gap-2"><span>•</span> 500 Hrs Live + Class Recordings Available Anytime</li>
            <li className="flex items-start gap-2"><span>•</span> AI + Teacher Doubt Solving, Anytime</li>
          </ul>

          {/* Buttons */}
          <div className="mt-4 md:mt-5 mb-2 flex flex-col sm:flex-row w-full gap-3 sm:gap-3 md:gap-4 justify-center md:justify-start items-center">
            <button
              className="inline-flex items-center justify-center font-bold text-[0.85rem] sm:text-[1rem] md:text-[1.125rem] leading-[1.2] rounded-xl cursor-pointer z-10 w-[240px] sm:w-auto sm:flex-1 md:flex-none md:w-[200px] h-[48px] md:h-[52px] px-3 sm:px-4 md:px-6 bg-[#ffd500] text-black whitespace-nowrap shadow-md"
              onClick={onRegister}
            >
              Book Demo @19
            </button>
            <button
              className="inline-flex items-center justify-center font-bold text-[0.85rem] sm:text-[1rem] md:text-[1.125rem] leading-[1.2] rounded-xl cursor-pointer z-10 w-[240px] sm:w-auto sm:flex-1 md:flex-none md:w-[200px] h-[48px] md:h-[52px] px-3 sm:px-4 md:px-6 bg-white text-[#01317a] shadow-md hover:bg-gray-100 whitespace-nowrap"
              onClick={handleOpenCallback}
            >
              Talk To A Counselor
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 md:absolute md:right-0 md:bottom-[-40px] md:w-1/2 flex justify-center items-center md:items-end pointer-events-none mt-0 md:mt-0"
        >
          <Image
            src="/backtoschool/backtoschool.png"
            alt="boy"
            width={400}
            height={400}
            className="object-contain drop-shadow-2xl translate-x-0 md:translate-x-10"
            priority
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:block absolute top-[55%] right-[320px] lg:right-[450px] z-20"
          >
            <Image
              src="/backtoschool/cube.png"
              alt="cube"
              width={70}
              height={70}
              className="pointer-events-none"
            />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:block absolute top-[40%] right-[-10px] lg:right-[-20px] z-20"
          >
            <Image
              src="/backtoschool/funcion1.svg"
              alt="function"
              width={60}
              height={60}
              className="pointer-events-none"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Callback Popup */}
      {showCallback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => !submitting && setShowCallback(false)} />
          <div className="relative z-10 w-[92%] max-w-[380px] rounded-lg bg-white p-5 shadow-xl">
            <button
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              onClick={() => !submitting && setShowCallback(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-center text-lg font-bold text-[#01317a]">
              {isSuccess ? "Request Submitted!" : "We'll Call You In 24 Hrs."}
            </h2>
            {isSuccess ? (
              <div className="mt-6 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-600">Our counselor will call you within 24 hours to answer your questions.</p>
                <button
                  onClick={() => {
                    setShowCallback(false);
                    setIsSuccess(false);
                    setName("");
                    setPhone("");
                    setQuestion("");
                  }}
                  className="w-full rounded-md bg-[#01317a] py-3 font-bold text-white hover:bg-[#01317a]/90"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Enter your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-[#02bdfe]"
                    placeholder="Enter your name"
                    disabled={submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Enter your phone number</label>
                  <div className="flex">
                    <div className="flex items-center justify-center w-14 rounded-l-md border border-gray-300 bg-gray-100 text-gray-700">
                      +91
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
                      className="flex-1 rounded-r-md border border-l-0 border-gray-300 px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-[#02bdfe]"
                      placeholder="Enter your phone number"
                      disabled={submitting}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Enter your Question or Concern</label>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full min-h-[80px] rounded-md border border-gray-300 px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-[#02bdfe]"
                    placeholder="Enter your question"
                    disabled={submitting}
                  />
                </div>
                {error && <div className="text-sm text-red-600">{error}</div>}
                <button
                  type="button"
                  className="w-full rounded-md bg-[#1B9CFF] py-3 font-bold text-white hover:bg-[#1B9CFF]/90 disabled:opacity-60"
                  onClick={handleSubmitCallback}
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}