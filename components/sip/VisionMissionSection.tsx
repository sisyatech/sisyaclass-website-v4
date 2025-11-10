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
      <div className="mx-auto mt-16 w-full max-w-6xl rounded-[31px] bg-[#0E5D9A] px-6 py-12 text-white md:px-12 lg:px-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl space-y-8">
            <div>
              <h3 className="text-[24px] font-semibold">Our Vision</h3>
              <p className="mt-3 text-[18px] leading-[22px] font-normal opacity-95">
                To make affordable, high-quality education accessible to every child through schools, empowering them to succeed in boards, competitive exams, and life.
              </p>
            </div>
            <div>
              <h3 className="text-[24px] font-semibold">Our Mission</h3>
              <p className="mt-3 text-[18px] leading-[22px] font-normal opacity-95">
                “To equip schools with expertise, technology, and resources that make them self-sufficient hubs for academic and competitive excellence.”
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8 lg:flex-row">
            {leaders.map((leader) => (
              <div key={leader.name} className="flex flex-col items-center gap-4">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  width={254}
                  height={254}
                  className="h-[254px] w-[254px] rounded-full object-cover"
                />
                <div className="w-[260px] rounded-[16px] bg-white px-5 py-3 text-center">
                  <p className="text-[17px] font-semibold leading-none text-[#0595CE]">{leader.name}</p>
                  <p className="mt-2 text-[13px] font-medium text-[#1A2439]">{leader.role}</p>
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
