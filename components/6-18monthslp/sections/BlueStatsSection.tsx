import React from "react";

const items = [
  { img: "/3daylp/bookkk.svg", title: "All Subjects", lines: ["Grade 1-10", "Monday to Saturday", "Regular Class", "7:00 PM - 8:00 PM"] },
  { img: "/3daylp/bulbbbb.svg", title: "JEE", lines: ["Grade 8-10", "Monday to Saturday", "Regular Class", "8:00 PM - 9:00 PM"] },
];

const feeCards = [
  { grade: "Grades 1 - 5", amount: "₹4,999" },
  { grade: "Grades 6 - 10", amount: "₹5,999" },
];

export default function BlueStatsSection() {
  return (
    <section className="px-4 my-8">
      <div className="mb-4 flex flex-col items-center gap-1 text-center md:flex-row md:justify-center md:gap-3">
        <h2 className="text-[2.2rem] font-bold tracking-[0.03em] text-[#161A38]" style={{ fontFamily: "Roboto, sans-serif" }}>
          Crash Course Fees
        </h2>
        <span className="text-sm mt-3 font-semibold text-[#1a1a1a]/70" style={{ fontFamily: "Roboto, sans-serif" }}>
          [Excl. GST]
        </span>
      </div>
      <div className="mx-auto mb-8 flex flex-wrap items-center justify-center gap-4">
        {feeCards.map((card) => (
          <div
            key={card.grade}
            className="w-full max-w-[200px] rounded-[20px] bg-[#01317A] text-white text-center shadow-[0px_10px_20px_rgba(0,0,0,0.25)] px-7 py-5 border border-white/10"
            style={{ fontFamily: "Rubik, sans-serif" }}
          >
            <p className="text-lg font-medium tracking-wide mb-2">{card.grade}</p>
            <p className="text-[2.75rem] font-semibold leading-[1.1]">{card.amount}</p>
          </div>
        ))}
      </div>
      <div className="relative max-w-[950px] mx-auto rounded-[30px] p-6 overflow-hidden shadow-[0px_4px_4px_0px_#00000040]" style={{ background: "linear-gradient(90deg, #070963 0%, #352d9f 100%)" }}>
        <div className="pointer-events-none absolute top-[15px] left-[15px] right-[15px] bottom-[15px] rounded-[25px] p-[3px]" style={{ background: "linear-gradient(93.22deg,#42b3c1 1.64%, rgba(66,179,193,0.6) 56.03%)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor" as any, maskComposite: "exclude" as any }} />

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-center">
          {items.map((it, idx) => (
            <div
              key={idx}
              className="relative p-4 md:p-6 after:hidden md:after:block after:content-[''] after:absolute after:top-4 after:bottom-4 after:right-0 after:w-px after:[background:linear-gradient(180deg,rgba(255,255,255,0)_0%,#ffffff_50%,rgba(255,255,255,0)_100%)] md:last:after:hidden"
            >
              <img src={it.img} alt={it.title} className="h-[40px] md:h-[50px] mx-auto mb-2 block" />
              <h3 className="text-white text-[1.2rem] md:text-[1.5rem] font-bold">{it.title}</h3>
              <p className="text-white text-[0.8rem] md:text-[0.9rem] font-medium m-0">{it.lines[0]}</p>
              <h3 className="text-white text-[0.95rem] md:text-[1.2rem] font-bold m-0 mt-2 whitespace-normal md:whitespace-nowrap leading-snug">{it.lines[1]}</h3>
              <p className="text-white text-[0.8rem] md:text-[0.9rem] font-medium m-0">{it.lines[2]}</p>
              <p className="text-white text-[0.8rem] md:text-[0.9rem] font-medium m-0">{it.lines[3]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


