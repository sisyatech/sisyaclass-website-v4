"use client";

import dynamic from "next/dynamic";
import Container from "@/components/Container";
import Navbar, { MobileMenuProvider, MobileMenu, useMobileMenu } from "@/components/Navbar";
import { useEffect } from "react";
import { AboutBreadcrumb } from "@/components/AboutBreadcrumb";

const AboutUs = dynamic(() => import("@/components/aboutus/AboutUs"), { ssr: true, loading: () => null });
const MissionSection = dynamic(() => import("@/components/aboutus/MissionSection"), { ssr: true, loading: () => null });
const VisionSection = dynamic(() => import("@/components/aboutus/VisionSection"), { ssr: true, loading: () => null });
const NewSection = dynamic(() => import("@/components/aboutus/inroduction"), { ssr: true, loading: () => null });
const AnotherSection = dynamic(() => import("@/components/aboutus/unique"), { ssr: true, loading: () => null });
const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: true, loading: () => null });
const AppDownload = dynamic(() => import("@/components/AppDownload"), { ssr: true, loading: () => null });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true, loading: () => null });
const StudyMaterial = dynamic(() => import("@/components/StudyMaterial"), { ssr: true, loading: () => null });
const Moto = dynamic(() => import("@/components/moto"), { ssr: true, loading: () => null });
const FooterBottom = dynamic(() => import("@/components/FooterBottom"), { ssr: true, loading: () => null });

function AboutContent() {
    const { setCurrentPage, setSelectedGrade } = useMobileMenu();

    useEffect(() => {
        setCurrentPage("about");
        setSelectedGrade(null);
    }, [setCurrentPage, setSelectedGrade]);

    return (
        <>
            <div className="sticky top-0 z-50 shadow-sm">
                <Container>
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
                </Container>
            </div>


            <MobileMenu />
        </>
    );
}

export default function AboutPage() {
    return (
        <MobileMenuProvider>
            <AboutContent />
        </MobileMenuProvider>
    );
}

