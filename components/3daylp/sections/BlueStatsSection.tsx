import React from "react";

const items = [
  { img: "/3daylp/bookkk.svg", title: "All Subjects", lines: ["Grade 1-10", "Monday to Saturday", "Regular Class", "7:00 PM - 8:00 PM"] },
  { img: "/3daylp/bulbbbb.svg", title: "JEE", lines: ["Grade 8-10", "Monday to Saturday", "Regular Class", "8:00 PM - 9:00 PM"] },
  { img: "/3daylp/s1.svg", title: "Demo", lines: ["Grade 1-10", "Monday to Wednesday", "Batch 1", "1:00 PM - 9:00 PM"] },
  { img: "/3daylp/s1.svg", title: "Demo", lines: ["Grade 1-10", "Thrusday to Saturday", "Batch 2", "1:00 PM - 9:00 PM"] },
];

export default function BlueStatsSection() {
  return (
    <section className="px-4 my-8">
      <div className="relative max-w-[950px] mx-auto rounded-[30px] p-6 overflow-hidden shadow-[0px_4px_4px_0px_#00000040]" style={{ background: "linear-gradient(90deg, #070963 0%, #352d9f 100%)" }}>
        <div className="pointer-events-none absolute top-[15px] left-[15px] right-[15px] bottom-[15px] rounded-[25px] p-[3px]" style={{ background: "linear-gradient(93.22deg,#42b3c1 1.64%, rgba(66,179,193,0.6) 56.03%)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor" as any, maskComposite: "exclude" as any }} />

        <div className="relative grid grid-cols-2 md:flex md:flex-wrap md:justify-between text-center">
          {items.map((it, idx) => (
            <div key={idx} className="relative flex-1 min-w-[200px] p-4 after:content-[''] after:absolute after:top-0 after:right-0 after:w-px after:h-full after:[background:linear-gradient(180deg,rgba(255,255,255,0)_0%,#ffffff_50%,rgba(255,255,255,0)_100%)] md:last:after:hidden">
              <img src={it.img} alt={it.title} className="h-[50px] mx-auto mb-2 block" />
              <h3 className="text-white text-[1.5rem] font-bold">{it.title}</h3>
              <p className="text-white text-[0.9rem] font-medium m-0">{it.lines[0]}</p>
              <h3 className="text-white text-[1.2rem] font-bold m-0 mt-2 whitespace-nowrap">{it.lines[1]}</h3>
              <p className="text-white text-[0.9rem] font-medium m-0">{it.lines[2]}</p>
              <p className="text-white text-[0.9rem] font-medium m-0">{it.lines[3]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


