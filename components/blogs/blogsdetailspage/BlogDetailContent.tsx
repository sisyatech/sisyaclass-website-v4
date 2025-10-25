import React from "react";
import RevealOnView from "../../Reveal/RevealOnView";
import BlogMainContent from "./BlogMainContent";
import BlogSocialShare from "./BlogSocialShare";
import BlogTableOfContents from "./BlogTableOfContents";
import BlogRelatedBlogs from "./BlogRelatedBlogs";
import BlogDiscover from "./BlogDiscover";
import BlogSideImage from "./BlogSideImage";
import BlogAuthorComments from "./BlogAuthorComments";
import FAQ from "../../FAQ";

interface BlogDetailContentProps {
  blogId: string;
  blogData?: any;
}

const BlogDetailContent = ({ blogId, blogData }: BlogDetailContentProps) => {

  return (
    <div className="min-h-screen py-4 sm:py-6 md:py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-10">
          {/* Left Side - Blog Content */}
          <div className="w-full lg:flex-1 lg:max-w-4xl order-1">
            <BlogMainContent blogId={blogId} />
            
            {/* FAQ Section - Within Left Side Container */}
            <div className="mt-6 sm:mt-8 md:mt-10">
              <FAQ />
            </div>
          </div>

          {/* Right Side - Sidebar */}
          <div className="w-full lg:w-80 xl:w-96 order-2 lg:order-3">
            <div className="space-y-4 sm:space-y-6">
              {/* Social Media Share */}
              <BlogSocialShare blogId={blogId} blogData={blogData} />

              {/* Table of Contents */}
              <BlogTableOfContents blogId={blogId} />

              {/* Related Blogs */}
              <BlogRelatedBlogs />

              {/* Blog Discover */}
              <BlogDiscover />

              {/* Blog Side Image */}
              <BlogSideImage />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailContent;

