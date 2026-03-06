import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { API_BASE_URL } from "@/lib/config";

const teachingPoints = [
  {
    title: "Concept-Based Teaching",
    description: "Deep understanding, not rote learning",
  },
  {
    title: "Layered Difficulty Approach",
    description: "Step-by-step progress to mastery",
  },
  {
    title: "Micro-Schedules",
    description: "Structured daily & weekly planning",
  },
  {
    title: "Assessment Cycle",
    description: "Weekly, monthly, and full-syllabus tests",
  },
  {
    title: "Mentorship Model",
    description: "Academic + motivational guidance by experts",
  },
  {
    title: "AI Tools",
    description: "24x7 doubt solving, adaptive practice, progress analytics",
  },
  {
    title: "Parental Engagement",
    description: "Regular PTMs, reports, and insights",
  },
];

type CarouselItem = {
  id: string;
  imageLink?: string | null;
  href?: string | null;
  order: number;
};

const CAROUSEL_ENDPOINT = `${API_BASE_URL}/student/sip_carousel2`;

const TeachingLearningSection = () => {
  const [slides, setSlides] = useState<CarouselItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(CAROUSEL_ENDPOINT, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch SIP carousel 2");
        const data: CarouselItem[] = await res.json();
        const sorted = (Array.isArray(data) ? data : [])
          .filter((item) => !!item.imageLink)
          .sort((a, b) => a.order - b.order);
        setSlides(sorted);
      } catch (error) {
        //console.error("[SIP] Failed to load carousel 2", error);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 4000);
    return () => clearInterval(id);
  }, [slides.length]);

  const activeSlide = useMemo(
    () => (slides.length ? slides[currentSlide % slides.length] : null),
    [slides, currentSlide],
  );
  return (
    <section className="w-full bg-white py-2 md:py-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 text-center md:px-10 lg:px-12">
        <div className="space-y-4 pt-8">
          <h2 className="font-['Roboto'] text-[30px] font-bold leading-none text-[#0595CE] md:text-[36px]">
            Our Teaching & Learning System
          </h2>
          <p className="font-['Roboto'] text-[20px] font-semibold leading-none text-black md:text-[28px]">
            Blending Pedagogy, Technology, and Mentorship
          </p>
          <p className="mx-auto max-w-3xl font-['Roboto'] text-[14px] font-normal leading-[20px] pt-2 text-black md:text-[18px]">
            At SISYA, we ensure conceptual clarity + consistent practice + measurable improvement.
          </p>
        </div>

        <div className="flex flex-col gap-10 text-left md:flex-row md:items-start md:gap-14">
          <div className="flex-1 space-y-4">
            {teachingPoints.map((point) => (
              <div key={point.title} className="flex items-start gap-3">
                <Image
                  src="/sippics/tik2.svg"
                  alt="Check"
                  width={34}
                  height={34}
                  className="mt-0 h-[20px] w-[20px] flex-shrink-0"
                />
                <p className="font-['Roboto'] text-[13px] font-semibold leading-[18px] text-[#0595CE] md:text-[18px] md:leading-[20px] md:whitespace-nowrap">
                  <span className="block md:inline">{point.title}</span>
                  <span className="block text-[#1A2439] font-[500] text-[12px] leading-[16px] md:inline md:ml-2 md:text-[16px] md:leading-[20px]">
                    &ndash; {point.description}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-1 flex-col items-center justify-center md:justify-end">
            <div className="flex h-[250px] w-full max-w-[360px] items-center justify-center overflow-hidden rounded-[20px] bg-black text-white sm:h-[200px] sm:max-w-[320px] md:h-[260px] md:max-w-[420px]">
              {activeSlide ? (
                <a
                  href={activeSlide.href || undefined}
                  target={activeSlide.href ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="block h-full w-full"
                >
                  <Image
                    src={activeSlide.imageLink || "/sippics/schooldemo.svg"}
                    alt="Teaching and learning carousel"
                    width={420}
                    height={260}
                    className="h-full w-full object-cover"
                  />
                </a>
              ) : (
                <span>Loading...</span>
              )}
            </div>
            {slides.length > 1 && (
              <div className="mt-4 flex justify-center gap-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index ? "w-6 bg-[#0595CE]" : "w-2 bg-gray-300"
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 md:gap-6">
          <div className="h-[2px] w-full bg-[#0595CE]" />
          <p className="font-['Roboto'] text-[14px] leading-[20px] text-black font-[500] md:text-[18px] md:leading-[24px]">
            Every student gets personalized attention, ensuring no child is left behind.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeachingLearningSection;
