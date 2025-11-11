import React from "react";
import Image from "next/image";

const advantagePoints = [
  {
    heading: "Retention",
    subtext: "Stop losing students to outside coaching centres",
  },
  {
    heading: "Revenue",
    subtext: "New admissions and revenue-sharing model for growth",
  },
  {
    heading: "Results",
    subtext: "Boost both board and competitive exam performance",
  },
  {
    heading: "Recognition",
    subtext: "Stronger academic brand trusted by parents",
  },
];

const bulletPoints = [
  "A destination of choice for ambitious students",
  "A trusted brand for parents seeking complete preparation",
  "A future-ready institution that stays ahead of competition",
];

const AdvantageSection = () => {
  return (
    <section className="mt-10 w-full bg-white md:mt-12">
      <div className="relative mx-auto w-full max-w-6xl rounded-[24px] bg-[#D9EFFFB2] px-5 py-6 text-center md:px-10 md:py-8">
        <div className="mx-auto mb-8 inline-block rounded-[8px] bg-[#0595CE] px-6 py-2 text-[16px] font-medium text-white md:px-8 md:text-[18px]">
          The SISYA Advantage for Schools
        </div>

        <div className="relative mx-auto w-full max-w-[900px] md:ml-[5%] md:mr-0 lg:ml-[6%]">
          <div className="relative mx-auto grid w-full grid-cols-2 gap-x-4 gap-y-10 sm:max-w-[720px] sm:gap-x-6 sm:gap-y-12 md:max-w-none md:gap-x-10 md:gap-y-10 md:pl-10 md:pr-4 lg:pl-14 lg:pr-10">
            <span className="pointer-events-none absolute left-1/2 top-1/2 block h-[90%] -translate-x-1/2 -translate-y-1/2 border-l-[2px] border-[#0595CE] sm:h-[92%] md:h-[88%]" />
            <span className="pointer-events-none absolute left-1/2 top-1/2 block w-[90%] -translate-x-1/2 -translate-y-1/2 border-t-[2px] border-[#0595CE] sm:w-[92%] md:w-[68%]" />

            {advantagePoints.map((item, index) => (
              <div
                key={item.heading}
                className={`relative z-[1] ${
                  index % 2 === 0
                    ? "pl-2 pr-2 sm:pl-10 sm:pr-6 md:pl-20 md:pr-12 lg:pl-24"
                    : "pl-2 pr-2 sm:pl-6 sm:pr-10 md:pl-12 md:pr-10"
                } space-y-2 text-left`}
              >
                <h3 className="bg-gradient-to-r from-[#0E90DA] to-[#074D74] bg-clip-text text-[20px] font-bold leading-none text-transparent sm:text-[28px] md:text-[42px]">
                  {item.heading}
                </h3>
                <p className="max-w-[280px] text-[12px] font-medium leading-[18px] text-[#1A2439] sm:max-w-[300px] sm:text-[14px] sm:leading-[22px] md:max-w-[320px] md:text-[16px] md:leading-[24px]">
                  {item.subtext}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex w-full max-w-[760px] flex-col items-center gap-6 rounded-[36px] bg-white px-6 py-10 text-left shadow-sm sm:px-8 sm:py-12 md:mt-16 md:max-w-[800px] md:gap-8 md:rounded-[46px] md:px-12 md:mx-auto">
          <h4 className="font-['Roboto'] text-[20px] font-semibold leading-none text-black sm:text-[24px] md:self-start md:text-[31px]">
            With SISYA SIP, your school becomes:
          </h4>
          <ul className="w-full space-y-5 sm:space-y-6">
            {bulletPoints.map((point, index) => (
              <li
                key={index}
                className="flex items-center gap-4 font-['Roboto'] text-[16px] font-medium leading-[20px] text-[#1A2439] sm:text-[18px] md:text-[22px]"
              >
                <Image
                  src="/sippics/tik2.svg"
                  alt="tick"
                  width={32}
                  height={32}
                  className="h-[32px] w-[32px] flex-shrink-0 sm:h-[34px] sm:w-[34px] md:h-[38px] md:w-[38px]"
                />
                <span className="max-w-[620px]">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <button className="mt-10 inline-flex h-[40px] items-center justify-center rounded-[10px] bg-[#0595CE] px-10 text-[16px] font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#047AB3] sm:h-[42px] sm:px-12 sm:text-[18px]">
          Talk To Expert
        </button>
      </div>
    </section>
  );
};

export default AdvantageSection;
