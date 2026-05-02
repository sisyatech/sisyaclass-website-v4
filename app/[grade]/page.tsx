import { getPageSchemas } from "@/lib/schemaApi";
import SchemaInjector from "@/components/SchemaInjector";
import { MobileMenuProvider } from "@/components/Navbar";
import GradeContent from "./GradeContent";

interface GradePageProps {
  params: Promise<{
    grade: string;
  }>;
}

export default async function GradePage({ params }: GradePageProps) {
  const { grade } = await params;
  const schemas = await getPageSchemas('grade', grade);
  
  return (
    <MobileMenuProvider>
      <SchemaInjector schemas={schemas} />
      <GradeContent grade={grade} />
    </MobileMenuProvider>
  );
}
