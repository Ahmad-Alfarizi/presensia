/**
 * Form management hook
 * Handles form state, validation, and submission
 */

import { useState, useCallback } from 'react';
import { validateForm } from '../utils/validation';
import { logger } from '../utils/logger';

/**
 * useForm - Manage form state and validation
 * @param {Object} initialValues - Initial form values
 * @param {Object} validationRules - Validation rules for fields
 * @param {Function} onSubmit - Submit handler
 * @returns {Object} Form state and handlers
 */
export const useForm = (initialValues = {}, validationRules = {}, onSubmit = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle field change
   */
  const handleChange = useCallback((fieldName, value) => {
    logger.debug('useForm', 'Field changed', { fieldName, value });

    setValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // Clear error for this field if user is correcting it
    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: undefined,
      }));
    }
  }, [errors]);

  /**
   * Handle field blur
   */
  const handleBlur = useCallback((fieldName) => {
    setTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));

    // Validate field on blur
    if (validationRules[fieldName]) {
      const { isValid, errors: fieldErrors } = validateForm(
        { [fieldName]: values[fieldName] },
        { [fieldName]: validationRules[fieldName] }
      );

      if (!isValid) {
        setErrors((prev) => ({
          ...prev,
          ...fieldErrors,
        }));
      }
    }
  }, [values, validationRules]);

  /**
   * Validate all fields
   */
  const validate = useCallback(() => {
    logger.debug('useForm', 'Validating form');

    const { isValid, errors: validationErrors } = validateForm(values, validationRules);

    setErrors(validationErrors);

    return isValid;
  }, [values, validationRules]);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    async (e) => {
      if (e?.preventDefault) {
        e.preventDefault();
      }

      logger.debug('useForm', 'Form submitted');

      // Validate all fields
      if (!validate()) {
        logger.warn('useForm', 'Form validation failed');
        return;
      }

      // Call onSubmit handler
      if (onSubmit) {
        try {
          setIsSubmitting(true);
          await onSubmit(values);
        } catch (error) {
          logger.error('useForm', 'Submit handler failed', error);
          throw error;
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [values, validate, onSubmit]
  );

  /**
   * Reset form to initial values
   */
  const resetForm = useCallback(() => {
    logger.debug('useForm', 'Resetting form');

    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  /**
   * Set field error manually
   */
  const setFieldError = useCallback((fieldName, error) => {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  }, []);

  /**
   * Set field value manually
   */
  const setFieldValue = useCallback((fieldName, value) => {
    setValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }, []);

  return {
    // State
    values,
    errors,
    touched,
    isSubmitting,

    // Handlers
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,

    // Utilities
    validate,
  };
};

export default useForm;
