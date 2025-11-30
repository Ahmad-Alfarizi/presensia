import React, { createContext, useContext } from 'react';
import { useAuth as useAuthHook } from '../hooks/useAuth';
import { logger } from '../utils';

/**
 * @deprecated Use useAuth hook directly instead
 * 
 * AuthContext is now a thin wrapper around the useAuth hook for backward compatibility.
 * 
 * Migration example:
 * OLD: const { user, loading, signIn } = useContext(AuthContext);
 * NEW: const { user, loading, signIn } = useAuth();
 */
export const AuthContext = createContext();

/**
 * AuthProvider - Thin wrapper providing auth context
 * 
 * The actual auth logic is in src/hooks/useAuth.js
 * This provider maintains backward compatibility with existing code
 * 
 * @example
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
export const AuthProvider = ({ children }) => {
  // Provide the hook value via context so the app shares a single
  // auth instance when wrapped with AuthProvider.
  const authValue = useAuthHook();

  logger.debug('AuthProvider mounted - providing shared useAuth value via context');

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Deprecated: useAuthContext hook
 * Use the useAuth hook from @/hooks instead
 * 
 * @deprecated Use useAuth from '@/hooks' instead
 * @throws Error if not used within AuthProvider
 * @returns {Object} Auth context value
 * 
 * @example
 * // OLD WAY (deprecated)
 * const { user, loading } = useAuthContext();
 * 
 * // NEW WAY (recommended)
 * const { user, loading } = useAuth();
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    logger.warn('useAuthContext used outside AuthProvider - use useAuth hook instead');
    // Fallback to useAuth hook
    return useAuthHook();
  }
  return context;
};