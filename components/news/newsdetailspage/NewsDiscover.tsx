"use client";

import React from "react";
import Link from "next/link";

const NewsDiscover = () => {
    const topics = [
        "Technology",
        "Education",
        "World News",
        "Science",
        "Health",
        "Business",
        "Technology",
        "Education",
        "World News",
        "Science",
        "Health",
        "Business",
        "Technology",
        "Education",
        "World News",
        "Science",
        "Health",
        "Business"
    ];

    return (
        <div className="bg-[#B9D9EB4D] rounded-lg p-4 sm:p-6">
            <h3 className="font-montserrat font-bold text-[18px] sm:text-[20px] text-[#1A2439] mb-4">
                Discover More News On
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
                {topics.map((topic, index) => (
                    <Link
                        key={index}
                        href={`/news?topic=${encodeURIComponent(topic)}`}
                        className="bg-white text-[#1A2439] px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-sm sm:text-base font-medium text-center hover:bg-[#0595CE] hover:text-white transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md whitespace-nowrap"
                    >
                        {topic}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NewsDiscover;
