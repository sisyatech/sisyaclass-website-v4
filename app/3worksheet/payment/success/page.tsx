"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { motion } from "framer-motion";

export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const transactionId = params.get("transactionId") || "";
  const amount = params.get("amount") || "₹19";
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  useEffect(() => {
    setCurrentDateTime(new Date().toLocaleString());
  }, []);

  return (
    <>
      <Script id="gtm-script" strategy="afterInteractive">
        {`(function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-PMD8KHN9');`}
      </Script>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-PMD8KHN9"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      <div className="min-h-screen bg-[#f5f8ff] flex flex-col items-center justify-center px-3">
      <div className="w-full max-w-[360px] sm:max-w-[420px] md:max-w-[450px] bg-white shadow-md min-h-[80vh] md:min-h-0 md:rounded-md md:h-auto py-6 md:py-10">
        <div className="flex flex-col items-center justify-center text-center px-4 sm:px-5 py-6 md:py-10">
          <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#10A4FC] to-[#4317FB] flex items-center justify-center mb-6 shadow-[0_10px_20px_rgba(16,164,252,0.3)]">
            <span className="text-white text-6xl">✔</span>
          </div>
          <h1 className="text-[24px] font-bold text-[#0033FF] mb-3">₹19 Worksheet Bundle Unlocked!</h1>
          <a
            href="https://sisya.in/downloads/worksheet-bundle.zip"
            download
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01327A] px-6 py-3 text-[15px] sm:text-[16px] font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] mb-5"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3v12m0 0 4-4m-4 4-4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 18h12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Download Worksheet Bundle
          </a>

          <p className="text-[16px] text-[#555] leading-relaxed mb-6">
            Thank you for purchasing the IIT teacher–designed worksheet pack. 
          </p>

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

          <motion.a
            href={`https://wa.me/919100312034?text=${encodeURIComponent(
              `Hi, I just purchased the ₹19 worksheet bundle. My transaction ID is ${transactionId}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-md px-4 py-3 text-[15px] sm:text-[16px] font-medium shadow hover:bg-[#128C7E] transition-colors mb-4 sm:mb-6"
          >
            <span className="text-[20px]">🟢</span>
            Need help? Chat with us
          </motion.a>

          <div className="w-full max-w-[320px] sm:max-w-[350px]">
            <p className="text-[16px] font-medium text-[#333] mb-3 flex items-center justify-center gap-2">
              Keep learning with the SISYA app
            </p>
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
          <div className="flex flex-col items-center gap-3 w-full mt-5 sm:mt-6">
            <a
              href="/3worksheet"
              className="inline-flex items-center justify-center gap-2 bg-[#01317a] text-white rounded-md px-5 py-3 text-[15px] sm:text-[16px] font-medium shadow hover:bg-[#001d4a] transition-colors"
            >
              ← Explore More Worksheets
            </a>
            <a
              href="https://sisyaclass.com"
              className="text-[14px] text-[#3355A4] underline hover:text-[#21428A]"
            >
              Visit SISYA Homepage
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}



