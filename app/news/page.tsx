"use client";

import Navbar, { MobileMenuProvider, MobileMenu } from "@/components/Navbar";
import Container from "@/components/Container";
import dynamic from "next/dynamic";
import { NewsBreadcrumb } from "@/components/news/NewsBreadcrumb";
const AppDownload = dynamic(() => import("@/components/AppDownload"), { ssr: true, loading: () => null });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true, loading: () => null });
const StudyMaterial = dynamic(() => import("@/components/StudyMaterial"), { ssr: true, loading: () => null });
const Moto = dynamic(() => import("@/components/moto"), { ssr: true, loading: () => null });
const FooterBottom = dynamic(() => import("@/components/FooterBottom"), { ssr: true, loading: () => null });
const NewsContent = dynamic(() => import("@/components/news/NewsContent"), { ssr: true, loading: () => null });
const SimilarNews = dynamic(() => import("@/components/news/SimilarNews"), { ssr: true, loading: () => null });
const Impact = dynamic(() => import("@/components/Impact"), { ssr: true, loading: () => null });
const NewsBanner = dynamic(() => import("@/components/news/NewsBanner"), { ssr: true, loading: () => null });

function NewsPageContent() {
  return (
    <Container>
      <Navbar />
      <NewsBreadcrumb />
      <NewsContent />
      <Impact />
      <SimilarNews />
      <NewsBanner/>  
      <AppDownload />
      <Footer />
      <StudyMaterial />
      <Moto />
      <FooterBottom />
      <MobileMenu />
    </Container>
  );
}

export default function NewsPage() {
  return (
    <MobileMenuProvider>
      <NewsPageContent />
    </MobileMenuProvider>
  );
}
