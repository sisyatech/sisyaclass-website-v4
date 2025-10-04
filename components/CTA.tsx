"use client";

import React from "react";

const CTA = () => {
  return (
    <div className="pt-0 pb-2 bg-white">
      <div className="mx-auto flex justify-center px-8">
        {/* CTA Container */}
        <div 
          className="relative flex items-center justify-between px-8"
          style={{
            width: '1012px',
            height: '109px',
            borderRadius: '20px',
            background: '#FFFFFF',
            boxShadow: '0px 4px 4px 0px #00000040'
          }}
        >
          {/* Left Side - Text Content */}
          <div className="flex items-center gap-4">
            <h2 
              style={{
                fontFamily: 'Montserrat',
                fontWeight: 600,
                fontSize: '23px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#556A8E'
              }}
            >
              Ready to find the right program for your child?
            </h2>
            
            {/* Rocket Icon */}
            <div className="text-4xl">
              🚀
            </div>
          </div>

          {/* Right Side - CTA Button */}
          <button
            className="transition-all hover:shadow-lg"
            style={{
              width: '238px',
              height: '53px',
              borderRadius: '12px',
              background: '#0595CE',
              fontFamily: 'Montserrat',
              fontWeight: 600,
              fontSize: '23px',
              lineHeight: '100%',
              letterSpacing: '0%',
              textAlign: 'center',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Book a Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTA;

