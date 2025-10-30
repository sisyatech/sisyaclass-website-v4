import Navbar, { MobileMenuProvider, MobileMenu } from "@/components/Navbar";
import Container from "@/components/Container";
import TenXBoosterCourseContent from "@/components/10xboostercourse/TenXBoosterCourseContent";
import Footer from "@/components/Footer";
import Moto from "@/components/moto";
import FooterBottom from "@/components/FooterBottom";

function TenXBoosterCoursePageContent() {
  return (
    <Container>
      <Navbar />
      <TenXBoosterCourseContent />
      <Footer />
      <Moto />

{/* Footer Bottom */}
<FooterBottom />  

      <MobileMenu />
    </Container>
  );
}

export default function TenXBoosterCoursePage() {
  return (
    <MobileMenuProvider>
      <TenXBoosterCoursePageContent />
    </MobileMenuProvider>
  );
}

