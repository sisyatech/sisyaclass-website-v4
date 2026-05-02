import { use } from "react";
import Navbar, { MobileMenuProvider, MobileMenu } from "@/components/Navbar";
import Container from "@/components/Container";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";
import StudyMaterial from "@/components/StudyMaterial";
import Moto from "@/components/moto";
import FooterBottom from "@/components/FooterBottom";
import WebPageDetail from "@/components/webpages/WebPageDetail";
import SocialFab from "@/components/10xboostercourse/components/SocialFab";
import WhatsAppFab from "@/components/10xboostercourse/components/WhatsAppFab";

interface WebPageProps {
  params: Promise<{
    type: string;
    slug: string;
  }>;
}

function WebPageContent({ type, slug }: { type: string; slug: string }) {
  return (
    <Container>
      <Navbar />
      <WebPageDetail slug={slug} />
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

export default function WebPage({ params }: WebPageProps) {
  const unwrappedParams = use(params);
  
  return (
    <MobileMenuProvider>
      <WebPageContent type={unwrappedParams.type} slug={unwrappedParams.slug} />
    </MobileMenuProvider>
  );
}
