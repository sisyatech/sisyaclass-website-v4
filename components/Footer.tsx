"use client"; // Required for useState, useRouter, useEffect, onClick handlers

import React, { useState } from "react"; // Added useState
import Image from "next/image";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/navigation"; // Assuming this defines your routes
import { API_BASE_URL } from "@/lib/config";

const Footer = () => {
  const router = useRouter();

  // --- Start: Added State and Handlers for Phone Input ---
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 10) { // Limit to 10 digits
      setPhoneNumber(value);
    }
    setMessage(null); // Clear previous messages on input change
  };

  const handleGetLinkClick = async () => {
    if (phoneNumber.length !== 10) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsLoading(true);
    setMessage(null);

      const apiUrl = `${API_BASE_URL}/student/send_msg_x`; // <-- API URL
    const payload = {
      phone: phoneNumber,
      template: "67923b29d6fc050bf8495373" // Hardcoded template ID
    };

    try {
      // //console.log("Sending payload:", JSON.stringify(payload), "to", apiUrl);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers your backend requires
        },
        body: JSON.stringify(payload),
        mode: 'cors' // Explicitly set CORS mode
      });

      // //console.log("API Response Status:", response.status);
      const responseBody = await response.text(); // Read body once
      // //console.log("API Response Body:", responseBody);

      if (response.ok) {
        // Try parsing JSON only if response is OK
        try {
            const successData = JSON.parse(responseBody); // Assuming responseBody is defined from above
            setMessage("Link sent successfully!");
            setPhoneNumber(''); // Clear input
            // //console.log("API call successful:", successData);
        } catch (jsonError) {
             // Handle cases where OK response is not JSON (or empty)
             // //console.log("API call successful but response was not valid JSON:", responseBody);
             setMessage("Link sent successfully! (Check SMS)"); // Provide generic success
             setPhoneNumber('');
        }

      } else {
        // Handle error response (Try parsing as JSON, fallback to text)
        let errorMessage = 'Failed to send link.';
        try {
            const errorData = JSON.parse(responseBody); // Assuming responseBody is defined from above
            errorMessage = errorData.message || `Server error (${response.status})`;
        } catch (jsonError) {
             errorMessage = `Server error (${response.status}): ${responseBody}`; // Use raw text if not JSON
        }
        setMessage(`Error: ${errorMessage}`);
        //console.error("API call failed:", response.status, responseBody);
      }
    } catch (error) {
      // Handle network errors (fetch itself failed)
      setMessage("A network error occurred. Please check your connection and try again.");
      //console.error("Network error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // --- End: Added State and Handlers ---


  // --- Start: Existing Navigation Handlers ---
  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(routes.about);
  };

  const handleBlogsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(routes.blogs);
  };

  const handleNewsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(routes.news);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(routes.contact);
  };

  const handleFAQClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Check if on homepage before scrolling, otherwise navigate to home + hash
    if (window.location.pathname === '/') {
        const faqElement = document.getElementById('faqs');
        if (faqElement) {
            faqElement.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        router.push('/#faqs'); // Navigate to home page and then scroll (browser handles hash scroll)
    }
  };

  const handlePrivacyPolicyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/privacy-policy');
  };

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/terms-and-conditions');
  };

  const handleRefundPolicyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/refund-policy');
  };

  const handleCareersClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(routes.careers);
  };
   // --- End: Existing Navigation Handlers ---


  return (
    <div className="relative w-full bg-[#DADADA66] px-3 py-8 sm:px-6 sm:py-12 md:px-8 md:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left Side - Download and Contact */}
          <div className="space-y-6 sm:space-y-7 md:space-y-8">
            {/* Get link in SMS section */}
            <div>
              <h2 className="font-roboto mb-4 max-w-[300px] text-[18px] leading-[20px] font-medium tracking-[0.03em] text-[#1A2439] sm:mb-5 sm:max-w-[400px] sm:text-[20px] sm:leading-[22px] md:mb-6 md:max-w-[600px] md:text-[22px] md:leading-[23.69px] lg:max-w-[800px] lg:text-[24px] lg:leading-[23.69px]">
                Get link in SMS to download the App
              </h2>

              {/* --- Start: Updated Phone Input Form --- */}
              <div className="mb-2 flex flex-col gap-2 sm:mb-3 sm:flex-row sm:gap-3 md:mb-4 md:gap-4"> {/* Reduced bottom margin */}
                <div className="flex w-full sm:w-auto">
                  <div className="flex flex-1 sm:flex-none">
                    <div className="font-roboto flex h-[44px] w-[60px] items-center justify-center rounded-l-[6px] border border-r-0 border-[#E0E0E0] bg-[#FFFDFD] text-[13px] leading-[23.69px] font-medium tracking-[0.03em] text-[#1A2439] min-[375px]:h-[46px] min-[375px]:w-[68px] min-[375px]:text-[20px] sm:h-[50px] sm:w-[75px] sm:text-[22px] md:h-[53px] md:w-[80px] md:text-[24px] lg:h-[50px] lg:w-[70px] lg:text-[20px] xl:h-[53px] xl:w-[80px] xl:text-[24px]"> {/* Added border-r-0 */}
                      +91
                    </div>
                    {/* Input with value and onChange */}
                    <input
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={phoneNumber}
                      onChange={handleInputChange}
                      maxLength={10}
                      className="h-[44px] w-44 rounded-none border border-l-0 border-r-0 border-[#E0E0E0] bg-[#FFFDFD] px-2 font-['Nunito'] text-[12px] leading-[18.87px] font-normal text-[#1A2439] outline-none placeholder:text-xs min-[375px]:h-[46px] min-[375px]:w-52 sm:h-[50px] sm:w-56 sm:px-3 sm:text-[13px] sm:placeholder:text-sm md:h-[53px] md:px-4 md:text-[14.15px] lg:h-[50px] lg:w-48 lg:px-3 lg:text-[12px] lg:placeholder:text-xs xl:h-[53px] xl:w-56 xl:px-4 xl:text-[14.15px] xl:placeholder:text-sm focus:z-10 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 relative" // Added focus styles, rounded-none, border-r-0, focus:z-10, relative
                    />
                  </div>
                   {/* Button with onClick, disabled state, and loading text */}
                  <button
                    onClick={handleGetLinkClick}
                    disabled={isLoading}
                    className={`cursor-pointer h-[44px] w-[100px] rounded-r-[6px] border border-l-0 border-transparent bg-[#1A2439] text-[9px] font-medium text-white transition-colors duration-200 min-[375px]:h-[46px] min-[375px]:w-[120px] min-[375px]:text-[10px] sm:h-[50px] sm:w-[140px] sm:text-[13px] md:h-[53px] md:w-[163px] md:text-[15px] lg:h-[50px] lg:w-[120px] lg:text-[12px] xl:h-[53px] xl:w-[163px] xl:text-[15px] ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800'}`} // Added focus styles, border for alignment
                  >
                    {isLoading ? 'Sending...' : 'Get the link'}
                  </button>
                </div>
              </div>
              {/* Display Message Area */}
               {message && (
                 // Added mb-6 etc. to restore original spacing below this element
                <p className={`mb-6 text-sm sm:mb-7 md:mb-8 ${message.startsWith('Error') || message.startsWith('An error') || message.startsWith('A network') ? 'text-red-600' : 'text-green-600'}`}> {/* Improved error check */}
                  {message}
                </p>
              )}
               {/* --- End: Updated Phone Input Form --- */}

              {/* Google Play Button */}
              {/* Adjusted margins to account for message potentially pushing it down */}
              <div className={`${message ? 'mt-0' : '-mt-1 sm:-mt-2 md:-mt-4'} mb-6 sm:mb-7 md:mb-8`}>
                <a
                  href="https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&hl=en_IN"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get it on Google Play"
                >
                  <Image
                    src="/download/googleplay.svg"
                    alt="Get it on Google Play"
                    width={200}
                    height={56}
                    className="h-[48px] w-auto cursor-pointer transition-opacity hover:opacity-80 min-[375px]:h-[50px] sm:h-[52px] md:h-14"
                  />
                </a>
              </div>

              {/* Demo class card */}
              <div className="relative mb-6 h-auto w-full max-w-[410px] rounded-[12px] border border-[#E0E0E0] bg-[#FFFDFD] p-3 sm:mb-8 sm:rounded-[14px] sm:p-4 md:mb-10 lg:mb-[42px]">
                <h3 className="font-montserrat mb-2 text-[15px] leading-[18px] font-semibold text-[#1A2439] sm:mb-3 sm:text-[16px] sm:leading-[19px] md:text-[17px] md:leading-[20px] lg:text-[18px] lg:leading-none">
                  Know more about our courses.
                  <br />
                  Book a demo class
                </h3>
                <div className="-mt-2 flex items-center justify-between sm:-mt-4 md:-mt-6">
                   {/* Consider adding onClick to this button */}
                  <button className="cursor-pointer h-[24px] w-[130px] flex-shrink-0 rounded-[5px] bg-[#0595CE] font-['Rubik'] text-[12px] leading-none font-normal text-white min-[375px]:w-[140px] sm:h-[25px] sm:w-[150px] sm:rounded-[6px] sm:text-[13px] md:h-[26.79px] md:w-[156px] md:rounded-[6.3px] md:text-[14.18px] hover:bg-blue-700 transition-colors">
                    Speak to an expert
                  </button>
                  <Image
                    src="/person.svg"
                    alt="Expert person"
                    width={74}
                    height={74}
                    className="h-[60px] w-[60px] flex-shrink-0 min-[375px]:h-[66px] min-[375px]:w-[66px] sm:h-[70px] sm:w-[70px] md:h-[74px] md:w-[74px]"
                  />
                </div>
              </div>

              {/* Contact Information */}
              {/* Adjusted negative margin */}
              <div className={`${message ? '-mt-4' : '-mt-4 sm:-mt-5 md:-mt-6'} space-y-2.5 sm:space-y-3`}>
                <a 
                  href="https://wa.me/917330897291"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 group cursor-pointer"
                >
                  <div className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" className="stroke-[#6B7280] group-hover:stroke-[#25D366] transition-colors" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[13px] font-medium text-gray-700 sm:text-[14px] md:text-[15px] group-hover:text-[#25D366] transition-colors">
                    +91 7330897291
                  </span>
                </a>
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=contactus@sisyaclass.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 group cursor-pointer"
                >
                  <div className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5">
                     <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" className="stroke-[#6B7280] group-hover:stroke-[#0595CE] transition-colors" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                       <polyline points="22,6 12,13 2,6" className="stroke-[#6B7280] group-hover:stroke-[#0595CE] transition-colors" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                  </div>
                  <span className="text-[13px] font-medium break-all text-gray-700 sm:text-[14px] md:text-[15px] group-hover:text-[#0595CE] transition-colors">
                    contactus@sisyaclass.com
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Navigation Columns */}
          <div className="grid grid-cols-3 gap-3 sm:gap-5 md:gap-6">
            {/* Company Column 1 */}
            <div>
              <h3 className="font-roboto mb-2 text-[12px] leading-[18px] font-medium tracking-[0.03em] text-[#161A38] min-[375px]:text-[13px] sm:mb-3 sm:text-[14px] sm:leading-[20px] md:mb-4 md:text-[15px] lg:text-[16px]">
                Company
              </h3>
              <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
                <li>
                  <a
                    href="#"
                    onClick={handleAboutClick}
                    className="font-roboto cursor-pointer text-[11px] leading-[16px] font-normal tracking-[0.03em] text-[#161A38] transition-opacity hover:opacity-70 min-[375px]:text-[12px] sm:text-[13px] sm:leading-[18px] md:text-[14px] md:leading-[20px] lg:text-[16px]"
                  >
                    About us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={handleContactClick}
                    className="font-roboto cursor-pointer text-[11px] leading-[16px] font-normal tracking-[0.03em] text-[#161A38] transition-opacity hover:opacity-70 min-[375px]:text-[12px] sm:text-[13px] sm:leading-[18px] md:text-[14px] md:leading-[20px] lg:text-[16px]"
                  >
                    Contact us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={handleBlogsClick}
                    className="font-roboto cursor-pointer text-[11px] leading-[16px] font-normal tracking-[0.03em] text-[#161A38] transition-opacity hover:opacity-70 min-[375px]:text-[12px] sm:text-[13px] sm:leading-[18px] md:text-[14px] md:leading-[20px] lg:text-[16px]"
                  >
                    Blogs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={handleNewsClick}
                    className="font-roboto cursor-pointer text-[11px] leading-[16px] font-normal tracking-[0.03em] text-[#161A38] transition-opacity hover:opacity-70 min-[375px]:text-[12px] sm:text-[13px] sm:leading-[18px] md:text-[14px] md:leading-[20px] lg:text-[16px]"
                  >
                    News
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    onClick={handleCareersClick}
                    className="font-roboto cursor-pointer text-[11px] leading-[16px] font-normal tracking-[0.03em] text-[#161A38] transition-opacity hover:opacity-70 min-[375px]:text-[12px] sm:text-[13px] sm:leading-[18px] md:text-[14px] md:leading-[20px] lg:text-[16px]"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Column 2 */}
            <div>
              <h3 className="font-roboto mb-2 text-[12px] leading-[18px] font-medium tracking-[0.03em] text-[#161A38] min-[375px]:text-[13px] sm:mb-3 sm:text-[14px] sm:leading-[20px] md:mb-4 md:text-[15px] lg:text-[16px]">
                Resources
              </h3>
              <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
                <li>
                  <a
                    href="#" // Add actual link later
                    className="font-roboto cursor-pointer text-[11px] leading-[16px] font-normal tracking-[0.03em] text-[#161A38] transition-opacity hover:opacity-70 min-[375px]:text-[12px] sm:text-[13px] sm:leading-[18px] md:text-[14px] md:leading-[20px] lg:text-[16px]"
                  >
                    NCERT Solutions
                  </a>
                </li>
                <li>
                  <a
                    href="#" // Add actual link later
                    className="font-roboto cursor-pointer text-[11px] leading-[16px] font-normal tracking-[0.03em] text-[#161A38] transition-opacity hover:opacity-70 min-[375px]:text-[12px] sm:text-[13px] sm:leading-[18px] md:text-[14px] md:leading-[20px] lg:text-[16px]"
                  >
                    Sample Papers
                  </a>
                </li>
                <li>
                  <a
                    href="#" // Add actual link later
                    className="font-roboto cursor-pointer text-[11px] leading-[16px] font-normal tracking-[0.03em] text-[#161A38] transition-opacity hover:opacity-70 min-[375px]:text-[12px] sm:text-[13px] sm:leading-[18px] md:text-[14px] md:leading-[20px] lg:text-[16px]"
                  >
                    Previous Year Papers
                  </a>
                </li>
                <li>
                  <a
                    href="#" // Add actual link later
                    className="font-roboto cursor-pointer text-[11px] leading-[16px] font-normal tracking-[0.03em] text-[#161A38] transition-opacity hover:opacity-70 min-[375px]:text-[12px] sm:text-[13px] sm:leading-[18px] md:text-[14px] md:leading-[20px] lg:text-[16px]"
                  >
                    Study Materials
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Column 3 */}
            <div>
              <h3 className="font-roboto mb-2 text-[12px] leading-[18px] font-medium tracking-[0.03em] text-[#161A38] min-[375px]:text-[13px] sm:mb-3 sm:text-[14px] sm:leading-[20px] md:mb-4 md:text-[15px] lg:text-[16px]">
                Support
              </h3>
              <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
                <li>
                  <a
                    href="#" // Add actual link later
                    className="font-roboto cursor-pointer text-[11px] leading-[16px] font-normal tracking-[0.03em] text-[#161A38] transition-opacity hover:opacity-70 min-[375px]:text-[12px] sm:text-[13px] sm:leading-[18px] md:text-[14px] md:leading-[20px] lg:text-[16px]"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={handlePrivacyPolicyClick}
                    className="font-roboto cursor-pointer text-[11px] leading-[16px] font-normal tracking-[0.03em] text-[#161A38] transition-opacity hover:opacity-70 min-[375px]:text-[12px] sm:text-[13px] sm:leading-[18px] md:text-[14px] md:leading-[20px] lg:text-[16px]"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={handleTermsClick}
                    className="font-roboto cursor-pointer text-[11px] leading-[16px] font-normal tracking-[0.03em] text-[#161A38] transition-opacity hover:opacity-70 min-[375px]:text-[12px] sm:text-[13px] sm:leading-[18px] md:text-[14px] md:leading-[20px] lg:text-[16px]"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={handleRefundPolicyClick}
                    className="font-roboto cursor-pointer text-[11px] leading-[16px] font-normal tracking-[0.03em] text-[#161A38] transition-opacity hover:opacity-70 min-[375px]:text-[12px] sm:text-[13px] sm:leading-[18px] md:text-[14px] md:leading-[20px] lg:text-[16px]"
                  >
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={handleFAQClick}
                    className="font-roboto cursor-pointer text-[11px] leading-[16px] font-normal tracking-[0.03em] text-[#161A38] transition-opacity hover:opacity-70 min-[375px]:text-[12px] sm:text-[13px] sm:leading-[18px] md:text-[14px] md:leading-[20px] lg:text-[16px]"
                  >
                    FAQ
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