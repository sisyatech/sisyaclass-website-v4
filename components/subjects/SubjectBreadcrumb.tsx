"use client";

import React from "react";
import Link from "next/link";

interface SubjectBreadcrumbProps {
  gradeNumber: number;
  subject: string;
}

const SubjectBreadcrumb = ({ gradeNumber, subject }: SubjectBreadcrumbProps) => {
  const getSubjectDisplayName = (subject: string) => {
    switch (subject.toLowerCase()) {
      case 'maths':
        return 'Maths';
      case 'science':
        return 'Science';
      case 'english':
        return 'English';
      default:
        return subject;
    }
  };

  const getGradeUrl = (gradeNumber: number) => {
    return `/grade${gradeNumber}`;
  };

  return (
    <div className="py-4 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <nav className="flex items-center space-x-2 text-sm">
          <Link 
            href="/" 
            className="text-[#0595CE] hover:text-[#047aa8] transition-colors"
          >
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link 
            href={getGradeUrl(gradeNumber)}
            className="text-[#0595CE] hover:text-[#047aa8] transition-colors"
          >
            Class {gradeNumber}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600 font-medium">
            {getSubjectDisplayName(subject)} Classes
          </span>
        </nav>
      </div>
    </div>
  );
};

export default SubjectBreadcrumb;
