import { getPageSchemas } from "@/lib/schemaApi";
import SchemaInjector from "@/components/SchemaInjector";
import { MobileMenuProvider } from "@/components/Navbar";
import GradeContent from "./GradeContent";

import { parseGradeFromParam } from "@/lib/navigation";

interface GradePageProps {
  params: Promise<{
    grade: string;
  }>;
}

export default async function GradePage({ params }: GradePageProps) {
  const { grade } = await params;
  const gradeNumber = parseGradeFromParam(grade);
  const schemas = await getPageSchemas('grade', gradeNumber?.toString() || grade);
  
  return (
    <MobileMenuProvider>
      <SchemaInjector schemas={schemas} />
      <GradeContent grade={grade} />
    </MobileMenuProvider>
  );
}
