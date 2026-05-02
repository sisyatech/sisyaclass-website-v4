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
import { use, useEffect, useState } from "react";
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

import { GradeBreadcrumb } from "@/components/classes/GradeBreadcrumb";
import SocialFab from "@/components/10xboostercourse/components/SocialFab";
import WhatsAppFab from "@/components/10xboostercourse/components/WhatsAppFab";

interface GradePageProps {
  params: Promise<{
    grade: string;
  }>;
}

function GradeContent({ grade }: { grade: string }) {
  const { setSelectedGrade } = useMobileMenu();
  const [mentorIds, setMentorIds] = useState<number[]>([]);
  
  // Parse and validate grade number using navigation utilities
  const gradeNumber = parseGradeFromParam(grade);
  
  // If it's not a grade, it might be a web page type (syllabus, pyq, etc.)
  // For now, we only support specific pages with slugs ([grade]/[course]).
  // If no course is provided, we redirect to home.
  if (gradeNumber === null) {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
    return null;
  }
  
  useEffect(() => {
    setSelectedGrade(gradeNumber);
  }, [gradeNumber, setSelectedGrade]);

  const handleMentorIdsChange = (ids: number[]) => {
    //console.log('GradeContent: Received mentor IDs:', ids);
    setMentorIds(ids);
  };

  return (
    <Container>
      <Navbar />
      <GradeBreadcrumb gradeNumber={gradeNumber} />
      <Course gradeNumber={gradeNumber} onMentorIdsChange={handleMentorIdsChange} />
      <QuickLinks mentorIds={mentorIds} />
      <Payment gradeNumber={gradeNumber} />
      <SyllabusSection gradeNumber={gradeNumber} />
 
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
      <SocialFab />
      <WhatsAppFab />
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

