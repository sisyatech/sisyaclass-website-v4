"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calculator, Trophy, Code, Brain, MessageSquare } from "lucide-react";

type HeroSectionProps = {
  onRegister: () => void;
  onGetCallback?: () => void;
};

export default function SummerCampHeroSection({ onRegister, onGetCallback }: HeroSectionProps) {
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
      onGetCallback();
      return;
    }
    setShowCallback(true);
  };

  const handleSubmitCallback = async () => {
    setError(null);
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!isValidMobile(phone)) {
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
        source: "summer_camp_callback",
        medium: "web",
        campaign: "SUMMER_CAMP",
      };
      const res = await fetch("https://sisyaclass.xyz/student/create_merrito_lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && (data?.success ?? true)) {
        setIsSuccess(true);
      } else {
        setError(data?.message || "Request failed. Please try again.");
      }
    } catch (e) {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const includes = [
    { icon: <Image src="/summercamp/icon/fi_3074050.svg" alt="Vedic Maths" width={24} height={24} className="w-6 h-6" />, text: "300+ Tricks With Vedic Maths" },
    { icon: <Image src="/summercamp/icon/fi_3713857.svg" alt="Olympiad" width={24} height={24} className="w-6 h-6" />, text: "Olympiad Training" },
    { icon: <Image src="/summercamp/icon/fi_5831220.svg" alt="Coding" width={24} height={24} className="w-6 h-6" />, text: "Coding & Robotics Classes" },
    { icon: <Image src="/summercamp/icon/fi_9186780.svg" alt="Brain Development" width={24} height={24} className="w-6 h-6" />, text: "Brain Development Classes" },
    { icon: <Image src="/summercamp/icon/fi_10440284.svg" alt="Spoken English" width={24} height={24} className="w-6 h-6" />, text: "Spoken English Classes" },
  ];

  return (
    <section className="relative w-full overflow-hidden pt-4 pb-12 md:pb-24 lg:pb-32 min-h-[650px] md:min-h-[600px] 2xl:min-h-[900px] flex flex-col items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/summercamp/Website.png"
          alt="Summer Camp Background"
          fill
          priority
          className="hidden md:block object-cover object-top"
        />
        <Image
          src="/summercamp/Mobile.png"
          alt="Summer Camp Background Mobile"
          fill
          priority
          className="block md:hidden object-cover object-center"
        />
        {/* Semi-transparent overlay to ensure text readability if needed */}
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center text-center w-full">
        {/* Top Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white px-2.5 py-1 rounded-full shadow-md mb-3 md:mb-6 inline-block mt-1"
        >
          <p className="text-[#01317a] font-bold text-[8px] md:text-sm italic">
            April 1, 2026 to May 31, 2026 | 60 Days | 4 Subjects
          </p>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-lg md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.4)] md:drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)] mb-7 md:whitespace-nowrap"
        >
          A Summer Camp That Builds Skills
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[12px] md:text-xl font-bold text-black mb-3 md:mb-8 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]"
        >
          While Feeling Like a Game
        </motion.p>

        {/* Includes Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#bceeff]/80 backdrop-blur-sm md:bg-white/20 md:backdrop-blur-md rounded-lg md:rounded-xl p-2.5 md:p-6 w-[85%] min-[375px]:w-[70%] min-[425px]:w-[55%] md:w-full max-w-4xl border border-white/40 shadow-xl mb-5 md:mb-10"
        >
          <h3 className="text-black font-bold text-center md:text-left text-xs md:text-lg mb-2 md:mb-4">Includes</h3>
          <div className="flex flex-col md:grid md:grid-cols-5 gap-1 md:gap-3">
            {includes.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#fffdf0",
                  rotate: [0, -1, 1, -1, 0],
                  transition: { duration: 0.3 }
                }}
                className="bg-[#fff9bd] md:bg-yellow-50/90 rounded-sm md:rounded-lg p-1.5 md:p-3 flex items-center md:flex-col justify-center text-center gap-1.5 md:gap-2 shadow-sm md:shadow-md border border-white/50 cursor-default"
              >
                <div className="hidden md:block bg-white p-1.5 rounded-md shadow-sm">{item.icon}</div>
                <p className="text-black text-[10px] md:text-[11px] font-bold leading-tight">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row gap-2.5 md:gap-4 w-full max-w-2xl justify-center z-20 mt-4 md:mt-8 px-6 min-[375px]:px-16 min-[425px]:px-24 md:px-0"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(235, 77, 45, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onRegister}
            className="w-full md:w-auto bg-[#eb4d2d] text-white font-black text-sm md:text-2xl py-2 md:py-3 px-4 md:px-6 rounded-full shadow-[0_3px_6px_rgba(235,77,45,0.4)] flex items-center justify-center border-2 border-white transition-colors whitespace-nowrap"
          >
            Get 3 Demos @ ₹19
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#f9fafb" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenCallback}
            className="w-full md:w-auto bg-white text-[#eb4d2d] font-black text-sm md:text-2xl py-2 md:py-3 px-4 md:px-6 rounded-full shadow-[0_3px_6px_rgba(255,255,255,0.3)] flex items-center justify-center border-2 border-[#eb4d2d] transition-colors whitespace-nowrap"
          >
            Talk To Our Counselor
          </motion.button>
        </motion.div>
      </div>

      {/* Background Bottom Greenery Placeholder - Not needed if using full image, but keeping a subtle blend */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-green-500/30 to-transparent z-0 hidden md:block"></div>

      {/* Callback Popup */}
      {showCallback && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => !submitting && setShowCallback(false)} />
          <div className="relative z-10 w-[92%] max-w-[380px] rounded-lg bg-white p-5 shadow-xl">
            <button
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => !submitting && setShowCallback(false)}
            >
              ×
            </button>
            <h2 className="text-center text-lg font-bold text-[#eb4d2d]">
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
                  className="w-full rounded-md bg-[#eb4d2d] py-3 font-bold text-white hover:bg-[#eb4d2d]/90"
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
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-[#eb4d2d]"
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
                      className="flex-1 rounded-r-md border border-l-0 border-gray-300 px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-[#eb4d2d]"
                      placeholder="Enter your phone number"
                      disabled={submitting}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Enter your Question</label>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full min-h-[80px] rounded-md border border-gray-300 px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-[#eb4d2d]"
                    placeholder="Enter your question"
                    disabled={submitting}
                  />
                </div>
                {error && <div className="text-sm text-red-600">{error}</div>}
                <button
                  type="button"
                  className="w-full rounded-md bg-[#eb4d2d] py-3 font-bold text-white hover:bg-[#eb4d2d]/90 disabled:opacity-60"
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


