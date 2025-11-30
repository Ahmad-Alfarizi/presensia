/**
 * User Management Hook
 * Custom hook for user CRUD operations with centralized error handling
 */

import { useState, useCallback, useEffect } from 'react';
import { useAuth } from './useAuth';
import { userAPI } from '../api/user.api';
import { authAPI } from '../api/auth.api';
import { logger } from '../utils/logger';
import { AppError, ERROR_CODES } from '../utils/errors';
import { userStorage } from '../utils/storage';

const TAG = 'useUsers';

/**
 * useUsers - User management hook
 * @returns {Object} User state and methods
 */
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch all users
   */
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      logger.info(TAG, 'Fetching all users');

      const data = await userAPI.getAllUsers();
      setUsers(data);

      return data;
    } catch (err) {
      logger.error(TAG, 'Failed to fetch users', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Automatically fetch users when auth state becomes available
  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      try {
        if (!user) return;
        await fetchUsers();
      } catch (err) {
        // ignore - fetchUsers already logs
      }
    };

    if (mounted) init();

    return () => {
      mounted = false;
    };
  }, [user, fetchUsers]);

  /**
   * Create new user
   */
  const createUser = useCallback(async (userData) => {
    try {
      setError(null);

      logger.info(TAG, 'Creating new user', { email: userData.email });

      const newUser = await userAPI.createUser(userData);

      // Add to local state
      setUsers((prev) => [...prev, newUser]);

      logger.info(TAG, 'User created successfully');

      return newUser;
    } catch (err) {
      logger.error(TAG, 'Failed to create user', err);
      setError(err);
      throw err;
    }
  }, []);

  /**
   * Add user with plan enforcement (backwards-compatible API)
   * - If current account plan is 'free' and user count >= 5, reject
   */
  const addUser = useCallback(async (userData) => {
    try {
      setError(null);

      // Get cached current user (admin) to determine plan
      const current = await userStorage.getUserData();
      const plan = current?.plan || 'free';

      // Enforce free plan limit
      if (plan === 'free' && users.length >= 5) {
        const msg = 'Limit pengguna untuk paket Free tercapai (maks 5 user). Upgrade plan untuk menambah lebih banyak user.';
        logger.warn(TAG, msg);
        throw new AppError(ERROR_CODES.PLAN_LIMIT_REACHED, msg);
      }

      // Create Firebase Auth user and Firestore user doc so the new user can login
      // authAPI.signUp(email, password, role, additionalData)
      const { email, password, role, fullname, course } = userData;
      const additionalData = {
        name: fullname || userData.fullname || userData.name,
        course: course || userData.course,
        role: role || 'Student',
      };

      const newUser = await authAPI.signUp(email, password, role || 'Student', additionalData);

      // Normalize returned user object and add to local state
      const normalized = {
        id: newUser.uid || newUser.id,
        name: newUser.name || newUser.fullname || additionalData.name,
        email: newUser.email,
        role: newUser.role || additionalData.role,
        course: newUser.course || additionalData.course,
      };

      setUsers((prev) => [...prev, normalized]);

      return normalized;
    } catch (err) {
      logger.error(TAG, 'Failed to add user', err);
      setError(err);
      throw err;
    }
  }, [users, createUser]);

  /**
   * Get user by ID
   */
  const getUserById = useCallback(async (userId) => {
    try {
      setError(null);

      logger.debug(TAG, 'Fetching user by ID', { userId });

      const user = await userAPI.getUserById(userId);

      return user;
    } catch (err) {
      logger.error(TAG, 'Failed to get user', err);
      setError(err);
      throw err;
    }
  }, []);

  /**
   * Get users by role
   */
  const getUsersByRole = useCallback(async (role) => {
    try {
      setError(null);

      logger.info(TAG, 'Fetching users by role', { role });

      const data = await userAPI.getUsersByRole(role);

      return data;
    } catch (err) {
      logger.error(TAG, 'Failed to fetch users by role', err);
      setError(err);
      throw err;
    }
  }, []);

  /**
   * Get users by course
   */
  const getUsersByCourse = useCallback(async (courseCode) => {
    try {
      setError(null);

      logger.info(TAG, 'Fetching users by course', { courseCode });

      const data = await userAPI.getUsersByCourse(courseCode);

      return data;
    } catch (err) {
      logger.error(TAG, 'Failed to fetch users by course', err);
      setError(err);
      throw err;
    }
  }, []);

  /**
   * Update user
   */
  const updateUser = useCallback(async (userId, updates) => {
    try {
      setError(null);

      logger.info(TAG, 'Updating user', { userId });

      const updatedUser = await userAPI.updateUser(userId, updates);

      // Update local state
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? updatedUser : user))
      );

      logger.info(TAG, 'User updated successfully');

      return updatedUser;
    } catch (err) {
      logger.error(TAG, 'Failed to update user', err);
      setError(err);
      throw err;
    }
  }, []);

  /**
   * Delete user
   */
  const deleteUser = useCallback(async (userId) => {
    try {
      setError(null);

      logger.info(TAG, 'Deleting user', { userId });

      await userAPI.deleteUser(userId);

      // Remove from local state
      setUsers((prev) => prev.filter((user) => user.id !== userId));

      logger.info(TAG, 'User deleted successfully');
    } catch (err) {
      logger.error(TAG, 'Failed to delete user', err);
      setError(err);
      throw err;
    }
  }, []);

  /**
   * Search users by email
   */
  const searchUsersByEmail = useCallback(async (email) => {
    try {
      setError(null);

      logger.info(TAG, 'Searching users by email', { email });

      const data = await userAPI.searchUsersByEmail(email);

      return data;
    } catch (err) {
      logger.error(TAG, 'Failed to search users', err);
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
    users,
    loading,
    error,

    // Methods
  fetchUsers,
  createUser,
  // Backwards-compatible alias: some screens call `addUser` instead of `createUser`
  addUser,
    getUserById,
    getUsersByRole,
    getUsersByCourse,
    updateUser,
    deleteUser,
    searchUsersByEmail,
    clearError,
  };
};

export default useUsers;
