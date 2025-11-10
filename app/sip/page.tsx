"use client";

import Container from "@/components/Container";
import Navbar, { MobileMenuProvider, MobileMenu } from "@/components/Navbar";
import SIPHero from "@/components/sip/siphero";
import ProgramHighlightsSection from "@/components/sip/ProgramHighlightsSection";
import ChallengesSection from "@/components/sip/ChallengesSection";
import AdvantageSection from "@/components/sip/AdvantageSection";
import TeachingLearningSection from "@/components/sip/TeachingLearningSection";
import BestAcademicTeamSection from "@/components/sip/BestAcademicTeamSection";
import Footer from "@/components/Footer";
import FooterBottom from "@/components/FooterBottom";
import SIPBreadcrumb from "@/components/sip/SIPBreadcrumb";
import VisionMissionSection from "@/components/sip/VisionMissionSection";
import CollaborativeLearningSection from "@/components/sip/CollaborativeLearningSection";
import BuildingSchoolsSection from "@/components/sip/BuildingSchoolsSection";
import Moto from "@/components/moto";
import StudyMaterial from "@/components/StudyMaterial";
import Reviews from "@/components/sip/reviews";


function SIPPageContent() {
  return (
    <Container>
      <Navbar />
      <SIPBreadcrumb />
      <SIPHero />
      <CollaborativeLearningSection />
      <BuildingSchoolsSection />
      <VisionMissionSection />
      <ProgramHighlightsSection />
      <ChallengesSection /> 
      <AdvantageSection />
      <TeachingLearningSection />
      <BestAcademicTeamSection />
      <Reviews />
      <Footer />
      <StudyMaterial />
      <Moto />
      <FooterBottom />
      <MobileMenu />
    </Container>
  );
}

export default function SIPPage() {
  return (
    <MobileMenuProvider>
      <SIPPageContent />
    </MobileMenuProvider>
  );
}
