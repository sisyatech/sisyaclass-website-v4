import { getPageSchemas } from "@/lib/schemaApi";
import SchemaInjector from "@/components/SchemaInjector";
import { MobileMenuProvider } from "@/components/Navbar";
import CourseContent from "./CourseContent";
import { parseGradeFromParam } from "@/lib/navigation";

interface CoursePageProps {
  params: Promise<{
    grade: string;
    course: string;
  }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { grade, course } = await params;
  const gradeNumber = parseGradeFromParam(grade);
  const schemas = await getPageSchemas('grade', gradeNumber?.toString() || grade);
  
  return (
    <MobileMenuProvider>
      <SchemaInjector schemas={schemas} />
      <CourseContent grade={grade} course={course} />
    </MobileMenuProvider>
  );
}
