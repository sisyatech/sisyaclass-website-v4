import Image from "next/image";

const sisyaProvides = [
  "Expert faculty from Top IIT/NIT-Graduates",
  "Live Classes, Study material & academic content",
  "24x7 AI-powered technology platform",
  "Dedicated academic mentors for schools",
  "White-label program option",
];

const schoolGains = [
  "AI + IIT Collaboration: Unparalleled Academic Advantage",
  "\"School as a Tech Campus\" positioning",
  "School-branded student analytics dashboard",
  "Global Olympiad recognition and student scholarships",
  "Revenue-generating academic partnership",
  "National feature in SISYA’s media campaigns",
];

const CollaborationModelSection = () => {
  return (
    <section className="w-full bg-white py-10 md:py-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-6 text-center md:px-10 lg:px-0">
        <div className="space-y-3">
          <p className="text-[28px] font-bold text-[#0595CE] md:text-[36px]">
            Collaboration Model
          </p>
          <p className="text-[20px] font-semibold text-[#111826] md:text-[28px]">
            How SISYA Partners with Schools
          </p>
        </div>

        <div className="flex w-full flex-col items-stretch gap-6 md:flex-row md:items-stretch md:justify-center md:gap-0">
          <div className="flex w-full justify-center md:w-auto md:justify-end">
            <div className="w-full max-w-[420px] rounded-[40px] bg-[#0E5D9A] px-5 py-10 text-left text-white sm:px-8 sm:py-18 md:max-w-[424px] md:max-h-[520px] md:rounded-[60px] md:px-12 md:py-24 z-10">
              <div className="mx-auto mb-6 inline-flex items-center justify-center rounded-full bg-[#0595CE] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] md:text-sm md:mx-0 md:ml-2 md:px-5 md:py-2 md:mb-8">
                SISYA Provides
              </div>
              <ul className="space-y-3 text-[12px] leading-[18px] md:text-[14px] md:leading-[20px]">
                {sisyaProvides.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Image
                      src="/sippics/tik3.svg"
                      alt="check"
                      width={22}
                      height={22}
                      className="mt-0.5 h-[18px] w-[18px] flex-shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex w-full justify-center md:w-auto md:justify-start md:pt-9">
            <div className="w-full max-w-[700px] rounded-[40px] bg-[#0595CE] px-5 py-10 text-left text-white sm:px-8 sm:py-14 md:max-w-[690px] md:max-h-[360px] md:rounded-[60px] md:rounded-tl-[0px] md:rounded-bl-[0px] md:px-10 md:py-10 -ml-0 md:-ml-5">
              <div className="mx-auto mb-6 inline-flex items-center justify-center rounded-full bg-[#0E5D9A] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] md:text-sm md:mx-0 md:ml-4 md:px-5 md:py-2 md:mb-8">
                Schools Gain
              </div>
              <ul className="space-y-3 text-[12px] leading-[18px] md:text-[14px] md:leading-[18px]">
                {schoolGains.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Image
                      src="/sippics/tik3.svg"
                      alt="check"
                      width={22}
                      height={22}
                      className="mt-0.5 h-[18px] w-[18px] flex-shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-[14px] font-medium text-[#111826] md:text-[18px]">
            Together, we create schools that parents trust and students succeed in.
          </p>
          <button className="inline-flex h-[42px] items-center justify-center rounded-[12px] bg-[#0595CE] px-10 text-[16px] font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-[#0478B7]">
            Talk To Expert
          </button>
        </div>
      </div>
    </section>
  );
};

export default CollaborationModelSection;


