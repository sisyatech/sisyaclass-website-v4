"use client";

import React from "react";
import Image from "next/image";

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
  const [error, setError] = React.useState<string | null>(null);

  const isValidMobile = (num: string) => /^[6-9]\d{9}$/.test(num);

  const handleOpenCallback = () => {
    if (onGetCallback) {
      console.log('[CALLBACK] External onGetCallback handler invoked');
      onGetCallback();
      return;
    }
    console.log('[CALLBACK] Opening internal callback modal');
    setShowCallback(true);
  };

  const handleSubmitCallback = async () => {
    setError(null);
    if (!name.trim()) { console.log('[CALLBACK][VALIDATION] Missing name'); setError("Please enter your name"); return; }
    if (!isValidMobile(phone)) { console.log('[CALLBACK][VALIDATION] Invalid phone:', phone); setError("Enter a valid 10-digit mobile number"); return; }
    setSubmitting(true);
    try {
      const email = `${phone}@gmail.com`;
      const payload = {
        name,
        phone,
        cf_class: 'Class 1',
        message: question,
        email,
        source: 'callback_requested',
        medium: 'web',
        campaign: 'CALLBACK'
      };
      console.log('[CALLBACK][REQUEST] create_merrito_lead →', payload);
      const res = await fetch('https://sisyaclass.xyz/student/create_merrito_lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      console.log('[CALLBACK][RESPONSE] status:', res.status);
      const text = await res.text();
      console.log('[CALLBACK][RESPONSE] raw:', text);
      let data: any = {};
      try { data = text ? JSON.parse(text) : {}; } catch { }
      console.log('[CALLBACK][RESPONSE] parsed:', data);
      if (res.ok && (data?.success ?? true)) {
        console.log('[CALLBACK] Success - redirecting to success page');
        window.location.href = '/3dayslp/success.php';
      } else {
        let msg = data?.message || data?.error || `Request failed (${res.status})`;
        if (res.status === 400 && typeof msg === 'string' && msg.toLowerCase().includes('lead not created')) {
          msg = 'Too many attempts, try again after some time';
        }
        console.warn('[CALLBACK] Failed:', msg);
        setError(msg);
      }
    } catch (e) {
      console.error('[CALLBACK] Network error:', e);
      setError("Network error. Please try again.");
    } finally {
      console.log('[CALLBACK] Submit finished');
      setSubmitting(false);
    }
  };
  return (
    <section className="bg-[#01317a] text-white relative overflow-hidden py-10 md:py-12 min-h-[520px] md:min-h-[600px]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-stretch gap-6 min-h-[500px] relative px-4">
        <div className="flex-1 p-0 md:p-4 flex flex-col justify-center text-center md:text-left">
          <h2 className="text-2xl md:text-[3rem] md:leading-[3.4rem] font-bold mb-1">
            Fix Your Child’s Weak
          </h2>
          <h1 className="text-3xl md:text-[3em] md:leading-[3.4rem] font-bold mb-2">Chapters Before Finals</h1>
          <h2 className="font-bold text-xl md:text-[2rem] md:leading-[2.6rem] mb-4">Join Our Revision Batch Today</h2>
          <h2 className="font-bold text-base md:text-[1rem] md:leading-8 mb-1 rounded-[5px] border border-[#eeeeee] p-[5px] text-center w-full md:w-[60%] max-w-[420px] mx-auto md:mx-0">
            Maths | Physics | Chemistry | EVS | English
          </h2>
          <ul className="mt-2 space-y-[0.6rem]">
            <li>✅  4 Month Revision With IIT Teachers</li>
            <li>✅  CBSE, ICSE &amp; State Boards Covered</li>

            <li>✅  Get 1-on-1 Extra Doubt Solving Classes</li>
            <li>✅  Choose Between 8 PM To 9 PM</li>
          </ul>
          <div className="mt-4 mb-6 flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              className="inline-flex items-center justify-center font-semibold text-[1.125rem] leading-[1.2] rounded-lg cursor-pointer z-10 min-w-[180px] h-[52px] px-9 bg-[#ffd500] text-black"
              onClick={onRegister}
            >
              Join Revision Batch
            </button>
            <button
              className="inline-flex items-center justify-center font-semibold text-[1.125rem] leading-[1.2] rounded-lg cursor-pointer z-10 min-w-[180px] h-[52px] px-9 bg-white text-[#01317a] border border-white/70 hover:bg-white/90"
              onClick={handleOpenCallback}
            >
              Get Call Back
            </button>
          </div>
        </div>

        <div className="flex-1 md:absolute md:right-0 md:bottom-0 md:h-full md:w-1/2 flex justify-center items-center pointer-events-none mt-4 md:mt-0">
          <Image
            src="/10x/girl-image.svg"
            alt="Hero Illustration"
            width={380}
            height={380}
            className="w-3/4 max-w-xs md:max-w-none md:w-auto"
          />
          <Image
            className="hidden md:block absolute w-[70px] object-contain pointer-events-none top-[10%] left-[10%]"
            src="/10x/book-icon.png"
            alt="Book Icon"
            width={70}
            height={70}
            style={{ animation: "float 3s ease-in-out infinite" }}
          />
          <Image
            className="hidden md:block absolute w-[70px] object-contain pointer-events-none bottom-[20%] right-[5%]"
            src="/10x/flask-icon.png"
            alt="Flask Icon"
            width={70}
            height={70}
            style={{ animation: "float 4s ease-in-out infinite 1s" as any }}
          />
          <Image
            className="hidden md:block absolute w-[70px] object-contain pointer-events-none top-[15%] right-[8%]"
            src="/10x/microscope-hand.png"
            alt="Microscope hand Icon"
            width={70}
            height={70}
            style={{ animation: "rotateFloat 5s ease-in-out infinite" }}
          />
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
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
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
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0); }
        }
        @keyframes rotateFloat {
          0% { transform: rotate(0deg) translateY(0); }
          50% { transform: rotate(5deg) translateY(-8px); }
          100% { transform: rotate(0deg) translateY(0); }
        }
      `}</style>
    </section>
  );
}


