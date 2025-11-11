import Image from "next/image";

const bulletPoints = [
  "Empower schools to provide holistic education",
  "Support teachers with cutting-edge pedagogy",
  "Enable students to excel in both boards and competitive exams",
  "Give parents peace of mind by empowering their child’s learning journey",
];

const BuildingSchoolsSection = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 pb-12 pt-14 md:flex-row md:items-center md:justify-center md:gap-10 md:px-12 lg:px-0">
        {/* Left Content */}
        <div className="w-full max-w-[550px] text-center md:flex-1 md:text-left">
          <h2 className="text-[20px] font-bold leading-none text-[#1A2439] sm:text-[30px] md:text-[32px]">
            Building the Schools of
          </h2>
          <h2 className="mt-2 text-[28px] font-bold leading-none text-[#0595CE] sm:text-[30px] md:text-[32px]">
            Tomorrow with SISYA
          </h2>

          <p className="mx-auto mt-4 max-w-[500px] text-[14px] font-medium leading-[21px] text-black sm:text-[15px] md:mt-6 md:max-w-xl md:text-[18px] md:leading-[24px]">
            Education is the backbone of society, and schools are the foundation of every child’s journey. In today’s competitive world, parents expect schools to prepare students not just for board exams, but also for career-defining competitive exams like JEE, NEET, and Olympiads.
          </p>

          <div className="mx-auto mt-6 max-w-lg space-y-4 md:mt-8 md:max-w-none">
            <p className="text-[15px] font-semibold text-black md:text-[16px]">At SISYA CLASS, we:</p>
            <ul className="space-y-3 text-left">
              {bulletPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[16px] text-black">
                  <Image
                    src="/sippics/tik.svg"
                    alt="tick"
                    width={18}
                    height={18}
                    className="mt-1 flex-shrink-0"
                  />
                  <span className="leading-[22px]">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[380px] md:mx-0 md:flex-1 md:max-w-[420px]">
          <div className="mx-auto h-[260px] w-full overflow-hidden rounded-[18px] shadow-[0px_10px_30px_rgba(16,43,64,0.08)] sm:h-[320px] md:h-[400px]">
            <Image
              src="/sippics/schooldemo.svg"
              alt="School building"
              width={450}
              height={450}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>

     
      <div className="mx-auto flex h-[75px]  w-full max-w-7xl items-center justify-center  bg-[#0595CE] px-4 text-center text-xs font-medium leading-[16px] text-white sm:h-[78px]  sm:px-6 sm:text-[14px] md:h-[88px]  md:text-base">
        Together, we can create schools that are not only centres of learning, but also centres of success, growth, and trust.
      </div>
    </section>
  );
};

export default BuildingSchoolsSection;
