"use client";

import Container from "@/components/Container";
import Navbar, { MobileMenuProvider, MobileMenu } from "@/components/Navbar";
import SIPHero from "@/components/sip/siphero";
import Footer from "@/components/Footer";
import FooterBottom from "@/components/FooterBottom";
import AppDownload from "@/components/AppDownload";
import SIPBreadcrumb from "@/components/sip/SIPBreadcrumb";

function SIPPageContent() {
  return (
    <Container>
      <Navbar />
      <SIPBreadcrumb />
      <SIPHero />
      <AppDownload />
      <Footer />
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
