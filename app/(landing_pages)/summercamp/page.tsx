import React from "react";
import SummerCampContent from "@/components/summercamp/SummerCampContent";
import Container from "@/components/Container";
import Navbar, { MobileMenuProvider, MobileMenu } from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterBottom from "@/components/FooterBottom";
import Moto from "@/components/moto";
import Script from "next/script";
import { getPageSchemas } from "@/lib/schemaApi";
import SchemaInjector from "@/components/SchemaInjector";

export const metadata = {
    title: "Summer Camp 2026 | Sisya Class",
    description: "Join our Summer Camp 2026 for a fun and educational experience.",
};

export default async function SummerCampPage() {
  const schemas = await getPageSchemas('landing', 'summercamp');
  
  return (
    <MobileMenuProvider>
      <SchemaInjector schemas={schemas} />
            <Script id="gtm-script-summercamp" strategy="afterInteractive">
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
                    style={{ display: "none", visibility: "hidden" }}
                />
            </noscript>
            <Container>
                <Navbar />
                <SummerCampContent />
                <Footer />
                <Moto />
                <FooterBottom />
                <MobileMenu />
            </Container>
        </MobileMenuProvider>
    );
}
