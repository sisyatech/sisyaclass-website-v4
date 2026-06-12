"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";

type Review = {
  id: string;
  userName: string;
  userImage: string;
  date: string; // ISO
  score: number;
  text: string | null;
};

const payload: { data: Review[] } = {
  data: [
    {
      id: "rev-swapnil",
      userName: "Swapnil Deshmukh",
      userImage: "https://ui-avatars.com/api/?name=Swapnil+Deshmukh&background=00b67a&color=fff",
      date: "2025-11-18T13:56:09.000Z",
      score: 5,
      text: "Very good teaching institute, important part is they accept the feedback and suggestions. I recently requested increasing quizzes, stop reading spam messages, ask students not to interrupt teaching and disturb classes. I can see positive changes in Shoury and he doesn’t want to miss any classes or even don’t want to be late. Definitely positive outcome within a month. Special thanks and appreciation to Science mam.",
    },
    {
      id: "6a22802d965da20beb90e1b4",
      userName: "Gomathy Hari",
      userImage: "https://user-images.trustpilot.com/6a2280174a5f8143a883db77/73x73.png",
      date: "2026-06-05T09:52:13.000Z",
      score: 5,
      text: "Mouli sir robotics class is very clear and easily understood. He explains complex robotics concepts with practical examples that keep kids engaged. The hands-on projects are amazing, and my child looks forward to every session! Highly recommended.",
    },

    {
      id: "rev-sunita",
      userName: "Sunita",
      userImage: "https://ui-avatars.com/api/?name=Sunita&background=00b67a&color=fff",
      date: "2026-06-05T13:56:09.000Z",
      score: 5,
      text: "We got to now about sisya from ChatGPT. Since than we had great experience about online lectures especially chemistry is THE BEST from all. Also maths lecture are totally from scratch upto advance. And physics they explain really good and we are left with 0 doubts ",
    },

    {
      id: "6a22b9592dbbbb65fd091952",
      userName: "Ainey Singh",
      userImage: "https://user-images.trustpilot.com/6a22b949c1f59829601f5804/73x73.png",
      date: "2026-06-05T13:56:09.000Z",
      score: 5,
      text: "It is the bestt study app I ever studied from and I love how the slide decorates the teachers abd how lovely are our teacher and our mentors and I also love how teacher carefully see that has anyone have doubts and I love how every single day has a new subject teaching about so ;> THANK YOU 😇❤️🩹",
    },
    {
      id: "6a26c33f12f7bfbf0b319ddd",
      userName: "vaishnavi kumari",
      userImage: "https://user-images.trustpilot.com/6a26c3366142ad5d703c8e06/73x73.png",
      date: "2026-06-08T15:27:27.000Z",
      score: 4,
      text: "They have taught me a very good lessons in every subject day by day.\nThey taught me easy methods which are harder and takes more time.  Now  by learning them I can solve the questions in 2 to 3 minutes. \n                 THANK YOU SISYA ",
    },
    {
      id: "6a22b8024464a5867e50a214",
      userName: "Yamini Desu",
      userImage: "https://user-images.trustpilot.com/6a22b7ed4a5f81bac28439a6/73x73.png",
      date: "2026-06-05T13:50:26.000Z",
      score: 5,
      text: "The teaching quality and the way concepts were explained made our experience with sisya classes great.My child enjoyed learning and gained a better understanding of the subjects.",
    },
    {
      id: "6a22b50305b1027580db945e",
      userName: "ravneet kaur",
      userImage: "https://user-images.trustpilot.com/6a22b4f3dd910ce7b082a141/73x73.png",
      date: "2026-06-05T13:37:39.000Z",
      score: 5,
      text: "Staff is very nice and Co-operative... I love the way you teach every child and take response individually... They ensure no doubts are left behind. Great experience overall!",
    },

    {
      id: "6a2185845575987f6fdc4dc1",
      userName: "sweetha subash",
      userImage: "https://user-images.trustpilot.com/6a21856e6142ad841437495e/73x73.png",
      date: "2026-06-04T16:02:44.000Z",
      score: 4,
      text: "Had a great experience..my kid completed her one year of learning. Why would I recommend sisya class is they have experienced polite teachers, excellent mentor service , they teach beyond syallabus, instant doubt clearance etc",
    },
    {
      id: "6a2162e273909c38c60a3d40",
      userName: "Sanjib Das",
      userImage: "https://user-images.trustpilot.com/6981f1ecb51c708f0592b518/73x73.png",
      date: "2026-06-04T13:34:58.000Z",
      score: 5,
      text: "Excellent performance \nBut require to explain more theory instead of quiz. However, the teachers are very supportive and my child has improved a lot since joining.",
    }
  ]
};

function fmtDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toISOString().slice(0, 10);
  } catch {
    return "";
  }
}

const TrustpilotStar = () => (
  <svg viewBox="0 0 512 512" width="18" height="18" className="inline-block mx-[1px]">
    <rect width="512" height="512" fill="#00b67a" />
    <path d="M256,380.2L127.3,447.8l24.6-143.3L47.7,204.3l143.9-20.9L256,53l64.4,130.4l143.9,20.9l-104.2,100.2 l24.6,143.3L256,380.2z" fill="#ffffff" />
  </svg>
);

const TrustpilotLogo = () => (
  <div className="flex items-center gap-1 font-bold text-xl text-[#111827]">
    <TrustpilotStar />
    Trustpilot
  </div>
);

