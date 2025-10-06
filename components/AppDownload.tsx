import React from "react";

const AppDownload = () => {
  return (
    <div className="relative mb-42 w-[1442px] h-[393px]">
      {/* Phone Image - Positioned to overlay */}
      <div className="absolute left-8 top-0 z-10 -translate-y-[15%]">
        <img 
          src="/download/phonepic.svg" 
          alt="SISYA App Interface" 
          className="h-[500px] w-auto"
        />
      </div>

      {/* Background Container */}
      <div className="w-full py-12 px-8 bg-[#DDDEFE80]">
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
            <div className="flex items-center gap-8">
              {/* QR Code with SISYA Icon */}
              <div className="text-center">
                <div className="relative inline-block mb-2">
                  <img 
                    src="/download/sisyaclass1.svg" 
                    alt="QR Code" 
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
                  className="font-bold text-lg text-white rounded-2xl shadow-lg px-8 py-3 bg-[#1A2439]"
                >
                  Download Now
                </button>

                {/* Store Buttons */}
                <div className="flex gap-4">
                  <img 
                    src="/download/googleplay.svg" 
                    alt="Get it on Google Play" 
                    className="h-14 w-auto cursor-pointer"
                  />
                  
                  <img 
                    src="/download/appstore.svg" 
                    alt="Download on the App Store" 
                    className="h-14 w-auto cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;