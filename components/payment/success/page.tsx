"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const transactionId = params.get("transactionId") || "";
  const amount = params.get("amount") || "₹19";
  const returnUrl = params.get("returnUrl") || "/";
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  useEffect(() => {
    setCurrentDateTime(new Date().toLocaleString());
    console.log("[PAYMENT] Success page params", { transactionId, amount });
  }, []);

  return (
    <><div className="min-h-screen bg-[#f5f8ff] flex items-center justify-center px-3">
      <div className="w-full max-w-[360px] sm:max-w-[420px] md:max-w-[450px] bg-white shadow-md min-h-[80vh] md:min-h-0 md:rounded-md md:h-auto py-6 md:py-10">
        <div className="flex flex-col items-center justify-center text-center px-4 sm:px-5 py-6 md:py-10">
          <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#10A4FC] to-[#4317FB] flex items-center justify-center mb-6 shadow-[0_10px_20px_rgba(16,164,252,0.3)]">
            <span className="text-white text-6xl">✔</span>
          </div>
          <h1 className="text-[24px] font-bold text-[#0033FF] mb-3">Payment Successful!</h1>
          <p className="text-[16px] text-[#555] leading-relaxed mb-6">Thank you for enrolling in our 10xBooster Course.</p>

          <div className="w-full max-w-[320px] sm:max-w-[350px] bg-[#f8f9ff] rounded-xl p-4 sm:p-5 shadow-[0_4px_15px_rgba(0,0,0,0.05)] mb-5 sm:mb-6">
            <div className="flex items-center justify-between text-[14px] mb-3">
              <span className="text-[#777] flex items-center gap-2">Transaction ID</span>
              <span className="font-medium text-[#333] break-all">{transactionId}</span>
            </div>
            <div className="flex items-center justify-between text-[14px] mb-3">
              <span className="text-[#777] flex items-center gap-2">Date &amp; Time</span>
              <span className="font-medium text-[#333]" suppressHydrationWarning>{currentDateTime}</span>
            </div>
            <div className="h-px bg-[#eee] my-3" />
            <div className="flex items-center justify-between text-[16px] font-bold text-[#0033FF]">
              <span>Amount Paid</span>
              <span>{amount}</span>
            </div>
          </div>

          <a
            href={`https://wa.me/919100312034?text=${encodeURIComponent(
              `Hi, I just enrolled in the Summer Camp. My transaction ID is ${transactionId}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-md px-4 py-3 text-[15px] sm:text-[16px] font-medium shadow hover:bg-[#128C7E] transition-colors mb-3"
          >
            <span className="text-[20px]">🟢</span>
            Contact Us on WhatsApp
          </a>
          <a
            href={returnUrl}
            className="inline-flex items-center justify-center gap-2 bg-[#01317a] text-white rounded-md px-5 py-3 text-[15px] sm:text-[16px] font-medium shadow hover:bg-[#001d4a] transition-colors mb-4 sm:mb-6"
          >
            ← Back
          </a>

          <div className="w-full max-w-[320px] sm:max-w-[350px]">
            <p className="text-[16px] font-medium text-[#333] mb-3 flex items-center justify-center gap-2">Download our app for the best learning experience</p>
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <a href="https://play.google.com/store/apps/details?id=com.sisya.sisyaclass" className="inline-flex items-center justify-center gap-2 bg-[#f8f9ff] border border-[#eaeaea] rounded-lg px-4 py-3 w-[120px] sm:w-[140px] hover:-translate-y-[3px] hover:shadow transition">
                <span className="text-[#3DDC84] text-[20px]">🤖</span>
                Android
              </a>
              <a href="https://apps.apple.com/in/app/sisya-class-e-learning-app/id6739211295" className="inline-flex items-center justify-center gap-2 bg-[#f8f9ff] border border-[#eaeaea] rounded-lg px-4 py-3 w-[120px] sm:w-[140px] hover:-translate-y-[3px] hover:shadow transition">
                <span className="text-black text-[20px]"></span>
                iOS
              </a>
            </div>
          </div>
        </div>
      </div>
      </div></>  
  );
}


