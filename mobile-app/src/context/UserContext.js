import React, { createContext, useContext } from 'react';
import { useUsers as useUsersHook } from '../hooks/useUsers';
import { logger } from '../utils';

/**
 * @deprecated Use useUsers hook directly instead
 * 
 * UserContext is now a thin wrapper around the useUsers hook for backward compatibility.
 * 
 * Migration example:
 * OLD: const { users, addUser, updateUser } = useContext(UserContext);
 * NEW: const { users, addUser, updateUser } = useUsers();
 */
const UserContext = createContext();

/**
 * UserProvider - Thin wrapper providing user context
 * 
 * The actual user management logic is in src/hooks/useUsers.js
 * This provider maintains backward compatibility with existing code
 * 
 * @example
 * <UserProvider>
 *   <App />
 * </UserProvider>
 */
export const UserProvider = ({ children }) => {
  // Provide the hook value via context so the app shares a single
  // user management instance when wrapped with UserProvider.
  const usersValue = useUsersHook();

  logger.debug('UserProvider mounted - providing shared useUsers value via context');

  return (
    <UserContext.Provider value={usersValue}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Deprecated: useUsersContext hook
 * Use the useUsers hook from @/hooks instead
 * 
 * @deprecated Use useUsers from '@/hooks' instead
 * @throws Error if not used within UserProvider
 * @returns {Object} User context value
 * 
 * @example
 * // OLD WAY (deprecated)
 * const { users, addUser } = useUsersContext();
 * 
 * // NEW WAY (recommended)
 * const { users, addUser } = useUsers();
 */
export const useUsersContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    logger.warn('useUsersContext used outside UserProvider - use useUsers hook instead');
    // Fallback to useUsers hook
    return useUsersHook();
  }
  return context;
};

// For backward compatibility - export as is but recommend migration
export { useUsersContext as useUsers };
