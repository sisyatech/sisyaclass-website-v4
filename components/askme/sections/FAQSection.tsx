"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "What is Ask Me Anything (AMA) by SISYA CLASS?",
        answer: "Ask Me Anything (AMA) is a doubt-solving feature by SISYA CLASS where students can ask academic or study-related questions and receive clear, easy-to-understand answers from experienced mentors."
    },
    {
        question: "Who can use the Ask Me Anything feature?",
        answer: "AMA can be used by school students, college students, exam aspirants or anyone who needs help understanding concepts or solving doubts."
    },
    {
        question: "What type of doubts can I ask?",
        answer: "You can ask subject doubts, homework questions, exam preparation queries, concept clarifications, study tips, and basic career guidance questions."
    },
    {
        question: "How fast will I get answers to my questions?",
        answer: "Most questions are answered within 7 to 30 minutes, depending on the complexity of the doubt and the package you choose."
    },
    {
        question: "How do I choose the right package for me?",
        answer: "If you have a few doubts, choose the ₹29 Starter Pack. For regular doubts, the ₹99 Value Pack is ideal. If you need continuous support, the ₹199 Mega Pack is the best option."
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="bg-white py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <h2
                        className="w-full max-w-[655px] mx-auto"
                        style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 700,
                            fontSize: 'clamp(28px, 5vw, 45px)',
                            lineHeight: '1.2',
                            letterSpacing: '0px',
                            textAlign: 'center',
                            verticalAlign: 'middle',
                            color: 'rgba(0, 0, 0, 1)',
                            margin: '0 auto'
                        }}
                    >
                        Frequently Asked Questions
                    </h2>
                    <p
                        className="w-full max-w-[455px] mx-auto"
                        style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 500,
                            fontSize: 'clamp(14px, 2vw, 16px)',
                            lineHeight: '1.5',
                            letterSpacing: '0px',
                            textAlign: 'center',
                            verticalAlign: 'middle',
                            color: 'rgba(96, 118, 141, 1)',
                            margin: '16px auto 0'
                        }}
                    >
                        Everything you need to know about SISYA ASK ME ANYTHING.
                    </p>
                </motion.div>

                <div className="mx-auto max-w-3xl">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="mb-4"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50 p-6 text-left transition-all hover:shadow-lg"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="pr-8 text-lg font-semibold text-gray-900">
                                        {faq.question}
                                    </h3>
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-shrink-0"
                                    >
                                        <svg
                                            className="h-6 w-6 text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </motion.div>
                                </div>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="mt-4 text-gray-600">{faq.answer}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
