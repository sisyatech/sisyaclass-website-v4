import React from "react";

type CardProps = { title: string; points: string[]; icon: "star" | "book" };

function HeaderIcon({ type }: { type: CardProps["icon"] }) {
  if (type === "star") {
    return (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-white">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }
  return (
    <img src="/3daylp/bookkk.svg" alt="book" className="w-6 h-6" />
  );
}

function Card({ title, points, icon }: CardProps) {
  return (
    <div className="bg-[#fafcfe] rounded-[12px] w-[340px] shadow-[0px_9px_20px_11px_rgba(0,0,0,0.08)] overflow-hidden transition-[transform,box-shadow] duration-300 ease-linear hover:-translate-y-[5px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
      <div className="flex items-center gap-[15px] py-[20px] px-[25px] bg-[#fafcfe]">
        <div className="w-[45px] h-[45px] rounded-[8px] bg-[#1e3a8a] grid place-items-center flex-shrink-0">
          <HeaderIcon type={icon} />
        </div>
        <h3 className="text-[1.25rem] m-0 font-bold text-[#1a1a1a] tracking-[0.5px]">{title}</h3>
      </div>
      <div className="m-[10px] bg-white rounded-[20px] shadow-[0px_19.83px_62.62px_0px_#0000000a]">
        <ul className="m-0 p-0">
          {points.map((p) => (
            <li key={p} className="flex items-start py-[18px] px-[25px] text-[0.95rem] text-[#333] border-b border-dashed border-[#d0d0d0] last:border-b-0">
              <img src="/3daylp/arrowww.svg" alt="arrow" className="w-[14px] h-[14px] mr-3 mt-[2px] flex-shrink-0" />
              <span className="leading-[1.5]">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function UniqueCourseSection() {
  return (
    <section className="my-10">
      <div className="flex flex-wrap justify-center gap-[30px]">
        <Card
          title="CRASH COURSE"
          icon="star"
          points={[
            "Duration : Till March 2026",
            "Covers Whole Syllabus By IIT Teachers",
            "Learn Time Saving Tips For Exams",
            "Learn 300+ Tricks To Solve Questions Easily",
          ]}
        />
        <Card
          title="ALL-IN-ONE COURSE"
          icon="book"
          points={[
            "Duration : 18 Months",
            "Covers Everything in Crash Course",
            "Covers Next Year's School Syllabus + Coding + Robotics",
            "Prepare for Olympiads, SATs & Other Exams",
          ]}
        />
      </div>
    </section>
  );
}


