
import { MaskContainer } from "./ui/svg-mask-effect";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import BlurText from "./BlurText";

const Hero = () => {
  const [entered, setEntered] = useState(false);
  const play = "https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&hl=en";
  const trustpilot = "https://www.trustpilot.com/review/sisyaclass.com";
  const googlelink = "https://share.google/TywRWQy6icOvyHVg2";

  useEffect(() => {
    // Trigger entrance animations after mount
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <>
      {/* Animations via Tailwind arbitrary utilities */}

      <div className="min-screen relative mb-6 overflow-hidden bg-white px-4 pt-5 pb-3 sm:pt-15 sm:pb-4 md:pb-5 lg:pb-2 xl:pb-4 2xl:pb-6">
        <BackgroundRippleEffect rows={12} cols={27} cellSize={56} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left Content */}

            <div className="flex flex-col items-center space-y-8 lg:items-start">
              {/* Main Headline */}
              <BlurText
                text="Start Your Child's Journey to Excellence Today!"
                delay={150}
                animateBy="words"
                direction="top"
                className="font-roboto text-center text-[26px] leading-[34px] font-bold tracking-[0.03em] text-[#161A38] sm:text-[32px] sm:leading-[42px] lg:text-left lg:text-[40px] lg:leading-[53px]"
              />

              {/* Description */}
              <BlurText
                text="At SISYA Class, we make learning an exciting journey. Our interactive lessons help your child build confidence and succeed across all subjects."
                delay={50}
                animateBy="words"
                direction="top"
                className="font-roboto text-center text-[14px] leading-[24px] font-medium tracking-[0.03em] text-[#556A8E] sm:text-[16px] sm:leading-[28px] lg:text-left lg:text-[18px] lg:leading-[31px]"
              />

              <BlurText text="From Class 1 to 10" delay={300} />
              {/* Ratings Section */}
              <div className="flex w-full flex-col items-center space-y-4 lg:items-start">
                <div
                  className={`relative min-h-[118px] w-full max-w-[460px] rounded-[16px] bg-white p-4 shadow-[0_0_4px_0_rgba(0,0,0,0.25)] transition-all duration-1000 ease-out sm:rounded-[20px] lg:rounded-[22px] ${entered ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                  {/* 4.5/5 Rating */}
                  <div className="mb-2 text-center">
                    <span className="inline-block font-[Roboto_Serif] text-[18px] leading-[28px] font-semibold tracking-[0.03em] text-[#626AB5] sm:text-[22px] sm:leading-[34px] lg:text-[25.26px] lg:leading-[54.85px]">
                      4.5/5
                    </span>
                  </div>

                  {/* Stars with curved line below */}
                  <div className="relative mb-3 flex items-center justify-center">
                    <div className="flex items-center space-x-1">
                      {/* 4 full stars */}
                      {[...Array(4)].map((_, i) => (
                        <Image
                          key={i}
                          src="heropics/fullstar.svg"
                          alt="Full Star"
                          width={20}
                          height={20}
                          className="h-4 w-4 sm:h-5 sm:w-5"
                        />
                      ))}
                      {/* 1 half star */}
                      <Image
                        src="heropics/halfstar.svg"
                        alt="Half Star"
                        width={20}
                        height={20}
                        className="h-4 w-4 sm:h-5 sm:w-5"
                      />
                    </div>

                    {/* Curved line under stars */}
                    <svg
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 transform"
                      width="70"
                      height="9"
                      viewBox="0 0 80 10"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M 10 8 Q 40 0 70 8" stroke="#9CA3AF" strokeWidth="1" fill="none" />
                    </svg>
                  </div>

                  {/* Platform Logos */}
                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                      {/* Trustpilot Link */}
                      <a
                        href={trustpilot}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Trustpilot Reviews"
                      >
                        <Image
                          src="heropics/trust.svg"
                          alt="Trustpilot"
                          width={110}
                          height={27}
                          className="h-[22px] w-[88px] sm:h-[24px] sm:w-[100px] lg:h-[27.09px] lg:w-[110.26px]"
                        />
                      </a>

                      {/* Google Play Link */}
                      <a
                        href={play}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Google Play Store"
                      >
                        <Image
                          src="heropics/google play.svg"
                          alt="Google Play"
                          width={110}
                          height={27}
                          className="h-[22px] w-[88px] sm:h-[24px] sm:w-[100px] lg:h-[27.09px] lg:w-[110.26px]"
                        />
                      </a>

                      {/* Google My Business Link */}
                      <a
                        href={googlelink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Google My Business Reviews"
                      >
                        <Image
                          src="heropics/google.svg"
                          alt="Google My Business"
                          width={110}
                          height={27}
                          className="h-[22px] w-[88px] sm:h-[24px] sm:w-[100px] lg:h-[27.09px] lg:w-[110.26px]"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Content */}
            <div
              className={`relative mt-10 mb-8 flex justify-center transition-transform duration-700 ease-out sm:mb-12 lg:mt-0 lg:mb-0 ${entered ? "translate-x-0 opacity-100" : "translate-x-[160px] opacity-0"}`}
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Main Student Image Container */}
              <div className="relative left-0 h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] md:h-[360px] md:w-[360px] lg:h-96 lg:w-96">
                {/* Outer Border for Student Container */}
                <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[#1A2439] sm:h-[360px] sm:w-[360px] md:h-[420px] md:w-[420px] lg:h-[460px] lg:w-[460px]"></div>

                {/* Educational Icons positioned on the dotted circle */}
                <div className="absolute inset-0 z-10 origin-center scale-[0.7] sm:scale-[0.8] md:scale-[0.9] lg:scale-100" style={{ animation: 'spin 20s linear infinite', willChange: 'transform' }}>
                  {/* Math (π) - Top (0 degrees) */}
                  <div className="absolute top-1/2 left-1/2 -mt-[210px] flex h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:-mt-[205px] sm:h-[56px] sm:w-[56px] md:-mt-[220px] md:h-[60px] md:w-[60px] lg:-mt-[230px]">
                    <Image
                      src="heropics/1.svg"
                      alt="Math"
                      width={60}
                      height={60}
                      className="h-full w-full"
                    />
                  </div>

                  {/* Science (Chemistry) - Top Right (60 degrees) */}
                  <div
                    className="absolute top-1/2 left-1/2 flex h-[60px] w-[60px] items-center justify-center"
                    style={{
                      transform:
                        "translate(-50%, -50%) rotate(60deg) translateY(-230px) rotate(-60deg)",
                    }}
                  >
                    <Image
                      src="heropics/2.svg"
                      alt="Science"
                      width={60}
                      height={60}
                      className="h-full w-full"
                    />
                  </div>

                  {/* Physics (Atom) - Bottom Right (120 degrees) */}
                  <div
                    className="absolute top-1/2 left-1/2 flex h-[60px] w-[60px] items-center justify-center"
                    style={{
                      transform:
                        "translate(-50%, -50%) rotate(120deg) translateY(-230px) rotate(-120deg)",
                    }}
                  >
                    <Image
                      src="heropics/3.svg"
                      alt="Physics"
                      width={60}
                      height={60}
                      className="h-full w-full"
                    />
                  </div>

                  {/* Language (Aa) - Bottom (180 degrees) */}
                  <div
                    className="absolute top-1/2 left-1/2 flex h-[60px] w-[60px] items-center justify-center"
                    style={{
                      transform:
                        "translate(-50%, -50%) rotate(180deg) translateY(-230px) rotate(-180deg)",
                    }}
                  >
                    <Image
                      src="heropics/4.svg"
                      alt="Language"
                      width={60}
                      height={60}
                      className="h-full w-full"
                    />
                  </div>

                  {/* Coding - Bottom Left (240 degrees) */}
                  <div
                    className="absolute top-1/2 left-1/2 flex h-[60px] w-[60px] items-center justify-center"
                    style={{
                      transform:
                        "translate(-50%, -50%) rotate(240deg) translateY(-230px) rotate(-240deg)",
                    }}
                  >
                    <Image
                      src="heropics/5.svg"
                      alt="Coding"
                      width={60}
                      height={60}
                      className="h-full w-full"
                    />
                  </div>

                  {/* Robotics - Mid Left (300 degrees) */}
                  <div
                    className="absolute top-1/2 left-1/2 flex h-[60px] w-[60px] items-center justify-center"
                    style={{
                      transform:
                        "translate(-50%, -50%) rotate(300deg) translateY(-230px) rotate(-300deg)",
                    }}
                  >
                    <Image
                      src="heropics/6.svg"
                      alt="Robotics"
                      width={60}
                      height={60}
                      className="h-full w-full"
                    />
                  </div>
                </div>

                {/* Circular Frame for Student */}
                <div className="absolute top-1/2 left-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-[4px] border-[#E5E7EB] bg-[#F3F4F6] sm:h-[300px] sm:w-[300px] sm:border-[5px] md:h-[340px] md:w-[340px] lg:h-[392px] lg:w-[392px]">
                  {/* Student Image */}
                  <Image
                    src="heropics/studnet.svg"
                    alt="Successful Student"
                    width={392}
                    height={392}
                    className="h-full w-full object-cover object-center"
                    priority
                    sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, (max-width: 1024px) 340px, 392px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;