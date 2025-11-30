/**
 * Axios client configuration with interceptors
 * Central point for all API requests
 */

import axios from 'axios';
import { logger } from '../utils/logger';
import { tokenStorage, secureStorage } from '../utils/storage';
import { ERROR_CODES, AppError } from '../utils/errors';

/**
 * Create axios instance with default config
 */
const axiosInstance = axios.create({
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor - add auth token, logging
 */
axiosInstance.interceptors.request.use(
  async (config) => {
    logger.debug('API', `→ ${config.method?.toUpperCase()} ${config.url}`);

    // Add auth token if available
    try {
      const token = await tokenStorage.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      logger.warn('API', 'Failed to retrieve auth token', error);
    }

    return config;
  },
  (error) => {
    logger.error('API', 'Request interceptor error', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor - handle errors, log responses
 */
axiosInstance.interceptors.response.use(
  (response) => {
    logger.debug('API', `← ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  async (error) => {
    const config = error.config;

    if (!error.response) {
      // Network error
      logger.error('API', 'Network error', error);
      throw new AppError(
        ERROR_CODES.NETWORK_ERROR,
        'Network error. Check your connection.',
        error
      );
    }

    logger.error('API', `← ${error.response.status} ${config?.url}`, error.response.data);

    // Handle specific status codes
    switch (error.response.status) {
      case 401:
        // Unauthorized - token expired
        await tokenStorage.clearToken();
        throw new AppError(
          ERROR_CODES.AUTH_FAILED,
          'Session expired. Please login again.',
          error
        );

      case 403:
        // Forbidden
        throw new AppError(
          ERROR_CODES.PERMISSION_DENIED,
          'You do not have permission to access this.',
          error
        );

      case 404:
        // Not found
        throw new AppError(
          ERROR_CODES.USER_NOT_FOUND,
          'Resource not found.',
          error
        );

      case 400:
        // Bad request - validation error
        throw new AppError(
          ERROR_CODES.VALIDATION_ERROR,
          error.response.data?.message || 'Invalid request.',
          error
        );

      case 500:
        // Server error
        throw new AppError(
          ERROR_CODES.FIRESTORE_ERROR,
          'Server error. Please try again later.',
          error
        );

      default:
        throw new AppError(
          ERROR_CODES.UNKNOWN_ERROR,
          error.response.data?.message || 'An error occurred.',
          error
        );
    }
  }
);

export default axiosInstance;
