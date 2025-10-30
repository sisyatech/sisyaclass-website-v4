import React from "react";

export default function VideoSliderSection() {
  return (
    <section className="text-center bg-[#eaf3ff] py-8 px-4 rounded-[20px] my-8 mx-auto max-w-[700px]" id="video-slider-section">
      <h2 className="text-2xl text-[#1a1a1a] mb-6">Watch How Our Educators Turn Learning Into Fun!</h2>
      <div className="relative max-w-[600px] mx-auto shadow-[0_0_45px_rgba(0,48,135,0.9)] rounded-[20px] overflow-hidden">
        <div className="opacity-100 relative transform-none z-[1]">
          <div className="relative w-full pb-[56.25%] bg-white rounded-xl overflow-hidden shadow-[0_0_25px_rgba(0,255,150,0.75)]">
            <iframe className="absolute top-0 left-0 w-full h-full border-none rounded-xl" src="https://www.youtube.com/embed/IQsyJyJ2Pek?autoplay=1&mute=1&loop=1&playlist=IQsyJyJ2Pek" title="Educator Video 1" allow="autoplay; encrypted-media" allowFullScreen />
          </div>
        </div>
      </div>
    </section>
  );
}


