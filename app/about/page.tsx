"use client";

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

function AboutContent() {
    const { setCurrentPage, setSelectedGrade } = useMobileMenu();

    useEffect(() => {
        setCurrentPage("about");
        setSelectedGrade(null);
    }, [setCurrentPage, setSelectedGrade]);

    return (
        <div className="max-w-xl mx-auto">
            <Navbar />
            <AboutUs />
            {/* Mission Section */}
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
            <MobileMenu />
        </div>
    );
}

export default function AboutPage() {
    return (
        <MobileMenuProvider>
            <AboutContent />
        </MobileMenuProvider>
    );
}

