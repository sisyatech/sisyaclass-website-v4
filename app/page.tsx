import { getPageSchemas } from "@/lib/schemaApi";
import SchemaInjector from "@/components/SchemaInjector";
import { MobileMenuProvider } from "@/components/Navbar";
import HomeContent from "./HomeContent";

export default async function Home() {
  const schemas = await getPageSchemas('custom', 'home');
  
  return (
    <MobileMenuProvider>
      <SchemaInjector schemas={schemas} />
      <HomeContent />
    </MobileMenuProvider>
  );
}
