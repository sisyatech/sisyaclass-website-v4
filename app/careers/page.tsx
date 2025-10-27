"use client";

import React, { useEffect } from 'react';
import Navbar, { MobileMenuProvider, MobileMenu, useMobileMenu } from "@/components/Navbar";
import Container from "@/components/Container";
import Footer from '@/components/Footer';
import FooterBottom from '@/components/FooterBottom';
import HeroSection from '@/components/careers/HeroSection';
import StatsSection from '@/components/careers/StatsSection';

import ValuesSection from '@/components/careers/ValuesSection';
import GallerySection from '@/components/careers/GallerySection';
import OpeningsSection from '@/components/careers/OpeningSection';
import ApplicationProcessSection from '@/components/careers/ApplicationProcessSection';

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function CareersContent() {
  const { setCurrentPage, setSelectedGrade } = useMobileMenu();

  useEffect(() => {
    setCurrentPage("careers");
    setSelectedGrade(null);
  }, [setCurrentPage, setSelectedGrade]);

  return (
    <>
      <div className="sticky top-0 z-50 shadow-sm">
        <Container>
          <Navbar />
          
          {/* Breadcrumb */}
          <div className="bg-white py-3 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Careers</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>

          {/* Hero Section */}
          <HeroSection />

          {/* Stats Section */}
          <StatsSection />

        

          {/* Values Section */}
          <ValuesSection />

          {/* Gallery Section */}
          <GallerySection />

          {/* Job Openings Section */}
          <OpeningsSection />

          {/* Application Process Section */}
          <ApplicationProcessSection />


          {/* Footer */}
          <Footer />

          {/* Footer Bottom */}
          <FooterBottom />
        </Container>
      </div>

      <MobileMenu />
    </>
  );
}

export default function CareersPage() {
  return (
    <MobileMenuProvider>
      <CareersContent />
    </MobileMenuProvider>
  );
}
