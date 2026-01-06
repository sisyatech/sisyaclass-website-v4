"use client";

import React, { useState } from "react";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import FooterBottom from "@/components/FooterBottom";
import Moto from "@/components/moto";
import AskMeContent from "@/components/askme/AskMeContent";
import Script from "next/script";
import AskMeNavbar from "@/components/askme/AskMeNavbar";
import AskMeMobileMenu from "@/components/askme/AskMeMobileMenu";

export default function AskMePage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    return (
        <>
            <Script id="gtm-script-askme" strategy="afterInteractive">
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
                <AskMeNavbar
                    isMobileMenuOpen={isMobileMenuOpen}
                    toggleMobileMenu={toggleMobileMenu}
                />
                <AskMeContent />
                <Footer />
                <Moto />
                <FooterBottom />
                <AskMeMobileMenu
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                />
            </Container>
        </>
    );
}

