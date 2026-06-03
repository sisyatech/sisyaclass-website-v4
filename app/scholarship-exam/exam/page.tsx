import type { Metadata } from "next";
import { Suspense } from "react";
import ScholarshipExamSession from "@/components/scholarship/ScholarshipExamSession";

export const metadata: Metadata = {
  title: "Active Exam | Scholarship | SISYA CLASS",
  description:
    "Scholarship mock exam session — answer 10 questions within 30 minutes.",
};

export default function ScholarshipExamSessionPage() {
  return (
    <Suspense fallback={null}>
      <ScholarshipExamSession />
    </Suspense>
  );
}
