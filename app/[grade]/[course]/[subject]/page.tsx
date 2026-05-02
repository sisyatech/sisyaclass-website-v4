import { getPageSchemas } from "@/lib/schemaApi";
import SchemaInjector from "@/components/SchemaInjector";
import { MobileMenuProvider } from "@/components/Navbar";
import SubjectContent from "./SubjectContent";

interface SubjectPageProps {
  params: Promise<{
    grade: string;
    course: string;
    subject: string;
  }>;
}

export default async function SubjectWithCoursePage({ params }: SubjectPageProps) {
  const { grade, course, subject } = await params;
  const schemas = await getPageSchemas('grade', grade);

  return (
    <MobileMenuProvider>
      <SchemaInjector schemas={schemas} />
      <SubjectContent
        grade={grade}
        course={course}
        subject={subject}
      />
    </MobileMenuProvider>
  );
}