export default function TrustpilotReviewsSection() {
  const reviews = useMemo(() => payload.data, []);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  function updateArrows() {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const maxScroll = track.scrollWidth - viewport.clientWidth;
    setCanPrev(viewport.scrollLeft > 0);
    setCanNext(viewport.scrollLeft < maxScroll - 2);
  }

  useEffect(() => {
    updateArrows();
    const el = viewportRef.current;
    if (!el) return;
    const onScroll = () => updateArrows();
    const onResize = () => updateArrows();
    el.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  function scrollByPage(dir: number) {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const page = viewport.clientWidth - 24;
    viewport.scrollBy({ left: dir * page, behavior: "smooth" });
    setTimeout(updateArrows, 320);
  }

  return (
    <div className="w-full max-w-[1000px] mx-auto py-5 px-4 box-border">
      <h2 className="text-center mb-1 font-bold text-[26px]">Trusted by Parents, Loved by Students</h2>
      <div className="text-center text-[#6b7280] text-[13px] mb-[18px]">More than promises — results you can see</div>

      <div className="flex flex-col md:flex-row md:items-start md:gap-6 mt-8">
        <aside className="flex flex-col items-center justify-center rounded-[16px] p-4 w-full md:w-[220px] shrink-0" aria-label="summary">
          <div className="flex flex-col items-center gap-1 mb-3">
            <TrustpilotLogo />
          </div>
          <h4 className="m-0 mb-2 tracking-wide text-[30px] text-[#111827]">EXCELLENT</h4>
          <div className="flex justify-center" aria-label="4.5 out of 5">
            {Array.from({ length: 5 }).map((_, i) => (
              <TrustpilotStar key={i} />
            ))}
          </div>
          <div className="font-extrabold text-[14px] text-[#111827] mt-1">4.5</div>
          <div className="text-[#6b7280] text-[12px] my-1 text-center">Based on 100+ reviews</div>
        </aside>

        <section className="relative w-full md:flex-1 overflow-hidden" aria-label="reviews">
          <button
            className="absolute md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:left-[5px] bottom-0 left-1/2 -translate-x-[42px] md:translate-x-0 w-9 h-9 rounded-full bg-white border border-[#e5e7eb] grid place-items-center shadow disabled:opacity-60 z-20"
            aria-label="Previous"
            onClick={() => scrollByPage(-1)}
            disabled={!canPrev}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>
          </button>
          <div
            className="w-full overflow-x-auto snap-x snap-mandatory flex px-3 pb-12 md:pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            ref={viewportRef}
          >
            <div className="flex gap-2 w-max pb-1" ref={trackRef}>
              {reviews.map((r) => (
                <article
                  key={r.id}
                  className="flex-none w-[240px] md:w-[240px] bg-[#f7f7f8] border border-[#e5e7eb] rounded-[8px] shadow p-[6px] snap-start relative"
                >
                  <div className="flex items-center gap-1 mb-1">
                    <img
                      className="w-5 h-5 rounded-full object-cover border border-[#e5e7eb] bg-white"
                      src={r.userImage}
                      alt={r.userName}
                      onError={(e: any) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.outerHTML = `<div class='avatar-fallback'>${r.userName
                          .charAt(0)
                          .toUpperCase()}</div>`;
                      }}
                    />
                    <div className="flex flex-col leading-tight">
                      <div className="font-semibold text-[10px] leading-4 text-[#111827]">{r.userName}</div>
                      <div className="text-[8px] leading-3 text-[#9ca3af]">{fmtDate(r.date)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="flex leading-none" aria-label={`${r.score} out of 5`}>
                      {Array.from({ length: r.score }).map((_, i) => (
                        <svg key={i} viewBox="0 0 512 512" width="14" height="14" className="inline-block mx-[1px]">
                          <rect width="512" height="512" fill="#00b67a" />
                          <path d="M256,380.2L127.3,447.8l24.6-143.3L47.7,204.3l143.9-20.9L256,53l64.4,130.4l143.9,20.9l-104.2,100.2 l24.6,143.3L256,380.2z" fill="#ffffff" />
                        </svg>
                      ))}
                      {Array.from({ length: 5 - r.score }).map((_, i) => (
                        <svg key={`empty-${i}`} viewBox="0 0 512 512" width="14" height="14" className="inline-block mx-[1px]">
                          <rect width="512" height="512" fill="#dcdce6" />
                          <path d="M256,380.2L127.3,447.8l24.6-143.3L47.7,204.3l143.9-20.9L256,53l64.4,130.4l143.9,20.9l-104.2,100.2 l24.6,143.3L256,380.2z" fill="#ffffff" />
                        </svg>
                      ))}
                    </div>
                    <div className="font-bold text-[11px] text-[#111827] leading-none">
                      <img src="/3daylp/blue_tick.svg" alt="verified" className="w-3.5 h-3.5 inline-block align-middle" />
                    </div>
                  </div>
                  <div className="text-[10px] leading-4 text-[#374151] overflow-hidden [display:-webkit-box] [WebkitLineClamp:5] [WebkitBoxOrient:vertical] text-ellipsis">
                    {r.text || ""}
                  </div>
                </article>
              ))}
            </div>
          </div>
          <button
            className="absolute md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:right-[5px] bottom-0 right-1/2 translate-x-[42px] md:translate-x-0 w-9 h-9 rounded-full bg-white border border-[#e5e7eb] grid place-items-center shadow disabled:opacity-60 z-20"
            aria-label="Next"
            onClick={() => scrollByPage(1)}
            disabled={!canNext}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" /></svg>
          </button>
        </section>
      </div>
    </div>
  );
}
