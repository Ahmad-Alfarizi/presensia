/**
 * User management API
 * Handles user CRUD operations with Firestore
 */

import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  query,
  where,
  doc,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { logger } from '../utils/logger';
import { ERROR_CODES, AppError } from '../utils/errors';

const TAG = 'UserAPI';

/**
 * User API operations
 */
export const userAPI = {
  /**
   * Create new user in Firestore
   */
  createUser: async (userData) => {
    try {
      logger.info(TAG, 'Creating user', { email: userData.email });

      const docRef = await addDoc(collection(db, 'users'), {
        ...userData,
        createdAt: new Date().toISOString(),
      });

      const newUser = {
        id: docRef.id,
        ...userData,
      };

      logger.info(TAG, 'User created successfully', { id: docRef.id });

      return newUser;
    } catch (error) {
      logger.error(TAG, 'Failed to create user', error);
      throw new AppError(ERROR_CODES.FIRESTORE_ERROR, 'Failed to create user', error);
    }
  },

  /**
   * Get all users
   */
  getAllUsers: async () => {
    try {
      logger.info(TAG, 'Fetching all users');

      const snapshot = await getDocs(collection(db, 'users'));
      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      logger.debug(TAG, `Retrieved ${users.length} users`);

      return users;
    } catch (error) {
      logger.error(TAG, 'Failed to fetch users', error);
      throw new AppError(ERROR_CODES.FIRESTORE_ERROR, 'Failed to fetch users', error);
    }
  },

  /**
   * Get user by ID
   */
  getUserById: async (userId) => {
    try {
      logger.debug(TAG, 'Fetching user', { userId });

      const docRef = doc(db, 'users', userId);
      const snapshot = await getDocs(collection(db, 'users'));

      const userDoc = snapshot.docs.find((d) => d.id === userId);

      if (!userDoc) {
        logger.warn(TAG, 'User not found', { userId });
        return null;
      }

      const user = {
        id: userDoc.id,
        ...userDoc.data(),
      };

      return user;
    } catch (error) {
      logger.error(TAG, 'Failed to fetch user', error);
      throw new AppError(ERROR_CODES.FIRESTORE_ERROR, 'Failed to fetch user', error);
    }
  },

  /**
   * Get users by role
   */
  getUsersByRole: async (role) => {
    try {
      logger.info(TAG, 'Fetching users by role', { role });

      const q = query(collection(db, 'users'), where('role', '==', role));
      const snapshot = await getDocs(q);

      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      logger.debug(TAG, `Retrieved ${users.length} users with role ${role}`);

      return users;
    } catch (error) {
      logger.error(TAG, 'Failed to fetch users by role', error);
      throw new AppError(ERROR_CODES.FIRESTORE_ERROR, 'Failed to fetch users by role', error);
    }
  },

  /**
   * Get users by course
   */
  getUsersByCourse: async (courseCode) => {
    try {
      logger.info(TAG, 'Fetching users by course', { courseCode });

      const q = query(collection(db, 'users'), where('course', '==', courseCode));
      const snapshot = await getDocs(q);

      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      logger.debug(TAG, `Retrieved ${users.length} users for course ${courseCode}`);

      return users;
    } catch (error) {
      logger.error(TAG, 'Failed to fetch users by course', error);
      throw new AppError(
        ERROR_CODES.FIRESTORE_ERROR,
        'Failed to fetch users by course',
        error
      );
    }
  },

  /**
   * Update user
   */
  updateUser: async (userId, updates) => {
    try {
      logger.info(TAG, 'Updating user', { userId });

      const docRef = doc(db, 'users', userId);

      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date().toISOString(),
      });

      logger.info(TAG, 'User updated successfully', { userId });

      // Return updated user
      return userAPI.getUserById(userId);
    } catch (error) {
      logger.error(TAG, 'Failed to update user', error);
      throw new AppError(ERROR_CODES.FIRESTORE_ERROR, 'Failed to update user', error);
    }
  },

  /**
   * Delete user
   */
  deleteUser: async (userId) => {
    try {
      logger.info(TAG, 'Deleting user', { userId });

      const docRef = doc(db, 'users', userId);
      await deleteDoc(docRef);

      logger.info(TAG, 'User deleted successfully', { userId });
    } catch (error) {
      logger.error(TAG, 'Failed to delete user', error);
      throw new AppError(ERROR_CODES.FIRESTORE_ERROR, 'Failed to delete user', error);
    }
  },

  /**
   * Search users by email
   */
  searchUsersByEmail: async (email) => {
    try {
      logger.info(TAG, 'Searching users by email', { email });

      // Note: Firestore doesn't support LIKE queries, so we fetch and filter
      const snapshot = await getDocs(collection(db, 'users'));
      const users = snapshot.docs
        .filter((doc) => doc.data().email?.toLowerCase().includes(email.toLowerCase()))
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      logger.debug(TAG, `Found ${users.length} users matching email`);

      return users;
    } catch (error) {
      logger.error(TAG, 'Failed to search users', error);
      throw new AppError(ERROR_CODES.FIRESTORE_ERROR, 'Failed to search users', error);
    }
  },
};

export default userAPI;
