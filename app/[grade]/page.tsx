"use client";

import Container from "@/components/Container";
import Course from "@/components/classes/Course";
import Navbar, { MobileMenuProvider, MobileMenu, useMobileMenu } from "@/components/Navbar";
import QuickLinks from "@/components/classes/QuickLinks";
import FAQ from "@/components/FAQ";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";
import StudyMaterial from "@/components/StudyMaterial";
import Moto from "@/components/moto";
import FooterBottom from "@/components/FooterBottom";
import { use, useEffect } from "react";
import { notFound } from "next/navigation";
import { parseGradeFromParam } from "@/lib/navigation";
import Payment from "@/components/classes/payment";
import Impact from "@/components/Impact";
import AIEcosystem from "@/components/AIEcosystem";
import InnovativeLearningTools from "@/components/InnovativeLearningTools";
import Teachers from "@/components/Teachers";
import Banner from "@/components/Banner";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Reviews from "@/components/Reviews";
import SyllabusSection from "@/components/classes/SyllabusSection";

interface GradePageProps {
  params: Promise<{
    grade: string;
  }>;
}

function GradeContent({ grade }: { grade: string }) {
  const { setSelectedGrade } = useMobileMenu();
  
  // Parse and validate grade number using navigation utilities
  const gradeNumber = parseGradeFromParam(grade);
  
  // Show 404 if invalid grade
  if (gradeNumber === null) {
    notFound();
  }
  
  useEffect(() => {
    setSelectedGrade(gradeNumber);
  }, [gradeNumber, setSelectedGrade]);

  return (
    <Container>
      <Navbar />
      <Course gradeNumber={gradeNumber} />
      <QuickLinks />
      <Payment />
      <SyllabusSection />
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

export default function GradePage({ params }: GradePageProps) {
  // Unwrap the params promise using React.use()
  const unwrappedParams = use(params);
  
  return (
    <MobileMenuProvider>
      <GradeContent grade={unwrappedParams.grade} />
    </MobileMenuProvider>
  );
}

