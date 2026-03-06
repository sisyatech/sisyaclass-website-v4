"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MessageSquare, Reply } from "lucide-react";
import { getBlogById, getNestedComments, addComment, fixProfileImageUrl, type Blog, type Comment } from "../../../lib/blogApi";
import { useUser } from "../../UserContext";
import LoginModal from "../../LoginModal";

interface BlogAuthorCommentsProps {
  blogId: string;
}

const BlogAuthorComments = ({ blogId }: BlogAuthorCommentsProps) => {
  const [comment, setComment] = useState("");
  const [blogData, setBlogData] = useState<Blog | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const { user } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [blog, commentsResponse] = await Promise.all([
          getBlogById(blogId),
          getNestedComments(blogId)
        ]);
        
        setBlogData(blog);
        setComments(commentsResponse.comments);
      } catch (error) {
        //console.error('Error fetching blog and comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [blogId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (!comment.trim()) {
      alert('Please enter a comment');
      return;
    }

    try {
      setSubmitting(true);
      const newComment = await addComment(blogId, comment.trim(), user.id, replyingTo || undefined);
      
      // Create a temporary comment object for immediate display
      const tempComment: Comment = {
        id: newComment.id || `temp-${Date.now()}`,
        comment: comment.trim(),
        commentedAt: new Date().toISOString(),
        isReply: !!replyingTo,
        parentId: replyingTo || undefined,
        commentedBy: {
          id: user.id,
          name: user.name || 'User',
          profile: (user as any).profile || null
        },
        children: []
      };

      if (replyingTo) {
        // If it's a reply, add it to the parent comment's children
        setComments(prevComments => 
          prevComments.map(comment => 
            comment.id === replyingTo 
              ? { ...comment, children: [...(comment.children || []), tempComment] }
              : comment
          )
        );
      } else {
        // If it's a new comment, add it to the top of the list
        setComments(prevComments => [tempComment, ...prevComments]);
      }
      
      setComment("");
      setReplyingTo(null);
      
    } catch (error) {
      //console.error('Error submitting comment:', error);
      alert('Failed to submit comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = (commentId: string) => {
    setReplyingTo(commentId);
    // Focus on the textarea
    setTimeout(() => {
      const textarea = document.querySelector('textarea');
      if (textarea) {
        textarea.focus();
      }
    }, 100);
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const commentDate = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return commentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div id="comments" className="bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10">
      <div className="max-w-7xl mx-auto">
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={() => setShowLoginModal(false)}
        />
        {/* Author Section */}
        {blogData && (
        <div className="mb-4 sm:mb-5 md:mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 flex-shrink-0 mx-auto sm:mx-0">
              {blogData.authorProfile ? (
                <Image
                  src={fixProfileImageUrl(blogData.authorProfile)}
                  alt={blogData.authorName}
                  fill
                  sizes="40px"
                  className="rounded-full object-cover"
                  unoptimized
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.src = '/logo.png';
                  }}
                />
              ) : (
                <Image
                  src="/logo.png"
                  alt={blogData.authorName}
                  fill
                  sizes="40px"
                  className="rounded-full object-cover"
                />
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-montserrat font-bold text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] text-[#1A2439] mb-1 sm:mb-2">
                Written by {blogData.authorName}
              </h3>
              <p className="font-roboto text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-[#556A8E] leading-relaxed mb-2 sm:mb-3">
                Educational content writer with expertise in student learning and academic success.
              </p>
              <button className="bg-[#0595CE] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-[#047aa8] transition-colors font-semibold text-xs sm:text-sm">
                Read Full Bio
              </button>
            </div>
          </div>

          {/* Comments Count */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-[#0595CE]" />
            <span className="font-semibold text-[#1A2439] text-sm sm:text-base">
              {comments.length} Comment{comments.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}

      {/* Comment Input Section */}
      <div className="mb-4 sm:mb-5 md:mb-6">
        {replyingTo && (
          <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">Replying to comment</span>
              <button
                onClick={handleCancelReply}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className="relative mb-3 sm:mb-4">
          {user ? (
            <div className="absolute left-2 sm:left-3 top-2 sm:top-3 rounded-full w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 text-sm font-semibold">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>
          ) : (
            <div className="absolute left-2 sm:left-3 top-2 sm:top-3 rounded-full w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm">👤</span>
            </div>
          )}
          <textarea
            value={comment}
            onChange={(e) => {
              if (!user) {
                setShowLoginModal(true);
                return;
              }
              setComment(e.target.value);
            }}
            onClick={() => { if (!user) { setShowLoginModal(true); } }}
            onFocus={() => { if (!user) { setShowLoginModal(true); } }}
            placeholder={user ? "Write a comment..." : "Please login to comment"}
            disabled={submitting}
            readOnly={!user}
            className="w-full pl-12 sm:pl-16 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#0595CE] focus:border-transparent text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed cursor-text"
            rows={3}
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmitComment}
            disabled={!user || submitting || !comment.trim()}
            className="bg-[#0595CE] text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg hover:bg-[#047aa8] transition-colors font-semibold text-sm sm:text-base disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-3 sm:space-y-4 ml-8 sm:ml-12 md:ml-14 lg:ml-16 pb-8 sm:pb-10 md:pb-12">
        {loading ? (
          <div className="text-center text-gray-500">Loading comments...</div>
        ) : comments.length === 0 ? (
          <div className="text-center text-gray-500">No comments yet. Be the first to comment!</div>
        ) : (
          comments.map((comment, index) => {
            // //console.log("[BlogAuthorComments] Rendering comment", comment);
            return (
            <div key={comment.id}>
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex-shrink-0">
                  {comment.commentedBy.id ? (
                    <Image
                      src={`https://sisyaclass.xyz/student/thumbs/users/${comment.commentedBy.id}.jpg`}
                      alt={comment.commentedBy.name}
                      fill
                      sizes="40px"
                      className="rounded-full object-cover"
                      unoptimized
                      onError={(e) => {
                        const el = e.target as HTMLImageElement;
                        el.src = '/girl.svg';
                      }}
                    />
                  ) : (
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-[#E5EEFF] text-xs font-semibold text-[#1A2439] uppercase">
                      {comment.commentedBy.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1 sm:gap-2">
                    <h4 className="font-semibold text-[#1A2439] text-xs sm:text-sm">
                      {comment.commentedBy.name}
                    </h4>
                    <button 
                      onClick={() => handleReply(comment.id)}
                      className="text-[#0595CE] text-xs sm:text-sm font-medium hover:underline flex items-center gap-1 self-start sm:self-center"
                    >
                      <Reply className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      Reply
                    </button>
                  </div>
                  <p className="text-[#556A8E] text-xs sm:text-sm leading-relaxed mb-1 sm:mb-2">
                    {comment.comment}
                  </p>
                  <div className="text-xs text-gray-500">
                    {formatTimeAgo(comment.commentedAt)}
                  </div>
                  
                  {/* Nested Comments */}
                  {comment.children && comment.children.length > 0 && (
                    <div className="mt-3 ml-4 space-y-2">
                      {comment.children.map((reply: Comment) => (
                        <div key={reply.id} className="flex items-start gap-2">
                          <div className="relative w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0">
                            {reply.commentedBy.profile ? (
                              <Image
                                src={fixProfileImageUrl(reply.commentedBy.profile)}
                                alt={reply.commentedBy.name}
                                fill
                                sizes="28px"
                                className="rounded-full object-cover"
                                unoptimized
                                onError={(e) => {
                                  const el = e.target as HTMLImageElement;
                                  el.style.display = "none";
                                  const fallback = document.createElement("div");
                                  fallback.className =
                                    "flex h-full w-full items-center justify-center rounded-full bg-[#E5EEFF] text-[10px] font-semibold text-[#1A2439] uppercase";
                                  fallback.textContent = reply.commentedBy.name?.charAt(0) || "U";
                                  el.parentElement?.appendChild(fallback);
                                }}
                              />
                            ) : (
                              <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-[#E5EEFF] text-[10px] font-semibold text-[#1A2439] uppercase">
                                {reply.commentedBy.name?.charAt(0) || "U"}
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-[#1A2439] text-xs">
                                {reply.commentedBy.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatTimeAgo(reply.commentedAt)}
                              </span>
                            </div>
                            <p className="text-[#556A8E] text-xs leading-relaxed">
                              {reply.comment}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {index < comments.length - 1 && (
                <hr className="mt-3 sm:mt-4 border-gray-200" />
              )}
            </div>
          );
          })
        )}
      </div>
      </div>
    </div>
  );
};

export default BlogAuthorComments;