"use client";

import React from "react";

const Footer = () => {
  return (
    <div className="relative py-16 px-8 w-[1442px] h-[475px] bg-[#DADADA66]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Download and Contact */}
          <div className="space-y-8">
            {/* Get link in SMS section */}
            <div>
              <h2 className="mb-6 font-roboto font-medium text-[24px] leading-[23.69px] tracking-[0.03em] text-[#1A2439]">
                Get link in SMS to download the App
              </h2>
              
              <div className="flex gap-4 mb-8">
                <div className="flex">
                  <div className="flex">
                    <div className="w-[80px] h-[53px] rounded-l-[6px] border border-[#E0E0E0] bg-[#FFFDFD] flex items-center justify-center font-roboto font-medium text-[24px] leading-[23.69px] tracking-[0.03em] text-[#1A2439]">
                      +91
                    </div>
                    <input
                      type="tel"
                      placeholder="Enter your mobile number"
                      className="w-[330px] h-[53px] border border-l-0 border-[#E0E0E0] bg-[#FFFDFD] px-4 font-['Nunito'] font-normal text-[14.15px] leading-[18.87px] text-[#1A2439] outline-none"
                    />
                  </div>
                  <button className="w-[113px] h-[53px] rounded-r-[6px] bg-[#1A2439] text-white text-[16px]">
                    Get the link
                  </button>
                </div>
              </div>

              {/* Google Play Button */}
              <div className="mb-8 -mt-4">
                <img 
                  src="/download/googleplay.svg" 
                  alt="Get it on Google Play" 
                  className="h-14 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                />
              </div>

              {/* Demo class card */}
              <div className="w-[410px] h-[120px] rounded-[14px] border border-[#E0E0E0] bg-[#FFFDFD] p-4 mb-[42px] relative">
                <h3 className="font-montserrat font-semibold text-[18px] leading-none text-[#1A2439] mb-3">
                  Know more about our courses.<br />Book a demo class
                </h3>
                <div className="flex items-center justify-between -mt-6">
                  <button className="w-[156px] h-[26.79px] rounded-[6.3px] bg-[#0595CE] font-['Rubik'] font-normal text-[14.18px] leading-none text-white flex-shrink-0">
                    Speak to an expert
                  </button>
                  <img 
                    src="/person.svg" 
                    alt="Expert person" 
                    className="w-[74px] h-[74px] flex-shrink-0"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 -mt-6">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="font-medium text-gray-700">+91 7330897291</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="22,6 12,13 2,6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="font-medium text-gray-700">contactus@sisyaclass.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Navigation Columns */}
          <div className="grid grid-cols-3 gap-8">
            {/* Company Column 1 */}
            <div>
              <h3 className="font-roboto font-medium text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="font-roboto font-normal text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70">
                    Blogs
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70">
                    News
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70">
                    Why SISYA
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column 2 */}
            <div>
              <h3 className="font-roboto font-medium text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="font-roboto font-normal text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70">
                    Blogs
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70">
                    News
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70">
                    Why SISYA
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column 3 */}
            <div>
              <h3 className="font-roboto font-medium text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="font-roboto font-normal text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70">
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70">
                    Blogs
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70">
                    News
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70">
                    Why SISYA
                  </a>
                </li>
                <li>
                  <a href="#" className="font-roboto font-normal text-[16px] leading-[20px] tracking-[0.03em] text-[#161A38] hover:opacity-70">
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
