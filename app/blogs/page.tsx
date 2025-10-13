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

function BlogsPageContent() {
  return (
    <Container>
      <Navbar />
      <BlogBreadcrumb />
      <BlogsContent />
      <Impact />

      <SimilarVideos />
      <BlogBanner />
      <StudyMaterials />

      <AppDownload />
      <Footer />
      <StudyMaterial />
      <Moto />
      <FooterBottom />
      <MobileMenu />
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
