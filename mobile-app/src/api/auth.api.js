/**
 * Firebase authentication API
 * Handles all auth-related Firebase operations
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { logger } from '../utils/logger';
import { tokenStorage, userStorage } from '../utils/storage';
import { ERROR_CODES, AppError, mapFirebaseError } from '../utils/errors';

const TAG = 'AuthAPI';

/**
 * Sign up with email and password
 */
export const authAPI = {
  /**
   * Register new user
   */
  signUp: async (email, password, role, additionalData = {}) => {
    try {
      logger.info(TAG, 'Attempting sign up', { email, role });

      // Create Firebase auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      logger.debug(TAG, 'Firebase auth created', { uid });

      // Store user data in Firestore
      // Normalize role to a canonical form so rules and checks remain consistent
      const rawRole = (role || additionalData?.role || '').toString();
      const lower = rawRole.toLowerCase();
      const storedRole = lower === 'admin' ? 'Admin' : lower === 'faculty' ? 'Faculty' : 'Student';

      await setDoc(doc(db, 'users', uid), {
        uid,
        email,
        role: storedRole,
        createdAt: new Date().toISOString(),
        ...additionalData,
      });

      logger.info(TAG, 'User registered successfully', { uid, email, role });

      const userData = {
        uid,
        email,
        role: storedRole,
        ...additionalData,
      };

      // Cache user data
      await userStorage.saveUserData(userData);

      return userData;
    } catch (error) {
      const errorCode = mapFirebaseError(error);
      logger.error(TAG, 'Sign up failed', error);
      throw new AppError(errorCode, error.message, error);
    }
  },

  /**
   * Sign in with email and password
   */
  signIn: async (email, password) => {
    try {
      logger.info(TAG, 'Attempting sign in', { email });

      // Firebase auth sign in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      logger.debug(TAG, 'Firebase auth successful', { uid });

      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', uid));

      if (!userDoc.exists()) {
        logger.error(TAG, 'User document not found in Firestore', { uid });
        throw new Error('User data not found');
      }

      const userData = {
        uid,
        email: userCredential.user.email,
        ...userDoc.data(),
      };

      logger.info(TAG, 'Sign in successful', { uid, role: userData.role });

      // Cache user data
      await userStorage.saveUserData(userData);

      return userData;
    } catch (error) {
      logger.error(TAG, 'Sign in failed', error);

      // Try to get cached data as fallback
      try {
        const cachedUser = await userStorage.getUserData();
        if (cachedUser && cachedUser.uid === auth.currentUser?.uid) {
          logger.warn(TAG, 'Using cached user data');
          return cachedUser;
        }
      } catch (cacheError) {
        logger.warn(TAG, 'Failed to retrieve cached data', cacheError);
      }

      const errorCode = mapFirebaseError(error);
      throw new AppError(errorCode, error.message, error);
    }
  },

  /**
   * Sign out
   * Note: User data is retained in cache for convenience on next login
   * Only clears authentication token
   */
  signOut: async () => {
    try {
      logger.info(TAG, 'Signing out');

      await firebaseSignOut(auth);
      await tokenStorage.clearToken();
      // Keep user data cached for next login - don't clear it
      // await userStorage.clearUserData();

      logger.info(TAG, 'Sign out successful');
    } catch (error) {
      logger.error(TAG, 'Sign out failed', error);
      throw new AppError(ERROR_CODES.AUTH_FAILED, 'Failed to sign out', error);
    }
  },

  /**
   * Get current user from Firestore
   */
  getCurrentUser: async (uid) => {
    try {
      logger.debug(TAG, 'Fetching user data', { uid });

      const userDoc = await getDoc(doc(db, 'users', uid));

      if (!userDoc.exists()) {
        logger.warn(TAG, 'User document not found', { uid });
        return null;
      }

      const userData = {
        uid,
        ...userDoc.data(),
      };

      logger.debug(TAG, 'User data retrieved', { uid });

      return userData;
    } catch (error) {
      logger.error(TAG, 'Failed to get current user', error);
      throw new AppError(ERROR_CODES.FIRESTORE_ERROR, 'Failed to fetch user data', error);
    }
  },

  /**
   * Update user data in Firestore
   */
  updateUser: async (uid, updates) => {
    try {
      logger.info(TAG, 'Updating user', { uid });

      await setDoc(
        doc(db, 'users', uid),
        {
          ...updates,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      logger.info(TAG, 'User updated successfully', { uid });

      const updated = await authAPI.getCurrentUser(uid);
      await userStorage.saveUserData(updated);

      return updated;
    } catch (error) {
      logger.error(TAG, 'Failed to update user', error);
      throw new AppError(ERROR_CODES.FIRESTORE_ERROR, 'Failed to update user', error);
    }
  },
};

export default authAPI;
