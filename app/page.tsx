"use client";

import Container from "@/components/Container";
import Hero from "@/components/Hero";
import Course from "@/components/Course";
import Navbar, { MobileMenuProvider, MobileMenu, useMobileMenu } from "@/components/Navbar";
import ClassSelection from "@/components/ClassSelection";
import Impact from "@/components/Impact";
import AIEcosystem from "@/components/AIEcosystem";
import InnovativeLearningTools from "@/components/InnovativeLearningTools";
import Teachers from "@/components/Teachers";
import Banner from "@/components/Banner";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";
import StudyMaterial from "@/components/StudyMaterial";
import Moto from "@/components/moto";
import FooterBottom from "@/components/FooterBottom";

function HomeContent() {
  const { selectedGrade } = useMobileMenu();
  
  return (
    <Container>
      <Navbar />
      {selectedGrade ? <Course gradeNumber={selectedGrade} /> : <Hero />}
      <ClassSelection />
      <Impact />
      <AIEcosystem />
      <InnovativeLearningTools />
      <Teachers />
      <Banner />
      <Testimonials />
      <CTA />
      <Reviews />
      <FAQ />
      <AppDownload />
      <Footer />
      <StudyMaterial />
      <Moto />
      <FooterBottom />
      <MobileMenu />
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
