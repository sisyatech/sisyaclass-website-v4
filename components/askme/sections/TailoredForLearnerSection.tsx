"use client";

import React from "react";
import Image from "next/image";

const learnerCards = [
    {
        badge: "GRADES 1-10",
        badgeBg: "rgba(5, 149, 206, 1)", // Teal/light blue
        title: "Building Strong Foundations",
        description: "Perfect for school students who want to never fall behind in class. We simplify complex curriculum into bite-sized concepts.",
        cta: "START EXCELLING TODAY →",
        ctaColor: "rgba(5, 149, 206, 1)", // Blue
        imageSrc: "/askme/lw1.jpg"
    },
    {
        badge: "FOR EVERYONE",
        badgeBg: "rgba(255, 104, 0, 1)", // Orange
        title: "Curious Minds & Lifelong Learners",
        description: "Whether you're prepping for a competitive exam or just love science, our mentors speak your language—jargon-free and fun.",
        cta: "SATISFY YOUR CURIOSITY →",
        ctaColor: "rgba(255, 104, 0, 1)", // Orange
        imageSrc: "/askme/lw2.jpg"
    }
];

export default function TailoredForLearnerSection() {
    return (
        <>
            <style jsx>{`
                .cta-hover-link .arrow-icon {
                    display: inline-block;
                    transition: transform 0.3s ease;
                    transform: translateX(0px) scale(1.2);
                }
                .cta-hover-link:hover .arrow-icon {
                    transform: translateX(5px) scale(1.2);
                }
                .learner-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .learner-card:hover {
                    transform: scale(1.05);
                }
                @media (max-width: 640px) {
                    .mobile-learner-card {
                        max-width: 100% !important;
                        border-radius: 20px !important;
                    }
                    .mobile-learner-card > div:first-child {
                        border-top-left-radius: 20px !important;
                        border-top-right-radius: 20px !important;
                    }
                    .mobile-learner-card .mobile-card-content {
                        padding: 16px !important;
                    }
                    .mobile-learner-card .mobile-card-content > div:first-child {
                        width: auto !important;
                        max-width: 140px !important;
                        height: auto !important;
                        min-height: 20px !important;
                        padding: 4px 12px !important;
                        margin-bottom: 12px !important;
                    }
                    .mobile-learner-card .mobile-card-content > div:first-child span {
                        font-size: 11px !important;
                        line-height: 20px !important;
                        white-space: nowrap !important;
                    }
                    .mobile-card-title {
                        width: 100% !important;
                        height: auto !important;
                        font-size: 20px !important;
                        line-height: 26px !important;
                        margin-bottom: 8px !important;
                    }
                    .mobile-card-description {
                        width: 100% !important;
                        height: auto !important;
                        font-size: 14px !important;
                        line-height: 20px !important;
                        margin-bottom: 16px !important;
                    }
                    .mobile-learner-card .cta-hover-link {
                        font-size: 14px !important;
                        line-height: 20px !important;
                    }
                }
            `}</style>
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <p
                            className="w-full max-w-[347px] mx-auto"
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: 600,
                                fontSize: 'clamp(16px, 2.5vw, 19px)',
                                lineHeight: '1.2',
                                letterSpacing: '0px',
                                textAlign: 'center',
                                verticalAlign: 'middle',
                                color: 'rgba(5, 149, 206, 1)',
                                margin: '0 auto 8px'
                            }}
                        >
                            WHO IS THIS FOR?
                        </p>
                        <h2
                            className="w-full max-w-[583px] mx-auto"
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: 700,
                                fontSize: 'clamp(28px, 6vw, 49.52px)',
                                lineHeight: '1.2',
                                letterSpacing: '0px',
                                textAlign: 'center',
                                verticalAlign: 'middle',
                                color: 'rgba(0, 0, 0, 1)',
                                margin: '0 auto'
                            }}
                        >
                            Tailored For Every Learner
                        </h2>
                    </div>

                    {/* Cards */}
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
                        {learnerCards.map((card, index) => (
                            <div
                                key={index}
                                className="bg-white overflow-hidden shadow-lg hover:shadow-xl learner-card mobile-learner-card w-full max-w-[471px]"
                                style={{
                                    borderRadius: '40px'
                                }}
                            >
                                {/* Image */}
                                <div
                                    className="relative bg-gray-200 w-full aspect-[471/204]"
                                    style={{
                                        borderTopLeftRadius: '40px',
                                        borderTopRightRadius: '40px'
                                    }}
                                >
                                    <Image
                                        src={card.imageSrc}
                                        alt={card.title}
                                        fill
                                        className="object-cover"
                                        style={{
                                            borderTopLeftRadius: '40px',
                                            borderTopRightRadius: '40px'
                                        }}
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6 mobile-card-content">
                                    {/* Badge */}
                                    <div
                                        className="inline-block mb-4"
                                        style={{
                                            width: '114px',
                                            height: '24px',
                                            borderRadius: '25.5px',
                                            background: card.badgeBg,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontFamily: 'Roboto, sans-serif',
                                                fontWeight: 600,
                                                fontSize: '14px',
                                                lineHeight: '24px',
                                                letterSpacing: '0px',
                                                verticalAlign: 'middle',
                                                color: 'rgba(255, 255, 255, 1)'
                                            }}
                                        >
                                            {card.badge}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3
                                        className="mobile-card-title"
                                        style={{
                                            width: '383px',
                                            height: '67px',
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '30px',
                                            lineHeight: '38px',
                                            letterSpacing: '0px',
                                            verticalAlign: 'middle',
                                            color: 'rgba(0, 0, 0, 1)',
                                            marginBottom: '12px'
                                        }}
                                    >
                                        {card.title}
                                    </h3>

                                    {/* Description */}
                                    <p
                                        className="mobile-card-description"
                                        style={{
                                            width: '421px',
                                            height: '66px',
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 500,
                                            fontSize: '16px',
                                            lineHeight: '22px',
                                            letterSpacing: '0px',
                                            verticalAlign: 'middle',
                                            color: 'rgba(96, 118, 141, 1)',
                                            marginBottom: '20px'
                                        }}
                                    >
                                        {card.description}
                                    </p>

                                    {/* CTA */}
                                    <a
                                        href="#"
                                        className="inline-flex items-center font-semibold cta-hover-link"
                                        style={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            lineHeight: '22px',
                                            letterSpacing: '0px',
                                            verticalAlign: 'middle',
                                            color: card.ctaColor
                                        }}
                                    >
                                        {card.cta.split(' →')[0]} <span className="arrow-icon" style={{ marginLeft: '4px' }}>→</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

