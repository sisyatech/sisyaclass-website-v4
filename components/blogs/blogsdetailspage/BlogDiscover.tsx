"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getAllTags, type Tag } from "../../../lib/blogApi";

const BlogDiscover = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                setLoading(true);
                const tagsData = await getAllTags();
                setTags(tagsData);
            } catch (error) {
                console.error('Error fetching tags:', error);
                setTags([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTags();
    }, []);

    return (
        <div className="bg-[#B9D9EB4D]  rounded-lg p-4 sm:p-6">
            <h3 className="font-montserrat font-bold text-[18px] sm:text-[20px] text-[#1A2439] mb-4">
                Discover More Blogs On
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
                {loading ? (
                    // Loading skeleton
                    Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="bg-white h-8 w-20 rounded-lg animate-pulse flex-shrink-0" />
                    ))
                ) : tags.length === 0 ? (
                    <div className="text-center text-gray-500 text-sm">No tags available</div>
                ) : (
                    tags.slice(0, 12).map((tag, index) => (
                        <Link
                            key={tag.id}
                            href={`/blogs?tag=${encodeURIComponent(tag.name)}`}
                            className="bg-white text-[#1A2439] px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-sm sm:text-base font-medium text-center hover:bg-[#0595CE] hover:text-white transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md flex-shrink-0 max-w-full overflow-hidden text-ellipsis"
                            style={{ maxWidth: 'calc(50% - 0.5rem)' }}
                        >
                            <span className="truncate block">{tag.name}</span>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default BlogDiscover;

