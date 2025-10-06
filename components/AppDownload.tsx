import React from "react";
import RevealOnView from "./Reveal/RevealOnView";
import Image from "next/image";

const AppDownload = () => {
  return (
    <div className="relative mb-42 w-[1442px] h-[393px]">
      {/* Phone Image - Positioned to overlay */}
      <RevealOnView from="left" durationMs={1500}>
        <div className="absolute left-8 top-0 z-10 -translate-y-[15%]">
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
      <div className="w-full py-12 px-8 bg-[#DDDEFE80]">
        <RevealOnView from="right" durationMs={1500}>
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-16">
            {/* Spacer for phone */}
            <div className="flex-shrink-0 w-96"></div>

            {/* Right Side - Content */}
            <div className="flex-1 text-left ml-32">
              <h2 className="font-montserrat font-bold text-3xl leading-none tracking-normal mb-6 text-[#1A2439]">
                Learn Anytime, Anywhere<br />at Your Own Pace
              </h2>

              {/* Subtitle */}
              <p className="font-montserrat font-medium text-lg leading-none tracking-normal mb-8 text-[#1A2439]">
                Download the SISYA App — India's<br />trusted learning platform
              </p>

              {/* QR Code and Download Section */}
              <RevealOnView from="bottom" durationMs={1500}>
                <div className="flex items-center gap-8">
                  {/* QR Code with SISYA Icon */}
                  <div className="text-center">
                    <div className="relative inline-block mb-2">
                      <Image
                        src="/download/sisyaclass1.svg"
                        alt="QR Code"
                        width={160}
                        height={160}
                        className="w-40 h-40"
                      />
                    </div>
                    <p className="text-sm text-[#1A2439]">
                      Scan here to get<br />SISYA CLASS mobile app
                    </p>
                  </div>

                  {/* Download Buttons */}
                  <div className="flex flex-col gap-4">
                    {/* Download Now Button */}
                    <button
                      className="font-bold text-lg text-white rounded-2xl px-5 py-3 bg-[#1A2439] w-[210px] shadow-[0px_5.57px_5.57px_0px_#00000040]"
                    >
                      Download Now
                    </button>

                    {/* Store Buttons */}
                    <div className="flex gap-4">
                      <Image
                        src="/download/googleplay.svg"
                        alt="Get it on Google Play"
                        width={200}
                        height={56}
                        className="h-14 w-auto cursor-pointer"
                      />

                      <Image
                        src="/download/appstore.svg"
                        alt="Download on the App Store"
                        width={200}
                        height={56}
                        className="h-14 w-auto cursor-pointer"
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