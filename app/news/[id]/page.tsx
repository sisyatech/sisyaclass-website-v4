

import { use } from "react";
import Navbar, { MobileMenuProvider, MobileMenu } from "@/components/Navbar";
import Container from "@/components/Container";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";
import StudyMaterial from "@/components/StudyMaterial";
import Moto from "@/components/moto";
import FooterBottom from "@/components/FooterBottom";
import { NewsBreadcrumb } from "@/components/news/NewsBreadcrumb";
import NewsDetailContent from "@/components/news/newsdetailspage/NewsDetailContent";

interface NewsDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

function NewsDetailPageContent({ id }: { id: string }) {
  // You can fetch the news title here based on the id
  // For now, using a placeholder
  const newsTitle = "News Article Title";

  return (
    <Container>
      <Navbar />
      <NewsBreadcrumb newsTitle={newsTitle} />
      <div className="w-full">
        <NewsDetailContent newsId={id} />
      </div>
      
      <AppDownload />
      <Footer />
      <StudyMaterial />
      <Moto />
      <FooterBottom />
      <MobileMenu />
    </Container>
  );
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const unwrappedParams = use(params);
  
  return (
    <MobileMenuProvider>
      <NewsDetailPageContent id={unwrappedParams.id} />
    </MobileMenuProvider>
  );
}
