/**
 * Application Routes Configuration
 * Centralized routing definitions for the entire application
 */

export const routes = {
  home: '/',
  about: '/about',
  blogs: '/blogs',
  news: '/news',
  contact: '/contact',
  careers: '/careers',
  // Dynamic grade routes
  grade: (gradeNumber: number) => `/grade${gradeNumber}`,

  /**
   * Course page URL:
   *   /grade{N}/{courseSlug}
   */
  course: (gradeNumber: number, courseLabel: string) => {
    const courseSlug = courseLabel.toLowerCase().replace(/\s+/g, '-');
    return `/grade${gradeNumber}/${courseSlug}`;
  },

  /**
   * Subject page URL using the new route-segment pattern:
   *   /grade{N}/{courseSlug}/{subjectSlug}
   *
   * Both courseLabel and subjectLabel are lowercased and space-to-hyphen converted.
   * Example: subject(8, "JEE Foundation", "Mathematics") → "/grade8/jee-foundation/mathematics"
   */
  subject: (gradeNumber: number, courseLabel: string, subjectLabel: string) => {
    const courseSlug = courseLabel.toLowerCase().replace(/\s+/g, '-');
    const subjectSlug = subjectLabel.toLowerCase().replace(/\s+/g, '-');
    return `/grade${gradeNumber}/${courseSlug}/${subjectSlug}`;
  },

  /**
   * Legacy subject page URL (query-param style, kept for backward-compat).
   *   /grade{N}/{subjectSlug}?course={courseLabel}
   */
  subjectLegacy: (gradeNumber: number, subjectLabel: string, courseLabel?: string) => {
    const subjectSlug = subjectLabel.toLowerCase().replace(/\s+/g, '-');
    const courseParam = courseLabel ? `?course=${encodeURIComponent(courseLabel)}` : '';
    return `/grade${gradeNumber}/${subjectSlug}${courseParam}`;
  },

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

  newsContent: {
    news: {
      label: 'News',
      href: routes.news,
    }
  },
  
  footer: {
    about: {
      label: 'About us',
      href: routes.about,
    },
    home: {
      label: 'Home',
      href: routes.home,
    },
    blogs: {
      label: 'Blogs',
      href: routes.blogs,
    },
    news: {
      label: 'News',
      href: routes.news,
    },
    contact: {
      label: 'Contact us',
      href: routes.contact,
    },
  },
} as const;

export default routes;