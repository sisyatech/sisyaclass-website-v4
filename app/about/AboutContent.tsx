"use client";

import { useEffect } from "react";
import { useMobileMenu } from "@/components/Navbar";
import Navbar from "@/components/Navbar";
import Container from "@/components/Container";
import AboutUs from "@/components/aboutus/AboutUs";
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
import { AboutBreadcrumb } from "@/components/aboutus/AboutBreadcrumb";
import SocialFab from "@/components/10xboostercourse/components/SocialFab";
import WhatsAppFab from "@/components/10xboostercourse/components/WhatsAppFab";
import { MobileMenu } from "@/components/Navbar";

export default function AboutContent() {
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
                <VisionSection />
                <NewSection />
                <AnotherSection />
                <FAQ />
                <AppDownload />
                <Footer />
                <StudyMaterial />
                <Moto />
                <FooterBottom />
            </div>
            <MobileMenu />
            <SocialFab />
            <WhatsAppFab />
        </Container>
    );
}
