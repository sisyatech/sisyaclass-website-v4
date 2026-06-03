import React from "react";
import Image from "next/image";

export default function TransformSection() {
  return (
    <section className="py-8 px-4 text-center">
      <h2 className="text-2xl mb-8 text-[#003087]">Here&apos;s How To Transform Your Child&apos;s Learning</h2>
      <div className="flex justify-center text-center hidden md:flex">
        <Image src="/10x/flow.svg" alt="Transform flow desktop" width={1200} height={600} className="max-w-full h-auto" />
      </div>
      <div className="block md:hidden">
        <Image src="/10x/flow-mobile.svg" alt="Transform flow mobile" width={400} height={800} className="max-w-full h-auto" />
      </div>
    </section>
  );
}


