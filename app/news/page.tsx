"use client";

import Navbar, { MobileMenuProvider, MobileMenu } from "@/components/Navbar";
import Container from "@/components/Container";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";
import StudyMaterial from "@/components/StudyMaterial";
import Moto from "@/components/moto";
import FooterBottom from "@/components/FooterBottom";
import { NewsBreadcrumb } from "@/components/news/NewsBreadcrumb";
import NewsContent from "@/components/news/NewsContent";
import SimilarNews from "@/components/news/SimilarNews";
import Impact from "@/components/Impact";
import NewsBanner from "@/components/news/NewsBanner";

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
