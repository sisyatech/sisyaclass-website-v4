"use client";

import React, { useState } from "react";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

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

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="py-20 bg-white">
      <div className="mx-auto max-w-4xl px-4">
        {/* Title */}
        <h2 
          className="text-center mb-12 font-montserrat font-bold text-[40px] leading-[1.2] text-[#1A2439]"
        >
          Frequently asked questions
        </h2>

        {/* FAQ Items */}
        <div className="space-y-4 mb-50">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-gray-200 rounded-lg bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
            >
              {/* Question */}
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span 
                  className="font-roboto font-medium text-[16px] leading-[1.4] text-[#1A2439]"
                >
                  {faq.question}
                </span>
                
                {/* Plus/Minus Icon */}
                <div 
                  className={`flex-shrink-0 ml-4 w-6 h-6 rounded-full bg-[#4A9FD8] flex items-center justify-center transition-transform duration-300 ${openItems.includes(faq.id) ? 'rotate-45' : 'rotate-0'}`}
                >
                  <svg
                    width="16"
                    height="16"
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
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openItems.includes(faq.id) ? 'max-h-[200px]' : 'max-h-0'}`}
              >
                <div 
                  className="px-6 pb-4 font-roboto font-normal text-[14px] leading-[1.6] text-[#556A8E]"
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
