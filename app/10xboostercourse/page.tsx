import Navbar, { MobileMenuProvider, MobileMenu } from "@/components/Navbar";
import Container from "@/components/Container";
import TenXBoosterCourseContent from "@/components/10xboostercourse/TenXBoosterCourseContent";
import Footer from "@/components/Footer";
import Moto from "@/components/moto";
import FooterBottom from "@/components/FooterBottom";
import Script from "next/script";

function TenXBoosterCoursePageContent() {
  return (
    <>
      <Script id="gtm-script" strategy="afterInteractive">
        {`(function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-PMD8KHN9');`}
      </Script>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-PMD8KHN9"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      <Container>
        <Navbar />
        <TenXBoosterCourseContent />
        <Footer />
        <Moto />

{/* Footer Bottom */}
<FooterBottom />  

        <MobileMenu />
      </Container>
    </>
  );
}

export default function TenXBoosterCoursePage() {
  return (
    <MobileMenuProvider>
      <TenXBoosterCoursePageContent />
    </MobileMenuProvider>
  );
}

