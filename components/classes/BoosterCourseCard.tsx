"use client";

import React from "react";
import Image from "next/image";

interface BoosterCourseCardProps {
  title?: string;
  subtitle?: string;
  startDate?: string;
  originalPrice?: string;
  currentPrice?: string;
}

const BoosterCourseCard: React.FC<BoosterCourseCardProps> = ({
  title = "Quick Learning Big Impact in 7 Days with IIT/NIT Experts",
  subtitle = "Starts on 25 June 2025",
  startDate = "25 June 2025",
  originalPrice = "₹ 499",
  currentPrice = "₹ 29"
}) => {
  return (
    <div className="relative w-[320px] sm:w-[360px] md:w-[380px] lg:w-[399px] h-[320px] sm:h-[350px] md:h-[370px] lg:h-[391px] bg-[#1A2439] rounded-[8px] sm:rounded-[9px] md:rounded-[10px] lg:rounded-[10.82px] border-[0.49px] border-[#CED3D3] overflow-hidden mx-auto">
      {/* Course Image */}
      <div className="relative w-[304px] sm:w-[344px] md:w-[364px] lg:w-[384px] h-[170px] sm:h-[190px] md:h-[205px] lg:h-[216px] top-[30px] sm:top-[32px] md:top-[35px] lg:top-[37px] left-[8px]">
        <Image
          src="/boostercourse.svg"
          alt="Booster Course"
          width={384}
          height={216}
          className="w-full h-full object-cover rounded-[4px] sm:rounded-[4.5px] md:rounded-[5px] lg:rounded-[5px]"
        />
      </div>

      {/* Booster Course Badge */}
      <div className="absolute w-[70px] sm:w-[75px] md:w-[80px] lg:w-[84.52px] h-[20px] sm:h-[22px] md:h-[24px] lg:h-[24.65px] top-[5px] sm:top-[5.3px] md:top-[5.4px] lg:top-[5.6px] left-[7px] sm:left-[7.4px] md:left-[7.6px] lg:left-[7.86px] bg-[#E78F8E] rounded-[2.5px] sm:rounded-[2.7px] md:rounded-[2.8px] lg:rounded-[2.95px] flex items-center justify-center">
        <span className="text-[8.5px] sm:text-[9px] md:text-[9.5px] lg:text-[10.27px] font-medium text-white font-roboto leading-[20px] sm:leading-[21px] md:leading-[22px] lg:leading-[23.6px] text-center whitespace-nowrap">
          Booster Course
        </span>
      </div>

      {/* Limited Seats Badge - Right */}
      <div className="absolute w-[55px] sm:w-[60px] md:w-[63px] lg:w-[65.84px] h-[14px] sm:h-[15px] md:h-[16px] lg:h-[16.81px] top-[10px] sm:top-[11px] md:top-[11.6px] lg:top-[12.32px] left-[calc(100%-63px)] sm:left-[calc(100%-68px)] md:left-[calc(100%-71px)] lg:left-[315px] flex items-center justify-center">
        <div className="flex items-center gap-0.5 sm:gap-1">
          <div className="w-[16px] sm:w-[18px] md:w-[20px] lg:w-[21.5px] h-[12px] sm:h-[13px] md:h-[14px] lg:h-[14.5px] flex items-center justify-center">
            <Image
              src="/time.svg"
              alt="Time"
              width={21.5}
              height={14.5}
              className="w-full h-full"
            />
          </div>
          <span className="text-[8.5px] sm:text-[9px] md:text-[9.5px] lg:text-[10.27px] font-medium text-[#FBD640] font-roboto italic leading-[14px] sm:leading-[15px] md:leading-[16px] lg:leading-[23.6px] text-center whitespace-nowrap">
            Limited Seats
          </span>
        </div>
      </div>

      {/* Main Title */}
      <div className="absolute w-[304px] sm:w-[344px] md:w-[364px] lg:w-[386.22px] h-[40px] sm:h-[42px] md:h-[44px] lg:h-[21.29px] top-[220px] sm:top-[240px] md:top-[255px] lg:top-[267.93px] left-[8px] sm:left-[8.5px] md:left-[8.8px] lg:left-[8.86px]">
        <h3 className="text-[10px] sm:text-[11px] md:text-[11.5px] lg:text-[12.79px] font-bold text-white font-roboto leading-[20px] sm:leading-[21px] md:leading-[22px] lg:leading-[34.86px] text-left">
          {title}
        </h3>
      </div>

      {/* Start Date */}
      <div className="absolute w-[120px] sm:w-[125px] md:w-[130px] lg:w-[134.64px] h-[12px] sm:h-[13px] md:h-[14px] lg:h-[11.20px] top-[255px] sm:top-[285px] md:top-[300px] lg:top-[293.7px] left-[8px] sm:left-[8.5px] md:left-[8.8px] lg:left-[8.86px]">
        <p className="text-[7px] sm:text-[7.5px] md:text-[7.8px] lg:text-[7.87px] font-normal text-white font-roboto leading-[12px] sm:leading-[13px] md:leading-[14px] lg:leading-[38.35px] text-left">
          Starts on {startDate}
        </p>
      </div>

      {/* Divider Line */}
      <div className="absolute w-[304px] sm:w-[344px] md:w-[364px] lg:w-[383px] h-[1px] sm:h-[1px] md:h-[1px] lg:h-[1.19px] top-[275px] sm:top-[305px] md:top-[320px] lg:top-[323px] left-[8px] sm:left-[8.5px] md:left-[8.8px] lg:left-[9px] border-t-[1px] sm:border-t-[1px] md:border-t-[1px] lg:border-t-[1.19px] border-[#E8E8E8] border-opacity-30"></div>

      {/* Price Section */}
      <div className="absolute top-[285px] sm:top-[315px] md:top-[330px] lg:top-[346.19px] left-[8px] sm:left-[9px] md:left-[10px] lg:left-[11.79px]">
        <div className="flex items-center gap-1.5 sm:gap-1.8 md:gap-2">
          {/* Current Price */}
          <div className="w-[50px] sm:w-[55px] md:w-[58px] lg:w-[59.95px] h-[26px] sm:h-[28px] md:h-[30px] lg:h-[32.46px] flex items-center justify-start">
            <span className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19.5px] font-extrabold text-[#FBD640] font-roboto leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[53.17px] text-center">
              {currentPrice}
            </span>
          </div>
          
          {/* Original Price */}
          <div className="w-[38px] sm:w-[40px] md:w-[42px] lg:w-[43.24px] h-[6px] sm:h-[6px] md:h-[6px] lg:h-[6.46px] flex items-center -ml-3 sm:-ml-3.5 md:-ml-4 mt-0.5 sm:mt-0.5 md:mt-1 lg:mt-1">
            <span className="text-[9px] sm:text-[10px] md:text-[10.5px] lg:text-[11.35px] font-medium text-gray-300 font-roboto leading-[14px] sm:leading-[15px] md:leading-[16px] lg:leading-[38.35px] line-through">
              {originalPrice}
            </span>
          </div>
        </div>
      </div>

      {/* View Details Button */}
      <div className="absolute w-[110px] sm:w-[120px] md:w-[125px] lg:w-[131.69px] h-[32px] sm:h-[35px] md:h-[37px] lg:h-[39.21px] top-[280px] sm:top-[310px] md:top-[325px] lg:top-[341.7px] left-[calc(100%-118px)] sm:left-[calc(100%-128px)] md:left-[calc(100%-133px)] lg:left-[257.48px] bg-[#FBD640] rounded-[4px] sm:rounded-[4.5px] md:rounded-[5px] lg:rounded-[5.9px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] sm:shadow-[0px_0px_3.5px_0px_rgba(0,0,0,0.25)] md:shadow-[0px_0px_3.7px_0px_rgba(0,0,0,0.25)] lg:shadow-[0px_0px_3.94px_0px_rgba(0,0,0,0.25)] flex items-center justify-center">
        <button className="w-[90px] sm:w-[100px] md:w-[105px] lg:w-[103.19px] h-[20px] sm:h-[22px] md:h-[24px] lg:h-[24.28px] flex items-center justify-center">
          <span className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15.16px] font-medium text-[#1A2439] font-roboto leading-[20px] sm:leading-[22px] md:leading-[24px] lg:leading-[34.86px] text-center">
            View Details
          </span>
        </button>
      </div>
    </div>
  );
};

export default BoosterCourseCard;
