/**
 * Hooks Index
 * Central export point for all custom hooks
 */

export { useAuth } from './useAuth';
export { useForm } from './useForm';
export { useAsync } from './useAsync';
// Re-export useUsers from context so consumers receive the context-backed
// hook which provides shared user state when wrapped with UserProvider.
export { useUsers } from '../context/UserContext';
// Re-export useCourses from context so consumers receive the context-backed
// hook which provides shared course state when wrapped with CourseProvider.
export { useCourses } from '../context/CourseContext';
