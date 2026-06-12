"use client";
import React, { useMemo, useRef, useState, useEffect } from "react";

type Review = {
  id: string;
  userName: string;
  userImage: string;
  date: string; // ISO
  score: number;
  url: string;
  text: string | null;
};

const payload: { data: Review[] } = {
  data: [
    {
      id: "f5295a39-6674-4559-b900-332118177ff9",
      userName: "Anandita Banerjee",
      userImage:
        "https://play-lh.googleusercontent.com/a-/ALV-UjXLN4umnLse0EUiybmg0wMbE9npTa7D68_QjzhHK0bhCzI8kzIQ",
      date: "2025-08-11T04:28:41.176Z",
      score: 5,
      url: "https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&reviewId=f5295a39-6674-4559-b900-332118177ff9",
      text:
        "I love about this Sisya Class is a user-friendly app that's perfect for online learning. It offers seamless scheduling, interactive tools, and multimedia support, making it easy for students and educators to collaborate effectively. Overall, it's a strong choice for digital education.",
    },
    {
      id: "efe74a25-fd09-44bd-9865-302be1d5f190",
      userName: "Aasrit Kaur",
      userImage:
        "https://play-lh.googleusercontent.com/a/ACg8ocJeKYKjog594qkQ6xapy3AHncB4XWUZb6a1QqObqxMqODZXUA=mo",
      date: "2025-08-08T12:35:04.475Z",
      score: 5,
      url: "https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&reviewId=efe74a25-fd09-44bd-9865-302be1d5f190",
      text:
        "I’ve been using the Sisya Class App for a while now, and I must say — it’s one of the most reliable and well-structured learning platforms out there. Whether you're a school student or preparing for competitive exams, this app makes concepts clear, engaging, and easy to understand.",
    },
    {
      id: "8cfef395-e46a-4371-9bbe-934b36ee9533",
      userName: "Shabaaz Baig",
      userImage:
        "https://play-lh.googleusercontent.com/a-/ALV-UjWYedNNIvu2AVKsA3la5pzamd35XolfuBiuVWSmIdVcFcDTr-8",
      date: "2025-08-19T13:56:58.119Z",
      score: 5,
      url: "https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&reviewId=8cfef395-e46a-4371-9bbe-934b36ee9533",
      text:
        "Sisya is a great app where you can learn maths easily for people who think maths is hard even I was weak in maths but now I'm seriously improving thanks to sisya and especially snehal sir who teaches me maths like it's like solving a puzzle so thanks again sisya for helping me in my studies and regaining my reputation in my class thanks",
    },
    {
      id: "3ef9c389-5082-4f60-a2f8-cd1840611756",
      userName: "C.S. Sachindra",
      userImage:
        "https://play-lh.googleusercontent.com/a-/ALV-UjXoTZs_x9g8coepdsY1dl_J8Rxd7SuOubnjYYEI6-BGp_l6an4y",
      date: "2025-05-20T10:37:22.263Z",
      score: 5,
      url: "https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&reviewId=3ef9c389-5082-4f60-a2f8-cd1840611756",
      text:
        "My brother has been learning through the Sisya app, and the experience has been amazing for him. The AI-powered features and instant doubt support have really made his learning smoother and more efficient. What stands out the most is the teaching style – it's interactive and engaging, which helps him stay interested in his studies. Definitely a great platform for students!",
    },
    {
      id: "4d3ca5e5-7356-41e2-9148-289dcec0f514",
      userName: "JASMINE ZAIDI",
      userImage:
        "https://play-lh.googleusercontent.com/a/ACg8ocIVxsSTkM6fIpY8mAgiiWfK27NCZsC0p94HqKjtdFLTx5O6MHAx=mo",
      date: "2025-05-20T10:10:07.906Z",
      score: 5,
      url: "https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&reviewId=4d3ca5e5-7356-41e2-9148-289dcec0f514",
      text:
        "Sisya is a great small edtech company that offers quality learning in a fun and easy way. The content is clear, engaging, and perfect for young learners. The team is supportive and truly cares about education. A wonderful platform for kids to learn and grow!",
    },
    {
      id: "7e86bbd6-67b7-423c-b869-0405e4c46663",
      userName: "011 cadet Yasmin",
      userImage:
        "https://play-lh.googleusercontent.com/a-/ALV-UjVbvJg1FaaoZPcQcF456HgZIqLqkuBl3f6Gz8YMdi1i5HzA6krm",
      date: "2025-05-20T10:43:00.592Z",
      score: 5,
      url: "https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&reviewId=7e86bbd6-67b7-423c-b869-0405e4c46663",
      text:
        "Sisya Class has been a game changer in my child's learning journey. The content is clear, engaging and tailored to help students truly understand concepts. I have seen real improvement in my child's studies thanks to their dedicated approach and support. Thank you SISYA CLASS!",
    },
    {
      id: "8cce27f4-2de7-477c-bb14-cd091d148c89",
      userName: "pavan yaswant",
      userImage:
        "https://play-lh.googleusercontent.com/a-/ALV-UjVFowfahWoZiEX-xTFmdvIxCdeL3oibuB77TK1dKfsCdmyL1mxYnQ",
      date: "2025-05-20T10:43:50.590Z",
      score: 5,
      url: "https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&reviewId=8cce27f4-2de7-477c-bb14-cd091d148c89",
      text:
        "Great UI, fast response, and user friendly experience and the AI is top notch and classes were amazing. Their mentors and master teachers were really helpful in solving doubts. Would recommend for JEE preparation.",
    },
  ],
};

function fmtDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toISOString().slice(0, 10);
  } catch {
    return "";
  }
}

export default function ReviewsSection() {
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
      <div className="flex flex-col md:flex-row md:items-start md:gap-6">
        <aside className="flex flex-col items-center justify-center rounded-[16px] p-4 w-full md:w-[220px] shrink-0" aria-label="summary">
          <div className="flex flex-col items-center gap-1 mb-3">
            <img className="w-[150px] h-auto md:w-[110px]" src="/3daylp/google_b.svg" alt="Google Reviews" />
          </div>
          <h4 className="m-0 mb-2 tracking-wide text-[30px] text-[#111827]">EXCELLENT</h4>
          <div className="flex gap-[2px] my-[2px]" aria-label="5 out of 5">
            {Array.from({ length: 5 }).map((_, i) => (
              <img key={i} src="/3daylp/star-filled.svg" alt="star" className="w-[18px] h-[18px] inline-block" />
            ))}
          </div>
          <div className="font-extrabold text-[14px] text-[#111827] mt-1">4.8</div>
          <div className="text-[#6b7280] text-[12px] my-1 text-center">Based on 300+ reviews</div>
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
                  className="flex-none w-[240px] md:w-[240px] bg-[#f7f7f8] border border-[#e5e7eb] rounded-[8px] shadow p-[6px] snap-start cursor-pointer relative"
                  onClick={() => window.open(r.url, "_blank")}
                >
                  <div className="absolute right-1.5 top-1.5 opacity-80" aria-hidden>
                    <img src="/3daylp/gogle_s.svg" alt="g" className="w-3.5 h-3.5" />
                  </div>
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
                    <div className="flex gap-[2px] leading-none" aria-label="5 out of 5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <img key={i} src="/3daylp/star-filled.svg" alt="star" className="w-3.5 h-3.5 inline-block" />
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


