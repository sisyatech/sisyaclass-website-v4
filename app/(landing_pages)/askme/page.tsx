import { getPageSchemas } from "@/lib/schemaApi";
import SchemaInjector from "@/components/SchemaInjector";
import AskMePageContent from "./AskMeContent";

export default async function AskMePage() {
  const schemas = await getPageSchemas('landing', 'askme');
  
  return (
    <>
      <SchemaInjector schemas={schemas} />
      <AskMePageContent />
    </>
  );
}
