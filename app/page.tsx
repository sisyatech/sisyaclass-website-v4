"use client";

import dynamic from "next/dynamic";
import Container from "@/components/Container";
import Hero from "@/components/Hero";
import Navbar, { MobileMenuProvider } from "@/components/Navbar";

// Defer below-the-fold components to reduce render-blocking CSS/JS
const ClassSelection = dynamic(() => import("@/components/ClassSelection"), { ssr: true, loading: () => null });
const Impact = dynamic(() => import("@/components/Impact"), { ssr: true, loading: () => null });
const AIEcosystem = dynamic(() => import("@/components/AIEcosystem"), { ssr: true, loading: () => null });
const InnovativeLearningTools = dynamic(() => import("@/components/InnovativeLearningTools"), { ssr: true, loading: () => null });
const Teachers = dynamic(() => import("@/components/Teachers"), { ssr: true, loading: () => null });
const Banner = dynamic(() => import("@/components/Banner"), { ssr: true, loading: () => null });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true, loading: () => null });
const CTA = dynamic(() => import("@/components/CTA"), { ssr: true, loading: () => null });
const Reviews = dynamic(() => import("@/components/Reviews"), { ssr: true, loading: () => null });
const BlogsContent = dynamic(() => import("@/components/blogs/BlogsContent"), { ssr: true, loading: () => null });
const NewsContent = dynamic(() => import("@/components/news/NewsContent"), { ssr: true, loading: () => null });
const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: true, loading: () => null });
const AppDownload = dynamic(() => import("@/components/AppDownload"), { ssr: true, loading: () => null });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true, loading: () => null });
const StudyMaterial = dynamic(() => import("@/components/StudyMaterial"), { ssr: true, loading: () => null });
const Moto = dynamic(() => import("@/components/moto"), { ssr: true, loading: () => null });
const FooterBottom = dynamic(() => import("@/components/FooterBottom"), { ssr: true, loading: () => null });
const MobileMenu = dynamic(() => import("@/components/Navbar").then(m => m.MobileMenu), { ssr: false, loading: () => null });
const SocialFab = dynamic(() => import("@/components/10xboostercourse/components/SocialFab"), { ssr: false });
const WhatsAppFab = dynamic(() => import("@/components/10xboostercourse/components/WhatsAppFab"), { ssr: false });

function HomeContent() {
  return (
    <Container>
      <Navbar />
      <Hero />
      <ClassSelection />
      <Impact />
      <AIEcosystem />
      <InnovativeLearningTools />
      <Teachers />
      <Banner />
      <Testimonials />
      <CTA />
      <Reviews />
      <BlogsContent />
      <NewsContent />
      <FAQ />
      <AppDownload />
      <Footer />
      <StudyMaterial />
      <Moto />
      <FooterBottom />
      <MobileMenu />
      <SocialFab />
      <WhatsAppFab />
    </Container>
  );
}

export default function Home() {
  return (
    <MobileMenuProvider>
      <HomeContent />
    </MobileMenuProvider>
  );
}
