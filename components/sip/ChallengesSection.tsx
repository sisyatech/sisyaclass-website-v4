import Image from "next/image";
import { useState } from "react";

const challenges = [
  {
    title: "Lack of Expert Faculty",
    description: "Qualified JEE/NEET teachers provide best training.",
    image: "/sippics/hardcode4.svg",
  },
  {
    title: "Balancing Academics & Coaching",
    description: "Managing board syllabus alongside competitive exam preparation is tough.",
    image: "/sippics/hardcode.jpg",
  },
  
  {
    title: "High Infrastructure Costs",
    description: "Smart classrooms and advanced teaching tools require investment.",
    image: "/sippics/hardcode1.jpg",
  },
  {
    title: "Limited Personalized Support",
    description: "Schools struggle to provide individualized guidance for every student.",
    image: "/sippics/hardcode3.svg",
  },
 
  
];

const ChallengesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? challenges.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === challenges.length - 1 ? 0 : prev + 1));
  };

  const getVisibleItems = (count: number) => {
    const items: typeof challenges = [];
    for (let i = 0; i < count; i++) {
      const index = (currentIndex + i) % challenges.length;
      items.push(challenges[index]);
    }
    return items;
  };

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 text-center md:px-12 lg:px-16">
        <h2 className="text-[20px] font-semibold text-[#0595CF] sm:text-[28px] md:text-[34px]">Challenges Schools Face</h2>
        <h3 className="mt-1 text-[18px] font-bold text-[#1A2439] sm:text-[28px] md:text-[36px]">
          Why Most Schools Struggle with Competitive Preparation
        </h3>

        <div className="relative mt-8">
          {/* Desktop layout */}
          <div className="relative hidden items-center justify-center md:flex">
            <button
              onClick={handlePrev}
              className="absolute left-[-60px] top-[40%] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-[14px] border-2 border-[#D9D9D9] bg-white text-[#1A2439] shadow-[0_8px_16px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:-translate-x-1 hover:bg-[#0595CF] hover:text-white"
              aria-label="Previous challenge"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>

            <div className="flex w-full max-w-5xl items-stretch justify-center gap-8">
              {getVisibleItems(3).map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="flex h-full w-[320px] flex-col items-center gap-4 text-center"
                >
                  <div className="w-full overflow-hidden rounded-[26.5px] shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={309}
                      height={174}
                      className="h-[174px] w-full object-cover"
                      priority
                    />
                  </div>
                  <div className="flex h-full flex-col px-2 text-center">
                    <p className="text-[15px] font-semibold leading-tight text-black">{item.title}</p>
                    <p className="mt-3 text-[12px] leading-[20px] text-[#1A2439]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="absolute right-[-60px] top-[40%] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-[14px] border-2 border-[#D9D9D9] bg-white text-[#1A2439] shadow-[0_8px_16px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:translate-x-1 hover:bg-[#0595CF] hover:text-white"
              aria-label="Next challenge"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          {/* Mobile carousel */}
          <div className="md:hidden">
            {getVisibleItems(1).map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-4 text-center">
                <div className="w-full overflow-hidden rounded-[26.54px] shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={310}
                    height={174}
                    className="h-[174px] w-full object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-col px-2 text-center">
                  <p className="text-[15px] font-semibold leading-tight text-black">{item.title}</p>
                  <p className="mt-3 text-[12px] leading-[20px] text-[#1A2439]">{item.description}</p>
                </div>
              </div>
            ))}
            <div className="mt-4 flex items-center justify-between px-20">
              <button
                onClick={handlePrev}
                className="flex h-11 w-11 items-center justify-center rounded-[14px] border-2 border-[#D9D9D9] bg-white text-[#1A2439] shadow-[0_8px_16px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:-translate-x-1 hover:bg-[#0595CF] hover:text-white"
                aria-label="Previous challenge"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={handleNext}
                className="flex h-11 w-11 items-center justify-center rounded-[14px] border-2 border-[#D9D9D9] bg-white text-[#1A2439] shadow-[0_8px_16px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:translate-x-1 hover:bg-[#0595CF] hover:text-white"
                aria-label="Next challenge"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl bg-[#0595CE] px-6 py-4 text-center text-sm font-medium text-white md:text-base">
        SISYA SIP addresses each of these challenges with expertise, resources, and a proven system.
      </div>
    </section>
  );
};

export default ChallengesSection;
