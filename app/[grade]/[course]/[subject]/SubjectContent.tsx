"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { parseGradeFromParam } from "@/lib/navigation";
import { useMobileMenu } from "@/components/Navbar";
import Container from "@/components/Container";
import Navbar, { MobileMenu } from "@/components/Navbar";
import { SubjectBreadcrumb } from "@/components/classes/SubjectBreadcrumb";
import Course from "@/components/classes/Course";
import QuickLinks from "@/components/classes/QuickLinks";
import Payment from "@/components/classes/payment";
import Chapters from "@/components/classes/chapters";
import BoosterCourseSection from "@/components/classes/BoosterCourseSection";
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

export default function SubjectContent({
  grade,
  course,
  subject,
}: {
  grade: string;
  course: string;
  subject: string;
}) {
  const { setSelectedGrade } = useMobileMenu();
  const [mentorIds, setMentorIds] = useState<number[]>([]);

  const gradeNumber = parseGradeFromParam(grade);

  if (gradeNumber === null) {
    notFound();
  }

  const courseLabel = decodeURIComponent(course).replace(/-/g, " ");

  useEffect(() => {
    setSelectedGrade(gradeNumber);
  }, [gradeNumber, setSelectedGrade]);

  const handleMentorIdsChange = (ids: number[]) => {
    setMentorIds(ids);
  };

  return (
    <Container>
      <Navbar />
      <SubjectBreadcrumb
        gradeNumber={gradeNumber}
        subject={subject}
        course={courseLabel}
      />
      <Course gradeNumber={gradeNumber} courseName={courseLabel} onMentorIdsChange={handleMentorIdsChange} />
      <QuickLinks mentorIds={mentorIds} />
      <Payment gradeNumber={gradeNumber} />
      <Chapters gradeNumber={gradeNumber} courseName={courseLabel} />
      <BoosterCourseSection gradeNumber={gradeNumber} />
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
