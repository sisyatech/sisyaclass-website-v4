import React from "react";
import Image from "next/image";

export default function ClassTimingsSection() {
  return (
    <section className="bg-[#f9fbff] py-12 px-4 my-8">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-center text-[2rem] font-bold text-[#01317a] mb-8">Class Timings</h2>
        <div className="mt-8 md:mt-8 overflow-x-auto scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory -mx-4 px-4 py-2">
          <div className="flex w-max gap-4 flex-nowrap items-stretch">
            {[{icon:"/10x/010.svg",title:"All Subjects",grade:"Grade 6-10",time:"7:00 PM – 8:00 PM"},{icon:"/10x/011.svg",title:"Maths",grade:"Grade 3-5",time:"6:00 PM – 7:00 PM"},{icon:"/10x/011.svg",title:"Maths",grade:"Grade 6-7",time:"7:00 PM – 8:00 PM"},{icon:"/10x/011.svg",title:"Maths",grade:"Grade 8-10",time:"8:00 PM – 9:00 PM"},{icon:"/10x/001.svg",title:"JEE",grade:"Grade 8-10",time:"8:00 PM – 9:00 PM"}].map((c)=> (
              <div key={c.title+c.grade} className="bg-white rounded-[12px] p-6 text-center shadow-md transition hover:-translate-y-1 hover:shadow-xl flex-none w-[240px] snap-start">
                <Image src={c.icon} alt={c.title} className="mx-auto mb-4 block object-contain" width={50} height={50} />
                <h3 className="text-[1.25rem] font-bold text-[#01317a] mb-3">{c.title}</h3>
                <p className="text-base font-semibold text-[#333] mb-2">{c.grade}</p>
                <p className="text-[0.95rem] text-[#666] mb-2">Monday to Saturday</p>
                <p className="text-base font-semibold text-[#01317a] mt-2">{c.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


