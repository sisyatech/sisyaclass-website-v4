import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface GradeBreadcrumbProps {
  gradeNumber: number;
  course?: string;
}

export function GradeBreadcrumb({ gradeNumber, course }: GradeBreadcrumbProps) {
  const getCourseDisplayName = (courseName: string) =>
    courseName
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  const courseSlug = course
    ? encodeURIComponent(course.toLowerCase().replace(/\s+/g, '-'))
    : null;

  return (
    <div className="w-full py-1 sm:py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {course ? (
                <BreadcrumbLink asChild>
                  <Link href={`/grade${gradeNumber}`}>Class {gradeNumber}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>Class {gradeNumber}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {course && courseSlug && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={`/grade${gradeNumber}/${courseSlug}`}>
                      {getCourseDisplayName(course)}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}

