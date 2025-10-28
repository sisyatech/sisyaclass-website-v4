import Navbar, { MobileMenuProvider, MobileMenu } from "@/components/Navbar";
import Container from "@/components/Container";
import dynamic from "next/dynamic";
import { BlogBreadcrumb } from "@/components/blogs/BlogBreadcrumb";

const BlogsContent = dynamic(() => import("@/components/blogs/BlogsContent"), { ssr: true, loading: () => null });
const BlogBanner = dynamic(() => import("@/components/blogs/BlogBanner"), { ssr: true, loading: () => null });
const StudyMaterials = dynamic(() => import("@/components/blogs/StudyMaterials"), { ssr: true, loading: () => null });
const AppDownload = dynamic(() => import("@/components/AppDownload"), { ssr: true, loading: () => null });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true, loading: () => null });
const StudyMaterial = dynamic(() => import("@/components/StudyMaterial"), { ssr: true, loading: () => null });
const Moto = dynamic(() => import("@/components/moto"), { ssr: true, loading: () => null });
const FooterBottom = dynamic(() => import("@/components/FooterBottom"), { ssr: true, loading: () => null });
const Impact = dynamic(() => import("@/components/Impact"), { ssr: true, loading: () => null });
const SimilarVideos = dynamic(() => import("@/components/blogs/SimilarVideos"), { ssr: true, loading: () => null });

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
