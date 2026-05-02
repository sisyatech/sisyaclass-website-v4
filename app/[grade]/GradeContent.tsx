"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { parseGradeFromParam } from "@/lib/navigation";
import { useMobileMenu } from "@/components/Navbar";
import Container from "@/components/Container";
import Navbar, { MobileMenu } from "@/components/Navbar";
import { GradeBreadcrumb } from "@/components/classes/GradeBreadcrumb";
import Course from "@/components/classes/Course";
import QuickLinks from "@/components/classes/QuickLinks";
import Payment from "@/components/classes/payment";
import SyllabusSection from "@/components/classes/SyllabusSection";
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
import SocialFab from "@/components/10xboostercourse/components/SocialFab";
import WhatsAppFab from "@/components/10xboostercourse/components/WhatsAppFab";

export default function GradeContent({ grade }: { grade: string }) {
  const { setSelectedGrade } = useMobileMenu();
  const [mentorIds, setMentorIds] = useState<number[]>([]);
  
  const gradeNumber = parseGradeFromParam(grade);
  
  if (gradeNumber === null) {
    notFound();
  }
  
  useEffect(() => {
    setSelectedGrade(gradeNumber);
  }, [gradeNumber, setSelectedGrade]);

  const handleMentorIdsChange = (ids: number[]) => {
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
