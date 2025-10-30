import React from "react";
import Container from "@/components/Container";
import Navbar, { MobileMenuProvider, MobileMenu } from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterBottom from "@/components/FooterBottom";
import ThreeDayLPContent from "@/components/3daylp/ThreeDayLPContent";
import Moto from "@/components/moto";

export default function ThreeDaysLPPage() {
  return (
    <MobileMenuProvider>
      <Container>
        <Navbar />
        <ThreeDayLPContent />
        <Footer />
        <Moto />
        <FooterBottom />
        <MobileMenu />
      </Container>
    </MobileMenuProvider>
  );
}


