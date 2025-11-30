/**
 * Storage utility wrapper for AsyncStorage
 * Provides type-safe, consistent storage access
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { logger } from './logger';

const STORAGE_KEYS = {
  USER_DATA: 'presensia_user_data',
  AUTH_TOKEN: 'presensia_token',
  LANGUAGE: 'presensia_language',
  ONBOARD_SEEN: 'presensia_onboard_seen',
  USER_SETTINGS: 'presensia_user_settings',
};

/**
 * Async Storage operations
 */
export const storage = {
  /**
   * Save data to AsyncStorage (JSON)
   */
  set: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      logger.debug('Storage', `Saved ${key}`, value);
      return true;
    } catch (error) {
      logger.error('Storage', `Failed to save ${key}`, error);
      return false;
    }
  },

  /**
   * Get data from AsyncStorage (parsed JSON)
   */
  get: async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      logger.debug('Storage', `Retrieved ${key}`, value);
      return value;
    } catch (error) {
      logger.error('Storage', `Failed to get ${key}`, error);
      return null;
    }
  },

  /**
   * Remove data from AsyncStorage
   */
  remove: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      logger.debug('Storage', `Removed ${key}`);
      return true;
    } catch (error) {
      logger.error('Storage', `Failed to remove ${key}`, error);
      return false;
    }
  },

  /**
   * Clear all AsyncStorage data
   */
  clear: async () => {
    try {
      await AsyncStorage.clear();
      logger.debug('Storage', 'Cleared all storage');
      return true;
    } catch (error) {
      logger.error('Storage', 'Failed to clear storage', error);
      return false;
    }
  },
};

/**
 * Secure Storage operations (for sensitive data like tokens)
 */
export const secureStorage = {
  /**
   * Save secure data
   */
  set: async (key, value) => {
    try {
      await SecureStore.setItemAsync(key, value);
      logger.debug('SecureStorage', `Saved ${key}`);
      return true;
    } catch (error) {
      logger.error('SecureStorage', `Failed to save ${key}`, error);
      return false;
    }
  },

  /**
   * Get secure data
   */
  get: async (key) => {
    try {
      const value = await SecureStore.getItemAsync(key);
      logger.debug('SecureStorage', `Retrieved ${key}`);
      return value;
    } catch (error) {
      logger.error('SecureStorage', `Failed to get ${key}`, error);
      return null;
    }
  },

  /**
   * Remove secure data
   */
  remove: async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
      logger.debug('SecureStorage', `Removed ${key}`);
      return true;
    } catch (error) {
      logger.error('SecureStorage', `Failed to remove ${key}`, error);
      return false;
    }
  },
};

/**
 * User data storage operations
 */
export const userStorage = {
  saveUserData: (userData) => storage.set(STORAGE_KEYS.USER_DATA, userData),
  getUserData: () => storage.get(STORAGE_KEYS.USER_DATA),
  clearUserData: () => storage.remove(STORAGE_KEYS.USER_DATA),
};

/**
 * Auth token storage operations
 */
export const tokenStorage = {
  saveToken: (token) => secureStorage.set(STORAGE_KEYS.AUTH_TOKEN, token),
  getToken: () => secureStorage.get(STORAGE_KEYS.AUTH_TOKEN),
  clearToken: () => secureStorage.remove(STORAGE_KEYS.AUTH_TOKEN),
};

/**
 * Language preference storage operations
 */
export const languageStorage = {
  saveLanguage: (language) => storage.set(STORAGE_KEYS.LANGUAGE, language),
  getLanguage: () => storage.get(STORAGE_KEYS.LANGUAGE),
};

/**
 * Recent login data (for "Remember me" functionality)
 */
export const recentLoginStorage = {
  saveRecentLogin: (email, role) => 
    storage.set(STORAGE_KEYS.USER_DATA, { email, role, isRecent: true }),
  getRecentLogin: () => storage.get(STORAGE_KEYS.USER_DATA),
  clearRecentLogin: () => storage.remove(STORAGE_KEYS.USER_DATA),
};

export { STORAGE_KEYS };
