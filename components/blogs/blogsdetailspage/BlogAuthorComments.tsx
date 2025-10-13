"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Facebook, Mail, Apple, MessageSquare, Reply } from "lucide-react";

const BlogAuthorComments = () => {
  const [comment, setComment] = useState("");

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle comment submission
    console.log("Comment submitted:", comment);
    setComment("");
  };

  const comments = [
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "/girl.svg",
      comment: "This is a really insightful article. The points about study techniques are spot on!",
      time: "2 hours ago",
      date: "December 15, 2024"
    },
    {
      id: 2,
      author: "Michael Chen",
      avatar: "/girl.svg",
      comment: "Great tips for students. I'll definitely try implementing these strategies in my study routine.",
      time: "5 hours ago",
      date: "December 15, 2024"
    },
    {
      id: 3,
      author: "Emily Rodriguez",
      avatar: "/girl.svg",
      comment: "The section about creating a dedicated study space really resonated with me. Thanks for sharing!",
      time: "1 day ago",
      date: "December 14, 2024"
    }
  ];

  return (
    <div className="bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10">
      {/* Author Section */}
      <div className="mb-4 sm:mb-5 md:mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 flex-shrink-0 mx-auto sm:mx-0">
            <Image
              src="/girl.svg"
              alt="Author"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-montserrat font-bold text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] text-[#1A2439] mb-1 sm:mb-2">
              Written by Dr. Priya Sharma
            </h3>
            <p className="font-roboto text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-[#556A8E] leading-relaxed mb-2 sm:mb-3">
              Author is a theologian, essayist and creative who situates her work at the intersections of beauty, faith, feminism and culture.
            </p>
            <button className="bg-[#0595CE] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-[#047aa8] transition-colors font-semibold text-xs sm:text-sm">
              Read Full Bio
            </button>
          </div>
        </div>

        {/* Comments Count and Social Login */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-[#0595CE]" />
            <span className="font-semibold text-[#1A2439] text-sm sm:text-base">3 Comments</span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="text-xs sm:text-sm text-gray-600 mr-0 sm:mr-2">Login with:</span>
            <div className="flex items-center gap-1 sm:gap-2">
              <button className="w-7 h-7 sm:w-8 sm:h-8 bg-[#1877F2] rounded-lg flex items-center justify-center hover:bg-[#166FE5] transition-colors">
                <Facebook className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </button>
              <button className="w-7 h-7 sm:w-8 sm:h-8 bg-[#EA4335] rounded-lg flex items-center justify-center hover:bg-[#D93025] transition-colors">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </button>
              <button className="w-7 h-7 sm:w-8 sm:h-8 bg-black rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors">
                <Apple className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </button>
              <button className="w-7 h-7 sm:w-8 sm:h-8 bg-[#0078D4] rounded-lg flex items-center justify-center hover:bg-[#106EBE] transition-colors">
                <div className="w-3 h-3 sm:w-4 sm:h-4 text-white font-bold text-xs">M</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Input Section */}
      <div className="mb-4 sm:mb-5 md:mb-6">
        <div className="relative mb-3 sm:mb-4">
          <Image
            src="/girl.svg"
            alt="User"
            width={32}
            height={32}
            className="absolute left-2 sm:left-3 top-2 sm:top-3 rounded-full w-8 h-8 sm:w-10 sm:h-10"
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#0595CE] focus:border-transparent text-sm sm:text-base"
            rows={3}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmitComment}
            className="bg-[#0595CE] text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg hover:bg-[#047aa8] transition-colors font-semibold text-sm sm:text-base"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-3 sm:space-y-4 ml-8 sm:ml-12 md:ml-14 lg:ml-16 pb-8 sm:pb-10 md:pb-12">
        {comments.map((comment, index) => (
          <div key={comment.id}>
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex-shrink-0">
                <Image
                  src={comment.avatar}
                  alt={comment.author}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1 sm:gap-2">
                  <h4 className="font-semibold text-[#1A2439] text-xs sm:text-sm">
                    {comment.author}
                  </h4>
                  <button className="text-[#0595CE] text-xs sm:text-sm font-medium hover:underline flex items-center gap-1 self-start sm:self-center">
                    <Reply className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    Reply
                  </button>
                </div>
                <p className="text-[#556A8E] text-xs sm:text-sm leading-relaxed mb-1 sm:mb-2">
                  {comment.comment}
                </p>
                <div className="text-xs text-gray-500">
                  {comment.time} • {comment.date}
                </div>
              </div>
            </div>
            {index < comments.length - 1 && (
              <hr className="mt-3 sm:mt-4 border-gray-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogAuthorComments;
