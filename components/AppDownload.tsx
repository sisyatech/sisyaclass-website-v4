import React from "react";
import RevealOnView from "./Reveal/RevealOnView";
import Image from "next/image";

const AppDownload = () => {
  return (
    <div className="relative mb-8 sm:mb-10 w-full">
      {/* Phone Image */}
      {/* Mobile & Tablet: inline and centered; Desktop: absolute overlay on the left */}
      <div className="block lg:hidden w-full bg-[#DDDEFE80]">
        <div className="pt-4 sm:pt-6 md:pt-8 flex justify-center">
          <Image
            src="/download/phonepic.svg"
            alt="SISYA App Interface"
            width={190}
            height={400}
            className="h-[260px] min-[375px]:h-[300px] sm:h-[340px] md:h-[380px] w-auto"
          />
        </div>
      </div>

      <RevealOnView from="left" durationMs={1500}>
        <div className="hidden lg:block absolute left-6 lg:left-8 top-0 z-10 -translate-y-[15%]">
          <Image
            src="/download/phonepic.svg"
            alt="SISYA App Interface"
            width={250}
            height={500}
            className="h-[380px] lg:h-[400px] xl:h-[500px] w-auto"
          />
        </div>
      </RevealOnView>

      {/* Background Container */}
      <div className="w-full py-6 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 bg-[#DDDEFE80]">
        <RevealOnView from="right" durationMs={1500}>
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 md:gap-8 lg:gap-16">
            {/* Spacer for phone on desktop */}
            <div className="hidden lg:block flex-shrink-0 w-[280px] lg:w-[320px] xl:w-[420px]" />
    
            {/* Right Side - Content */}
            <div className="flex-1 text-center lg:text-left lg:ml-26 xl:ml-40">
              <h2 className="font-montserrat font-bold text-[20px] leading-[26px] min-[375px]:text-[22px] min-[375px]:leading-[28px] sm:text-[26px] sm:leading-[30px] md:text-[28px] md:leading-[32px] lg:text-[26px] lg:leading-[30px] xl:text-3xl xl:leading-none tracking-normal mb-3 sm:mb-4 md:mb-5 lg:mb-4 xl:mb-6 text-[#1A2439]">
                Learn Anytime, Anywhere<br className="hidden sm:inline" />
                <span className="inline sm:hidden"> </span>at Your Own Pace
              </h2>

              {/* Subtitle */}
              <p className="font-montserrat font-medium text-[13px] leading-[17px] min-[375px]:text-[14px] min-[375px]:leading-[18px] sm:text-[15px] sm:leading-[19px] md:text-[16px] md:leading-[20px] lg:text-[15px] lg:leading-[19px] xl:text-lg xl:leading-none tracking-normal mb-5 sm:mb-6 md:mb-6 lg:mb-5 xl:mb-8 text-[#1A2439]">
                Download the SISYA App — India's<br className="hidden sm:inline" />
                <span className="inline sm:hidden"> </span>trusted learning platform
              </p>

              {/* QR Code and Download Section */}
              <RevealOnView from="bottom" durationMs={1500}>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 sm:gap-6 md:gap-6 lg:gap-8">
                  {/* QR Code with SISYA Icon */}
                  <div className="text-center order-2 sm:order-1">
                    <div className="relative inline-block mb-1.5 sm:mb-2">
                      <Image
                        src="/download/sisyaclass1.svg"
                        alt="QR Code"
                        width={140}
                        height={140}
                        className="w-[110px] h-[110px] min-[375px]:w-[120px] min-[375px]:h-[120px] sm:w-32 sm:h-32 md:w-32 md:h-32 lg:w-28 lg:h-28 xl:w-36 xl:h-36"
                      />
                    </div>
                    <p className="text-[10px] min-[375px]:text-[11px] sm:text-xs md:text-xs lg:text-[10px] xl:text-xs text-[#1A2439]">
                      Scan here to get<br />SISYA CLASS mobile app
                    </p>
                  </div>

                  {/* Download Buttons */}
                  <div className="order-1 sm:order-2 flex flex-col items-center sm:items-start gap-2.5 sm:gap-3 md:gap-3 lg:gap-2.5 xl:gap-4">
                    {/* Download Now Button */}
                    <div className="flex justify-center sm:justify-start w-full">
                      <button
                        className="font-montserrat font-bold text-[14px] min-[375px]:text-[15px] sm:text-[16px] md:text-[16px] lg:text-[15px] xl:text-lg text-white rounded-[12px] sm:rounded-xl md:rounded-xl lg:rounded-xl xl:rounded-2xl px-3 min-[375px]:px-4 sm:px-5 md:px-5 lg:px-4 xl:px-5 py-2 sm:py-2.5 md:py-2.5 lg:py-2 xl:py-3 bg-[#1A2439] w-[160px] min-[375px]:w-[170px] sm:w-[190px] md:w-[200px] lg:w-[170px] xl:w-[210px] shadow-[0px_5.57px_5.57px_0px_#00000040]"
                      >
                        Download Now
                      </button>
                    </div>

                    {/* Store Buttons */}
                    <div className="flex gap-2 min-[375px]:gap-2.5 sm:gap-3 md:gap-3 lg:gap-2 xl:gap-4">
                      <Image
                        src="/download/googleplay.svg"
                        alt="Get it on Google Play"
                        width={200}
                        height={56}
                        className="h-[42px] min-[375px]:h-[46px] sm:h-[50px] md:h-[50px] lg:h-[46px] xl:h-14 w-auto cursor-pointer"
                      />

                      <Image
                        src="/download/appstore.svg"
                        alt="Download on the App Store"
                        width={200}
                        height={56}
                        className="h-[42px] min-[375px]:h-[46px] sm:h-[50px] md:h-[50px] lg:h-[46px] xl:h-14 w-auto cursor-pointer"
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