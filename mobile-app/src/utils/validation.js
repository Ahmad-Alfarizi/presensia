/**
 * Validation utilities and rules
 * Reusable validation functions for forms and data
 */

/**
 * Validation rule definitions
 */
export const validators = {
  /**
   * Required field validator
   */
  required: (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return { valid: false, error: 'This field is required' };
    }
    return { valid: true };
  },

  /**
   * Email validator
   */
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || !emailRegex.test(value)) {
      return { valid: false, error: 'Invalid email address' };
    }
    return { valid: true };
  },

  /**
   * Min length validator
   */
  minLength: (min) => (value) => {
    if (!value || value.length < min) {
      return { valid: false, error: `Minimum ${min} characters required` };
    }
    return { valid: true };
  },

  /**
   * Max length validator
   */
  maxLength: (max) => (value) => {
    if (value && value.length > max) {
      return { valid: false, error: `Maximum ${max} characters allowed` };
    }
    return { valid: true };
  },

  /**
   * Match values validator (for password confirmation)
   */
  match: (matchValue, fieldName = 'value') => (value) => {
    if (value !== matchValue) {
      return { valid: false, error: `Does not match ${fieldName}` };
    }
    return { valid: true };
  },

  /**
   * Password validator (min 6 chars, alphanumeric)
   */
  password: (value) => {
    if (!value || value.length < 6) {
      return { valid: false, error: 'Password must be at least 6 characters' };
    }
    if (!/[a-zA-Z]/.test(value) || !/[0-9]/.test(value)) {
      return { valid: false, error: 'Password must contain letters and numbers' };
    }
    return { valid: true };
  },

  /**
   * Phone number validator
   */
  phone: (value) => {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!value || !phoneRegex.test(value)) {
      return { valid: false, error: 'Invalid phone number' };
    }
    return { valid: true };
  },

  /**
   * URL validator
   */
  url: (value) => {
    try {
      new URL(value);
      return { valid: true };
    } catch {
      return { valid: false, error: 'Invalid URL' };
    }
  },

  /**
   * Number validator
   */
  number: (value) => {
    if (isNaN(value) || value === '') {
      return { valid: false, error: 'Must be a number' };
    }
    return { valid: true };
  },

  /**
   * Regex validator
   */
  regex: (pattern, message = 'Invalid format') => (value) => {
    if (!value || !pattern.test(value)) {
      return { valid: false, error: message };
    }
    return { valid: true };
  },
};

/**
 * Validate form data against rules
 * @param {Object} data - Form data to validate
 * @param {Object} rules - Validation rules { fieldName: [validator1, validator2, ...] }
 * @returns {Object} { isValid, errors: { fieldName: 'error message' } }
 */
export const validateForm = (data, rules) => {
  const errors = {};
  let isValid = true;

  Object.keys(rules).forEach((fieldName) => {
    const value = data[fieldName];
    const fieldRules = rules[fieldName];

    for (const rule of fieldRules) {
      const result = typeof rule === 'function' ? rule(value) : rule;
      if (!result.valid) {
        errors[fieldName] = result.error;
        isValid = false;
        break;
      }
    }
  });

  return { isValid, errors };
};

/**
 * Validate single field
 * @param {any} value - Field value
 * @param {Array} rules - Array of validator functions
 * @returns {Object} { valid, error }
 */
export const validateField = (value, rules) => {
  for (const rule of rules) {
    const result = typeof rule === 'function' ? rule(value) : rule;
    if (!result.valid) {
      return result;
    }
  }
  return { valid: true };
};

/**
 * Common validation schemas for reuse
 */
export const validationSchemas = {
  email: [validators.required, validators.email],
  password: [validators.required, validators.minLength(6)],
  phone: [validators.required, validators.phone],
  url: [validators.required, validators.url],
  name: [validators.required, validators.minLength(2)],
};
