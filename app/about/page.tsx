import { getPageSchemas } from "@/lib/schemaApi";
import SchemaInjector from "@/components/SchemaInjector";
import { MobileMenuProvider } from "@/components/Navbar";
import AboutContent from "./AboutContent";

export default async function AboutPage() {
  const schemas = await getPageSchemas('custom', 'about');
  
  return (
    <MobileMenuProvider>
      <SchemaInjector schemas={schemas} />
      <AboutContent />
    </MobileMenuProvider>
  );
}
