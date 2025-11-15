"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { motion } from "framer-motion";

export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const transactionId = params.get("transactionId") || "";
  const amount = params.get("amount") || "₹19";
  const classFromParams = params.get("class");
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("6");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);

  useEffect(() => {
    setCurrentDateTime(new Date().toLocaleString());
  }, []);

  useEffect(() => {
    const storedClass =
      classFromParams ||
      (typeof window !== "undefined" ? localStorage.getItem("selectedClass") : null);
    if (storedClass) {
      setSelectedClass(storedClass);
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedClass", storedClass);
      }
    }
  }, [classFromParams]);

  const downloadPayload = useMemo(() => {
    const classNameNum = Number(selectedClass);
    return {
      className: Number.isFinite(classNameNum) && classNameNum > 0 ? classNameNum : 6,
      type: "Worksheet",
    };
  }, [selectedClass]);

  const triggerFileDownload = async (url: string, index: number) => {
    const fileName = url.split("/").pop() ?? `worksheet-${index + 1}.pdf`;
    try {
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) throw new Error(`Failed to download file ${fileName}`);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("[Worksheet Download] error downloading", fileName, error);
      throw error;
    }
  };

  const handleDownload = useCallback(async () => {
    try {
      setDownloadMessage(null);
      setIsDownloading(true);
      const response = await fetch(
        "https://sisyaclass.xyz/student/get_global_material_by_class_and_type",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(downloadPayload),
        }
      );
      if (!response.ok) {
        throw new Error("Unable to fetch worksheets. Please try again.");
      }
      const data = await response.json();
      if (!data?.success || !Array.isArray(data?.data) || data.data.length === 0) {
        throw new Error("No worksheets available for the selected class yet.");
      }

      for (const [index, url] of data.data.entries()) {
        await triggerFileDownload(url, index);
      }

      setDownloadMessage("Worksheet PDFs downloaded. Check your browser's downloads folder.");
    } catch (error: any) {
      setDownloadMessage(error?.message || "Download failed. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }, [downloadPayload]);

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
        <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-6 md:py-10 space-y-4">
          <Image
            src="/logo.png"
            alt="SISYA Class"
            width={120}
            height={120}
            className="mb-1 rounded-2xl shadow-[0_14px_40px_rgba(16,164,252,0.25)]"
            priority
          />
          <h1 className="text-[22px] sm:text-[24px] font-bold text-[#02BDFD]">₹19 Worksheet Bundle Unlocked!</h1>
          <button
          type="button"
          onClick={handleDownload}
            disabled={isDownloading}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01327A] px-6 py-3 text-[15px] sm:text-[16px] font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] mb-3 disabled:cursor-not-allowed disabled:opacity-75"
          >
            {isDownloading ? (
              <>
                <svg
                  className="h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2a10 10 0 1 0 10 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Preparing worksheets...
              </>
            ) : (
              <>
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
              </>
            )}
          </button>
          {downloadMessage && (
            <p className="mb-4 text-center text-sm text-[#3355A4]">{downloadMessage}</p>
          )}

          <p className="text-[16px] text-[#555] leading-relaxed mb-6">
          Thank you for enrolling in our IIT teacher-led demo classes. Our team will call you shortly.          </p>

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
            className="inline-flex items-center justify-center gap-2 bg-[#0AA76C] text-white rounded-md px-4 py-3 text-[15px] sm:text-[16px] font-medium shadow hover:bg-[#0F8F5C] transition-colors mb-4 sm:mb-6"
          >
            <Image
              src="/whatsapp.svg"
              alt="WhatsApp"
              width={20}
              height={20}
              className="h-[20px] w-[20px]"
            />
            Need help? Chat with us
          </motion.a>

        <div className="w-full max-w-[320px] sm:max-w-[350px]">
          <p className="text-[14px] sm:text-[15px] font-medium text-[#333] mb-3 flex items-center justify-center gap-2">
              Keep learning with the SISYA app
            </p>
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a href="https://play.google.com/store/apps/details?id=com.sisya.sisyaclass" className="inline-flex items-center justify-center gap-3  px-4 py-3 w-full sm:w-[160px] hover:-translate-y-[3px] hover:shadow transition">
                <Image
                  src="/googleplay.svg"
                  alt="Google Play"
                width={150}
                height={150}
                />
              </a>
            <a href="https://apps.apple.com/in/app/sisya-class-e-learning-app/id6739211295" className="inline-flex items-center justify-center gap-3  px-4 py-3 w-full sm:w-[160px] hover:-translate-y-[3px] hover:shadow transition">
                <Image
                  src="/appstore.svg"
                  alt="Apple App Store"
                width={150}
                height={150}
                />
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



