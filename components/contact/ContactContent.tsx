"use client";

import React, { useState } from "react";
import RevealOnView from "../Reveal/RevealOnView";

const ContactContent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    state: "",
    cf_class: ""
  });
  
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error">("success");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setPopupMessage("Please fill in all required fields.");
      setPopupType("error");
      setShowPopup(true);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setPopupMessage("Please enter a valid email address.");
      setPopupType("error");
      setShowPopup(true);
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      setPopupMessage("Please enter a valid 10-digit phone number.");
      setPopupType("error");
      setShowPopup(true);
      return;
    }

    try {
      // Clean phone number (remove all non-digits)
      const cleanPhone = formData.phone.replace(/\D/g, '');
      
      // Payload with all required fields for Merritto
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: cleanPhone,
        email: formData.email.trim().toLowerCase(),
        message: formData.message.trim(),
        cf_class: "contactus",
        source: "contactus",
        medium: "contactus", 
        campaign: "contactus"
      };

      console.log('Sending payload:', payload);

      const response = await fetch('https://sisyaclass.xyz/student/create_merrito_lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (response.ok) {
        const responseData = await response.json();
        console.log('Success response:', responseData);
        setPopupMessage('Thank you for contacting us! We will get back to you soon.');
        setPopupType("success");
        setShowPopup(true);
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          state: "",
          cf_class: ""
        });
      } else {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        
        // Check if it's a Merritto-specific error
        if (errorData.includes('Merritto') || errorData.includes('Failed to send lead')) {
          // Still show success to user since data was received by backend
          setPopupMessage('Thank you for contacting us! We have received your message and will get back to you soon.');
          setPopupType("success");
          setShowPopup(true);
          // Reset form anyway
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
            state: "",
            cf_class: ""
          });
        } else {
          setPopupMessage(`Something went wrong. Error: ${response.status} - ${errorData}`);
          setPopupType("error");
          setShowPopup(true);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setPopupMessage('Something went wrong. Please try again.');
      setPopupType("error");
      setShowPopup(true);
    }
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Page Title */}
        <RevealOnView from="top" durationMs={600} delayMs={200}>
          <div className="mb-4 sm:mb-6 md:mb-8">
            <h1 className="font-montserrat font-bold text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] leading-[120%] text-[#1A2439]">
              Contact Us
            </h1>
          </div>
        </RevealOnView>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20">
          
          {/* Left Column - Information */}
          <RevealOnView from="left" durationMs={800} delayMs={400}>
            <div className="space-y-6 sm:space-y-8 md:space-y-10">
              
              {/* Grievance Redressal */}
              <div>
                <h2 className="font-montserrat font-bold text-[20px] sm:text-[22px] md:text-[24px] text-[#1A2439] mb-2 sm:mb-3">
                  Grievance Redressal
                </h2>
                <div className="space-y-2 sm:space-y-3">
                  <p className="font-montserrat font-normal text-[14px] sm:text-[15px] leading-[160%] text-[#1A2439]">
                    SISYA CLASS is a Founding member of the India EdTech Consortium (IEC), which is a self-regulatory body. As a member of the IEC, SISYA CLASS is committed to resolve grievances within 30 days.
                  </p>
                  <p className="font-montserrat font-normal text-[14px] sm:text-[15px] leading-[160%] text-[#1A2439]">
                    Please fill the form to share your queries, feedback, or any concerns you may have about SISYA CLASS or our programs.
                  </p>
                  <p className="font-montserrat font-normal text-[14px] sm:text-[15px] leading-[160%] text-[#1A2439]">
                    You may also write to us on{" "}
                    <a href="mailto:grievance@sisyaclass.com" className="text-[#0595CE] hover:underline">
                      grievance@sisyaclass.com
                    </a>{" "}
                    or call us on{" "}
                    <a href="tel:1800-120-456-456" className="text-[#0595CE] hover:underline">
                      1800-120-456-456
                    </a>{" "}
                    or{" "}
                    <a href="tel:+91-988-660-2456" className="text-[#0595CE] hover:underline">
                      +91 988-660-2456
                    </a>
                  </p>
                </div>
              </div>

              {/* Address */}
              <div>
                <h2 className="font-montserrat font-bold text-[20px] sm:text-[22px] md:text-[24px] text-[#1A2439] mb-2 sm:mb-3">
                  Address
                </h2>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#0595CE] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-montserrat font-semibold text-[14px] sm:text-[15px] text-[#1A2439]">
                      SISIYA EDTECH PVT. LTD.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#0595CE] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-montserrat font-normal text-[14px] sm:text-[15px] leading-[160%] text-[#1A2439]">
                        Bhupathi Surya Central Mall, 3rd Floor, Dondaparthy, Railway new colony
                      </p>
                      <p className="font-montserrat font-normal text-[14px] sm:text-[15px] leading-[160%] text-[#1A2439]">
                        Visakhapatnam, Andhra Pradesh, India
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <svg className="w-4 h-4 text-[#0595CE]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-montserrat font-normal text-[14px] sm:text-[15px] text-[#1A2439]">
                          530016
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#0595CE] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <div>
                      <p className="font-montserrat font-normal text-[14px] sm:text-[15px] text-[#1A2439]">
                        WhatsApp:{" "}
                        <a href="tel:+91-7393939143" className="text-[#0595CE] hover:underline">
                          +91 7393939143
                        </a>
                      </p>
                      <p className="font-montserrat font-normal text-[14px] sm:text-[15px] text-[#1A2439] mt-1">
                        Time: Mon-Sat: 11 AM - 9 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#0595CE] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <div>
                      <a href="mailto:contactus@sisyaclass.com" className="font-montserrat font-normal text-[14px] sm:text-[15px] text-[#0595CE] hover:underline">
                        contactus@sisyaclass.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grievance Officer */}
              <div>
                <h2 className="font-montserrat font-bold text-[20px] sm:text-[22px] md:text-[24px] text-[#1A2439] mb-2 sm:mb-3">
                  Grievance Officer appointed under the Consumer Protection (E-commerce) Rules, 2020
                </h2>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#0595CE] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <div className="space-y-2">
                      <p className="font-montserrat font-normal text-[14px] sm:text-[15px] text-[#1A2439]">
                        <span className="font-semibold">Name:</span> Pooja Bheemaiah
                      </p>
                      <p className="font-montserrat font-normal text-[14px] sm:text-[15px] text-[#1A2439]">
                        <span className="font-semibold">Designation:</span> Associate Director - Care
                      </p>
                      <p className="font-montserrat font-normal text-[14px] sm:text-[15px] text-[#1A2439]">
                        <a href="mailto:grievance@sisyaclass.com" className="text-[#0595CE] hover:underline">
                          grievance@sisyaclass.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Follow us */}
              <div>
                <h2 className="font-montserrat font-bold text-[20px] sm:text-[22px] md:text-[24px] text-[#1A2439] mb-2 sm:mb-3">
                  Follow us
                </h2>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 bg-[#3B5998] rounded-full flex items-center justify-center hover:bg-[#2D4373] transition-colors">
                    <span className="text-white font-bold text-lg">f</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-[#1DA1F2] rounded-full flex items-center justify-center hover:bg-[#0D8BD9] transition-colors">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-12 h-12 bg-[#DB4437] rounded-full flex items-center justify-center hover:bg-[#C23321] transition-colors">
                    <span className="text-white font-bold text-lg">G+</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-[#0077B5] rounded-full flex items-center justify-center hover:bg-[#005885] transition-colors">
                    <span className="text-white font-bold text-sm">in</span>
                  </a>
                </div>
              </div>
            </div>
          </RevealOnView>

          {/* Right Column - Contact Form */}
          <RevealOnView from="right" durationMs={800} delayMs={600}>
            <div>
              <h2 className="font-montserrat font-bold text-[24px] sm:text-[28px] md:text-[32px] text-[#1A2439] mb-6 sm:mb-8">
                General Enquiry
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* First Row - Name and Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter Name"
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0595CE] focus:border-transparent font-montserrat text-[16px] placeholder-gray-400"
                      required
                    />
                    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Last Name */}
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter Last Name"
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0595CE] focus:border-transparent font-montserrat text-[16px] placeholder-gray-400"
                      required
                    />
                    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Second Row - Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter Email"
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0595CE] focus:border-transparent font-montserrat text-[16px] placeholder-gray-400"
                      required
                    />
                    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter Phone number"
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0595CE] focus:border-transparent font-montserrat text-[16px] placeholder-gray-400"
                      required
                    />
                    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                </div>

                {/* Third Row - State and Class (Optional) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* State */}
                  <div className="relative">
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Enter State (Optional)"
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0595CE] focus:border-transparent font-montserrat text-[16px] placeholder-gray-400"
                    />
                    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Class */}
                  <div className="relative">
                    <input
                      type="text"
                      name="cf_class"
                      value={formData.cf_class}
                      onChange={handleInputChange}
                      placeholder="Enter Class (Optional)"
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0595CE] focus:border-transparent font-montserrat text-[16px] placeholder-gray-400"
                    />
                    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write your message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0595CE] focus:border-transparent font-montserrat text-[16px] placeholder-gray-400 resize-none"
                    required
                  />
                </div>


                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#20B2AA] text-white py-3 sm:py-4 font-montserrat font-bold text-[16px] sm:text-[18px] hover:bg-[#1A9B94] transition-colors duration-200"
                >
                  SUBMIT
                </button>
              </form>

            </div>
          </RevealOnView>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all">
            <div className="flex items-center justify-center mb-4">
              {popupType === "success" ? (
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
            </div>
            
            <h3 className={`text-lg font-semibold text-center mb-3 ${
              popupType === "success" ? "text-green-800" : "text-red-800"
            }`}>
              {popupType === "success" ? "Success!" : "Error"}
            </h3>
            
            <p className="text-gray-700 text-center mb-6">
              {popupMessage}
            </p>
            
            <div className="flex justify-center">
              <button
                onClick={() => setShowPopup(false)}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  popupType === "success" 
                    ? "bg-green-600 hover:bg-green-700 text-white" 
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactContent;
