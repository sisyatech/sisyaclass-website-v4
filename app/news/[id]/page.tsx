

import { use } from "react";
import Navbar, { MobileMenuProvider, MobileMenu } from "@/components/Navbar";
import Container from "@/components/Container";
import dynamic from "next/dynamic";
import { NewsBreadcrumb } from "@/components/news/NewsBreadcrumb";
const AppDownload = dynamic(() => import("@/components/AppDownload"), { ssr: true, loading: () => null });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true, loading: () => null });
const StudyMaterial = dynamic(() => import("@/components/StudyMaterial"), { ssr: true, loading: () => null });
const Moto = dynamic(() => import("@/components/moto"), { ssr: true, loading: () => null });
const FooterBottom = dynamic(() => import("@/components/FooterBottom"), { ssr: true, loading: () => null });
const NewsDetailContent = dynamic(() => import("@/components/news/newsdetailspage/NewsDetailContent"), { ssr: true, loading: () => null });

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
