import type { Metadata } from "next";
import { Suspense } from "react";

import ScholarshipExamContent from "@/components/scholarship/ScholarshipExamContent";

export const metadata: Metadata = {
  title: "Scholarship Exam | SISYA CLASS",
  description:
    "Take the SISYA CLASS scholarship mock exam for grades 1 to 9 with a timed, subject-balanced practice interface.",
};

export default function ScholarshipExamPage() {
  return (
    <Suspense fallback={null}>
      <ScholarshipExamContent />
    </Suspense>
  );
}