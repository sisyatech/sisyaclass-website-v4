import { getPageSchemas } from "@/lib/schemaApi";
import SchemaInjector from "@/components/SchemaInjector";
import { MobileMenuProvider } from "@/components/Navbar";
import CourseContent from "./CourseContent";

interface CoursePageProps {
  params: Promise<{
    grade: string;
    course: string;
  }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { grade, course } = await params;
  const schemas = await getPageSchemas('grade', grade);
  
  return (
    <MobileMenuProvider>
      <SchemaInjector schemas={schemas} />
      <CourseContent grade={grade} course={course} />
    </MobileMenuProvider>
  );
}
