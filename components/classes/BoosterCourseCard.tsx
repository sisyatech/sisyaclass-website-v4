  import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BoosterCourseCardProps {
  title?: string;
  subtitle?: string;
  startDate?: string;
  originalPrice?: string;
  currentPrice?: string;
  href?: string;
}

const BoosterCourseCard: React.FC<BoosterCourseCardProps> = ({
  title,
  subtitle,
  startDate,
  originalPrice,
  currentPrice,
  href
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
      <div className="absolute w-[55px] sm:w-[60px] md:w-[63px] lg:w-[65.84px] h-[14px] sm:h-[15px] md:h-[16px] lg:h-[16.81px] top-[10px] sm:top-[11px] md:top-[11.6px] lg:top-[12.32px] left-[calc(100%-75px)] sm:left-[calc(100%-80px)] md:left-[calc(100%-83px)] lg:left-[300px] flex items-center justify-center">
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
      <div className="absolute w-[304px] sm:w-[344px] md:w-[364px] lg:w-[386.22px] h-auto top-[220px] sm:top-[240px] md:top-[255px] lg:top-[267.93px] left-[8px] sm:left-[8.5px] md:left-[8.8px] lg:left-[8.86px]">
        <h3 className="text-[10px] sm:text-[11px] md:text-[11.5px] lg:text-[12.79px] font-bold text-white font-roboto leading-[16px] sm:leading-[18px] md:leading-[18px] lg:leading-[20px] text-left break-words">
          {title}
        </h3>
      </div>

      {/* Start Date */}
      <div className="absolute w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px] top-[255px] sm:top-[285px] md:top-[300px] lg:top-[293.7px] left-[8px] sm:left-[8.5px] md:left-[8.8px] lg:left-[8.86px]">
        {startDate && (
          <p className="text-[7px] sm:text-[7.5px] md:text-[7.8px] lg:text-[8.5px] font-normal text-white font-roboto leading-[12px] sm:leading-[12px] md:leading-[12px] lg:leading-[14px] text-left">
            Starts on {startDate}
          </p>
        )}
      </div>

      {/* Divider Line */}
      <div className="absolute w-[304px] sm:w-[344px] md:w-[364px] lg:w-[383px] h-[1px] sm:h-[1px] md:h-[1px] lg:h-[1.19px] top-[275px] sm:top-[305px] md:top-[320px] lg:top-[323px] left-[8px] sm:left-[8.5px] md:left-[8.8px] lg:left-[9px] border-t-[1px] sm:border-t-[1px] md:border-t-[1px] lg:border-t-[1.19px] border-[#E8E8E8] border-opacity-30"></div>

      {/* Price Section */}
      <div className="absolute top-[285px] sm:top-[315px] md:top-[330px] lg:top-[346.19px] left-[8px] sm:left-[9px] md:left-[10px] lg:left-[11.79px] right-[120px] sm:right-[130px] md:right-[135px] lg:right-[142px]">
        <div className="flex items-center gap-1.5 sm:gap-1.8 md:gap-2 flex-wrap">
          {/* Current Price */}
          <div className="h-[26px] sm:h-[28px] md:h-[30px] lg:h-[32.46px] flex items-center justify-start min-w-0">
            <span className="text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19.5px] font-extrabold text-[#FBD640] font-roboto leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[53.17px] whitespace-nowrap">
              {currentPrice}
            </span>
          </div>
          
          {/* Original Price */}
          {originalPrice && (
            <div className="h-[6px] sm:h-[6px] md:h-[6px] lg:h-[6.46px] flex items-center mt-0.5 sm:mt-0.5 md:mt-1 lg:mt-1 min-w-0">
              <span className="text-[9px] sm:text-[10px] md:text-[10.5px] lg:text-[11.35px] font-medium text-gray-300 font-roboto leading-[14px] sm:leading-[15px] md:leading-[16px] lg:leading-[38.35px] line-through whitespace-nowrap">
                {originalPrice}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* View Details Button */}
      <div className="absolute w-[110px] sm:w-[120px] md:w-[125px] lg:w-[131.69px] h-[32px] sm:h-[35px] md:h-[37px] lg:h-[39.21px] top-[280px] sm:top-[310px] md:top-[325px] lg:top-[341.7px] left-[calc(100%-118px)] sm:left-[calc(100%-128px)] md:left-[calc(100%-133px)] lg:left-[257.48px] rounded-[4px] sm:rounded-[4.5px] md:rounded-[5px] lg:rounded-[5.9px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.25)] sm:shadow-[0px_0px_3.5px_0px_rgba(0,0,0,0.25)] md:shadow-[0px_0px_3.7px_0px_rgba(0,0,0,0.25)] lg:shadow-[0px_0px_3.94px_0px_rgba(0,0,0,0.25)] flex items-center justify-center">
        {href ? (
          <Link href={href} className="w-full h-full bg-[#FBD640] rounded-inherit flex items-center justify-center cursor-pointer hover:brightness-95 transition">
            <span className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15.16px] font-medium text-[#1A2439] font-roboto leading-none text-center">
              View Details
            </span>
          </Link>
        ) : (
          <div className="w-full h-full bg-[#FBD640] rounded-inherit flex items-center justify-center">
            <span className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15.16px] font-medium text-[#1A2439] font-roboto leading-none text-center">
              View Details
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoosterCourseCard;
