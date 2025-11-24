"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";

export default function PaymentFailedPage() {
  const params = useSearchParams();
  const transactionId = params.get("transactionId") || "";
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
          <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#FC4D4D] to-[#FF2C2C] flex items-center justify-center mb-6 shadow-[0_10px_20px_rgba(252,77,77,0.3)]">
            <span className="text-white text-6xl">✖</span>
          </div>
          <h1 className="text-[24px] font-bold text-[#D91A1A] mb-3">Payment Failed!</h1>
          <p className="text-[16px] text-[#555] leading-relaxed mb-6">
            Unfortunately, your payment was not processed. Please try again or contact support.
          </p>

          <div className="w-full max-w-[320px] sm:max-w-[350px] bg-[#f8f9ff] rounded-xl p-4 sm:p-5 shadow-[0_4px_15px_rgba(0,0,0,0.05)] mb-5 sm:mb-6">
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
              `Hi, I faced an issue while making a payment for Doubt Solving Classes. My transaction ID is ${transactionId}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-md px-4 py-3 text-[15px] sm:text-[16px] font-medium shadow hover:bg-[#128C7E] transition-colors"
          >
            <span className="text-[20px]">🟢</span>
            Contact Us on WhatsApp
          </a>
          <a
            href="/doubt-solving"
            className="mt-4 inline-flex items-center justify-center gap-2 bg-[#01317a] text-white rounded-md px-5 py-3 text-[15px] sm:text-[16px] font-medium shadow hover:bg-[#001d4a] transition-colors"
          >
            ← Back to Doubt Solving Classes
          </a>
        </div>
      </div>
    </div>
    </>
  );
}


