import React from "react";
import Image from "next/image";

export default function EducatorSection() {
  return (
    <section className="text-center py-8 px-4 bg-white" id="educator-section">
      <h2 className="text-[1.6rem] text-[#162525] mb-2 md:text-[1.5rem]">Learn with IIT/NIT Educators</h2>
      <p className="text-[#01317a] text-[0.9rem] mb-6">Give your child the advantage of learning from the best</p>
      <div className="relative flex justify-center items-center">
        <Image src="/summercamp/mentor.png" alt="IIT/NIT Educators" width={600} height={400} className="max-w-full h-auto rounded-xl" />
      </div>
    </section>
  );
}


