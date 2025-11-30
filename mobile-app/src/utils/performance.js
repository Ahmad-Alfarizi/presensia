import React, { useMemo, useCallback, useRef } from 'react';
import { logger } from './logger';

/**
 * Performance Optimization Utilities
 * 
 * Collection of utilities for optimizing React component performance:
 * - Memoization helpers
 * - Dependency tracking
 * - Performance monitoring
 * - Callback optimization
 */

/**
 * Custom hook for useMemo with automatic dependency tracking
 * Logs when dependencies change for debugging
 * 
 * @param {Function} factory - Function that returns the memoized value
 * @param {Array} deps - Dependency array
 * @param {string} label - Optional label for logging (used in __DEV__)
 * @returns {*} Memoized value
 * 
 * @example
 * const expensiveValue = useMemoDebug(() => {
 *   return computeExpensiveValue(data);
 * }, [data], 'expensiveValue');
 */
export const useMemoDebug = (factory, deps, label) => {
  const prevDepsRef = useRef(undefined);

  return useMemo(() => {
    if (__DEV__ && label && prevDepsRef.current) {
      const changedDeps = deps?.filter(
        (dep, i) => dep !== prevDepsRef.current?.[i]
      ) || [];
      if (changedDeps.length > 0) {
        logger.debug(`useMemo "${label}" recomputed due to dependency change`);
      }
    }
    prevDepsRef.current = deps;
    return factory();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};

/**
 * Custom hook for useCallback with automatic dependency tracking
 * Logs when dependencies change for debugging
 * 
 * @param {Function} callback - Function to memoize
 * @param {Array} deps - Dependency array
 * @param {string} label - Optional label for logging (used in __DEV__)
 * @returns {Function} Memoized callback
 * 
 * @example
 * const handlePress = useCallbackDebug(() => {
 *   console.log('Pressed!');
 * }, [dependency], 'handlePress');
 */
export const useCallbackDebug = (callback, deps, label) => {
  const prevDepsRef = useRef(undefined);

  return useCallback((...args) => {
    if (__DEV__ && label && prevDepsRef.current) {
      const changedDeps = deps?.filter(
        (dep, i) => dep !== prevDepsRef.current?.[i]
      ) || [];
      if (changedDeps.length > 0) {
        logger.debug(`useCallback "${label}" recreated due to dependency change`);
      }
    }
    prevDepsRef.current = deps;
    return callback(...args);
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};

/**
 * Hook to track component render times and logs
 * Useful for identifying performance bottlenecks
 * 
 * @param {string} componentName - Name of the component
 * @param {boolean} [log=true] - Whether to log (only in development)
 * 
 * @example
 * export const MyScreen = () => {
 *   useRenderDebug('MyScreen');
 *   return <View>...</View>;
 * };
 */
export const useRenderDebug = (componentName, log = true) => {
  const renderCountRef = useRef(0);
  const renderTimesRef = useRef([]);

  React.useEffect(() => {
    if (__DEV__ && log) {
      renderCountRef.current += 1;
      const now = Date.now();
      renderTimesRef.current.push(now);

      // Keep last 10 render times
      if (renderTimesRef.current.length > 10) {
        renderTimesRef.current.shift();
      }

      logger.debug(`Component "${componentName}" rendered (#${renderCountRef.current})`);

      // Calculate render frequency
      if (renderTimesRef.current.length > 1) {
        const timeDiffs = [];
        for (let i = 1; i < renderTimesRef.current.length; i++) {
          timeDiffs.push(
            renderTimesRef.current[i] - renderTimesRef.current[i - 1]
          );
        }
        const avgTime = Math.round(
          timeDiffs.reduce((a, b) => a + b) / timeDiffs.length
        );
        if (avgTime < 100) {
          logger.warn(
            `Component "${componentName}" renders frequently (avg ${avgTime}ms between renders)`
          );
        }
      }
    }
  });
};

/**
 * Hook to track which dependencies caused a component re-render
 * 
 * @param {Object} deps - Object with dependency values
 * @param {string} componentName - Name of the component
 * 
 * @example
 * useDependencyDebug({ userId, userName }, 'UserProfile');
 * // Logs: "Dependency 'userId' changed from 123 to 456"
 */
export const useDependencyDebug = (deps, componentName) => {
  const prevDepsRef = useRef(deps);

  React.useEffect(() => {
    if (__DEV__) {
      Object.keys(deps).forEach((key) => {
        if (deps[key] !== prevDepsRef.current?.[key]) {
          logger.debug(
            `[${componentName}] Dependency "${key}" changed from ${prevDepsRef.current?.[key]} to ${deps[key]}`
          );
        }
      });
      prevDepsRef.current = deps;
    }
  });
};

/**
 * Memoized selector hook - reduces unnecessary re-renders when using large objects
 * 
 * @param {Object} obj - Object to select from
 * @param {Function} selector - Function to select properties
 * @returns {*} Selected value
 * 
 * @example
 * const userName = useSelector(user, (u) => u.name);
 * // Only re-renders if user.name changes
 */
export const useSelector = (obj, selector) => {
  return useMemo(() => selector(obj), [obj, selector]);
};

/**
 * Hook to batch multiple state updates into a single render
 * 
 * @param {*} initialState - Initial state value
 * @returns {[*, Function]} State and batch update function
 * 
 * @example
 * const [state, updateBatch] = useBatchState({ count: 0 });
 * updateBatch({
 *   count: 1,
 *   message: 'Updated'
 * });
 */
export const useBatchState = (initialState) => {
  const [state, setState] = React.useState(initialState);
  const batchUpdateRef = useRef(null);

  const updateBatch = useCallback((updates) => {
    // Clear pending batch update
    if (batchUpdateRef.current) {
      clearTimeout(batchUpdateRef.current);
    }

    // Schedule batch update
    batchUpdateRef.current = setTimeout(() => {
      setState((prev) => ({
        ...prev,
        ...updates,
      }));
    }, 0);
  }, []);

  React.useEffect(() => {
    return () => {
      if (batchUpdateRef.current) {
        clearTimeout(batchUpdateRef.current);
      }
    };
  }, []);

  return [state, updateBatch];
};

/**
 * Hook to debounce a value - useful for search inputs, resize events, etc.
 * 
 * @param {*} value - Value to debounce
 * @param {number} delay - Debounce delay in ms
 * @returns {*} Debounced value
 * 
 * @example
 * const [searchText, setSearchText] = React.useState('');
 * const debouncedSearch = useDebounce(searchText, 500);
 * 
 * React.useEffect(() => {
 *   if (debouncedSearch) {
 *     performSearch(debouncedSearch);
 *   }
 * }, [debouncedSearch]);
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  const timeoutRef = useRef(null);

  React.useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook to throttle a function - useful for scroll events, mouse events, etc.
 * 
 * @param {Function} callback - Function to throttle
 * @param {number} delay - Throttle delay in ms
 * @returns {Function} Throttled function
 * 
 * @example
 * const handleScroll = useThrottle((scrollPos) => {
 *   console.log('Scrolled to:', scrollPos);
 * }, 1000);
 * 
 * <ScrollView onScroll={handleScroll} />
 */
export const useThrottle = (callback, delay = 500) => {
  const lastRunRef = useRef(Date.now());

  return useCallback((...args) => {
    const now = Date.now();
    if (now - lastRunRef.current >= delay) {
      callback(...args);
      lastRunRef.current = now;
    }
  }, [callback, delay]);
};

/**
 * Hook to measure component render time
 * Logs milliseconds taken to render
 * 
 * @param {string} componentName - Name of component
 * 
 * @example
 * export const ExpensiveComponent = () => {
 *   usePerformanceMonitor('ExpensiveComponent');
 *   // ... expensive operations
 *   return <View>...</View>;
 * };
 */
export const usePerformanceMonitor = (componentName) => {
  const startTimeRef = useRef(performance.now());

  React.useEffect(() => {
    const renderTime = performance.now() - startTimeRef.current;
    if (__DEV__) {
      if (renderTime > 16.67) {
        // 60fps = 16.67ms per frame
        logger.warn(
          `Component "${componentName}" took ${renderTime.toFixed(2)}ms to render (exceeds 16.67ms frame budget)`
        );
      } else {
        logger.debug(
          `Component "${componentName}" rendered in ${renderTime.toFixed(2)}ms`
        );
      }
    }
  }, [componentName]);
};

/**
 * Export object for convenient access to all utilities
 */
export const performanceUtils = {
  useMemoDebug,
  useCallbackDebug,
  useRenderDebug,
  useDependencyDebug,
  useSelector,
  useBatchState,
  useDebounce,
  useThrottle,
  usePerformanceMonitor,
};

export default performanceUtils;
