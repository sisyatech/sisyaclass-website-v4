"use client";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

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
      userImage: "https://play-lh.googleusercontent.com/a-/ALV-UjXLN4umnLse0EUiybmg0wMbE9npTa7D68_QjzhHK0bhCzI8kzIQ",
      date: "2025-08-11T04:28:41.176Z",
      score: 5,
      url: "https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&reviewId=f5295a39-6674-4559-b900-332118177ff9",
      text: "Sisya Class is a user-friendly app that is perfect for online learning. It offers seamless scheduling, interactive tools, and multimedia support, making collaboration easy for students and educators. Overall, it is a strong choice for digital education."
    },
    {
      id: "8cfef395-e46a-4371-9bbe-934b36ee9533",
      userName: "Shabaaz Baig",
      userImage: "https://play-lh.googleusercontent.com/a-/ALV-UjWYedNNIvu2AVKsA3la5pzamd35XolfuBiuVWSmIdVcFcDTr-8",
      date: "2025-08-19T13:56:58.119Z",
      score: 5,
      url: "https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&reviewId=8cfef395-e46a-4371-9bbe-934b36ee9533",
      text: "Sisya is a great app for learning maths. I was weak earlier, but now I am improving a lot. The teaching style feels like solving a puzzle and has really boosted my confidence in class."
    },
    {
      id: "1183135e-9c97-4ca2-97f3-5fe58f3da89d",
      userName: "Barnali Das",
      userImage: "https://play-lh.googleusercontent.com/a/ACg8ocIrD-fk6Ux7CuXKdFdgYI6ZWltwbMwt-hrU7-CcTC5hCK8QXQ=mo",
      date: "2025-09-12T13:57:50.934Z",
      score: 5,
      url: "https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&reviewId=1183135e-9c97-4ca2-97f3-5fe58f3da89d",
      text: "Classes are going very well, and teachers explain concepts clearly while ensuring there are no doubts. The AI support, daily practice, and homework schedule have helped me stay focused and consistent."
    },
    {
      id: "be2bb5fd-2927-47a1-9b10-a3e7ac19e6e8",
      userName: "Anita Deshpande",
      userImage: "https://play-lh.googleusercontent.com/a-/ALV-UjVpc_a0TAG974Do5J3lWLNRSP7K1gNIdPCNN3N1b37f1tMrGWSi",
      date: "2025-09-18T12:51:38.130Z",
      score: 5,
      url: "https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&reviewId=be2bb5fd-2927-47a1-9b10-a3e7ac19e6e8",
      text: "Sisya App is simple and easy to navigate. The study materials and doubt-solving feature are very helpful for students. A great learning experience overall."
    },
    {
      id: "efe74a25-fd09-44bd-9865-302be1d5f190",
      userName: "Aasrit Kaur",
      userImage: "https://play-lh.googleusercontent.com/a/ACg8ocJeKYKjog594qkQ6xapy3AHncB4XWUZb6a1QqObqxMqODZXUA=mo",
      date: "2025-08-08T12:35:04.475Z",
      score: 5,
      url: "https://play.google.com/store/apps/details?id=com.sisya.sisyaclass&reviewId=efe74a25-fd09-44bd-9865-302be1d5f190",
      text: "Sisya Class App is one of the most reliable and well-structured learning platforms. It makes concepts clear, engaging, and easy to understand for both school and competitive exam students."
    }
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
      <h2 className="text-center mb-1 font-bold text-[26px]">Trusted by Parents, Loved by Students</h2>
      <div className="text-center text-[#6b7280] text-[13px] mb-[18px]">More than promises — results you can see</div>

      <div className="flex flex-col md:flex-row md:items-start md:gap-8 lg:gap-12">
        <motion.aside
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center rounded-[16px] p-4 w-full md:w-[220px] shrink-0 md:-ml-20 lg:-ml-32 mt-2 md:mt-6"
          aria-label="summary"
        >
          <motion.h4
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="m-0 mb-2 tracking-wide text-[24px] md:text-[30px] text-[#111827]"
          >
            EXCELLENT
          </motion.h4>
          <div className="flex gap-[2px] my-[2px]" aria-label="5 out of 5">
            {Array.from({ length: 5 }).map((_, i) => (
              <img key={i} src="/3daylp/star-filled.svg" alt="star" className="w-[18px] h-[18px] inline-block" />
            ))}
          </div>
          <div className="font-extrabold text-[14px] text-[#111827] mt-1">4.8</div>
          <div className="text-[#6b7280] text-[12px] my-1 text-center">Based on 300+ reviews</div>
          <motion.div
            whileHover={{ y: -5 }}
            className="flex flex-col items-center gap-1 mt-2"
          >
            <img className="w-[150px] h-auto md:w-[95px]" src="/3daylp/google_b.svg" alt="Google Reviews" />
          </motion.div>
        </motion.aside>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex-1 w-full relative mt-4 md:mt-3 md:-ml-5 lg:-ml-9"
        >
          {/* Main Review Box Container */}
          <div className="bg-[#fcfcfd] border border-[#f1f2f4] rounded-[24px] p-2 md:p-3 relative shadow-sm">
            {/* Side Buttons - Desktop Only */}
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-8 md:-left-12 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white border border-[#e5e7eb] items-center justify-center shadow-md disabled:opacity-0 z-20 hover:bg-gray-50 transition-colors active:scale-90"
              aria-label="Previous"
              onClick={() => scrollByPage(-1)}
              disabled={!canPrev}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 text-gray-700"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" /></svg>
            </motion.button>

            <section className="w-full relative overflow-hidden" aria-label="reviews">
              <div
                className="w-full overflow-x-auto snap-x snap-mandatory flex pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                ref={viewportRef}
              >
                <div className="flex gap-4 w-max px-2 pb-1" ref={trackRef}>
                  {reviews.map((r, idx) => (
                    <motion.article
                      key={r.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{
                        y: -8,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                      className="flex-none w-[calc(100vw-80px)] md:w-[235px] lg:w-[242px] bg-white border border-[#e5e7eb] rounded-[16px] shadow-sm p-4 snap-start cursor-pointer relative transition-all"
                      onClick={() => window.open(r.url, "_blank")}
                    >
                      <div className="absolute right-3 top-3 opacity-80" aria-hidden>
                        <img src="/3daylp/gogle_s.svg" alt="g" className="w-4 h-4" />
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          className="w-10 h-10 rounded-full object-cover border border-[#e5e7eb] bg-white"
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
                          <div className="font-bold text-[12px] text-[#111827]">{r.userName}</div>
                          <div className="text-[10px] text-[#9ca3af]">{fmtDate(r.date)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex gap-[2px] leading-none" aria-label="5 out of 5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <img key={i} src="/3daylp/star-filled.svg" alt="star" className="w-4 h-4 inline-block" />
                          ))}
                        </div>
                        <img src="/3daylp/blue_tick.svg" alt="verified" className="w-4 h-4 inline-block" />
                      </div>
                      <div className="text-[12px] leading-relaxed text-[#374151] overflow-hidden [display:-webkit-box] [WebkitLineClamp:5] [WebkitBoxOrient:vertical] text-ellipsis">
                        {r.text || ""}
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>

            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-8 md:-right-12 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white border border-[#e5e7eb] items-center justify-center shadow-md disabled:opacity-0 z-20 hover:bg-gray-50 transition-colors active:scale-90"
              aria-label="Next"
              onClick={() => scrollByPage(1)}
              disabled={!canNext}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 text-gray-700"><path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" fill="currentColor" /></svg>
            </motion.button>
          </div>

          {/* Navigation Buttons Below Review Box - Mobile Only */}
          <div className="flex md:hidden justify-center items-center gap-6 mt-6 pb-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-full bg-white border border-[#e5e7eb] flex items-center justify-center shadow-md disabled:opacity-30 z-20 hover:bg-gray-50 transition-all active:scale-90"
              aria-label="Previous"
              onClick={() => scrollByPage(-1)}
              disabled={!canPrev}
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-gray-700"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" /></svg>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-full bg-white border border-[#e5e7eb] flex items-center justify-center shadow-md disabled:opacity-30 z-20 hover:bg-gray-50 transition-all active:scale-90"
              aria-label="Next"
              onClick={() => scrollByPage(1)}
              disabled={!canNext}
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-gray-700"><path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" fill="currentColor" /></svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
