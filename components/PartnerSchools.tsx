"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LinkPreview } from "./ui/link-preview";

const SCHOOL_LOGOS = [
  { name: "AHPS", src: "/school_logos/AHPS.jpg", previewImage: "/preview_image/ah.jpg",url:"https://ahpsvisakhapatnam.com/" },
  { name: "Creative Minds", src: "/school_logos/Creative Minds.jpg", previewImage: "/preview_image/creative.jpg",url:"#" },
  { name: "Globe School", src: "/school_logos/Globe School.jpg", previewImage: "/preview_image/globe.jpg",url:"https://theglobeschool.in/" },
  { name: "Kidzee", src: "/school_logos/Kidzee.jpg", previewImage: "/preview_image/kidzee.jpg",url:"https://www.kidzee.com/best-preschool-in-visakhapatnam/vizag-kes-yendada-andhra-pradesh" },
  { name: "SSR-1", src: "/school_logos/SSR-1.jpg", previewImage: "/preview_image/ssr.jpg",url:"#" },
  { name: "SSR-2", src: "/school_logos/SSR-2.jpg", previewImage: "/preview_image/ssr.jpg",url:"https://ssrgreenfieldschool.com/" },
  { name: "SSR", src: "/school_logos/SSR.jpg", previewImage: "/preview_image/ssr.jpg",url:" https://ssrdiscoveryschool.com/" },
  { name: "Silver Oaks", src: "/school_logos/Silver Oaks.jpg", previewImage: "/preview_image/silver_oak.jpg",url:"https://silveroaksinternationalpreschool.com/" },
  { name: "Smart Kidz", src: "/school_logos/Smart Kidz.jpg", previewImage: "/preview_image/smart.jpg",url:"https://smartkidzglobal.org/our-branches/" },
];

const PartnerSchools = () => {
  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 text-center mb-10">
        <h2 className="font-montserrat font-bold text-[32px] leading-[40px] sm:text-[42px] sm:leading-[50px] md:text-[50px] md:leading-[60px] text-[#1A2439] mb-4">
          Trusted by Leading Schools
        </h2>
        <p className="font-montserrat font-normal text-[16px] leading-[24px] sm:text-[18px] sm:leading-[28px] md:text-[20px] md:leading-[32px] text-[#1A2439] max-w-3xl mx-auto">
          We proudly partner with schools to enhance their digital presence and capture memorable moments.
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        {/* CSS for smooth marquee and pause on hover */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 90s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="animate-marquee cursor-pointer">
          {/* We duplicate the logos to ensure a seamless loop */}
          {[...SCHOOL_LOGOS, ...SCHOOL_LOGOS, ...SCHOOL_LOGOS, ...SCHOOL_LOGOS].map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 mx-4 flex items-center justify-center transition-all duration-300"
            >
              <div className="relative w-32 h-20 sm:w-40 sm:h-24 md:w-48 md:h-28">
                <LinkPreview
                  url={logo.url}
                  width={200}
                  height={125}
                  isStatic={true}
                  imageSrc={logo.previewImage}
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 192px"
                  />
                </LinkPreview>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerSchools;
