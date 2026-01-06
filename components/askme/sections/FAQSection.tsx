"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "How quickly will I get an answer to my question?",
        answer: "Most questions are answered within 15-30 minutes during peak hours. Complex questions may take up to 2 hours. Our expert teachers work round the clock to ensure you get timely help."
    },
    {
        question: "What subjects can I ask questions about?",
        answer: "You can ask questions about Mathematics, Physics, Chemistry, Biology, English, and other core subjects for classes 6-12. Our team of expert educators covers all major academic subjects."
    },
    {
        question: "Is there a limit to how many questions I can ask?",
        answer: "The number of questions depends on your subscription plan. Free users get 5 questions per month, while premium members enjoy unlimited questions with priority support."
    },
    {
        question: "Can I ask follow-up questions?",
        answer: "Absolutely! If you need clarification on any answer, you can ask follow-up questions. We encourage interactive learning and want to ensure you fully understand the concepts."
    },
    {
        question: "Are my questions kept private?",
        answer: "Yes, your questions and personal information are completely private and secure. We follow strict data protection policies to ensure your privacy is maintained at all times."
    },
    {
        question: "What if I'm not satisfied with an answer?",
        answer: "If you're not satisfied with an answer, you can request a revision or ask for clarification. Our goal is to ensure you understand the concept completely. You can also rate answers to help us improve."
    }
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
