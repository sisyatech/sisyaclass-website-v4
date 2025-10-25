"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getAllTags, type Tag } from "../../../lib/newsApi";

const NewsDiscover = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                setLoading(true);
                const response = await getAllTags();
                setTags(response || []);
            } catch (error) {
                console.error('Error fetching tags:', error);
                setTags([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTags();
    }, []);

    if (loading) {
        return (
            <div className="bg-[#B9D9EB4D] rounded-lg p-4 sm:p-6">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-8 bg-gray-200 rounded w-20"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (tags.length === 0) {
        return null;
    }

    return (
        <div className="bg-[#B9D9EB4D] rounded-lg p-4 sm:p-6">
            <h3 className="font-montserrat font-bold text-[18px] sm:text-[20px] text-[#1A2439] mb-4">
                Discover More News On
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-2.5">
                {tags.map((tag) => (
                    <Link
                        key={tag.id}
                        href={`/news?tag=${encodeURIComponent(tag.name)}`}
                        className="bg-white text-[#1A2439] px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-[8px] text-[10px] sm:text-[11px] md:text-[12px] font-medium text-center hover:bg-[#0595CE] hover:text-white transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md max-w-full overflow-hidden text-ellipsis"
                        style={{ maxWidth: 'calc(50% - 0.5rem)' }}
                    >
                        {tag.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NewsDiscover;
