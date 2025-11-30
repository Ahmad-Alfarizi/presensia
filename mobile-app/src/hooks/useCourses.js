/**
 * Course Management Hook
 * Custom hook for course CRUD operations
 */

import { useState, useCallback, useEffect } from 'react';
import { useAuth } from './useAuth';
import { courseAPI } from '../api/course.api';
import { logger } from '../utils/logger';

const TAG = 'useCourses';

/**
 * useCourses - Course management hook
 * @returns {Object} Course state and methods
 */
export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch all courses
   */
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      logger.info(TAG, 'Fetching all courses');

      const data = await courseAPI.getAllCourses();
      setCourses(data);

      return data;
    } catch (err) {
      logger.error(TAG, 'Failed to fetch courses', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Automatically fetch courses when auth state becomes available
  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      try {
        if (!user) return;
        await fetchCourses();
      } catch (err) {
        // fetchCourses logs errors
      }
    };

    if (mounted) init();

    return () => {
      mounted = false;
    };
  }, [user, fetchCourses]);

  /**
   * Get course by code
   */
  const getCourseByCode = useCallback(async (courseCode) => {
    try {
      setError(null);

      logger.debug(TAG, 'Fetching course', { courseCode });

      const course = await courseAPI.getCourseByCode(courseCode);

      return course;
    } catch (err) {
      logger.error(TAG, 'Failed to get course', err);
      setError(err);
      throw err;
    }
  }, []);

  /**
   * Create new course
   */
  const createCourse = useCallback(async (courseData) => {
    try {
      setError(null);

      logger.info(TAG, 'Creating new course', { code: courseData.code });

      const newCourse = await courseAPI.createCourse(courseData);

      // Add to local state
      setCourses((prev) => [...prev, newCourse]);

      logger.info(TAG, 'Course created successfully');

      return newCourse;
    } catch (err) {
      logger.error(TAG, 'Failed to create course', err);
      setError(err);
      throw err;
    }
  }, []);

  /**
   * Update course
   */
  const updateCourse = useCallback(async (courseCode, updates) => {
    try {
      setError(null);

      logger.info(TAG, 'Updating course', { courseCode });

      const updatedCourse = await courseAPI.updateCourse(courseCode, updates);

      // Update local state
      setCourses((prev) =>
        prev.map((course) => (course.code === courseCode ? updatedCourse : course))
      );

      logger.info(TAG, 'Course updated successfully');

      return updatedCourse;
    } catch (err) {
      logger.error(TAG, 'Failed to update course', err);
      setError(err);
      throw err;
    }
  }, []);

  /**
   * Delete course
   */
  const deleteCourse = useCallback(async (courseCode) => {
    try {
      setError(null);

      logger.info(TAG, 'Deleting course', { courseCode });

      await courseAPI.deleteCourse(courseCode);

      // Remove from local state
      setCourses((prev) => prev.filter((course) => course.code !== courseCode));

      logger.info(TAG, 'Course deleted successfully');
    } catch (err) {
      logger.error(TAG, 'Failed to delete course', err);
      setError(err);
      throw err;
    }
  }, []);

  /**
   * Search courses by instructor
   */
  const searchByInstructor = useCallback(async (instructorName) => {
    try {
      setError(null);

      logger.info(TAG, 'Searching courses by instructor', { instructorName });

      const data = await courseAPI.searchByInstructor(instructorName);

      return data;
    } catch (err) {
      logger.error(TAG, 'Failed to search courses', err);
      setError(err);
      throw err;
    }
  }, []);

  /**
   * Get courses by semester
   */
  const getCoursesBySemester = useCallback(async (semester) => {
    try {
      setError(null);

      logger.info(TAG, 'Fetching courses by semester', { semester });

      const data = await courseAPI.getCoursesBySemester(semester);

      return data;
    } catch (err) {
      logger.error(TAG, 'Failed to fetch courses by semester', err);
      setError(err);
      throw err;
    }
  }, []);

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    courses,
    loading,
    error,
    // Expose setter for backward compatibility (some components destructure setCourses)
    setCourses,

    // Methods
    fetchCourses,
    getCourseByCode,
    createCourse,
    // Backwards-compatible alias: some screens call `addCourse` instead of `createCourse`
    addCourse: createCourse,
    updateCourse,
    deleteCourse,
    searchByInstructor,
    getCoursesBySemester,
    clearError,
  };
};

export default useCourses;
