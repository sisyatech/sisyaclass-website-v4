import React from "react";
import Image from "next/image";

export default function ParentSupportSection() {
  return (
    <section className="bg-[#eaf3ff] rounded-[20px] p-8 max-w-[1000px] mx-auto">
      <div className="flex flex-wrap items-start justify-between">
        <div className="flex-1 basis-[45%]">
          <h2 className="text-[3rem] text-[#01317a] mb-4">Does This Sound Familiar?</h2>
          <ul className="list-none p-0 m-0">
            <li className="flex items-center gap-4 mb-8 text-lg text-[#333]">
              <Image src="/10x/wrong-decision 1.svg" alt="Concern Icon" width={36} height={36} className="w-9 h-9" />
              <span>My child forgets what they learn in school...</span>
            </li>
            <li className="flex items-center gap-4 mb-8 text-lg text-[#333]">
              <Image src="/10x/wrong-decision 1.svg" alt="Concern Icon" width={36} height={36} className="w-9 h-9" />
              <span>I can&apos;t always help with doubts - I&apos;m busy or unsure...</span>
            </li>
            <li className="flex items-center gap-4 mb-8 text-lg text-[#333]">
              <Image src="/10x/wrong-decision 1.svg" alt="Concern Icon" width={36} height={36} className="w-9 h-9" />
              <span>Tuition classes are either too far or too expensive.</span>
            </li>
          </ul>
        </div>

        <div className="flex-1 basis-[45%] text-left md:flex-col md:items-center md:text-center">
          <Image src="/10x/Object.svg" alt="Parent Helping Child" className="max-w-full h-auto mb-4" width={400} height={400} />
          <div>
            <h3 className="text-[#01317a] text-xl mb-2 ml-11 md:ml-0 md:text-center">Our Solution:</h3>
            <p className="text-base text-[#333] flex items-start gap-2 md:justify-center">
              <Image src="/10x/verified 1.svg" alt="Check Icon" width={36} height={36} className="w-9 h-9 flex-shrink-0" />
              A complete online learning system built to support your child -
              and you.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center bg-white py-2 px-3 rounded-xl font-semibold text-[#003087] text-[0.7rem] w-[90%] md:w-1/2 md:text-base mx-auto">
        <span>🔥 SISYA CLASS - Built with working parents in mind.</span>
      </div>
    </section>
  );
}


