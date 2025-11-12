import Image from "next/image";

const leaders = [
  {
    name: "Ramakrishna Pillamudi",
    role: "Founder and CEO",
    image: "/sippics/ramkisir.svg",
  },
  {
    name: "Vamsi Kakarlapudi",
    role: "Co-Founder",
    image: "/sippics/vamsisir.svg",
  },
];

const VisionMissionSection = () => {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto mt-12 w-full max-w-6xl  bg-[#0E5D9A] px-6 py-10 text-white sm:px-8 sm:py-12 md:rounded-[31px] md:px-12 lg:px-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-8 text-center lg:max-w-xl lg:text-left">
            <div>
              <h3 className="text-[22px] font-semibold sm:text-[24px]">Our Vision</h3>
              <p className="mt-3 text-[16px] leading-[22px] font-normal opacity-95 sm:text-[17px] md:text-[18px]">
                To make affordable, high-quality education accessible to every child through schools, empowering them to succeed in boards, competitive exams, and life.
              </p>
            </div>
            <div>
              <h3 className="text-[22px] font-semibold sm:text-[24px]">Our Mission</h3>
              <p className="mt-3 text-[16px] leading-[22px] font-normal opacity-95 sm:text-[17px] md:text-[18px]">
                “To equip schools with expertise, technology, and resources that make them self-sufficient hubs for academic and competitive excellence.”
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center lg:flex-row">
            {leaders.map((leader) => (
              <div key={leader.name} className="flex flex-col items-center gap-4">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  width={220}
                  height={220}
                  className="h-[220px] w-[220px] rounded-full object-cover sm:h-[240px] sm:w-[240px] md:h-[254px] md:w-[254px]"
                />
                <div className="w-[220px] rounded-[16px] bg-white px-5 py-3 text-center sm:w-[240px] md:w-[260px]">
                  <p className="text-[16px] font-semibold leading-none text-[#0595CE] sm:text-[17px]">{leader.name}</p>
                  <p className="mt-2 text-[12px] font-medium text-[#1A2439] sm:text-[13px]">{leader.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
