import React, { createContext, useContext } from 'react';
import { useCourses as useCoursesHook } from '../hooks/useCourses';
import { logger } from '../utils';

/**
 * @deprecated Use useCourses hook directly instead
 * 
 * CourseContext is now a thin wrapper around the useCourses hook for backward compatibility.
 * 
 * Migration example:
 * OLD: const { courses, addCourse, updateCourse } = useContext(CourseContext);
 * NEW: const { courses, addCourse, updateCourse } = useCourses();
 */
const CourseContext = createContext();

/**
 * CourseProvider - Thin wrapper providing course context
 * 
 * The actual course management logic is in src/hooks/useCourses.js
 * This provider maintains backward compatibility with existing code
 * 
 * @example
 * <CourseProvider>
 *   <App />
 * </CourseProvider>
 */
export const CourseProvider = ({ children }) => {
  // Use the hook here and expose its value via context so multiple
  // components share the same course state (singleton-like behavior).
  // This preserves backward compatibility for components that use the
  // CourseContext-based API.
  const coursesValue = useCoursesHook();

  logger.debug('CourseProvider mounted - providing shared useCourses value via context');

  return (
    <CourseContext.Provider value={coursesValue}>
      {children}
    </CourseContext.Provider>
  );
};

/**
 * Deprecated: useCoursesContext hook
 * Use the useCourses hook from @/hooks instead
 * 
 * @deprecated Use useCourses from '@/hooks' instead
 * @throws Error if not used within CourseProvider
 * @returns {Object} Course context value
 * 
 * @example
 * // OLD WAY (deprecated)
 * const { courses, addCourse } = useCoursesContext();
 * 
 * // NEW WAY (recommended)
 * const { courses, addCourse } = useCourses();
 */
export const useCoursesContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    logger.warn('useCoursesContext used outside CourseProvider - use useCourses hook instead');
    // Fallback to useCourses hook
    return useCoursesHook();
  }
  return context;
};

// For backward compatibility - export as is but recommend migration
export { useCoursesContext as useCourses };
