

import React from "react";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import FooterBottom from "@/components/FooterBottom";
import Navbar, { MobileMenuProvider, MobileMenu, useMobileMenu } from "@/components/Navbar";
import RefundPolicyContent from "@/components/refund/RefundPolicyContent";
import StudyMaterial from "@/components/StudyMaterial";
import Moto from "@/components/moto";
import SocialFab from "@/components/10xboostercourse/components/SocialFab";
import WhatsAppFab from "@/components/10xboostercourse/components/WhatsAppFab";

function RefundPolicyPageContent() {
    return (
        <Container>
            <Navbar />
            <RefundPolicyContent />

            {/* Footer */}
            <Footer />

            {/* Study Material */}
            <StudyMaterial />

            {/* Moto */}
            <Moto />

            {/* Footer Bottom */}
            <FooterBottom />
            <MobileMenu />
            <SocialFab />
            <WhatsAppFab />
        </Container>
    );
}

export default function RefundPolicyPage() {
    return (
        <MobileMenuProvider>
            <RefundPolicyPageContent />
        </MobileMenuProvider>
    );
}
