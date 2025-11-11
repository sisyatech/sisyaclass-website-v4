import Image from "next/image";

const highlights = [
  { number: "01", text: "IIT/NIT-qualified faculty with proven results" },
  { number: "02", text: "Integrated curriculum mapped to CBSE, ICSE & State Boards" },
  { number: "03", text: "24x7 AI-Powered doubt solving through SISYA App" },
  { number: "04", text: "Recorded lectures for unlimited revision" },
  { number: "05", text: "Daily practice sheets, quizzes, assignments, and test series" },
  { number: "06", text: "Mentor-based academic and motivational support" },
  { number: "07", text: "Performance dashboards for students, schools, and parents" },
  { number: "10", text: "Zero-cost infrastructure – SISYA provides full tech support" },
];

const ProgramHighlightsSection = () => {
    return (
      <section className="w-full bg-white mt-12 md:mt-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-16">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-center md:text-left">
            <div className="max-w-lg md:mb-4">
              <h2 className="text-[28px] font-bold leading-none text-[#1A2439] sm:text-[30px] md:text-[32px]">
                What is SISYA SIP?
              </h2>
              <h3 className="mt-2 text-[26px] font-bold leading-tight text-[#0595CE] sm:text-[28px] md:text-[30px]">
                The Complete In-School Coaching Solution
              </h3>
              <p className="mt-3 text-[15px] leading-[22px] text-black sm:text-[16px] md:text-[18px] md:leading-[24px]">
                The SISYA School Integration Program (SIP) is a unique partnership model that enables schools to deliver Board + JEE + NEET + Olympiad preparation within their own campus.
              </p>
            </div>
            <div className="mx-auto mt-6 block w-[220px] sm:w-[260px] md:hidden">
              <Image
                src="/sippics/young-girl.svg"
                alt="Young student learning"
                width={320}
                height={280}
                className="w-full object-contain"
                priority
              />
            </div>
            <div className="hidden md:block md:flex-shrink-0 md:w-[360px] ">
              <Image
                src="/sippics/young-girl.svg"
                alt="Young student learning"
                width={460}
                height={360}
                className="w-full object-contain"
                priority
              />
            </div>
          </div>
        </div>
  
        <div className="relative mt-0 md:mt-0">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-16">
            <div className="relative">
              <div className="h-[10px] w-full bg-[#0595CF] md:h-[16px]"></div>
              <div className="w-full bg-[#0595CF]">
                <div className="w-full rounded-none bg-[#0E5D9A] px-5 pb-10 pt-10 text-white sm:px-8 md:px-12">
                  <div className="mb-8 flex items-center justify-center md:justify-between md:pl-16">
                    <h4 className="text-[22px] font-semibold sm:text-[24px]">Program Highlights:</h4>
                  </div>
                  <div className="mx-auto grid w-full max-w-4xl items-start justify-center gap-y-6 gap-x-16 sm:gap-y-8 md:grid-cols-2">
                    {highlights.map((item) => (
                      <div key={item.number} className="flex max-w-[320px] items-start gap-4">
                        <div
                          className="flex h-[48px] w-[48px] flex-shrink-0 items-center justify-center rounded-[4.44px] bg-[#FFFBFB] text-[15px] font-semibold text-[#0595CF] sm:h-[52px] sm:w-[52px] sm:text-[16px]"
                          style={{ boxShadow: "7.41px 5.92px 0px -1.48px #0495CE" }}
                        >
                          {item.number}
                        </div>
                        <p className="text-[16px] leading-[26px] text-white sm:text-[17px] sm:leading-[28px] md:text-[18px] md:leading-[32.6px]">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
  
                <div className="rounded-b-[20px] bg-[#058ACF] px-5 py-4 text-center text-xs font-medium text-white sm:text-[13px] md:rounded-b-[24px] md:px-6 md:text-base">
                  With SISYA SIP, schools no longer need to rely on external coaching institutes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

export default ProgramHighlightsSection;
