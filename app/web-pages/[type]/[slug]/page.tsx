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
import { getPageSchemas } from "@/lib/schemaApi";
import SchemaInjector from "@/components/SchemaInjector";

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

export default async function WebPage({ params }: WebPageProps) {
  const { type, slug } = await params;
  const schemas = await getPageSchemas('webpage', slug);
  
  return (
    <MobileMenuProvider>
      <SchemaInjector schemas={schemas} />
      <WebPageContent type={type} slug={slug} />
    </MobileMenuProvider>
  );
}
