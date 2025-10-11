"use client";

import React from "react";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import FooterBottom from "@/components/FooterBottom";
import Navbar, { MobileMenuProvider, MobileMenu, useMobileMenu } from "@/components/Navbar";
import PrivacyPolicyContent from "@/components/privacy/PrivacyPolicyContent";
import StudyMaterial from "@/components/StudyMaterial";
import Moto from "@/components/moto";

function PrivacyPolicyPageContent() {
    return (
        <Container>
            <Navbar />
            <PrivacyPolicyContent />
            
            {/* Footer */}
            <Footer />

            {/* Study Material */}
            <StudyMaterial />

            {/* Moto */}
            <Moto />

            {/* Footer Bottom */}
            <FooterBottom />
            <MobileMenu />
        </Container>
    );
}

export default function PrivacyPolicyPage() {
    return (
        <MobileMenuProvider>
            <PrivacyPolicyPageContent />
        </MobileMenuProvider>
    );
}

