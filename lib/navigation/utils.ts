/**
 * Navigation Utilities
 * Helper functions for routing and navigation
 */

import { routes, GRADE_CONFIG } from './routes';

/**
 * Validate if a grade number is valid
 */
export const validateGrade = (grade: number): boolean => {
  return grade >= GRADE_CONFIG.MIN_GRADE && grade <= GRADE_CONFIG.MAX_GRADE;
};

/**
 * Parse grade from URL parameter
 * Returns null if invalid
 */
export const parseGradeFromParam = (param: string): number | null => {
  const gradeNumber = parseInt(param.replace(/\D/g, ''), 10);
  
  if (isNaN(gradeNumber) || !validateGrade(gradeNumber)) {
    return null;
  }
  
  return gradeNumber;
};

/**
 * Generate grade URL
 */
export const getGradeUrl = (grade: number): string => {
  if (!validateGrade(grade)) {
    throw new Error(`Invalid grade: ${grade}. Must be between ${GRADE_CONFIG.MIN_GRADE} and ${GRADE_CONFIG.MAX_GRADE}`);
  }
  return routes.grade(grade);
};

/**
 * Extract grade number from label (e.g., "Grade 8" -> 8)
 */
export const extractGradeFromLabel = (label: string): number | null => {
  const match = label.match(/\d+/);
  if (!match) return null;
  
  const grade = parseInt(match[0], 10);
  return validateGrade(grade) ? grade : null;
};

/**
 * Navigation helper for programmatic routing
 */
export const navigationHelper = {
  toHome: () => routes.home,
  toAbout: () => routes.about,
  toGrade: (grade: number) => getGradeUrl(grade),
  isValidGradeUrl: (param: string) => parseGradeFromParam(param) !== null,
};

export default navigationHelper;

