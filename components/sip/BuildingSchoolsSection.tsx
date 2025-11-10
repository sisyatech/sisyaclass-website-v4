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
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 pb-16 pt-8 md:flex-row md:items-center md:justify-center md:gap-8 md:px-12 lg:px-0">
        {/* Left Content */}
        <div className="w-full max-w-[550px] md:flex-1">
          <h2 className="text-[32px] font-bold leading-none text-[#1A2439]">
            Building the Schools of
          </h2>
          <h2 className="mt-2 text-[32px] font-bold leading-none text-[#0595CE]">
            Tomorrow with SISYA
          </h2>

          <p className="mt-6 max-w-xl text-[18px] font-medium leading-[24px] text-black">
            Education is the backbone of society, and schools are the foundation of every child’s journey. In today’s competitive world, parents expect schools to prepare students not just for board exams, but also for career-defining competitive exams like JEE, NEET, and Olympiads.
          </p>

          <div className="mt-8 space-y-4">
            <p className="text-[16px] font-semibold text-black">At SISYA CLASS, we:</p>
            <ul className="space-y-3">
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
        <div className="relative w-full max-w-[420px] md:flex-1">
          <div className="mx-auto h-[360px] w-full overflow-hidden rounded-[18px] shadow-[0px_10px_30px_rgba(16,43,64,0.08)] md:h-[400px]">
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

      <div className="mx-auto flex w-full max-w-6xl items-center justify-center bg-[#0595CE] px-6 py-6 text-center text-sm font-medium text-white md:text-base">
        Together, we can create schools that are not only centres of learning, but also centres of success, growth, and trust.
      </div>
    </section>
  );
};

export default BuildingSchoolsSection;
