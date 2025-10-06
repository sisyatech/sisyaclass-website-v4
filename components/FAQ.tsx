"use client";
import React, { useEffect, useRef, useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      id: 1,
      question: "How to enroll for a Course?",
      answer: "To enroll in a course, simply click on the 'Book a Demo' button on our website, fill out the enrollment form with your details, and our team will contact you to complete the enrollment process. You can also call us directly or visit our center for assistance."
    },
    {
      id: 2,
      question: "Can I get the recordings of my previous lectures?",
      answer: "Yes, all enrolled students have access to recorded lectures for the duration of their course. You can access these recordings through your student portal, where you can review lessons, catch up on missed classes, and study at your own pace."
    },
    {
      id: 3,
      question: "Who would be the instructor for enrolled course?",
      answer: "Our instructors are highly qualified educators with extensive experience in their respective subjects. Most of our teachers are IIT/NIT graduates with years of teaching experience. You'll receive detailed instructor profiles when you enroll, and you can meet them during the demo class."
    },
    {
      id: 4,
      question: "What kind of placement support will be given post completion of program?",
      answer: "We provide comprehensive placement support including resume building, interview preparation, mock interviews, and connections with our industry partners. Our career guidance team helps students identify career paths and provides ongoing support even after course completion."
    }
  ];

  // First question will open once the section enters view
  const [openItems, setOpenItems] = useState<number[]>([]);
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
      { threshold: 0.4 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Open the first FAQ AFTER the entrance animation finishes
  useEffect(() => {
    if (!entered) return;
    const t = setTimeout(() => setOpenItems([faqs[0].id]), 1800);
    return () => clearTimeout(t);
  }, [entered]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div ref={sectionRef} className="py-20 bg-white">
      <div className="mx-auto max-w-4xl px-4">
        {/* Title */}
        <h2 
          className={`text-center mb-12 font-montserrat font-bold text-[40px] leading-[1.2] text-[#1A2439] transition-all duration-[1200ms] ease-out ${entered ? 'opacity-100 -translate-y-0' : 'opacity-0 -translate-y-[160px]'}`}
        >
          Frequently asked questions
        </h2>

        {/* FAQ Items */}
        <div className={`space-y-5 mb-50 transition-all duration-[1200ms] ease-out ${entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[160px]'}`}>
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`rounded-xl bg-white transition-all shadow-md hover:shadow-lg ${
                openItems.includes(faq.id)
                  ? 'ring-2 ring-[#4A9FD8]'
                  : 'ring-1 ring-gray-200'
              }`}
              style={{ transitionDelay: entered ? `${index * 120}ms` : '0ms' }}
            >
              {/* Question */}
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors rounded-xl"
              >
                <span 
                  className="font-roboto font-medium text-[17px] leading-[1.5] text-[#1A2439]"
                >
                  {faq.question}
                </span>
                
                {/* Plus/Minus Icon */}
                <div 
                  className={`flex-shrink-0 ml-4 w-7 h-7 rounded-full bg-[#4A9FD8] shadow-sm flex items-center justify-center transition-transform duration-300 ${openItems.includes(faq.id) ? 'rotate-45' : 'rotate-0'}`}
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

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-[1300ms] ease-in-out ${openItems.includes(faq.id) ? 'max-h-[320px]' : 'max-h-0'}`}
              >
                <div 
                  className="px-6 pb-5 pt-0 border-t border-gray-100 font-roboto font-normal text-[15px] leading-[1.7] text-[#556A8E]"
                >
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
