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
    <section className="w-full bg-white mt-12">
      <div className="relative mx-auto w-full max-w-6xl rounded-[24px] bg-[#D9EFFFB2] px-5 py-2 md:px-10 md:py-8 text-center">
        <div className="mx-auto mb-8 inline-block rounded-[8px] bg-[#0595CE] px-8 py-2 text-[18px] font-medium text-white">
          The SISYA Advantage for Schools
        </div>

        <div className="flex flex-col gap-10 md:flex-row md:justify-center md:gap-16 pl-20 pt-10">
          <div className="space-y-8 md:space-y-12 md:w-[320px] md:pr-10 text-left">
            {advantagePoints.slice(0, 2).map((item) => (
              <div key={item.heading} className="space-y-2">
                <h3 className="bg-gradient-to-r from-[#0E90DA] to-[#074D74] bg-clip-text text-[38px] font-bold leading-tight text-transparent md:text-[42px]">
                  {item.heading}
                </h3>
                <p className="max-w-[260px] text-[15px] font-medium leading-[22px] text-[#1A2439]">
                  {item.subtext}
                </p>
              </div>
            ))}
          </div>
          <div className="space-y-8 md:space-y-12 md:w-[320px] md:pl-10 text-left">
            {advantagePoints.slice(2).map((item) => (
              <div key={item.heading} className="space-y-2">
                <h3 className="bg-gradient-to-r from-[#0E90DA] to-[#074D74] bg-clip-text text-[38px] font-bold leading-tight text-transparent md:text-[42px]">
                  {item.heading}
                </h3>
                <p className="max-w-[260px] text-[15px] font-medium leading-[22px] text-[#1A2439]">
                  {item.subtext}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute left-1/2 top-[145px] hidden h-[300px] -translate-x-1/2 border-r-[2px] border-[#0595CE] md:block" />
        <div className="pointer-events-none absolute left-[20%] right-[20%] top-[280px] hidden border-t-[2px] border-[#0595CE] md:block" />

        <div className="mt-14 flex w-full max-w-[800px] flex-col items-center gap-8 rounded-[46px] bg-white px-8 py-12 text-left shadow-sm md:mt-16 md:px-12 mx-auto">
          <h4 className="self-start font-['Roboto'] text-[31px] font-semibold leading-none text-black">
            With SISYA SIP, your school becomes:
          </h4>
          <ul className="w-full space-y-6">
            {bulletPoints.map((point, index) => (
              <li key={index} className="flex items-center gap-5 font-['Roboto'] text-[22px] font-medium leading-[19px] text-[#1A2439]">
                <Image src="/sippics/tik2.svg" alt="tick" width={38} height={38} className="h-[38px] w-[38px] flex-shrink-0" />
                <span className="max-w-[620px]">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <button className="mt-12 inline-flex h-[44px] items-center justify-center rounded-[12px] bg-[#0595CE] px-12 text-[18px] font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#047AB3]">
          Talk To Expert
        </button>
      </div>
    </section>
  );
};

export default AdvantageSection;