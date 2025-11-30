/**
 * Authentication hook
 * Refactored auth logic from AuthContext
 * Clean separation of concerns
 */

import { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { authAPI } from '../api/auth.api';
import { userStorage } from '../utils/storage';
import { logger } from '../utils/logger';
import { AppError, getErrorMessage } from '../utils/errors';

const TAG = 'useAuth';

/**
 * useAuth - Authentication hook
 * @returns {Object} Auth state and methods
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Initialize auth state on mount
   */
  useEffect(() => {
    logger.debug(TAG, 'Setting up auth state listener');

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          logger.debug(TAG, 'User authenticated', { uid: firebaseUser.uid });

          // Get user data from Firestore
          const userData = await authAPI.getCurrentUser(firebaseUser.uid);

          if (userData) {
            setUser(userData);
            await userStorage.saveUserData(userData);
          } else {
            logger.warn(TAG, 'User data not found in Firestore');
          }
        } else {
          logger.debug(TAG, 'User not authenticated');
          setUser(null);
          await userStorage.clearUserData();
        }
      } catch (err) {
        logger.error(TAG, 'Error setting up auth state', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  /**
   * Sign in
   */
  const signIn = useCallback(async (email, password, language = 'english') => {
    try {
      logger.info(TAG, 'Signing in user', { email });
      setError(null);

      const userData = await authAPI.signIn(email, password);
      setUser(userData);

      return userData;
    } catch (err) {
      const errorMsg =
        err instanceof AppError ? getErrorMessage(err.code, language) : err.message;

      logger.error(TAG, 'Sign in failed', err);
      setError(errorMsg);

      throw new AppError(err.code || 'AUTH_FAILED', errorMsg, err);
    }
  }, []);

  /**
   * Sign up
   */
  const signUp = useCallback(
    async (email, password, role, additionalData = {}, language = 'english') => {
      try {
        logger.info(TAG, 'Signing up user', { email, role });
        setError(null);

        const userData = await authAPI.signUp(email, password, role, additionalData);
        setUser(userData);

        return userData;
      } catch (err) {
        const errorMsg =
          err instanceof AppError ? getErrorMessage(err.code, language) : err.message;

        logger.error(TAG, 'Sign up failed', err);
        setError(errorMsg);

        throw new AppError(err.code || 'AUTH_FAILED', errorMsg, err);
      }
    },
    []
  );

  /**
   * Sign out
   * Note: User data is retained in cache for convenience on next login
   */
  const signOut = useCallback(async () => {
    try {
      logger.info(TAG, 'Signing out user');
      setError(null);

      await authAPI.signOut();
      setUser(null);
      // User data is kept in storage for next login
    } catch (err) {
      logger.error(TAG, 'Sign out failed', err);
      setError(err.message);

      throw err;
    }
  }, []);

  /**
   * Update user profile
   */
  const updateProfile = useCallback(async (updates) => {
    try {
      if (!user?.uid) {
        throw new Error('User not authenticated');
      }

      logger.info(TAG, 'Updating user profile');

      const updatedUser = await authAPI.updateUser(user.uid, updates);
      setUser(updatedUser);

      return updatedUser;
    } catch (err) {
      logger.error(TAG, 'Update profile failed', err);
      setError(err.message);

      throw err;
    }
  }, [user]);

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    user,
    loading,
    error,
    isAuthenticated: !!user,

    // Methods
    signIn,
    signUp,
    signOut,
    updateProfile,
    clearError,
  };
};

export default useAuth;
