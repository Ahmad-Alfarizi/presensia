/**
 * Course management API
 * Handles course CRUD operations
 */

import { logger } from '../utils/logger';
import { ERROR_CODES, AppError } from '../utils/errors';

const TAG = 'CourseAPI';

/**
 * In-memory course storage (can be replaced with Firestore if needed)
 */
let coursesStore = [
  {
    id: 'CS101',
    name: 'Introduction to Data Science',
    code: 'CS101',
    instructor: 'Dr. Anya Sharma',
    semester: 'Fall 2024',
    description: 'Learn the basics of data science',
    locationName: 'Building A, Room 101',
    latitude: 40.7128,
    longitude: -74.006,
    students: 62,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'CS201',
    name: 'Advanced Algorithms',
    code: 'CS201',
    instructor: 'Prof. Ben Carter',
    semester: 'Spring 2024',
    description: 'Deep dive into algorithm design',
    locationName: 'Building B, Room 205',
    latitude: 40.758,
    longitude: -73.9855,
    students: 45,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'CS301',
    name: 'Mobile Application Development',
    code: 'CS301',
    instructor: 'Dr. Chloe Davis',
    semester: 'Fall 2024',
    description: 'Build cross-platform mobile apps',
    locationName: 'Building C, Lab 301',
    latitude: 40.7614,
    longitude: -73.9776,
    students: 54,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'CS401',
    name: 'Human-Computer Interaction',
    code: 'CS401',
    instructor: 'Dr. Ian Evans',
    semester: 'Spring 2024',
    description: 'Study user interface design',
    locationName: 'Building A, Room 305',
    latitude: 40.7489,
    longitude: -73.968,
    students: 38,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'CS501',
    name: 'Machine Learning Foundations',
    code: 'CS501',
    instructor: 'Prof. Freya Garcia',
    semester: 'Fall 2024',
    description: 'Introduction to ML algorithms',
    locationName: 'Building D, Room 501',
    latitude: 40.7505,
    longitude: -73.9934,
    students: 71,
    createdAt: new Date().toISOString(),
  },
];

/**
 * Course API operations
 */
export const courseAPI = {
  /**
   * Get all courses
   */
  getAllCourses: async () => {
    try {
      logger.debug(TAG, `Retrieved ${coursesStore.length} courses`);
      return [...coursesStore];
    } catch (error) {
      logger.error(TAG, 'Failed to fetch courses', error);
      throw new AppError(ERROR_CODES.FIRESTORE_ERROR, 'Failed to fetch courses', error);
    }
  },

  /**
   * Get course by code
   */
  getCourseByCode: async (courseCode) => {
    try {
      logger.debug(TAG, 'Fetching course', { courseCode });

      const course = coursesStore.find((c) => c.code === courseCode);

      if (!course) {
        logger.warn(TAG, 'Course not found', { courseCode });
        return null;
      }

      return { ...course };
    } catch (error) {
      logger.error(TAG, 'Failed to fetch course', error);
      throw new AppError(ERROR_CODES.FIRESTORE_ERROR, 'Failed to fetch course', error);
    }
  },

  /**
   * Create new course
   */
  createCourse: async (courseData) => {
    try {
      logger.info(TAG, 'Creating course', { code: courseData.code });

      // Check if course already exists
      if (coursesStore.find((c) => c.code === courseData.code)) {
        throw new Error('Course with this code already exists');
      }

      const newCourse = {
        id: courseData.code,
        ...courseData,
        createdAt: new Date().toISOString(),
      };

      coursesStore.push(newCourse);

      logger.info(TAG, 'Course created successfully', { code: courseData.code });

      return { ...newCourse };
    } catch (error) {
      logger.error(TAG, 'Failed to create course', error);
      throw new AppError(ERROR_CODES.FIRESTORE_ERROR, 'Failed to create course', error);
    }
  },

  /**
   * Update course
   */
  updateCourse: async (courseCode, updates) => {
    try {
      logger.info(TAG, 'Updating course', { courseCode });

      const index = coursesStore.findIndex((c) => c.code === courseCode);

      if (index === -1) {
        throw new Error('Course not found');
      }

      coursesStore[index] = {
        ...coursesStore[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      logger.info(TAG, 'Course updated successfully', { courseCode });

      return { ...coursesStore[index] };
    } catch (error) {
      logger.error(TAG, 'Failed to update course', error);
      throw new AppError(ERROR_CODES.FIRESTORE_ERROR, 'Failed to update course', error);
    }
  },

  /**
   * Delete course
   */
  deleteCourse: async (courseCode) => {
    try {
      logger.info(TAG, 'Deleting course', { courseCode });

      const index = coursesStore.findIndex((c) => c.code === courseCode);

      if (index === -1) {
        throw new Error('Course not found');
      }

      coursesStore.splice(index, 1);

      logger.info(TAG, 'Course deleted successfully', { courseCode });
    } catch (error) {
      logger.error(TAG, 'Failed to delete course', error);
      throw new AppError(ERROR_CODES.FIRESTORE_ERROR, 'Failed to delete course', error);
    }
  },

  /**
   * Search courses by instructor
   */
  searchByInstructor: async (instructorName) => {
    try {
      logger.info(TAG, 'Searching courses by instructor', { instructorName });

      const courses = coursesStore.filter((c) =>
        c.instructor?.toLowerCase().includes(instructorName.toLowerCase())
      );

      logger.debug(TAG, `Found ${courses.length} courses`);

      return courses.map((c) => ({ ...c }));
    } catch (error) {
      logger.error(TAG, 'Failed to search courses', error);
      throw new AppError(ERROR_CODES.FIRESTORE_ERROR, 'Failed to search courses', error);
    }
  },

  /**
   * Get courses by semester
   */
  getCoursesBySemester: async (semester) => {
    try {
      logger.info(TAG, 'Fetching courses by semester', { semester });

      const courses = coursesStore.filter((c) => c.semester === semester);

      logger.debug(TAG, `Retrieved ${courses.length} courses for semester ${semester}`);

      return courses.map((c) => ({ ...c }));
    } catch (error) {
      logger.error(TAG, 'Failed to fetch courses by semester', error);
      throw new AppError(
        ERROR_CODES.FIRESTORE_ERROR,
        'Failed to fetch courses by semester',
        error
      );
    }
  },
};

export default courseAPI;
