/**
 * Application Routes Configuration
 * Centralized routing definitions for the entire application
 */

export const routes = {
  home: '/',
  about: '/about',
  
  // Dynamic grade routes
  grade: (gradeNumber: number) => `/grade${gradeNumber}`,
  
  // Grade validation
  isValidGrade: (grade: number) => grade >= 1 && grade <= 12,
  
  // Extract grade number from URL param
  extractGradeNumber: (gradeParam: string): number | null => {
    const gradeNumber = parseInt(gradeParam.replace('grade', ''));
    return isNaN(gradeNumber) ? null : gradeNumber;
  },
} as const;

/**
 * All available grade numbers
 */
export const AVAILABLE_GRADES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

/**
 * Grade range configuration
 */
export const GRADE_CONFIG = {
  MIN_GRADE: 1,
  MAX_GRADE: 12,
  TOTAL_GRADES: 12,
} as const;

/**
 * Navigation links for different sections
 */
export const navigationLinks = {
  courses: AVAILABLE_GRADES.map((grade) => ({
    label: `Grade ${grade}`,
    href: routes.grade(grade),
    grade: grade,
  })),
  
  footer: {
    about: {
      label: 'About us',
      href: routes.about,
    },
    home: {
      label: 'Home',
      href: routes.home,
    },
  },
} as const;

export default routes;

