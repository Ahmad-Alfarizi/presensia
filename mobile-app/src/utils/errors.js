/**
 * Error definitions and messages for Presensia app
 * Centralized error handling with translations
 */

export const ERROR_CODES = {
  // Auth errors
  AUTH_FAILED: 'AUTH_FAILED',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  INVALID_PASSWORD: 'INVALID_PASSWORD',
  INVALID_EMAIL: 'INVALID_EMAIL',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  WEAK_PASSWORD: 'WEAK_PASSWORD',
  NETWORK_ERROR: 'NETWORK_ERROR',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  FIRESTORE_ERROR: 'FIRESTORE_ERROR',
  
  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  REQUIRED_FIELD: 'REQUIRED_FIELD',
  INVALID_FORMAT: 'INVALID_FORMAT',
  
  // Generic errors
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  // Plan / subscription limits
  PLAN_LIMIT_REACHED: 'PLAN_LIMIT_REACHED',
};

/**
 * Map Firebase error codes to app error codes
 */
export const mapFirebaseError = (error) => {
  const errorCode = error?.code || '';
  
  const mapping = {
    'auth/user-not-found': ERROR_CODES.USER_NOT_FOUND,
    'auth/wrong-password': ERROR_CODES.INVALID_PASSWORD,
    'auth/invalid-email': ERROR_CODES.INVALID_EMAIL,
    'auth/email-already-in-use': ERROR_CODES.EMAIL_ALREADY_EXISTS,
    'auth/weak-password': ERROR_CODES.WEAK_PASSWORD,
    'permission-denied': ERROR_CODES.PERMISSION_DENIED,
    'network-error': ERROR_CODES.NETWORK_ERROR,
  };
  
  return mapping[errorCode] || ERROR_CODES.FIRESTORE_ERROR;
};

/**
 * Get user-friendly error message based on error code
 */
export const getErrorMessage = (errorCode, language = 'english') => {
  const messages = {
    english: {
      [ERROR_CODES.USER_NOT_FOUND]: 'No user found with this email.',
      [ERROR_CODES.INVALID_PASSWORD]: 'Invalid password.',
      [ERROR_CODES.INVALID_EMAIL]: 'Invalid email address.',
      [ERROR_CODES.EMAIL_ALREADY_EXISTS]: 'Email already in use.',
      [ERROR_CODES.WEAK_PASSWORD]: 'Password is too weak.',
      [ERROR_CODES.NETWORK_ERROR]: 'Network error. Check your connection.',
      [ERROR_CODES.PERMISSION_DENIED]: 'You do not have permission to access this.',
      [ERROR_CODES.FIRESTORE_ERROR]: 'Database error. Please try again.',
      [ERROR_CODES.VALIDATION_ERROR]: 'Please check your input.',
      [ERROR_CODES.REQUIRED_FIELD]: 'This field is required.',
      [ERROR_CODES.INVALID_FORMAT]: 'Invalid format.',
      [ERROR_CODES.AUTH_FAILED]: 'Authentication failed. Please try again.',
      [ERROR_CODES.UNKNOWN_ERROR]: 'Something went wrong. Please try again.',
      [ERROR_CODES.PLAN_LIMIT_REACHED]: 'Plan limit reached. Upgrade your subscription to add more users.',
    },
    indonesian: {
      [ERROR_CODES.USER_NOT_FOUND]: 'Email ini belum terdaftar nih.',
      [ERROR_CODES.INVALID_PASSWORD]: 'Password kamu salah.',
      [ERROR_CODES.INVALID_EMAIL]: 'Format email nggak valid.',
      [ERROR_CODES.EMAIL_ALREADY_EXISTS]: 'Email udah dipakai.',
      [ERROR_CODES.WEAK_PASSWORD]: 'Password terlalu lemah.',
      [ERROR_CODES.NETWORK_ERROR]: 'Koneksi internet bermasalah nih.',
      [ERROR_CODES.PERMISSION_DENIED]: 'Kamu nggak punya akses untuk ini.',
      [ERROR_CODES.FIRESTORE_ERROR]: 'Ada masalah dengan database nih.',
      [ERROR_CODES.VALIDATION_ERROR]: 'Cek lagi inputnya ya.',
      [ERROR_CODES.REQUIRED_FIELD]: 'Field ini wajib diisi.',
      [ERROR_CODES.INVALID_FORMAT]: 'Format nggak valid.',
      [ERROR_CODES.AUTH_FAILED]: 'Login gagal. Coba lagi ya.',
      [ERROR_CODES.UNKNOWN_ERROR]: 'Ada yang salah. Coba lagi ya.',
      [ERROR_CODES.PLAN_LIMIT_REACHED]: 'Batas paket tercapai. Silakan upgrade langganan untuk menambah lebih banyak user.',
    },
  };
  
  return messages[language]?.[errorCode] || messages.english[errorCode] || 'An error occurred.';
};

/**
 * Custom error classes
 */
export class AppError extends Error {
  constructor(code, message, originalError = null) {
    super(message);
    this.code = code;
    this.originalError = originalError;
    this.name = 'AppError';
  }
}

export class AuthError extends AppError {
  constructor(message, code = ERROR_CODES.AUTH_FAILED, originalError = null) {
    super(code, message, originalError);
    this.name = 'AuthError';
  }
}

export class ValidationError extends AppError {
  constructor(message, code = ERROR_CODES.VALIDATION_ERROR, originalError = null) {
    super(code, message, originalError);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends AppError {
  constructor(message = 'Network connection failed', originalError = null) {
    super(ERROR_CODES.NETWORK_ERROR, message, originalError);
    this.name = 'NetworkError';
  }
}

/**
 * Firebase error mapper (improved)
 */
export const mapFirebaseErrorToAppError = (firebaseError, language = 'english') => {
  if (!firebaseError) {
    return new AppError(
      ERROR_CODES.UNKNOWN_ERROR,
      getErrorMessage(ERROR_CODES.UNKNOWN_ERROR, language),
      null
    );
  }

  const errorCode = firebaseError?.code || '';
  const appErrorCode = mapFirebaseError(firebaseError);
  const message = getErrorMessage(appErrorCode, language);

  if (errorCode.startsWith('auth/')) {
    return new AuthError(message, appErrorCode, firebaseError);
  }

  if (errorCode.includes('network')) {
    return new NetworkError(message, firebaseError);
  }

  return new AppError(appErrorCode, message, firebaseError);
};
