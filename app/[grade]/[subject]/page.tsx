"use client";

import { use, useEffect } from "react";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Navbar, { MobileMenuProvider, MobileMenu, useMobileMenu } from "@/components/Navbar";
import { parseGradeFromParam } from "@/lib/navigation";
import { SubjectBreadcrumb } from "@/components/SubjectBreadcrumb";
import Course from "@/components/classes/Course";
import QuickLinks from "@/components/classes/QuickLinks";
import Payment from "@/components/classes/payment";
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
import SyllabusSection from "@/components/classes/SyllabusSection";
import Chapters from "@/components/chapters";
import BoosterCourseSection from "@/components/BoosterCourseSection";

interface SubjectPageProps {
  params: Promise<{
    grade: string;
    subject: string;
  }>;
}

function SubjectContent({ grade, subject }: { grade: string; subject: string }) {
  const { setSelectedGrade } = useMobileMenu();
  
  // Parse and validate grade number using navigation utilities
  const gradeNumber = parseGradeFromParam(grade);
  
  // Show 404 if invalid grade
  if (gradeNumber === null) {
    notFound();
  }
  
  // Validate subject
  const validSubjects = ['mathematics', 'science', 'english'];
  const normalizedSubject = subject.toLowerCase();
  
  if (!validSubjects.includes(normalizedSubject)) {
    notFound();
  }
  
  useEffect(() => {
    setSelectedGrade(gradeNumber);
  }, [gradeNumber, setSelectedGrade]);

  return (
    <>
      <Navbar />
      <Container>
        <SubjectBreadcrumb gradeNumber={gradeNumber} subject={subject} />
        <Course gradeNumber={gradeNumber} />
        <QuickLinks />
        <Payment />
        <Chapters gradeNumber={gradeNumber} />
        <BoosterCourseSection />
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
    </>
  );
}

export default function SubjectPage({ params }: SubjectPageProps) {
  // Unwrap the params promise using React.use()
  const unwrappedParams = use(params);
  
  return (
    <MobileMenuProvider>
      <SubjectContent grade={unwrappedParams.grade} subject={unwrappedParams.subject} />
    </MobileMenuProvider>
  );
}