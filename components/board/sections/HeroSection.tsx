"use client";

import React from "react";
import Image from "next/image";

type HeroSectionProps = {
  onRegister: () => void;
  onGetCallback?: () => void;
};

export default function HeroSection({ onRegister, onGetCallback }: HeroSectionProps) {
  const [showCallback, setShowCallback] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
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
    if (!name.trim()) { setError("Please enter your name"); return; }
    if (!isValidMobile(phone)) { setError("Enter a valid 10-digit mobile number"); return; }
    setSubmitting(true);
    try {
      const email = `${phone}@gmail.com`;
      const payload = {
        name,
        phone,
        cf_class: 'Class 10',
        message: question,
        email,
        source: 'callback_requested',
        medium: 'web',
        campaign: 'BOARD_CALLBACK'
      };
      const res = await fetch('https://sisyaclass.xyz/student/create_merrito_lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const text = await res.text();
      let data: any = {};
      try { data = text ? JSON.parse(text) : {}; } catch {}
      if (res.ok && (data?.success ?? true)) {
        alert('Thank you! We will call you within 24 hours.');
        setShowCallback(false);
      } else {
        let msg = data?.message || data?.error || `Request failed (${res.status})`;
        if (res.status === 400 && typeof msg === 'string' && msg.toLowerCase().includes('lead not created')) {
          msg = 'Too many attempts, try again after some time';
        }
        setError(msg);
      }
    } catch (e) {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative w-full bg-[#01317A] text-white overflow-hidden">
      <div className="mx-auto flex w-full max-w-[1200px] lg:max-w-[1100px] xl:max-w-[1400px] flex-col gap-3 px-4 pt-6 pb-4 sm:gap-3 sm:px-5 sm:pt-7 sm:pb-4 md:flex-row md:items-center md:justify-center md:gap-1 md:px-6 md:pt-10 md:pb-6 lg:gap-0 lg:px-6 lg:pt-10 lg:pb-6 xl:px-8 xl:pt-14 xl:pb-0">
        {/* Left Column */}
        <div className="w-full max-w-xl sm:max-w-lg md:max-w-xl lg:max-w-[580px] xl:max-w-[700px]">
          {/* Main Headline */}
          <h1 className="font-roboto font-black text-[22px] leading-[28px] tracking-[0.03em] text-[#FEFEFE] sm:text-[24px] sm:leading-[30px] md:text-[28px] md:leading-[34px] lg:text-[30px] lg:leading-[36px] xl:text-[40px] xl:leading-[45px] xl:w-[700px] xl:max-w-[700px]">
            Your Child Scores 90% In Boards Or Get Your Money Back!*
          </h1>
          
          {/* Sub-headline */}
          <p className="mt-1 font-roboto font-medium italic text-[14px] leading-[20px] tracking-[0.03em] text-[#FEFEFE] sm:text-[16px] sm:leading-[22px] md:text-[18px] md:leading-[26px] lg:text-[17px] lg:leading-[28px] xl:text-[20px] xl:leading-[53px]">
            Try 3 Demo Classes @ ₹19 and See the Change!
          </p>

          {/* Bullet Points */}
          <ul className="mt-2 space-y-1.5 font-roboto font-medium text-[13px] leading-[20px] tracking-[0.03em] text-[#FEFEFE] list-disc pl-5 sm:text-[14px] sm:leading-[22px] md:text-[16px] md:leading-[24px] lg:text-[15px] lg:leading-[26px] xl:text-[18px] xl:leading-[31px]">
            <li>CBSE Board Grade 10 Classes</li>
            <li>Concepts made crystal clear by IIT teachers.</li>
            <li>24/7 AI Assistant for instant doubt resolution.</li>
            <li>Daily Practice Sheets + Mock Tests to track progress.</li>
            <li>1-on-1 extra classes for doubt resolution.</li>
          </ul>

          {/* Buttons */}
          <div className="mt-6 sm:mt-7 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={onRegister}
              className="w-full sm:w-[200px] md:w-[220px] lg:w-[210px] xl:w-[233px] h-[40px] sm:h-[42px] lg:h-[42px] xl:h-[44px] rounded-[11px] bg-[#ffd500] text-black font-roboto font-medium text-[14px] sm:text-[15px] md:text-[16px] lg:text-[15.5px] xl:text-[17.46px] leading-[18.15px] tracking-[0.03em] text-center cursor-pointer hover:bg-[#ffed4e] transition-colors duration-200 flex items-center justify-center"
            >
              Book 3 Demos @ ₹19
            </button>
            <button
              onClick={handleOpenCallback}
              className="w-full sm:w-[200px] md:w-[220px] lg:w-[210px] xl:w-[233px] h-[40px] sm:h-[42px] lg:h-[42px] xl:h-[44px] rounded-[11px] bg-white text-[#01317a] font-roboto font-medium text-[14px] sm:text-[15px] md:text-[16px] lg:text-[15.5px] xl:text-[17.46px] leading-[18.15px] tracking-[0.03em] text-center cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
            >
              Talk To A Counselor
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="relative w-full mt-4 sm:mt-5 md:mt-0 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[420px] xl:max-w-[600px]">
          <div className="relative mx-auto flex w-full items-center justify-center">
            <Image
              src="/board/hero.png"
              alt="Student with 90% In Boards sign"
              width={600}
              height={600}
              className="relative w-full h-auto object-contain max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[400px] xl:max-w-[500px] 2xl:max-w-[600px]"
              priority
            />
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
            <h2 className="text-center text-lg font-bold text-[#01317a]">We'll Call You In 24 Hrs.</h2>
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
                  <div className="flex items-center justify-center w-14 rounded-l-md border border-gray-300 bg-gray-100 text-gray-700">+91</div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0,10))}
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
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
