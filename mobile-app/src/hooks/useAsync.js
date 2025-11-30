/**
 * Generic async operations hook
 * Handles loading, error, and data states for async functions
 */

import { useState, useCallback, useEffect } from 'react';
import { logger } from '../utils/logger';

/**
 * useAsync - Handle async operations with loading/error/data states
 * @param {Function} asyncFunction - The async function to execute
 * @param {boolean} immediate - Execute immediately on mount
 * @param {Array} dependencies - Dependencies array for re-execution
 * @returns {Object} { data, error, loading, execute }
 */
export const useAsync = (asyncFunction, immediate = true, dependencies = []) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(immediate);

  /**
   * Execute the async function
   */
  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);

        logger.debug('useAsync', 'Executing async function', { args });

        const result = await asyncFunction(...args);

        setData(result);
        logger.debug('useAsync', 'Async function completed', { result });

        return result;
      } catch (err) {
        logger.error('useAsync', 'Async function failed', err);
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction]
  );

  /**
   * Execute on mount if immediate is true
   */
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute, ...dependencies]);

  return {
    data,
    error,
    loading,
    execute,
  };
};

export default useAsync;
