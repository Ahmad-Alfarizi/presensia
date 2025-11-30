/**
 * Logging service for debugging and error tracking
 * Provides centralized logging throughout the app
 */

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

let currentLogLevel = __DEV__ ? LOG_LEVELS.DEBUG : LOG_LEVELS.INFO;

/**
 * Logger service with different log levels
 */
export const logger = {
  /**
   * Debug level - detailed info for development
   */
  debug: (tag, message, data = null) => {
    if (currentLogLevel <= LOG_LEVELS.DEBUG) {
      console.log(`[DEBUG] ${tag}:`, message, data || '');
    }
  },

  /**
   * Info level - general information
   */
  info: (tag, message, data = null) => {
    if (currentLogLevel <= LOG_LEVELS.INFO) {
      console.log(`[INFO] ${tag}:`, message, data || '');
    }
  },

  /**
   * Warn level - warnings and deprecations
   */
  warn: (tag, message, data = null) => {
    if (currentLogLevel <= LOG_LEVELS.WARN) {
      console.warn(`[WARN] ${tag}:`, message, data || '');
    }
  },

  /**
   * Error level - errors and exceptions
   */
  error: (tag, message, error = null) => {
    if (currentLogLevel <= LOG_LEVELS.ERROR) {
      console.error(`[ERROR] ${tag}:`, message);
      if (error) {
        console.error('Error details:', error);
      }
    }
  },

  /**
   * Set log level
   */
  setLevel: (level) => {
    currentLogLevel = level;
  },

  /**
   * Get current log level
   */
  getLevel: () => currentLogLevel,
};

export default logger;
