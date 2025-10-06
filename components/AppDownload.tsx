import React from "react";
import RevealOnView from "./Reveal/RevealOnView";
import Image from "next/image";

const AppDownload = () => {
  return (
    <div className="relative mb-10 w-full">
      {/* Phone Image */}
      {/* Mobile: inline and centered; Desktop: absolute overlay on the left */}
      <div className="block md:hidden w-full bg-[#DDDEFE80]">
        <div className="pt-6 flex justify-center">
          <Image
            src="/download/phonepic.svg"
            alt="SISYA App Interface"
            width={190}
            height={400}
            className="h-[360px] w-auto"
          />
        </div>
      </div>

      <RevealOnView from="left" durationMs={1500}>
        <div className="hidden md:block absolute left-8 top-0 z-10 -translate-y-[15%]">
          <Image
            src="/download/phonepic.svg"
            alt="SISYA App Interface"
            width={250}
            height={500}
            className="h-[500px] w-auto"
          />
        </div>
      </RevealOnView>

      {/* Background Container */}
      <div className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#DDDEFE80]">
        <RevealOnView from="right" durationMs={1500}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-16">
            {/* Spacer for phone on desktop */}
            <div className="hidden md:block flex-shrink-0 w-[360px] lg:w-[420px]" />

            {/* Right Side - Content */}
            <div className="flex-1 text-left md:ml-16 lg:ml-28">
              <h2 className="font-montserrat font-bold text-[24px] leading-[28px] sm:text-[28px] sm:leading-[32px] lg:text-3xl lg:leading-none tracking-normal mb-4 sm:mb-6 text-[#1A2439]">
                Learn Anytime, Anywhere<br />at Your Own Pace
              </h2>

              {/* Subtitle */}
              <p className="font-montserrat font-medium text-[14px] leading-[18px] sm:text-[16px] sm:leading-[20px] lg:text-lg lg:leading-none tracking-normal mb-6 sm:mb-8 text-[#1A2439]">
                Download the SISYA App — India's<br />trusted learning platform
              </p>

              {/* QR Code and Download Section */}
              <RevealOnView from="bottom" durationMs={1500}>
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                  {/* QR Code with SISYA Icon */}
                  <div className="text-center order-2 sm:order-1">
                    <div className="relative inline-block mb-2">
                      <Image
                        src="/download/sisyaclass1.svg"
                        alt="QR Code"
                        width={140}
                        height={140}
                        className="w-32 h-32 sm:w-36 sm:h-36"
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-[#1A2439]">
                      Scan here to get<br />SISYA CLASS mobile app
                    </p>
                  </div>

                  {/* Download Buttons */}
                  <div className="order-1 sm:order-2 flex flex-col items-center sm:items-start gap-3 sm:gap-4">
                    {/* Download Now Button */}
                    <div className="flex justify-center w-full">
                      <button
                        className="font-bold text-[16px] sm:text-lg text-white rounded-xl sm:rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 bg-[#1A2439] w-[180px] sm:w-[210px] shadow-[0px_5.57px_5.57px_0px_#00000040]"
                      >
                        Download Now
                      </button>
                    </div>

                    {/* Store Buttons */}
                    <div className="flex gap-3 sm:gap-4">
                      <Image
                        src="/download/googleplay.svg"
                        alt="Get it on Google Play"
                        width={200}
                        height={56}
                        className="h-12 sm:h-14 w-auto cursor-pointer"
                      />

                      <Image
                        src="/download/appstore.svg"
                        alt="Download on the App Store"
                        width={200}
                        height={56}
                        className="h-12 sm:h-14 w-auto cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </RevealOnView>
            </div>
          </div>
        </RevealOnView>
      </div>
    </div>
  );
};

export default AppDownload;