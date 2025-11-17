"use client";
import React, { useEffect, useRef, useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      id: 1,
      question: "Is this really a money-back guarantee?",
      answer:
        "Yes. If all conditions are met and the student still scores below 90% aggregate, we refund the course fee (excluding GST/registration).",
    },
    {
      id: 2,
      question: "Why do you have attendance & homework requirements?",
      answer:
        "Success depends on consistent efforts. These requirements ensure your child follows the structure needed for scoring 90%+.",
    },
    {
      id: 3,
      question: "How will SISYA verify performance?",
      answer:
        "Through class logs, attendance reports, test data, homework submissions, and LMS records.",
    },
    {
      id: 4,
      question: "Which programs are eligible?",
      answer: "Board Excellence G10",
    },
    {
      id: 5,
      question: "What is the refund timeline?",
      answer: "Within 21 working days after document verification.",
    },
    {
      id: 6,
      question: "If my child scores 88% or 89%, is refund valid?",
      answer: "Yes, below 90% aggregate qualifies if all conditions are met.",
    },
  ];

  const [openItem, setOpenItem] = useState<number | null>(null);
  const [entered, setEntered] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!entered) return;
    const t = setTimeout(() => setOpenItem(faqs[0].id), 1800);
    return () => clearTimeout(t);
  }, [entered]);

  const toggleItem = (id: number) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <div id="faqs" ref={sectionRef} className="bg-white pt-3">
      <div className="mx-auto max-w-4xl px-4">
        <h2
          className={`font-montserrat mb-12 text-center text-[40px] leading-[1.2] font-bold text-[#1A2439] transition-all duration-[1200ms] ease-out ${
            entered ? "-translate-y-0 opacity-100" : "-translate-y-[160px] opacity-0"
          }`}
        >
          Frequently asked questions
        </h2>

        <div
          className={`mb-8 space-y-5 transition-all duration-[1200ms] ease-out sm:mb-10 md:mb-12 ${
            entered ? "translate-y-0 opacity-100" : "translate-y-[160px] opacity-0"
          }`}
        >
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`rounded-xl bg-white shadow-md transition-all hover:shadow-lg ${
                openItem === faq.id ? "ring-2 ring-[#4A9FD8]" : "ring-1 ring-gray-200"
              }`}
              style={{ transitionDelay: entered ? `${index * 120}ms` : "0ms" }}
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl px-6 py-5 text-left transition-colors hover:bg-gray-50"
              >
                <span className="font-roboto text-[17px] leading-[1.5] font-medium text-[#1A2439]">
                  {faq.question}
                </span>

                <div
                  className={`ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#4A9FD8] shadow-sm transition-transform duration-300 ${
                    openItem === faq.id ? "rotate-45" : "rotate-0"
                  }`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5V19M5 12H19"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-[1300ms] ease-in-out ${
                  openItem === faq.id ? "max-h-[320px]" : "max-h-0"
                }`}
              >
                <div className="font-roboto border-t border-gray-100 px-6 pt-0 pb-5 text-[15px] leading-[1.7] font-normal text-[#556A8E]">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
