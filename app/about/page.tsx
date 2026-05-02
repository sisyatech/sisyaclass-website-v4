import AboutUs from "@/components/aboutus/AboutUs";
import Container from "@/components/Container";
import Navbar, { MobileMenuProvider, MobileMenu, useMobileMenu } from "@/components/Navbar";
import MissionSection from "@/components/aboutus/MissionSection";
import VisionSection from "@/components/aboutus/VisionSection";
import NewSection from "@/components/aboutus/inroduction";
import AnotherSection from "@/components/aboutus/unique";
import FAQ from "@/components/FAQ";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";
import StudyMaterial from "@/components/StudyMaterial";
import Moto from "@/components/moto";
import FooterBottom from "@/components/FooterBottom";
import { useEffect } from "react";
import { AboutBreadcrumb } from "@/components/aboutus/AboutBreadcrumb";
import SocialFab from "@/components/10xboostercourse/components/SocialFab";
import WhatsAppFab from "@/components/10xboostercourse/components/WhatsAppFab";

"use client";
function AboutContent() {
    const { setCurrentPage, setSelectedGrade } = useMobileMenu();

    useEffect(() => {
        setCurrentPage("about");
        setSelectedGrade(null);
    }, [setCurrentPage, setSelectedGrade]);

    return (
        <Container>
            <div className="sticky top-0 z-50 shadow-sm">
                    <Navbar />
                    <AboutBreadcrumb />
                    <AboutUs />
                    <MissionSection />

                    {/* Vision Section */}
                    <VisionSection />

                    {/* New Section */}
                    <NewSection />

                    {/* Another Section */}
                    <AnotherSection />

                    {/* FAQ Section */}
                    <FAQ />

                    {/* App Download Section */}
                    <AppDownload />

                    {/* Footer */}
                    <Footer />

                    {/* Study Material */}
                    <StudyMaterial />

                    {/* Moto */}
                    <Moto />

                    {/* Footer Bottom */}
                    <FooterBottom />
            </div>


            <MobileMenu />
            <SocialFab />
            <WhatsAppFab />
        </Container>
    );
}

import { getPageSchemas } from "@/lib/schemaApi";
import SchemaInjector from "@/components/SchemaInjector";

export default async function AboutPage() {
  const schemas = await getPageSchemas('custom', 'about');
  
  return (
    <MobileMenuProvider>
      <SchemaInjector schemas={schemas} />
      <AboutContent />
    </MobileMenuProvider>
  );
}

