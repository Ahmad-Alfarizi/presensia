import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { logger } from '../utils';
import { getErrorMessage } from '../utils/errors';

/**
 * ErrorBoundary - Catches errors in child components and displays error UI
 * 
 * Prevents entire app from crashing when an error occurs.
 * Automatically logs errors and provides user-friendly error messages.
 * 
 * @example
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * 
 * @example
 * // With custom error handler
 * <ErrorBoundary onError={(error) => customErrorTracking(error)}>
 *   <YourComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends React.Component {
  /**
   * Initialize error boundary state
   * 
   * @param {Object} props - Component props
   * @param {React.ReactNode} props.children - Child components
   * @param {Function} [props.onError] - Optional error callback
   * @param {Function} [props.onReset] - Optional reset callback
   * @param {string} [props.fallbackComponent] - Custom fallback component
   */
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };
  }

  /**
   * Update state so the next render will show the fallback UI
   */
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Log error to console and services
   */
  componentDidCatch(error, errorInfo) {
    // Update state with error details
    this.setState((prevState) => ({
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }));

    // Log the error
    logger.error('ErrorBoundary caught an error:', {
      error: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      errorCount: this.state.errorCount + 1,
    });

    // Call optional error callback
    if (this.props.onError) {
      try {
        this.props.onError(error, errorInfo);
      } catch (callbackError) {
        logger.error('Error in onError callback:', callbackError);
      }
    }

    // Show error alert in development
    if (__DEV__) {
      Alert.alert(
        'Error Caught',
        `${error?.message}\n\n${errorInfo?.componentStack}`,
        [{ text: 'OK' }]
      );
    }
  }

  /**
   * Reset error state
   */
  handleReset = () => {
    logger.debug('ErrorBoundary reset');
    
    // Call optional reset callback
    if (this.props.onReset) {
      try {
        this.props.onReset();
      } catch (error) {
        logger.error('Error in onReset callback:', error);
      }
    }

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo, errorCount } = this.state;
      const userFriendlyMessage = getErrorMessage(error);

      // Return custom fallback if provided
      if (this.props.fallbackComponent) {
        return this.props.fallbackComponent({
          error,
          errorInfo,
          onReset: this.handleReset,
          errorCount,
        });
      }

      // Default error UI
      return (
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff5f5',
            padding: 20,
          }}
        >
          <View
            style={{
              width: '100%',
              maxWidth: 400,
              backgroundColor: '#ffe4e6',
              borderRadius: 8,
              padding: 20,
              borderLeftWidth: 4,
              borderLeftColor: '#dc2626',
            }}
          >
            {/* Error Icon */}
            <Text style={{ fontSize: 48, marginBottom: 16, textAlign: 'center' }}>
              ⚠️
            </Text>

            {/* Title */}
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#dc2626',
                marginBottom: 8,
                textAlign: 'center',
              }}
            >
              Oops! Something went wrong
            </Text>

            {/* User-friendly message */}
            <Text
              style={{
                fontSize: 14,
                color: '#7f1d1d',
                marginBottom: 16,
                textAlign: 'center',
                lineHeight: 20,
              }}
            >
              {userFriendlyMessage}
            </Text>

            {/* Error details in development */}
            {__DEV__ && error && (
              <View
                style={{
                  backgroundColor: '#fca5a5',
                  borderRadius: 4,
                  padding: 12,
                  marginBottom: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'monospace',
                    color: '#7f1d1d',
                    marginBottom: 8,
                  }}
                >
                  Error: {error.message}
                </Text>
                {errorInfo && (
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: 'monospace',
                      color: '#7f1d1d',
                    }}
                  >
                    {errorInfo.componentStack?.substring(0, 200)}...
                  </Text>
                )}
              </View>
            )}

            {/* Error count */}
            {errorCount > 1 && (
              <Text
                style={{
                  fontSize: 12,
                  color: '#7f1d1d',
                  marginBottom: 16,
                  textAlign: 'center',
                }}
              >
                Error count: {errorCount}
              </Text>
            )}

            {/* Reset Button */}
            <TouchableOpacity
              onPress={this.handleReset}
              style={{
                backgroundColor: '#dc2626',
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 6,
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                Try Again
              </Text>
            </TouchableOpacity>

            {/* Help link */}
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Support',
                  'Please contact support with error ID: ' + errorCount,
                  [{ text: 'OK' }]
                );
              }}
            >
              <Text
                style={{
                  color: '#7f1d1d',
                  fontSize: 14,
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                }}
              >
                Get Help
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
