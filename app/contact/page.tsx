

import Navbar, { MobileMenuProvider, MobileMenu } from "@/components/Navbar";
import Container from "@/components/Container";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";
import StudyMaterial from "@/components/StudyMaterial";
import Moto from "@/components/moto";
import FooterBottom from "@/components/FooterBottom";
import { ContactBreadcrumb } from "@/components/contact/ContactBreadcrumb";
import ContactContent from "@/components/contact/ContactContent";
import SocialFab from "@/components/10xboostercourse/components/SocialFab";
import WhatsAppFab from "@/components/10xboostercourse/components/WhatsAppFab";
function ContactPageContent() {
  return (
    <Container>
      <Navbar />
      <ContactBreadcrumb />
      <ContactContent />
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

export default function ContactPage() {
  return (
    <MobileMenuProvider>
      <ContactPageContent />
    </MobileMenuProvider>
  );
}
