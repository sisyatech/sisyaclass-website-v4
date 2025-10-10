"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/navigation";

const Footer = () => {
  const router = useRouter();

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(routes.about);
  };
  return (
    <div className="relative py-8 sm:py-12 md:py-14 lg:py-16 px-3 sm:px-6 md:px-8 w-full bg-[#DADADA66]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {/* Left Side - Download and Contact */}
          <div className="space-y-6 sm:space-y-7 md:space-y-8">
            {/* Get link in SMS section */}
            <div>
              <h2 className="mb-4 sm:mb-5 md:mb-6 font-roboto font-medium text-[18px] leading-[20px] sm:text-[20px] sm:leading-[22px] md:text-[22px] md:leading-[23.69px] lg:text-[24px] lg:leading-[23.69px] tracking-[0.03em] text-[#1A2439]">
                Get link in SMS to download the App
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-7 md:mb-8">
                <div className="flex w-full sm:w-auto">
                  <div className="flex flex-1 sm:flex-none">
                    <div className="w-[60px] min-[375px]:w-[68px] sm:w-[75px] md:w-[80px] lg:w-[70px] xl:w-[80px] h-[44px] min-[375px]:h-[46px] sm:h-[50px] md:h-[53px] lg:h-[50px] xl:h-[53px] rounded-l-[6px] border border-[#E0E0E0] bg-[#FFFDFD] flex items-center justify-center font-roboto font-medium text-[18px] min-[375px]:text-[20px] sm:text-[22px] md:text-[24px] lg:text-[20px] xl:text-[24px] leading-[23.69px] tracking-[0.03em] text-[#1A2439]">
                      +91
                    </div>
                    <input
                      type="tel"
                      placeholder="Enter your mobile number"
                      className="w-[180px] min-[375px]:w-[210px] sm:w-[280px] md:w-[330px] lg:w-[220px] xl:w-[330px] h-[44px] min-[375px]:h-[46px] sm:h-[50px] md:h-[53px] lg:h-[50px] xl:h-[53px] border border-l-0 border-[#E0E0E0] bg-[#FFFDFD] px-2 sm:px-3 md:px-4 lg:px-3 xl:px-4 font-['Nunito'] font-normal text-[12px] sm:text-[13px] md:text-[14.15px] lg:text-[12px] xl:text-[14.15px] leading-[18.87px] text-[#1A2439] outline-none placeholder:text-xs sm:placeholder:text-sm lg:placeholder:text-xs xl:placeholder:text-sm"
                    />
                  </div>
                  <button className="w-[100px] min-[375px]:w-[120px] sm:w-[140px] md:w-[163px] lg:w-[120px] xl:w-[163px] h-[44px] min-[375px]:h-[46px] sm:h-[50px] md:h-[53px] lg:h-[50px] xl:h-[53px] rounded-r-[6px] bg-[#1A2439] text-white text-[9px] min-[375px]:text-[10px] sm:text-[13px] md:text-[15px] lg:text-[12px] xl:text-[15px] font-medium">
                    Get the link
                  </button>
                </div>
              </div>

              {/* Google Play Button */}
              <div className="mb-6 sm:mb-7 md:mb-8 -mt-1 sm:-mt-2 md:-mt-4">
                <Image 
                  src="/download/googleplay.svg" 
                  alt="Get it on Google Play" 
                  width={200}
                  height={56}
                  className="h-[48px] min-[375px]:h-[50px] sm:h-[52px] md:h-14 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                />
              </div>

              {/* Demo class card */}
              <div className="w-full max-w-[410px] h-auto rounded-[12px] sm:rounded-[14px] border border-[#E0E0E0] bg-[#FFFDFD] p-3 sm:p-4 mb-6 sm:mb-8 md:mb-10 lg:mb-[42px] relative">
                <h3 className="font-montserrat font-semibold text-[15px] leading-[18px] sm:text-[16px] sm:leading-[19px] md:text-[17px] md:leading-[20px] lg:text-[18px] lg:leading-none text-[#1A2439] mb-2 sm:mb-3">
                  Know more about our courses.<br />Book a demo class
                </h3>
                <div className="flex items-center justify-between -mt-2 sm:-mt-4 md:-mt-6">
                  <button className="w-[130px] min-[375px]:w-[140px] sm:w-[150px] md:w-[156px] h-[24px] sm:h-[25px] md:h-[26.79px] rounded-[5px] sm:rounded-[6px] md:rounded-[6.3px] bg-[#0595CE] font-['Rubik'] font-normal text-[12px] sm:text-[13px] md:text-[14.18px] leading-none text-white flex-shrink-0">
                    Speak to an expert
                  </button>
                <Image 
                  src="/person.svg" 
                  alt="Expert person" 
                  width={74}
                  height={74}
                  className="w-[60px] h-[60px] min-[375px]:w-[66px] min-[375px]:h-[66px] sm:w-[70px] sm:h-[70px] md:w-[74px] md:h-[74px] flex-shrink-0"
                />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2.5 sm:space-y-3 -mt-4 sm:-mt-5 md:-mt-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="font-medium text-[13px] sm:text-[14px] md:text-[15px] text-gray-700">+91 7330897291</span>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="22,6 12,13 2,6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="font-medium text-[13px] sm:text-[14px] md:text-[15px] text-gray-700 break-all">contactus@sisyaclass.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Navigation Columns */}
          <div className="grid grid-cols-3 gap-3 sm:gap-5 md:gap-6">
            {/* Company Column 1 */}
            <div>
              <h3 className="font-roboto font-medium text-[12px] min-[375px]:text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[18px] sm:leading-[20px] tracking-[0.03em] text-[#161A38] mb-2 sm:mb-3 md:mb-4">
                Company
              </h3>
              <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
                <li>
                  <a href="#" onClick={handleAboutClick} className="font-roboto font-normal text-[11px] min-[375px]:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[16px] sm:leading-[18px] md:leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70 transition-opacity cursor-pointer">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[11px] min-[375px]:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[16px] sm:leading-[18px] md:leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70 transition-opacity">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[11px] min-[375px]:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[16px] sm:leading-[18px] md:leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70 transition-opacity">
                    Blogs
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[11px] min-[375px]:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[16px] sm:leading-[18px] md:leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70 transition-opacity">
                    News
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[11px] min-[375px]:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[16px] sm:leading-[18px] md:leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70 transition-opacity">
                    Why SISYA
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[11px] min-[375px]:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[16px] sm:leading-[18px] md:leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70 transition-opacity">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column 2 */}
            <div>
              <h3 className="font-roboto font-medium text-[12px] min-[375px]:text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[18px] sm:leading-[20px] tracking-[0.03em] text-[#161A38] mb-2 sm:mb-3 md:mb-4">
                Company
              </h3>
              <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
                <li>
                  <a href="#" onClick={handleAboutClick} className="font-roboto font-normal text-[11px] min-[375px]:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[16px] sm:leading-[18px] md:leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70 transition-opacity cursor-pointer">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[11px] min-[375px]:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[16px] sm:leading-[18px] md:leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70 transition-opacity">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[11px] min-[375px]:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[16px] sm:leading-[18px] md:leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70 transition-opacity">
                    Blogs
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[11px] min-[375px]:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[16px] sm:leading-[18px] md:leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70 transition-opacity">
                    News
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[11px] min-[375px]:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[16px] sm:leading-[18px] md:leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70 transition-opacity">
                    Why SISYA
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[11px] min-[375px]:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[16px] sm:leading-[18px] md:leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70 transition-opacity">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column 3 */}
            <div>
              <h3 className="font-roboto font-medium text-[12px] min-[375px]:text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[18px] sm:leading-[20px] tracking-[0.03em] text-[#161A38] mb-2 sm:mb-3 md:mb-4">
                Company
              </h3>
              <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
                <li>
                  <a href="#" onClick={handleAboutClick} className="font-roboto font-normal text-[11px] min-[375px]:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[16px] sm:leading-[18px] md:leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70 transition-opacity cursor-pointer">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[11px] min-[375px]:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[16px] sm:leading-[18px] md:leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70 transition-opacity">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[11px] min-[375px]:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[16px] sm:leading-[18px] md:leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70 transition-opacity">
                    Blogs
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[11px] min-[375px]:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[16px] sm:leading-[18px] md:leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70 transition-opacity">
                    News
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[11px] min-[375px]:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[16px] sm:leading-[18px] md:leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70 transition-opacity">
                    Why SISYA
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[11px] min-[375px]:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] leading-[16px] sm:leading-[18px] md:leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70 transition-opacity">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
