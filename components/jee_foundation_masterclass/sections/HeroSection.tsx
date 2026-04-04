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
      //console.log("[JEE Foundation][CALLBACK] External onGetCallback handler invoked");
      onGetCallback();
      return;
    }
    //console.log("[JEE Foundation][CALLBACK] Opening internal callback modal");
    setShowCallback(true);
  };

  const handleSubmitCallback = async () => {
    setError(null);
    if (!name.trim()) {
      //console.log("[JEE Foundation][CALLBACK][VALIDATION] Missing name");
      setError("Please enter your name");
      return;
    }
    if (!isValidMobile(phone)) {
      //console.log("[JEE Foundation][CALLBACK][VALIDATION] Invalid phone:", phone);
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
      //console.log("[JEE Foundation][CALLBACK][REQUEST] create_merrito_lead →", payload);
      const res = await fetch("https://sisyaclass.xyz/student/create_merrito_lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      //console.log("[JEE Foundation][CALLBACK][RESPONSE] status:", res.status);
      const text = await res.text();
      //console.log("[JEE Foundation][CALLBACK][RESPONSE] raw:", text);
      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch { }
      //console.log("[JEE Foundation][CALLBACK][RESPONSE] parsed:", data);
      if (res.ok && (data?.success ?? true)) {
        //console.log("[JEE Foundation][CALLBACK] Success - showing success state");
        setIsSuccess(true);
      } else {
        let msg = data?.message || data?.error || `Request failed (${res.status})`;
        if (res.status === 400 && typeof msg === "string" && msg.toLowerCase().includes("lead not created")) {
          msg = "Too many attempts, try again after some time";
        }
        //console.warn("[JEE Foundation][CALLBACK] Failed:", msg);
        setError(msg);
      }
    } catch (e) {
      //console.error("[JEE Foundation][CALLBACK] Network error:", e);
      setError("Network error. Please try again.");
    } finally {
      //console.log("[JEE Foundation][CALLBACK] Submit finished");
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-[#002b70] text-white relative overflow-hidden pt-12 pb-16 md:py-20 min-h-[500px]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left Content */}
          <div className="flex-1 flex flex-col md:flex-row items-center md:items-start gap-8 md:relative md:-left-12">
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="hidden md:block flex-shrink-0 mt-32"
            >
              <Image
                src="/10x/book-icon.png"
                alt="JEE Book Icon"
                width={100}
                height={100}
                className="object-contain"
              />
            </motion.div>
            <div className="flex-1 text-center md:text-left">
              <p className="italic text-gray-300 text-xs md:text-sm font-medium mb-2 tracking-wide uppercase">
                Start Early. Build Strong. Crack JEE!
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-3 leading-tight md:whitespace-nowrap">
                JEE Foundation Masterclass
              </h1>
              {/* <p className="text-gray-300 text-xs md:text-base font-medium mb-6">
                Classes 8–10 | July 2 | 8 PM
              </p> */}

              <ul className="space-y-3 mb-8 text-left">
                {[
                  "Algebra Shortcuts & Smart Equations",
                  "Visual, Concept-Based Trigonometry",
                  "IIT Foundation Concepts Made Simple",
                  "Real-World Applications & Board Boosters",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-2.5 h-2.5 md:w-3 md:h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={4}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm md:text-base font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onRegister}
                className="bg-[#ffd500] hover:bg-[#e6c100] text-black font-bold py-3 px-8 md:py-3 md:px-10 rounded-xl text-base md:text-lg shadow-lg transform transition active:scale-95"
              >
                Enroll For Rs 19 Only
              </button>
            </div>
          </div>

          {/* Right Content - Video Frame */}
          <div className="flex-1 w-full max-w-2xl md:ml-12">
            <div className="text-center mb-6">
              <p className="text-sm md:text-lg font-medium text-gray-300 tracking-wide uppercase">
                Trusted By Parents, Loved By Students
              </p>
            </div>

            <div className="relative aspect-video rounded-[24px] overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/oqxw-V4ChKM?autoplay=1&mute=1&loop=1&playlist=oqxw-V4ChKM&controls=0&modestbranding=1"
                title="Why Parents Trust SISYA CLASS"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
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