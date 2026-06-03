import { Suspense } from "react";
import Navbar, { MobileMenuProvider, MobileMenu } from "@/components/Navbar";
import Container from "@/components/Container";
import BlogsContent from "@/components/blogs/BlogsContent";
import BlogBanner from "@/components/blogs/BlogBanner";
import StudyMaterials from "@/components/blogs/StudyMaterials";
import { BlogBreadcrumb } from "@/components/blogs/BlogBreadcrumb";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";
import StudyMaterial from "@/components/StudyMaterial";
import Moto from "@/components/moto";
import FooterBottom from "@/components/FooterBottom";
import Impact from "@/components/Impact";
import SimilarVideos from "@/components/blogs/SimilarVideos";
import SocialFab from "@/components/10xboostercourse/components/SocialFab";
import WhatsAppFab from "@/components/10xboostercourse/components/WhatsAppFab";
export const dynamic = "force-dynamic";

function BlogsPageContent() {
  return (
    <Container>
      <Navbar />
      <BlogBreadcrumb />
      <Suspense fallback={<div>Loading blogs...</div>}>
        <BlogsContent />
      </Suspense>
      <Impact />

      <Suspense fallback={<div>Loading similar blogs...</div>}>
        <SimilarVideos />
      </Suspense>
      <BlogBanner />
      <StudyMaterials />

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

export default function BlogsPage() {
  return (
    <MobileMenuProvider>
      <BlogsPageContent />
    </MobileMenuProvider>
  );
}
