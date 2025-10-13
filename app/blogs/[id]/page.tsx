"use client";

import { use } from "react";
import Navbar, { MobileMenuProvider, MobileMenu } from "@/components/Navbar";
import Container from "@/components/Container";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";
import StudyMaterial from "@/components/StudyMaterial";
import Moto from "@/components/moto";
import FooterBottom from "@/components/FooterBottom";
import { BlogBreadcrumb } from "@/components/blogs/BlogBreadcrumb";
import BlogDetailContent from "@/components/blogs/blogsdetailspage/BlogDetailContent";
import BlogAuthorComments from "@/components/blogs/blogsdetailspage/BlogAuthorComments";

interface BlogDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

function BlogDetailPageContent({ id }: { id: string }) {
  return (
    <Container>
      <Navbar />
      <BlogBreadcrumb />
      <div className="w-full">
        <BlogDetailContent blogId={id} />
      </div>
      
      {/* Author & Comments Section - Separate from BlogDetailContent */}
      <div className="w-full py-6 sm:py-8 md:py-10">
        <BlogAuthorComments />
      </div>
      
      <AppDownload />
      <Footer />
      <StudyMaterial />
      <Moto />
      <FooterBottom />
      <MobileMenu />
    </Container>
  );
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const unwrappedParams = use(params);
  
  return (
    <MobileMenuProvider>
      <BlogDetailPageContent id={unwrappedParams.id} />
    </MobileMenuProvider>
  );
}

