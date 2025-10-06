"use client";

import React from "react";

const Footer = () => {
  return (
    <div 
      className="relative py-16 px-8"
      style={{
        width: '1442px',
        height: '475px',
        background: '#DADADA66'
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Download and Contact */}
          <div className="space-y-8">
            {/* Get link in SMS section */}
            <div>
              <h2 className="mb-6" style={{
                fontFamily: 'Roboto',
                fontWeight: 500,
                fontSize: '24px',
                lineHeight: '23.69px',
                letterSpacing: '3%',
                color: '#1A2439'
              }}>
                Get link in SMS to download the App
              </h2>
              
              <div className="flex gap-4 mb-8">
                <div className="flex">
                  <div className="flex">
                    <div 
                      style={{
                        width: '80px',
                        height: '53px',
                        borderTopLeftRadius: '6px',
                        borderBottomLeftRadius: '6px',
                        border: '1px solid #E0E0E0',
                        background: '#FFFDFD',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'Roboto',
                        fontWeight: 500,
                        fontSize: '24px',
                        lineHeight: '23.69px',
                        letterSpacing: '3%',
                        color: '#1A2439'
                      }}
                    >
                      +91
                    </div>
                    <input
                      type="tel"
                      placeholder="Enter your mobile number"
                      style={{
                        width: '330px',
                        height: '53px',
                        borderTopRightRadius: '0px',
                        borderBottomRightRadius: '0px',
                        border: '1px solid #E0E0E0',
                        borderLeft: 'none',
                        background: '#FFFDFD',
                        padding: '0 16px',
                        fontFamily: 'Nunito',
                        fontWeight: 400,
                        fontSize: '14.15px',
                        lineHeight: '18.87px',
                        letterSpacing: '0px',
                        color: '#1A2439',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <button 
                    style={{
                      width: '113px',
                      height: '53px',
                      borderTopRightRadius: '6px',
                      borderBottomRightRadius: '6px',
                      background: '#1A2439',
                      border: 'none',
                      color: 'white',
                      fontSize: '16px',
                      cursor: 'pointer'
                    }}
                  >
                    Get the link
                  </button>
                </div>
              </div>

              {/* Google Play Button */}
              <div className="mb-8" style={{ marginTop: '-16px' }}>
                <img 
                  src="/download/googleplay.svg" 
                  alt="Get it on Google Play" 
                  className="h-14 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                />
              </div>

              {/* Demo class card */}
              <div 
                style={{
                  width: '410px',
                  height: '120px',
                  borderRadius: '14px',
                  border: '1px solid #E0E0E0',
                  background: '#FFFDFD',
                  padding: '16px',
                  marginBottom: '42px',
                  position: 'relative'
                }}
              >
                <h3 
                  style={{
                    fontFamily: 'Montserrat',
                    fontWeight: 600,
                    fontSize: '18px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    color: '#1A2439',
                    marginBottom: '12px'
                  }}
                >
                  Know more about our courses.<br />Book a demo class
                </h3>
                <div className="flex items-center justify-between" style={{ marginTop: '-25px' }}>
                  <button 
                    style={{
                      width: '156px',
                      height: '26.79px',
                      borderRadius: '6.3px',
                      background: '#0595CE',
                      border: 'none',
                      fontFamily: 'Rubik',
                      fontWeight: 400,
                      fontSize: '14.18px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    Speak to an expert
                  </button>
                  <img 
                    src="/person.svg" 
                    alt="Expert person" 
                    style={{
                      width: '74px',
                      height: '74px',
                      flexShrink: 0
                    }}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3" style={{ marginTop: '-26px' }}>
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
              <h3 
                style={{
                  fontFamily: 'Roboto',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '20px',
                  letterSpacing: '3%',
                  color: '#161A38',
                  marginBottom: '16px'
                }}
              >
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="#" 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#161A38',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.opacity = '0.7'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.opacity = '1'}
                  >
                    About us
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#161A38',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.opacity = '0.7'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.opacity = '1'}
                  >
                    Contact us
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#161A38',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.opacity = '0.7'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.opacity = '1'}
                  >
                    Blogs
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#161A38',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.opacity = '0.7'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.opacity = '1'}
                  >
                    News
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#161A38',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.opacity = '0.7'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.opacity = '1'}
                  >
                    Why SISYA
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#161A38',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.opacity = '0.7'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.opacity = '1'}
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column 2 */}
            <div>
              <h3 
                style={{
                  fontFamily: 'Roboto',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '20px',
                  letterSpacing: '3%',
                  color: '#161A38',
                  marginBottom: '16px'
                }}
              >
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="#" 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#161A38',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.opacity = '0.7'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.opacity = '1'}
                  >
                    About us
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#161A38',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.opacity = '0.7'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.opacity = '1'}
                  >
                    Contact us
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#161A38',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.opacity = '0.7'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.opacity = '1'}
                  >
                    Blogs
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#161A38',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.opacity = '0.7'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.opacity = '1'}
                  >
                    News
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#161A38',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.opacity = '0.7'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.opacity = '1'}
                  >
                    Why SISYA
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#161A38',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.opacity = '0.7'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.opacity = '1'}
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column 3 */}
            <div>
              <h3 
                style={{
                  fontFamily: 'Roboto',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '20px',
                  letterSpacing: '3%',
                  color: '#161A38',
                  marginBottom: '16px'
                }}
              >
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="#" 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#161A38',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.opacity = '0.7'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.opacity = '1'}
                  >
                    About us
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#161A38',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.opacity = '0.7'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.opacity = '1'}
                  >
                    Contact us
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#161A38',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.opacity = '0.7'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.opacity = '1'}
                  >
                    Blogs
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#161A38',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.opacity = '0.7'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.opacity = '1'}
                  >
                    News
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#161A38',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.opacity = '0.7'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.opacity = '1'}
                  >
                    Why SISYA
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#161A38',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.opacity = '0.7'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.opacity = '1'}
                  >
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
