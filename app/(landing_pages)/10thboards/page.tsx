import React from "react";
import Container from "@/components/Container";
import Navbar, { MobileMenuProvider, MobileMenu } from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterBottom from "@/components/FooterBottom";
import BoardContent from "@/components/board/BoardContent";
import Moto from "@/components/moto";
import { getPageSchemas } from "@/lib/schemaApi";
import SchemaInjector from "@/components/SchemaInjector";

export default async function BoardPage() {
  const schemas = await getPageSchemas('landing', '10thboards');
  
  return (
    <MobileMenuProvider>
      <SchemaInjector schemas={schemas} />
      <Container>
        <Navbar />
        <BoardContent />
        <Footer />
        <Moto />
        <FooterBottom />
        <MobileMenu />
      </Container>
    </MobileMenuProvider>
  );
}
