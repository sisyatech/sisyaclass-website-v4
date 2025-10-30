"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentFailedPage() {
  const params = useSearchParams();
  const transactionId = params.get("transactionId") || "";
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  useEffect(() => {
    setCurrentDateTime(new Date().toLocaleString());
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f8ff] flex items-center justify-center px-4">
      <div className="w-full max-w-[450px] bg-white shadow-md min-h-screen md:min-h-0 md:rounded-md md:h-auto md:py-10">
        <div className="flex flex-col items-center justify-center text-center px-5 py-10">
          <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#FC4D4D] to-[#FF2C2C] flex items-center justify-center mb-6 shadow-[0_10px_20px_rgba(252,77,77,0.3)]">
            <span className="text-white text-6xl">✖</span>
          </div>
          <h1 className="text-[24px] font-bold text-[#D91A1A] mb-3">Payment Failed!</h1>
          <p className="text-[16px] text-[#555] leading-relaxed mb-6">
            Unfortunately, your payment was not processed. Please try again or contact support.
          </p>

          <div className="w-full max-w-[350px] bg-[#f8f9ff] rounded-xl p-5 shadow-[0_4px_15px_rgba(0,0,0,0.05)] mb-6">
            <div className="flex items-center justify-between text-[14px] mb-3">
              <span className="text-[#777] flex items-center gap-2">Transaction ID</span>
              <span className="font-medium text-[#333] break-all">{transactionId}</span>
            </div>
            <div className="h-px bg-[#eee] my-3" />
            <div className="flex items-center justify-between text-[14px]">
              <span className="text-[#777] flex items-center gap-2">Date &amp; Time</span>
              <span className="font-medium text-[#333]" suppressHydrationWarning>{currentDateTime}</span>
            </div>
            <div className="h-px bg-[#eee] my-3" />
            <div className="flex items-center justify-between text-[16px] font-bold text-[#D91A1A]">
              <span>Amount Attempted</span>
              <span>₹19</span>
            </div>
          </div>

          <a
            href={`https://wa.me/919100312034?text=${encodeURIComponent(
              `Hi, I faced an issue while making a payment. My transaction ID is ${transactionId}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-md px-5 py-3 text-[16px] font-medium shadow hover:bg-[#128C7E] transition-colors"
          >
            <span className="text-[20px]">🟢</span>
            Contact Us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}


